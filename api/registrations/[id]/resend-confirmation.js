const {
  ADMIN_COOKIE,
  isCrmAdminHost,
  readCookie,
  verifySessionToken,
} = require('../../_lib/adminSession');
const { getCustomer, isFirestoreConfigured, updateCustomer } = require('../../_lib/customersStore');
const { sendAndLogConfirmation } = require('../../_lib/registrationEmail');

function registrationIdFromUrl(url) {
  const parts = String(url || '').split('?')[0].split('/').filter(Boolean);
  const idx = parts.indexOf('registrations');
  if (idx >= 0 && parts[idx + 1] && parts[idx + 1] !== 'resend-confirmation') {
    return decodeURIComponent(parts[idx + 1]);
  }
  return '';
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ success: false, error: 'Method not allowed' });
      return;
    }

    if (!isCrmAdminHost(req.headers.host)) {
      res.status(403).json({
        success: false,
        error: 'Administrator-API er kun tilgjengelig på crm.menighetsplan.no.',
      });
      return;
    }

    const token = readCookie(req.headers.cookie, ADMIN_COOKIE);
    if (!verifySessionToken(token)) {
      res.status(401).json({
        success: false,
        error: 'Uautorisert: Krever gyldig administrator-innlogging eller sesjon.',
      });
      return;
    }

    const id = registrationIdFromUrl(req.url);
    if (!id) {
      res.status(400).json({ success: false, error: 'Mangler registrerings-id' });
      return;
    }

    if (!isFirestoreConfigured()) {
      res.status(500).json({ success: false, error: 'CRM Firestore er ikke konfigurert' });
      return;
    }

    const existing = await getCustomer(id);
    if (!existing) {
      res.status(404).json({ success: false, error: 'Registrering ikke funnet' });
      return;
    }

    const updated = await sendAndLogConfirmation(existing, updateCustomer);
    if (!updated) {
      res.status(500).json({ success: false, error: 'Kunne ikke oppdatere registrering.' });
      return;
    }

    res.status(200).json({
      success: true,
      registration: updated,
      confirmationEmailOk: Boolean(updated.confirmationEmailOk),
    });
  } catch (err) {
    console.error('resend confirmation failed', err && err.message);
    res.status(500).json({ success: false, error: 'Kunne ikke sende bekreftelse.' });
  }
};
