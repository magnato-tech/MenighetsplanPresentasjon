const { ADMIN_COOKIE, isCrmAdminHost, readCookie, verifySessionToken } = require('../_lib/adminSession');

module.exports = function handler(req, res) {
  try {
    if (req.method !== 'GET') {
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
    res.status(200).json({ authenticated: verifySessionToken(token) });
  } catch {
    res.status(500).json({ success: false, error: 'Kunne ikke sjekke innlogging.' });
  }
};
