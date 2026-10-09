const {
  ADMIN_COOKIE,
  isCrmAdminHost,
  readCookie,
  verifySessionToken,
} = require('../../_lib/adminSession');
const { isFirestoreConfigured, updateCustomer } = require('../../_lib/customersStore');
const { parseJsonBody } = require('../../_lib/httpUtils');

const ALLOWED_STATUS = new Set(['pending', 'contacted', 'ready', 'declined']);

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'PATCH') {
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

    const id = req.query && req.query.id;
    if (!id) {
      res.status(400).json({ success: false, error: 'Mangler registrerings-id' });
      return;
    }

    if (!isFirestoreConfigured()) {
      res.status(500).json({ success: false, error: 'CRM Firestore er ikke konfigurert' });
      return;
    }

    const body = parseJsonBody(req);
    const patch = {};
    if (body.status !== undefined) {
      if (!ALLOWED_STATUS.has(body.status)) {
        res.status(400).json({ success: false, error: 'Ugyldig status' });
        return;
      }
      patch.status = body.status;
    }
    if (body.adminNotes !== undefined) {
      patch.adminNotes = String(body.adminNotes).substring(0, 5000);
    }

    const updated = await updateCustomer(id, patch);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Registrering ikke funnet' });
      return;
    }

    res.status(200).json({ success: true, registration: updated });
  } catch (err) {
    console.error('registration patch failed', err && err.message);
    res.status(500).json({ success: false, error: 'Kunne ikke oppdatere registrering.' });
  }
};
