import type { VercelRequest, VercelResponse } from '@vercel/node';
import { vercelRegistrationById } from '../../lib/crm/vercel';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await vercelRegistrationById(req, res);
}
