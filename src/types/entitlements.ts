/**
 * Entitlement- og tilgangsmodeller for Menighetsplan
 * Håndhever Nivå 1 (Gratis), Nivå 2 (499,-) og de 7 Tilleggsmodulene (99,-/mnd)
 */

export type PlanTier = 'level_1_gratis' | 'level_2_menighetsplan';

export interface TrialInfo {
  isActive: boolean;
  startDate: string;
  expiresAt: string;
  daysRemaining: number;
}

export interface ActiveModules {
  givertjeneste: boolean;
  utleie: boolean;
  arrangement: boolean;
  kommunikasjon: boolean;
  skjemaer: boolean;
  analyse: boolean;
  aiAssistent: boolean;
}

export interface ChurchEntitlements {
  tier: PlanTier;
  trial: TrialInfo;
  activeModules: ActiveModules;
  tenantId: string;
  tenantName: string;
  updatedAt: string;
}

export interface MemberAssignment {
  id: string;
  personName: string;
  groupName: string;
  gatheringTitle: string;
  gatheringDate: string;
  roleName: string;
  taskTitle: string;
  status: 'forespart' | 'bekreftet' | 'forfall' | 'oppfulgt';
  notes?: string;
  replacementPerson?: string;
}

export interface TenantConfig {
  tenantId: string;
  name: string;
  slug: string;
  isDemo: boolean;
  firebaseProjectId?: string;
}
