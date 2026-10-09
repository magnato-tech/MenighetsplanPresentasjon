import type { Express, Request, Response } from 'express';
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
import { buildClearCookieHeader, buildSetCookieHeader, isSecureRequest } from './http';
import type { RegistrationSubmitBody } from './types';

function sendJson(res: Response, result: JsonResult, secure: boolean): void {
  if (result.setCookie) {
    res.setHeader('Set-Cookie', buildSetCookieHeader(result.setCookie, secure));
  }
  if (result.clearCookie) {
    res.setHeader('Set-Cookie', buildClearCookieHeader());
  }
  res.status(result.status).json(result.body);
}

export function registerCrmRoutes(app: Express): void {
  app.get('/api/health', (req, res) => {
    sendJson(res, handleHealth(), isSecureRequest(req.headers));
  });

  const adminLoginHandler = (req: Request, res: Response) => {
    const clientIp =
      req.ip || (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    sendJson(
      res,
      handleAdminLogin(req.headers.host, req.body, clientIp),
      isSecureRequest(req.headers)
    );
  };

  app.post('/api/admin/login', adminLoginHandler);
  app.post('/api/admin/verify', adminLoginHandler);

  app.get('/api/admin/check', (req, res) => {
    sendJson(
      res,
      handleAdminCheck(req.headers.host, req.cookies?.mp_admin_token),
      isSecureRequest(req.headers)
    );
  });

  app.post('/api/admin/logout', (req, res) => {
    sendJson(res, handleAdminLogout(req.headers.host), isSecureRequest(req.headers));
  });

  app.get('/api/registrations', async (req, res) => {
    const result = await handleListRegistrations(
      req.headers.host,
      req.cookies?.mp_admin_token
    );
    sendJson(res, result, isSecureRequest(req.headers));
  });

  app.post('/api/registrations', async (req, res) => {
    const clientIp =
      req.ip || (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const result = await handleCreateRegistration(req.body as RegistrationSubmitBody, clientIp);
    sendJson(res, result, isSecureRequest(req.headers));
  });

  app.patch('/api/registrations/:id', async (req, res) => {
    const result = await handlePatchRegistration(
      req.headers.host,
      req.params.id,
      req.body,
      req.cookies?.mp_admin_token
    );
    sendJson(res, result, isSecureRequest(req.headers));
  });
}
