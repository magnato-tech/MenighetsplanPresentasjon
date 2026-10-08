import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Globe, 
  Users, 
  Heart, 
  Building2, 
  Ticket, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  Play
} from 'lucide-react';

interface PricingSectionProps {
  onOpenContact: (plan?: string) => void;
  onOpenDemo?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact, onOpenDemo }) => {
  const [selectedAddon, setSelectedAddon] = useState<string>('givertjeneste');

  const addOnModules = [
    {
      id: 'givertjeneste',
      title: 'Givertjeneste',
      price: '99 kr/mnd',
      icon: <Heart className="w-5 h-5 text-rose-700" />,
      tagline: 'Vipps, faste gaver og årsoppgaver',
      features: [
        'Vipps-integrasjon for raske gaver',
        'Faste giveravtaler og engangsgaver',
        'Giveroversikt og full gavehistorikk',
        'Automatisk rapportering og årsoppgaver til Skatteetaten'
      ]
    },
    {
      id: 'utleie',
      title: 'Utleie',
      price: '99 kr/mnd',
      icon: <Building2 className="w-5 h-5 text-amber-700" />,
      tagline: 'Lokaler, booking og inntektsoversikt',
      features: [
        'Oversikt over kirkerom, festsaler og møterom',
        'Offentlig eller intern tilgjengelighetskalender',
        'Bookingforespørsler og leieavtaler',
        'Betaling og samlet inntektsoversikt for menigheten'
      ]
    },
    {
      id: 'arrangement',
      title: 'Arrangement',
      price: '99 kr/mnd',
      icon: <Ticket className="w-5 h-5 text-blue-700" />,
      tagline: 'Påmelding, betaling og check-in',
      features: [
        'Påmeldingsskjemaer og deltakerlister',
        'Kapasitetsstyring og automatisk venteliste',
        'Sikker betaling ved påmelding',
        'Digital check-in ved døren på mobilen'
      ]
    },
    {
      id: 'kommunikasjon',
      title: 'Kommunikasjon',
      price: '99 kr/mnd',
      icon: <MessageSquare className="w-5 h-5 text-emerald-700" />,
      tagline: 'SMS, e-post og målrettede utsendelser',
      features: [
        'SMS-varsler rett til frivillige og team',
        'E-post og nyhetsbrev til hele menigheten',
        'Målrettede utsendelser til spesifikke husgrupper',
        'Sporing av åpningsrate og leveringsstatus'
      ]
    },
    {
      id: 'skjemaer',
      title: 'Skjemaer',
      price: '99 kr/mnd',
      icon: <FileText className="w-5 h-5 text-indigo-700" />,
      tagline: 'Skjemabygger for alle menighetens behov',
      features: [
        'Dra-og-slipp skjemabygger',
        'Dåpspåmeldinger og vigselsforespørsler',
        'Spørreundersøkelser for menighetsfellesskapet',
        'Sikker lagring i tråd med GDPR'
      ]
    },
    {
      id: 'analyse',
      title: 'Analyse',
      price: '99 kr/mnd',
      icon: <BarChart3 className="w-5 h-5 text-teal-700" />,
      tagline: 'Nettside- og menighetsinnsikt',
      features: [
        'Nettsideanalyse: Besøk, trafikk og mest leste sider',
        'Menighetsanalyse: Aktivitet i husgrupper og samlinger',
        'Bemanningsgrad: Hvor mange oppgaver blir dekket?',
        'Forfallsoversikt og frivillig involvering over tid'
      ]
    },
    {
      id: 'ai',
      title: 'AI-assistent',
      price: '99 kr/mnd',
      icon: <Bot className="w-5 h-5 text-[#1A382B]" />,
      tagline: 'GDPR-sikker assistent for menighetsstaben',
      features: [
        'Hjelp med utkast til nyheter, talepunkter og artikler',
        'Forslag til samlingsprogrammer og kjøreplaner',
        'Avgrenset tilgang: AI får IKKE fri tilgang til databasen',
        'Sikker drift i samsvar med norsk personvern'
      ]
    }
  ];

  const currentAddon = addOnModules.find(m => m.id === selectedAddon) || addOnModules[0];

  return (
    <section id="priser" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Prismodell & Produktarkitektur
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            To kjernenivåer. Moduler etter behov.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Menigheten starter med gratis grunnplattform for offentlig formidling, og oppgraderer til Menighetsplan når dere skal organisere menneskene.
          </p>

            {/* Conceptual Split Banner */}
            <div className="mt-8 inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 p-3 sm:px-6 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-bold text-slate-900">Gratis (0 kr):</span>
                <span>«Hva skjer i menigheten?»</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A382B]"></span>
                <span className="font-bold text-slate-900">499 kr/mnd:</span>
                <span>«Hvem skal gjøre hva?»</span>
              </div>
            </div>
        </div>

        {/* The Two Main Products Grid (Kort 1: Menighetsplattform, Kort 2: Menighetsplan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Kort 1: MENIGHETSPLATTFORM (Gratis) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A382B] bg-[#E5EFE9] px-3 py-1 rounded-full">
                  Gratis
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Alltid 0 kr · Ingen binding
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4">
                Menighetsplattform
              </h3>

              {/* Price display */}
              <div className="flex items-baseline gap-2 mt-3 mb-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                  0 kr
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  / alltid gratis
                </span>
              </div>

              {/* Purpose statement */}
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-md inline-block mb-3">
                «Hva skjer i menigheten?»
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                En komplett digital grunnplattform for menigheten, med nettside, moderne CMS, kalender og en enkel Min Side.
              </p>

              {/* Feature Sub-Sections */}
              <div className="space-y-5 py-5 border-y border-slate-100 text-xs sm:text-sm text-slate-700">
                
                {/* 1. Nettside og CMS */}
                <div>
                  <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5 text-[#1A382B]" />
                    <span>Nettside og CMS</span>
                  </div>
                  <ul className="space-y-1.5 pl-1 text-slate-600 text-xs">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Moderne, responsiv nettside med SEO</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Moderne CMS med Live Preview før publisering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Sider, innhold, nyheter og mediebibliotek</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-900">Taler og lydarkiv med innebygd avspiller</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Kalender og samlingsplanlegging */}
                <div>
                  <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-[#1A382B]" />
                    <span>Kalender og samlingsplanlegging</span>
                  </div>
                  <ul className="space-y-1.5 pl-1 text-slate-600 text-xs">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Offentlig kalender for menighetens liv</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Gudstjenester og offentlige samlinger</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Samlingsplanlegging og kjøreplan / program</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Dynamiske innholdsmoduler */}
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-slate-200/80">
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dynamiske innholdsmoduler</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Henter data fra administrasjonen og viser dette automatisk på nettsiden (neste gudstjeneste, kalender, siste nyheter og taler). Legges inn én gang – oppdaterer seg selv!
                  </p>
                </div>

                {/* 4. Min Side */}
                <div>
                  <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-[#1A382B]" />
                    <span>Min Side (Enkel inngang)</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Neste i menigheten, kommende samlinger og lenker til relevant innhold.
                  </div>
                </div>

              </div>
            </div>

            {/* Action */}
            <div className="pt-6">
              <button
                onClick={() => onOpenContact('menighetsplattform-gratis')}
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>Kom i gang med gratis nettside</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Kort 2: MENIGHETSPLAN (499 kr/mnd) */}
          <div className="lg:col-span-6 bg-[#1A382B] text-white rounded-3xl p-7 sm:p-9 border border-[#1A382B] shadow-2xl flex flex-col justify-between relative transform lg:-translate-y-2">
            
            {/* Top Recommended Floating Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-sm">
              Mest populær
            </div>

            <div>
              {/* Header status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300">
                  Hovedprodukt
                </span>
                <span className="text-xs text-emerald-200/90 font-medium">
                  Prøv gratis i én måned
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-4">
                Menighetsplan
              </h3>

              {/* Price display */}
              <div className="flex items-baseline gap-2 mt-3 mb-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                  499 kr
                </span>
                <span className="text-sm sm:text-base font-semibold text-emerald-200">
                  / mnd
                </span>
              </div>

              {/* Purpose statement */}
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-2.5 py-1 rounded-md inline-block mb-3">
                «Hvem skal gjøre hva?»
              </div>

              <p className="text-sm text-slate-200 leading-relaxed mb-6">
                Alt i Menighetsplattform, pluss de helhetlige verktøyene for å organisere menighetens arbeid og mennesker.
              </p>

              {/* Process Bar: Person -> gruppe -> samling -> rolle -> oppgave -> bemanning -> svar -> forfall -> oppfølging */}
              <div className="mb-6 p-4 rounded-2xl bg-white/10 border border-white/15">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Kjernen i Menighetsplan: Bemanningsflyten</span>
                </div>
                
                <div className="text-xs text-emerald-100 flex flex-wrap items-center gap-1.5 font-medium leading-relaxed">
                  <span className="bg-white/15 px-2 py-0.5 rounded text-white font-semibold">Person</span>
                  <span>→</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded text-white font-semibold">Gruppe</span>
                  <span>→</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded text-white font-semibold">Samling</span>
                  <span>→</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded text-white font-semibold">Rolle</span>
                  <span>→</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded text-white font-semibold">Oppgave</span>
                  <span>→</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded text-white font-semibold">Bemanning</span>
                  <span>→</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded text-white font-semibold">Svar</span>
                  <span>→</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded text-white font-semibold">Forfall</span>
                  <span>→</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded text-white font-semibold">Oppfølging</span>
                </div>
              </div>

              {/* Features list */}
              <div className="py-4 border-y border-white/15">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 block mb-3">
                  Inkludert for 499 kr/mnd:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Personer & medlemsregister</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Tjenestegrupper & ledere</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Husfellesskap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Roller og oppgaver</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Bemanning og forespørsler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Bekreftelser og svar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Forfall og automatisk oppfølging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Min Side m/ personlige oppgaver</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Gruppechat for team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-emerald-200">Oppstartshjelp (inkludert)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Actions: Kom i gang (prøv gratis i 30 dager) + Se demo */}
            <div className="pt-6 space-y-2.5">
              <button
                onClick={() => onOpenContact('menighetsplan-trial')}
                className="w-full py-4 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#1A382B] bg-[#FAF7F2] hover:bg-white shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Prøv Menighetsplan gratis i 30 dager</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDemo}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-100 hover:text-white bg-white/10 hover:bg-white/15 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Se demo på demo.menighetsplan.no</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* TILLEGGSMODULER (99 kr/mnd per modul) */}
        <div className="pt-10 border-t border-slate-200/90">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] bg-[#E5EFE9] px-3 py-1 rounded-full">
              Fleksibel utvidelse
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              Tilleggsmoduler – 99 kr/mnd per modul
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Utvid løsningen etter hvert som menigheten trenger mer. Aktiver kun modulene dere bruker – ingen unødvendige pakker.
            </p>
          </div>

          {/* 7 Modules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 mb-10">
            {addOnModules.map((addon) => {
              const isSelected = selectedAddon === addon.id;
              return (
                <button
                  key={addon.id}
                  onClick={() => setSelectedAddon(addon.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#1A382B] shadow-md ring-2 ring-[#1A382B]/10'
                      : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        {addon.icon}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        99,-
                      </span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                      {addon.title}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-[#1A382B]">
                    {isSelected ? 'Viser detaljer ↓' : 'Se detaljer'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Add-on Deep Dive Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-slate-200">
                  {currentAddon.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-bold text-slate-900">{currentAddon.title}</h4>
                    <span className="text-xs font-extrabold text-[#1A382B] bg-[#E5EFE9] px-2.5 py-0.5 rounded-full">
                      {currentAddon.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentAddon.tagline}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenContact(`modul-${currentAddon.id}`)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#1A382B] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
              >
                Spør om {currentAddon.title}
              </button>
            </div>

            {/* Feature list for the selected addon */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              {currentAddon.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Special note for Utleie and AI */}
            {currentAddon.id === 'utleie' && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900">
                <span className="font-bold">Økonomisk samspill:</span> Inntekter fra utleie og givertjeneste kan etter hvert samles i en helhetlig økonomioversikt for menigheten.
              </div>
            )}

            {currentAddon.id === 'ai' && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-xs text-emerald-900">
                <span className="font-bold">Personvern i høysetet:</span> AI-assistenten har avgrenset og kontrollert tilgang til menighetens data. Den har aldri åpen eller ukontrollert tilgang til hele databasen.
              </div>
            )}
          </div>

        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-14 text-center text-xs text-slate-500 max-w-xl mx-auto">
          Start med gratis Menighetsplattform i dag. Test Menighetsplan gratis i 30 dager, og aktiver tilleggsmoduler kun dersom dere ønsker.
        </div>

      </div>
    </section>
  );
};
