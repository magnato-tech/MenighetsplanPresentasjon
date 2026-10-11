import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ANALYSE_GROUPS,
  FUNCTION_AREAS,
  PLANNED_MODULES,
  type FeatureRow,
} from '../data/functionOverview';

function Dot({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-block w-2.5 h-2.5 rounded-full ${
        on ? 'bg-[#1A382B]' : 'border-[1.5px] border-slate-300'
      }`}
      aria-hidden
    />
  );
}

function StatusPill({ status }: { status: 'live' | 'planned' }) {
  if (status === 'live') {
    return (
      <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold whitespace-nowrap">
        Med i dag
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 rounded-full border border-amber-400 text-amber-800 text-[11px] font-semibold whitespace-nowrap">
      Planlagt
    </span>
  );
}

function LevelTable({ rows }: { rows: FeatureRow[] }) {
  let lastGroup = '';
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse min-w-[640px]">
        <thead>
          <tr className="text-[11px] uppercase tracking-wide text-slate-500">
            <th className="font-semibold py-2 pr-3 border-b border-slate-200">Funksjon</th>
            <th className="font-semibold py-2 px-2 border-b border-slate-200 text-center w-28">Menighetsplattform</th>
            <th className="font-semibold py-2 px-2 border-b border-slate-200 text-center w-28">Menighetsplan</th>
            <th className="font-semibold py-2 pl-2 border-b border-slate-200 text-right w-28">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const showGroup = row.group && row.group !== lastGroup;
            if (row.group) lastGroup = row.group;
            return (
              <React.Fragment key={row.name}>
                {showGroup && (
                  <tr>
                    <td colSpan={4} className="pt-3 pb-1 text-[11px] font-bold uppercase tracking-wide text-[#1A382B] bg-[#E5EFE9]/60 px-2">
                      {row.group}
                    </td>
                  </tr>
                )}
                <tr className="border-b border-slate-100">
                  <td className="py-2.5 pr-3 text-slate-800">{row.name}</td>
                  <td className="py-2.5 text-center"><Dot on={row.platform} /></td>
                  <td className="py-2.5 text-center"><Dot on={row.plan} /></td>
                  <td className="py-2.5 text-right"><StatusPill status={row.status} /></td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const FunctionOverviewSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('nettsiden');

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? '' : id));
  };

  return (
    <section id="oversikt" className="py-20 lg:py-28 bg-white border-b border-[#1A382B]/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Alle funksjoner
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Område for område
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Menighetsplattform er nettside med CMS, kalender og personregister. Menighetsplan er alt det, pluss hele planleggeren. Prikk betyr at funksjonen hører til nivået. Planlagt er besluttet, men ikke bygget ennå.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span className="inline-flex items-center gap-2"><Dot on /> Inngår</span>
            <span className="inline-flex items-center gap-2"><Dot on={false} /> Inngår ikke</span>
            <StatusPill status="live" />
            <StatusPill status="planned" />
          </div>
        </div>

        <div className="space-y-3">
          {FUNCTION_AREAS.map((area) => {
            const open = openId === area.id;
            return (
              <div key={area.id} className="border border-slate-200 rounded-2xl bg-[#FAF7F2]/40 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(area.id)}
                  aria-expanded={open}
                  className="w-full flex items-start gap-3 text-left px-4 sm:px-5 py-4 cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#1A382B] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {area.number}
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-slate-900">{area.title}</span>
                    <span className="block text-xs sm:text-sm text-slate-600 mt-0.5">{area.description}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && (
                  <div className="px-4 sm:px-5 pb-5 bg-white border-t border-slate-100">
                    <LevelTable rows={area.rows} />
                  </div>
                )}
              </div>
            );
          })}

          <div className="border border-slate-200 rounded-2xl bg-[#FAF7F2]/40 overflow-hidden">
            <button
              type="button"
              onClick={() => toggle('tillegg')}
              aria-expanded={openId === 'tillegg'}
              className="w-full flex items-start gap-3 text-left px-4 sm:px-5 py-4 cursor-pointer"
            >
              <span className="w-8 h-8 rounded-lg bg-[#1A382B] text-white text-xs font-bold flex items-center justify-center shrink-0">
                08
              </span>
              <span className="flex-1">
                <span className="block font-bold text-slate-900">Tilleggsmoduler</span>
                <span className="block text-xs sm:text-sm text-slate-600 mt-0.5">
                  Slås på én og én, oppå et nivå. Analyse er utviklet og med i dag. De andre modulene er planlagt, og innholdet er ikke fastlagt.
                </span>
              </span>
              <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${openId === 'tillegg' ? 'rotate-180' : ''}`} />
            </button>
            {openId === 'tillegg' && (
              <div className="px-4 sm:px-5 pb-5 bg-white border-t border-slate-100 space-y-6">
                {ANALYSE_GROUPS.map((group) => (
                  <div key={group.title}>
                    <div className="text-[11px] font-bold uppercase tracking-wide text-[#1A382B] bg-[#E5EFE9]/60 px-2 py-1.5 rounded-md mb-1">
                      {group.title}
                    </div>
                    <ul className="divide-y divide-slate-100">
                      {group.rows.map((name) => (
                        <li key={name} className="flex items-start justify-between gap-3 py-2.5 text-sm text-slate-800">
                          <span>{name}</span>
                          <StatusPill status="live" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-2">
                    Planlagte tilleggsmoduler
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {PLANNED_MODULES.map((name) => (
                      <li key={name} className="flex items-center justify-between gap-3 py-2.5 text-sm text-slate-800">
                        <span>{name}</span>
                        <StatusPill status="planned" />
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                    Givertjeneste og utleie skal registrere inntekter og transaksjoner, slik at de senere kan rapporteres og eksporteres til regnskap. Detaljene er ikke fastlagt.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
