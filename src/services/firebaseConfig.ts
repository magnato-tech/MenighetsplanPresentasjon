/**
 * Dynamisk Firebase-konfigurasjon for Menighetsplan
 * Leser prosjekt og nøkler fra installasjonens miljøvariabler (VITE_FIREBASE_*).
 * Har ingen hardkodede adresser, slik at samme kodebase kan deployes til alle menigheter.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

export interface FirebaseClientConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

// Sikker lesing av miljøvariabler i både nettleser (Vite) og Node.js (test/server)
const getEnvVar = (key: string): string | undefined => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env[key];
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
};

// Les dynamisk fra miljøvariabler satt i Vercel for denne spesifikke menigheten
export const currentFirebaseConfig: FirebaseClientConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID'),
};

export const currentTenantId = getEnvVar('VITE_TENANT_ID') || 'demo-sentrumskirken';

export const isDemoInstance = 
  getEnvVar('VITE_IS_DEMO') === 'true' || 
  (typeof window !== 'undefined' && Boolean(new URLSearchParams(window.location.search).get('demo')));

let firebaseApp: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

// Sjekk om ekte Firebase-nøkler er konfigurert for denne installasjonen
export const isFirebaseConfigured = Boolean(
  currentFirebaseConfig.apiKey && 
  currentFirebaseConfig.projectId
);

if (isFirebaseConfigured) {
  try {
    firebaseApp = getApps().length === 0 ? initializeApp(currentFirebaseConfig) : getApp();
    db = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);
  } catch (err) {
    console.warn('Kunne ikke initialisere Firebase med oppgitte miljøvariabler:', err);
  }
}

export { firebaseApp, db, auth };
