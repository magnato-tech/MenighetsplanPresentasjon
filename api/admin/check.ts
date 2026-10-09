import { ADMIN_COOKIE, isCrmAdminHost, readCookie, verifySessionToken } from '../_lib/adminSession';

export default function handler(req: { method?: string; headers: { host?: string; cookie?: string } }, res: {
  status: (code: number) => { json: (body: Record<string, unknown>) => void };
}) {
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
}
