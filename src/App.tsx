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
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState<string | undefined>(undefined);

  const handleOpenContact = (topic?: string) => {
    setContactTopic(topic);
    setContactModalOpen(true);
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
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 2. Hero med interaktivt dashboard */}
        <Hero 
          onOpenContact={handleOpenContact} 
          onExploreFeatures={handleExploreFeatures} 
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

        {/* 9. Priser */}
        <PricingSection onOpenContact={handleOpenContact} />

        {/* 10. Om Menighetsplan */}
        <AboutSection />

        {/* 11. Call to Action */}
        <CtaSection onOpenContact={handleOpenContact} />
      </main>

      {/* 12. Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive Contact & Demo Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialTopic={contactTopic}
      />
    </div>
  );
}
