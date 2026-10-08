import React from 'react';
import { 
  X, 
  ExternalLink, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  Database,
  Clock
} from 'lucide-react';

interface ExternalDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void;
}

export const ExternalDemoModal: React.FC<ExternalDemoModalProps> = ({ 
  isOpen, 
  onClose, 
  onStartTrial 
}) => {
  if (!isOpen) return null;

  const demoUrl = "https://demo.menighetsplan.no";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Lukk"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B]">
            Offentlig Demo-instans
          </span>
          <span className="text-[10px] font-semibold bg-[#E5EFE9] text-[#1A382B] px-2 py-0.5 rounded-full">
            Nivå 2 Aktiv
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Opplev Menighetsplan direkte
        </h3>
        
        <p className="text-sm text-slate-600 mt-2 mb-6 leading-relaxed">
          På <strong className="text-slate-900 font-semibold font-mono">demo.menighetsplan.no</strong> kan du teste en levende, offentlig demo-instans med egen Firebase-database og full Nivå 2-funksjonalitet for menighetsplanlegging.
        </p>

        {/* Feature Highlights Card */}
        <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-slate-200/80 mb-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Hva kan du utforske i demoen?</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
              <Users className="w-4 h-4 text-[#1A382B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Komplett Bemanningsflyt</span>
                <span className="text-slate-500 text-[11px] leading-tight block mt-0.5">
                  Person → Gruppe → Samling → Rolle → Oppgave → Bemanning
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
              <Calendar className="w-4 h-4 text-[#1A382B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Gudstjenestekalender</span>
                <span className="text-slate-500 text-[11px] leading-tight block mt-0.5">
                  Kjøreplaner, møteledelse, lovsangsteam og teknikk
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
              <Clock className="w-4 h-4 text-[#1A382B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Forfall & Reserver</span>
                <span className="text-slate-500 text-[11px] leading-tight block mt-0.5">
                  Se hvordan frivillige bekrefter eller melder forfall
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
              <Layers className="w-4 h-4 text-[#1A382B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Modulbasert Oppsett</span>
                <span className="text-slate-500 text-[11px] leading-tight block mt-0.5">
                  Én felles kodebase med data isolert i egen database
                </span>
              </div>
            </div>
          </div>

          {/* Separation Notice */}
          <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Viktig skille:</strong> Demoen kjører på en egen demodatabase. Ekte menigheter og piloter (som <code className="text-slate-700 font-mono">pilot.menighetsplan.no</code>) får alltid 100% adskilte databaser i Google Cloud (Frankfurt).
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3.5 px-5 rounded-xl text-sm font-semibold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
          >
            <span>Åpne demo.menighetsplan.no</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              onStartTrial();
            }}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Prøv Menighetsplan gratis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-4">
          Demo-instansen driftes fra felles app-kodebase (<code className="font-mono">magnato-tech/menighetsplan_modul</code>).
        </p>
      </div>
    </div>
  );
};
