# Menighetsplan — funksjonsoversikt

Tekstgrunnlag for nettside og presentasjon. Alt under følger det som allerede formidles på salgssiden. Tall i demoer (besøk, antall grupper, menighetsnavn) er eksempler, ikke løfter.

Tabellversjon, avstemt mot kortoversikten (oktober 2026): [Menighetsplan-omraade-for-omraade.pdf](Menighetsplan-omraade-for-omraade.pdf). Den PDF-en er listen som gjelder. Teksten under kan avvike der den er eldre.

**Én setning:** Én plattform for hele menigheten — nettside, CMS, kalender og digitale menighetsverktøy samlet på ett sted.

**To spørsmål som styrer produktet:**

| Spørsmål | Produkt |
|----------|---------|
| Hva skjer i menigheten? | Menighetsplattform |
| Hvem skal gjøre hva? | Menighetsplan |

«Tilleggsmodul» i tabellen betyr at funksjonen ikke er utviklet ennå. Pris er ikke tatt med her, fordi den ikke er endelig satt.

---

## Hvem det er for

Norske menigheter som i dag har nettside, kalender, husgrupper, kommunikasjon og administrasjon i ulike systemer — med flere innlogginger og innhold som må oppdateres flere steder.

Samme plattform brukes av:

- besøkende som skal finne gudstjeneste, nyheter og veien inn
- frivillige og medlemmer som skal se egne oppgaver
- gruppeledere som styrer egen gruppe
- redaktører som publiserer
- ansatte og administratorer som har helheten

Én innlogging for ansatte, redaktører og frivillige. Ingen installasjon. Skybasert, oppdatert sentralt for alle menigheter.

---

## Produktnivåer

### 1. Menighetsplattform

Grunnplattform for offentlig formidling.

Inkludert:

- moderne, responsiv nettside med SEO
- CMS med live preview før publisering
- sider, innhold, nyheter og mediebibliotek
- taler og lydarkiv med innebygd avspiller
- offentlig kalender for menighetens liv
- gudstjenester og offentlige samlinger
- samlingsplanlegging og kjøreplan / program
- dynamiske innholdsmoduler som henter data og oppdaterer nettsiden selv
- personregister, fordi innloggingen bygger på det
- Min Side: innlogging uten passord, legg på hjemskjermen, og neste gudstjeneste. Enkel oversikt med kommende samlinger er planlagt

### 2. Menighetsplan

Alt i Menighetsplattform, pluss verktøyene for å organisere mennesker og arbeid. Hovedproduktet.

Inkludert:

- personer og medlemsregister
- tjenestegrupper og ledere
- husfellesskap
- roller og oppgaver
- bemanning og forespørsler
- bekreftelser og svar
- forfall — oppgaven blir ledig
- Min Side med personlige oppgaver
- gruppechat for team
- oppstartshjelp

### 3. Tilleggsmoduler

Ikke utviklet ennå. Inngår ikke i Menighetsplattform eller Menighetsplan før de er klare.

| Modul | Kort sagt |
|-------|-----------|
| Givertjeneste | Vipps, faste gaver og årsoppgaver |
| Utleie | Lokaler, booking og inntektsoversikt |
| Arrangement | Påmelding, betaling og check-in |
| Kommunikasjon | SMS, e-post og målrettede utsendelser |
| Skjemaer | Skjemabygger for menighetens behov |
| AI-assistent | GDPR-sikker assistent for staben |

---

## Brukerroller

Offentlig nettside er åpen for alle. Innloggede roller styrer hva man kan endre.

| Rolle | Hva personen gjør |
|-------|-------------------|
| Besøkende | Leser nettside, kalender, nyheter og taler. Ingen innlogging. |
| Medlem | Min Side, egne påmeldinger, tjenesteliste og intern kontaktinformasjon. |
| Gruppeleder | Oppdaterer egen husgruppe, medlemsliste og samlingstider. |
| Redaktør | Oppretter og redigerer sider, nyhetsartikler, taler og kalenderoppføringer. |
| Admin | Hele plattformen: modulaktivering, design og brukertilganger. |

Tilgang i administrasjonen:

| Område | Admin | Redaktør | Gruppeleder | Medlem |
|--------|:-----:|:--------:|:-----------:|:------:|
| Innhold og sider | Ja | Ja | Nei | Nei |
| Kalender og samlinger | Ja | Ja | Ja | Nei |
| Grupper og team | Ja | Ja | Ja | Nei |
| Brukere og roller | Ja | Nei | Nei | Nei |
| Statistikk og analyse | Ja | Ja | Nei | Nei |
| Systeminnstillinger | Ja | Nei | Nei | Nei |

Medlem har likevel Min Side. Gruppeleder ser egen gruppe, ikke andres administrasjon. Rollebasert tilgang gjør at frivillige får akkurat det de trenger.

---

## Områder og funksjoner

### Nettside

Menighetens digitale ansikt utad. Samme stabile kjerne, egen profil.

- universelt utformet, like god på mobil, nettbrett og desktop
- eget uttrykk: fargetoner og fonter som følger menigheten
- eget domene og branding, eller menighetsplan-adresse
- forside som viser neste samling, kalenderutdrag og siste innhold
- SSL og levering fra norsk sky

### CMS

Redaktører styrer nettsiden selv, uten utvikler.

- sidebygger: forside, gudstjenester, husgrupper, om oss, kontakt, og nye sider
- innholdsblokker, blant annet hero og automatisk kalenderutdrag
- live preview: endring vises før publisering
- nyheter, artikler, vitnesbyrd og beskjeder til forsiden og nyhetsarkivet
- mediebibliotek: bilder lastes opp, optimaliseres og skaleres til mobil og desktop
- SEO: sidetittel og metabeskrivelse for søk og deling
- kladd til man trykker publiser
- kun godkjente redaktører kan publisere

### Taler og lydarkiv

- arkiv for taler, opptak og ressurser
- innebygd avspiller på nettsiden
- taler kan ligge som innholdsblokk («siste tale»)

### Kalender

Én kalender. Legg inn samlingen én gang.

- kategorier som gudstjeneste, husgruppe og bønn, med filter
- tid, sted og ansvarlig
- samlingsplanlegging og kjøreplan / program
- offentlig kalender for menighetens liv

Samme oppføring brukes automatisk på:

- forsiden («kommende i uken»)
- mobilvennlig arrangementsliste
- relevante husgrupper og frivillige team
- kalendernedlasting for medlemmer (.ics / Google)

Endres ett sted — oppdatert overalt.

### Dynamiske innholdsmoduler

Data fra administrasjonen vises på nettsiden uten ekstra manuell kopiering: neste gudstjeneste, kalender, siste nyheter og taler. Legges inn én gang og oppdaterer seg selv.

### Grupper og mennesker

Del av Menighetsplan, ikke av Menighetsplattform.

- husgrupper med leder, deltakere og neste samling
- tjenesteteam (lovsang, barnekirke, kafé og liknende)
- personer og medlemsregister
- gruppeleder ser egen liste og egne tider
- kontaktflate for gruppeledere

### Bemanningsflyt

Kjernen i Menighetsplan. Slik henger arbeidet sammen:

1. Person
2. Gruppe
3. Samling
4. Rolle
5. Oppgave
6. Bemanning
7. Svar
8. Forfall
9. Ledig oppgave
10. Ny person fyller

Praktisk betyr det: forespørsel sendes, personen bekrefter eller avslår, ubesvart eller avslått oppgave blir ledig, og en annen kan ta den. Frivillige ser egne oppgaver på Min Side.

### Min Side

| | Menighetsplattform | Menighetsplan |
|--|-----------------------------|---------------|
| Innhold | Neste i menigheten, kommende samlinger, lenker til relevant innhold | Samme, pluss personlige oppgaver, påmeldinger og tjenesteliste |

### Gruppechat

Inkludert i Menighetsplan. Chat for team, knyttet til tjenestegruppene — ikke et eget eksternt verktøy.

### Administrasjon

Ett kontrollpanel for innhold, kalender, grupper, brukere, statistikk og innstillinger.

- slå moduler av og på
- roller og tilganger
- menighetens egne innstillinger og design
- oversikt: neste gudstjeneste, publisert status, husgrupper, ukehendelser

### Analyse

Utviklet tilleggsmodul, med i dag. Slås på oppå et nivå, i to deler: analysebord og anonym telling av besøk. Den inngår ikke automatisk i de to grunnnivåene.

---

## Tilleggsmoduler i detalj

### Givertjeneste

- Vipps-integrasjon for raske gaver
- faste giveravtaler og engangsgaver
- giveroversikt og full gavehistorikk
- automatisk rapportering og årsoppgaver til Skatteetaten

### Utleie

- oversikt over kirkerom, festsaler og møterom
- offentlig eller intern tilgjengelighetskalender
- bookingforespørsler og leieavtaler
- betaling og samlet inntektsoversikt

Inntekter fra utleie og givertjeneste kan etter hvert samles i en helhetlig økonomioversikt.

### Arrangement

- påmeldingsskjemaer og deltakerlister
- kapasitet og automatisk venteliste
- betaling ved påmelding
- digital check-in på mobilen ved døren

### Kommunikasjon

- SMS til frivillige og team
- e-post og nyhetsbrev til menigheten
- utsendelser til bestemte husgrupper
- åpningsrate og leveringsstatus

### Skjemaer

- dra-og-slipp skjemabygger
- dåpspåmelding og vigselsforespørsel
- spørreundersøkelser
- lagring i tråd med GDPR

### AI-assistent

- utkast til nyheter, talepunkter og artikler
- forslag til samlingsprogram og kjøreplan
- avgrenset tilgang: assistenten får ikke fri tilgang til databasen
- drift i samsvar med norsk personvern

---

## Slik kan menigheten starte

**Steg 1 — Start.** Nettside, CMS, kalender og taler. Offentlig profil på plass.

**Steg 2 — Videre.** Når lederteam og frivillige er klare: grupper og full Min Side. Analyse følger med begge nivåer. Plattformen vokser i menighetens tempo. Ingen krav om å bruke alt fra dag én.

Oppstartshjelp i Menighetsplan:

- oppsett av profil og struktur
- personlig veiledning
- bistand til import av frivillige og tjenestegrupper

Pilotmenigheter får tett oppfølging. Tilbakemeldinger tas med i videre utvikling.

Demo: [demo.menighetsplan.no](https://demo.menighetsplan.no).

---

## Trygghet og drift

- sky. Ingen programvare på lokale maskiner
- én kodebase for alle menigheter, egne data og egen konfigurasjon per menighet
- oppdateringer rulles ut sentralt. Ingen plugins menigheten selv må vedlikeholde
- data i Google Cloud i Europa
- hver menighet får sitt eget Firebase-prosjekt
- dataminimering, tilgangsstyring og databehandleravtale
- menigheten eier egne data og kan få dem eksportert
- ved avslutning oppbevares eller slettes data etter databehandleravtalen
- 100 % norsk tilpasning: frivillighet, fellesskap og personvern

---

## Setninger til nettsiden

- Én plattform for hele menigheten. Nettside, CMS, kalender og menighetsverktøy — funksjonene aktiveres etter behov.
- Start med det som er synlig utad. Oppgrader når dere skal organisere menneskene.
- Legg inn samlingen én gang. Den vises på nettsiden, i gruppene og i kalenderen folk faktisk bruker.
- Frivillige får akkurat den tilgangen de trenger. Ikke et nytt passord for hvert system.
- Start med grunnplattformen. Slå på Menighetsplan og tilleggsmoduler når dere trenger dem.

## Ikke lov på nettsiden

- Konkrete besøkstall, prosentvekst eller «antall menigheter» fra demoen.
- At AI leser hele medlemsregisteret. Den har avgrenset tilgang.
- At Menighetsplattform inkluderer bemanning, medlemsregister eller gruppechat.
- Konkrete priser, før prisen er endelig satt.
- Funksjoner som ikke står i denne oversikten.
