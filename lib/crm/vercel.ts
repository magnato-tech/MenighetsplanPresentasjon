import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  handleAdminCheck,
  handleAdminLogin,
  handleAdminLogout,
  handleCreateRegistration,
  handleHealth,
  handleListRegistrations,
  handlePatchRegistration,
  type JsonResult,
} from './handlers';
import { buildClearCookieHeader, buildSetCookieHeader, getClientIp, isSecureRequest, parseCookies } from './http';
import { ADMIN_COOKIE_NAME } from './session';
import type { RegistrationSubmitBody } from './types';

function sendJson(res: VercelResponse, result: JsonResult, secure: boolean): void {
  if (result.setCookie) {
    res.setHeader('Set-Cookie', buildSetCookieHeader(result.setCookie, secure));
  }
  if (result.clearCookie) {
    res.setHeader('Set-Cookie', buildClearCookieHeader());
  }
  res.status(result.status).json(result.body);
}

async function runVercelHandler(
  req: VercelRequest,
  res: VercelResponse,
  runner: () => JsonResult | Promise<JsonResult>
): Promise<void> {
  const secure = isSecureRequest(req.headers);
  const result = await runner();
  sendJson(res, result, secure);
}

function sessionFromReq(req: VercelRequest): string | undefined {
  const cookies = parseCookies(req.headers.cookie);
  return cookies[ADMIN_COOKIE_NAME];
}

function hostFromReq(req: VercelRequest): string | undefined {
  const value = req.headers.host;
  return typeof value === 'string' ? value : undefined;
}

export async function vercelHealth(req: VercelRequest, res: VercelResponse): Promise<void> {
  await runVercelHandler(req, res, () => handleHealth());
}

export function vercelAdminLogin(req: VercelRequest, res: VercelResponse): void {
  const ip = getClientIp(req.headers);
  const body = (req.body || {}) as { password?: string };
  sendJson(res, handleAdminLogin(hostFromReq(req), body, ip), isSecureRequest(req.headers));
}

export function vercelAdminCheck(req: VercelRequest, res: VercelResponse): void {
  runVercelHandler(req, res, () => handleAdminCheck(hostFromReq(req), sessionFromReq(req)));
}

export function vercelAdminLogout(req: VercelRequest, res: VercelResponse): void {
  runVercelHandler(req, res, () => handleAdminLogout(hostFromReq(req)));
}

export async function vercelRegistrations(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method === 'GET') {
    await runVercelHandler(req, res, () =>
      handleListRegistrations(hostFromReq(req), sessionFromReq(req))
    );
    return;
  }
  if (req.method === 'POST') {
    const ip = getClientIp(req.headers);
    await runVercelHandler(req, res, () =>
      handleCreateRegistration((req.body || {}) as RegistrationSubmitBody, ip)
    );
    return;
  }
  res.status(405).json({ success: false, error: 'Method not allowed' });
}

export async function vercelRegistrationById(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'PATCH') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }
  const id = req.query.id as string;
  if (!id) {
    res.status(400).json({ success: false, error: 'Mangler registrerings-id' });
    return;
  }
  await runVercelHandler(req, res, () =>
    handlePatchRegistration(hostFromReq(req), id, req.body || {}, sessionFromReq(req))
  );
}
