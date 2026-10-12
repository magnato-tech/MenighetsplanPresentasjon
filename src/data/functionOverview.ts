export type FeatureStatus = 'live' | 'planned';

export type FeatureRow = {
  name: string;
  platform: boolean;
  plan: boolean;
  status: FeatureStatus;
  group?: string;
};

export type OverviewArea = {
  id: string;
  number: string;
  title: string;
  description: string;
  rows: FeatureRow[];
};

const live = 'live' as const;
const planned = 'planned' as const;

export const FUNCTION_AREAS: OverviewArea[] = [
  {
    id: 'nettsiden',
    number: '01',
    title: 'Nettsiden',
    description:
      'Menighetens ansikt utad. Innholdet hentes fra CMS-et og kalenderen, så det som legges inn én gang, står riktig overalt.',
    rows: [
      { name: 'Forside med velkomsttekst, neste gudstjeneste eller et fremhevet arrangement, de neste samlingene, siste nyheter og siste tale', platform: true, plan: true, status: live },
      { name: '«Hva skjer»: kalender med kommende arrangementer, oppdatert i samme øyeblikk som noe endres i admin', platform: true, plan: true, status: live },
      { name: 'Abonner på kalenderen, så arrangementene kommer inn i kalenderen på mobilen', platform: true, plan: true, status: live },
      { name: 'Talearkiv med avspilling: lydfil, Spotify og video', platform: true, plan: true, status: live },
      { name: 'Nyhetsartikler med bilde og kategori', platform: true, plan: true, status: live },
      { name: 'Faste sider som «Om oss» og «Kontakt», skrevet i CMS-et', platform: true, plan: true, status: live },
      { name: 'Stab og lederskap med navn, tittel og kontaktinformasjon', platform: true, plan: true, status: live },
      { name: '«Fellesskap»: gruppene med møtetid og hvem man kan kontakte', platform: false, plan: true, status: live },
      { name: 'Meny bygget av sidene i CMS-et, og bunntekst med kontaktinformasjon', platform: true, plan: true, status: live },
      { name: 'Tilpasset mobil, nettbrett og PC', platform: true, plan: true, status: live },
      { name: 'Egen tittel, beskrivelse og delingskort for hver side, for søkemotorer og for deling på Facebook og Messenger', platform: true, plan: true, status: live },
      { name: 'Video fra YouTube vises uten sporingskapsler før den spilles av', platform: true, plan: true, status: live },
      { name: 'Egne tekster i forsidens infobokser og i fellesskaps- og gaveseksjonen', platform: true, plan: true, status: planned },
      { name: 'Arkivside med alle nyhetsartiklene', platform: true, plan: true, status: planned },
      { name: 'Meld interesse for en gruppe direkte på nettsiden', platform: false, plan: true, status: planned },
      { name: 'Egen side for hvert arrangement. Kortene i «Neste gudstjeneste», «Hva skjer» og kalenderlisten åpner siden, og viser et lite bilde når arrangementet har et', platform: true, plan: true, status: planned, group: 'Arrangementssider' },
      { name: 'Bildet og ingressen følger med når arrangementet deles, og i kalenderabonnementet', platform: true, plan: true, status: planned },
      { name: 'En nyhet som hører til et arrangement, får en faktaboks med tid og sted', platform: true, plan: true, status: planned },
    ],
  },
  {
    id: 'cms',
    number: '02',
    title: 'CMS-et',
    description:
      'Redigeringsverktøyet for nettsiden. Laget for at en ansatt eller frivillig skal holde siden oppdatert uten hjelp fra en utvikler. CMS-et er det samme på begge nivåer, med gruppene i tillegg på Menighetsplan.',
    rows: [
      { name: 'Sider og meny i to nivåer, ordnet med dra og slipp', platform: true, plan: true, status: live },
      { name: 'Ferdige innholdsblokker: overskrifter, lister, lenker, infobokser, bilde med tekst, kort side ved side, sitat og handlingsknapp', platform: true, plan: true, status: live },
      { name: 'Innholdsmoduler som oppdaterer seg selv: neste gudstjeneste, kalender, siste nyheter, siste tale og gaveinformasjon', platform: true, plan: true, status: live },
      { name: 'Kladd, publisert eller planlagt publisering på et valgt tidspunkt', platform: true, plan: true, status: live },
      { name: 'Forhåndsvisning av siden før den publiseres', platform: true, plan: true, status: live },
      { name: 'Hovedbilde på hver side: last opp, lim inn en adresse eller velg fra bildebiblioteket', platform: true, plan: true, status: live },
      { name: 'Bildebibliotek med arkivbilder som følger med løsningen', platform: true, plan: true, status: live },
      { name: 'Nyheter: skriv og publiser artikler', platform: true, plan: true, status: live },
      { name: 'Taler: legg inn tale med taler, dato, bibeltekst, serie, lyd, Spotify og video', platform: true, plan: true, status: live },
      { name: 'Stab og lederskap: liste med navn, rolle, kontaktinformasjon og omtale', platform: true, plan: true, status: live },
      { name: 'Design: fem ferdige temaer, eller egne valg av farger, bakgrunn, skrift og hjørneavrunding', platform: true, plan: true, status: live },
      { name: 'Lesbar kontrast uansett hvilken farge som velges', platform: true, plan: true, status: live },
      { name: 'Innstillinger: menighetens navn, slagord, velkomsttekst, kontaktinformasjon, Vipps, kontonummer og sosiale medier', platform: true, plan: true, status: live },
      { name: 'Forside-overstyring: fremhev et arrangement på forsiden, eller skjul det fra kalenderen', platform: true, plan: true, status: live },
      { name: 'Søk og deling: beskrivelse og delebilde per side, med forhåndsvisning av søkeresultatet og delingskortet', platform: true, plan: true, status: live },
      { name: 'Bilder i egen lagring, også i nyheter, stab og innholdsblokker', platform: true, plan: true, status: planned },
      { name: 'Egen logo og egen skrift', platform: true, plan: true, status: planned },
      { name: 'Nyheter med utløpsdato og kobling til et arrangement, og taler koblet til person og arrangement', platform: true, plan: true, status: planned },
      { name: 'Én felles kilde for stab og lederskap, med samtykke', platform: true, plan: true, status: planned },
      { name: 'Visuell redigering av blokker, og historikk med angre', platform: true, plan: true, status: planned },
      { name: '«Arrangementer på nettsiden»: bildetekst, ingress, lang tekst og lenke eller knapp. Listen viser hvilke arrangementer som mangler bilde eller tekst. Selve bildet legges inn på arrangementet i planleggeren', platform: true, plan: true, status: planned, group: 'Arrangementer på nettsiden' },
    ],
  },
  {
    id: 'kalender',
    number: '03',
    title: 'Kalender og arrangementer',
    description:
      'Arrangementene legges inn ett sted. Derfra går de til nettsiden, til Min side og til andre nettsider som leser kalenderen. Bilde, maler og serier er besluttet for begge nivåer.',
    rows: [
      { name: 'Opprett, endre og avlys arrangementer med tittel, dato, start- og sluttid, sted og tema', platform: true, plan: true, status: live },
      { name: 'Tre synligheter: internt, offentlig i kalenderen, eller fremhevet øverst på forsiden', platform: true, plan: true, status: live },
      { name: 'Merk et arrangement som gudstjeneste, så nettsiden alltid viser den neste', platform: true, plan: true, status: live },
      { name: 'Et avlyst arrangement vises som avlyst, og løftes aldri fram på forsiden', platform: true, plan: true, status: live },
      { name: '«Lag neste arrangement»: samme arrangement på ny dato, med samme klokkeslett', platform: true, plan: true, status: live },
      { name: 'Åpent grensesnitt (API) som andre nettsider kan lese kalenderen fra', platform: true, plan: true, status: live },
      { name: 'Ett skjema når du oppretter og når du endrer: tittel, dato, start, slutt som kan være en annen dag, sted, ansvarlig gruppe, gudstjeneste, tema, bibeltekst, synlighet og avlyst. Ingenting er påkrevd', platform: true, plan: true, status: planned, group: 'Skjema og bilde' },
      { name: 'Bilde legges rett inn på arrangementet i planleggeren. Når nettsiden oppdaterer seg, vises et lite bilde på kortet. Malens bilde er standardbildet, og et arrangement uten bilde vises uten bilde', platform: true, plan: true, status: planned },
      { name: '«Lag neste arrangement» kopierer også bilde og tekst', platform: true, plan: true, status: planned },
      { name: 'Maler med fakta, bilde og tekst. Lag mal av et arrangement som alt er satt opp, eller opprett ett nytt arrangement fra malen', platform: true, plan: true, status: planned, group: 'Maler' },
      { name: '«Planlegg serie» fra en mal: startdato, tidspunkt, siste dato og frekvens. Hver uke, hver 2., 3. eller 4. uke, eller én gang i måneden på samme ukedag og samme uke i måneden', platform: true, plan: true, status: planned, group: 'Serier' },
      { name: 'Forhåndsvisning av alle datoene før noe opprettes. Enkeltdatoer kan tas bort, og du får beskjed der det allerede ligger et arrangement', platform: true, plan: true, status: planned },
      { name: 'Etterpå er hvert arrangement et vanlig arrangement, merket som del av serien. Resten av serien kan slettes, unntatt de som noen alt har svart på', platform: true, plan: true, status: planned },
    ],
  },
  {
    id: 'personer',
    number: '04',
    title: 'Personregisteret',
    description:
      'Menighetens egen oversikt over personer. Innloggingen bygger på registeret, og derfor er det med på begge nivåer.',
    rows: [
      { name: 'Personer med navn, kontaktinformasjon og rolle', platform: true, plan: true, status: live },
      { name: 'Søk i registeret på navn, gruppe, tilgang og kontaktinformasjon', platform: true, plan: true, status: live },
      { name: 'Offentlig profil med tittel og kontaktinformasjon utad, bare med registrert samtykke', platform: true, plan: true, status: live },
      { name: 'Samtykkelogg: når samtykket ble registrert, og av hvem', platform: true, plan: true, status: live },
      { name: 'Politiattest med utløpsdato', platform: true, plan: true, status: live },
      { name: 'Perioder en person er borte', platform: true, plan: true, status: live },
      { name: 'Varsel før en politiattest går ut', platform: true, plan: true, status: planned },
    ],
  },
  {
    id: 'planlegger',
    number: '05',
    title: 'Planleggeren',
    description:
      'Kjernen i Menighetsplan: hvem som skal gjøre hva, og hva som skjer når noen melder forfall. Ikke med på Menighetsplattform.',
    rows: [
      { name: 'Grupper i fem kategorier: tjenestegrupper, husfellesskap, interessegrupper, strategigrupper og ledergrupper', platform: false, plan: true, status: live, group: 'Grupper og husfellesskap' },
      { name: 'Leder og nestleder, medlemsliste, fast møtetid og stikkord for hver gruppe', platform: false, plan: true, status: live },
      { name: 'Velg om gruppen skal vises på nettsiden', platform: false, plan: true, status: live },
      { name: 'Beskjeder i gruppen, med bilde', platform: false, plan: true, status: live },
      { name: 'Husfellesskap: neste møte med vert, tema og bibeltekst, innkalling og svar med «Kommer» eller «Kommer ikke»', platform: false, plan: true, status: live },
      { name: 'Et nytt medlem ser bare meldinger fra den dagen det ble med', platform: false, plan: true, status: planned },
      { name: 'Oppgaver på hvert arrangement, med hvor mange som trengs', platform: false, plan: true, status: live, group: 'Oppgaver og bemanning' },
      { name: 'Tjenesteroller med fast instruks, som brukes om igjen fra arrangement til arrangement', platform: false, plan: true, status: live },
      { name: 'Tre veier til en oppgave: lederen tildeler, lederen spør, eller medlemmet tar en ledig oppgave selv', platform: false, plan: true, status: live },
      { name: 'Bemanningsstatus med ikon og tekst: «Dekket», «Venter på svar» eller «Mangler»', platform: false, plan: true, status: live },
      { name: 'Forfall og avslag registreres, og plassen blir ledig igjen', platform: false, plan: true, status: live },
      { name: 'Akutt forfall, mindre enn 48 timer før arrangementet, løftes fram til plassen er fylt', platform: false, plan: true, status: live },
      { name: '«Trenger oppfølging»: ubesatte oppgaver og akutte forfall på tvers av alle arrangementer', platform: false, plan: true, status: live },
      { name: 'Purring: ferdig tekst med oppmøtedetaljer, klar til å sendes på SMS eller Messenger', platform: false, plan: true, status: live },
      { name: 'Advarsel ved tildeling når personen har meldt seg borte i perioden', platform: false, plan: true, status: live },
      { name: 'Kjøreplan: programmet og oppgavene på én tidslinje, med hvem som står på hva. Kan skrives ut', platform: false, plan: true, status: live },
      { name: '«Lag neste arrangement» kopierer også oppgavene og behovet, med tom personliste', platform: false, plan: true, status: live },
      { name: 'Varsling ved forespørsel, påminnelse og akutt forfall', platform: false, plan: true, status: planned },
      { name: 'Redigere programmet i kjøreplanen', platform: false, plan: true, status: planned },
      { name: 'Grunn for forfall, som bare leder og administrator ser', platform: false, plan: true, status: planned },
      { name: 'Varsel når samme person settes opp ofte', platform: false, plan: true, status: planned },
      { name: 'Malen inneholder også standard bemanning: roller og antall. En fast person i malen blir forespurt på hvert arrangement, ikke satt opp som bekreftet', platform: false, plan: true, status: planned, group: 'Maler og serier' },
      { name: '«Lag neste arrangement» kopierer også kjøreplanen. Klokkeslettene i kjøreplanen følger starttiden når arrangementet lages fra malen', platform: false, plan: true, status: planned },
    ],
  },
  {
    id: 'min-side',
    number: '06',
    title: 'Min side',
    description: 'Det medlemmer og frivillige ser når de logger inn. Laget for mobilen.',
    rows: [
      { name: 'Innlogging uten passord: Google-konto eller en lenke på e-post', platform: true, plan: true, status: live },
      { name: 'Kan legges på hjemskjermen på mobilen som en app', platform: true, plan: true, status: live },
      { name: '«Neste i menigheten»: neste gudstjeneste eller fellesarrangement', platform: true, plan: true, status: live },
      { name: 'Enkel Min side på Menighetsplattform: kommende samlinger og lenker til nettsiden', platform: true, plan: false, status: planned },
      { name: '«Trenger svar»: forespørsler, innkallinger og ledige oppgaver i gruppene mine', platform: false, plan: true, status: live },
      { name: '«Neste for deg», mine grupper og mine oppgaver', platform: false, plan: true, status: live },
      { name: 'Oppgavesiden: tid, sted, instruks og hvem andre som står på', platform: false, plan: true, status: live },
      { name: 'Ta en ledig oppgave, svar på en forespørsel og meld forfall', platform: false, plan: true, status: live },
      { name: 'Gruppesiden: medlemmer, møteplan, aktiviteter og beskjeder', platform: false, plan: true, status: live },
      { name: 'Gruppeleder: gruppene jeg leder, med bemanningsstatus, medlemsliste og møteplan', platform: false, plan: true, status: live },
      { name: 'Husfellesskap: neste møte, svar på innkalling og medlemsliste', platform: false, plan: true, status: live },
      { name: 'Meldinger på tvers av grupper', platform: false, plan: true, status: planned },
    ],
  },
  {
    id: 'felles',
    number: '07',
    title: 'Felles for hele løsningen',
    description: 'Personvern, tilgang og drift. Det som gjelder uansett nivå.',
    rows: [
      { name: 'Ett adminpanel for alt, med oversikt over nøkkeltall og snarveier. Fast meny på PC, uttrekksmeny på mobil', platform: true, plan: true, status: live },
      { name: 'Ingen person vises på nettsiden uten registrert samtykke', platform: true, plan: true, status: live },
      { name: 'Privat telefonnummer og e-postadresse vises aldri utad', platform: true, plan: true, status: live },
      { name: 'Det åpne grensesnittet (API) gir aldri ut personopplysninger', platform: true, plan: true, status: live },
      { name: 'Roller som følger av personregisteret: administrator og medlem, og gruppeleder på Menighetsplan', platform: true, plan: true, status: live },
      { name: 'Adminpanelet er bare for administratorer, og Min side bare for dem som står i registeret', platform: true, plan: true, status: live },
      { name: 'Hver menighet får sin egen installasjon, med egen database og egen adresse', platform: true, plan: true, status: live },
      { name: 'Databasen ligger i EU (Frankfurt)', platform: true, plan: true, status: live },
      { name: 'Alt innholdet kan lastes ned som én fil og hentes inn igjen', platform: true, plan: true, status: live },
      { name: 'Sperre mot sletting av innhold når løsningen er satt i drift', platform: true, plan: true, status: live },
      { name: 'Løsningen sier tydelig fra når en lagring feiler', platform: true, plan: true, status: live },
      { name: 'Universell utforming: status vises med ikon og tekst, aldri med farge alene', platform: true, plan: true, status: live },
      { name: 'Tilgangsregler i selve databasen, etter rolle', platform: true, plan: true, status: planned },
      { name: 'Sikkerhetskopi, og eksport og sletting når en menighet avslutter', platform: true, plan: true, status: planned },
    ],
  },
];

export const ANALYSE_GROUPS: { title: string; rows: string[] }[] = [
  {
    title: 'Analysebord',
    rows: [
      'Nøkkeltall for en periode, sammenlignet med perioden før: snitt på gudstjeneste, aktive frivillige, bemanningsgrad og andel med i en gruppe',
      'Oppmøte: registrer voksne og barn per samling, følg utviklingen, og last ned tallene som regneark til årsmeldingen',
      'Bemanning per arrangement, og hvem som har flere oppgaver på samme samling',
      'Oppgaver og aktiviteter per måned, og en oversikt per person',
      'Frivillighet: forfall, avslag, svartid, roller som er vanskelige å bemanne, «Kan trenge avlastning» og «Ikke brukt i perioden»',
      'Grupper: aktivitet per gruppe, grupper som har stilnet, og personer uten gruppe',
      'Personregisteret: politiattester som er utløpt eller går ut innen 60 dager',
      'Tilpass bordet: hver administrator skjuler og viser delene selv',
    ],
  },
  {
    title: 'Besøk på nettsiden',
    rows: [
      'Besøk, sidevisninger, sider per besøk og tid per besøk, sammenlignet med perioden før',
      'Mest besøkte sider, sider som aldri åpnes, og hvor besøkene starter',
      'Adresser som ikke finnes: døde lenker, særlig etter flytting fra en gammel nettside',
      'Når besøkene kommer: ukedag og time',
      'Om besøket fører til noe: trykk på telefonnummer og e-post, abonnement på kalenderen, avspilte taler og mest leste nyheter',
      'Anonym telling uten informasjonskapsler. Ingenting lagres hos den besøkende, og menigheten kan slå tellingen av',
    ],
  },
];

export const PLANNED_MODULES = [
  'Givertjeneste',
  'Utleie',
  'Arrangement',
  'Kommunikasjon',
  'Skjemaer',
  'AI-assistent',
];
