# Menighetsplan – Prismodell & Produktarkitektur

Oppdatering av pris- og produktmodellen på `menighetsplan.no` til to distinkte kjernenivåer pluss en modulær utvidelsesmodell:
1. **🟢 Kort 1: Menighetsplattform (Gratis – 0 kr)** – *«Hva skjer i menigheten?»*
2. **🔵 Kort 2: Menighetsplan (499 kr/mnd – Mest populær)** – *«Hvem skal gjøre hva?»*
3. **🟣 Tilleggsmoduler (99 kr/mnd per modul)** – Skreddersy med 7 spesialiserte moduler etter behov.
4. **Prøveperiode & Demo**: «Prøv Menighetsplan gratis i én måned» og fungerende Nivå 2-demo.

> [!IMPORTANT]
> **Kjerneprinsippene i den nye modellen:**
> - **To hovednivåer (ikke tre faste pakker)**:
>   - **Menighetsplattform (0 kr)** dekker all offentlig formidling og samlingsplanlegging: Nettside, CMS, arrangementskalender, kjøreplan/program, dynamiske innholdsmoduler og enkel Min Side.
>   - **Menighetsplan (499 kr/mnd)** organiserer menneskene: `Person → Gruppe → Samling → Rolle → Oppgave → Bemanning → Svar → Forfall → Oppfølging`.
> - **Modulære tillegg til 99 kr/mnd per modul**: I stedet for en fast 999-pakke, kan menigheten aktivere nøyaktig de modulene de trenger for 99 kr/mnd per modul: *Givertjeneste*, *Utleie*, *Arrangement*, *Kommunikasjon*, *Skjemaer*, *Analyse* og *AI-assistent*.
> - **Utleie er inkludert som ny modul**: Lokaler, tilgjengelighet, booking, avtaler, betaling og inntektsoversikt.
> - **Tydelig risikofri inngang**: «Opprett egen menighet og prøv Menighetsplan gratis i én måned» + «Se interaktiv demo».

---

## 1. De To Hovedproduktene

### 🟢 KORT 1: MENIGHETSPLATTFORM
**Pris:** Gratis (0 kr / alltid gratis)  
**Kjernespørsmål:** *«Hva skjer i menigheten?»*  
**Beskrivelse:** En komplett digital grunnplattform for menigheten, med nettside, moderne CMS, kalender og en enkel Min Side.

- **Nettside og CMS**:
  - Moderne, responsiv nettside
  - Moderne CMS med Live Preview før publisering
  - Sider og innhold
  - Nyheter
  - Taler og lydarkiv
  - Mediebibliotek
  - Design og designsystem
  - SEO
- **Kalender og samlingsplanlegging**:
  - Offentlig kalender
  - Gudstjenester og andre offentlige samlinger
  - Samlingsplanlegging
  - Program/kjøreplan for samlinger
  - Offentlige arrangementer
- **Dynamiske innholdsmoduler**:
  - Henter data direkte fra menighetens administrasjon og viser dette automatisk på nettsiden.
  - *Eksempler*: Neste gudstjeneste, kommende arrangementer, kalender, siste nyheter og siste taler.
  - Redaktøren legger modulen inn én gang; nettsiden oppdaterer seg selv når administrasjonen endres.
- **Min Side (Enkel inngang)**:
  - Neste i menigheten
  - Kommende samlinger
  - Lenker til relevant innhold

---

### 🔵 KORT 2: MENIGHETSPLAN
**Pris:** 499 kr/mnd (Mest populær – Hovedprodukt)  
**Kjernespørsmål:** *«Hvem skal gjøre hva?»*  
**Beskrivelse:** Alt i Menighetsplattform, pluss verktøyene for å organisere menighetens arbeid og mennesker.

- **Kjernen i Menighetsplan (Visuell prosessflyt)**:
  `Person → gruppe → samling → rolle → oppgave → bemanning → svar → forfall → oppfølging`
- **Inkluderer**:
  - Personer / medlemsregister
  - Tjenestegrupper og gruppeledere
  - Husfellesskap
  - Roller og oppgaver
  - Bemanning og forespørsler
  - Bekreftelser og svar
  - Forfall og automatisk oppfølging
  - Min Side med personlige oppgaver og tjenestelister
  - Gruppechat
  - Oppstart og hjelp med å komme i gang (inkludert)
- **Handlinger**:
  - **Kom i gang:** Opprett egen menighet og prøv gratis i én måned (ingen binding).
  - **Se demo:** Test en fungerende demonstrasjon av bemanningsflyten.

---

## 2. Tilleggsmoduler (99 kr/mnd per modul)

Under de to hovedkortene vises en oversiktlig modulvelger der menigheten kan aktivere funksjoner etter behov for **99 kr/mnd per modul**:

1. **Givertjeneste (99 kr/mnd)**:
   - Vipps-integrasjon
   - Engangsgaver og faste giveravtaler
   - Giveroversikt og gavehistorikk
   - Rapportering og årsoppgaver til Skatteetaten
2. **Utleie (99 kr/mnd)**:
   - Lokaler og romoversikt
   - Tilgjengelighetskalender
   - Bookingforespørsler og leieavtaler
   - Betaling og inntektsoversikt (kan senere kobles mot helhetlig økonomi)
3. **Arrangement & Registrering (99 kr/mnd)**:
   - Påmelding og registrering
   - Deltakerlister og ventelister
   - Betaling
   - Digital check-in på samlinger
4. **Kommunikasjon (99 kr/mnd)**:
   - SMS-utsending
   - E-post og nyhetsbrev
   - Målrettede utsendelser til grupper, team og deltakere
5. **Skjemaer (99 kr/mnd)**:
   - Fleksibel skjemabygger
   - Påmeldings- og informasjonsskjemaer
   - Spørreundersøkelser
6. **Analyse (99 kr/mnd)**:
   - *Nettsideanalyse*: Besøk, trafikk, mest brukte sider, utvikling over tid.
   - *Menighetsanalyse*: Aktivitet i grupper, samlingsdeltakelse, bemanningsgrad, oppgaver og forfall, samt frivillig involvering over tid.
7. **AI-assistent (99 kr/mnd)**:
   - GDPR-sikker assistent for menigheten.
   - Avgrenset tilgang til menighetens egne data (ikke fri eller ukontrollert tilgang til databasen).
   - Hjelper med utkast til innhold, samlingsplaner og administrative arbeidsprosesser.

---

## 3. Visuell Presentasjon & UI-Struktur

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PricingSection.tsx                                │
├──────────────────────────────────────────┬──────────────────────────────────┤
│    🟢 KORT 1: MENIGHETSPLATTFORM         │   🔵 KORT 2: MENIGHETSPLAN       │
│               0 kr                       │         499 kr/mnd               │
│                                          │       [Mest populær]             │
│   «Hva skjer i menigheten?»              │   «Hvem skal gjøre hva?»         │
│   - Nettside & CMS m/ Live Preview       │   - Alt i Menighetsplattform     │
│   - Lydarkiv & taler                     │   - Personer & medlemsregister   │
│   - Kalender & samlingsplanlegging       │   - Tjenestegrupper & roller     │
│   - Kjøreplan / program for samlinger    │   - Forespørsler, svar & forfall │
│   - Dynamiske innholdsmoduler            │   - Min Side & Gruppechat        │
│   - Enkel Min Side                       │   ┌───────────────────────────┐  │
│                                          │   │ Prosesslinje:             │  │
│                                          │   │ Person → Gruppe → ...     │  │
│                                          │   └───────────────────────────┘  │
│   [ Kom i gang med gratis nettside ]     │   [ Prøv gratis i én måned ]     │
│                                          │   [ Se interaktiv demo ]         │
└──────────────────────────────────────────┴──────────────────────────────────┘
                                      │
┌─────────────────────────────────────▼───────────────────────────────────────┐
│              🟣 TILLEGGSMODULER – 99 KR/MND PER MODUL                       │
│        «Aktiver funksjonene dere trenger når menigheten er klar»            │
├─────────────┬─────────────┬─────────────┬─────────────┬───────────┬────────┤
│ Givertjeneste│ Utleie      │ Arrangement │Kommunikasjon│ Skjemaer  │Analyse │
│ Vipps & gaver│ Lokaler &   │ Påmelding & │ SMS & e-post│ Skjema-   │Nettside│
│ + årsoppg.   │ booking     │ Check-in    │ nyhetsbrev  │ bygger    │+ Kirke │
│  (99 kr/mnd) │ (99 kr/mnd) │ (99 kr/mnd) │ (99 kr/mnd) │ (99 kr/mnd)│(99/mnd)│
├─────────────┴─────────────┴─────────────┴─────────────┴───────────┴────────┤
│ 🤖 AI-assistent (99 kr/mnd): GDPR-sikker assistent med avgrenset datatilgang│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Justeringer i implementasjonen:
- **`src/components/PricingSection.tsx`**:
  - Erstatter det tidligere 3-korts oppsettet med:
    1. To fremhevede hovedkort (**Menighetsplattform Gratis** og **Menighetsplan 499 kr/mnd**).
    2. Visuell bemanningslinje på Menighetsplan-kortet.
    3. Tydelige knapper: «Prøv gratis i én måned» og «Se interaktiv demo».
    4. En dedikert seksjon for **Tilleggsmoduler – 99 kr/mnd per modul** med egne kort for de 7 modulene (*Givertjeneste*, *Utleie*, *Arrangement*, *Kommunikasjon*, *Skjemaer*, *Analyse*, *AI-assistent*).
- **`src/components/ContactModal.tsx`**:
  - Oppdaterer valgmuligheter til:
    - *Menighetsplattform (Gratis)*
    - *Menighetsplan (499 kr/mnd – Prøv gratis i 1 mnd)*
    - *Tilleggsmoduler (99 kr/mnd)*
    - *Avtale demo / Spørsmål*
