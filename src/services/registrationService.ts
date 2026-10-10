import { ChurchRegistration, RegistrationSubmitPayload } from '../types/registration';

async function parseJsonBody<T extends Record<string, unknown>>(
  res: Response
): Promise<{ data: T; isJson: boolean }> {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text().catch(() => '');
    if (text.includes('FUNCTION_INVOCATION_FAILED')) {
      return { data: {} as T, isJson: false };
    }
    return { data: {} as T, isJson: false };
  }
  const data = (await res.json().catch(() => ({}))) as T;
  return { data, isJson: true };
}

export async function submitRegistration(payload: RegistrationSubmitPayload): Promise<{
  success: boolean;
  registration: ChurchRegistration;
}> {
  const res = await fetch('/api/registrations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const data = await res.json();
    return {
      success: true,
      registration: data.registration,
    };
  } else {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Serverfeil ved innsending av registrering');
  }
}

export async function verifyAdminPassword(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password }),
    });
    const { data, isJson } = await parseJsonBody<{ success?: boolean; error?: string }>(res);
    if (!isJson) {
      return {
        success: false,
        error: 'Serveren svarte ikke som forventet. Prøv igjen om litt eller kontakt support.',
      };
    }
    if (res.ok && data.success) {
      return { success: true };
    }
    return {
      success: false,
      error: data.error || (res.ok ? 'Feil passord' : 'Kunne ikke koble til server for verifisering'),
    };
  } catch {
    return { success: false, error: 'Kunne ikke koble til server for verifisering' };
  }
}

export async function checkAdminSession(): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/check', {
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      return Boolean(data.authenticated);
    }
    return false;
  } catch {
    return false;
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    console.warn('Logout error:', err);
  }
}

export async function fetchAllRegistrations(): Promise<ChurchRegistration[]> {
  const res = await fetch('/api/registrations', {
    credentials: 'include',
  });

  if (res.ok) {
    const data = await res.json();
    if (Array.isArray(data.registrations)) {
      return data.registrations;
    }
    return [];
  } else if (res.status === 401) {
    throw new Error('Sesjon utløpt eller krever innlogging som administrator.');
  } else if (res.status === 403) {
    throw new Error('Administrator-API er kun tilgjengelig på crm.menighetsplan.no.');
  } else {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Kunne ikke hente registreringer fra CRM');
  }
}

export async function resendRegistrationConfirmation(
  id: string
): Promise<{ ok: boolean; registration?: ChurchRegistration; error?: string }> {
  try {
    const res = await fetch(`/api/registrations/${encodeURIComponent(id)}/resend-confirmation`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.registration) {
      return { ok: true, registration: data.registration as ChurchRegistration };
    }
    return { ok: false, error: data.error || 'Kunne ikke sende bekreftelse.' };
  } catch {
    return { ok: false, error: 'Kunne ikke sende bekreftelse.' };
  }
}

export async function updateRegistrationStatus(
  id: string,
  status: ChurchRegistration['status'],
  adminNotes?: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/registrations/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status, adminNotes }),
    });
    if (res.ok) return { ok: true };
    const errData = await res.json().catch(() => ({}));
    return { ok: false, error: errData.error || 'Kunne ikke lagre status.' };
  } catch (err) {
    console.warn('Error patching registration status in CRM:', err);
    return { ok: false, error: 'Kunne ikke lagre status.' };
  }
}
