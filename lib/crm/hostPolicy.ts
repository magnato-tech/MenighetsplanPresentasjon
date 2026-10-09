export function isAdminApiHost(hostHeader: string | undefined): boolean {
  if (!hostHeader) return false;

  const host = hostHeader.split(':')[0].toLowerCase();

  if (host === 'crm.menighetsplan.no' || host === 'crm.localhost') {
    return true;
  }

  if (process.env.NODE_ENV !== 'production') {
    return host === 'localhost' || host === '127.0.0.1';
  }

  return false;
}

export function adminHostForbidden(): { status: number; body: Record<string, unknown> } {
  return {
    status: 403,
    body: {
      success: false,
      error: 'Administrator-API er kun tilgjengelig på crm.menighetsplan.no.',
    },
  };
}
