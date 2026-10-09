import type { ChurchRegistration, RegistrationSubmitBody } from './types.js';

export function buildCustomerFromBody(body: RegistrationSubmitBody): ChurchRegistration {
  return {
    id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    churchName: body.churchName!.trim().substring(0, 200),
    contactName: body.contactName!.trim().substring(0, 150),
    roleTitle: body.roleTitle?.trim().substring(0, 100) || '',
    email: body.email!.trim().substring(0, 150),
    phone: body.phone?.trim().substring(0, 50) || '',
    subdomainSlug: body.subdomainSlug?.trim().substring(0, 63) || '',
    churchSize: body.churchSize || '50_150',
    desiredStartDate: body.desiredStartDate || 'Snarest mulig',
    startDateOption: body.startDateOption || 'asap',
    customDate: body.customDate || '',
    isPilotApplicant: Boolean(body.isPilotApplicant),
    selectedPlan: body.selectedPlan || 'level_2_trial',
    interestedModules: Array.isArray(body.interestedModules)
      ? body.interestedModules.slice(0, 10)
      : [],
    comments: body.comments?.trim().substring(0, 2000) || '',
    sourceUrl: body.sourceUrl || '',
    status: 'pending',
    adminNotes: '',
  };
}

export function validateRegistrationBody(body: RegistrationSubmitBody): string | null {
  if (!body.churchName?.trim() || !body.contactName?.trim() || !body.email?.trim()) {
    return 'Vennligst fyll ut påkrevde felt: Menighetsnavn, kontaktperson og e-post';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(body.email.trim())) {
    return 'Ugyldig e-postadresse';
  }
  return null;
}
