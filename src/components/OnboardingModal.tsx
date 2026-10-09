import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building,
  Mail,
  Phone,
  User,
  Globe,
  Sparkles,
  ShieldCheck,
  Clock,
  Users,
  Calendar,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { submitRegistration } from '../services/registrationService';
import { ChurchRegistration } from '../types/registration';

const TOTAL_STEPS = 4;

const MODULE_OPTIONS = [
  { id: 'utleie', label: 'Utleie' },
  { id: 'givertjeneste', label: 'Givertjeneste' },
  { id: 'arrangement', label: 'Arrangement' },
  { id: 'kommunikasjon', label: 'SMS / E-post' },
  { id: 'skjemaer', label: 'Skjemaer' },
  { id: 'analyse', label: 'Analyse' },
];

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  initialPlan,
}) => {
  const [step, setStep] = useState(1);
  const [churchName, setChurchName] = useState('');
  const [contactName, setContactName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [slug, setSlug] = useState('');
  const [churchSize, setChurchSize] = useState('50_150');
  const [startDateOption, setStartDateOption] = useState<
    'asap' | 'within_2_weeks' | 'next_month' | 'custom'
  >('asap');
  const [customDate, setCustomDate] = useState('');
  const [comments, setComments] = useState('');
  const [isPilotApplicant, setIsPilotApplicant] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'level_2_trial' | 'level_1_gratis'>(
    initialPlan === 'menighetsplattform-gratis' || initialPlan === 'level_1_gratis'
      ? 'level_1_gratis'
      : 'level_2_trial'
  );
  const [interestedModules, setInterestedModules] = useState<string[]>([]);
  const [hpCompanyUrl, setHpCompanyUrl] = useState('');
  const [stepError, setStepError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedRegistration, setSavedRegistration] = useState<ChurchRegistration | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (initialPlan === 'menighetsplattform-gratis' || initialPlan === 'level_1_gratis') {
      setSelectedPlan('level_1_gratis');
    } else if (initialPlan) {
      setSelectedPlan('level_2_trial');
    }
    setStep(1);
    setStepError(null);
  }, [isOpen, initialPlan]);

  if (!isOpen) return null;

  const handleChurchNameChange = (val: string) => {
    setChurchName(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[æ]/g, 'ae')
      .replace(/[ø]/g, 'o')
      .replace(/[å]/g, 'a')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    setSlug(generatedSlug);
  };

  const toggleModule = (modId: string) => {
    setInterestedModules((prev) =>
      prev.includes(modId) ? prev.filter((m) => m !== modId) : [...prev, modId]
    );
  };

  const getStartDateLabel = () => {
    switch (startDateOption) {
      case 'asap':
        return 'Snarest mulig (forberedes til pilot / test)';
      case 'within_2_weeks':
        return 'Innen 1–2 uker';
      case 'next_month':
        return 'Neste måned';
      case 'custom':
        return customDate ? `Fra ${customDate}` : 'Egendefinert dato';
    }
  };

  const getChurchSizeLabel = () => {
    switch (churchSize) {
      case 'under_50':
        return 'Under 50 aktive / medlemmer';
      case '50_150':
        return '50–150 aktive / medlemmer';
      case '150_350':
        return '150–350 aktive / medlemmer';
      case '350_600':
        return '350–600 aktive / medlemmer';
      case '600_plus':
        return '600+ aktive / medlemmer';
      default:
        return churchSize;
    }
  };

  const validateStep = (currentStep: number): string | null => {
    if (currentStep === 3) {
      if (!churchName.trim()) return 'Skriv inn menighetens navn.';
      if (!slug.trim()) return 'Velg et subdomene for menigheten.';
    }
    if (currentStep === 4) {
      if (!contactName.trim()) return 'Skriv inn kontaktperson.';
      if (!email.trim()) return 'Skriv inn e-postadresse.';
      if (startDateOption === 'custom' && !customDate) return 'Velg ønsket dato.';
    }
    return null;
  };

  const goNext = () => {
    const err = validateStep(step);
    if (err) {
      setStepError(err);
      return;
    }
    setStepError(null);
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const goBack = () => {
    setStepError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep(4);
    if (err) {
      setStepError(err);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await submitRegistration({
        churchName,
        contactName,
        roleTitle,
        email,
        phone,
        subdomainSlug: slug,
        churchSize: getChurchSizeLabel(),
        desiredStartDate: getStartDateLabel(),
        startDateOption,
        customDate,
        isPilotApplicant,
        selectedPlan,
        interestedModules,
        comments,
        sourceUrl: window.location.href,
        hp_company_url: hpCompanyUrl,
      });

      setSavedRegistration(result.registration);
      setIsSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Kunne ikke sende inn registreringen. Prøv igjen.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setChurchName('');
    setContactName('');
    setRoleTitle('');
    setEmail('');
    setPhone('');
    setSlug('');
    setChurchSize('50_150');
    setStartDateOption('asap');
    setCustomDate('');
    setComments('');
    setIsPilotApplicant(true);
    setInterestedModules([]);
    setHpCompanyUrl('');
    setSavedRegistration(null);
    setErrorMessage(null);
    setStepError(null);
    onClose();
  };

  const stepTitles = [
    'Velg modell for oppstart',
    'Tilleggsmoduler',
    'Om menigheten',
    'Kontakt og oppstart',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Lukk"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EFE9] text-[#1A382B] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>30 dagers uforpliktende prøveperiode</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pr-8">
              Prøv Menighetsplan gratis
            </h3>

            <div className="flex items-center gap-2 mt-4 mb-1">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
                <div
                  key={n}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    n <= step ? 'bg-[#1A382B]' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Steg {step} av {TOTAL_STEPS}: <span className="font-semibold text-slate-700">{stepTitles[step - 1]}</span>
            </p>

            {(errorMessage || stepError) && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{stepError || errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpCompanyUrl}
                  onChange={(e) => setHpCompanyUrl(e.target.value)}
                />
              </div>

              {step === 1 && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs text-slate-600">
                    Hvilket nivå vil dere starte med? Du kan endre senere.
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('level_2_trial')}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedPlan === 'level_2_trial'
                          ? 'border-[#1A382B] bg-[#E5EFE9]/60 ring-1 ring-[#1A382B]'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900">Nivå 2: Menighetsplan</span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white shrink-0">
                          Anbefalt
                        </span>
                      </div>
                      <span className="text-xs text-emerald-800 font-semibold block mt-1">
                        30 dagers gratis prøveperiode
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Bemanning, grupper og intern planlegging (499 kr/mnd etter prøve).
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan('level_1_gratis')}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedPlan === 'level_1_gratis'
                          ? 'border-[#1A382B] bg-[#E5EFE9]/60 ring-1 ring-[#1A382B]'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Nivå 1: Grunnplattform</span>
                        <span className="text-[10px] font-semibold text-slate-500">Alltid 0 kr</span>
                      </div>
                      <span className="text-xs text-[#1A382B] font-semibold block mt-1">
                        Nettside, CMS og kalender
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs text-slate-600">
                    Ønsker dere å teste noen tilleggsmoduler i prøveperioden? (Valgfritt — 99 kr/mnd per modul etter prøve.)
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {MODULE_OPTIONS.map((mod) => (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                          interestedModules.includes(mod.id)
                            ? 'border-[#1A382B] bg-[#1A382B] text-white font-medium'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {mod.label}
                        <span className="block text-[10px] opacity-80 mt-0.5">99 kr/mnd</span>
                      </button>
                    ))}
                  </div>
                  {interestedModules.length === 0 && (
                    <p className="text-[11px] text-slate-400">Du kan hoppe over dette steget med Neste.</p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Menighetens navn *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="f.eks. Sentrumskirken Oslo"
                        value={churchName}
                        onChange={(e) => handleChurchNameChange(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ønsket nettadresse (subdomene) *
                    </label>
                    <div className="relative flex items-center">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3" />
                      <input
                        type="text"
                        placeholder="sentrumskirken"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full pl-9 pr-32 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] font-mono"
                      />
                      <span className="absolute right-3 text-xs text-slate-400 pointer-events-none font-mono">
                        .menighetsplan.no
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Menighetsstørrelse *
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <select
                        value={churchSize}
                        onChange={(e) => setChurchSize(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] bg-white appearance-none cursor-pointer"
                      >
                        <option value="under_50">Under 50 aktive / medlemmer</option>
                        <option value="50_150">50–150 aktive / medlemmer</option>
                        <option value="150_350">150–350 aktive / medlemmer</option>
                        <option value="350_600">350–600 aktive / medlemmer</option>
                        <option value="600_plus">600+ aktive / medlemmer</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Kontaktperson *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Ola Nordmann"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Rolle</label>
                      <input
                        type="text"
                        placeholder="Pastor, leder …"
                        value={roleTitle}
                        onChange={(e) => setRoleTitle(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">E-post *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          placeholder="post@menighet.no"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Telefon</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          placeholder="Mobilnummer"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ønsket oppstart *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <select
                          value={startDateOption}
                          onChange={(e) => setStartDateOption(e.target.value as typeof startDateOption)}
                          className="w-full pl-9 pr-8 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] bg-white appearance-none cursor-pointer"
                        >
                          <option value="asap">Snarest mulig</option>
                          <option value="within_2_weeks">Innen 1–2 uker</option>
                          <option value="next_month">Neste måned</option>
                          <option value="custom">Velg dato …</option>
                        </select>
                      </div>
                      {startDateOption === 'custom' ? (
                        <input
                          type="date"
                          value={customDate}
                          onChange={(e) => setCustomDate(e.target.value)}
                          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                        />
                      ) : (
                        <div className="flex items-center px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-emerald-700 mr-1.5 shrink-0" />
                          {getStartDateLabel()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => setIsPilotApplicant(!isPilotApplicant)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-start gap-3 ${
                      isPilotApplicant
                        ? 'border-[#1A382B] bg-[#E5EFE9]/50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        isPilotApplicant ? 'bg-[#1A382B] border-[#1A382B] text-white' : 'border-slate-300'
                      }`}
                    >
                      {isPilotApplicant && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-left text-xs">
                      <span className="font-bold text-slate-900">Pilotmenighet (prioritert oppfølging)</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">Valgfritt — vi følger tett opp ved oppstart.</p>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Kommentarer (valgfritt)"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                  />

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2 text-[11px] text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    Prøveperioden starter først når løsningen er levert. Data lagres i Europa (GDPR).
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Tilbake
                  </button>
                ) : (
                  <div className="flex-1" />
                )}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] cursor-pointer flex items-center justify-center gap-1"
                  >
                    Neste
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] disabled:opacity-75 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sender …
                      </>
                    ) : (
                      <>
                        {isPilotApplicant ? 'Send søknad' : 'Send bestilling'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Takk, {contactName}!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              Vi har mottatt registreringen for <strong>{churchName}</strong> og tar kontakt for klargjøring.
            </p>
            <button
              onClick={handleResetAndClose}
              className="py-3 px-8 rounded-xl text-sm font-semibold text-white bg-[#1A382B] hover:bg-[#234D3B] cursor-pointer"
            >
              Lukk
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
