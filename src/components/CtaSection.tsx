import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

interface CtaSectionProps {
  onOpenContact: (topic?: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Nordic forest green background */}
        <div className="rounded-3xl bg-[#1A382B] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          
          {/* Subtle atmospheric glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-700/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>menighetsplan.no</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance">
              Klar for en enklere digital menighet?
            </h2>

            <p className="mt-6 text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Se hvordan Menighetsplan kan samle menighetens digitale løsninger på ett sted.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenContact('avsluttende-cta')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-[#1A382B] bg-[#FAF7F2] hover:bg-white shadow-lg transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <span>Kom i gang</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="mailto:hei@menighetsplan.no"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>hei@menighetsplan.no</span>
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Uforpliktende introduksjon</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prøv gratis i én måned</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Norsk support og rådgivning</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
