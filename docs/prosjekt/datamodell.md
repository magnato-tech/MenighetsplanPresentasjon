# Datamodell

Én samling. Presentasjonsmocken i `src/data/mockData.ts` lagres ikke.

## `ChurchRegistration`

Definert i `src/types/registration.ts`. Lagres som dokument i `registrations`.

| Felt | Betydning |
|------|-----------|
| `id` | `reg_<timestamp>_<random>` |
| `createdAt` | ISO-tid, satt på server |
| `churchName` | Påkrevd, maks 200 |
| `contactName` | Påkrevd, maks 150 |
| `roleTitle` | Valgfri, maks 100 |
| `email` | Påkrevd, maks 150 |
| `phone` | Valgfri, maks 50 |
| `subdomainSlug` | Ønsket subdomene, maks 63 |
| `churchSize` | Streng, default `50_150` |
| `desiredStartDate` | Visningstekst, default `Snarest mulig` |
| `startDateOption` | `asap` \| `within_2_weeks` \| `next_month` \| `custom` |
| `customDate` | Brukes når option er `custom` |
| `isPilotApplicant` | Ønsker pilotoppfølging |
| `selectedPlan` | `level_2_trial` \| `level_1_gratis` |
| `interestedModules` | Inntil 10 slug-er fra pristilleggene |
| `comments` | Maks 2000 |
| `sourceUrl` | Side som sendte inn |
| `status` | Oppfølging |
| `adminNotes` | Internt, satt i admin |
| `updatedAt` | Settes ved PATCH, ikke i type-fila |

Innsending (`RegistrationSubmitPayload`) har samme felter pluss honeypot `hp_company_url`, som ikke lagres.

## Status

UI og TypeScript:

| Verdi | Etikett i admin |
|-------|-----------------|
| `pending` | Ny / Venter kontakt |
| `contacted` | Tatt kontakt |
| `ready` | Klargjort & levert |
| `declined` | Avslått / arkivert |

Nye dokumenter får `pending`.

`firebase-blueprint.json` beskriver et annet enum: `pending`, `contacted`, `preparing`, `active`, `archived`. PATCH godtar hvilken som helst streng. Reglene og blueprinten er ikke det som UI-et bruker.

## Tilleggsmoduler (slug)

`givertjeneste`, `utleie`, `arrangement`, `kommunikasjon`, `skjemaer`, `analyse`, `ai`.

## Hva som ikke er en datamodell

Kalenderhendelser, menighetsprofiler, roller og analysetall er TypeScript-objekter i `mockData.ts` for å tegne siden. De har ingen Firestore-samling.
