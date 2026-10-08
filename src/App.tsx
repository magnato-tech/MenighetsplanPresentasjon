import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { PlatformPrinciples } from './components/PlatformPrinciples';
import { CmsShowcase } from './components/CmsShowcase';
import { CalendarShowcase } from './components/CalendarShowcase';
import { ExtensionsShowcase } from './components/ExtensionsShowcase';
import { ChurchesShowcase } from './components/ChurchesShowcase';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { ChurchDemoView } from './components/ChurchDemoView';
import { AdminRegistrationsModal } from './components/AdminRegistrationsModal';

export default function App() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingTopic, setOnboardingTopic] = useState<string | undefined>(undefined);
  const [demoOpen, setDemoOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Allow admin panel access via URL query (?admin=true, #admin) or keyboard shortcut (Shift + Alt + A)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || window.location.hash === '#admin') {
      setAdminOpen(true);
    }
    if (params.get('demo') === 'true' || window.location.hash === '#demo') {
      setDemoOpen(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + Alt + A
      if (e.shiftKey && e.altKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenOnboarding = (topic?: string) => {
    setOnboardingTopic(topic);
    setOnboardingOpen(true);
  };

  const handleOpenDemo = () => {
    setDemoOpen(true);
  };

  const handleExploreFeatures = () => {
    const el = document.getElementById('funksjoner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 selection:bg-[#1A382B] selection:text-[#FAF7F2]">
      {/* 1. Header */}
      <Navbar 
        onOpenContact={() => handleOpenOnboarding('header-cta')} 
        onOpenDemo={handleOpenDemo}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 2. Hero med verdivalg, Se demo og Prøv gratis */}
        <Hero 
          onOpenContact={() => handleOpenOnboarding('hero-trial')} 
          onExploreFeatures={handleExploreFeatures} 
          onOpenDemo={handleOpenDemo}
        />

        {/* 3. Problemet */}
        <ProblemSection />

        {/* 4. Plattformen & Modulær Oppbygging (Hovedhistorie) */}
        <PlatformPrinciples />

        {/* 5. Nettside + CMS (Hovedhistorie) */}
        <CmsShowcase />

        {/* 6. Kalender (Hovedhistorie) */}
        <CalendarShowcase />

        {/* 7. Utvidede moduler: Administrasjon & Analyse */}
        <ExtensionsShowcase />

        {/* 8. Forskjellige menigheter: Én plattform. Mange menigheter */}
        <ChurchesShowcase />

        {/* 9. Priser med de 2 kjernenivåene og 7 moduler */}
        <PricingSection 
          onOpenContact={handleOpenOnboarding} 
          onOpenDemo={handleOpenDemo}
        />

        {/* 10. Om Menighetsplan */}
        <AboutSection />

        {/* 11. Ofte stilte spørsmål (FAQ) */}
        <FaqSection onOpenContact={handleOpenOnboarding} />

        {/* 12. Call to Action */}
        <CtaSection 
          onOpenContact={() => handleOpenOnboarding('cta-trial')} 
          onOpenDemo={handleOpenDemo}
        />
      </main>

      {/* 12. Footer */}
      <Footer 
        onOpenContact={() => handleOpenOnboarding('footer-contact')} 
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Onboarding & 30 dagers prøveperiode Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        initialPlan={onboardingTopic}
      />

      {/* «Bygg din egen menighet» – Fullskjerms Interaktiv Demo */}
      <ChurchDemoView
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        onStartTrial={(plan) => handleOpenOnboarding(plan || 'level_2_trial')}
      />

      {/* Sentral administratorvisning for mottatte registreringer */}
      <AdminRegistrationsModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
