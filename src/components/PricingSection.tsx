import React from 'react';
import { Check, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

interface PricingSectionProps {
  onOpenContact: (plan?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="priser" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Prismodell
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Enkle og forutsigbare rammer
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Ingen skjulte kostnader eller uforståelige lisenser. Start med det dere trenger i dag, og utvid i takt med menighetens behov.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: NETTSIDE */}
          <div className="bg-white rounded-2xl p-7 lg:p-8 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                Grunnpakke
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Nettside
              </h3>
              <p className="text-xs text-slate-500 mt-2 min-h-[36px]">
                For menigheter som trenger en moderne, profesjonell og driftssikker nettside.
              </p>

              <div className="my-6 py-4 border-y border-slate-100">
                <span className="text-sm font-semibold text-slate-700">Inkluderer kjernefunksjoner:</span>
                <ul className="mt-4 space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Moderne, responsiv menighetsnettside</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Enkelt CMS for tekst, bilder og nyheter</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Innebygd arrangementskalender</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Norsk hosting og SSL-sertifikat</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => onOpenContact('nettside')}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Snakk med oss</span>
            </button>
          </div>

          {/* Card 2: MENIGHETSPLATTFORM (Fremhevet) */}
          <div className="bg-[#1A382B] text-white rounded-2xl p-7 lg:p-8 border border-[#1A382B] shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
              Mest populær
            </div>

            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-300 mb-2">
                Komplett løsning
              </div>
              <h3 className="text-2xl font-bold text-white">
                Menighetsplattform
              </h3>
              <p className="text-xs text-slate-200 mt-2 min-h-[36px]">
                For menigheter som ønsker flere digitale funksjoner samlet i én helhetlig hverdag.
              </p>

              <div className="my-6 py-4 border-y border-white/10">
                <span className="text-sm font-semibold text-emerald-200">Alt i Nettside, pluss:</span>
                <ul className="mt-4 space-y-3 text-xs text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Grupper & husfellesskap med lederflate</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Min side for medlemmer og frivillige</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Rollebasert tilgangskontroll (Admin/Redaktør)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Kommunikasjon og varsler</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>GDPR-sikker norsk lagring</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => onOpenContact('menighetsplattform')}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-[#1A382B] bg-[#FAF7F2] hover:bg-white shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Snakk med oss</span>
            </button>
          </div>

          {/* Card 3: EKSTRA MODULER */}
          <div className="bg-white rounded-2xl p-7 lg:p-8 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                Skaler etter behov
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Ekstra moduler
              </h3>
              <p className="text-xs text-slate-500 mt-2 min-h-[36px]">
                Aktiver spesialiserte funksjoner etter hvert som menigheten vokser.
              </p>

              <div className="my-6 py-4 border-y border-slate-100">
                <span className="text-sm font-semibold text-slate-700">Valgfrie utvidelser:</span>
                <ul className="mt-4 space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Lydarkiv og podkast for taler</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Avansert analyse og besøksmønstre</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Masseutsendelse på e-post og SMS</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Spesialtilpasset rådgivning og oppstart</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => onOpenContact('moduler')}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Snakk med oss</span>
            </button>
          </div>

        </div>

        {/* Reassurance note */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto">
          Vi skreddersyr oppsettet i samråd med menighetens styre og stab. Ta kontakt for en hyggelig og uforpliktende prat.
        </div>

      </div>
    </section>
  );
};
