export interface ChurchRegistration {
  id: string;
  createdAt: string; // ISO string
  churchName: string;
  contactName: string;
  roleTitle?: string;
  email: string;
  phone?: string;
  subdomainSlug?: string;
  churchSize: string;
  desiredStartDate: string;
  startDateOption: 'asap' | 'within_2_weeks' | 'next_month' | 'custom';
  customDate?: string;
  isPilotApplicant: boolean;
  selectedPlan: 'level_2_trial' | 'level_1_gratis';
  interestedModules: string[];
  comments?: string;
  status: 'pending' | 'contacted' | 'ready' | 'declined';
  adminNotes?: string;
  sourceUrl?: string;
  /** ISO-tidspunkt for sist forsøk på bekreftelses-e-post */
  confirmationEmailAt?: string;
  confirmationEmailOk?: boolean;
  confirmationEmailFailedAt?: string | null;
  confirmationEmailReason?: string | null;
}

export interface RegistrationSubmitPayload {
  churchName: string;
  contactName: string;
  roleTitle?: string;
  email: string;
  phone?: string;
  subdomainSlug?: string;
  churchSize: string;
  desiredStartDate: string;
  startDateOption: 'asap' | 'within_2_weeks' | 'next_month' | 'custom';
  customDate?: string;
  isPilotApplicant: boolean;
  selectedPlan: 'level_2_trial' | 'level_1_gratis';
  interestedModules: string[];
  comments?: string;
  sourceUrl?: string;
  hp_company_url?: string;
}
