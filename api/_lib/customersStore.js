const { cert, getApps, initializeApp } = require('firebase-admin/app');
const { initializeFirestore } = require('firebase-admin/firestore');

const CUSTOMERS_COLLECTION = 'customers';
const CRM_APP_NAME = 'menighetsplan-crm';

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

function parseServiceAccount(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('CRM_FIREBASE_SERVICE_ACCOUNT må være gyldig JSON.');
  }
  const projectId = parsed.project_id || parsed.projectId;
  const clientEmail = parsed.client_email || parsed.clientEmail;
  let privateKey = parsed.private_key || parsed.privateKey;
  if (typeof privateKey === 'string') {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('CRM_FIREBASE_SERVICE_ACCOUNT mangler påkrevde felt.');
  }
  return { projectId, clientEmail, privateKey };
}

function getDb() {
  if (crmDb) return crmDb;

  const projectId = normalizeEnvValue(process.env.CRM_FIREBASE_PROJECT_ID);
  const raw = normalizeEnvValue(process.env.CRM_FIREBASE_SERVICE_ACCOUNT);
  if (!projectId || !raw) {
    throw new Error('CRM Firestore er ikke konfigurert.');
  }

  const credentials = parseServiceAccount(raw);
  const databaseId = normalizeEnvValue(process.env.CRM_FIRESTORE_DATABASE_ID) || '(default)';

  const existing = getApps().find((app) => app.name === CRM_APP_NAME);
  const app =
    existing ??
    initializeApp(
      {
        credential: cert(credentials),
        projectId,
      },
      CRM_APP_NAME
    );

  crmDb = initializeFirestore(app, { preferRest: true }, databaseId);
  return crmDb;
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
  await db.collection(CUSTOMERS_COLLECTION).doc(record.id).set(record);
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
