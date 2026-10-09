import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleAdminCheck, handleAdminLogin, handleAdminLogout, type JsonResult } from './handlers';
import { buildClearCookieHeader, buildSetCookieHeader, getClientIp, isSecureRequest, parseCookies } from './http';
import { ADMIN_COOKIE_NAME } from './session';

function sendJson(res: VercelResponse, result: JsonResult, secure: boolean): void {
  if (result.setCookie) {
    res.setHeader('Set-Cookie', buildSetCookieHeader(result.setCookie, secure));
  }
  if (result.clearCookie) {
    res.setHeader('Set-Cookie', buildClearCookieHeader());
  }
  res.status(result.status).json(result.body);
}

function sessionFromReq(req: VercelRequest): string | undefined {
  const cookies = parseCookies(req.headers.cookie);
  return cookies[ADMIN_COOKIE_NAME];
}

function hostFromReq(req: VercelRequest): string | undefined {
  const value = req.headers.host;
  return typeof value === 'string' ? value : undefined;
}

export function vercelAdminLogin(req: VercelRequest, res: VercelResponse): void {
  try {
    const ip = getClientIp(req.headers);
    const body = (req.body || {}) as { password?: string };
    sendJson(res, handleAdminLogin(hostFromReq(req), body, ip), isSecureRequest(req.headers));
  } catch {
    res.status(500).json({ success: false, error: 'Kunne ikke fullføre innlogging.' });
  }
}

export function vercelAdminCheck(req: VercelRequest, res: VercelResponse): void {
  try {
    sendJson(
      res,
      handleAdminCheck(hostFromReq(req), sessionFromReq(req)),
      isSecureRequest(req.headers)
    );
  } catch {
    res.status(500).json({ success: false, error: 'Kunne ikke sjekke innlogging.' });
  }
}

export function vercelAdminLogout(req: VercelRequest, res: VercelResponse): void {
  try {
    sendJson(res, handleAdminLogout(hostFromReq(req)), isSecureRequest(req.headers));
  } catch {
    res.status(500).json({ success: false, error: 'Kunne ikke logge ut.' });
  }
}
