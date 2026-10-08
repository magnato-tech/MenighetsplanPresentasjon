import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Headphones, 
  BookOpen, 
  Heart, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  UserCheck, 
  Sparkles, 
  Coffee, 
  Smile, 
  Play, 
  Share2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Lock,
  Layers,
  Users,
  Compass,
  CheckCircle2,
  ListTodo
} from 'lucide-react';
import { DemoChurchState, DemoService, DemoSermon, DemoNewsArticle } from '../../data/demoChurchData';

interface DemoPublicWebsiteProps {
  level: 1 | 2;
  data: DemoChurchState;
  onSelectLevel: (lvl: 1 | 2) => void;
  onOpenCms: () => void;
  onUpdateRosterStatus?: (roleId: string, status: 'bekreftet' | 'forespart' | 'forfall') => void;
}

export const DemoPublicWebsite: React.FC<DemoPublicWebsiteProps> = ({
  level,
  data,
  onSelectLevel,
  onOpenCms,
  onUpdateRosterStatus
}) => {
  const [activePage, setActivePage] = useState<'forside' | 'gudstjenester' | 'taler' | 'aktuelt' | 'om' | 'minside'>('forside');
  const [playingSermonId, setPlayingSermonId] = useState<string | null>(null);
  const [minSideVolunteerId, setMinSideVolunteerId] = useState<string>('p-4'); // Henrik Sand
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true);
  const [simulatedForfallSent, setSimulatedForfallSent] = useState(false);

  const nextService = data.services[0];
  const activeVolunteer = data.people.find(p => p.id === minSideVolunteerId) || data.people[3];
  const volunteerAssignments = data.roster.filter(r => r.personName.toLowerCase().includes(activeVolunteer.name.toLowerCase().split(' ')[0]));
  const volunteerTasks = data.tasks.filter(t => t.assignedTo.toLowerCase().includes(activeVolunteer.name.toLowerCase().split(' ')[0]));

  const handleForfallClick = (roleId: string) => {
    if (onUpdateRosterStatus) {
      onUpdateRosterStatus(roleId, 'forfall');
    }
    setSimulatedForfallSent(true);
  };

  const handleResetForfall = (roleId: string) => {
    if (onUpdateRosterStatus) {
      onUpdateRosterStatus(roleId, 'bekreftet');
    }
    setSimulatedForfallSent(false);
  };

  return (
    <div className="min-h-[800px] flex flex-col bg-white text-slate-800 font-sans selection:bg-[#1A382B] selection:text-white">
      {/* Top Notification Ribbon for Demo Context */}
      <div className="bg-[#1A382B] text-emerald-100 text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#244C3B]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white">Offentlig visning:</span>
          <span>Slik ser menighetens nettside ut for medlemmer og søkende.</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-emerald-200">
            Aktiv pakke: <strong className="text-white">{level === 1 ? 'Nivå 1 (Menighetsplattform – Gratis)' : 'Nivå 2 (Menighetsplan – 499 kr/mnd)'}</strong>
          </span>
          <button
            onClick={onOpenCms}
            className="text-white underline hover:text-emerald-300 font-semibold cursor-pointer"
          >
            Rediger innhold i CMS →
          </button>
        </div>
      </div>

      {/* Public Church Header / Nav Bar */}
      <header className="border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur-xs z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Brand */}
          <button 
            onClick={() => setActivePage('forside')} 
            className="text-left flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1A382B] text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-[#234D3B] transition-colors">
              H
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight block leading-tight">
                {data.churchName}
              </span>
              <span className="text-xs text-slate-500 hidden sm:block">
                {data.tagline}
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActivePage('forside')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activePage === 'forside' ? 'text-[#1A382B] font-bold bg-[#FAF7F2]' : 'hover:text-slate-900'
              }`}
            >
              Forside
            </button>
            <button
              onClick={() => setActivePage('gudstjenester')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activePage === 'gudstjenester' ? 'text-[#1A382B] font-bold bg-[#FAF7F2]' : 'hover:text-slate-900'
              }`}
            >
              Gudstjenester
            </button>
            <button
              onClick={() => setActivePage('taler')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activePage === 'taler' ? 'text-[#1A382B] font-bold bg-[#FAF7F2]' : 'hover:text-slate-900'
              }`}
            >
              Taler & Opptak
            </button>
            <button
              onClick={() => setActivePage('aktuelt')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activePage === 'aktuelt' ? 'text-[#1A382B] font-bold bg-[#FAF7F2]' : 'hover:text-slate-900'
              }`}
            >
              Aktuelt
            </button>
            <button
              onClick={() => setActivePage('om')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activePage === 'om' ? 'text-[#1A382B] font-bold bg-[#FAF7F2]' : 'hover:text-slate-900'
              }`}
            >
              Om oss
            </button>
          </nav>

          {/* Right Action: Min Side Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage('minside')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                activePage === 'minside'
                  ? 'bg-[#1A382B] text-white ring-2 ring-[#1A382B]/20'
                  : 'bg-emerald-50 text-[#1A382B] hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Min Side</span>
              {level === 2 && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-between px-4 py-2 border-t border-slate-100 bg-[#FAF7F2]/60 overflow-x-auto text-xs font-medium">
          <button onClick={() => setActivePage('forside')} className={`px-2.5 py-1 whitespace-nowrap ${activePage === 'forside' ? 'font-bold text-[#1A382B]' : 'text-slate-600'}`}>Forside</button>
          <button onClick={() => setActivePage('gudstjenester')} className={`px-2.5 py-1 whitespace-nowrap ${activePage === 'gudstjenester' ? 'font-bold text-[#1A382B]' : 'text-slate-600'}`}>Gudstjenester</button>
          <button onClick={() => setActivePage('taler')} className={`px-2.5 py-1 whitespace-nowrap ${activePage === 'taler' ? 'font-bold text-[#1A382B]' : 'text-slate-600'}`}>Taler</button>
          <button onClick={() => setActivePage('aktuelt')} className={`px-2.5 py-1 whitespace-nowrap ${activePage === 'aktuelt' ? 'font-bold text-[#1A382B]' : 'text-slate-600'}`}>Aktuelt</button>
          <button onClick={() => setActivePage('om')} className={`px-2.5 py-1 whitespace-nowrap ${activePage === 'om' ? 'font-bold text-[#1A382B]' : 'text-slate-600'}`}>Om oss</button>
        </div>
      </header>

      {/* Main Page Content Body */}
      <main className="flex-1">
        {/* ========================================================
            PAGE: FORSIDE (HOME)
            ======================================================== */}
        {activePage === 'forside' && (
          <div>
            {/* Hero Section */}
            <section className="relative bg-[#1A382B] text-white py-16 sm:py-24 overflow-hidden">
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A382B] via-[#204434] to-[#12271E] opacity-95"></div>
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

              <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Velkommen hjem til et åpent fellesskap</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                    {data.welcomeMessage.length > 50 ? 'Rom for tro, håp og ekte fellesskap' : data.welcomeMessage}
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                    {data.welcomeMessage}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setActivePage('gudstjenester')}
                      className="px-5 py-3 rounded-xl bg-white text-[#1A382B] font-bold text-sm hover:bg-emerald-50 transition-colors shadow-md cursor-pointer flex items-center gap-2"
                    >
                      <span>Søndagens gudstjeneste</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActivePage('taler')}
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/20 cursor-pointer flex items-center gap-2"
                    >
                      <Headphones className="w-4 h-4 text-emerald-300" />
                      <span>Hør siste tale</span>
                    </button>
                  </div>
                </div>

                {/* Upcoming Service Card on Hero */}
                {nextService && (
                  <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-white/95 text-slate-900 shadow-2xl backdrop-blur-md border border-white/40 max-w-2xl">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] bg-[#E5EFE9] px-2.5 py-1 rounded-md">
                        Neste gudstjeneste
                      </span>
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {nextService.location}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {nextService.title} – Tema: «{nextService.theme}»
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <Calendar className="w-4 h-4 text-[#1A382B]" />
                        <span>{nextService.date} kl. {nextService.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span>Tale: {nextService.speaker}</span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {nextService.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-3">
                        {nextService.kidsChurch && (
                          <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                            <Smile className="w-3.5 h-3.5" /> Barnekirke & Tweens
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium">
                          <Coffee className="w-3.5 h-3.5" /> Kirkekaffe etterpå
                        </span>
                      </div>

                      <button
                        onClick={() => setActivePage('gudstjenester')}
                        className="text-[#1A382B] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Se program & kjøreplan</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Welcome & Values Section */}
            <section className="py-14 bg-[#FAF7F2]">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1A382B] flex items-center justify-center mb-4">
                      <Heart className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mb-2">Varmt fellesskap</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Hos oss er ingen fremmede for lenge. Vi spiser sammen, deler tro og liv, og støtter hverandre i hverdagen.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1A382B] flex items-center justify-center mb-4">
                      <BookOpen className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mb-2">Relevant forkynnelse</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Vi ønsker at talene skal berøre det virkelige livet – ærlig, livsnært og forankret i evangeliet om Jesus.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1A382B] flex items-center justify-center mb-4">
                      <Users className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mb-2">Plass for alle gaver</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Enten du synger, brygger kaffe, er god med barn eller liker teknikk – det er plass til deg på teamet!
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Siste Taler (Sermons Showcase) */}
            <section className="py-14 bg-white border-b border-slate-200">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                      Forkynnelse & Læring
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      Siste taler og opptak
                    </h2>
                  </div>
                  <button
                    onClick={() => setActivePage('taler')}
                    className="text-sm font-semibold text-[#1A382B] hover:text-[#234D3B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Se hele prekenarkivet</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.sermons.slice(0, 3).map((sermon) => (
                    <div 
                      key={sermon.id}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span>{sermon.date}</span>
                          <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                            {sermon.duration}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                          {sermon.title}
                        </h4>
                        <div className="text-xs text-slate-600 mb-3">
                          <span className="font-semibold text-slate-800">{sermon.speaker}</span>
                          {sermon.scripture && <span> · {sermon.scripture}</span>}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {sermon.summary}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between">
                        <button
                          onClick={() => setPlayingSermonId(playingSermonId === sermon.id ? null : sermon.id)}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#1A382B] hover:text-[#234D3B] cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-full bg-[#1A382B] text-white flex items-center justify-center">
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                          </div>
                          <span>{playingSermonId === sermon.id ? 'Spiller av...' : 'Lytt til tale'}</span>
                        </button>
                        <span className="text-[11px] text-slate-400 font-medium">{sermon.series}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Aktuelt fra menigheten (CMS articles) */}
            <section className="py-14 bg-[#FAF7F2]">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                      Nyheter & Aktuelt
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      Hva skjer i Håp Kirke?
                    </h2>
                  </div>
                  <button
                    onClick={() => setActivePage('aktuelt')}
                    className="text-sm font-semibold text-[#1A382B] hover:text-[#234D3B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Les alle artikler</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.news.map((item) => (
                    <article 
                      key={item.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <span>{item.date}</span>
                        </div>
                        <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                          {item.excerpt}
                        </p>
                      </div>
                      <button
                        onClick={() => setActivePage('aktuelt')}
                        className="text-xs font-bold text-[#1A382B] hover:underline inline-flex items-center gap-1 self-start cursor-pointer"
                      >
                        <span>Les hele saken</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE: GUDSTJENESTER (SERVICES & CALENDAR)
            ======================================================== */}
        {activePage === 'gudstjenester' && (
          <div className="py-12 bg-[#FAF7F2]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Kalender & Samlinger
                </span>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Gudstjenester og arrangementer
                </h1>
                <p className="text-sm text-slate-600 mt-2">
                  Her finner du datoer, klokkeslett og program for alle samlinger i Håp Kirke. Redigeres direkte i administrasjons-CMS-et.
                </p>
              </div>

              <div className="space-y-5">
                {data.services.map((srv, idx) => (
                  <div 
                    key={srv.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#1A382B] text-white flex flex-col items-center justify-center text-center shrink-0">
                          <span className="text-[10px] uppercase font-bold leading-none">Søn</span>
                          <span className="text-base font-extrabold leading-tight">{11 + idx * 3}</span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {srv.date} · kl. {srv.time}
                          </span>
                          <h3 className="text-xl font-bold text-slate-900 mt-1">
                            {srv.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {srv.kidsChurch && (
                          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                            <Smile className="w-3.5 h-3.5 text-emerald-700" />
                            Barnekirke
                          </span>
                        )}
                        {srv.fellowshipMeal && (
                          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                            <Coffee className="w-3.5 h-3.5 text-amber-700" />
                            Fellesskapsmåltid
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#FAF7F2] rounded-xl p-4 text-xs sm:text-sm text-slate-700 space-y-2 mb-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <span><strong>Tema:</strong> {srv.theme}</span>
                        <span>·</span>
                        <span><strong>Skriftlesning:</strong> {srv.scripture}</span>
                        <span>·</span>
                        <span><strong>Taler:</strong> {srv.speaker}</span>
                        <span>·</span>
                        <span><strong>Møteleder:</strong> {srv.leader}</span>
                      </div>
                      <p className="text-slate-600 text-xs">
                        {srv.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {srv.location}
                      </span>
                      <button
                        onClick={onOpenCms}
                        className="text-[#1A382B] font-semibold hover:underline cursor-pointer"
                      >
                        Rediger i CMS →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE: TALER (SERMONS)
            ======================================================== */}
        {activePage === 'taler' && (
          <div className="py-12 bg-[#FAF7F2]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Arkiv & Lydopptak
                </span>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Taler og undervisning
                </h1>
                <p className="text-sm text-slate-600 mt-2">
                  Lytt til søndagens preken eller fordyp deg i tidligere taleserier.
                </p>
              </div>

              <div className="space-y-4">
                {data.sermons.map((sermon) => (
                  <div 
                    key={sermon.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                          <span>{sermon.date}</span>
                          <span>·</span>
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            Serie: {sermon.series}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                          {sermon.title}
                        </h3>
                        <div className="text-xs text-slate-600 mb-3">
                          <span className="font-semibold text-slate-900">{sermon.speaker}</span>
                          {sermon.scripture && <span> · Bibeltekst: {sermon.scripture}</span>}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {sermon.summary}
                        </p>
                      </div>

                      <div className="sm:self-center shrink-0">
                        <button
                          onClick={() => setPlayingSermonId(playingSermonId === sermon.id ? null : sermon.id)}
                          className="px-4 py-2.5 rounded-xl bg-[#1A382B] hover:bg-[#234D3B] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{playingSermonId === sermon.id ? 'Paus' : `Spill av (${sermon.duration})`}</span>
                        </button>
                      </div>
                    </div>

                    {playingSermonId === sermon.id && (
                      <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-4 bg-emerald-50/60 p-3 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-[#1A382B] text-white flex items-center justify-center shrink-0">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="font-bold text-slate-900">Spiller av: {sermon.title}</div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                            <div className="bg-emerald-600 h-full w-1/3 animate-pulse"></div>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-slate-500">11:42 / {sermon.duration}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE: AKTUELT (NEWS)
            ======================================================== */}
        {activePage === 'aktuelt' && (
          <div className="py-12 bg-[#FAF7F2]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Artikler & Innsikt
                </span>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Aktuelt fra menighetslivet
                </h1>
              </div>

              <div className="space-y-6">
                {data.news.map((item) => (
                  <article 
                    key={item.id}
                    className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span>·</span>
                      <span>Publisert {item.date}</span>
                      <span>·</span>
                      <span>{item.readTime} lesetid</span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                      {item.title}
                    </h2>

                    <p className="text-sm font-medium text-slate-700 mb-4 leading-relaxed bg-[#FAF7F2] p-3.5 rounded-xl border-l-4 border-[#1A382B]">
                      {item.excerpt}
                    </p>

                    <div className="text-sm text-slate-600 leading-relaxed space-y-3">
                      <p>{item.body}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Redigert av Håp Kirke redaksjon</span>
                      <button onClick={onOpenCms} className="text-[#1A382B] font-semibold hover:underline cursor-pointer">
                        Rediger artikkel i CMS →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE: OM OSS (ABOUT)
            ======================================================== */}
        {activePage === 'om' && (
          <div className="py-12 bg-[#FAF7F2]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Om menigheten
                </span>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Velkommen til {data.churchName}
                </h1>
                <p className="text-base text-slate-600 mt-3 leading-relaxed">
                  {data.welcomeMessage}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-white border border-slate-200">
                  <h3 className="font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1A382B]" />
                    <span>Kontakt og lokasjon</span>
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <p><strong>Adresse:</strong> {data.address}</p>
                    <p><strong>Telefon:</strong> {data.phone}</p>
                    <p><strong>E-post:</strong> {data.email}</p>
                    <p><strong>Vipps for kollekt:</strong> {data.vipps}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200">
                  <h3 className="font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1A382B]" />
                    <span>Faste ukentlige tider</span>
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <p><strong>Søndag 11:00:</strong> Gudstjeneste & Barnekirke</p>
                    <p><strong>Onsdag 19:00:</strong> Bønn & Lovsang</p>
                    <p><strong>Fredag 19:30:</strong> Ungdomskveld (annenhver fredag)</p>
                    <p><strong>Tirsdager:</strong> Cellegrupper i hjemmene</p>
                  </div>
                </div>
              </div>

              {/* Pastors / Leaders */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="font-bold text-base text-slate-900 mb-4">Pastorer og nøkkelpersoner</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.people.slice(0, 4).map((person) => (
                    <div key={person.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-slate-200/60">
                      <div className="w-10 h-10 rounded-full bg-[#1A382B] text-white font-bold flex items-center justify-center shrink-0">
                        {person.initials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{person.name}</div>
                        <div className="text-xs text-slate-500">{person.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE: MIN SIDE (LEVEL 1 vs LEVEL 2 DEMO HEART)
            ======================================================== */}
        {activePage === 'minside' && (
          <div className="py-12 bg-[#FAF7F2]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              
              {/* Level Comparison Banner */}
              <div className={`p-5 rounded-2xl mb-8 border transition-all ${
                level === 1 
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950' 
                  : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      level === 1 ? 'bg-amber-200 text-amber-800' : 'bg-[#1A382B] text-emerald-300'
                    }`}>
                      {level === 1 ? <Lock className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {level === 1 ? 'Nivå 1 Aktiv: Enkel Min Side' : 'Nivå 2 Aktiv: Fullverdig Min Side for Frivillige'}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase bg-white/70">
                          {level === 1 ? '0 kr / Gratis' : '499 kr/mnd'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
                        {level === 1 
                          ? 'I gratisnivået har medlemmer en enkel profil for nyhetsbrev og kontakt. Med Menighetsplan (499 kr/mnd) låses personlig vaktplan, fraværsmelding, oppgavelister og tjenestebytte opp!'
                          : 'Her ser frivillige sine vakter, oppgaver før gudstjenesten og kan melde forfall med automatisk varsling til staben og reserve.'}
                      </p>
                    </div>
                  </div>

                  {level === 1 ? (
                    <button
                      onClick={() => onSelectLevel(2)}
                      className="px-4 py-2.5 rounded-xl bg-[#1A382B] text-white hover:bg-[#234D3B] text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Aktiver Nivå 2 (499,-)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectLevel(1)}
                      className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                    >
                      <span>Bytt tilbake til Nivå 1</span>
                    </button>
                  )}
                </div>
              </div>

              {/* LEVEL 1: ENKEL MIN SIDE */}
              {level === 1 && (
                <div className="space-y-6">
                  {/* Basic Profile Card */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-[#1A382B] text-white font-bold text-xl flex items-center justify-center">
                        HS
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">Henrik Sand</h2>
                        <span className="text-xs text-slate-500">Registrert menighetsmedlem / Besøkende</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-slate-200/60">
                        <span className="text-slate-400 block text-xs">E-post</span>
                        <span className="font-semibold text-slate-800">henrik.sand@stud.ntnu.no</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-slate-200/60">
                        <span className="text-slate-400 block text-xs">Telefon</span>
                        <span className="font-semibold text-slate-800">901 44 322</span>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter Settings */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                    <h3 className="font-bold text-base text-slate-900 mb-2">Mine nyhetsbrev & varsler</h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Velg hvilke oppdateringer du ønsker å motta på e-post fra {data.churchName}.
                    </p>

                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-slate-200/60 cursor-pointer">
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          Ukentlig menighetsbrev med søndagens program
                        </span>
                        <input
                          type="checkbox"
                          checked={newsletterSubscribed}
                          onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                          className="w-4 h-4 rounded text-[#1A382B] focus:ring-[#1A382B]"
                        />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-slate-200/60 cursor-pointer">
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          Månedlig bønnebrev og misjonsoppdatering
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          className="w-4 h-4 rounded text-[#1A382B] focus:ring-[#1A382B]"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Locked Volunteer Section Teaser */}
                  <div className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-300 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-base">
                      Vil du se personlig tjenesteplan og oppgaver?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Når menigheten har <strong>Menighetsplan (Nivå 2 – 499 kr/mnd)</strong>, får alle frivillige se sine vakter, motta SMS/e-post påminnelser, melde forfall og se kjøreplan direkte på Min Side.
                    </p>
                    <button
                      onClick={() => onSelectLevel(2)}
                      className="px-5 py-2.5 rounded-xl bg-[#1A382B] text-white hover:bg-[#234D3B] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Se hvordan det ser ut med Menighetsplan (499,-) →
                    </button>
                  </div>
                </div>
              )}

              {/* LEVEL 2: FULLVERDIG MIN SIDE */}
              {level === 2 && (
                <div className="space-y-6">
                  {/* Volunteer Profile Header */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#1A382B] text-emerald-300 font-bold text-xl flex items-center justify-center border-2 border-emerald-400">
                        {activeVolunteer.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold text-slate-900">{activeVolunteer.name}</h2>
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                            Frivillig medarbeider
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Tilhørighet: <strong className="text-slate-800">{activeVolunteer.groups.join(', ')}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Switcher to simulate other roles in the demo */}
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="text-xs text-slate-500">Logget inn som:</span>
                      <select
                        value={minSideVolunteerId}
                        onChange={(e) => setMinSideVolunteerId(e.target.value)}
                        className="text-xs font-semibold bg-[#FAF7F2] border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 cursor-pointer"
                      >
                        <option value="p-4">Henrik Sand (Lyd/Streaming)</option>
                        <option value="p-3">Jonas Berg (Lovsangsleder)</option>
                        <option value="p-7">Ole Moen (Vertskap/Kafé)</option>
                        <option value="p-5">Silje Hansen (Barnekirke)</option>
                      </select>
                    </div>
                  </div>

                  {/* Upcoming Volunteer Shifts (Mine Tjenester) */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#1A382B]" />
                        <h3 className="font-bold text-base text-slate-900">
                          Mine kommende tjenester og vakter
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">
                        {volunteerAssignments.length} planlagt tjeneste
                      </span>
                    </div>

                    <div className="space-y-3">
                      {volunteerAssignments.map((assignment) => (
                        <div 
                          key={assignment.id}
                          className="p-4 rounded-xl bg-[#FAF7F2] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{assignment.role}</span>
                              <span className="text-xs text-slate-500">({assignment.group})</span>
                              {assignment.status === 'bekreftet' && (
                                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Bekreftet
                                </span>
                              )}
                              {assignment.status === 'forfall' && (
                                <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                                  <AlertCircle className="w-3 h-3" /> Forfall meldt
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-600 mt-1 flex items-center gap-3">
                              <span><strong>Samling:</strong> Gudstjeneste kommende søndag kl. 11:00</span>
                              <span>·</span>
                              <span><strong>Oppmøtetid:</strong> {assignment.time}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            {assignment.status === 'bekreftet' ? (
                              <button
                                onClick={() => handleForfallClick(assignment.id)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                              >
                                Meld forfall / Be om reserve
                              </button>
                            ) : (
                              <button
                                onClick={() => handleResetForfall(assignment.id)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors cursor-pointer"
                              >
                                Angre forfall (Still likevel)
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      {volunteerAssignments.length === 0 && (
                        <p className="text-xs text-slate-500 py-3 text-center">
                          Ingen oppsatte vakter de neste 14 dagene.
                        </p>
                      )}
                    </div>

                    {simulatedForfallSent && (
                      <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-2">
                        <span>
                          <strong>Varsel sendt!</strong> Stabsleder er varslet om fraværet, og systemet foreslår nå en reserve fra samme team i administrasjonen.
                        </span>
                        <button
                          onClick={onOpenCms}
                          className="font-bold underline text-amber-950 hover:text-black cursor-pointer shrink-0"
                        >
                          Se forfall i administrasjonen →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Tasks List (Mine Oppgaver) */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <ListTodo className="w-5 h-5 text-[#1A382B]" />
                        <h3 className="font-bold text-base text-slate-900">
                          Mine tildelte oppgaver for søndagen
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500">
                        {volunteerTasks.filter(t => t.completed).length} av {volunteerTasks.length} fullført
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {volunteerTasks.map((t) => (
                        <div 
                          key={t.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-slate-200 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className={`w-4 h-4 ${t.completed ? 'text-emerald-700' : 'text-slate-300'}`} />
                            <span className={t.completed ? 'line-through text-slate-400 font-medium' : 'font-semibold text-slate-800'}>
                              {t.title}
                            </span>
                          </div>
                          <span className="font-mono text-slate-500">kl. {t.time}</span>
                        </div>
                      ))}

                      {volunteerTasks.length === 0 && (
                        <div className="text-xs text-slate-500 py-2">
                          Ingen spesifikke sjekkliste-oppgaver tildelt for denne rollen.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Team Run-sheet (Kjøreplan) */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                    <h3 className="font-bold text-base text-slate-900 mb-3">
                      Kjøreplan og teamoversikt for søndag 11. oktober
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Her ser du hvem du er på team med, slik at samarbeidet på søndag går som en lek:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {data.roster.slice(0, 6).map((r) => (
                        <div key={r.id} className="p-3 rounded-xl bg-[#FAF7F2] border border-slate-200/70 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900 block">{r.role}</span>
                            <span className="text-slate-600">{r.personName}</span>
                          </div>
                          <span className="text-slate-400 font-mono text-[11px]">{r.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Public Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 text-xs sm:text-sm text-slate-400">
            <div>
              <div className="font-bold text-white text-base mb-2">{data.churchName}</div>
              <p className="leading-relaxed">{data.tagline}</p>
              <p className="mt-3 text-slate-500">{data.address}</p>
            </div>
            <div>
              <div className="font-bold text-white text-sm mb-2">Samlinger</div>
              <ul className="space-y-1 text-slate-400">
                <li>Søndager kl. 11:00 – Gudstjeneste</li>
                <li>Onsdager kl. 19:00 – Bønn & Lovsang</li>
                <li>Barnekirke hver søndag for alle aldre</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-white text-sm mb-2">Kontakt & Gi</div>
              <p>Telefon: {data.phone}</p>
              <p>E-post: {data.email}</p>
              <p className="mt-2 text-emerald-400 font-semibold">Vipps: {data.vipps}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>© 2026 {data.churchName}. Drives med Menighetsplan.</div>
            <div className="flex items-center gap-4">
              <button onClick={onOpenCms} className="hover:text-white transition-colors cursor-pointer">
                Logg inn i administrasjonen
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
