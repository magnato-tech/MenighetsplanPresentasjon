# Persistent Firestore-lagring, Express Backend & E-postvarsling (Revidert)

Revidert arkitektur- og implementeringsplan for overgang til skybasert Firestore-lagring, isolert Express-backend med spam-beskyttelse, HttpOnly-sikret administrator-sesjon, og full ende-til-ende verifisering.

## Brukeravklaringer & Sikkerhetsavklaringer

> [!IMPORTANT]
> Svar på de 5 spesifikke spørsmålene og sikkerhetstiltakene:

1. **Admin-sesjonen (HttpOnly Cookie)**:
   - Innloggingen oppgraderes til å sette en **`HttpOnly`, `SameSite=Strict` og `Secure` sesjons-cookie** (`admin_session`) fra serveren ved vellykket `POST /api/admin/verify`.
   - Fordi cookien er `HttpOnly`, kan den **aldri leses eller manipuleres av JavaScript i nettleseren**, noe som eliminerer risiko for token-tyveri via XSS.
   - API-støtte for `x-admin-key`-header beholdes som alternativ kun for automatiserte verifiseringstester via server/curl.
2. **Admin-passordet (`ADMIN_PASSWORD`)**:
   - `ADMIN_PASSWORD` leses **utelukkende fra `process.env.ADMIN_PASSWORD` på Node.js-serveren**.
   - Det har **ingen `VITE_`-prefiks**, vil aldri inkluderes i klientens JavaScript-bundle, og sendes aldri til frontend i noen respons. Hvis ingen miljøvariabel er satt, kreves konfigurasjon før admin-funksjoner åpnes.
3. **Beskyttelse av offentlig registreringsendepunkt (Anti-Spam)**:
   - **Honeypot-felt**: Et usynlig skjema-felt (`website_company_hp`) som vanlige brukere aldri ser eller fyller ut, men som automatiske spamboter fyller ut. Hvis feltet inneholder verdi, avvises forespørselen umiddelbart.
   - **Server Rate Limiting**: Innebygd IP-basert hastighetsbegrensning (f.eks. maks 5 innsendinger per 15 minutter per IP-adresse) for å forhindre flomangrep.
   - **Skjemavalidering**: Streng sjekk av e-postformat, telefonnummer og strenglengder før lagring.
4. **Isolert Firestore-tilgang (Klient vs. Server)**:
   - Klienten får **ingen direkte lesetilgang** til `registrations`-samlingen i Firestore.
   - Sikkerhetsreglene i `firestore.rules` stenger samlingen helt for offentlig klientlesing (`allow read, write: if false;`).
   - All skriving og lesing skjer eksklusivt gjennom Express-backendens servertilkobling, slik at ingen persondata kan hentes ut fra nettleseren eller eksterne klient-SDK-er.
5. **Komplett Produksjonstest**:
   - Etter implementering kjøres en full ende-til-ende-test som dokumenteres steg for steg:
     $$\text{Skjema} \;\longrightarrow\; \text{Firestore} \;\longrightarrow\; \text{E-postvarsel} \;\longrightarrow\; \text{Admin-innlogging} \;\longrightarrow\; \text{Statusoppdatering}$$

---

## 1. Oversikt & Kjernekonsept

- **Hva løsningen leverer**:
  1. Offentlige menighetskunder fyller ut "Prøv Menighetsplan gratis".
  2. Frontend poster til `POST /api/registrations`.
  3. Serveren sjekker honeypot og rate limiting, lagrer i Firestore med tidsstempel, og trigger e-postvarsel til `magnar.totland@gmail.com`.
  4. Kunden mottar en trygg, profesjonell bekreftelsesside.
  5. Magnar logger inn med passord, mottar en sikker `HttpOnly`-cookie, og administrerer henvendelsene i Firestore i sanntid.
- **Kjerneverdi**: 100 % uavhengig av lokale filer og containere; data er permanent bevart i skyen med sterk tilgangskontroll og GDPR-vern.

---

## 2. Brukeropplevelse & Grensesnitt

### Kjerneflyter
1. **Menighetens registrering**:
   - 2-stegs registrering for menighetsnavn, kontaktperson, rolle, e-post, telefon, menighetsstørrelse og oppstart.
   - Innsending med visuell ventestatus.
   - Bekreftelse med tydelig beskjed: *"Vi har mottatt registreringen og tar kontakt innen 1–2 virkedager for å klargjøre prøveperioden."* Ingen interne tekniske detaljer lekkes.
2. **Administrasjonsgrensesnitt**:
   - Åpnes via diskret snarvei (`Shift + Alt + A`) eller URL-parameter (`?admin=true`).
   - Låseskjerm med passordfelt.
   - Ved godkjenning: Dashbord med statusmerking (`Ny`, `Kontaktet`, `Aktiv`, `Avslått`), notatblokk for oppfølging og sanntidsstatistikk.

---

## 3. Teknisk Sikkerhetsarkitektur

### Forespørselsflyt & Beskyttelseslag

```
┌────────────────────────────────────────────────────────────────────────┐
│                        OFFENTLIG KLIENT (Nettleser)                    │
│                                                                        │
│   Skjemainnsending (inkl. usynlig Honeypot-felt "website_company_hp")  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ POST /api/registrations
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       EXPRESS BACKEND (server.ts)                      │
│                                                                        │
│   [Sikkerhetslag 1: Rate Limiter] -> Maks 5 per 15 min per IP          │
│   [Sikkerhetslag 2: Honeypot-sjekk] -> Avvis hvis bot har fylt felt    │
│   [Sikkerhetslag 3: Skjemavalidering] -> Gyldig e-post og obligatorisk │
│                                                                        │
│                 ┌─────────────────┴─────────────────┐                  │
│                 ▼                                   ▼                  │
│   [Firestore Server-klient]               [E-postvarsling]             │
│   Skriver til /registrations/{id}         Sender til magnar.totland    │
└─────────────────┬───────────────────────────────────┬──────────────────┘
                  │                                   │
                  ▼                                   ▼
      Google Cloud Firestore               magnar.totland@gmail.com
      (Stengt for offentlig klient)        (Varsel om ny registrering)
```

### Autentiseringsflyt for Admin

```
Magnar taster passord -> POST /api/admin/verify -> Server sjekker process.env.ADMIN_PASSWORD
                                                -> Setter Set-Cookie: admin_session=...; HttpOnly; SameSite=Strict; Secure
                                                -> Returnerer { success: true }

GET /api/registrations -> Express requireAdminAuth sjekker HttpOnly-cookie
                       -> Henter registreringer fra Firestore
                       -> Returnerer kun til verifisert administrator
```

---

## 4. Test- og Verifiseringsplan (Ende-til-ende)

Under gjennomføringen vil vi utføre og dokumentere:
1. **Bot-test**: Sende forespørsel med honeypot-felt for å verifisere at spam avvises umiddelbart.
2. **Uautorisert test**: Sende `GET /api/registrations` uten cookie for å verifisere `HTTP 401 Unauthorized`.
3. **Ekte registrering**: Sende inn en gyldig prøveperiode-registrering fra nettsiden.
4. **Firestore-bekreftelse**: Kontrollere at registreringen finnes med full struktur i Firestore.
5. **E-postverifisering**: Kontrollere at varslingsforespørselen til `magnar.totland@gmail.com` er utført og logget.
6. **Admin-innlogging**: Logge inn med admin-passord, motta HttpOnly cookie, verifisere at registreringen vises i tabellen, og endre status til `Kontaktet`.
