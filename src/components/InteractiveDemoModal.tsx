import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  UserCheck, 
  Shield, 
  RefreshCw, 
  Check, 
  Send,
  MessageSquare,
  Lock,
  Sparkles,
  Building2,
  BarChart3
} from 'lucide-react';

interface InteractiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({ 
  isOpen, 
  onClose, 
  onStartTrial 
}) => {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(3); // Viser bemanningsstatus
  const [simulatedForfall, setSimulatedForfall] = useState<boolean>(false);
  const [resolvedReplacement, setResolvedReplacement] = useState<boolean>(false);

  // Demodata for bemanningsflyt (Nivå 2)
  const rosterItems = [
    {
      role: 'Møteleder',
      group: 'Lederteam',
      person: 'Thomas Berg',
      status: 'bekreftet',
      time: '10:30 – 12:30'
    },
    {
      role: 'Lyd & Teknikk',
      group: 'Teknikkteam',
      person: simulatedForfall ? (resolvedReplacement ? 'Kasper B. (Reserve)' : 'Jonas H. (Meldt forfall)') : 'Jonas H.',
      status: simulatedForfall ? (resolvedReplacement ? 'bekreftet' : 'forfall') : 'bekreftet',
      time: '09:30 – 13:00'
    },
    {
      role: 'Lovsang',
      group: 'Lovsangsteam B',
      person: 'Marie V.',
      status: 'bekreftet',
      time: '09:30 – 12:30'
    },
    {
      role: 'Vertskap & Kafé',
      group: 'Vertskap',
      person: 'Elin Sandvik',
      status: 'bekreftet',
      time: '10:15 – 13:00'
    },
    {
      role: 'Barnekirke',
      group: 'Søndagsskole',
      person: 'Ingrid F.',
      status: 'forespart',
      time: '10:45 – 12:15'
    }
  ];

  if (!isOpen) return null;

  const handleSimulateForfall = () => {
    setSimulatedForfall(true);
    setResolvedReplacement(false);
  };

  const handleResolveReplacement = () => {
    setResolvedReplacement(true);
  };

  const handleResetSimulation = () => {
    setSimulatedForfall(false);
    setResolvedReplacement(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#1A382B] text-white flex items-center justify-between border-b border-[#244C3B] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
              DEMO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">Menighetsplan Nivå 2 – Interaktiv Demonstrasjon</h3>
                <span className="text-[10px] bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full font-extrabold uppercase">
                  Isolert Demo-miljø
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Opplev bemanningskjernen: Person → Gruppe → Samling → Rolle → Oppgave → Bemanning → Svar → Forfall → Oppfølging
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Lukk demo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#FAF7F2]/40">
          
          {/* Visual Process Flow Indicator */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A382B] block mb-2">
              Kjerneprosess for frivillighet og bemanning
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 font-medium">
              <span className="px-2 py-1 rounded bg-[#FAF7F2] border border-slate-200 font-semibold text-slate-800">1. Person</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-[#FAF7F2] border border-slate-200 font-semibold text-slate-800">2. Gruppe</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-[#FAF7F2] border border-slate-200 font-semibold text-slate-800">3. Samling</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-[#FAF7F2] border border-slate-200 font-semibold text-slate-800">4. Rolle</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-[#FAF7F2] border border-slate-200 font-semibold text-slate-800">5. Oppgave</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-[#1A382B] text-white font-bold shadow-xs">6. Bemanning</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-[#FAF7F2] border border-slate-200 font-semibold text-slate-800">7. Svar</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-[#FAF7F2] border border-slate-200 font-semibold text-slate-800">8. Forfall</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-[#FAF7F2] border border-slate-200 font-semibold text-slate-800">9. Oppfølging</span>
            </div>
          </div>

          {/* Active Gathering Highlight */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#1A382B] text-white flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Valgt samling</span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  Gudstjeneste & Barnekirke · Søndag 11. oktober kl. 11:00
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hovedsalen · Kjøreplan og program synkronisert med nettsiden
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                5 av 5 oppgaver bemannet
              </span>
            </div>
          </div>

          {/* Live Roster Table with interactive Forfall Simulation */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider">
                Bemanningsliste & Tjenesteteam
              </span>
              <span className="text-slate-500">
                Klikk på test-knappene for å simulere forfall ↓
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {rosterItems.map((item, index) => (
                <div key={index} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#1A382B] font-bold flex items-center justify-center border border-slate-200 shrink-0">
                      {item.person[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{item.role}</div>
                      <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-medium text-slate-700">{item.person}</span>
                        <span>·</span>
                        <span>{item.group}</span>
                        <span>·</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {item.status === 'bekreftet' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        Bekreftet
                      </span>
                    )}
                    {item.status === 'forespart' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold text-xs border border-amber-200">
                        <Clock className="w-3.5 h-3.5" />
                        Venter på svar
                      </span>
                    )}
                    {item.status === 'forfall' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 font-bold text-xs border border-rose-200 animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Meldt forfall!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Simulation Controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-800">Test bemanningslogikken:</span> Hva skjer når en frivillig melder forfall?
              </div>

              <div className="flex items-center gap-2">
                {!simulatedForfall ? (
                  <button
                    onClick={handleSimulateForfall}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-800 bg-rose-100 hover:bg-rose-200 transition-colors cursor-pointer"
                  >
                    Simuler forfall (Lydtekniker)
                  </button>
                ) : !resolvedReplacement ? (
                  <button
                    onClick={handleResolveReplacement}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    Forespør reserve automatisk
                  </button>
                ) : (
                  <button
                    onClick={handleResetSimulation}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Nullstill test
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Entitlement Status Box (Demonstrating /system/entitlements) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#1A382B]" />
                Systemtilganger i denne instansen (/system/entitlements)
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Prøveperiode aktiv (30 dager)
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Dette styres sentralt av leverandøren i menighetens egen database og beskyttes av Firestore-sikkerhetsregler:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Grunnflate</span>
                <span className="font-bold">Nettside & Kalender</span>
                <span className="text-[11px] text-emerald-700 block">✓ Aktiv</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Nivå 2</span>
                <span className="font-bold">Bemanning & Grupper</span>
                <span className="text-[11px] text-emerald-700 block">✓ 499,- (Prøvetid)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Tillegg</span>
                <span className="font-bold">Utleie-modul</span>
                <span className="text-[11px] text-[#1A382B] block">✓ 99,- (Aktiv)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Tillegg</span>
                <span className="font-bold">Givertjeneste</span>
                <span className="text-[11px] text-slate-400 block">Kan aktiveres</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom CTA Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600 text-center sm:text-left">
            Liker du det du ser? Få en egen Menighetsplan for din menighet med 30 dagers gratis prøvetid.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Lukk demo
            </button>
            <button
              onClick={() => {
                onClose();
                onStartTrial();
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Prøv gratis i én måned</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
