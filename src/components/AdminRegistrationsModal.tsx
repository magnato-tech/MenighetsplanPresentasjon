import React, { useState, useEffect } from 'react';
import { 
  X, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building, 
  User, 
  Mail, 
  Phone, 
  Send, 
  Check, 
  ExternalLink,
  Shield,
  Layers,
  Inbox,
  Lock,
  LogOut,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { ChurchRegistration } from '../types/registration';
import { 
  fetchAllRegistrations, 
  updateRegistrationStatus, 
  triggerTestNotification,
  verifyAdminPassword,
  checkAdminSession,
  logoutAdmin
} from '../services/registrationService';

interface AdminRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminRegistrationsModal: React.FC<AdminRegistrationsModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const [registrations, setRegistrations] = useState<ChurchRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [selectedReg, setSelectedReg] = useState<ChurchRegistration | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllRegistrations();
      setRegistrations(data);
      if (data.length > 0 && !selectedReg) {
        setSelectedReg(data[0]);
      }
    } catch (e: any) {
      if (e.message?.includes('administrator') || e.message?.includes('Sesjon')) {
        setIsAuthenticated(false);
        setAuthError(e.message);
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      checkAdminSession().then(authed => {
        if (!isMounted) return;
        setIsAuthenticated(authed);
        if (authed) {
          loadData();
        }
      });
    }
    return () => { isMounted = false; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError('Vennligst oppgi passord');
      return;
    }

    setVerifying(true);
    setAuthError(null);

    const result = await verifyAdminPassword(passwordInput.trim());
    setVerifying(false);

    if (result.success) {
      setIsAuthenticated(true);
      setPasswordInput('');
      await loadData();
    } else {
      setAuthError(result.error || 'Feil passord. Prøv igjen.');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setRegistrations([]);
    setSelectedReg(null);
  };

  const handleStatusChange = async (id: string, newStatus: ChurchRegistration['status']) => {
    const ok = await updateRegistrationStatus(id, newStatus);
    if (ok) {
      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      if (selectedReg && selectedReg.id === id) {
        setSelectedReg(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const handleTestEmail = async () => {
    setTestSending(true);
    setTestResult(null);
    try {
      const res = await triggerTestNotification();
      setTestResult(res.message);
    } catch (err: any) {
      setTestResult('Feil: ' + err.message);
    } finally {
      setTestSending(false);
    }
  };

  const getStatusBadge = (status: ChurchRegistration['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">Ny / Venter kontakt</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">Tatt kontakt</span>;
      case 'ready':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">Klargjort & levert</span>;
      case 'declined':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">Avslått / arkivert</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#1A382B] text-white flex items-center justify-center font-bold text-xs">
                M
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Mottatte registreringer (Administrator)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Sentral oversikt over alle henvendelser og prøveperioder fra menighetsplan.no. Varsler sendes til magnar.totland@gmail.com.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={loadData}
                  disabled={loading}
                  title="Oppdater liste"
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleLogout}
                  title="Logg ut fra admin"
                  className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logg ut</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION GATE: If not logged in, show secure login prompt */}
        {!isAuthenticated ? (
          <div className="py-12 px-4 max-w-md mx-auto w-full text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#1A382B] shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Adgangskontroll
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Denne oversikten inneholder henvendelser, menighetsdata og kontaktinformasjon. Vennligst tast inn administrator-passordet for å få adgang.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Administrator-passord
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Skriv inn passord..."
                    autoFocus
                    className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1A382B] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1A382B] text-white hover:bg-[#234D3B] font-semibold text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <KeyRound className="w-4 h-4" />
                <span>{verifying ? 'Verifiserer...' : 'Lås opp administratorpanel'}</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-[11px] text-slate-400">
              Uautorisert tilgang er sperret på server- og API-nivå i henhold til GDPR.
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <>
            {/* Action bar: Email notification test */}
            <div className="py-3 px-4 my-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Varselmottaker: <strong className="text-slate-800">magnar.totland@gmail.com</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {testResult && (
                  <span className="text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                    {testResult}
                  </span>
                )}
                <button
                  onClick={handleTestEmail}
                  disabled={testSending}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-slate-500" />
                  <span>{testSending ? 'Sender...' : 'Send testvarsel nå'}</span>
                </button>
              </div>
            </div>

            {/* Content body: 2-column master-detail */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-4 pt-1 min-h-[360px]">
              
              {/* List col (5 cols) */}
              <div className="md:col-span-5 border border-slate-200 rounded-2xl overflow-y-auto max-h-[55vh] p-2 space-y-2 bg-slate-50/50">
                {registrations.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    <Inbox className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p>Ingen registreringer ennå.</p>
                    <p className="text-[11px] mt-1 text-slate-400">
                      Send inn en henvendelse fra "Prøv gratis" for å se den dukke opp her med en gang.
                    </p>
                  </div>
                ) : (
                  registrations.map(reg => {
                    const isSelected = selectedReg?.id === reg.id;
                    const formattedDate = new Date(reg.createdAt).toLocaleDateString('nb-NO', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    return (
                      <div
                        key={reg.id}
                        onClick={() => setSelectedReg(reg)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all text-xs ${
                          isSelected 
                            ? 'border-[#1A382B] bg-white shadow-xs ring-1 ring-[#1A382B]' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-slate-900 truncate">
                            {reg.churchName}
                          </span>
                          {getStatusBadge(reg.status)}
                        </div>

                        <div className="text-slate-600 font-medium truncate">
                          {reg.contactName} {reg.roleTitle ? `• ${reg.roleTitle}` : ''}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                          <span>{formattedDate}</span>
                          <span className="font-mono text-emerald-800">
                            {reg.selectedPlan === 'level_2_trial' ? 'Nivå 2 (499,-)' : 'Nivå 1 (Gratis)'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Details col (7 cols) */}
              <div className="md:col-span-7 border border-slate-200 rounded-2xl overflow-y-auto max-h-[55vh] p-4 bg-white text-xs">
                {selectedReg ? (
                  <div className="space-y-4">
                    {/* Title & Status */}
                    <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {selectedReg.churchName}
                        </h3>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Registrert {new Date(selectedReg.createdAt).toLocaleString('nb-NO')} • ID: {selectedReg.id}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-500">Status:</span>
                        <select
                          value={selectedReg.status}
                          onChange={(e) => handleStatusChange(selectedReg.id, e.target.value as any)}
                          className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-semibold bg-white cursor-pointer"
                        >
                          <option value="pending">Ny / Venter kontakt</option>
                          <option value="contacted">Tatt kontakt</option>
                          <option value="ready">Klargjort & levert</option>
                          <option value="declined">Avslått / arkivert</option>
                        </select>
                      </div>
                    </div>

                    {/* Important alert for trial start */}
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Oppfølgingsregel:</strong> Prøveperioden starter først når dere har klargjort og levert løsningen til menigheten. Ta kontakt med kontaktpersonen for velkomstmøte og oppsett.
                      </div>
                    </div>

                    {/* Grid details */}
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Kontaktperson</span>
                        <span className="font-semibold text-slate-800">{selectedReg.contactName}</span>
                        {selectedReg.roleTitle && (
                          <span className="text-slate-500 block text-[11px]">{selectedReg.roleTitle}</span>
                        )}
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">E-post</span>
                        <a href={`mailto:${selectedReg.email}`} className="font-medium text-emerald-800 hover:underline">
                          {selectedReg.email}
                        </a>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Telefon</span>
                        <span className="font-semibold text-slate-800">
                          {selectedReg.phone || 'Ikke oppgitt'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Menighetsstørrelse</span>
                        <span className="font-semibold text-slate-800">{selectedReg.churchSize}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Ønsket oppstart</span>
                        <span className="font-semibold text-slate-800">{selectedReg.desiredStartDate}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Ønsket subdomene</span>
                        <span className="font-mono text-emerald-800">
                          {selectedReg.subdomainSlug ? `${selectedReg.subdomainSlug}.menighetsplan.no` : 'Ikke valgt'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Valgt modell</span>
                        <span className="font-semibold text-slate-800">
                          {selectedReg.selectedPlan === 'level_2_trial' ? 'Nivå 2: Menighetsplan (499,-)' : 'Nivå 1: Grunnplattform (0,-)'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Pilotkandidat</span>
                        <span className={`font-semibold ${selectedReg.isPilotApplicant ? 'text-emerald-700' : 'text-slate-600'}`}>
                          {selectedReg.isPilotApplicant ? 'Ja (ønsker dedikert oppfølging)' : 'Nei'}
                        </span>
                      </div>
                    </div>

                    {/* Modules */}
                    <div>
                      <span className="text-slate-500 font-semibold block mb-1">
                        Ønskede tilleggsmoduler i prøveperioden:
                      </span>
                      {selectedReg.interestedModules && selectedReg.interestedModules.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedReg.interestedModules.map((m) => (
                            <span key={m} className="px-2 py-0.5 rounded-md bg-[#E5EFE9] text-[#1A382B] font-medium text-[11px]">
                              {m} (+99,-)
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Ingen tilleggsmoduler krysset av</span>
                      )}
                    </div>

                    {/* Comments */}
                    {selectedReg.comments && (
                      <div>
                        <span className="text-slate-500 font-semibold block mb-1">
                          Kommentarer og spesielle behov:
                        </span>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-[11px] whitespace-pre-wrap">
                          {selectedReg.comments}
                        </div>
                      </div>
                    )}

                    {/* Actions: Mail shortcut */}
                    <div className="pt-2 flex items-center gap-2">
                      <a
                        href={`mailto:${selectedReg.email}?subject=Velkommen til Menighetsplan - Oppsett for ${encodeURIComponent(selectedReg.churchName)}`}
                        className="px-4 py-2 rounded-xl bg-[#1A382B] text-white hover:bg-[#234D3B] font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send e-post til {selectedReg.contactName}</span>
                      </a>
                      {selectedReg.phone && (
                        <a
                          href={`tel:${selectedReg.phone}`}
                          className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 font-semibold text-xs text-slate-700 transition-colors inline-flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span>Ring {selectedReg.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                    Velg en registrering i listen til venstre for å se detaljer.
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between mt-3 text-xs text-slate-500">
              <div>
                Totalt <strong>{registrations.length}</strong> registreringer lagret i sentral database.
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
              >
                Lukk
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
