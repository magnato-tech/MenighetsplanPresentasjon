const {
  ADMIN_COOKIE,
  isCrmAdminHost,
  readCookie,
  verifySessionToken,
} = require('../_lib/adminSession');
const {
  envAdminNotifyEmail,
  getCrmSettings,
  getEffectiveAdminNotifyEmail,
  updateCrmSettings,
} = require('../_lib/crmSettings');
const { isEmailConfigured } = require('../_lib/registrationEmail');
const { parseJsonBody } = require('../_lib/httpUtils');

function requireAdmin(req, res) {
  if (!isCrmAdminHost(req.headers.host)) {
    res.status(403).json({
      success: false,
      error: 'Administrator-API er kun tilgjengelig på crm.menighetsplan.no.',
    });
    return false;
  }
  const token = readCookie(req.headers.cookie, ADMIN_COOKIE);
  if (!verifySessionToken(token)) {
    res.status(401).json({
      success: false,
      error: 'Uautorisert: Krever gyldig administrator-innlogging eller sesjon.',
    });
    return false;
  }
  return true;
}

module.exports = async function handler(req, res) {
  try {
    if (!requireAdmin(req, res)) return;

    if (req.method === 'GET') {
      const settings = await getCrmSettings();
      const effective = await getEffectiveAdminNotifyEmail();
      res.status(200).json({
        success: true,
        settings,
        effective: {
          adminNotifyEmail: effective.email,
          source: effective.source,
        },
        capabilities: {
          resendConfigured: isEmailConfigured(),
          envAdminNotifyEmail: envAdminNotifyEmail() || null,
          fromAddress: process.env.REGISTRATION_EMAIL_FROM
            ? String(process.env.REGISTRATION_EMAIL_FROM).trim()
            : null,
        },
      });
      return;
    }

    if (req.method === 'PATCH') {
      const body = parseJsonBody(req);
      const patch = {};
      if (body.adminNotifyEmail !== undefined) {
        patch.adminNotifyEmail = body.adminNotifyEmail;
      }
      if (body.notifyOnNewRegistration !== undefined) {
        patch.notifyOnNewRegistration = Boolean(body.notifyOnNewRegistration);
      }
      try {
        const settings = await updateCrmSettings(patch);
        const effective = await getEffectiveAdminNotifyEmail();
        res.status(200).json({
          success: true,
          settings,
          effective: {
            adminNotifyEmail: effective.email,
            source: effective.source,
          },
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          error: err && err.message ? String(err.message) : 'Kunne ikke lagre innstillinger.',
        });
      }
      return;
    }

    res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('admin settings failed', err && err.message);
    res.status(500).json({ success: false, error: 'Kunne ikke behandle forespørselen.' });
  }
};
