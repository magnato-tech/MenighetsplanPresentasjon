# Arkitektur

Én Vercel-deploy (`menighetsplan-presentasjon`) serverer **to frontend-flater** (host-basert) og **ett API**.

| Host | UI |
|------|-----|
| `www.menighetsplan.no` | `SalesApp` |
| `crm.menighetsplan.no` | `CrmApp` |

Lokal dev: Express + Vite middleware ([`server.ts`](../../server.ts)). Produksjon: `vite build` → `dist/` + Vercel [`api/`](../../api/).

## CRM Firestore

Prosjekt **`menighetsplan-crm`**, database **`(default)`**, samling **`customers`**.

[`lib/crm/`](../../lib/crm/) bruker `@google-cloud/firestore` med `CRM_FIREBASE_SERVICE_ACCOUNT`.

[`lib/crm/hostPolicy.ts`](../../lib/crm/hostPolicy.ts): admin-endepunkter kun fra `crm.menighetsplan.no` (og `crm.localhost` / `localhost` i dev).

## Registreringsflyt

`POST /api/registrations` (alle hosts):

1. Honeypot `hp_company_url`
2. Rate limit per IP
3. Validering → `createCustomer` i Firestore

## Admin

- Signert HttpOnly-cookie `mp_admin_token` (24 t), HMAC med `ADMIN_SESSION_SECRET` eller `ADMIN_PASSWORD`
- `POST /api/admin/login`, `GET /api/admin/check`, `POST /api/admin/logout`, `GET/PATCH /api/registrations` — kun CRM-host
- Ingen e-postvarsling (FormSubmit fjernet)

Se [CRM_SETUP.md](../CRM_SETUP.md) for Vercel-domene og env.
