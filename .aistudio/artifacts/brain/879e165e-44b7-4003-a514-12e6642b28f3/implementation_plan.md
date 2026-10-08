# Implementeringsplan: Salgsside & Arkitektur i tråd med Brukerens Vilkår

Denne planen fastsetter den endelige arkitekturen for **menighetsplan.no** (salgssiden i dette repoet) og definerer samspillet med **demo.menighetsplan.no** (som driftes fra appens eget repo) nøyaktig etter produkteiers spesifiserte vilkår.

---

## Brukerens Vilkår & Kritiske Beslutninger

> [!IMPORTANT]
> **Bekreftede vilkår fra produkteier:**
> 1. **Påmeldinger:** `serverToken` fjernes fra regler og kode. Alle kan opprette påmeldinger (`allow create: if true;`). Bare produkteiers innloggede Google-konto (`magnar.totland@gmail.com`) kan lese, endre og slette.
> 2. **Sikkerhet i server & miljø:** Standardverdier for adminpassord og nøkler fjernes fra `server.ts` og `.env.example`. URL-parameteren `adminKey` fjernes.
> 3. **E-postvarsling:** E-postvarsel sendes uten personopplysninger (kun et generisk varsel om ny påmelding).
> 4. **Opprydding i regler & skript:** Appens regler fjernes fra `firestore.rules` (dette prosjektet eier kun regler for `registrations`). Skriptene `scripts/provision-tenant.sh` og `scripts/deploy-rules-all.sh` slettes.
> 5. **Min side i demoen:** Innlogging er Google eller e-postlenke, forfall har ingen begrunnelse, og ingen varsles. Ingen annen flyt skal beskrives.
> 6. **Domener og knapper:** `app.menighetsplan.no` finnes ikke. Handlingsknapper på salgssiden (som «Prøv gratis», «Kom i gang») åpner det lokale påmeldingsskjemaet (`OnboardingModal`). «Se demo»-knapper åpner `https://demo.menighetsplan.no`.
> 7. **Demo-konfigurasjon:** Hvordan demoen settes opp og hva innstillingene heter, bestemmes 100 % i appens eget repo. Demoen får sin egen Firebase-database (adskilt fra kunder), massesletting sperres, og basen nullstilles hver natt.

---

## 1. Oversikt og Ansvarsdeling

```
┌────────────────────────────────────────────────────────────────────────┐
│                   REN OG STRENG ANSVARSDELING                          │
└────────────────────────────────────────────────────────────────────────┘

    GAIS-PROSJEKTET (Dette repoet)              MENIGHETSPLAN-APPENS REPO
      domene: menighetsplan.no                   domene: demo.menighetsplan.no
 ┌────────────────────────────────────┐    ┌────────────────────────────────────┐
 │  Salgsside (menighetsplan.no)      │    │  Ekte Menighetsplan-produkt        │
 ├────────────────────────────────────┤    ├────────────────────────────────────┤
 │ • 100 % rendyrket markedsføringsside│   │ • Eier all kildekode til appen     │
 │ • Formidler Nivå 1 (0,-) og Nivå 2 │    │ • Eier appens Firestore-regler     │
 │ • Påmeldingsskjema (OnboardingModal)│   │ • Eier demo-instansen & setup      │
 │ • Ingen mock/lekedemo-komponenter  │    │ • Egen isolert database for demo   │
 │ • Knapper peker til påmelding      │    │ • Åpne regler i demo, lukkede kund.│
 │ • «Se demo» åpner ekte demo        │    │ • Massesletting sperret            │
 │ • Kun enkle regler for /reg.       │    │ • Nullstilles hver natt            │
 └─────────────────┬──────────────────┘    └─────────────────▲──────────────────┘
                   │                                         │
                   └─────── Klikk på «Se demo» (HTTPS) ──────┘
                             https://demo.menighetsplan.no
```

---

## 2. Detaljerte Endringer i GAIS-Prosjektet (menighetsplan.no)

### 2.1 Firestore-regler (`firestore.rules`)
Alle app-regler (for `pages`, `calendar_events`, `members`, `donations`, `system/entitlements` osv.) fjernes fra dette prosjektet. `firestore.rules` skal utelukkende inneholde:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Påmeldinger fra salgssiden:
    // Alle kan sende inn en påmelding (create).
    // Bare produkteiers innloggede Google-konto kan lese, endre og slette.
    match /registrations/{regId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && 
        request.auth.token.email == "magnar.totland@gmail.com";
    }
  }
}
```

### 2.2 Sikring av `server.ts` og `.env.example`
* **Fjerne hardkodede hemmeligheter:** Standardpassord som `'menighetsplan2026'` og server-hemmelighet `'mp_backend_sec_879e165e'` fjernes helt fra fallback i koden. Hvis miljøvariabel mangler, kreves miljøkonfigurasjon.
* **Fjerne `adminKey` fra URL:** Tilgang til adminpanelet styres ikke lenger via `?adminKey=` i adressefeltet.
* **Fjerne personopplysninger fra e-postvarsel:** Varselet som sendes ved ny påmelding skal kun inneholde en nøytral beskjed:
  * *Emne:* «Ny registrering på menighetsplan.no»
  * *Innhold:* «En ny menighet har registrert interesse på menighetsplan.no. Logg inn i administrasjonspanelet for å se detaljer.» (Ingen navn, e-post eller telefon i e-postteksten).

### 2.3 Sletting av overflødige filer og mock-kode
1. **Slette skript:**
   * `scripts/provision-tenant.sh` (slettes)
   * `scripts/deploy-rules-all.sh` (slettes)
2. **Slette mock-demo fra salgssiden:**
   * `src/components/ChurchDemoView.tsx` (slettes)
   * Mappen `src/components/demo/` (`DemoAdminCms.tsx`, `DemoPublicWebsite.tsx`, `GuidedTourController.tsx`) (slettes)
   * `src/data/demoChurchData.ts` (slettes)
   * `src/components/InteractiveDemoModal.tsx` og `ExternalDemoModal.tsx` hvis de inneholder utdatert flyt.

### 2.4 Navigasjon, knapper og lenker
* **Ingen referanser til `app.menighetsplan.no`:** Alle knapper som inviterer brukeren til å starte en 30 dagers prøveperiode, be om tilbud eller registrere sin menighet (f.eks. i Hero, PricingSection, CtaSection) åpner direkte det lokale skjemaet `OnboardingModal`.
* **«Se demo»-knapper:** Åpner `https://demo.menighetsplan.no` i en ny fane.

---

## 3. Spesifikasjon for Demoen (Forankret i Appens Repo)

I tråd med vilkår 5 og 7:
* **Oppsett & innstillinger:** Defineres og styres fullt og helt i Menighetsplan-appens eget repo.
* **Database & sikkerhet:**
  * Demoen får sin egen Firebase-database (adskilt fra kundenes databaser).
  * Demoen har åpne regler; kundenes baser har lukkede. De blandes aldri.
  * Massesletting er sperret.
  * Databasen nullstilles automatisk hver natt.
* **Min side i demoen:**
  * Innlogging skjer via Google eller e-postlenke.
  * Forfall har ingen begrunnelse.
  * Ingen varsles ved forfall (oppgaven blir kun ledig i bemanningsplanen).

---

## 4. Trinnvis Gjennomføringsrekkefølge

1. **Trinn 1 – Sikkerhet og Miljø:**
   * Oppdatere `server.ts` og `.env.example` for å fjerne default-passord, default-hemmeligheter og URL-basert `adminKey`.
   * Oppdatere e-postvarsling i `server.ts` slik at personopplysninger utelates.
2. **Trinn 2 – Firestore Regler & Skript-opprydding:**
   * Erstatte `firestore.rules` med den rene regelen for `/registrations` (åpen create, lesing/sletting låst til `magnar.totland@gmail.com`).
   * Slette `scripts/provision-tenant.sh` og `scripts/deploy-rules-all.sh`.
   * Deploye de nye reglene via `deploy_firebase`.
3. **Trinn 3 – Sanering av Salgssiden:**
   * Fjerne mock-demo (`ChurchDemoView`, `/src/components/demo/`, `demoChurchData.ts`).
   * Sikre at alle prøveperiode-knapper åpner `OnboardingModal` og «Se demo» åpner `https://demo.menighetsplan.no`.
   * Fjerne alle referanser til `app.menighetsplan.no`.
4. **Trinn 4 – Verifisering:**
   * Kjøre kompilering og bygg for å bekrefte at appleten bygger rent uten feil.
