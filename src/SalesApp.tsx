import React, { useState } from 'react';
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

export default function SalesApp() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingTopic, setOnboardingTopic] = useState<string | undefined>(undefined);

  const handleOpenOnboarding = (topic?: string) => {
    setOnboardingTopic(topic);
    setOnboardingOpen(true);
  };

  const handleOpenDemo = () => {
    window.open('https://demo.menighetsplan.no', '_blank', 'noopener,noreferrer');
  };

  const handleExploreFeatures = () => {
    const el = document.getElementById('funksjoner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 selection:bg-[#1A382B] selection:text-[#FAF7F2]">
      <Navbar
        onOpenContact={() => handleOpenOnboarding('header-cta')}
        onOpenDemo={handleOpenDemo}
      />

      <main className="flex-1">
        <Hero
          onOpenContact={() => handleOpenOnboarding('hero-trial')}
          onExploreFeatures={handleExploreFeatures}
          onOpenDemo={handleOpenDemo}
        />
        <ProblemSection />
        <PlatformPrinciples />
        <CmsShowcase />
        <CalendarShowcase />
        <ExtensionsShowcase />
        <ChurchesShowcase />
        <PricingSection onOpenContact={handleOpenOnboarding} onOpenDemo={handleOpenDemo} />
        <AboutSection />
        <FaqSection onOpenContact={handleOpenOnboarding} />
        <CtaSection
          onOpenContact={() => handleOpenOnboarding('cta-trial')}
          onOpenDemo={handleOpenDemo}
        />
      </main>

      <Footer onOpenContact={() => handleOpenOnboarding('footer-contact')} />

      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        initialPlan={onboardingTopic}
      />
    </div>
  );
}
