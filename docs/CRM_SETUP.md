# CRM-database og crm.menighetsplan.no

Påmeldinger fra **www.menighetsplan.no** lagres i Firestore-prosjektet **`menighetsplan-crm`**, database **`(default)`**, samling **`customers`**.

**crm.menighetsplan.no** viser innlogging og kundeliste (samme Vercel-deploy som salgssiden). Administrator-API er kun tilgjengelig fra CRM-host.

## 1. Firebase-prosjekt

1. Opprett prosjekt **`menighetsplan-crm`** i [Firebase Console](https://console.firebase.google.com/).
2. **Firestore Database** → Create database → region i Europa.
3. Bruk standarddatabasen **`(default)`** (ikke påkrevd named database `crm`).

## 2. Service account

1. Project settings → **Service accounts** → **Generate new private key**.
2. I Vercel (`menighetsplan-presentasjon`), Environment Variables:

| Variabel | Verdi |
|----------|--------|
| `CRM_FIREBASE_PROJECT_ID` | `menighetsplan-crm` |
| `CRM_FIRESTORE_DATABASE_ID` | `(default)` |
| `CRM_FIREBASE_SERVICE_ACCOUNT` | Hele JSON-filen på én linje |
| `ADMIN_PASSWORD` | Passord for CRM-innlogging |
| `ADMIN_SESSION_SECRET` | Valgfritt, anbefalt i produksjon |

## 3. Firestore-regler

Deploy [`firestore.rules`](firestore.rules) til `menighetsplan-crm`. Samlingen `customers` er lukket for direkte klienttilgang; kun server-API leser og skriver.

## 4. crm.menighetsplan.no på Vercel (samme deploy som www)

**Ikke opprett eget Vercel-prosjekt for CRM.**

1. Vercel → **menighetsplan-presentasjon** → **Settings** → **Domains**.
2. **Add** → `crm.menighetsplan.no`.
3. Hos domeneleverandør: **CNAME** `crm` → verdien Vercel viser (ofte `cname.vercel-dns.com`).
4. `www.menighetsplan.no` / apex skal peke på **samme** Vercel-prosjekt som før.
5. Etter deploy: `https://crm.menighetsplan.no` viser CRM-UI; `https://www.menighetsplan.no` viser salgsside uten admin-snareveier.

Frontend velger app via host ([`src/utils/appHost.ts`](../src/utils/appHost.ts)): `crm.menighetsplan.no` → `CrmApp`, ellers `SalesApp`.

## 5. Verifiser (etter godkjent deploy)

1. `GET https://www.menighetsplan.no/api/health` → `"firestore": true`
2. Send inn skjema på www → nytt dokument i `customers`
3. `https://crm.menighetsplan.no` → logg inn → se kunden
4. `POST https://www.menighetsplan.no/api/admin/login` → **403** (admin-API kun på CRM-host)

## Lokal utvikling

```bash
cp .env.example .env
# Fyll inn CRM_* og ADMIN_PASSWORD
npm install --legacy-peer-deps
npm run dev
```

| URL | App |
|-----|-----|
| `http://localhost:3000` | Salgsside |
| `http://crm.localhost:3000` (legg `127.0.0.1 crm.localhost` i hosts) | CRM |
| eller `VITE_FORCE_CRM=true` i `.env` | CRM på localhost |

API på port 3000. I utvikling tillates admin-API også fra `localhost` (se [`lib/crm/hostPolicy.ts`](../lib/crm/hostPolicy.ts)).
