import React from 'react';

export const ChurchesShowcase: React.FC = () => {
  return (
    <section id="menigheter" className="py-20 lg:py-24 bg-white border-b border-[#1A382B]/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
    </section>
  );
};
