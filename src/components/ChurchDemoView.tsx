import React, { useState, useEffect } from 'react';
import { 
  X, 
  Globe, 
  Settings, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Info,
  CheckSquare,
  Square,
  Compass
} from 'lucide-react';
import { initialDemoChurchData, DemoChurchState } from '../data/demoChurchData';
import { DemoPublicWebsite } from './demo/DemoPublicWebsite';
import { DemoAdminCms } from './demo/DemoAdminCms';
import { GuidedTourController, TOUR_STEPS } from './demo/GuidedTourController';

interface ChurchDemoViewProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: (selectedPlan?: string) => void;
}

// ========================================================
// SESJONS-CACHE: Bevarer brukerens valg i samme sesjon
// ========================================================
const STORAGE_KEY_VIEW_MODE = 'menighetsplan_demo_view_mode';
const STORAGE_KEY_LEVEL = 'menighetsplan_demo_level';

// Minne-fallback dersom sessionStorage er begrenset i nettleser/iframe
let memoryCachedViewMode: 'public' | 'admin' | null = null;
let memoryCachedLevel: 1 | 2 | null = null;

const getCachedViewMode = (): 'public' | 'admin' => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const val = sessionStorage.getItem(STORAGE_KEY_VIEW_MODE);
      if (val === 'public' || val === 'admin') return val;
    }
  } catch {
    // sessionStorage kan være blokkert i sandbox
  }
  return memoryCachedViewMode ?? 'public';
};

const setCachedViewMode = (mode: 'public' | 'admin') => {
  memoryCachedViewMode = mode;
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(STORAGE_KEY_VIEW_MODE, mode);
    }
  } catch {
    // ignorerer lagringsfeil
  }
};

const getCachedLevel = (): 1 | 2 => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const val = sessionStorage.getItem(STORAGE_KEY_LEVEL);
      if (val === '1' || val === '2') return parseInt(val, 10) as 1 | 2;
    }
  } catch {
    // ignorerer lagringsfeil
  }
  return memoryCachedLevel ?? 2;
};

const setCachedLevel = (lvl: 1 | 2) => {
  memoryCachedLevel = lvl;
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(STORAGE_KEY_LEVEL, String(lvl));
    }
  } catch {
    // ignorerer lagringsfeil
  }
};

export const ChurchDemoView: React.FC<ChurchDemoViewProps> = ({
  isOpen,
  onClose,
  onStartTrial
}) => {
  // Level state: 1 = Gratis (Menighetsplattform), 2 = 499 kr/mnd (Menighetsplan, inkl. Nivå 1)
  const [level, setLevel] = useState<1 | 2>(getCachedLevel);
  // View mode: 'public' (Offentlig nettside) or 'admin' (Administrasjon / CMS)
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(getCachedViewMode);
  // Shared interactive church data
  const [churchData, setChurchData] = useState<DemoChurchState>(initialDemoChurchData);

  // ========================================================
  // GUIDET OMVISNING STATE & LOGIKK
  // ========================================================
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const [isTourPlaying, setIsTourPlaying] = useState(true);
  const [stepElapsedMs, setStepElapsedMs] = useState(0);
  const [adminTabOverride, setAdminTabOverride] = useState<
    'cms_innhold' | 'kalender' | 'taler' | 'innstillinger' | 'personer' | 'grupper' | 'bemanning' | 'forfall' | 'oppgaver' | undefined
  >(undefined);

  // Synkroniser tilstand ved gjenåpning i samme sesjon
  useEffect(() => {
    if (isOpen) {
      setViewMode(getCachedViewMode());
      setLevel(getCachedLevel());
    } else {
      // Stopp omvisning dersom demo lukkes
      setIsTourActive(false);
      setIsTourPlaying(false);
    }
  }, [isOpen]);

  const handleLevelChange = (newLevel: 1 | 2) => {
    setLevel(newLevel);
    setCachedLevel(newLevel);
  };

  const handleViewModeChange = (newMode: 'public' | 'admin') => {
    setViewMode(newMode);
    setCachedViewMode(newMode);
  };

  const handleUpdateRosterStatus = (roleId: string, status: 'bekreftet' | 'forespart' | 'forfall') => {
    setChurchData(prev => ({
      ...prev,
      roster: prev.roster.map(r => r.id === roleId ? { ...r, status } : r)
    }));
  };

  // Anvend et gitt omvisningstrinn på grensesnittet
  const applyTourStep = (stepIdx: number) => {
    const step = TOUR_STEPS[stepIdx];
    if (!step) return;

    handleLevelChange(step.level);
    handleViewModeChange(step.viewMode);

    if (step.adminTab) {
      setAdminTabOverride(step.adminTab);
    }
    setStepElapsedMs(0);
  };

  // Start guidet omvisning
  const handleStartTour = () => {
    setIsTourActive(true);
    setTourStepIndex(0);
    setIsTourPlaying(true);
    setStepElapsedMs(0);
    applyTourStep(0);
  };

  // Stopp guidet omvisning og returner til normal interaktiv tilstand
  const handleStopTour = () => {
    setIsTourActive(false);
    setIsTourPlaying(false);
    setStepElapsedMs(0);
    setAdminTabOverride(undefined);
  };

  // Neste trinn
  const handleNextTourStep = () => {
    if (tourStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = tourStepIndex + 1;
      setTourStepIndex(nextIdx);
      applyTourStep(nextIdx);
    } else {
      handleStopTour();
    }
  };

  // Forrige trinn
  const handlePrevTourStep = () => {
    if (tourStepIndex > 0) {
      const prevIdx = tourStepIndex - 1;
      setTourStepIndex(prevIdx);
      applyTourStep(prevIdx);
    }
  };

  // Velg direkte trinn
  const handleSelectTourStep = (idx: number) => {
    setTourStepIndex(idx);
    applyTourStep(idx);
  };

  // Pause / Fortsett
  const handleTogglePlayTour = () => {
    setIsTourPlaying(prev => !prev);
  };

  // Timer loop for automatisk avspilling
  useEffect(() => {
    if (!isTourActive || !isTourPlaying) return;

    const currentStep = TOUR_STEPS[tourStepIndex];
    if (!currentStep) return;

    const totalDurationMs = currentStep.durationSeconds * 1000;
    const intervalTickMs = 100;

    const intervalId = setInterval(() => {
      setStepElapsedMs(prev => {
        const nextMs = prev + intervalTickMs;
        if (nextMs >= totalDurationMs) {
          if (tourStepIndex < TOUR_STEPS.length - 1) {
            const nextIdx = tourStepIndex + 1;
            setTourStepIndex(nextIdx);
            applyTourStep(nextIdx);
          } else {
            setIsTourPlaying(false);
          }
          return 0;
        }
        return nextMs;
      });
    }, intervalTickMs);

    return () => clearInterval(intervalId);
  }, [isTourActive, isTourPlaying, tourStepIndex]);

  const currentStep = TOUR_STEPS[tourStepIndex] || TOUR_STEPS[0];
  const progressPercent = Math.min(
    100, 
    Math.round((stepElapsedMs / (currentStep.durationSeconds * 1000)) * 100)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in fade-in duration-200">
      
      {/* ========================================================
          STICKY TOP CONTROL BAR («Bygg din egen menighet»)
          ======================================================== */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-6 py-3 shrink-0 shadow-lg z-40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Left: Brand & Demo identity */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
                DEMO
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-tight text-white">
                    «Bygg din egen menighet»
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium hidden sm:inline">
                    Interaktiv demo
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Opplev forskjellen direkte i en komplett menighetsinstallasjon
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Lukk demo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center: The Core Level Selector with quick buttons and checkboxes */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto justify-center">
            
            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => handleLevelChange(1)}
                className={`px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  level === 1
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Se hva som følger med gratis</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                  0 kr
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleLevelChange(2)}
                className={`px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  level === 2
                    ? 'bg-[#1A382B] text-emerald-300 ring-1 ring-emerald-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Se hva du får for 499 kr/mnd</span>
              </button>
            </div>

            {/* Checkbox Representation */}
            <div className="hidden xl:flex items-center gap-3 text-xs bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <label 
                className="flex items-center gap-1.5 text-slate-300 cursor-pointer"
                onClick={() => handleLevelChange(1)}
              >
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>Menighetsplattform (gratis)</span>
              </label>

              <span className="text-slate-600">·</span>

              <label 
                className="flex items-center gap-1.5 text-slate-300 cursor-pointer"
                onClick={() => handleLevelChange(level === 2 ? 1 : 2)}
              >
                {level === 2 ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>Menighetsplan (499,-)</span>
              </label>
            </div>
          </div>

          {/* Right: View Switcher (Web vs Admin) & Primary CTA */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-3">
            
            {/* Guidet omvisning Trigger & View Switcher */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={isTourActive ? handleStopTour : handleStartTour}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                  isTourActive
                    ? 'bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-300 animate-pulse'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400'
                }`}
                title="Start en automatisk presentasjon av forskjellen mellom Gratis og Menighetsplan"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{isTourActive ? 'Avslutt omvisning' : 'Guidet omvisning'}</span>
                <span className="text-[10px] bg-slate-900/60 px-1.5 py-0.2 rounded font-mono">
                  {isTourActive ? `${tourStepIndex + 1}/5` : '5 trinn'}
                </span>
              </button>

              {/* View Switcher: Nettside vs Administrasjon */}
              <div className="flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => handleViewModeChange('public')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'public'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Offentlig nettside</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleViewModeChange('admin')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'admin'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Administrasjon / CMS</span>
                </button>
              </div>
            </div>

            {/* CTA: Prøv gratis */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartTrial(level === 1 ? 'level_1_gratis' : 'level_2_trial');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <span>Prøv gratis i 30 dager</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Desktop close button */}
              <button
                onClick={onClose}
                className="hidden lg:flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Lukk demo"
                title="Lukk demo og gå tilbake"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

        {/* Level explanation sub-bar */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              <strong>Du bestemmer selv hvilke deler du vil se.</strong> Endringene skjer direkte i demoen.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {level === 2 ? (
              <span className="text-emerald-300 font-medium">
                ✓ Nivå 1 (Gratis CMS & nettside) er automatisk inkludert i Nivå 2
              </span>
            ) : (
              <span className="text-amber-300 font-medium">
                Nivå 1 aktiv: Kun CMS, kalender og nettside vises.
              </span>
            )}
            <span className="text-slate-500 hidden md:inline">·</span>
            <span className="text-slate-500 hidden md:inline">
              Tips: Valgfrie tillegg (Givertjeneste, Utleie, Arrangement) koster 99 kr/mnd per modul.
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================
          DEMO WORKSPACE VIEWPORT (Scrollable)
          ======================================================== */}
      <div className="flex-1 overflow-y-auto bg-slate-100 relative">
        {viewMode === 'public' ? (
          <DemoPublicWebsite
            level={level}
            data={churchData}
            onSelectLevel={handleLevelChange}
            onOpenCms={() => handleViewModeChange('admin')}
            onUpdateRosterStatus={handleUpdateRosterStatus}
          />
        ) : (
          <DemoAdminCms
            level={level}
            data={churchData}
            onUpdateData={setChurchData}
            onSelectLevel={handleLevelChange}
            onOpenPublicSite={() => handleViewModeChange('public')}
            activeTabOverride={adminTabOverride}
          />
        )}

        {/* GUIDET OMVISNING KONTROLLPANEL */}
        {isTourActive && (
          <GuidedTourController
            currentStepIndex={tourStepIndex}
            isPlaying={isTourPlaying}
            progressPercent={progressPercent}
            onNext={handleNextTourStep}
            onPrev={handlePrevTourStep}
            onTogglePlay={handleTogglePlayTour}
            onStop={handleStopTour}
            onSelectStep={handleSelectTourStep}
            onStartTrial={() => {
              handleStopTour();
              onClose();
              onStartTrial('level_2_trial');
            }}
          />
        )}
      </div>

    </div>
  );
};
