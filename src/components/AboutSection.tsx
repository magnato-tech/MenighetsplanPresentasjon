import React from 'react';
import { Shield, Sparkles, RefreshCw, HeartHandshake, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="om" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Om Menighetsplan
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Bygget med respekt for menighetens hverdag
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Menighetsplan oppstod ut fra et enkelt behov: Norske menigheter fortjener verktøy som er like moderne og enkle som det beste i næringslivet, men bygget for frivillighet, fellesskap og trygghet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E5EFE9] text-[#1A382B] flex items-center justify-center font-bold mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              For frivillige og ansatte
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Verktøyet må være så enkelt at en frivillig kan oppdatere en side eller legge inn en husgruppe på to minutter uten opplæring eller tekniske forkunnskaper.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E5EFE9] text-[#1A382B] flex items-center justify-center font-bold mb-4">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Sentrale skyoppdateringer
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Én kodebase betyr at menigheten aldri trenger å bekymre seg for utdaterte plugins, serverkrasj eller dyre konsulenttimer. Plattformen oppdateres kontinuerlig for alle.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E5EFE9] text-[#1A382B] flex items-center justify-center font-bold mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Trygt, norsk og GDPR-klart
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Medlemslister, kontaktinformasjon og arrangementer håndteres etter strenge personvernrutiner. Dataene tilhører menigheten 100%.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
