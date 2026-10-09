import type { VercelRequest, VercelResponse } from '@vercel/node';
import { vercelAdminCheck } from '../../lib/crm/vercel';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }
  vercelAdminCheck(req, res);
}
