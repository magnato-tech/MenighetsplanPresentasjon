import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Check, 
  X, 
  FileText, 
  Calendar, 
  Settings, 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  ArrowUpRight 
} from 'lucide-react';
import { ADMIN_ROLES, ANALYTICS_DATA } from '../data/mockData';

export const ExtensionsShowcase: React.FC = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);
  const currentRole = ADMIN_ROLES[selectedRoleIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Administrasjon & Innsikt
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Trygg styring og enkel innsikt
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Én felles administrasjon med rollebasert tilgang for frivillige og ansatte, kombinert med enkle trafikktall som viser hva menigheten engasjerer seg i.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (6 cols): Section 9 - Administrasjon & Rollebasert tilgang */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B]">
                    Administrasjon
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    Én administrasjon for hele plattformen
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#E5EFE9] text-[#1A382B] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Styr innhold, kalender, grupper, brukere, statistikk og innstillinger fra ett kontrollpanel. Gi frivillige nøyaktig de tilgangene de trenger – verken mer eller mindre.
              </p>

              {/* Role selector tabs */}
              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Velg en rolle for å se tilganger:
                </div>

                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
                  {ADMIN_ROLES.map((r, i) => (
                    <button
                      key={r.role}
                      onClick={() => setSelectedRoleIndex(i)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer truncate ${
                        selectedRoleIndex === i
                          ? 'bg-[#1A382B] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {r.role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role description card */}
              <div className="mt-4 p-4 rounded-xl bg-[#FAF7F2] border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{currentRole.role}</span>
                  <span className="text-[11px] font-semibold text-[#1A382B]">Aktiv rolle</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {currentRole.description}
                </p>
              </div>

              {/* Permission Matrix */}
              <div className="mt-5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Tilgangsnivå i plattformen:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { key: 'innhold', label: 'Innhold & Sider' },
                    { key: 'kalender', label: 'Kalender & Samlinger' },
                    { key: 'grupper', label: 'Grupper & Team' },
                    { key: 'brukere', label: 'Brukere & Roller' },
                    { key: 'statistikk', label: 'Statistikk & Analyse' },
                    { key: 'innstillinger', label: 'Systeminnstillinger' }
                  ].map((perm) => {
                    const hasAccess = currentRole.permissions[perm.key as keyof typeof currentRole.permissions];
                    return (
                      <div
                        key={perm.key}
                        className={`p-2.5 rounded-lg border flex items-center justify-between ${
                          hasAccess
                            ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <span className="truncate pr-1">{perm.label}</span>
                        {hasAccess ? (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] text-slate-400">
              Rollebasert tilgang beskytter menighetens data og gjør frivilligheten trygg.
            </div>
          </div>

          {/* Right Column (6 cols): Section 10 - Analyse */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B]">
                    Analyse
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    Se hva som faktisk fungerer
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#E5EFE9] text-[#1A382B] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Menigheten trenger ikke tunge, kompliserte analyseverktøy. Menighetsplan gir enkel, personvernvennlig oversikt over hvilke sider og aktiviteter som engasjerer.
              </p>

              {/* Big Stat Box */}
              <div className="mt-6 p-5 rounded-2xl bg-[#FAF7F2] border border-[#1A382B]/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Besøk på nettsiden siste måned
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums mt-1">
                    {ANALYTICS_DATA.totalVisits}
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{ANALYTICS_DATA.trend}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Stabilt høyt engasjement</div>
                </div>
              </div>

              {/* Most Visited Pages List */}
              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                  <span>Mest besøkte sider</span>
                  <span>Andel trafikk</span>
                </div>

                <div className="space-y-2">
                  {ANALYTICS_DATA.topPages.slice(0, 4).map((p) => (
                    <div
                      key={p.rank}
                      className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 font-semibold text-slate-800">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                          {p.rank}
                        </span>
                        <span>{p.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 tabular-nums">{p.visits}</span>
                        <span className="text-[11px] text-slate-400 font-mono w-12 text-right">{p.percent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device share */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Enhetsfordeling:</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-slate-400" /> Mobil: {ANALYTICS_DATA.devices.mobile}
                  </span>
                  <span className="flex items-center gap-1">
                    <Monitor className="w-3.5 h-3.5 text-slate-400" /> Desktop: {ANALYTICS_DATA.devices.desktop}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] text-slate-400">
              Innebygd GDPR-kompatibel måling uten informasjonskapsler (cookies) fra tredjeparter.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
