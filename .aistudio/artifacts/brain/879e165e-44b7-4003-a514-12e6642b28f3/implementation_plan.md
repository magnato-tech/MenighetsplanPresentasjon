# Guidet omvisning i «Bygg din egen menighet»

En interaktiv, automatisk spillende guidet omvisning i `ChurchDemoView` som leder brukeren gjennom de viktigste forskjellene mellom **Nivå 1 (Gratis CMS & nettside)** og **Nivå 2 (Menighetsplan 499 kr/mnd med bemanning og forfallshåndtering)**, med full kontroll via pause-, navigasjons- og stoppknapper.

## Brukeravklaringer & bekreftede valg

> [!IMPORTANT]
> Basert på dine svar i avklaringsrunden er følgende designvalg bekreftet:
> 
> - **Presentasjonsform**: Automatisk spillende gjennomgang med pause- og stoppknapper samt manuell overstyring (forrige/neste).
> - **Sekvens & stoppesteder**: Nettside og CMS først (Nivå 1), deretter frivillige, vaktplan og forfallshåndtering (Nivå 2).

---

## 1. Oversikt og kjerneopplevelse

Omvisningen gir nye besøkende og menighetsledere en uanstrengt og visuelt engasjerende demonstrasjon av hva de får. I stedet for å måtte klikke seg rundt på måfå, kan brukeren lene seg tilbake og se demoen automatisk demonstrere hvordan menigheten først fungerer med gratisplattformen, og hvordan arbeidsflyten transformeres når Menighetsplan til 499 kr/mnd aktiveres.

Brukeren har kontinuerlig full kontroll med pause-, stopp- og trinnknapper.

---

## 2. Brukeropplevelse & omvisningstrinn

### A. Utløserknapp i toppstripen
I den mørke topplinjen i `ChurchDemoView` legges det til en tydelig fremhevet knapp:
- **«Guidet omvisning»** med et glødende kompass/play-ikon og diskret pulserende indikator som inviterer til utforskning.

### B. Den flytende omvisningskontrolleren (HUD)
Under avspilling vises et elegant, flytende kontrollpanel sentrert nederst i visningsvinduet med:
1. **Trinnindikator**: Viser aktivt trinn (f.eks. «Trinn 2 av 4: Enkelt CMS (Nivå 1)»).
2. **Animert fremdriftslinje**: Viser gjenværende tid på gjeldende trinn (f.eks. 7 sekunder) med myk CSS-animasjon.
3. **Avspillingskontroller**:
   - **Pause / Spill av** (veksler automatisk tidsur).
   - **Forrige / Neste** (for å hoppe manuelt mellom stoppestedene).
   - **Avslutt (Stopp / Kryss)** (lukker omvisningen og lar brukeren fortsette å utforske fritt der de er).
4. **Hovedbudskap & forklarende bildetekst**: 1-2 konsise setninger som forklarer den praktiske verdien av det som vises på skjermen akkurat nå.

### C. De 4 stoppestedene i sekvensen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TRINN 1: Offentlig nettside (Nivå 1 - Gratis)                              │
│ ‣ Setter visning til 'public', nivå til 1                                   │
│ ‣ Fokus: Moderne responsiv nettside, prekenarkiv, kalender & enkel Min Side │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (automatisk overgang etter 7 sek)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TRINN 2: Enkelt CMS & Redigering (Nivå 1 - Gratis)                         │
│ ‣ Bytter visning til 'admin', nivå til 1, fane 'forside'                   │
│ ‣ Fokus: Enkel innholdsredigering for menighetens stab uten kodekunnskap     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (automatisk overgang etter 7 sek)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TRINN 3: Oppgradering til Nivå 2 – Vaktplan & Bemanning (499,-/mnd)        │
│ ‣ Animerer nivået til 2, åpner fane 'plan' i administrasjonen               │
│ ‣ Fokus: Komplett gudstjenestebemanning, roller, bekreftelser & frivillige   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (automatisk overgang etter 7 sek)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TRINN 4: Forfallshåndtering & Frivillig Min Side (Nivå 2)                   │
│ ‣ Bytter til 'forfall'-oversikt og demonstrerer frivillig-arbeidsflyten     │
│ ‣ Fokus: Frivillige melder forfall på sekunder, leder finner vikar med ett  │
│   klikk. Avsluttes med handlingsknapp «Prøv gratis i 30 dager».              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Teknisk arkitektur & komponentdesign

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ChurchDemoView (State Container & Viewport)                                 │
│  - isOpen, onClose, onStartTrial                                            │
│  - activeView ('public' | 'admin')                                          │
│  - level (1 | 2)                                                            │
│  - isTourActive (boolean)                                                   │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Top Control Bar                                                       │  │
│  │ [Se gratis] [Se 499,-]  [Nettside | Admin]  [▶ Guidet omvisning]  [X] │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────┐   ┌─────────────────────────────────┐  │
│  │ DemoPublicWebsite               │   │ DemoAdminCms                    │  │
│  │ (Styres automatisk av turen)    │   │ (Styres automatisk av turen)    │  │
│  └─────────────────────────────────┘   └─────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ DemoGuidedTour HUD (Overlay nederst)                                  │  │
│  │ [⏪ Forrige] [⏸ Pause / ▶ Spill] [⏩ Neste] [Fremdriftsbar] [Avslutt] │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Komponenter og filstruktur:
- **`src/components/demo/DemoGuidedTour.tsx`**:
  - Ny dedikert komponent for den flytende omvisningslinjen.
  - Håndterer automatisk intervall-tidsur (f.eks. `setInterval` eller `requestAnimationFrame`), tidsindikator, pause/spill av, hopp til trinn og pen lysmarkering/spotlight rundt relevante seksjoner.
- **`src/components/ChurchDemoView.tsx`**:
  - Legger til knapp for å starte omvisningen i headeren.
  - Integrerer `DemoGuidedTour` når omvisningen er aktiv.
  - Lar omvisningen kalle `handleLevelChange` og `handleViewModeChange` samt styre aktiv fane i admin.

---

## 4. Akseptansekriterier & verifisering

- [ ] Knappen **«Guidet omvisning»** er synlig og tiltalende i topplinjen til `ChurchDemoView`.
- [ ] Ved klikk starter en automatisk spillende omvisning gjennom de 4 definerte stoppestedene.
- [ ] Brukeren kan når som helst sette på **Pause**, trykke **Spill av**, hoppe med **Forrige / Neste** eller **Avslutte**.
- [ ] Omvisningen demonstrerer tydelig overgangen fra Nivå 1 (Gratis nettside og CMS) til Nivå 2 (Vaktplan, bemanning og forfallshåndtering).
- [ ] Når omvisningen avsluttes eller fullføres, forblir brukeren i demoen uten å miste tilstanden sin.
- [ ] Ingen TypeScript- eller buildfeil (`npm run build` fullføres feilfritt).
