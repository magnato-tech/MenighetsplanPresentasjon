import type { VercelRequest, VercelResponse } from '@vercel/node';
import { vercelAdminLogin } from '../../lib/crm/vercelAuth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }
  vercelAdminLogin(req, res);
}
