import { isAdminAuthorized, validateAdminPassword } from './auth';
import {
  buildCustomerFromBody,
  createCustomer,
  listCustomers,
  updateCustomer,
  validateRegistrationBody,
} from './customers';
import { isCrmDbReady, pingCrmFirestore } from './firestore';
import { adminHostForbidden, isAdminApiHost } from './hostPolicy';
import {
  checkRegistrationRateLimit,
  clearLoginAttempts,
  getLoginBlockState,
  recordFailedLogin,
} from './rateLimit';
import { createAdminSessionToken } from './session';
import type { RegistrationStatus, RegistrationSubmitBody } from './types';

export type JsonResult = {
  status: number;
  body: Record<string, unknown>;
  setCookie?: string;
  clearCookie?: boolean;
};

function unauthorized(): JsonResult {
  return {
    status: 401,
    body: {
      success: false,
      error: 'Uautorisert: Krever gyldig administrator-innlogging eller sesjon.',
    },
  };
}

function forbiddenHost(): JsonResult {
  const { status, body } = adminHostForbidden();
  return { status, body };
}

export async function handleHealth(): Promise<JsonResult> {
  const ping = await pingCrmFirestore();
  return {
    status: 200,
    body: {
      status: ping.reachable ? 'ok' : 'degraded',
      firestore: {
        check: 'connection',
        configured: ping.configured,
        reachable: ping.reachable,
      },
      time: new Date().toISOString(),
    },
  };
}

export function handleAdminLogin(
  host: string | undefined,
  body: { password?: string },
  clientIp: string
): JsonResult {
  if (!isAdminApiHost(host)) return forbiddenHost();

  const block = getLoginBlockState(clientIp);
  if (block.blocked) {
    return {
      status: 429,
      body: {
        success: false,
        error: `For mange mislykkede innloggingsforsøk. Prøv igjen om ${block.minutesLeft} minutt(er).`,
      },
    };
  }

  if (!validateAdminPassword(body.password)) {
    const failed = recordFailedLogin(clientIp);
    return {
      status: failed.blocked ? 429 : 401,
      body: { success: false, error: failed.error },
    };
  }

  clearLoginAttempts(clientIp);
  const token = createAdminSessionToken();
  return {
    status: 200,
    body: { success: true, message: 'Innlogget som administrator' },
    setCookie: token,
  };
}

export function handleAdminCheck(
  host: string | undefined,
  sessionToken: string | undefined
): JsonResult {
  if (!isAdminApiHost(host)) return forbiddenHost();
  return {
    status: 200,
    body: { authenticated: isAdminAuthorized(sessionToken) },
  };
}

export function handleAdminLogout(host: string | undefined): JsonResult {
  if (!isAdminApiHost(host)) return forbiddenHost();
  return {
    status: 200,
    body: { success: true, message: 'Logget ut' },
    clearCookie: true,
  };
}

export async function handleListRegistrations(
  host: string | undefined,
  sessionToken: string | undefined
): Promise<JsonResult> {
  if (!isAdminApiHost(host)) return forbiddenHost();
  if (!isAdminAuthorized(sessionToken)) return unauthorized();
  if (!isCrmDbReady()) {
    return {
      status: 500,
      body: { success: false, error: 'CRM Firestore er ikke konfigurert' },
    };
  }
  try {
    const registrations = await listCustomers();
    return {
      status: 200,
      body: { success: true, count: registrations.length, registrations },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kunne ikke hente registreringer';
    return { status: 500, body: { success: false, error: message } };
  }
}

export async function handleCreateRegistration(
  body: RegistrationSubmitBody,
  clientIp: string
): Promise<JsonResult> {
  if (body.hp_company_url && String(body.hp_company_url).trim().length > 0) {
    return {
      status: 200,
      body: {
        success: true,
        message: 'Registrering er mottatt og lagret.',
        registration: { id: `reg_hp_${Date.now()}` },
      },
    };
  }

  if (!checkRegistrationRateLimit(clientIp)) {
    return {
      status: 429,
      body: {
        success: false,
        error: 'For mange henvendelser på kort tid. Vennligst vent noen minutter før du prøver igjen.',
      },
    };
  }

  const validationError = validateRegistrationBody(body);
  if (validationError) {
    return { status: 400, body: { success: false, error: validationError } };
  }

  if (!isCrmDbReady()) {
    return {
      status: 500,
      body: { success: false, error: 'Kunne ikke lagre registreringen i databasen' },
    };
  }

  try {
    const newRegistration = buildCustomerFromBody(body);
    await createCustomer(newRegistration);
    return {
      status: 201,
      body: {
        success: true,
        message: 'Registrering er mottatt og lagret i CRM.',
        registration: newRegistration,
      },
    };
  } catch (err: unknown) {
    console.error('Error creating registration in CRM Firestore:', err);
    return {
      status: 500,
      body: { success: false, error: 'Kunne ikke lagre registreringen i databasen' },
    };
  }
}

export async function handlePatchRegistration(
  host: string | undefined,
  id: string,
  body: { status?: RegistrationStatus; adminNotes?: string },
  sessionToken: string | undefined
): Promise<JsonResult> {
  if (!isAdminApiHost(host)) return forbiddenHost();
  if (!isAdminAuthorized(sessionToken)) return unauthorized();
  if (!isCrmDbReady()) {
    return {
      status: 500,
      body: { success: false, error: 'CRM Firestore er ikke konfigurert' },
    };
  }
  try {
    const updated = await updateCustomer(id, body);
    if (!updated) {
      return { status: 404, body: { success: false, error: 'Registrering ikke funnet' } };
    }
    return { status: 200, body: { success: true, registration: updated } };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kunne ikke oppdatere registrering';
    return { status: 500, body: { success: false, error: message } };
  }
}
