import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
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
  AlertCircle
} from 'lucide-react';
import { submitRegistration } from '../services/registrationService';
import { ChurchRegistration } from '../types/registration';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onClose, 
  initialPlan
}) => {
  const [churchName, setChurchName] = useState('');
  const [contactName, setContactName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [slug, setSlug] = useState('');
  const [churchSize, setChurchSize] = useState('50_150');
  const [startDateOption, setStartDateOption] = useState<'asap' | 'within_2_weeks' | 'next_month' | 'custom'>('asap');
  const [customDate, setCustomDate] = useState('');
  const [comments, setComments] = useState('');
  const [isPilotApplicant, setIsPilotApplicant] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'level_2_trial' | 'level_1_gratis'>(
    initialPlan === 'menighetsplattform-gratis' || initialPlan === 'level_1_gratis' ? 'level_1_gratis' : 'level_2_trial'
  );

  useEffect(() => {
    if (isOpen && initialPlan) {
      if (initialPlan === 'menighetsplattform-gratis' || initialPlan === 'level_1_gratis') {
        setSelectedPlan('level_1_gratis');
      } else {
        setSelectedPlan('level_2_trial');
      }
    }
  }, [isOpen, initialPlan]);
  const [interestedModules, setInterestedModules] = useState<string[]>([]);
  // Honeypot spam trap
  const [hpCompanyUrl, setHpCompanyUrl] = useState('');
  
  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedRegistration, setSavedRegistration] = useState<ChurchRegistration | null>(null);
  const [emailNotified, setEmailNotified] = useState<boolean | undefined>(undefined);

  if (!isOpen) return null;

  // Auto-generate suggested subdomain slug from church name
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
    setInterestedModules(prev => 
      prev.includes(modId) ? prev.filter(m => m !== modId) : [...prev, modId]
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
      case 'under_50': return 'Under 50 aktive / medlemmer';
      case '50_150': return '50–150 aktive / medlemmer';
      case '150_350': return '150–350 aktive / medlemmer';
      case '350_600': return '350–600 aktive / medlemmer';
      case '600_plus': return '600+ aktive / medlemmer';
      default: return churchSize;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!churchName || !email || !contactName) return;

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
      setEmailNotified(result.emailNotified);
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Kunne ikke sende inn registreringen. Prøv igjen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Lukk"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EFE9] text-[#1A382B] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>30 dagers uforpliktende prøveperiode • Klargjøring</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Prøv Menighetsplan gratis
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-5 leading-relaxed">
              Fyll ut opplysningene for menigheten under. Vi tar personlig kontakt for å klargjøre løsningen. 
              <strong> Prøveperioden starter først når løsningen er levert og overlevert til dere.</strong>
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Usynlig bot-felle for spam-beskyttelse */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="company_website_url">La dette stå tomt</label>
                <input
                  id="company_website_url"
                  name="company_website_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpCompanyUrl}
                  onChange={(e) => setHpCompanyUrl(e.target.value)}
                />
              </div>
              
              {/* Church name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Menighetens navn *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="f.eks. Sentrumskirken Oslo"
                    value={churchName}
                    onChange={(e) => handleChurchNameChange(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] font-medium"
                  />
                </div>
              </div>

              {/* Suggested Subdomain */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ønsket nettadresse (subdomene)
                </label>
                <div className="relative flex items-center">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    required
                    placeholder="sentrumskirken"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full pl-9 pr-32 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] font-mono text-slate-800"
                  />
                  <span className="absolute right-3 text-xs text-slate-400 pointer-events-none font-mono">
                    .menighetsplan.no
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Dere kan enkelt koble til eget toppdomene (f.eks. sentrumskirken.no) når løsningen er klar.
                </p>
              </div>

              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kontaktperson (fullt navn) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ola Nordmann"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rolle i menigheten
                  </label>
                  <input
                    type="text"
                    placeholder="f.eks. Pastor, daglig leder, frivilligkoordinator"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    E-postadresse (for kontakt og tilgang) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="post@menighet.no"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefonnummer
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="Mobilnummer"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown for Church Size */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Menighetsstørrelse *
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={churchSize}
                    onChange={(e) => setChurchSize(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] bg-white text-slate-800 font-medium appearance-none cursor-pointer"
                  >
                    <option value="under_50">Liten menighet (under 50 aktive / medlemmer)</option>
                    <option value="50_150">Mellomstor menighet (50–150 aktive / medlemmer)</option>
                    <option value="150_350">Voksende menighet (150–350 aktive / medlemmer)</option>
                    <option value="350_600">Stor menighet (350–600 aktive / medlemmer)</option>
                    <option value="600_plus">Bydels- eller regionskirke (600+ aktive / medlemmer)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Desired Start Date (Dropdown + Optional Datepicker) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ønsket oppstart *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <select
                      value={startDateOption}
                      onChange={(e) => setStartDateOption(e.target.value as any)}
                      className="w-full pl-9 pr-8 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] bg-white text-slate-800 font-medium appearance-none cursor-pointer"
                    >
                      <option value="asap">Snarest mulig (pilot / test)</option>
                      <option value="within_2_weeks">Innen 1–2 uker</option>
                      <option value="next_month">Neste måned</option>
                      <option value="custom">Velg dato...</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>

                  {startDateOption === 'custom' ? (
                    <div>
                      <input
                        type="date"
                        required
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] font-medium text-slate-800"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-emerald-700 mr-1.5 shrink-0" />
                      <span>{getStartDateLabel()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Comments / Module wishes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Eventuelle kommentarer eller modulønsker (valgfritt)
                </label>
                <textarea
                  rows={2}
                  placeholder="Skriv gjerne litt om nåværende systemer, ønsker for moduler eller spesielle behov..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] text-slate-800"
                />
              </div>

              {/* Pilot Church Application Toggle */}
              <div 
                onClick={() => setIsPilotApplicant(!isPilotApplicant)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isPilotApplicant 
                    ? 'border-[#1A382B] bg-[#E5EFE9]/50 ring-1 ring-[#1A382B]' 
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isPilotApplicant 
                    ? 'bg-[#1A382B] border-[#1A382B] text-white' 
                    : 'border-slate-300 bg-white'
                }`}>
                  {isPilotApplicant && <Check className="w-3.5 h-3.5 stroke-3" />}
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      Meld interesse som pilotmenighet
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-emerald-700 text-white">
                      Prioritert
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Gir direkte oppfølging fra teamet, tett dialog og assistanse med oppstarten.
                  </p>
                </div>
              </div>

              {/* Plan Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Velg modell for oppstart
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('level_2_trial')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedPlan === 'level_2_trial'
                        ? 'border-[#1A382B] bg-[#E5EFE9]/60 ring-1 ring-[#1A382B]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 block">Nivå 2: Menighetsplan</span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                        Anbefalt
                      </span>
                    </div>
                    <span className="text-xs text-emerald-800 font-semibold block mt-1">
                      30 dagers gratis prøveperiode
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Intern planlegging, gudstjenestebemanning, grupper (499 kr/mnd etter prøvetid).
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan('level_1_gratis')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedPlan === 'level_1_gratis'
                        ? 'border-[#1A382B] bg-[#E5EFE9]/60 ring-1 ring-[#1A382B]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 block">Nivå 1: Grunnplattform</span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        Alltid 0 kr
                      </span>
                    </div>
                    <span className="text-xs text-[#1A382B] font-semibold block mt-1">
                      Gratis nettside og kalender
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Moderne CMS, kalender og formidling for hele menigheten.
                    </span>
                  </button>
                </div>
              </div>

              {/* Optional Modules */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ønsker dere å teste noen tilleggsmoduler i prøveperioden? (Valgfritt)
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'utleie', label: 'Utleie (99,-)' },
                    { id: 'givertjeneste', label: 'Givertjeneste (99,-)' },
                    { id: 'arrangement', label: 'Arrangement (99,-)' },
                    { id: 'kommunikasjon', label: 'SMS / E-post (99,-)' },
                    { id: 'skjemaer', label: 'Skjemaer (99,-)' },
                    { id: 'analyse', label: 'Analyse (99,-)' }
                  ].map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`p-1.5 rounded-lg border text-center transition-colors cursor-pointer text-[11px] ${
                        interestedModules.includes(mod.id)
                          ? 'border-[#1A382B] bg-[#1A382B] text-white font-medium'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {mod.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Valgfrie moduler koster 99 kr/mnd per modul, og kan aktiveres/deaktiveres etter behov.
                </p>
              </div>

              {/* Trust statement */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong>Trygghet & personvern:</strong> Data lagres i Europa, og vi inngår databehandleravtale med menigheten. Prøveperioden starter først når vi har klargjort og overlevert løsningen.
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] disabled:opacity-75 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Lagrer registrering og sender varsel...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {isPilotApplicant ? 'Send søknad om pilot & oppstart' : 'Start 30 dagers gratis prøveperiode'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="text-center text-[11px] text-slate-400 mt-2">
                  0 kr å betale nå • Ingen kredittkort kreves • Ingen automatisk trekk
                </div>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="py-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              Registrering mottatt & lagret
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Takk, {contactName}!
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
              Vi har mottatt registreringen for <strong className="text-slate-900 font-semibold">{churchName}</strong>. 
              Vi tar personlig kontakt for å klargjøre og levere løsningen.
            </p>

            {/* Clear promise: Trial starts only after delivery */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-left mb-6 text-xs text-amber-950 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-900 font-semibold mb-0.5">
                  Prøveperioden starter først ved overlevering
                </strong>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Prøveperioden deres på 30 dager begynner ikke i dag, men først den dagen vi har klargjort og overlevert løsningen til dere. Vi tar kontakt på e-post eller telefon innen kort tid.
                </p>
              </div>
            </div>

            {/* Registration Details Summary */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 text-left max-w-md mx-auto mb-6 border border-slate-200/80 text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Menighet:</span>
                <span className="font-semibold text-slate-800">{churchName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Kontaktperson:</span>
                <span className="font-semibold text-slate-800">{contactName}{roleTitle ? ` (${roleTitle})` : ''}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">E-post / Telefon:</span>
                <span className="font-semibold text-slate-800">{email} {phone ? `• ${phone}` : ''}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Størrelse:</span>
                <span className="font-semibold text-slate-800">{getChurchSizeLabel()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Ønsket oppstart:</span>
                <span className="font-semibold text-slate-800">{getStartDateLabel()}</span>
              </div>
              {interestedModules.length > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Ønskede moduler:</span>
                  <span className="font-semibold text-slate-800">{interestedModules.join(', ')}</span>
                </div>
              )}
              {comments && (
                <div className="py-1 border-b border-slate-200/60 text-slate-700">
                  <span className="text-slate-500 block text-[11px]">Kommentar / ønsker:</span>
                  <p className="italic text-[11px] mt-0.5">{comments}</p>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Status i systemet:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                  <Check className="w-3.5 h-3.5" /> Lagret sentralt (ID: {savedRegistration?.id?.slice(0, 14)}...)
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Bekreftelse:</span>
                <span className="font-medium text-emerald-800">
                  Registrert & varslet til teamet
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto py-3 px-8 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#1A382B] hover:bg-[#234D3B] transition-colors cursor-pointer shadow-sm"
              >
                Lukk vinduet
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
