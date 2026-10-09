import React, { useEffect } from 'react';
import { AdminRegistrationsPanel } from './components/AdminRegistrationsPanel';

export default function CrmApp() {
  useEffect(() => {
    document.title = 'Menighetsplan CRM';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800">
      <header className="border-b border-[#1A382B]/10 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1A382B] text-white flex items-center justify-center font-bold text-sm">
            M
          </div>
          <div>
            <p className="text-lg font-bold text-[#1A382B] tracking-wide">MENIGHETSPLAN CRM</p>
            <p className="text-xs text-slate-500">Kunder, bestillinger og oppfølging</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        <AdminRegistrationsPanel />
      </main>
    </div>
  );
}
