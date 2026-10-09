import { Firestore } from '@google-cloud/firestore';
import { getCrmDatabaseId, getCrmProjectId, isCrmFirestoreConfigured } from './config.js';

let crmDb: Firestore | null = null;

export function isCrmDbReady(): boolean {
  return isCrmFirestoreConfigured();
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

  let credentials: Record<string, unknown>;
  try {
    credentials = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error('CRM_FIREBASE_SERVICE_ACCOUNT må være gyldig JSON.');
  }

  crmDb = new Firestore({
    projectId,
    databaseId: getCrmDatabaseId(),
    credentials,
  });

  return crmDb;
}
