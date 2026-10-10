export type CrmEmailSettings = {
  adminNotifyEmail: string;
  notifyOnNewRegistration: boolean;
  updatedAt: string | null;
};

export type CrmSettingsResponse = {
  success: boolean;
  settings: CrmEmailSettings;
  effective: {
    adminNotifyEmail: string;
    source: 'crm' | 'env' | null;
  };
  capabilities?: {
    resendConfigured: boolean;
    envAdminNotifyEmail: string | null;
    fromAddress: string | null;
  };
};

export async function fetchCrmSettings(): Promise<CrmSettingsResponse> {
  const res = await fetch('/api/admin/settings', { credentials: 'include' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Kunne ikke hente innstillinger');
  }
  return data as CrmSettingsResponse;
}

export async function saveCrmSettings(patch: {
  adminNotifyEmail?: string;
  notifyOnNewRegistration?: boolean;
}): Promise<CrmSettingsResponse> {
  const res = await fetch('/api/admin/settings', {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Kunne ikke lagre innstillinger');
  }
  return data as CrmSettingsResponse;
}
