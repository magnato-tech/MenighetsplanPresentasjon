const {
  createSessionToken,
  isCrmAdminHost,
  normalizeEnvValue,
  setCookieHeader,
} = require('../_lib/adminSession');

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

    const expected = normalizeEnvValue(process.env.ADMIN_PASSWORD);
    const rawBody = req.body;
    const body =
      typeof rawBody === 'string'
        ? (() => {
            try {
              return JSON.parse(rawBody);
            } catch {
              return {};
            }
          })()
        : rawBody || {};
    const password = normalizeEnvValue(body.password);
    if (!expected) {
      res.status(503).json({
        success: false,
        error: 'ADMIN_PASSWORD er ikke satt på serveren. Lagre variabelen i Vercel (Production) og redeploy.',
      });
      return;
    }
    if (!password || password !== expected) {
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
