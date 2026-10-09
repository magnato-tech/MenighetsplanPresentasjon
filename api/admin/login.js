const { createSessionToken, isCrmAdminHost, setCookieHeader } = require('../_lib/adminSession');

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

    const expected = process.env.ADMIN_PASSWORD;
    const password = req.body && req.body.password;
    if (!expected || !password || password !== expected) {
      res.status(401).json({ success: false, error: 'Feil passord' });
      return;
    }

    const token = createSessionToken();
    if (!token) {
      res.status(500).json({ success: false, error: 'Administrator-innlogging er ikke konfigurert.' });
      return;
    }

    res.setHeader('Set-Cookie', setCookieHeader(token));
    res.status(200).json({ success: true, message: 'Innlogget som administrator' });
  } catch {
    console.error('admin login failed');
    res.status(500).json({ success: false, error: 'Kunne ikke fullføre innlogging.' });
  }
};
