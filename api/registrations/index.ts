import type { VercelRequest, VercelResponse } from '@vercel/node';
import { vercelRegistrations } from '../../lib/crm/vercel';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await vercelRegistrations(req, res);
}
