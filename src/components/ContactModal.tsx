import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Building, Mail, Phone, User, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, initialTopic }) => {
  const [churchName, setChurchName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedInterest, setSelectedInterest] = useState<string>(
    initialTopic === 'nettside' ? 'Nettside' : 
    initialTopic === 'menighetsplattform' ? 'Menighetsplattform' : 
    'Uforpliktende demo'
  );
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!churchName || !email || !contactName) return;
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setChurchName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Lukk dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-1">
              Kom i gang med Menighetsplan
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Snakk med oss om deres menighet
            </h3>
            
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Fyll ut skjemaet for en hyggelig og uforpliktende introduksjon tilpasset deres behov.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Menighetens navn *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="f.eks. Sentrumskirken eller Bydelsfellesskapet"
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kontaktperson *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ditt navn"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    E-postadresse *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="epost@menighet.no"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                    />
                  </div>
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
                    placeholder="Valgfritt (for rask oppfølging)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hva er mest aktuelt for dere?
                </label>
                <select
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B] bg-white"
                >
                  <option value="Uforpliktende demo">Uforpliktende videodemo av plattformen</option>
                  <option value="Nettside">Nettside + CMS + Kalender</option>
                  <option value="Menighetsplattform">Helhetlig menighetsplattform (inkl. grupper)</option>
                  <option value="Flytting fra eksisterende system">Flytte fra gammel nettside / flere systemer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kommentar eller spørsmål (valgfritt)
                </label>
                <textarea
                  rows={2}
                  placeholder="Fortell gjerne kort om menighetens nåværende løsning..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-[#FAF7F2] bg-[#1A382B] hover:bg-[#234D3B] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send henvendelse</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-slate-400">
                Vi svarer vanligvis innen 24 timer · Ingen bindingstid
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              Takk for henvendelsen!
            </h3>

            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Vi har mottatt forespørselen for <span className="font-bold text-slate-800">{churchName}</span>. En av våre rådgivere tar kontakt med deg på <span className="font-semibold">{email}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-slate-200 text-xs text-slate-600 text-left space-y-1.5 max-w-sm mx-auto">
              <div className="font-bold text-[#1A382B]">Hva skjer nå?</div>
              <div>1. Vi gjennomgår menighetens ønsker.</div>
              <div>2. Vi setter eventuelt opp en tilpasset forhåndsvisning.</div>
              <div>3. Dere får en uforpliktende gjennomgang.</div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#1A382B] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Lukk vindu
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
