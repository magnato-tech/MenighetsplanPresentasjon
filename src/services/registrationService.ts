import { ChurchRegistration, RegistrationSubmitPayload } from '../types/registration';

/**
 * Submits registration to the central backend API which stores it persistently in Firestore
 * and triggers email notification to magnar.totland@gmail.com.
 */
export async function submitRegistration(payload: RegistrationSubmitPayload): Promise<{
  success: boolean;
  registration: ChurchRegistration;
  emailNotified?: boolean;
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
      emailNotified: data.emailNotified,
    };
  } else {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Serverfeil ved innsending av registrering');
  }
}

/**
 * Verifies admin password and establishes an HttpOnly session cookie with the server.
 */
export async function verifyAdminPassword(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true };
    }
    return { success: false, error: data.error || 'Feil passord' };
  } catch (err: any) {
    return { success: false, error: 'Kunne ikke koble til server for verifisering' };
  }
}

/**
 * Checks if current browser session has a valid HttpOnly admin session.
 */
export async function checkAdminSession(): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/check', {
      credentials: 'include'
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

/**
 * Logs out administrator by clearing server session cookie.
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (err) {
    console.warn('Logout error:', err);
  }
}

/**
 * Fetches all church registrations from persistent Firestore database.
 * Requires valid administrator authentication (HttpOnly session cookie).
 */
export async function fetchAllRegistrations(): Promise<ChurchRegistration[]> {
  const res = await fetch('/api/registrations', {
    credentials: 'include'
  });

  if (res.ok) {
    const data = await res.json();
    if (Array.isArray(data.registrations)) {
      return data.registrations;
    }
    return [];
  } else if (res.status === 401) {
    throw new Error('Sesjon utløpt eller krever innlogging som administrator.');
  } else {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Kunne ikke hente registreringer fra Firestore');
  }
}

/**
 * Updates registration follow-up status or internal notes in Firestore.
 */
export async function updateRegistrationStatus(
  id: string, 
  status: ChurchRegistration['status'], 
  adminNotes?: string
): Promise<boolean> {
  try {
    const res = await fetch(`/api/registrations/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ status, adminNotes })
    });
    return res.ok;
  } catch (err) {
    console.warn('Error patching registration status in Firestore:', err);
    return false;
  }
}

/**
 * Triggers a test notification email to magnar.totland@gmail.com
 */
export async function triggerTestNotification(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/test-notification', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    return { success: data.success, message: data.message || 'Varsel-test utført' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Kunne ikke koble til server' };
  }
}
