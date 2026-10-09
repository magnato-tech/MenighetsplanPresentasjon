const crypto = require('node:crypto');

const ADMIN_COOKIE = 'mp_admin_token';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function normalizeEnvValue(value) {
  if (value == null) return '';
  return String(value).replace(/\r\n/g, '\n').trim();
}

function sessionSecret() {
  const explicit = normalizeEnvValue(process.env.ADMIN_SESSION_SECRET);
  if (explicit) return explicit;
  return normalizeEnvValue(process.env.ADMIN_PASSWORD);
}

module.exports.normalizeEnvValue = normalizeEnvValue;

function isCrmAdminHost(hostHeader) {
  if (!hostHeader) return false;
  const host = String(hostHeader).split(':')[0].toLowerCase();
  if (host === 'crm.menighetsplan.no' || host === 'crm.localhost') return true;
  if (process.env.NODE_ENV !== 'production') {
    return host === 'localhost' || host === '127.0.0.1';
  }
  return false;
}

function createSessionToken() {
  const secret = sessionSecret();
  if (!secret) return null;
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS }), 'utf8').toString(
    'base64url'
  );
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token) {
  if (!token) return false;
  const secret = sessionSecret();
  if (!secret) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof parsed.exp === 'number' && Date.now() < parsed.exp;
  } catch {
    return false;
  }
}

function readCookie(cookieHeader, name) {
  if (!cookieHeader) return undefined;
  for (const part of String(cookieHeader).split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return undefined;
}

function setCookieHeader(token) {
  const secure = process.env.NODE_ENV === 'production';
  const parts = [
    `${ADMIN_COOKIE}=${encodeURIComponent(token)}`,
    'HttpOnly',
    'Path=/',
    `Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`,
    'SameSite=lax',
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

function clearCookieHeader() {
  return `${ADMIN_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=lax`;
}

module.exports = {
  ADMIN_COOKIE,
  isCrmAdminHost,
  createSessionToken,
  verifySessionToken,
  readCookie,
  setCookieHeader,
  clearCookieHeader,
};
