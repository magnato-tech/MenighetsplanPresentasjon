import { ChurchRegistration, RegistrationSubmitPayload } from '../types/registration';

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
    const data = await res.json().catch(() => ({} as { success?: boolean; error?: string }));
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

export async function updateRegistrationStatus(
  id: string,
  status: ChurchRegistration['status'],
  adminNotes?: string
): Promise<boolean> {
  try {
    const res = await fetch(`/api/registrations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status, adminNotes }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Error patching registration status in CRM:', err);
    return false;
  }
}
