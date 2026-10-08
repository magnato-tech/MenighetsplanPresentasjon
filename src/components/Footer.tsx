import React from 'react';
import { Mail, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onOpenContact: (topic?: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenAdmin }) => {
  return (
    <footer className="bg-[#FAF7F2] text-slate-700 pt-16 pb-12 border-t border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand & Purpose (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1A382B] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                M
              </div>
              <span className="text-xl font-bold tracking-wider text-[#1A382B]">
                MENIGHETSPLAN
              </span>
            </div>

            <p className="text-sm font-medium text-slate-800">
              Én plattform for hele menigheten.
            </p>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Menighetsplan samler nettside, innhold, kalender og menighetens digitale verktøy i én enkel løsning. Bygget for norske menigheters arbeidshverdag.
            </p>

            <div className="pt-2 text-xs text-slate-500">
              Domenet: <span className="font-semibold text-slate-800">menighetsplan.no</span>
            </div>
          </div>

          {/* Nav links: Produkt & Funksjoner (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Plattform
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#plattform" className="text-slate-600 hover:text-[#1A382B] transition-colors">
                  Produkt
                </a>
              </li>
              <li>
                <a href="#funksjoner" className="text-slate-600 hover:text-[#1A382B] transition-colors">
                  Funksjoner
                </a>
              </li>
              <li>
                <a href="#priser" className="text-slate-600 hover:text-[#1A382B] transition-colors">
                  Priser
                </a>
              </li>
              <li>
                <a href="#menigheter" className="text-slate-600 hover:text-[#1A382B] transition-colors">
                  For menigheter
                </a>
              </li>
              <li>
                <a href="#om" className="text-slate-600 hover:text-[#1A382B] transition-colors">
                  Om Menighetsplan
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-600 hover:text-[#1A382B] transition-colors">
                  Ofte stilte spørsmål
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Kontakt (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Kontakt & Vilkår
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenContact('kontakt')}
                  className="text-slate-600 hover:text-[#1A382B] transition-colors cursor-pointer text-left"
                >
                  Kontakt oss
                </button>
              </li>
              <li>
                <a href="mailto:hei@menighetsplan.no" className="text-slate-600 hover:text-[#1A382B] transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>hei@menighetsplan.no</span>
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="text-slate-600 hover:text-[#1A382B] transition-colors"
                >
                  Personvern & GDPR
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="text-slate-600 hover:text-[#1A382B] transition-colors"
                >
                  Vilkår & Prøveperiode
                </a>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-slate-500">
              Skybasert løsning tilpasset Den norske kirke, frikirker og uavhengige menighetsfellesskap.
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <span 
              onClick={onOpenAdmin}
              className={onOpenAdmin ? "cursor-default select-none" : ""}
              title={onOpenAdmin ? "Trykk Shift+Alt+A eller legg til ?admin=true i adressefeltet for administrator-innlogging" : undefined}
            >
              © {new Date().getFullYear()} Menighetsplan. Alle rettigheter reservert.
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Utviklet for norske menigheter</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
