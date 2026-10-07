import React, { useState } from 'react';
import { 
  Globe, 
  Layout, 
  Calendar, 
  Users, 
  UserCheck, 
  Newspaper, 
  Headphones, 
  Mail, 
  BarChart3, 
  ShieldCheck, 
  Check, 
  Plus, 
  Sparkles,
  Cloud,
  Lock,
  Layers
} from 'lucide-react';
import { PLATFORM_MODULES } from '../data/mockData';

export const PlatformPrinciples: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('nettside');

  const startModules = PLATFORM_MODULES.filter(m => m.category === 'start');
  const videreModules = PLATFORM_MODULES.filter(m => m.category === 'videre');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Calendar': return <Calendar className="w-5 h-5" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Newspaper': return <Newspaper className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'Mail': return <Mail className="w-5 h-5" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const currentModuleDetails = PLATFORM_MODULES.find(m => m.id === selectedModule) || PLATFORM_MODULES[0];

  return (
    <section id="plattform" className="py-20 lg:py-28 bg-white border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 5: Alt samlet på ett sted */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Plattformen
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Alt samlet på ett sted
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Én plattform – funksjoner etter behov. Alle menigheter får samme solide grunnmur, og slår på de modulene dere trenger i deres hverdag.
          </p>
        </div>

        {/* Visual Module Dashboard Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-16">
          {PLATFORM_MODULES.map((mod) => {
            const isSelected = selectedModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModule(mod.id)}
                className={`p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'bg-[#1A382B] text-white border-[#1A382B] shadow-md scale-[1.02]'
                    : 'bg-[#FAF7F2] text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-[#F5EFE4]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`${isSelected ? 'text-emerald-300' : 'text-[#1A382B]'}`}>
                    {getIcon(mod.icon)}
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-600'
                  }`}>
                    {mod.category === 'start' ? 'Kjerne' : 'Modul'}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="font-bold text-sm tracking-tight">{mod.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive detail card for the clicked module */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF7F2] border border-[#1A382B]/15 mb-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1A382B] text-emerald-300 flex items-center justify-center shrink-0">
              {getIcon(currentModuleDetails.icon)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-slate-900">{currentModuleDetails.title}</h4>
                <span className="text-xs px-2 py-0.5 rounded bg-[#1A382B]/10 text-[#1A382B] font-semibold">
                  {currentModuleDetails.category === 'start' ? 'Inkludert i startpakken' : 'Aktiviseres med ett klikk'}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {currentModuleDetails.description}
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium sm:text-right shrink-0">
            Klikk på en annen modul ovenfor for å utforske ↑
          </div>
        </div>

        {/* Section 6: Modulær oppbygging + Produktprinsippet */}
        <div className="border-t border-slate-200/80 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Story & Philosophy */}
            <div className="lg:col-span-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-2">
                Modulær oppbygging
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Start enkelt. Bygg videre når dere trenger det.
              </h3>
              
              <p className="mt-4 text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                «Menigheten får én samlet Menighetsplan-plattform. Funksjonene aktiveres etter behov.»
              </p>
              
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Dere trenger aldri å laste ned eller installere programmer på lokale maskiner. Plattformen leveres som en moderne nettskytjeneste der menigheten selv velger hvilke moduler som skal være aktive i menyen.
              </p>

              {/* Fundamental SaaS Architecture Box */}
              <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Cloud className="w-4 h-4 text-[#1A382B]" />
                  <span>Kjernearkitektur for Menighetsplan</span>
                </div>
                
                <div className="text-sm font-semibold text-slate-900">
                  Én kodebase – mange menigheter – egne data og egen konfigurasjon.
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  Oppdateringer av plattformen utvikles sentralt og rulles ut til alle menigheter, mens hver menighet beholder egne data, innstillinger og aktive moduler.
                </p>
              </div>

            </div>

            {/* Right Column: Visual Stage progression (START -> VIDERE) */}
            <div className="lg:col-span-6">
              <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
                  Trinnvis implementering uten stress
                </div>

                {/* Stage 1: START */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A382B] bg-[#E5EFE9] px-2.5 py-1 rounded">
                      Steg 1: START
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Kjernefundament</span>
                  </div>
                  
                  <div className="space-y-2">
                    {startModules.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{item.title}</span>
                        <span className="text-xs text-slate-400 font-normal ml-auto">
                          {item.id === 'nettside' ? 'Offisiell profil' : item.id === 'cms' ? 'Enkel tekst & bilder' : 'Felles ukeoversikt'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transition Indicator */}
                <div className="py-2 text-center text-xs font-semibold text-slate-400">
                  ↓ Utvid når lederteamet og frivillige er klare
                </div>

                {/* Stage 2: VIDERE */}
                <div className="bg-white/80 rounded-xl p-5 border border-dashed border-slate-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                      Steg 2: VIDERE
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Slås på etter behov</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-100 font-medium">
                      <Plus className="w-3.5 h-3.5 text-[#1A382B]" />
                      <span>Grupper & husfellesskap</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-100 font-medium">
                      <Plus className="w-3.5 h-3.5 text-[#1A382B]" />
                      <span>Min side for medlemmer</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-100 font-medium">
                      <Plus className="w-3.5 h-3.5 text-[#1A382B]" />
                      <span>Kommunikasjon & e-post</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-100 font-medium">
                      <Plus className="w-3.5 h-3.5 text-[#1A382B]" />
                      <span>Analyse & statistikk</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-xs text-slate-500 text-center">
                  Ingen binding til å bruke alt fra dag én. Plattformen vokser i menighetens tempo.
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
