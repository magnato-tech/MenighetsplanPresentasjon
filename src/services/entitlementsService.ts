/**
 * Tjeneste for å håndtere tilganger og moduler (Entitlements)
 * Leser /system/entitlements fra menighetens database (som kun leverandøren kan endre)
 */

import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured, currentTenantId, isDemoInstance } from './firebaseConfig';
import { ChurchEntitlements, ActiveModules, PlanTier } from '../types/entitlements';

// Standard/fallback oppsett for demo og lokal test
const DEFAULT_DEMO_ENTITLEMENTS: ChurchEntitlements = {
  tier: 'level_2_menighetsplan',
  trial: {
    isActive: true,
    startDate: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    daysRemaining: 30
  },
  activeModules: {
    givertjeneste: false,
    utleie: true,
    arrangement: false,
    kommunikasjon: false,
    skjemaer: false,
    analyse: true,
    aiAssistent: false
  },
  tenantId: currentTenantId,
  tenantName: 'Sentrumskirken Oslo',
  updatedAt: new Date().toISOString()
};

export async function fetchChurchEntitlements(): Promise<ChurchEntitlements> {
  if (isDemoInstance || !isFirebaseConfigured || !db) {
    return DEFAULT_DEMO_ENTITLEMENTS;
  }

  try {
    const docRef = doc(db, 'system', 'entitlements');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as ChurchEntitlements;
    }
  } catch (error) {
    console.warn('Kunne ikke laste /system/entitlements, bruker standard:', error);
  }

  return DEFAULT_DEMO_ENTITLEMENTS;
}

export function canAccessModule(entitlements: ChurchEntitlements, moduleName: keyof ActiveModules): boolean {
  return entitlements.activeModules[moduleName] === true;
}

export function canAccessRosterPlanning(entitlements: ChurchEntitlements): boolean {
  return entitlements.tier === 'level_2_menighetsplan' || entitlements.trial.isActive;
}
