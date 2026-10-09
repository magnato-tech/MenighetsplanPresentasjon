export function isCrmHost(): boolean {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname.toLowerCase();

  if (hostname === 'crm.menighetsplan.no' || hostname === 'crm.localhost') {
    return true;
  }

  if (import.meta.env.VITE_FORCE_CRM === 'true') {
    return true;
  }

  return false;
}
