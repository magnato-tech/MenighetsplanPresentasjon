#!/usr/bin/env bash
# ==============================================================================
# Menighetsplan – Oppsettsskript og Sjekkliste for Ny Menighet / Pilot
# ==============================================================================
# Kodebase: magnato-tech/menighetsplan_modul
#
# Viktig skille:
# - demo.menighetsplan.no  = Offentlig fungerende demo med egen Firebase og Nivå 2
# - pilot.menighetsplan.no = Ekte pilotmenighet med egen, adskilt Firebase
# Demo og pilot skal ALDRI blandes!
#
# Merk om moduler/entitlements:
# Eksempler på entitlements som "analyse: true" er kun illustrative data.
# Selve modulstyringen og datamodellen eies av app-repoet magnato-tech/menighetsplan_modul.
#
# Eksempel på bruk:
#   ./scripts/provision-tenant.sh "sentrumskirken-pilot" "Sentrumskirken Oslo" "post@sentrumskirken.no"
# ==============================================================================

set -e

TENANT_SLUG=$1
TENANT_NAME=$2
CONTACT_EMAIL=$3

if [ -z "$TENANT_SLUG" ] || [ -z "$TENANT_NAME" ] || [ -z "$CONTACT_EMAIL" ]; then
  echo "Bruk: $0 <tenant-slug> <\"Menighetsnavn\"> <kontakt-epost>"
  echo "Eksempel: $0 sentrumskirken-pilot \"Sentrumskirken Oslo\" \"kontakt@sentrumskirken.no\""
  exit 1
fi

GCP_PROJECT_ID="menighetsplan-${TENANT_SLUG}"
SUBDOMAIN="${TENANT_SLUG}.menighetsplan.no"

echo "=================================================================="
echo " STARTER OPPRETTELSE AV MENIGHETSPLAN FOR: ${TENANT_NAME}"
echo "=================================================================="
echo " Slug:              ${TENANT_SLUG}"
echo " GCP Prosjekt-ID:   ${GCP_PROJECT_ID}"
echo " Nettadresse:       https://${SUBDOMAIN}"
echo " Kontakt e-post:    ${CONTACT_EMAIL}"
echo " App-repo:          magnato-tech/menighetsplan_modul"
echo "=================================================================="

# SJEKKLISTE 1: Google Cloud & Firebase
echo ""
echo "[STEG 1/4] Klargjør Firebase-prosjekt:"
echo "------------------------------------------------------------------"
echo " 1. Opprett GCP-prosjekt: gcloud projects create ${GCP_PROJECT_ID} --name=\"${TENANT_NAME}\""
echo " 2. Knytt billing-konto: gcloud beta billing projects link ${GCP_PROJECT_ID} --billing-account=VÅR_BILLING_ID"
echo " 3. Aktiver Firebase: firebase projects:addfirebase ${GCP_PROJECT_ID}"
echo " 4. Opprett Firestore i Frankfurt: gcloud firestore databases create --project=${GCP_PROJECT_ID} --region=europe-west3"
echo " 5. Aktiver Email Auth i Firebase Console"
echo " 6. Deploy sikkerhetsregler: firebase deploy --only firestore:rules --project=${GCP_PROJECT_ID}"

# SJEKKLISTE 2: Tilgangsdokument (/system/entitlements)
echo ""
echo "[STEG 2/4] Skriv beskyttet tilgangsdokument (/system/entitlements):"
echo "------------------------------------------------------------------"
echo " Kjører initialisering med 30 dagers prøveperiode for Nivå 2..."
echo " Dokument opprettes i Firestore /system/entitlements med:"
echo "   - tier: 'level_2_menighetsplan'"
echo "   - trial.isActive: true (30 dager)"
echo "   - activeModules: { givertjeneste: false, utleie: false, arrangement: false, kommunikasjon: false, skjemaer: false, analyse: false, aiAssistent: false }"
echo " (Merk: Eksempeldata. Faktisk modulhåndtering eies av magnato-tech/menighetsplan_modul)"

# SJEKKLISTE 3: Vercel Prosjekt & Miljøvariabler
echo ""
echo "[STEG 3/4] Opprett Vercel-prosjekt fra app-repoet (magnato-tech/menighetsplan_modul):"
echo "------------------------------------------------------------------"
echo " 1. Koble repo magnato-tech/menighetsplan_modul til nytt Vercel-prosjekt: ${TENANT_SLUG}"
echo " 2. Sett miljøvariabler i Vercel:"
echo "    - VITE_TENANT_ID = ${TENANT_SLUG}"
echo "    - VITE_TENANT_NAME = \"${TENANT_NAME}\""
echo "    - VITE_FIREBASE_PROJECT_ID = ${GCP_PROJECT_ID}"
echo "    - VITE_FIREBASE_AUTH_DOMAIN = ${GCP_PROJECT_ID}.firebaseapp.com"
echo "    - VITE_FIREBASE_API_KEY = <Hentes fra Firebase Web App i GCP-konsollen>"
echo "    - VITE_IS_DEMO = false"
echo " 3. Tildel domene: ${SUBDOMAIN}"
echo " 4. Trigger deployment fra main-branch"

# SJEKKLISTE 4: Verifisering & Kundeoverlevering
echo ""
echo "[STEG 4/4] Verifisering og velkomst:"
echo "------------------------------------------------------------------"
echo " [ ] Gå til https://${SUBDOMAIN} og sjekk at siden laster"
echo " [ ] Verifiser at /system/entitlements lastes med Nivå 2 aktiv (og at det IKKE er demo-instansen)"
echo " [ ] Send velkomst-e-post til ${CONTACT_EMAIL} med innloggingslenke"
echo ""
echo "Fullført sjekkliste for ${TENANT_NAME}!"
