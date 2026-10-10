const { getDb, isFirestoreConfigured } = require('./customersStore');

const SETTINGS_COLLECTION = 'crm_settings';
const SETTINGS_DOC_ID = 'global';

const DEFAULT_SETTINGS = {
  adminNotifyEmail: '',
  notifyOnNewRegistration: true,
  updatedAt: null,
};

function normalizeEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  if (!email) return '';
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return ok ? email : '';
}

async function getCrmSettings() {
  if (!isFirestoreConfigured()) {
    return { ...DEFAULT_SETTINGS };
  }
  try {
    const db = getDb();
    const snap = await db.collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC_ID).get();
    if (!snap.exists) {
      return { ...DEFAULT_SETTINGS };
    }
    const data = snap.data() || {};
    return {
      adminNotifyEmail: normalizeEmail(data.adminNotifyEmail) || '',
      notifyOnNewRegistration: data.notifyOnNewRegistration !== false,
      updatedAt: data.updatedAt || null,
    };
  } catch (err) {
    console.error('getCrmSettings failed', err && err.message);
    return { ...DEFAULT_SETTINGS };
  }
}

function envAdminNotifyEmail() {
  return normalizeEmail(process.env.ADMIN_NOTIFY_EMAIL);
}

async function getEffectiveAdminNotifyEmail() {
  const settings = await getCrmSettings();
  if (!settings.notifyOnNewRegistration) {
    return { email: '', source: null };
  }
  if (settings.adminNotifyEmail) {
    return { email: settings.adminNotifyEmail, source: 'crm' };
  }
  const fromEnv = envAdminNotifyEmail();
  if (fromEnv) {
    return { email: fromEnv, source: 'env' };
  }
  return { email: '', source: null };
}

async function isAdminNotifyEnabled() {
  const { email } = await getEffectiveAdminNotifyEmail();
  return Boolean(email);
}

async function updateCrmSettings(patch) {
  if (!isFirestoreConfigured()) {
    throw new Error('CRM Firestore er ikke konfigurert');
  }
  const db = getDb();
  const ref = db.collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC_ID);
  const existing = await ref.get();
  const current = existing.exists
    ? {
        adminNotifyEmail: normalizeEmail(existing.data().adminNotifyEmail) || '',
        notifyOnNewRegistration: existing.data().notifyOnNewRegistration !== false,
      }
    : { adminNotifyEmail: '', notifyOnNewRegistration: true };

  const next = {
    adminNotifyEmail:
      patch.adminNotifyEmail !== undefined
        ? normalizeEmail(patch.adminNotifyEmail)
        : current.adminNotifyEmail,
    notifyOnNewRegistration:
      patch.notifyOnNewRegistration !== undefined
        ? Boolean(patch.notifyOnNewRegistration)
        : current.notifyOnNewRegistration,
    updatedAt: new Date().toISOString(),
  };

  if (patch.adminNotifyEmail !== undefined && patch.adminNotifyEmail && !next.adminNotifyEmail) {
    throw new Error('Ugyldig e-postadresse for varsel');
  }

  await ref.set(next, { merge: true });
  return next;
}

module.exports = {
  getCrmSettings,
  updateCrmSettings,
  getEffectiveAdminNotifyEmail,
  isAdminNotifyEnabled,
  envAdminNotifyEmail,
};
