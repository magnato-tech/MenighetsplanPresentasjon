# Menighetsplan – Digital Plattform for Norske Menigheter

Menighetsplan (menighetsplan.no) er en samlet skybasert plattform for norske menigheter som forener moderne nettside, CMS og menighetskalender i én løsning – med mulighet til å aktivere moduler som grupper, kommunikasjon og min side etter behov.

> [!IMPORTANT]
> **Viktige prinsipper og reviderte beslutninger:**
> - **Ingen installasjon eller lokal drift**: «Menigheten får én samlet Menighetsplan-plattform. Funksjonene aktiveres etter behov.» Plattformen leveres som en moderne nettskytjeneste (SaaS). Ingen moduler må lastes ned eller installeres manuelt.
> - **Kjernearkitektur & Forretningsmodell**: «Én kodebase – mange menigheter – egne data og egen konfigurasjon.» Oppdateringer og forbedringer utvikles sentralt og rulles sømløst ut til alle menigheter, mens hver menighet beholder full kontroll over eget innhold, visuell profil og aktive moduler.
> - **Fokusert salgsside fremfor produktkatalog**: Hovedhistorien på forsiden sentreres rundt **Nettside + CMS + Kalender + Plattform/moduler**, mens resterende funksjoner (grupper, min side, analyse) presenteres som naturlige utvidelser når menigheten er klar.
> - **Visuell profil**: Varm nordisk fargetone med dyp skoggrønn (`#1A382B`), lun sand/havre (`#FAF7F2`), ren hvit (`#FFFFFF`) og skifergrå strukturer.

---

## 1. Oversikt og Kjernekonsept

### Hva løsningen leverer
En moderne, responsiv SaaS-presentasjonsside for Menighetsplan. Nettsiden overbeviser menighetsledere, ansatte og frivillige om fordelene ved å samle menighetens digitale løsninger i én skybasert plattform, i stedet for å sjonglere separate systemer og innlogginger.

### Produktprinsippet: Én kodebase, full selvstendighet
Menighetsplan bygger på en moderne flerbrukermodell:
1. **Én sentral kodebase**: Alle forbedringer, sikkerhetsoppdateringer og nye funksjoner rulles ut sentralt uten nedetid eller teknisk hodebry for menigheten.
2. **Dedikerte menighetsdata**: Hver menighet har sine egne data, egne tilganger og full suverenitet over eget innhold.
3. **Egen konfigurasjon og profil**: Menigheten tilpasser farger, logo, domene og hvilke moduler som er synlige.

---

## 2. Brukeropplevelse og Sidestruktur

### Fokusert Innholdsflyt (Hovedhistorien)
1. **Header**: Merkevare *MENIGHETSPLAN*, navigasjon (`Produkt`, `Funksjoner`, `Priser`, `For menigheter`, `Om Menighetsplan`) og CTA-knapp «Kom i gang». Responsiv mobilmeny.
2. **Hero-seksjon**:
   - Tittel: «Én plattform for hele menigheten»
   - Undertittel: «Nettside, CMS, kalender og digitale menighetsverktøy – samlet på ett sted.»
   - Handlinger: «Se hvordan det fungerer» (scroll/preview) og «Kom i gang» (dialog).
   - Realistisk interaktivt dashboard: Viser menighetens aktive kjerne (gudstjeneste, kalender, publisert innhold).
3. **Problemet og Avlastningen**:
   - Tittel: «Menigheten trenger ikke flere systemer»
   - 3 konkrete problemstillinger: «Flere systemer», «Ulike innlogginger», «Innhold som må oppdateres flere steder».
   - Svar: «Menighetsplan samler det.»
4. **Hovedhistorie: Plattform og Modulær Oppbygging**:
   - «Menigheten får én samlet Menighetsplan-plattform. Funksjonene aktiveres etter behov.»
   - Start enkelt: **Nettside + CMS + Kalender**
   - Bygg videre ved behov: **Grupper + Min side + Kommunikasjon + Analyse**
   - Tydelig markering av prinsippet: «Én kodebase – mange menigheter – egne data og egen konfigurasjon. Sentrale oppdateringer uten installasjon.»
5. **Hovedhistorie: Nettside + CMS**:
   - Tittel: «En nettside dere faktisk kan styre selv»
   - Visuell split-mockup: Viser den ferdige menighetssiden side om side med et rent CMS-redigeringspanel (sidebygger, innholdsblokker, nyheter, kalender, bilder, SEO og publisering).
6. **Hovedhistorie: Kalender**:
   - Tittel: «Én kalender for hele menigheten»
   - Strukturert arrangementsvisning (Gudstjenester, husgrupper, bønnemøter, ungdomsarbeid) med filtrering og automatisk gjenbruk på nettsiden.
7. **Utvidede Muligheter (Kort og oversiktlig)**:
   - Administrasjon med rollebasert tilgang (Admin, Redaktør, Gruppeleder, Medlem).
   - Analyse for å se hva som fungerer (besøkstall og mest leste artikler/sider).
8. **Tilpasningsdyktighet: Én plattform. Mange menigheter**:
   - Viser tre eksempelmenigheter (Sentrumskirken Oslo, Kraftverket Fellesskap, Bydelskirken) med ulike fargetoner, logoer og profiluttrykk på samme plattform.
9. **Prismodell & Transparent Samtale**:
   - Trinnvis inngang: Nettside, Menighetsplattform, Ekstra moduler. Tydelig CTA: «Snakk med oss».
10. **Avsluttende CTA & Footer**:
    - «Klar for en enklere digital menighet?»
    - Full footer med lenker, kontakt (`hei@menighetsplan.no`) og rettigheter.

---

## 3. Visuell Profil og Designsystem

- **Aestetikk**: Varm nordisk minimalisme, romslig og tillitsvekkende.
- **Farger**:
  - Dyp skoggrønn (`#1A382B`) som bærende merkevare- og aksentfarge.
  - Varm sand/havre (`#FAF7F2`) og ren hvit (`#FFFFFF`) for rolige bakgrunner.
  - Granittgrønn (`#2D5A46`) og dempet oker for interaktive indikatorer.
  - Skifer/kull (`#1E293B`) for skarp, lettlest typografi.
- **Typografi**: Skandinavisk humanistisk sans med store overskrifter og `tabular-nums` for tall og klokkeslett.
- **Interaksjon**: Ingen tunge animasjoner; diskrete overganger, faneskifter og mikrotilbakemeldinger.

---

## 4. Teknisk Arkitektur & Komponentmodell

```
┌─────────────────────────────────────────────────────────────────┐
│                           App Root                              │
│       Navbar (Desktop navigasjon + Mobil hamburger-meny)        │
└────────────────────────────────┬────────────────────────────────┘
                                 │
     ┌───────────────────────────┴───────────────────────────┐
     │                                                       │
┌────▼──────────────────────┐             ┌──────────────────▼──────────────────────┐
│       Hero-seksjon        │             │           Problemet & Løsningen         │
│  - Hovedbudskap           │             │  - 3 problemkort (flere systemer, etc.) │
│  - CTA: Se hvordan / Start│             │  - "Menighetsplan samler det"           │
│  - Interaktivt Dashboard  │             └─────────────────────────────────────────┘
└────┬──────────────────────┘
     │
     ├───────────────────────────────────────────────────────┐
     │                                                       │
┌────▼──────────────────────┐             ┌──────────────────▼──────────────────────┐
│   Plattform & Kjerne      │             │         Sentral Skymodell & SaaS        │
│  - Hovedhistorie: Nettside│             │  - "Én kodebase – mange menigheter"     │
│    + CMS + Kalender       │             │  - Sentrale oppdateringer, ingen        │
│  - Aktiveres etter behov  │             │    lokal installasjon eller nedlasting  │
└────┬──────────────────────┘             └─────────────────────────────────────────┘
     │
     ├───────────────────────────────────────────────────────┐
     │                                                       │
┌────▼──────────────────────┐             ┌──────────────────▼──────────────────────┐
│      Nettside + CMS       │             │              Kalender                   │
│  - Visuell sidevisning    │             │  - Sentral arrangementsvisning          │
│  - Intuitivt CMS-panel    │             │  - Søndag, husgrupper, bønn, ungdom     │
└────┬──────────────────────┘             └─────────────────────────────────────────┘
     │
     ├───────────────────────────────────────────────────────┐
     │                                                       │
┌────▼──────────────────────┐             ┌──────────────────▼──────────────────────┐
│  Utvidede Moduler & Roller│             │  Mange Menigheter (Tilpasning)          │
│  - Admin/roller & analyse │             │  - 3 eksempler med egne profiler        │
│  - Min side & grupper     │             │  - Viser farge- og merkevarefrihet      │
└────┬──────────────────────┘             └─────────────────────────────────────────┘
     │
     ├───────────────────────────────────────────────────────┐
     │                                                       │
┌────▼──────────────────────┐             ┌──────────────────▼──────────────────────┐
│   Pris & Ekstra Moduler   │             │       Avsluttende CTA & Kontakt         │
│  - Nettside / Plattform   │             │  - "Klar for en enklere digital         │
│  - "Snakk med oss"        │             │    menighet?" + Kontaktdialog           │
└───────────────────────────┘             └──────────────────┬──────────────────────┘
                                                             │
                                                  ┌──────────▼──────────┐
                                                  │       Footer        │
                                                  │  - menighetsplan.no │
                                                  │  - hei@... / info   │
                                                  └─────────────────────┘
```

### Datastruktur og Tilstand
- `src/data/mockData.ts`: Sentralt organisert data for menigheter, kalenderhendelser, CMS-blokker, moduler og analyse.
- `src/components/Navbar.tsx`: Responsiv toppmeny med mobilmeny.
- `src/components/Hero.tsx`: Hovedoverskrift og realistisk dashboard-mockup.
- `src/components/ProblemSection.tsx`: De tre utfordringene og samlingen i Menighetsplan.
- `src/components/PlatformArchitecture.tsx`: Sentral skyoppdatering, én kodebase, og modulaktivering etter behov.
- `src/components/CmsShowcase.tsx`: Nettside + CMS sidebygger.
- `src/components/CalendarShowcase.tsx`: Kalender og aktiviteter.
- `src/components/ExtensionsShowcase.tsx`: Administrasjon, roller og analyse.
- `src/components/ChurchesShowcase.tsx`: De tre eksempelmenighetene med profiltilpasning.
- `src/components/PricingSection.tsx`: Transparent pris- og moduloversikt.
- `src/components/CtaSection.tsx`: Avsluttende konvertering med interaktiv kontaktdialog.
- `src/components/Footer.tsx`: Profesjonell bunnseksjon for menighetsplan.no.
