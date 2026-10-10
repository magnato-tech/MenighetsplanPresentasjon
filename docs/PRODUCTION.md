# Produksjon — sjekkliste og drift

**Vercel-prosjekt:** `menighetsplan-presentasjon`  
**GitHub:** `magnato-tech/MenighetsplanPresentasjon`  
**Domener:** `www.menighetsplan.no`, `crm.menighetsplan.no` (samme deploy)

Detaljert oppsett: [CRM_SETUP.md](CRM_SETUP.md).

## Miljøvariabler (Vercel → Production)

| Variabel | Formål | Merk |
|----------|--------|------|
| `CRM_FIREBASE_PROJECT_ID` | `menighetsplan-crm` | |
| `CRM_FIRESTORE_DATABASE_ID` | `(default)` | |
| `CRM_FIREBASE_SERVICE_ACCOUNT` | Firebase service account JSON, **én linje** | Må starte med `{`. **Ikke** Stripe (`sk_live_…`) eller passord. |
| `ADMIN_PASSWORD` | CRM-innlogging på `crm.menighetsplan.no` | |
| `ADMIN_SESSION_SECRET` | Cookie-signering (anbefalt) | |
| `RESEND_API_KEY` | Sender bekreftelses-e-post | Fra [Resend](https://resend.com) → API Keys (`re_…`) |
| `REGISTRATION_EMAIL_FROM` | Avsender | f.eks. `hei@kontakt.menighetsplan.no` |
| `ADMIN_NOTIFY_EMAIL` | *(Valgfritt)* Fallback for varsel-e-post hvis ikke satt i CRM | f.eks. din Gmail |

Etter endring i env: **Redeploy** Production. Sjekk at aktiv deploy har riktig commit (ikke «Stale» på gammel hash).

## Health

`GET https://www.menighetsplan.no/api/health`

- `firestore.reachable: true` → Firestore OK
- `firestore.credentialsOk: false` + `reason: not_service_account_json` → feil innhold i `CRM_FIREBASE_SERVICE_ACCOUNT`

## Bekreftelses-e-post (Resend)

Resend krever **begge**:

1. **API key** (`RESEND_API_KEY` i Vercel)
2. **Verifisert domene** i Resend ([Domains](https://resend.com/docs/dashboard/domains/introduction) → Add domain → DNS-poster hos domeneleverandør)

Uten verifisert domene feiler sending; bestillingen lagres likevel.

**Flyt ved ny bestilling** ([`api/registrations/index.js`](../api/registrations/index.js)):

1. Lagre i Firestore (`customers`)
2. Send bekreftelse til kundens e-post via Resend ([`api/_lib/registrationEmail.js`](../api/_lib/registrationEmail.js))
3. Send internt varsel (e-post fra CRM-innstillinger, ellers `ADMIN_NOTIFY_EMAIL`)
4. Lagre resultat på kundedokumentet (`confirmationEmailAt`, `adminNotifyAt`, …)

**CRM (høyre panel på kundekortet):**

- Grønn: «Bekreftelse sendt» + tidspunkt
- Rød: «Bekreftelse ikke sendt»

Kun **nye** bestillinger etter at e-post-koden er deployet får disse feltene. Eldre kunder i listen viser ingen logglinje.

**Feilsøking e-post:** Resend → **Emails** / logs for konkret feilmelding (ofte «domain not verified» eller ugyldig `from`). I CRM vises `confirmationEmailReason` som kort forklaring; bruk **Send bekreftelse på nytt** etter at domene er verifisert.

| `confirmationEmailReason` | Betydning |
|---------------------------|-----------|
| `domain_not_verified` | Legg til og verifiser domene i Resend |
| `invalid_from` | Rett `REGISTRATION_EMAIL_FROM` |
| `invalid_api_key` | Rett `RESEND_API_KEY` |
| `recipient_not_allowed` | Verifiser domene, eller test med mottaker = Resend-kontoens e-post |
| `not_configured` | Mangler `RESEND_API_KEY` |

`GET /api/health` → `email.resendApiKeyConfigured`, `email.fromConfigured`, `email.adminNotifyConfigured`.

**Gratis nivå:** Resend Free ca. 3 000 e-poster/mnd, maks 100/dag — mer enn nok for påmeldinger.

## Varsel til eier

**Anbefalt:** Logg inn på `crm.menighetsplan.no` → **Innstillinger** → sett «Varsel til e-post» og slå varsel på/av uten deploy.

Innstillinger lagres i Firestore (`crm_settings/global`). `ADMIN_NOTIFY_EMAIL` i Vercel brukes bare som fallback når CRM-feltet er tomt og varsel er på.

Resend-nøkkel og avsender (`RESEND_API_KEY`, `REGISTRATION_EMAIL_FROM`) må fortsatt ligge i Vercel.

Ved hver ny bestilling får du e-post med menighetsnavn, kontakt og lenke til CRM. CRM viser «Internt varsel sendt til eier» på kundekortet.

## Vanlige feil (historikk)

| Symptom | Årsak |
|---------|--------|
| «Kunne ikke lagre registreringen» | Feil/manglende Firebase JSON i Vercel |
| Status i CRM hopper tilbake | Deploy uten fix for `api/registrations/[id].js` (require-sti) |
| Rød «Bekreftelse ikke sendt» | Mangler Resend, uverifisert domene, eller feil `REGISTRATION_EMAIL_FROM` |

## Nyttig lenker

- Firebase: prosjekt `menighetsplan-crm`
- Resend: [Verified domains](https://resend.com/docs/dashboard/domains/introduction)
