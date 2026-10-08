import React, { useState } from 'react';
import { Menu, X, ArrowRight, ExternalLink, Play } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (topic?: string) => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Produkt', href: '#plattform' },
    { label: 'Funksjoner', href: '#funksjoner' },
    { label: 'Priser', href: '#priser' },
    { label: 'For menigheter', href: '#menigheter' },
    { label: 'Om Menighetsplan', href: '#om' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A382B] flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1A382B] text-[#FAF7F2] flex items-center justify-center font-extrabold text-sm shadow-sm group-hover:bg-[#234D3B] transition-colors">
                M
              </div>
              <span className="tracking-wider">MENIGHETSPLAN</span>
            </a>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#1A382B] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#1A382B] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Se demo & Prøv gratis) */}
          <div className="hidden md:flex items-center gap-3">

            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A382B] hover:bg-black/5 transition-colors cursor-pointer"
            >
              <span>Se demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onOpenContact('header-cta')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] shadow-sm transition-all duration-200 active:scale-98 whitespace-nowrap cursor-pointer"
            >
              <span>Prøv gratis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#1A382B] hover:bg-slate-100/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A382B]"
              aria-label="Åpne meny"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1A382B]/10 bg-[#FAF7F2] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-[#1A382B] hover:bg-black/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200/60 flex flex-col gap-2">

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <span>Se demo (demo.menighetsplan.no)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact('header-cta-mobile');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] transition-colors"
              >
                <span>Prøv Menighetsplan gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
