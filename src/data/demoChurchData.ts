export interface DemoService {
  id: string;
  date: string;
  time: string;
  title: string;
  theme: string;
  scripture: string;
  speaker: string;
  leader: string;
  location: string;
  description: string;
  kidsChurch: boolean;
  fellowshipMeal: boolean;
}

export interface DemoSermon {
  id: string;
  date: string;
  title: string;
  speaker: string;
  series: string;
  scripture: string;
  duration: string;
  summary: string;
  audioUrl?: string;
}

export interface DemoNewsArticle {
  id: string;
  date: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  body: string;
}

export interface DemoPerson {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  groups: string[];
  status: 'aktiv' | 'pause';
  initials: string;
}

export interface DemoRosterRole {
  id: string;
  role: string;
  group: string;
  personName: string;
  personId: string;
  time: string;
  status: 'bekreftet' | 'forespart' | 'forfall';
  isKeyRole?: boolean;
}

export interface DemoTask {
  id: string;
  title: string;
  assignedTo: string;
  group: string;
  time: string;
  completed: boolean;
}

export interface DemoChurchState {
  churchName: string;
  tagline: string;
  welcomeMessage: string;
  address: string;
  phone: string;
  email: string;
  vipps: string;
  services: DemoService[];
  sermons: DemoSermon[];
  news: DemoNewsArticle[];
  people: DemoPerson[];
  roster: DemoRosterRole[];
  tasks: DemoTask[];
}

export const initialDemoChurchData: DemoChurchState = {
  churchName: 'Håp Kirke & Fellesskap',
  tagline: 'Et åpent og varmt fellesskap midt i byen',
  welcomeMessage: 'Vi ønsker å være en kirke der alle mennesker kan oppleve tilhørighet, finne tro og få tjene med sine gaver. Enten du er nysgjerrig, ny i byen eller har gått i kirken hele livet, er du hjertelig velkommen!',
  address: 'Kirkegata 14, 0153 Oslo',
  phone: '+47 22 10 40 00',
  email: 'post@haapkirke.no',
  vipps: '12400 (Håp Kirke)',
  services: [
    {
      id: 'srv-1',
      date: 'Kommende søndag · 11. oktober',
      time: '11:00',
      title: 'Gudstjeneste & Nattverd',
      theme: 'Nåde i hverdagen',
      scripture: 'Efeserbrevet 2:8–10',
      speaker: 'Ingrid Løken (Pastor)',
      leader: 'Thomas Bakke',
      location: 'Hovedsalen, Kirkegata 14',
      description: 'Velkommen til en varm gudstjeneste med lovsang, nattverd og inspirerende tale. Kirkekaffe og mingling etter samlingen.',
      kidsChurch: true,
      fellowshipMeal: false
    },
    {
      id: 'srv-2',
      date: 'Onsdag · 14. oktober',
      time: '19:00',
      title: 'Bønnekveld & Lovsang',
      theme: 'Tid i Guds nærvær',
      scripture: 'Salme 27',
      speaker: 'Jonas Berg',
      leader: 'Silje Hansen',
      location: 'Krypten / Bønnerommet',
      description: 'En stille time med akustisk lovsang, felles bønn og personlig forbønn.',
      kidsChurch: false,
      fellowshipMeal: false
    },
    {
      id: 'srv-3',
      date: 'Søndag · 18. oktober',
      time: '11:00',
      title: 'Gudstjeneste & Fellesskapslunsj',
      theme: 'Fellesskap som forvandler',
      scripture: 'Apostlenes gjerninger 2:42–47',
      speaker: 'Thomas Bakke',
      leader: 'Ingrid Løken',
      location: 'Hovedsalen & Kafeen',
      description: 'Familiegudstjeneste etterfulgt av felles varm lunsj for alle generasjoner. Ta gjerne med en venn!',
      kidsChurch: true,
      fellowshipMeal: true
    }
  ],
  sermons: [
    {
      id: 'srm-1',
      date: '4. oktober 2026',
      title: 'Å leve i tillit i en urolig tid',
      speaker: 'Ingrid Løken',
      series: 'Tro i praksis',
      scripture: 'Matteus 6:25–34',
      duration: '34 min',
      summary: 'Hvordan kan vi finne fred og hvile når bekymringene tårner seg opp? Pastor Ingrid deler konkrete perspektiver om Guds omsorg og prioriteringer i hverdagen.'
    },
    {
      id: 'srm-2',
      date: '27. september 2026',
      title: 'Fellesskapets helende kraft',
      speaker: 'Thomas Bakke',
      series: 'Sammen er vi sterkere',
      scripture: 'Galaterne 6:1–5',
      duration: '29 min',
      summary: 'Vi er ikke skapt til å bære byrdene alene. En tale om ærlighet, sårbarhet og verdien av smågrupper.'
    },
    {
      id: 'srm-3',
      date: '20. september 2026',
      title: 'Guds hjerte for byen vår',
      speaker: 'Gjestetaler Miriam Solberg',
      series: 'Sendt til verden',
      scripture: 'Jeremia 29:4–7',
      duration: '38 min',
      summary: 'Hva betyr det å fremme byens vel i hverdagen på skolen, arbeidsplassen og i nabolaget?'
    }
  ],
  news: [
    {
      id: 'nws-1',
      date: '2. oktober 2026',
      title: 'Velkommen til semesterstart og fellesskapshelg!',
      category: 'Aktuelt',
      readTime: '3 min',
      excerpt: 'Høsten er i full gang, og vi gleder oss til nye samlinger, cellegrupper og arrangementer for alle aldre.',
      body: 'Det er en glede å ønske både nye og kjente fjes velkommen til et innholdsrikt høstsemester i Håp Kirke. Vi starter opp cellegruppene for fullt neste uke, og søndagsskolen har forberedt nye morsomme temaer for barna.'
    },
    {
      id: 'nws-2',
      date: '25. september 2026',
      title: 'Bli med i en cellegruppe / husfellesskap i høst',
      category: 'Fellesskap',
      readTime: '2 min',
      excerpt: 'Meld deg på en gruppe i ditt nærområde – vi har grupper for unge voksne, familier og seniorer.',
      body: 'I de mindre gruppene deler vi liv, ber for hverandre og leser Bibelen sammen i uformelle rammer hjemme hos hverandre.'
    },
    {
      id: 'nws-3',
      date: '18. september 2026',
      title: 'Lyst til å bidra? Nye muligheter i kirkekaffe og teknikk',
      category: 'Frivillighet',
      readTime: '2 min',
      excerpt: 'Menigheten drives av engasjerte frivillige. Du trenger ingen forhåndskunnskap – vi gir full opplæring!',
      body: 'Vi har ledige plasser på lyd/streaming-teamet og vertskapet. Å være frivillig er en fantastisk måte å bli kjent med nye mennesker på!'
    }
  ],
  people: [
    {
      id: 'p-1',
      name: 'Thomas Bakke',
      email: 'thomas@haapkirke.no',
      phone: '924 11 201',
      role: 'Daglig leder & Møteleder',
      groups: ['Lederteam', 'Møteledelse', 'Gudstjenesteteam'],
      status: 'aktiv',
      initials: 'TB'
    },
    {
      id: 'p-2',
      name: 'Ingrid Løken',
      email: 'ingrid@haapkirke.no',
      phone: '988 23 410',
      role: 'Hovedpastor',
      groups: ['Lederteam', 'Prekenteam', 'Sjelesorg'],
      status: 'aktiv',
      initials: 'IL'
    },
    {
      id: 'p-3',
      name: 'Jonas Berg',
      email: 'jonas.b@online.no',
      phone: '412 80 914',
      role: 'Lovsangsleder',
      groups: ['Lovsangsteam', 'Ungdom'],
      status: 'aktiv',
      initials: 'JB'
    },
    {
      id: 'p-4',
      name: 'Henrik Sand',
      email: 'henrik.sand@stud.ntnu.no',
      phone: '901 44 322',
      role: 'Lydtekniker & Streaming',
      groups: ['Teknikk & Media'],
      status: 'aktiv',
      initials: 'HS'
    },
    {
      id: 'p-5',
      name: 'Silje Hansen',
      email: 'silje.hansen@skole.oslo.no',
      phone: '479 33 118',
      role: 'Leder Barnekirke',
      groups: ['Barnekirke', 'Søndagsskole'],
      status: 'aktiv',
      initials: 'SH'
    },
    {
      id: 'p-6',
      name: 'Kari Moen',
      email: 'kari.moen@broadpark.no',
      phone: '955 60 711',
      role: 'Vertskap & Kirkekaffe',
      groups: ['Vertskap', 'Diakoni'],
      status: 'aktiv',
      initials: 'KM'
    },
    {
      id: 'p-7',
      name: 'Ole Moen',
      email: 'ole.moen@broadpark.no',
      phone: '955 60 712',
      role: 'Vertskap & Kirkevert',
      groups: ['Vertskap'],
      status: 'aktiv',
      initials: 'OM'
    },
    {
      id: 'p-8',
      name: 'Andreas Vik',
      email: 'andreas.vik@techflow.no',
      phone: '401 19 822',
      role: 'Reserve Lyd/Lys',
      groups: ['Teknikk & Media'],
      status: 'aktiv',
      initials: 'AV'
    },
    {
      id: 'p-9',
      name: 'Elena Ruud',
      email: 'elena.ruud@gmail.com',
      phone: '917 88 402',
      role: 'Lovsang (Vokal & Piano)',
      groups: ['Lovsangsteam'],
      status: 'aktiv',
      initials: 'ER'
    },
    {
      id: 'p-10',
      name: 'Markus Tveit',
      email: 'markus.tveit@gmail.com',
      phone: '482 10 309',
      role: 'Leder Barnekirke assistent',
      groups: ['Barnekirke'],
      status: 'aktiv',
      initials: 'MT'
    }
  ],
  roster: [
    {
      id: 'rst-1',
      role: 'Møteleder',
      group: 'Møteledelse',
      personName: 'Thomas Bakke',
      personId: 'p-1',
      time: '10:15 – 12:45',
      status: 'bekreftet',
      isKeyRole: true
    },
    {
      id: 'rst-2',
      role: 'Taler',
      group: 'Prekenteam',
      personName: 'Ingrid Løken',
      personId: 'p-2',
      time: '10:30 – 12:45',
      status: 'bekreftet',
      isKeyRole: true
    },
    {
      id: 'rst-3',
      role: 'Lovsangsleder & Gitar',
      group: 'Lovsangsteam',
      personName: 'Jonas Berg',
      personId: 'p-3',
      time: '09:15 – 12:45',
      status: 'bekreftet',
      isKeyRole: true
    },
    {
      id: 'rst-4',
      role: 'Lyd & Streamingansvarlig',
      group: 'Teknikk & Media',
      personName: 'Henrik Sand',
      personId: 'p-4',
      time: '09:00 – 13:00',
      status: 'bekreftet',
      isKeyRole: true
    },
    {
      id: 'rst-5',
      role: 'Leder Barnekirke',
      group: 'Barnekirke',
      personName: 'Silje Hansen',
      personId: 'p-5',
      time: '10:30 – 12:30',
      status: 'bekreftet'
    },
    {
      id: 'rst-6',
      role: 'Assistent Barnekirke',
      group: 'Barnekirke',
      personName: 'Markus Tveit',
      personId: 'p-10',
      time: '10:45 – 12:30',
      status: 'forespart'
    },
    {
      id: 'rst-7',
      role: 'Vertskap & Kirkevert',
      group: 'Vertskap',
      personName: 'Ole Moen',
      personId: 'p-7',
      time: '10:15 – 13:00',
      status: 'bekreftet'
    },
    {
      id: 'rst-8',
      role: 'Kirkekaffe & Kafeansvarlig',
      group: 'Vertskap',
      personName: 'Kari Moen',
      personId: 'p-6',
      time: '10:15 – 13:30',
      status: 'bekreftet'
    }
  ],
  tasks: [
    {
      id: 'tsk-1',
      title: 'Sjekke batterier og trådløse mikker før lydprøve',
      assignedTo: 'Henrik Sand',
      group: 'Teknikk & Media',
      time: '09:15',
      completed: true
    },
    {
      id: 'tsk-2',
      title: 'Klargjøre nattverdsbegre og brød',
      assignedTo: 'Ole Moen',
      group: 'Vertskap',
      time: '10:00',
      completed: true
    },
    {
      id: 'tsk-3',
      title: 'Sette fram velkomstskilt ved inngangsparti',
      assignedTo: 'Ole Moen',
      group: 'Vertskap',
      time: '10:20',
      completed: false
    },
    {
      id: 'tsk-4',
      title: 'Trakte kaffe og skjære opp frukt til kirkekaffen',
      assignedTo: 'Kari Moen',
      group: 'Vertskap',
      time: '10:30',
      completed: false
    },
    {
      id: 'tsk-5',
      title: 'Klargjøre tegnesaker og materiell til barnekirke',
      assignedTo: 'Silje Hansen',
      group: 'Barnekirke',
      time: '10:40',
      completed: false
    }
  ]
};
