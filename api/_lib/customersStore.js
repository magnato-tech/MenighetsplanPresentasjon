const { Firestore } = require('@google-cloud/firestore');

const CUSTOMERS_COLLECTION = 'customers';

let crmDb = null;

function normalizeEnvValue(value) {
  if (value == null) return '';
  return String(value).replace(/\r\n/g, '\n').trim();
}

function isFirestoreConfigured() {
  return Boolean(
    normalizeEnvValue(process.env.CRM_FIREBASE_PROJECT_ID) &&
      normalizeEnvValue(process.env.CRM_FIREBASE_SERVICE_ACCOUNT)
  );
}

function parseCredentials(raw) {
  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch {
    throw new Error('CRM_FIREBASE_SERVICE_ACCOUNT må være gyldig JSON.');
  }
  if (typeof credentials.private_key === 'string') {
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
  }
  if (typeof credentials.privateKey === 'string') {
    credentials.privateKey = credentials.privateKey.replace(/\\n/g, '\n');
  }
  return credentials;
}

function classifyFirestoreError(err) {
  const msg = err && err.message ? String(err.message) : '';
  const code = err && err.code != null ? String(err.code) : '';
  const combined = `${code} ${msg}`.toLowerCase();
  if (combined.includes('permission_denied') || combined.includes('insufficient permissions')) {
    return 'permission_denied';
  }
  if (combined.includes('not_found') || combined.includes('does not exist')) {
    return 'not_found';
  }
  if (
    combined.includes('invalid_grant') ||
    combined.includes('decoder') ||
    combined.includes('private_key') ||
    combined.includes('unauthorized')
  ) {
    return 'auth';
  }
  if (combined.includes('timeout')) return 'timeout';
  return 'unknown';
}

/** Safe diagnostics for /api/health (no secrets). */
function validateServiceAccountEnv() {
  const projectId = normalizeEnvValue(process.env.CRM_FIREBASE_PROJECT_ID);
  const raw = normalizeEnvValue(process.env.CRM_FIREBASE_SERVICE_ACCOUNT);
  if (!projectId || !raw) {
    return { configured: false, credentialsOk: false, reason: 'missing_env' };
  }

  if (raw.startsWith('sk_')) {
    return { configured: true, credentialsOk: false, reason: 'not_service_account_json' };
  }

  let parsed;
  try {
    parsed = parseCredentials(raw);
  } catch {
    return { configured: true, credentialsOk: false, reason: 'invalid_json' };
  }

  const jsonProjectId = parsed.project_id || parsed.projectId;
  const clientEmail = parsed.client_email || parsed.clientEmail;
  const privateKey = parsed.private_key || parsed.privateKey;

  if (!jsonProjectId || !clientEmail || !privateKey) {
    return { configured: true, credentialsOk: false, reason: 'missing_fields' };
  }

  if (String(jsonProjectId) !== projectId) {
    return { configured: true, credentialsOk: false, reason: 'project_id_mismatch' };
  }

  if (!String(privateKey).includes('BEGIN PRIVATE KEY')) {
    return { configured: true, credentialsOk: false, reason: 'invalid_private_key' };
  }

  return { configured: true, credentialsOk: true, reason: null };
}

const HEALTH_PING_TIMEOUT_MS = 4000;

async function pingFirestore() {
  const validation = validateServiceAccountEnv();
  if (!validation.configured) {
    return { ...validation, reachable: false, reachReason: null };
  }
  if (!validation.credentialsOk) {
    return { ...validation, reachable: false, reachReason: null };
  }

  try {
    const db = getDb();
    await Promise.race([
      db.collection(CUSTOMERS_COLLECTION).limit(1).get(),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), HEALTH_PING_TIMEOUT_MS);
      }),
    ]);
    return { ...validation, reachable: true, reachReason: null };
  } catch (err) {
    return {
      ...validation,
      reachable: false,
      reachReason: classifyFirestoreError(err),
    };
  }
}

function getDb() {
  if (crmDb) return crmDb;

  const projectId = normalizeEnvValue(process.env.CRM_FIREBASE_PROJECT_ID);
  const raw = normalizeEnvValue(process.env.CRM_FIREBASE_SERVICE_ACCOUNT);
  if (!projectId || !raw) {
    throw new Error('CRM Firestore er ikke konfigurert.');
  }

  const parsed = parseCredentials(raw);
  const clientEmail = parsed.client_email || parsed.clientEmail;
  const privateKey = parsed.private_key || parsed.privateKey;
  if (!clientEmail || !privateKey) {
    throw new Error('CRM_FIREBASE_SERVICE_ACCOUNT mangler client_email eller private_key.');
  }

  const databaseId = normalizeEnvValue(process.env.CRM_FIRESTORE_DATABASE_ID) || '(default)';
  const credentials = {
    client_email: clientEmail,
    private_key: privateKey,
  };

  crmDb = new Firestore({
    projectId,
    databaseId,
    credentials,
    preferRest: true,
  });

  return crmDb;
}

function stripUndefined(value) {
  return JSON.parse(JSON.stringify(value));
}

async function listCustomers() {
  const db = getDb();
  const snapshot = await db.collection(CUSTOMERS_COLLECTION).get();
  const list = [];
  snapshot.forEach((docSnap) => {
    list.push(docSnap.data());
  });
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return list;
}

async function createCustomer(record) {
  const db = getDb();
  await db.collection(CUSTOMERS_COLLECTION).doc(record.id).set(stripUndefined(record));
}

async function updateCustomer(id, patch) {
  const db = getDb();
  const ref = db.collection(CUSTOMERS_COLLECTION).doc(id);
  const existing = await ref.get();
  if (!existing.exists) return null;

  const updateData = { updatedAt: new Date().toISOString() };
  if (patch.status !== undefined) updateData.status = patch.status;
  if (patch.adminNotes !== undefined) updateData.adminNotes = patch.adminNotes;
  if (patch.confirmationEmailAt !== undefined) updateData.confirmationEmailAt = patch.confirmationEmailAt;
  if (patch.confirmationEmailOk !== undefined) updateData.confirmationEmailOk = patch.confirmationEmailOk;
  if (patch.confirmationEmailFailedAt !== undefined) {
    updateData.confirmationEmailFailedAt = patch.confirmationEmailFailedAt;
  }

  await ref.update(stripUndefined(updateData));
  const updated = await ref.get();
  return updated.data();
}

module.exports = {
  isFirestoreConfigured,
  validateServiceAccountEnv,
  pingFirestore,
  listCustomers,
  createCustomer,
  updateCustomer,
};
