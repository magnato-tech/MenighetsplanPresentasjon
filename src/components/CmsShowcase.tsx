import React from 'react';
import cmsSider from '../assets/demo/cms-sider.png';

const points = [
  {
    title: 'Menyen bygges her',
    body: 'Hovedfaner og underfaner, med status for kladd og publisert. Strukturen er den samme som besøkende ser på nettsiden.',
  },
  {
    title: 'Ekte forhåndsvisning',
    body: 'Rediger siden til venstre og se den ferdige nettsiden til høyre, på desktop, nettbrett og mobil, før noe publiseres.',
  },
  {
    title: 'Kalenderen følger med',
    body: '«Neste gudstjeneste» på forsiden hentes fra arrangementet som er lagt inn. Den skrives ikke inn på nytt.',
  },
];

export const CmsShowcase: React.FC = () => {
  return (
    <section id="funksjoner" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Nettside + CMS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            En nettside dere faktisk kan styre selv
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            I Admin og CMS Studio bygger dere menyen, redigerer sidene og ser den ekte nettsiden ved siden av.
          </p>
        </div>

        <figure className="mx-auto max-w-6xl">
          <img
            src={cmsSider}
            alt="Admin og CMS Studio for Fjordvik menighet. Til venstre redigeres forsiden, til høyre vises den ekte nettsiden med velkomst og neste gudstjeneste."
            className="w-full rounded-2xl border border-slate-300 shadow-xl bg-[#0b1220]"
          />
          <figcaption className="mt-3 text-center text-sm text-slate-500">
            Fra demoen: Sider og innhold i Admin og CMS Studio, Fjordvik menighet.
          </figcaption>
        </figure>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {points.map((point) => (
            <div key={point.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-bold text-slate-900">{point.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://demo.menighetsplan.no/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs"
          >
            Åpne CMS i demoen
          </a>
        </div>
      </div>
    </section>
  );
};
