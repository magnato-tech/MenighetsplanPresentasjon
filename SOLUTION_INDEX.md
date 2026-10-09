# Menighetsplan — presentasjonsside + CRM-host

**Repo:** [magnato-tech/MenighetsplanPresentasjon](https://github.com/magnato-tech/MenighetsplanPresentasjon)  
**Vercel:** `menighetsplan-presentasjon` (én deploy for www og crm)

| Host | Frontend |
|------|----------|
| `www.menighetsplan.no` | `SalesApp` — salg + påmeldingsskjema |
| `crm.menighetsplan.no` | `CrmApp` — innlogging + kundeliste |

**Stack:** React 19, Vite 8, TypeScript, Tailwind 4, Express (lokal), Vercel `api/`, Firebase Admin SDK via [`lib/crm/`](lib/crm/).

Dypere dokumentasjon: [docs/prosjekt/README.md](docs/prosjekt/README.md), [docs/CRM_SETUP.md](docs/CRM_SETUP.md).

## Data

- Firebase-prosjekt **`menighetsplan-crm`**, database **`(default)`**, samling **`customers`**
- `POST /api/registrations` (åpen på alle hosts) — skjema fra salgssiden
- Admin-API (`/api/admin/*`, `GET/PATCH /api/registrations`) kun fra CRM-host (server [`hostPolicy`](lib/crm/hostPolicy.ts))

## Mapper

| Sti | Rolle |
|-----|--------|
| `src/main.tsx` | `isCrmHost()` → `CrmApp` eller `SalesApp` |
| `src/SalesApp.tsx` | Salgsside + `OnboardingModal` |
| `src/CrmApp.tsx` | CRM-shell |
| `src/components/AdminRegistrationsPanel.tsx` | Kundeliste og oppfølging |
| `lib/crm/` | Firestore, auth, handlers |
| `api/` | Vercel serverless |
| `server.ts` | Lokal dev (samme API) |

## Kjør lokalt

```bash
npm install --legacy-peer-deps
npm run dev
```

Krever `.env` med `CRM_FIREBASE_*` og `ADMIN_PASSWORD`.
