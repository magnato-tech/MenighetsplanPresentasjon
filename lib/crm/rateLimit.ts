const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_BLOCK_DURATION_MS = 15 * 60 * 1000;

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

interface LoginAttemptRecord {
  attempts: number;
  blockedUntil: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const adminLoginAttempts = new Map<string, LoginAttemptRecord>();

export function checkRegistrationRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count += 1;
  return true;
}

export function getLoginBlockState(ip: string): { blocked: boolean; minutesLeft?: number } {
  const record = adminLoginAttempts.get(ip);
  const now = Date.now();
  if (record && record.blockedUntil > now) {
    return { blocked: true, minutesLeft: Math.ceil((record.blockedUntil - now) / 60000) };
  }
  return { blocked: false };
}

export function recordFailedLogin(ip: string): { blocked: boolean; remaining?: number; error: string } {
  const now = Date.now();
  const attemptRecord = adminLoginAttempts.get(ip);
  const currentAttempts = (attemptRecord?.attempts || 0) + 1;

  if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
    adminLoginAttempts.set(ip, {
      attempts: currentAttempts,
      blockedUntil: now + LOGIN_BLOCK_DURATION_MS,
    });
    return {
      blocked: true,
      error:
        'For mange mislykkede innloggingsforsøk. Tilgangen er midlertidig sperret i 15 minutter.',
    };
  }

  adminLoginAttempts.set(ip, { attempts: currentAttempts, blockedUntil: 0 });
  const remaining = MAX_LOGIN_ATTEMPTS - currentAttempts;
  return {
    blocked: false,
    remaining,
    error: `Feil administrator-passord (${remaining} forsøk gjenstår).`,
  };
}

export function clearLoginAttempts(ip: string): void {
  adminLoginAttempts.delete(ip);
}
