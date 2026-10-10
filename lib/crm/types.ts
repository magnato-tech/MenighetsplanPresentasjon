export type RegistrationStatus = 'pending' | 'contacted' | 'ready' | 'declined';

export interface ChurchRegistration {
  id: string;
  createdAt: string;
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
  status: RegistrationStatus;
  adminNotes?: string;
  sourceUrl?: string;
  updatedAt?: string;
  confirmationEmailAt?: string;
  confirmationEmailOk?: boolean;
  confirmationEmailFailedAt?: string | null;
  confirmationEmailReason?: string | null;
  adminNotifyAt?: string;
  adminNotifyOk?: boolean;
  adminNotifyReason?: string | null;
}

export interface RegistrationSubmitBody {
  churchName?: string;
  contactName?: string;
  roleTitle?: string;
  email?: string;
  phone?: string;
  subdomainSlug?: string;
  churchSize?: string;
  desiredStartDate?: string;
  startDateOption?: ChurchRegistration['startDateOption'];
  customDate?: string;
  isPilotApplicant?: boolean;
  selectedPlan?: ChurchRegistration['selectedPlan'];
  interestedModules?: string[];
  comments?: string;
  sourceUrl?: string;
  hp_company_url?: string;
}
