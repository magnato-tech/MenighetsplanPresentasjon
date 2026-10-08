#!/usr/bin/env bash
# ==============================================================================
# Menighetsplan – Utrulling av Firestore Sikkerhetsregler til Alle Instanser
# ==============================================================================
# Ruller ut firestore.rules til demo og alle aktive menighetsprosjekter.
# ==============================================================================

set -e

# Liste over prosjekter for de første 10–20 menighetene
PROJECTS=(
  "menighetsplan-demo"
  "menighetsplan-pilot-sentrum"
  # Nye menigheter legges til her etter hvert som de opprettes:
  # "menighetsplan-kraftverket"
  # "menighetsplan-bydelskirken"
)

echo "Starter utrulling av firestore.rules til ${#PROJECTS[@]} prosjekter..."

for PROJECT in "${PROJECTS[@]}"; do
  echo "--------------------------------------------------"
  echo "Deployer regler til: $PROJECT"
  firebase deploy --only firestore:rules --project "$PROJECT"
done

echo "--------------------------------------------------"
echo "Alle prosjekter er oppdatert med nye sikkerhetsregler!"
