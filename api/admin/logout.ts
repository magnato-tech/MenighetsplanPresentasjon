import { clearCookieHeader, isCrmAdminHost } from '../_lib/adminSession';

export default function handler(req: { method?: string; headers: { host?: string } }, res: {
  status: (code: number) => { json: (body: Record<string, unknown>) => void };
  setHeader: (name: string, value: string) => void;
}) {
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
}
