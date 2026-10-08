import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Clock, Users, ArrowRight, MessageSquare } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'trial' | 'security' | 'onboarding';
  categoryLabel: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  onOpenContact?: (topic?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'trial' | 'security' | 'onboarding'>('all');
  // First item open by default so users immediately see accordion capability
  const [openIds, setOpenIds] = useState<string[]>(['trial-1']);

  const faqItems: FaqItem[] = [
    {
      id: 'trial-1',
      category: 'trial',
      categoryLabel: 'Prøveperiode',
      question: 'Hva koster Menighetsplan etter prøveperioden?',
      answer: 'Menighetsplan koster 499 kr per måned for kjerneløsningen. Tilleggsmoduler kan velges etter menighetens behov og koster 99 kr per måned per modul. Det er ingen bindingstid, og dere faktureres måned for måned.'
    },
    {
      id: 'trial-2',
      category: 'trial',
      categoryLabel: 'Prøveperiode',
      question: 'Hva skjer når prøveperioden utløper?',
      answer: 'Når prøveperioden utløper, beholder dere dataene deres. Tilgangen til Menighetsplan-funksjonene pauses inntil dere velger å fortsette. Vi tar kontakt før prøveperioden utløper, slik at dere i ro og mak kan avgjøre om dere vil fortsette.'
    },
    {
      id: 'trial-3',
      category: 'trial',
      categoryLabel: 'Prøveperiode',
      question: 'Kreves det betalingskort for å starte prøveperioden?',
      answer: 'Nei. Dere registrerer kun menighetens navn og en kontaktperson. Dere får tilgang til Menighetsplan i prøveperioden, og tilleggsmoduler kan aktiveres etter behov, helt uten å oppgi betalingskort.'
    },
    {
      id: 'security-1',
      category: 'security',
      categoryLabel: 'Datalagring & Sikkerhet',
      question: 'Hvor lagres dataene våre, og hvordan ivaretas GDPR?',
      answer: 'Data lagres i Google Cloud i Europa, og hver menighet får sitt eget Firebase-prosjekt. Vi legger opp løsningen med dataminimering, tilgangsstyring og nødvendige sikkerhetstiltak for GDPR. Databehandleravtale inngås med menigheten.'
    },
    {
      id: 'security-2',
      category: 'security',
      categoryLabel: 'Datalagring & Sikkerhet',
      question: 'Hva skjer med dataene våre dersom vi avslutter?',
      answer: 'Menigheten har kontroll over egne data og kan få dem eksportert ved behov. Dersom dere ikke ønsker å videreføre avtalen, oppbevares eller slettes dataene trygt i henhold til databehandleravtalen.'
    },
    {
      id: 'onboarding-1',
      category: 'onboarding',
      categoryLabel: 'Oppstartshjelp',
      question: 'Hva slags oppstartshjelp får menigheten?',
      answer: 'Vi hjelper dere i gang med oppsettet av menighetens profil og struktur. Dere får personlig veiledning og bistand til å importere lister over frivillige og tjenestegrupper, slik at overgangen blir smidig for staben.'
    },
    {
      id: 'onboarding-2',
      category: 'onboarding',
      categoryLabel: 'Oppstartshjelp',
      question: 'Hva innebærer det å delta som pilotmenighet?',
      answer: 'Menigheter som tester Menighetsplan som pilotmenighet får tett oppfølging under utprøvingen. Tilbakemeldingene deres tas direkte med i den videre utviklingen, slik at funksjonene treffer menighetshverdagen best mulig.'
    }
  ];

  const categories = [
    { id: 'all' as const, label: 'Alle spørsmål', count: faqItems.length },
    { id: 'trial' as const, label: 'Prøveperiode', count: faqItems.filter(i => i.category === 'trial').length },
    { id: 'security' as const, label: 'Datalagring & Sikkerhet', count: faqItems.filter(i => i.category === 'security').length },
    { id: 'onboarding' as const, label: 'Oppstartshjelp', count: faqItems.filter(i => i.category === 'onboarding').length },
  ];

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-24 bg-[#FAF7F2] border-t border-[#1A382B]/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1A382B] uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-[#1A382B]" />
            <span>Ofte stilte spørsmål</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Alt du lurer på før dere kommer i gang
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Få klare svar om 30 dagers gratis prøveperiode, trygg datalagring innenfor EØS, og hvordan vi bistår menigheten med personlig oppstartshjelp.
          </p>
        </div>

        {/* Category Filter - Segmented Control (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <div className="inline-flex flex-wrap p-1.5 bg-[#EAE2D5]/70 rounded-xl border border-[#1A382B]/10 gap-1">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-[#1A382B] shadow-xs font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-[#1A382B]/10 text-[#1A382B] font-bold' : 'text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredItems.map(item => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`transition-all duration-200 rounded-xl border ${
                  isOpen
                    ? 'bg-white border-[#1A382B]/30 shadow-xs'
                    : 'bg-white/60 hover:bg-white border-slate-200/90'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex items-start justify-between gap-4 p-5 sm:p-6 cursor-pointer group"
                >
                  <div className="space-y-1.5 flex-1 pr-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>{item.categoryLabel}</span>
                    </div>
                    <h3 className={`text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                      isOpen ? 'text-[#1A382B]' : 'text-slate-900 group-hover:text-[#1A382B]'
                    }`}>
                      {item.question}
                    </h3>
                  </div>
                  <div className={`mt-1 p-1 rounded-md text-slate-400 group-hover:text-[#1A382B] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#1A382B]' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                    <p className="mt-2 text-slate-700">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Objection / Contact Callout Card */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#1A382B]/15 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1A382B]">
              <MessageSquare className="w-4 h-4 text-[#1A382B]" />
              <span>Har menigheten andre spørsmål?</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">
              Vi tar gjerne en uforpliktende prat eller videotilpasset demo
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Lurer dere på import fra tidligere registre, spesielle roller eller hvordan pilot-opplegget fungerer i praksis? Vi svarer raskt.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onOpenContact && onOpenContact('faq-sporsmal')}
              className="px-5 py-3 rounded-lg text-sm font-semibold bg-[#1A382B] text-white hover:bg-[#234D3B] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Still et spørsmål</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenContact && onOpenContact('faq-oppstart')}
              className="px-5 py-3 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer"
            >
              <span>Bestill oppstartshjelp</span>
            </button>
          </div>
        </div>

        {/* 3 Core Trust Badges (GDPR, No credit card, Personal onboarding) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start text-xs text-slate-600">
            <Clock className="w-4 h-4 text-[#1A382B] shrink-0" />
            <span>30 dagers prøveperiode · Ingen binding</span>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-[#1A382B] shrink-0" />
            <span>Lagring i Europa (GCP) · Eget Firebase-prosjekt</span>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start text-xs text-slate-600">
            <Users className="w-4 h-4 text-[#1A382B] shrink-0" />
            <span>Personlig oppstartshjelp for menigheten</span>
          </div>
        </div>

      </div>
    </section>
  );
};
