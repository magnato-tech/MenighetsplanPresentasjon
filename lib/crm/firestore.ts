import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { initializeFirestore, type Firestore } from 'firebase-admin/firestore';
import { CUSTOMERS_COLLECTION, getCrmDatabaseId, getCrmProjectId, isCrmFirestoreConfigured } from './config.js';

const HEALTH_PING_TIMEOUT_MS = 4000;
const CRM_APP_NAME = 'menighetsplan-crm';

let crmDb: Firestore | null = null;

export function isCrmDbReady(): boolean {
  return isCrmFirestoreConfigured();
}

function parseServiceAccount(raw: string): ServiceAccount {
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error('CRM_FIREBASE_SERVICE_ACCOUNT må være gyldig JSON.');
  }

  const projectId = stringField(parsed, 'project_id') || stringField(parsed, 'projectId');
  const clientEmail = stringField(parsed, 'client_email') || stringField(parsed, 'clientEmail');
  const privateKey = stringField(parsed, 'private_key') || stringField(parsed, 'privateKey');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('CRM_FIREBASE_SERVICE_ACCOUNT mangler påkrevde felt.');
  }

  return { projectId, clientEmail, privateKey };
}

function stringField(source: Record<string, unknown>, key: string): string | undefined {
  const value = source[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export function getCrmDb(): Firestore {
  if (crmDb) return crmDb;

  const projectId = getCrmProjectId();
  const raw = process.env.CRM_FIREBASE_SERVICE_ACCOUNT;
  if (!projectId || !raw) {
    throw new Error(
      'CRM Firestore er ikke konfigurert. Sett CRM_FIREBASE_PROJECT_ID og CRM_FIREBASE_SERVICE_ACCOUNT.'
    );
  }

  const credentials = parseServiceAccount(raw);
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

  crmDb = initializeFirestore(app, { preferRest: true }, getCrmDatabaseId());
  return crmDb;
}

export async function pingCrmFirestore(): Promise<{
  configured: boolean;
  reachable: boolean;
}> {
  if (!isCrmFirestoreConfigured()) {
    return { configured: false, reachable: false };
  }

  try {
    const db = getCrmDb();
    await Promise.race([
      db.collection(CUSTOMERS_COLLECTION).limit(1).get(),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), HEALTH_PING_TIMEOUT_MS);
      }),
    ]);
    return { configured: true, reachable: true };
  } catch {
    return { configured: true, reachable: false };
  }
}
