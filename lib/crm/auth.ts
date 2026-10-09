import { getAdminPassword } from './config';
import { verifyAdminSessionToken } from './session';

export function isAdminAuthorized(sessionToken: string | undefined): boolean {
  return verifyAdminSessionToken(sessionToken);
}

export function validateAdminPassword(password: string | undefined): boolean {
  const expected = getAdminPassword();
  return Boolean(expected && password && password === expected);
}
