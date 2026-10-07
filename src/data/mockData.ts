/**
 * Mock data for Menighetsplan (menighetsplan.no)
 * Strukturert for enkel utvidelse og fremtidig tilkobling til API/backend.
 */

export interface CalendarEvent {
  id: string;
  day: string;
  date: string;
  time: string;
  title: string;
  category: 'Gudstjeneste' | 'Husgruppe' | 'Bønn' | 'Ungdom';
  location: string;
  speakerOrLeader: string;
  description: string;
}

export interface ChurchProfile {
  id: string;
  name: string;
  location: string;
  tagline: string;
  accentColor: string;
  primaryBg: string;
  secondaryBg: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  nextEvent: string;
  membersCount: string;
  activeGroups: number;
}

export interface ModuleItem {
  id: string;
  title: string;
  category: 'start' | 'videre';
  description: string;
  icon: string;
  badge?: string;
}

export interface AdminRoleInfo {
  role: 'Admin' | 'Redaktør' | 'Gruppeleder' | 'Medlem';
  description: string;
  permissions: {
    innhold: boolean;
    kalender: boolean;
    grupper: boolean;
    brukere: boolean;
    statistikk: boolean;
    innstillinger: boolean;
  };
}

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-1',
    day: 'Søndag',
    date: '11. oktober',
    time: '11:00',
    title: 'Gudstjeneste',
    category: 'Gudstjeneste',
    location: 'Hovedsalen & Livestream',
    speakerOrLeader: 'Thomas Berg',
    description: 'Søndagsgudstjeneste med lovsang, nattverd og barnekirke i underetasjen.'
  },
  {
    id: 'evt-2',
    day: 'Tirsdag',
    date: '13. oktober',
    time: '19:00',
    title: 'Husgruppe',
    category: 'Husgruppe',
    location: 'Hjemme hos Marie & Jonas, Grünerløkka',
    speakerOrLeader: 'Marie V.',
    description: 'Kveldsmat, samtale om søndagens tema og felles bønn.'
  },
  {
    id: 'evt-3',
    day: 'Onsdag',
    date: '14. oktober',
    time: '18:00',
    title: 'Bønn',
    category: 'Bønn',
    location: 'Bønnerommet',
    speakerOrLeader: 'Elin Sandvik',
    description: 'Åpen bønnesamling for menigheten og byen.'
  },
  {
    id: 'evt-4',
    day: 'Fredag',
    date: '16. oktober',
    time: '19:30',
    title: 'Ungdomskveld & Fellesskap',
    category: 'Ungdom',
    location: 'Kjellerstua',
    speakerOrLeader: 'Kasper & Lea',
    description: 'Sosialt, lovsang, kiosk og kafé for ungdom fra 13 til 19 år.'
  }
];

export const MOCK_CHURCHES: ChurchProfile[] = [
  {
    id: 'sentrumskirken',
    name: 'Sentrumskirken Oslo',
    location: 'Oslo Sentrum',
    tagline: 'Et åpent fellesskap midt i byen',
    accentColor: '#1A382B',
    primaryBg: '#FAF7F2',
    secondaryBg: '#F1F7F3',
    textColor: '#1A382B',
    badgeBg: '#E5EFE9',
    badgeText: '#1A382B',
    nextEvent: 'Søndag 11:00 · Gudstjeneste',
    membersCount: '340 aktive',
    activeGroups: 14
  },
  {
    id: 'kraftverket',
    name: 'Kraftverket Fellesskap',
    location: 'Vika / Majorstuen',
    tagline: 'Autentisk tro i et urbant hverdagsliv',
    accentColor: '#9C4221',
    primaryBg: '#FDF8F5',
    secondaryBg: '#FBECE6',
    textColor: '#702D13',
    badgeBg: '#F8DACD',
    badgeText: '#702D13',
    nextEvent: 'Søndag 17:00 · Kveldsgudstjeneste',
    membersCount: '210 aktive',
    activeGroups: 9
  },
  {
    id: 'bydelskirken',
    name: 'Bydelskirken',
    location: 'Nydalen',
    tagline: 'Nærvær og engasjement i nærmiljøet',
    accentColor: '#1E3A5F',
    primaryBg: '#F7F9FC',
    secondaryBg: '#EBF2FA',
    textColor: '#162C46',
    badgeBg: '#D8E7F6',
    badgeText: '#162C46',
    nextEvent: 'Søndag 11:00 · Familiefeiring',
    membersCount: '480 aktive',
    activeGroups: 22
  }
];

export const PLATFORM_MODULES: ModuleItem[] = [
  {
    id: 'nettside',
    title: 'Nettside',
    category: 'start',
    description: 'Moderne, universelt utformet menighetsnettside som fungerer like godt på mobil som desktop.',
    icon: 'Globe'
  },
  {
    id: 'cms',
    title: 'CMS',
    category: 'start',
    description: 'Enkelt publiseringsverktøy for menigheten. Rediger tekster, bilder og sider uten kode.',
    icon: 'Layout'
  },
  {
    id: 'kalender',
    title: 'Kalender',
    category: 'start',
    description: 'Felles kalender for gudstjenester, husgrupper og aktiviteter med automatisk gjenbruk.',
    icon: 'Calendar'
  },
  {
    id: 'min-side',
    title: 'Min side',
    category: 'videre',
    description: 'Personlig oversikt for medlemmer, frivillige oppgaver, grupper og tjenestelister.',
    icon: 'UserCheck'
  },
  {
    id: 'grupper',
    title: 'Grupper',
    category: 'videre',
    description: 'Administrasjon av husgrupper, tjenesteteam og kontaktflater for gruppeledere.',
    icon: 'Users'
  },
  {
    id: 'nyheter',
    title: 'Nyheter',
    category: 'videre',
    description: 'Publiser artikler, vitnesbyrd og viktige beskjeder rett til forsiden og nyhetsarkivet.',
    icon: 'Newspaper'
  },
  {
    id: 'taler',
    title: 'Taler & Lydarkiv',
    category: 'start',
    description: 'Arkiver taler, opptak og ressurser med innebygd avspiller direkte på nettsiden.',
    icon: 'Headphones'
  },
  {
    id: 'kommunikasjon',
    title: 'Kommunikasjon',
    category: 'videre',
    description: 'Fremtidige utsendelser og varsler etter hvert som menigheten utvider.',
    icon: 'Mail'
  },
  {
    id: 'analyse',
    title: 'Analyse',
    category: 'videre',
    description: 'Enkel, personvernvennlig statistikk over besøk og hva menighetens medlemmer leter etter.',
    icon: 'BarChart3'
  },
  {
    id: 'administrasjon',
    title: 'Administrasjon',
    category: 'videre',
    description: 'Rollebasert tilgangskontroll, brukerhåndtering og menighetens egne innstillinger.',
    icon: 'ShieldCheck'
  }
];

export const ADMIN_ROLES: AdminRoleInfo[] = [
  {
    role: 'Admin',
    description: 'Full tilgang til hele menighetens plattform, modulaktivering, design og brukertilganger.',
    permissions: {
      innhold: true,
      kalender: true,
      grupper: true,
      brukere: true,
      statistikk: true,
      innstillinger: true
    }
  },
  {
    role: 'Redaktør',
    description: 'Kan opprette og redigere sider, nyhetsartikler, taler og kalenderoppføringer.',
    permissions: {
      innhold: true,
      kalender: true,
      grupper: true,
      brukere: false,
      statistikk: true,
      innstillinger: false
    }
  },
  {
    role: 'Gruppeleder',
    description: 'Tilgang til å oppdatere egen husgruppe, medlemsliste og samlingstider.',
    permissions: {
      innhold: false,
      kalender: true,
      grupper: true,
      brukere: false,
      statistikk: false,
      innstillinger: false
    }
  },
  {
    role: 'Medlem',
    description: 'Tilgang til Min side, egne påmeldinger, tjenesteliste og intern kontaktinformasjon.',
    permissions: {
      innhold: false,
      kalender: false,
      grupper: false,
      brukere: false,
      statistikk: false,
      innstillinger: false
    }
  }
];

export const CMS_BLOCKS_PREVIEW = [
  { id: 'b-1', type: 'Hero-seksjon', title: 'Velkommen til Sentrumskirken', status: 'Publisert' },
  { id: 'b-2', type: 'Kalendervisning', title: 'Hva skjer denne uken', status: 'Synkronisert' },
  { id: 'b-3', type: 'Siste tale', title: 'Håp for byen – Thomas Berg', status: 'Lydfil aktiv' },
  { id: 'b-4', type: 'Bli med i gruppe', title: 'Finn din husgruppe i høst', status: 'Aktiv knapp' }
];

export const ANALYTICS_DATA = {
  totalVisits: '2 438',
  trend: '+18.4% fra forrige måned',
  topPages: [
    { rank: 1, name: 'Gudstjeneste', visits: 942, percent: '38.6%' },
    { rank: 2, name: 'Kalender', visits: 684, percent: '28.1%' },
    { rank: 3, name: 'Om oss & Ledelse', visits: 412, percent: '16.9%' },
    { rank: 4, name: 'Husgrupper', visits: 254, percent: '10.4%' },
    { rank: 5, name: 'Kontakt', visits: 146, percent: '6.0%' }
  ],
  devices: {
    mobile: '68%',
    desktop: '28%',
    tablet: '4%'
  }
};
