import type { VercelRequest, VercelResponse } from '@vercel/node';
import { vercelHealth } from '../lib/crm/vercel';

export default function handler(req: VercelRequest, res: VercelResponse) {
  vercelHealth(req, res);
}
