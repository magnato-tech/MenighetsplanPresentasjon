import React from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Globe,
  Settings,
  Users,
  Calendar,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

export interface TourStep {
  id: string;
  stepNumber: number;
  totalSteps: number;
  title: string;
  badge: string;
  badgeColor: 'emerald' | 'amber' | 'blue';
  description: string;
  highlightText: string;
  viewMode: 'public' | 'admin';
  level: 1 | 2;
  adminTab?: 'cms_innhold' | 'kalender' | 'taler' | 'innstillinger' | 'personer' | 'grupper' | 'bemanning' | 'forfall' | 'oppgaver';
  publicPage?: 'forside' | 'gudstjenester' | 'taler' | 'aktuelt' | 'om' | 'minside';
  durationSeconds: number;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'step-1-public-site',
    stepNumber: 1,
    totalSteps: 5,
    title: '1. Moderne menighetsnettside (Inkludert gratis)',
    badge: 'Nivå 1 – 0 kr',
    badgeColor: 'emerald',
    description: 'Alle menigheter får en rask, mobilvennlig nettside med kalender, talearkiv og nyheter. Alt innhold oppdateres direkte fra CMS uten teknisk kompetanse.',
    highlightText: 'Se arrangementskalenderen, lydspiller for taler og responsivt design.',
    viewMode: 'public',
    level: 1,
    publicPage: 'forside',
    durationSeconds: 8
  },
  {
    id: 'step-2-admin-cms',
    stepNumber: 2,
    totalSteps: 5,
    title: '2. Enkelt CMS for nettside & taler (Inkludert gratis)',
    badge: 'Nivå 1 – 0 kr',
    badgeColor: 'emerald',
    description: 'I administrasjonen redigerer staben forsidetekster, laster opp prekener og oppretter gudstjenester med få klikk. Endringene vises umiddelbart på nettsiden.',
    highlightText: 'Prøv å endre menighetsnavn eller overskrift – endringen skjer i sanntid!',
    viewMode: 'admin',
    level: 1,
    adminTab: 'cms_innhold',
    durationSeconds: 8
  },
  {
    id: 'step-3-volunteers',
    stepNumber: 3,
    totalSteps: 5,
    title: '3. Frivilligregister, team & GDPR (Menighetsplan)',
    badge: 'Nivå 2 – 499 kr/mnd',
    badgeColor: 'blue',
    description: 'Når dere oppgraderer til Menighetsplan, låses hele frivilligregisteret opp. Full oversikt over aktive medarbeidere, tjenestegrupper, tilgjengelighet og GDPR-samtykker.',
    highlightText: 'Filtrer på team (Lovsang, Vertskap, Teknikk) og se hvem som er klare for tjeneste.',
    viewMode: 'admin',
    level: 2,
    adminTab: 'personer',
    durationSeconds: 9
  },
  {
    id: 'step-4-roster',
    stepNumber: 4,
    totalSteps: 5,
    title: '4. Interaktiv bemanningsplan & vaktlister',
    badge: 'Nivå 2 – 499 kr/mnd',
    badgeColor: 'blue',
    description: 'Knytt frivillige direkte til gudstjenestenes roller (møteleder, lyd, kirkekaffe). Automatiske statusvarsler viser hvem som har bekreftet og hvor det mangler folk.',
    highlightText: 'Grønn hake betyr bekreftet vakt. Ingen gule lapper eller ubesvarte SMS.',
    viewMode: 'admin',
    level: 2,
    adminTab: 'bemanning',
    durationSeconds: 9
  },
  {
    id: 'step-5-forfall',
    stepNumber: 5,
    totalSteps: 5,
    title: '5. Automatisk forfallshåndtering & vaktbytte',
    badge: 'Nivå 2 – 499 kr/mnd',
    badgeColor: 'blue',
    description: 'Når noen melder forfall, foreslår systemet automatisk kvalifiserte reserver med ett klikk. Både frivillig og stab sparer timevis med stress før søndagen.',
    highlightText: 'Ett klikk for å kalle inn reserve. SMS og bekreftelse håndteres sømløst.',
    viewMode: 'admin',
    level: 2,
    adminTab: 'forfall',
    durationSeconds: 9
  }
];

interface GuidedTourControllerProps {
  currentStepIndex: number;
  isPlaying: boolean;
  progressPercent: number;
  onNext: () => void;
  onPrev: () => void;
  onTogglePlay: () => void;
  onStop: () => void;
  onSelectStep: (index: number) => void;
  onStartTrial: () => void;
}

export const GuidedTourController: React.FC<GuidedTourControllerProps> = ({
  currentStepIndex,
  isPlaying,
  progressPercent,
  onNext,
  onPrev,
  onTogglePlay,
  onStop,
  onSelectStep,
  onStartTrial
}) => {
  const currentStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TOUR_STEPS.length - 1;
  const totalSteps = TOUR_STEPS.length;

  // Samlet fremgang for hele omvisningen i prosent (0 - 100%)
  const overallProgressPercent = Math.min(
    100,
    Math.round(((currentStepIndex + (progressPercent / 100)) / totalSteps) * 100)
  );

  // Sekunder igjen av gjeldende trinn
  const secondsLeft = Math.max(0, Math.ceil(currentStep.durationSeconds * (1 - progressPercent / 100)));

  return (
    <aside 
      aria-label="Guidet omvisning kontrollpanel"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 rounded-2xl shadow-2xl p-4 text-white animate-in slide-in-from-bottom-4 duration-300 ring-1 ring-emerald-500/20"
    >
      {/* Top Header: Step Counter & Badges */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Guidet omvisning
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ({currentStep.stepNumber}/{totalSteps})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
            currentStep.level === 1 
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
              : 'bg-blue-950 text-blue-300 border border-blue-700/60'
          }`}>
            {currentStep.badge}
          </span>
          
          <button
            type="button"
            onClick={onStop}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Avslutt omvisning"
            aria-label="Avslutt omvisning"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* ========================================================
          VISUELL FREMDRIFTSINDIKATOR (PROGRESS BAR)
          ======================================================== */}
      <div className="mb-3.5 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
        {/* Fremdrifts-overskrift og prosenttall */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fremdrift:</span>
            <span className="font-semibold text-white">
              Trinn {currentStep.stepNumber} av {totalSteps}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-emerald-400 font-bold text-xs bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.5 rounded">
              {overallProgressPercent}% fullført
            </span>
          </div>
        </div>

        {/* Kontinuerlig Progress Bar med gradient og lysglød */}
        <div 
          className="w-full bg-slate-800/90 h-2 rounded-full overflow-hidden mb-2 relative border border-slate-700/40"
          role="progressbar"
          aria-valuenow={overallProgressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Fremdrift i omvisningen: ${overallProgressPercent}% fullført`}
        >
          <div 
            className="h-full rounded-full transition-all duration-200 ease-linear bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
            style={{ width: `${overallProgressPercent}%` }}
          />
        </div>

        {/* 5-trinns Segmentert Fremdriftslinje med status og klikkbar navigering */}
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {TOUR_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(idx)}
                className={`group relative text-left rounded-md transition-all cursor-pointer p-1 ${
                  isCurrent 
                    ? 'bg-emerald-950/90 border border-emerald-500/70 ring-1 ring-emerald-400/50 shadow-xs' 
                    : isCompleted
                    ? 'bg-slate-900/90 border border-emerald-800/40 hover:border-emerald-600/60'
                    : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                }`}
                title={`Gå til trinn ${idx + 1}: ${step.title}`}
                aria-label={`Trinn ${idx + 1}: ${step.title}`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1 font-mono">
                  <span className={isCurrent ? 'text-emerald-300 font-bold' : isCompleted ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                    0{idx + 1}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  )}
                </div>

                {/* Segment track indicator */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-150 ${
                      isCompleted 
                        ? 'w-full bg-emerald-500' 
                        : isCurrent 
                        ? 'bg-emerald-400 shadow-xs shadow-emerald-400/80' 
                        : 'w-0'
                    }`}
                    style={isCurrent ? { width: `${progressPercent}%` } : undefined}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Undertekst / sanntidsstatus */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-1 border-t border-slate-800/60">
          <span className="truncate pr-2 font-medium text-slate-300">
            {currentStep.title}
          </span>
          <span className="shrink-0 font-medium text-emerald-400">
            {isPlaying ? `Neste om ~${secondsLeft}s` : 'Pauset'}
          </span>
        </div>
      </div>

      {/* Step Info */}
      <div className="space-y-1.5 mb-3.5">
        <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
          {currentStep.viewMode === 'public' ? (
            <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <Settings className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{currentStep.title}</span>
        </h4>
        
        <p className="text-xs text-slate-300 leading-relaxed">
          {currentStep.description}
        </p>

        <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-emerald-300 flex items-start gap-1.5 mt-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>{currentStep.highlightText}</span>
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              isFirst 
                ? 'text-slate-600 cursor-not-allowed bg-slate-800/40' 
                : 'text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white'
            }`}
            title="Forrige trinn"
            aria-label="Forrige trinn"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Forrige</span>
          </button>

          {/* Start / Fortsett / Pause knapp */}
          <button
            type="button"
            onClick={onTogglePlay}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 hover:bg-emerald-400 shadow-sm'
            }`}
            title={isPlaying ? 'Sett omvisningen på pause' : 'Start omvisning / Fortsett automatisk avspilling'}
            aria-label={isPlaying ? 'Pause omvisning' : 'Start omvisning'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentStepIndex === 0 && progressPercent === 0 ? 'Start omvisning' : 'Fortsett'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={isLast}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              isLast 
                ? 'text-slate-600 cursor-not-allowed bg-slate-800/40' 
                : 'text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white'
            }`}
            title="Neste trinn"
            aria-label="Neste trinn"
          >
            <span className="hidden sm:inline">Neste</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stopp / Avslutt knapp */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onStop}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-800/60 border border-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Avslutt omvisning og returner til normal interaktiv tilstand"
          >
            <Square className="w-3 h-3 fill-current text-rose-400" />
            <span>Stopp</span>
          </button>

          {isLast && (
            <button
              type="button"
              onClick={onStartTrial}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1 shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Prøv 30 dager</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
