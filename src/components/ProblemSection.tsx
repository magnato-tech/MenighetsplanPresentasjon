import React from 'react';
import { Layers, KeyRound, RefreshCw, Check, ArrowDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: 'Flere systemer',
      subtitle: 'Fragmenterte verktøy',
      description: 'Menigheten ender opp med én leverandør for nettsiden, en separat kalendertjeneste, et regneark for husgrupper og en tredjepartsløsning for e-post.',
      impact: 'Uoversiktlig kostnadsbilde og systemer som ikke snakker sammen.'
    },
    {
      title: 'Ulike innlogginger',
      subtitle: 'Passord og tilgangskaos',
      description: 'Ansatte og frivillige må forholde seg til ulike brukernavn, separate portaler og usikre rutiner for hvem som har tilgang til hva.',
      impact: 'Høy terskel for frivillige og risiko for feil når roller endres.'
    },
    {
      title: 'Innhold som må oppdateres flere steder',
      subtitle: 'Unødvendig dobbeltarbeid',
      description: 'Når en gudstjeneste eller samling flyttes, må endringen legges inn på nettsiden, i ukeplanen, på sosiale medier og sendes ut manuelt.',
      impact: 'Tidkrevende manuell oppfølging og fare for utdatert informasjon.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Utfordringen i dag
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Menigheten trenger ikke flere systemer
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Mange menigheter bruker forskjellige løsninger for nettside, kalender, kommunikasjon, grupper og administrasjon. Menighetsplan samler det viktigste i én plattform.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((prob, index) => (
            <div
              key={prob.title}
              className="bg-white rounded-2xl p-7 lg:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Clean numbered human index */}
                <div className="text-xs font-bold text-slate-400 mb-4 tracking-wider">
                  0{index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 text-balance">
                  {prob.title}
                </h3>
                
                <div className="text-xs font-medium text-amber-800/90 mb-4">
                  {prob.subtitle}
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {prob.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                {prob.impact}
              </div>
            </div>
          ))}
        </div>

        {/* Resolution Banner */}
        <div className="mt-14 max-w-2xl mx-auto text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1A382B]/10 text-[#1A382B] flex items-center justify-center">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#1A382B] text-[#FAF7F2] w-full shadow-lg">
              <div className="text-xs font-semibold tracking-widest uppercase text-emerald-300 mb-2">
                Løsningen
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Menighetsplan samler det.
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed max-w-lg mx-auto">
                Én helhetlig plattform der nettside, kalender, innhold og interne verktøy henger naturlig sammen.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
