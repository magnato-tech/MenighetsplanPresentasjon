const { clearCookieHeader, isCrmAdminHost } = require('../_lib/adminSession');

module.exports = function handler(req, res) {
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
    res.setHeader('Set-Cookie', clearCookieHeader());
    res.status(200).json({ success: true, message: 'Logget ut' });
  } catch {
    res.status(500).json({ success: false, error: 'Kunne ikke logge ut.' });
  }
};
