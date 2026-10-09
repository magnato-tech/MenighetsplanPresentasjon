import type { VercelRequest, VercelResponse } from '@vercel/node';
import { vercelHealth } from '../lib/crm/vercel';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await vercelHealth(req, res);
}
