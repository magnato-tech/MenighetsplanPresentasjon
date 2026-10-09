export const CUSTOMERS_COLLECTION = 'customers';
export const ADMIN_COOKIE_NAME = 'mp_admin_token';
export const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

export function getAdminPassword(): string | undefined {
  const value = process.env.ADMIN_PASSWORD;
  return value && value.length > 0 ? value : undefined;
}

export function getSessionSecret(): string | undefined {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit && explicit.length > 0) return explicit;
  return getAdminPassword();
}

export function getCrmProjectId(): string | undefined {
  const value = process.env.CRM_FIREBASE_PROJECT_ID;
  return value && value.length > 0 ? value : undefined;
}

export function getCrmDatabaseId(): string {
  return process.env.CRM_FIRESTORE_DATABASE_ID || '(default)';
}

export function isCrmFirestoreConfigured(): boolean {
  return Boolean(getCrmProjectId() && process.env.CRM_FIREBASE_SERVICE_ACCOUNT);
}
