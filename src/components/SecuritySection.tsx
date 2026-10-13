import React from 'react';
import { Building2, Download, FileText, KeyRound, ShieldAlert, UserCheck } from 'lucide-react';

// Det som står her, skal stemme med løsningen slik den er i drift. Teksten er avstemt mot
// produktdokumentasjonen i app-repoet (kapittel 7, 10 og 13) 13. oktober 2026. Det som ikke er
// på plass, står som «under arbeid», og skal ikke skrives om til noe mer før det finnes.
const topics = [
  {
    icon: KeyRound,
    title: 'Sikkerhet og innlogging',
    paragraphs: [
      'Brukerne logger inn med Google eller med en lenke på e-post. Menighetsplan lagrer ingen passord.',
      'Innlogging alene gir ingen tilgang: bare de som står i menighetens register, slipper inn, og databasen selv avgjør hva hver enkelt får lese og endre.',
      'Det finnes tre nivåer. En frivillig ser sine egne oppgaver og gruppene sine. En gruppeleder ser i tillegg navn og telefon til deltakerne i egen gruppe. Bare administrator ser hele registeret. Disse reglene prøves automatisk hver gang løsningen endres.',
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Hva hvis vi blir hacket?',
    paragraphs: [
      'Ingen seriøs leverandør kan garantere at en løsning aldri blir utsatt for angrep.',
      'Vi reduserer risikoen ved å lagre så lite som mulig, ved at hver menighet har sin egen database, og ved at tilgang styres i databasen og ikke bare på skjermen. Dataene ligger hos Google i EU (Frankfurt).',
      'Faste rutiner for sikkerhetskopiering, gjenoppretting og håndtering av sikkerhetshendelser er under arbeid og er ikke ferdig dokumentert.',
    ],
  },
  {
    icon: Building2,
    title: 'Skalerbarhet',
    paragraphs: [
      'Hver menighet får sin egen installasjon med egen database, egne brukere og egen nettadresse. Opplysninger fra én menighet ligger aldri sammen med en annens.',
      'Nye versjoner prøves først i en demo, og slippes samlet til menighetene når de er stabile.',
      'Løsningen er i bruk hos den første menigheten. Kapasitet og stabilitet prøves videre etter hvert som flere kommer til.',
    ],
  },
  {
    icon: UserCheck,
    title: 'Personvern',
    paragraphs: [
      'Vi lagrer bare det menigheten trenger for å planlegge. Fødselsnummer lagres ikke. Fødselsdato og medlemskap ser bare administrator.',
      'Grunn til forfall lagres ikke; det tas muntlig. En gruppeleder kan foreslå et navn til gruppen sin, men det er administrator som godkjenner og legger personen inn.',
      'Databehandleravtale og faste rutiner for innsyn og sletting er under arbeid.',
    ],
  },
];

// Dokumentene menigheten (behandlingsansvarlig) og Menighetsplan (databehandler) signerer.
// Et dokument uten `href` vises som «Kommer snart» og kan ikke trykkes på. Når filen finnes:
// legg den i public/dokumenter/ og sett href til "/dokumenter/<filnavn>.pdf".
const documents: { title: string; description: string; href?: string }[] = [
  {
    title: 'Databehandleravtale',
    description: 'Avtalen mellom menigheten som behandlingsansvarlig og Menighetsplan som databehandler. Signeres av begge parter.',
  },
  {
    title: 'Vedlegg: sikkerhetstiltak',
    description: 'Hvordan opplysningene er beskyttet: tilgang, lagring, sikkerhetskopiering og håndtering av avvik.',
  },
  {
    title: 'Vedlegg: underleverandører',
    description: 'Hvem som behandler opplysninger på våre vegne, og hvor dataene ligger.',
  },
];

export const SecuritySection: React.FC = () => {
  return (
    <section id="sikkerhet" className="py-20 lg:py-28 bg-white border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            GDPR og sikkerhet
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Hva som er på plass, og hva som gjenstår
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Menighetsplan behandler opplysninger om medlemmer og frivillige. Her står det hvordan de er beskyttet i dag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map(({ icon: Icon, title, paragraphs }) => (
            <div key={title} className="bg-[#FAF7F2] rounded-2xl p-7 border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#E5EFE9] text-[#1A382B] flex items-center justify-center font-bold mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
              <div className="space-y-3">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div id="dokumenter" className="mt-12 bg-[#FAF7F2] rounded-2xl p-7 border border-slate-200/80 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Dokumenter til signering</h3>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            Når en menighet tar Menighetsplan i bruk, er menigheten behandlingsansvarlig og Menighetsplan databehandler. Dokumentene som regulerer dette, legges ut her for nedlasting.
          </p>
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {documents.map((document) => (
              <li key={document.title} className="bg-white rounded-xl p-5 border border-slate-200/80 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-[#1A382B] shrink-0" />
                  <span className="text-sm font-bold text-slate-900">{document.title}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{document.description}</p>
                {document.href ? (
                  <a
                    href={document.href}
                    download
                    className="mt-4 inline-flex items-center gap-1.5 self-start px-3 py-2 rounded-lg text-sm font-semibold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Last ned (PDF)</span>
                  </a>
                ) : (
                  <span className="mt-4 inline-flex self-start px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200">
                    Kommer snart
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p className="max-w-3xl mx-auto mt-12 text-center text-base text-slate-700 leading-relaxed">
          Vi bygger Menighetsplan langsiktig, med sikkerhet og personvern som en del av selve produktet – ikke som noe vi legger til i etterkant. Og vi er åpne om hva som er på plass, og hva som fortsatt må forbedres og dokumenteres.
        </p>

      </div>
    </section>
  );
};
