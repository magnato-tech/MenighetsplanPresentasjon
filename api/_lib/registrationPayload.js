function buildCustomerFromBody(body) {
  return {
    id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    churchName: String(body.churchName || '').trim().substring(0, 200),
    contactName: String(body.contactName || '').trim().substring(0, 150),
    roleTitle: String(body.roleTitle || '').trim().substring(0, 100),
    email: String(body.email || '').trim().substring(0, 150),
    phone: String(body.phone || '').trim().substring(0, 50),
    subdomainSlug: String(body.subdomainSlug || '').trim().substring(0, 63),
    churchSize: body.churchSize || '50_150',
    desiredStartDate: body.desiredStartDate || 'Snarest mulig',
    startDateOption: body.startDateOption || 'asap',
    customDate: body.customDate || '',
    isPilotApplicant: Boolean(body.isPilotApplicant),
    selectedPlan: body.selectedPlan || 'level_2_trial',
    interestedModules: Array.isArray(body.interestedModules)
      ? body.interestedModules.slice(0, 10)
      : [],
    comments: String(body.comments || '').trim().substring(0, 2000),
    sourceUrl: body.sourceUrl || '',
    status: 'pending',
    adminNotes: '',
  };
}

function validateRegistrationBody(body) {
  if (!body.churchName?.trim() || !body.contactName?.trim() || !body.email?.trim()) {
    return 'Vennligst fyll ut påkrevde felt: Menighetsnavn, kontaktperson og e-post';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(String(body.email).trim())) {
    return 'Ugyldig e-postadresse';
  }
  return null;
}

module.exports = {
  buildCustomerFromBody,
  validateRegistrationBody,
};
