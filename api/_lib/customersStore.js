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

function getDb() {
  if (crmDb) return crmDb;

  const projectId = normalizeEnvValue(process.env.CRM_FIREBASE_PROJECT_ID);
  const raw = normalizeEnvValue(process.env.CRM_FIREBASE_SERVICE_ACCOUNT);
  if (!projectId || !raw) {
    throw new Error('CRM Firestore er ikke konfigurert.');
  }

  const parsed = parseCredentials(raw);
  const databaseId = normalizeEnvValue(process.env.CRM_FIRESTORE_DATABASE_ID) || '(default)';
  const credentials = {
    client_email: parsed.client_email || parsed.clientEmail,
    private_key: parsed.private_key || parsed.privateKey,
  };

  crmDb = new Firestore({
    projectId,
    databaseId,
    credentials,
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

  await ref.update(updateData);
  const updated = await ref.get();
  return updated.data();
}

module.exports = {
  isFirestoreConfigured,
  listCustomers,
  createCustomer,
  updateCustomer,
};
