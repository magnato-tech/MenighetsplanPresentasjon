const {
  ADMIN_COOKIE,
  isCrmAdminHost,
  readCookie,
  verifySessionToken,
} = require('../_lib/adminSession');
const {
  createCustomer,
  isFirestoreConfigured,
  listCustomers,
} = require('../_lib/customersStore');
const { getClientIp, parseJsonBody } = require('../_lib/httpUtils');
const { checkRegistrationRateLimit } = require('../_lib/rateLimit');
const { buildCustomerFromBody, validateRegistrationBody } = require('../_lib/registrationPayload');

function forbiddenHost(res) {
  res.status(403).json({
    success: false,
    error: 'Administrator-API er kun tilgjengelig på crm.menighetsplan.no.',
  });
}

function unauthorized(res) {
  res.status(401).json({
    success: false,
    error: 'Uautorisert: Krever gyldig administrator-innlogging eller sesjon.',
  });
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      if (!isCrmAdminHost(req.headers.host)) {
        forbiddenHost(res);
        return;
      }
      const token = readCookie(req.headers.cookie, ADMIN_COOKIE);
      if (!verifySessionToken(token)) {
        unauthorized(res);
        return;
      }
      if (!isFirestoreConfigured()) {
        res.status(500).json({ success: false, error: 'CRM Firestore er ikke konfigurert' });
        return;
      }
      const registrations = await listCustomers();
      res.status(200).json({
        success: true,
        count: registrations.length,
        registrations,
      });
      return;
    }

    if (req.method === 'POST') {
      const body = parseJsonBody(req);

      if (body.hp_company_url && String(body.hp_company_url).trim().length > 0) {
        res.status(200).json({
          success: true,
          message: 'Registrering er mottatt og lagret.',
          registration: { id: `reg_hp_${Date.now()}` },
        });
        return;
      }

      const clientIp = getClientIp(req.headers);
      if (!checkRegistrationRateLimit(clientIp)) {
        res.status(429).json({
          success: false,
          error:
            'For mange henvendelser på kort tid. Vennligst vent noen minutter før du prøver igjen.',
        });
        return;
      }

      const validationError = validateRegistrationBody(body);
      if (validationError) {
        res.status(400).json({ success: false, error: validationError });
        return;
      }

      if (!isFirestoreConfigured()) {
        res.status(500).json({ success: false, error: 'Kunne ikke lagre registreringen i databasen' });
        return;
      }

      try {
        const newRegistration = buildCustomerFromBody(body);
        await createCustomer(newRegistration);
        res.status(201).json({
          success: true,
          message: 'Registrering er mottatt og lagret i CRM.',
          registration: newRegistration,
        });
      } catch (writeErr) {
        console.error('createCustomer failed', writeErr && writeErr.message);
        res.status(500).json({ success: false, error: 'Kunne ikke lagre registreringen i databasen' });
      }
      return;
    }

    res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('registrations handler failed', err && err.message);
    res.status(500).json({ success: false, error: 'Kunne ikke behandle forespørselen.' });
  }
};
