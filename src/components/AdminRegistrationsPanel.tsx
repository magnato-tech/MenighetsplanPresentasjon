import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  Inbox,
  Lock,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ChurchRegistration } from '../types/registration';
import {
  fetchAllRegistrations,
  updateRegistrationStatus,
  resendRegistrationConfirmation,
  verifyAdminPassword,
  checkAdminSession,
  logoutAdmin,
} from '../services/registrationService';

export const AdminRegistrationsPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const [registrations, setRegistrations] = useState<ChurchRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReg, setSelectedReg] = useState<ChurchRegistration | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [resendingConfirmation, setResendingConfirmation] = useState(false);

  const confirmationReasonHint = (reason?: string | null) => {
    switch (reason) {
      case 'not_configured':
        return 'Mangler RESEND_API_KEY i Vercel.';
      case 'domain_not_verified':
        return 'Domene ikke verifisert i Resend, eller feil REGISTRATION_EMAIL_FROM.';
      case 'invalid_from':
        return 'Ugyldig avsender (REGISTRATION_EMAIL_FROM).';
      case 'invalid_api_key':
        return 'Ugyldig Resend API-nøkkel.';
      case 'recipient_not_allowed':
        return 'Uten verifisert domene kan Resend ofte bare sende til e-posten på Resend-kontoen.';
      case 'invalid_request':
        return 'Resend avviste forespørselen (sjekk avsender og mottaker).';
      case 'network_error':
        return 'Nettverksfeil mot Resend.';
      default:
        return reason ? `Feilkode: ${reason}` : null;
    }
  };

  const applyRegistrationUpdate = (updated: ChurchRegistration) => {
    setRegistrations((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setSelectedReg((prev) => (prev && prev.id === updated.id ? updated : prev));
  };

  const handleResendConfirmation = async () => {
    if (!selectedReg) return;
    setResendingConfirmation(true);
    setStatusError(null);
    const result = await resendRegistrationConfirmation(selectedReg.id);
    setResendingConfirmation(false);
    if (result.ok && result.registration) {
      applyRegistrationUpdate(result.registration);
    } else {
      setStatusError(result.error || 'Kunne ikke sende bekreftelse.');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllRegistrations();
      setRegistrations(data);
      if (data.length > 0 && !selectedReg) {
        setSelectedReg(data[0]);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : '';
      if (message.includes('administrator') || message.includes('Sesjon') || message.includes('403')) {
        setIsAuthenticated(false);
        setAuthError(message);
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    checkAdminSession().then((authed) => {
      if (!isMounted) return;
      setIsAuthenticated(authed);
      if (authed) {
        loadData();
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

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
    const previous = registrations.find((r) => r.id === id);
    setStatusError(null);
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    setSelectedReg((prev) => (prev && prev.id === id ? { ...prev, status: newStatus } : prev));

    const result = await updateRegistrationStatus(id, newStatus);
    if (!result.ok && previous) {
      setRegistrations((prev) => prev.map((r) => (r.id === id ? previous : r)));
      setSelectedReg((prev) => (prev && prev.id === id ? previous : prev));
      setStatusError(result.error || 'Kunne ikke lagre status.');
    }
  };

  const getStatusBadge = (status: ChurchRegistration['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
            Ny / Venter kontakt
          </span>
        );
      case 'contacted':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">
            Tatt kontakt
          </span>
        );
      case 'ready':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            Klargjort & levert
          </span>
        );
      case 'declined':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
            Avslått / arkivert
          </span>
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-md mx-auto text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#1A382B]">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Logg inn</h2>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Kun autoriserte brukere har tilgang til kundelisten og henvendelser fra menighetsplan.no.
        </p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Passord</label>
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
            <span>{verifying ? 'Verifiserer...' : 'Logg inn'}</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col min-h-[70vh]">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kunder og bestillinger</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Henvendelser fra salgssiden lagres i CRM-databasen.
          </p>
        </div>
        <div className="flex items-center gap-2">
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
            className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1 text-xs px-3"
          >
            <LogOut className="w-4 h-4" />
            <span>Logg ut</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 min-h-[360px]">
        <div className="md:col-span-5 border border-slate-200 rounded-2xl overflow-y-auto max-h-[65vh] p-2 space-y-2 bg-slate-50/50">
          {registrations.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              <Inbox className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p>Ingen registreringer ennå.</p>
            </div>
          ) : (
            registrations.map((reg) => {
              const isSelected = selectedReg?.id === reg.id;
              const formattedDate = new Date(reg.createdAt).toLocaleDateString('nb-NO', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
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
                    <span className="font-bold text-slate-900 truncate">{reg.churchName}</span>
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

        <div className="md:col-span-7 border border-slate-200 rounded-2xl overflow-y-auto max-h-[65vh] p-4 bg-white text-xs">
          {selectedReg ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedReg.churchName}</h3>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Registrert {new Date(selectedReg.createdAt).toLocaleString('nb-NO')} • ID:{' '}
                    {selectedReg.id}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] text-slate-500">Status:</span>
                  <select
                    value={selectedReg.status}
                    onChange={(e) =>
                      handleStatusChange(selectedReg.id, e.target.value as ChurchRegistration['status'])
                    }
                    className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-semibold bg-white cursor-pointer"
                  >
                    <option value="pending">Ny / Venter kontakt</option>
                    <option value="contacted">Tatt kontakt</option>
                    <option value="ready">Klargjort & levert</option>
                    <option value="declined">Avslått / arkivert</option>
                  </select>
                </div>
              </div>

              {statusError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[11px]">
                  {statusError}
                </div>
              )}

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Oppfølgingsregel:</strong> Prøveperioden starter først når løsningen er
                  levert til menigheten.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Kontaktperson
                  </span>
                  <span className="font-semibold text-slate-800">{selectedReg.contactName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    E-post
                  </span>
                  <a href={`mailto:${selectedReg.email}`} className="font-medium text-emerald-800 hover:underline">
                    {selectedReg.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Telefon
                  </span>
                  <span className="font-semibold text-slate-800">{selectedReg.phone || 'Ikke oppgitt'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Subdomene
                  </span>
                  <span className="font-mono text-emerald-800">
                    {selectedReg.subdomainSlug
                      ? `${selectedReg.subdomainSlug}.menighetsplan.no`
                      : 'Ikke valgt'}
                  </span>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border text-[11px] space-y-2 ${
                  selectedReg.confirmationEmailOk
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : selectedReg.confirmationEmailAt
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div>
                  {selectedReg.confirmationEmailOk
                    ? `Bekreftelse sendt ${new Date(selectedReg.confirmationEmailAt!).toLocaleString('nb-NO')}`
                    : selectedReg.confirmationEmailAt
                      ? 'Bekreftelse ikke sendt'
                      : 'Ingen automatisk bekreftelse logget (eldre bestilling eller ikke forsøkt)'}
                </div>
                {!selectedReg.confirmationEmailOk &&
                  confirmationReasonHint(selectedReg.confirmationEmailReason) && (
                    <div className="opacity-90">
                      {confirmationReasonHint(selectedReg.confirmationEmailReason)}
                    </div>
                  )}
                {!selectedReg.confirmationEmailOk && (
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    disabled={resendingConfirmation}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-60"
                  >
                    {resendingConfirmation ? 'Sender…' : 'Send bekreftelse på nytt'}
                  </button>
                )}
              </div>

              {selectedReg.interestedModules && selectedReg.interestedModules.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedReg.interestedModules.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded-md bg-[#E5EFE9] text-[#1A382B] font-medium text-[11px]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {selectedReg.comments && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-[11px] whitespace-pre-wrap">
                  {selectedReg.comments}
                </div>
              )}

              <div className="pt-2 flex items-center gap-2 flex-wrap">
                <a
                  href={`mailto:${selectedReg.email}?subject=Velkommen til Menighetsplan - ${encodeURIComponent(selectedReg.churchName)}`}
                  className="px-4 py-2 rounded-xl bg-[#1A382B] text-white hover:bg-[#234D3B] font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Send e-post
                </a>
                {selectedReg.phone && (
                  <a
                    href={`tel:${selectedReg.phone}`}
                    className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 font-semibold text-xs text-slate-700 inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    Ring
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              Velg en registrering i listen.
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 mt-4 text-xs text-slate-500">
        Totalt <strong>{registrations.length}</strong> kunder i CRM.
      </div>
    </div>
  );
};
