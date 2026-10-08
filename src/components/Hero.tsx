import React, { useState } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Globe, 
  Users, 
  BarChart2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Radio, 
  Eye, 
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';
import { MOCK_CALENDAR_EVENTS, ANALYTICS_DATA } from '../data/mockData';

interface HeroProps {
  onOpenContact: (topic?: string) => void;
  onExploreFeatures: () => void;
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreFeatures, onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'oversikt' | 'kalender' | 'nettside' | 'grupper'>('oversikt');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1A382B]/10">
      {/* Subtle organic background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#F3EDE2]/40 pointer-events-none" />
      
      {/* Decorative subtle ambient circle */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#1A382B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#2D5D49]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            
            {/* Trust pill without AI clichés: Clean text indicator */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-[#1A382B]">
              <span className="w-2 h-2 rounded-full bg-[#1A382B]"></span>
              <span>Skybasert plattform for norske menigheter</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08] text-balance">
              Én plattform for hele menigheten
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
              Nettside, CMS, kalender og digitale menighetsverktøy – samlet på ett sted.
            </p>

            <div className="mt-4 text-sm text-slate-500 font-medium">
              Menigheten får én samlet Menighetsplan-plattform. Funksjonene aktiveres etter behov.
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenContact('hero-trial')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] shadow-sm transition-all duration-200 active:scale-98 cursor-pointer group"
              >
                <span>Prøv Menighetsplan gratis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all duration-200 cursor-pointer"
              >
                <span>Se demo</span>
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>30 dagers prøveperiode • Ingen kredittkort • 0,- i oppstart</span>
            </div>

            {/* Minimal trust proof badges */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <span className="block font-bold text-slate-900 text-sm">100% Norsk</span>
                <span>Data og drift tilpasset norske forhold</span>
              </div>
              <div>
                <span className="block font-bold text-slate-900 text-sm">Én innlogging</span>
                <span>For ansatte, redaktører og frivillige</span>
              </div>
              <div>
                <span className="block font-bold text-slate-900 text-sm">Modulært</span>
                <span>Aktiver funksjonene dere trenger</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-fidelity SaaS Dashboard Mockup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden transition-all duration-300">
              
              {/* Browser / Application Top Bar */}
              <div className="bg-[#1A382B] text-white px-4 py-3 flex items-center justify-between border-b border-[#244C3B]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-xs font-medium text-slate-200 ml-2">app.menighetsplan.no/sentrumskirken</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 text-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Nettside aktiv
                  </span>
                  <span className="text-slate-300 font-medium hidden sm:inline">Sentrumskirken Oslo</span>
                </div>
              </div>

              {/* Subheader Navigation Tabs (Interactive Tab Control) */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between overflow-x-auto">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('oversikt')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'oversikt' 
                        ? 'bg-white text-[#1A382B] shadow-xs font-semibold' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Oversikt
                  </button>
                  <button
                    onClick={() => setActiveTab('kalender')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'kalender' 
                        ? 'bg-white text-[#1A382B] shadow-xs font-semibold' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Kalender (4 nye)
                  </button>
                  <button
                    onClick={() => setActiveTab('nettside')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'nettside' 
                        ? 'bg-white text-[#1A382B] shadow-xs font-semibold' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Nettside & CMS
                  </button>
                  <button
                    onClick={() => setActiveTab('grupper')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'grupper' 
                        ? 'bg-white text-[#1A382B] shadow-xs font-semibold' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Grupper (14)
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-slate-400">Rolle:</span>
                  <span className="font-semibold text-slate-700">Administrator</span>
                </div>
              </div>

              {/* Main Dashboard Canvas */}
              <div className="p-4 sm:p-6 bg-white min-h-[380px]">
                
                {activeTab === 'oversikt' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    
                    {/* Top Row: Welcome & Next Church Service Highlight */}
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#1A382B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1A382B] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Calendar className="w-5 h-5 text-emerald-300" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-[#1A382B]">
                            Neste gudstjeneste
                          </div>
                          <div className="text-base sm:text-lg font-bold text-slate-900">
                            Søndag 11. oktober kl. 11:00
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            Taler: Thomas Berg · Lovsang: Team B · Hovedsalen
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0">
                        <span className="text-xs font-medium text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                          Publisert på nett
                        </span>
                        <span className="text-xs text-slate-500">6 frivillige bekreftet</span>
                      </div>
                    </div>

                    {/* Middle Grid: Quick Metrics & Status */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div className="text-xs text-slate-500 font-medium">Besøk på nettsiden</div>
                        <div className="text-xl font-bold text-slate-900 tabular-nums mt-1">2 438</div>
                        <div className="text-[11px] text-emerald-700 mt-0.5">+18% denne mnd</div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div className="text-xs text-slate-500 font-medium">Husgrupper</div>
                        <div className="text-xl font-bold text-slate-900 tabular-nums mt-1">14</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">118 deltakere</div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div className="text-xs text-slate-500 font-medium">Ukehendelser</div>
                        <div className="text-xl font-bold text-slate-900 tabular-nums mt-1">4</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">I menighetskalender</div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div className="text-xs text-slate-500 font-medium">CMS-status</div>
                        <div className="text-xl font-bold text-[#1A382B] mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Oppdatert</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">Sist endret for 2t siden</div>
                      </div>
                    </div>

                    {/* Bottom Split: Recent Calendar Items & News Editor Snippet */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Upcoming Events Box */}
                      <div className="p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            Kommende samlinger
                          </h4>
                          <span className="text-xs text-[#1A382B] font-medium cursor-pointer hover:underline" onClick={() => setActiveTab('kalender')}>
                            Se alle
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          {MOCK_CALENDAR_EVENTS.slice(0, 3).map((event) => (
                            <div key={event.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                              <div>
                                <span className="font-semibold text-slate-800">{event.title}</span>
                                <span className="text-slate-400 ml-1.5">· {event.day} {event.time}</span>
                              </div>
                              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                                {event.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content Management Snippet */}
                      <div className="p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-slate-400" />
                            Nettside: sentrumskirken.no
                          </h4>
                          <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Live
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                          <div className="font-medium text-slate-800">Forsidebanner: Høstoppstart 2026</div>
                          <div className="text-[11px] text-slate-500">
                            Synkronisert med kalender · 1 aktiv påmelding
                          </div>
                          <div className="pt-1 flex items-center gap-2">
                            <button 
                              onClick={() => setActiveTab('nettside')} 
                              className="text-[11px] font-semibold text-[#1A382B] hover:underline"
                            >
                              Åpne sidebygger →
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {activeTab === 'kalender' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Ukesoversikt – Menighetskalender</h4>
                        <p className="text-xs text-slate-500">Oppdateres ett sted og vises direkte på nettsiden.</p>
                      </div>
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                        Synkronisert
                      </span>
                    </div>

                    <div className="space-y-2">
                      {MOCK_CALENDAR_EVENTS.map((event) => (
                        <div key={event.id} className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between">
                          <div className="flex items-start gap-3">
                            <div className="text-center w-12 py-1 px-1.5 bg-[#FAF7F2] rounded border border-slate-200">
                              <span className="block text-[10px] font-bold uppercase text-slate-600">{event.day.slice(0, 3)}</span>
                              <span className="block text-xs font-extrabold text-[#1A382B]">{event.date.split('.')[0]}</span>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                <span>{event.title}</span>
                                <span className="text-[11px] text-slate-500 font-normal">kl. {event.time}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{event.location}</div>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-slate-600 px-2 py-0.5 rounded bg-slate-100">
                            {event.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'nettside' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">CMS – Innholdsbygger</h4>
                        <p className="text-xs text-slate-500">Bygg og rediger menighetens sider uten utvikler.</p>
                      </div>
                      <span className="text-xs bg-[#1A382B] text-white px-2.5 py-1 rounded font-medium">
                        Publiser endringer
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Aktiv side</span>
                        <div className="font-bold text-slate-800 mt-1">Forside (Hjem)</div>
                        <div className="text-[11px] text-slate-500 mt-1">4 innholdsblokker</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Siste tale</span>
                        <div className="font-bold text-slate-800 mt-1">«Håp for byen»</div>
                        <div className="text-[11px] text-slate-500 mt-1">Lydfil og notater aktiv</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">SEO & Deling</span>
                        <div className="font-bold text-slate-800 mt-1">Optimalisert</div>
                        <div className="text-[11px] text-emerald-700 mt-1">Søkemotorer indeksert</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-dashed border-slate-300 bg-[#FAF7F2]/50 text-xs text-slate-600 flex items-center justify-between">
                      <span>Live forhåndsvisning: Sidestrukturen er fullt tilpasset mobil, nettbrett og storskjerm.</span>
                      <span className="font-bold text-[#1A382B] shrink-0">100% responsiv</span>
                    </div>
                  </div>
                )}

                {activeTab === 'grupper' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Husgrupper og Tjenesteteam</h4>
                        <p className="text-xs text-slate-500">Gi gruppeledere enkel oversikt over deltakere og samlinger.</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                        14 aktive grupper
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-900">Husgruppe Grünerløkka</div>
                        <div className="text-slate-500 mt-0.5">Leder: Marie & Jonas · 10 deltakere</div>
                        <div className="text-[11px] text-emerald-700 mt-1">Neste samling: Tirsdag 19:00</div>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-900">Ung Voksen – Majorstuen</div>
                        <div className="text-slate-500 mt-0.5">Leder: Henrik S. · 12 deltakere</div>
                        <div className="text-[11px] text-emerald-700 mt-1">Neste samling: Torsdag 19:30</div>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-900">Lovsangsteam A</div>
                        <div className="text-slate-500 mt-0.5">Leder: Camilla T. · 7 musikere</div>
                        <div className="text-[11px] text-slate-500 mt-1">Øving: Torsdager 18:00</div>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-900">Søndagsskole / Barnekirke</div>
                        <div className="text-slate-500 mt-0.5">Leder: Ingrid F. · 14 frivillige</div>
                        <div className="text-[11px] text-slate-500 mt-1">Rullerende turnus</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Tray: Reassuring Product Indicator */}
              <div className="bg-[#FAF7F2] border-t border-slate-200/90 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Én samlet skyløsning · Ingen installasjon</span>
                </div>
                <div className="text-slate-500">
                  Prøv klikkbare faner over ↑
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
