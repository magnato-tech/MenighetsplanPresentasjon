import React, { useState } from 'react';
import { 
  Globe, 
  Layers, 
  Newspaper, 
  Calendar, 
  Image as ImageIcon, 
  Search, 
  Send, 
  Check, 
  Edit3, 
  Eye, 
  Sliders, 
  PlusCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const CmsShowcase: React.FC = () => {
  const [activeCmsTool, setActiveCmsTool] = useState<'sidebygger' | 'blokker' | 'nyheter' | 'bilder' | 'seo' | 'publisering'>('sidebygger');
  const [headlineText, setHeadlineText] = useState('Et åpent fellesskap midt i byen');
  const [publishedStatus, setPublishedStatus] = useState<'published' | 'draft' | 'saving'>('published');
  const [showNotification, setShowNotification] = useState(false);

  const handlePublish = () => {
    setPublishedStatus('saving');
    setTimeout(() => {
      setPublishedStatus('published');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 600);
  };

  const cmsNav = [
    { id: 'sidebygger', label: 'Sidebygger', icon: <Layers className="w-4 h-4" /> },
    { id: 'blokker', label: 'Innholdsblokker', icon: <Sliders className="w-4 h-4" /> },
    { id: 'nyheter', label: 'Nyheter', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'bilder', label: 'Bilder', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO', icon: <Search className="w-4 h-4" /> },
    { id: 'publisering', label: 'Publisering', icon: <Send className="w-4 h-4" /> }
  ];

  return (
    <section id="funksjoner" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Nettside + CMS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            En nettside dere faktisk kan styre selv
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Rediger innhold, bygg sider og publiser uten å være avhengig av en utvikler. Alt henger sømløst sammen med kalender og menighetens aktiviteter.
          </p>
        </div>

        {/* Big Split Showcase: Church Website Preview + CMS Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: The Public Facing Church Website Mockup (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden flex flex-col">
            
            {/* Top Browser Bar */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                </div>
                <span className="font-mono text-slate-500 bg-white px-3 py-1 rounded border border-slate-200 text-[11px] ml-2">
                  https://sentrumskirken.no
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                Live forhåndsvisning
              </span>
            </div>

            {/* Rendered Church Web Page */}
            <div className="flex-1 p-6 sm:p-8 bg-[#FAF7F2]/50 flex flex-col justify-between">
              
              {/* Church Navigation */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="font-extrabold text-lg tracking-tight text-[#1A382B]">
                  SENTRUMSKIRKEN
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                  <span className="text-[#1A382B] font-bold">Hjem</span>
                  <span>Gudstjenester</span>
                  <span>Husgrupper</span>
                  <span>Om oss</span>
                </div>
              </div>

              {/* Church Hero Banner */}
              <div className="my-8 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#1A382B] to-[#244C3B] text-white shadow-md relative overflow-hidden">
                <div className="relative z-10 max-w-md">
                  <span className="text-xs uppercase font-semibold text-emerald-300 tracking-wider">
                    Velkommen til fellesskapet
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2 leading-snug">
                    {headlineText}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                    Vi samles hver søndag kl. 11:00 i sentrum. Alle er hjertelig velkommen, akkurat slik du er.
                  </p>
                  <div className="mt-5 flex gap-2.5">
                    <span className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#FAF7F2] text-[#1A382B]">
                      Søndag 11:00
                    </span>
                    <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-white/20 text-white">
                      Finn en husgruppe
                    </span>
                  </div>
                </div>
              </div>

              {/* Church Calendar Feed Block embedded automatically on website */}
              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Kommende i uken (automatisk fra kalender)
                  </h4>
                  <span className="text-[11px] text-[#1A382B] font-semibold">Se full kalender →</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="font-bold text-slate-800">Søndag 11. okt · 11:00</div>
                    <div className="text-slate-600">Gudstjeneste & barnekirke</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="font-bold text-slate-800">Tirsdag 13. okt · 19:00</div>
                    <div className="text-slate-600">Husgrupper rundt om i byen</div>
                  </div>
                </div>
              </div>

              {/* Web Page Footer */}
              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                <span>© 2026 Sentrumskirken Oslo</span>
                <span>Drevet av Menighetsplan.no</span>
              </div>

            </div>
          </div>

          {/* Right: The Modern CMS Editor Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-md p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* CMS Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#1A382B] text-white flex items-center justify-center font-bold text-xs">
                    CMS
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Menighetsplan CMS</h3>
                    <span className="text-[11px] text-slate-500">Redigeringspanel</span>
                  </div>
                </div>

                <button
                  onClick={handlePublish}
                  disabled={publishedStatus === 'saving'}
                  className="px-3 py-1.5 rounded-lg bg-[#1A382B] hover:bg-[#234D3B] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {publishedStatus === 'saving' ? (
                    <span>Lagrer...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Publiser</span>
                    </>
                  )}
                </button>
              </div>

              {/* Toast for simulated save */}
              {showNotification && (
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Endringene ble publisert direkte til sentrumskirken.no!</span>
                </div>
              )}

              {/* CMS Navigation Tabs */}
              <div className="mt-4 grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg">
                {cmsNav.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveCmsTool(tool.id as any)}
                    className={`px-2 py-1.5 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                      activeCmsTool === tool.id
                        ? 'bg-white text-[#1A382B] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tool.icon}
                    <span>{tool.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic CMS Tool Area */}
              <div className="mt-5 space-y-4">
                
                {activeCmsTool === 'sidebygger' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Sider i menyen
                    </div>
                    
                    <div className="space-y-1.5">
                      {['Forside (Hjem)', 'Gudstjenester', 'Husgrupper', 'Om oss', 'Kontakt'].map((page, i) => (
                        <div key={page} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 text-xs font-medium text-slate-800">
                          <span className="flex items-center gap-2">
                            <span className="text-slate-400">☰</span>
                            <span>{page}</span>
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            {i === 0 ? 'Aktiv side' : 'Synlig'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => alert('Ny side opprettes med standard mal.')}
                      className="w-full py-2 text-center text-xs font-semibold text-[#1A382B] border border-dashed border-[#1A382B]/30 rounded-lg hover:bg-[#1A382B]/5 transition-colors cursor-pointer"
                    >
                      + Opprett ny side
                    </button>
                  </div>
                )}

                {activeCmsTool === 'blokker' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Rediger Hero-tittel (se endring live til venstre)
                    </div>
                    
                    <input
                      type="text"
                      value={headlineText}
                      onChange={(e) => setHeadlineText(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A382B] font-medium"
                      placeholder="Skriv inn overskrift..."
                    />

                    <div className="text-[11px] text-slate-500">
                      Prøv å skrive her – overskriften i mockupen oppdateres umiddelbart.
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="text-xs font-bold text-slate-700">Aktive innholdsblokker:</div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 text-xs flex justify-between">
                        <span>1. Hero Banner</span>
                        <span className="text-emerald-700 font-medium">Aktiv</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 text-xs flex justify-between">
                        <span>2. Kalenderutdrag</span>
                        <span className="text-emerald-700 font-medium">Automatisk</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeCmsTool === 'nyheter' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Siste nyhetsartikler
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                      <div className="font-bold text-slate-900">Påmelding til høstens menighetsleir</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Publisert for 3 dager siden · 84 visninger</div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                      <div className="font-bold text-slate-900">Bli med som frivillig i kaféen</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Publisert for 1 uke siden · 112 visninger</div>
                    </div>
                  </div>
                )}

                {activeCmsTool === 'bilder' && (
                  <div className="space-y-2 text-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Mediearkiv for menigheten
                    </div>
                    <div className="p-4 rounded-lg border border-dashed border-slate-300 text-center text-slate-500">
                      Dra og slipp bilder her for automatisk optimalisering og komprimering.
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Bilder skaleres automatisk til mobil og desktop.
                    </div>
                  </div>
                )}

                {activeCmsTool === 'seo' && (
                  <div className="space-y-2.5 text-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      SEO & Deling i sosiale medier
                    </div>
                    <div>
                      <span className="block font-medium text-slate-700 mb-1">Sidetittel (Google):</span>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700">
                        Sentrumskirken Oslo – Et åpent fellesskap
                      </div>
                    </div>
                    <div>
                      <span className="block font-medium text-slate-700 mb-1">Metabeskrivelse:</span>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-600 text-[11px]">
                        Velkommen til gudstjeneste søndager kl. 11. Fellesskap, husgrupper og aktiviteter for alle aldre.
                      </div>
                    </div>
                  </div>
                )}

                {activeCmsTool === 'publisering' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Versjonskontroll og publisering
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                      <div className="font-bold">Nettsiden er live</div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">SSL-sertifikat aktiv · Lynrask norsk sky-levering</div>
                    </div>
                    <div className="text-slate-600">
                      Alle endringer lagres som kladder til du trykker «Publiser». Ingen fare for å ødelegge noe ved et uhell.
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* CMS Bottom Note */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700">Rollebasert tilgang:</span>
              <span>Kun godkjente redaktører</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
