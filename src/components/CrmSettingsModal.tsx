import React, { useEffect, useState } from 'react';
import { Settings, X } from 'lucide-react';
import { fetchCrmSettings, saveCrmSettings } from '../services/crmSettingsService';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CrmSettingsModal: React.FC<Props> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyEnabled, setNotifyEnabled] = useState(true);
  const [source, setSource] = useState<'crm' | 'env' | null>(null);
  const [resendOk, setResendOk] = useState(false);
  const [fromAddress, setFromAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    setSaved(false);
    fetchCrmSettings()
      .then((data) => {
        setNotifyEmail(data.settings.adminNotifyEmail || '');
        setNotifyEnabled(data.settings.notifyOnNewRegistration);
        setSource(data.effective.source);
        setResendOk(Boolean(data.capabilities?.resendConfigured));
        setFromAddress(data.capabilities?.fromAddress ?? null);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Kunne ikke laste innstillinger');
      })
      .finally(() => setLoading(false));
  }, [open]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const data = await saveCrmSettings({
        adminNotifyEmail: notifyEmail.trim(),
        notifyOnNewRegistration: notifyEnabled,
      });
      setSource(data.effective.source);
      setSaved(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Kunne ikke lagre');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
      <div
        className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="crm-settings-title"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#1A382B]" />
            <h2 id="crm-settings-title" className="font-bold text-slate-900">CRM-innstillinger</h2>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100" aria-label="Lukk">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4 text-sm">
          {loading ? (
            <p className="text-slate-500">Laster…</p>
          ) : (
            <>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <p>
                  <strong>E-post (Resend):</strong> {resendOk ? 'Konfigurert' : 'Mangler RESEND_API_KEY i Vercel'}
                </p>
                {fromAddress && (
                  <p>
                    <strong>Avsender:</strong> {fromAddress} (endres i Vercel)
                  </p>
                )}
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyEnabled}
                  onChange={(e) => setNotifyEnabled(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  Send meg e-post ved <strong>ny bestilling</strong> på www
                </span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="adminNotifyEmail">
                  Varsel til e-post
                </label>
                <input
                  id="adminNotifyEmail"
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="din@epost.no"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  autoComplete="email"
                />
                {source === 'env' && !notifyEmail.trim() && (
                  <p className="text-[11px] text-amber-700 mt-1">
                    Bruker ADMIN_NOTIFY_EMAIL fra Vercel inntil du lagrer en adresse her.
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">{error}</div>
              )}
              {saved && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  Innstillinger lagret.
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-[#1A382B] text-white font-semibold text-sm hover:bg-[#234D3B] disabled:opacity-60"
                >
                  {saving ? 'Lagrer…' : 'Lagre'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-700 text-sm"
                >
                  Lukk
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
