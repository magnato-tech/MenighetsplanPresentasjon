import React, { useState } from 'react';
import { Sparkles, Calendar, Users, ArrowRight, Check } from 'lucide-react';
import { MOCK_CHURCHES, ChurchProfile } from '../data/mockData';

export const ChurchesShowcase: React.FC = () => {
  const [selectedChurchId, setSelectedChurchId] = useState<string>('sentrumskirken');

  const selectedChurch = MOCK_CHURCHES.find(c => c.id === selectedChurchId) || MOCK_CHURCHES[0];

  return (
    <section id="menigheter" className="py-20 lg:py-28 bg-white border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Fleksibilitet & Identitet
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Én plattform. Mange menigheter.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Menighetsplan tilpasses hver enkelt menighets særpreg, farger og logo uten at selve plattformen blir fragmentert. Én felles kodebase – full lokal frihet.
          </p>
        </div>

        {/* 3 Selectable Church Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MOCK_CHURCHES.map((church) => {
            const isSelected = church.id === selectedChurchId;
            return (
              <div
                key={church.id}
                onClick={() => setSelectedChurchId(church.id)}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 shadow-lg ring-2 ring-slate-900/10 bg-[#FAF7F2]'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Church logo mark with church specific accent */}
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base shadow-xs"
                      style={{ backgroundColor: church.accentColor }}
                    >
                      {church.name[0]}
                    </div>
                    
                    <span 
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: church.badgeBg, color: church.badgeText }}
                    >
                      {church.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{church.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 italic font-serif">
                    «{church.tagline}»
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{church.nextEvent}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{church.activeGroups} aktive grupper · {church.membersCount}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between text-xs font-semibold">
                  <span style={{ color: church.accentColor }}>
                    {isSelected ? 'Viser forhåndsvisning' : 'Klikk for å se'}
                  </span>
                  <span className="text-slate-400">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Preview Canvas reflecting the selected Church */}
        <div 
          className="rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-sm"
          style={{ backgroundColor: selectedChurch.primaryBg, borderColor: `${selectedChurch.accentColor}25` }}
        >
          <div className="max-w-4xl mx-auto">
            
            {/* Top Preview Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-md"
                  style={{ backgroundColor: selectedChurch.accentColor }}
                >
                  {selectedChurch.name[0]}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{selectedChurch.name}</h4>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{selectedChurch.location}</span>
                    <span>·</span>
                    <span>Eget domene & branding</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span 
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: selectedChurch.badgeBg, color: selectedChurch.badgeText }}
                >
                  Egen profil · Samme stabile kjerne
                </span>
              </div>
            </div>

            {/* Inner Church Site Snippet */}
            <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Menighetens digitale ansikt utad
                  </span>
                  <h5 className="text-2xl font-bold text-slate-900 mt-1">
                    {selectedChurch.tagline}
                  </h5>
                  <p className="text-sm text-slate-600 mt-2 max-w-xl">
                    Nettsiden reflekterer menighetens identitet med skreddersydde fargetoner og fonter, mens ansatte og frivillige logger inn i det samme trygge Menighetsplan-grensesnittet.
                  </p>
                </div>

                <div 
                  className="p-4 rounded-xl text-white text-xs font-semibold shrink-0 text-center sm:text-right"
                  style={{ backgroundColor: selectedChurch.accentColor }}
                >
                  <div className="opacity-80">Neste samling</div>
                  <div className="text-sm font-bold mt-0.5">{selectedChurch.nextEvent}</div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Eget fargetema og typografi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Eget domenenavn (.no)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Isolerte menighetsdata</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
