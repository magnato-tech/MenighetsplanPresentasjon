import React from 'react';
import cmsSider from '../assets/demo/cms-sider.png';

const points = [
  {
    title: 'Teksten er den samme',
    body: 'Tittel og ingress i hero er det som står øverst på forsiden. Endringen vises i forhåndsvisningen ved siden av.',
  },
  {
    title: 'Ekte forhåndsvisning',
    body: 'Nettsiden til høyre er den ekte siden, på desktop, nettbrett og mobil, før noe publiseres.',
  },
  {
    title: 'Kalenderen følger med',
    body: '«Neste gudstjeneste» hentes fra arrangementet som er lagt inn. Den skrives ikke inn på nytt på forsiden.',
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
            Rediger forsiden og se den ekte nettsiden ved siden av, før noe publiseres.
          </p>
        </div>

        <figure className="mx-auto max-w-6xl">
          <img
            src={cmsSider}
            alt="Redigering av forsiden til venstre, og den ekte nettsiden til Fjordvik menighet til høyre, med velkomst og neste gudstjeneste."
            className="w-full rounded-2xl border border-slate-300 shadow-xl bg-[#0b1220]"
          />
          <figcaption className="mt-3 text-center text-sm text-slate-500">
            Fra demoen: redigering av forsiden, med den ekte nettsiden ved siden av. Fjordvik menighet.
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
