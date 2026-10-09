# Sider og komponenter

Ingen React Router. [`src/main.tsx`](../../src/main.tsx) velger app via [`src/utils/appHost.ts`](../../src/utils/appHost.ts).

## SalesApp (www)

[`src/SalesApp.tsx`](../../src/SalesApp.tsx) — samme seksjonsrekkefølge som før:

Navbar → Hero → Problem → Plattform → CMS → Kalender → Extensions → Menigheter → Priser → Om → FAQ → CTA → Footer.

Modal: `OnboardingModal` (påmelding). **Ingen** admin på salgssiden.

## CrmApp (crm.)

[`src/CrmApp.tsx`](../../src/CrmApp.tsx) + [`AdminRegistrationsPanel`](../../src/components/AdminRegistrationsPanel.tsx) — innlogging, kundeliste, status.

Demo-lenke på salg: `https://demo.menighetsplan.no` (uendret).
