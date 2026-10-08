import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Headphones, 
  Settings, 
  Users, 
  Shield, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  ExternalLink, 
  Check, 
  RefreshCw, 
  UserCheck, 
  Send,
  Sliders,
  ListTodo,
  Smile
} from 'lucide-react';
import { 
  DemoChurchState, 
  DemoService, 
  DemoNewsArticle, 
  DemoPerson, 
  DemoRosterRole,
  DemoTask
} from '../../data/demoChurchData';

interface DemoAdminCmsProps {
  level: 1 | 2;
  data: DemoChurchState;
  onUpdateData: (updater: (prev: DemoChurchState) => DemoChurchState) => void;
  onSelectLevel: (lvl: 1 | 2) => void;
  onOpenPublicSite: () => void;
  activeTabOverride?: 'cms_innhold' | 'kalender' | 'taler' | 'innstillinger' | 'personer' | 'grupper' | 'bemanning' | 'forfall' | 'oppgaver';
}

export const DemoAdminCms: React.FC<DemoAdminCmsProps> = ({
  level,
  data,
  onUpdateData,
  onSelectLevel,
  onOpenPublicSite,
  activeTabOverride
}) => {
  const [activeTab, setActiveTab] = useState<
    'cms_innhold' | 'kalender' | 'taler' | 'innstillinger' | 'personer' | 'grupper' | 'bemanning' | 'forfall' | 'oppgaver'
  >(activeTabOverride || 'cms_innhold');

  // Synkroniser når activeTabOverride endres (f.eks. fra guidet omvisning)
  React.useEffect(() => {
    if (activeTabOverride) {
      setActiveTab(activeTabOverride);
    }
  }, [activeTabOverride]);

  // CMS Content Edit states
  const [editingTitle, setEditingTitle] = useState(data.churchName);
  const [editingTagline, setEditingTagline] = useState(data.tagline);
  const [editingWelcome, setEditingWelcome] = useState(data.welcomeMessage);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // New News Modal state
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleExcerpt, setNewArticleExcerpt] = useState('');
  const [showNewArticleForm, setShowNewArticleForm] = useState(false);

  // People search filter
  const [peopleSearch, setPeopleSearch] = useState('');

  // Service Edit state
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const activeService = data.services[selectedServiceIndex] || data.services[0];

  // Roster replacement state
  const [substituteOffered, setSubstituteOffered] = useState(false);

  const handleSaveFrontpageCms = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateData(prev => ({
      ...prev,
      churchName: editingTitle,
      tagline: editingTagline,
      welcomeMessage: editingWelcome
    }));
    setSaveSuccessMsg('Innholdet ble lagret og er nå publisert på nettsiden!');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleAddNewsArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle.trim()) return;

    const newArticle: DemoNewsArticle = {
      id: `nws-${Date.now()}`,
      date: 'I dag',
      title: newArticleTitle,
      category: 'Aktuelt',
      readTime: '2 min',
      excerpt: newArticleExcerpt || 'Kort oppdatering fra menighetens virke.',
      body: newArticleExcerpt || 'Full artikkeltekst publisert fra administrasjonen.'
    };

    onUpdateData(prev => ({
      ...prev,
      news: [newArticle, ...prev.news]
    }));

    setNewArticleTitle('');
    setNewArticleExcerpt('');
    setShowNewArticleForm(false);
    setSaveSuccessMsg('Ny artikkel ble publisert!');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleUpdateServiceTheme = (newTheme: string, newSpeaker: string) => {
    onUpdateData(prev => {
      const updatedServices = [...prev.services];
      if (updatedServices[selectedServiceIndex]) {
        updatedServices[selectedServiceIndex] = {
          ...updatedServices[selectedServiceIndex],
          theme: newTheme,
          speaker: newSpeaker
        };
      }
      return { ...prev, services: updatedServices };
    });
    setSaveSuccessMsg('Gudstjenestedetaljer oppdatert!');
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  const handleSubstituteAssign = (roleId: string, reserveName: string) => {
    onUpdateData(prev => ({
      ...prev,
      roster: prev.roster.map(r => 
        r.id === roleId 
          ? { ...r, personName: reserveName, status: 'bekreftet' } 
          : r
      )
    }));
    setSubstituteOffered(true);
    setSaveSuccessMsg(`Reserve (${reserveName}) ble tildelt og bekreftet! SMS/e-post er sendt.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const filteredPeople = data.people.filter(p => 
    p.name.toLowerCase().includes(peopleSearch.toLowerCase()) ||
    p.role.toLowerCase().includes(peopleSearch.toLowerCase()) ||
    p.groups.some(g => g.toLowerCase().includes(peopleSearch.toLowerCase()))
  );

  return (
    <div className="min-h-[850px] flex flex-col bg-[#F8FAFC] text-slate-800 font-sans">
      
      {/* Top Admin Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
            CMS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">{data.churchName}</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                Admin-panel
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Logget inn som: <strong className="text-slate-200">Thomas Bakke</strong> (Stabsleder / Admin)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Level Badge */}
          <div className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold ${
            level === 1 
              ? 'bg-slate-800 text-amber-300 border border-slate-700' 
              : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
          }`}>
            <span className={`w-2 h-2 rounded-full ${level === 1 ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`}></span>
            <span>
              {level === 1 ? 'Nivå 1 Aktiv (Gratis CMS)' : 'Nivå 2 Aktiv (Full Menighetsplan)'}
            </span>
          </div>

          <button
            onClick={onOpenPublicSite}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Se offentlig nettside</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Admin Layout: Sidebar Tabs + Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Sidebar Nav with Level-gated tabs */}
        <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* NIVÅ 1 MODULER (GRATIS PLATFORM) */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2 flex items-center justify-between">
                <span>Nivå 1 – Gratis CMS</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">0 kr</span>
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('cms_innhold')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'cms_innhold'
                      ? 'bg-[#1A382B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Nettside & Innhold</span>
                </button>

                <button
                  onClick={() => setActiveTab('kalender')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'kalender'
                      ? 'bg-[#1A382B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Kalender & Samlinger</span>
                </button>

                <button
                  onClick={() => setActiveTab('taler')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'taler'
                      ? 'bg-[#1A382B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Headphones className="w-4 h-4 shrink-0" />
                  <span>Taler & Media</span>
                </button>

                <button
                  onClick={() => setActiveTab('innstillinger')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'innstillinger'
                      ? 'bg-[#1A382B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Settings className="w-4 h-4 shrink-0" />
                  <span>Menighetsinnstillinger</span>
                </button>
              </nav>
            </div>

            {/* NIVÅ 2 MODULER (MENIGHETSPLAN – 499 KR/MND) */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2 flex items-center justify-between">
                <span>Nivå 2 – Menighetsplan</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  level === 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  499 kr/mnd
                </span>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('personer')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'personer'
                      ? 'bg-[#1A382B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Personer & Frivillige</span>
                  </div>
                  {level === 1 && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                <button
                  onClick={() => setActiveTab('grupper')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'grupper'
                      ? 'bg-[#1A382B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 shrink-0" />
                    <span>Grupper & Team</span>
                  </div>
                  {level === 1 && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                <button
                  onClick={() => setActiveTab('bemanning')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'bemanning'
                      ? 'bg-[#1A382B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Bemanningsplan & Roller</span>
                  </div>
                  {level === 1 && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                <button
                  onClick={() => setActiveTab('forfall')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'forfall'
                      ? 'bg-[#1A382B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <RefreshCw className="w-4 h-4 shrink-0" />
                    <span>Forfall & Bytter</span>
                  </div>
                  {level === 1 && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                <button
                  onClick={() => setActiveTab('oppgaver')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'oppgaver'
                      ? 'bg-[#1A382B] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ListTodo className="w-4 h-4 shrink-0" />
                    <span>Oppgaver & Huskelister</span>
                  </div>
                  {level === 1 && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </nav>
            </div>
          </div>

          {/* Quick Upgrade/Toggle Widget in Sidebar */}
          <div className="mt-8 pt-4 border-t border-slate-200">
            {level === 1 ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">
                  Se hva du får for 499 kr/mnd
                </span>
                <p className="text-[11px] text-emerald-800 leading-tight mb-2.5">
                  Lås opp frivilligregister, kjøreplaner og forfallshåndtering.
                </p>
                <button
                  onClick={() => onSelectLevel(2)}
                  className="w-full py-2 px-3 rounded-lg bg-[#1A382B] text-white font-bold text-xs hover:bg-[#234D3B] transition-colors cursor-pointer shadow-2xs"
                >
                  Aktiver Nivå 2 nå →
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-600">
                <span className="font-semibold text-slate-900 block mb-0.5">
                  Nivå 2 Aktiv (499,-)
                </span>
                <span className="text-[11px] text-slate-500 block mb-2">
                  Inkluderer automatisk alt fra Nivå 1.
                </span>
                <button
                  onClick={() => onSelectLevel(1)}
                  className="text-[11px] text-slate-700 font-semibold underline hover:text-slate-900 cursor-pointer"
                >
                  Tilbake til kun Gratis (Nivå 1)
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 p-5 sm:p-8 overflow-y-auto max-w-5xl">
          
          {/* Notification Toast */}
          {saveSuccessMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200 shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
              <button
                onClick={onOpenPublicSite}
                className="underline text-emerald-950 font-bold hover:text-black cursor-pointer ml-3"
              >
                Se endring på nettsiden →
              </button>
            </div>
          )}

          {/* ========================================================
              TAB: CMS & NETTSIDE-INNHOLD (LEVEL 1)
              ======================================================== */}
          {activeTab === 'cms_innhold' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Innholdsstyring (CMS)
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Rediger nettsidens forsidetekster og nyheter
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Alle endringer du gjør her lagres umiddelbart og oppdateres på den offentlige nettsiden.
                </p>
              </div>

              {/* Frontpage text editor card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#1A382B]" />
                  <span>Forsidens hovedbudskap</span>
                </h3>

                <form onSubmit={handleSaveFrontpageCms} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Menighetens navn
                    </label>
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Kort slagord / undertittel
                    </label>
                    <input
                      type="text"
                      value={editingTagline}
                      onChange={(e) => setEditingTagline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Velkomsthilsen (vises i toppen av nettsiden)
                    </label>
                    <textarea
                      rows={3}
                      value={editingWelcome}
                      onChange={(e) => setEditingWelcome(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Publiseres direkte uten ventetid eller behov for utvikler.
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#1A382B] hover:bg-[#234D3B] text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Lagre og publiser til nettsiden</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* News Articles Manager */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Publiserte artikler & nyheter</h3>
                    <p className="text-xs text-slate-500">Artikler som vises i menighetens nyhetsfeed</p>
                  </div>

                  <button
                    onClick={() => setShowNewArticleForm(!showNewArticleForm)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ny artikkel</span>
                  </button>
                </div>

                {showNewArticleForm && (
                  <form onSubmit={handleAddNewsArticle} className="p-4 rounded-xl bg-[#FAF7F2] border border-slate-200 mb-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Skriv ny artikkel</h4>
                    <div>
                      <input
                        type="text"
                        placeholder="Overskrift på artikkelen..."
                        value={newArticleTitle}
                        onChange={(e) => setNewArticleTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        placeholder="Ingress / kort sammendrag..."
                        value={newArticleExcerpt}
                        onChange={(e) => setNewArticleExcerpt(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowNewArticleForm(false)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 cursor-pointer"
                      >
                        Avbryt
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#1A382B] text-white hover:bg-[#234D3B] cursor-pointer"
                      >
                        Publiser artikkel
                      </button>
                    </div>
                  </form>
                )}

                <div className="divide-y divide-slate-100">
                  {data.news.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                        <div className="text-slate-500 mt-0.5">
                          <span>{item.date}</span> · <span>Kategori: {item.category}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Publisert
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: KALENDER & GUDSTJENESTER (LEVEL 1)
              ======================================================== */}
          {activeTab === 'kalender' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Kalender & Samlinger
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Gudstjenesteprogram & Samlinger
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Rediger detaljer for gudstjenester. Synkroniseres direkte til nettsiden.
                </p>
              </div>

              {/* Service Details Editor */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-slate-900">
                    Rediger samling: {activeService.date}
                  </h3>
                  <select
                    value={selectedServiceIndex}
                    onChange={(e) => setSelectedServiceIndex(Number(e.target.value))}
                    className="text-xs font-semibold bg-[#FAF7F2] border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 cursor-pointer"
                  >
                    {data.services.map((s, idx) => (
                      <option key={s.id} value={idx}>
                        {s.date} – {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Gudstjenestetittel</label>
                    <input
                      type="text"
                      defaultValue={activeService.title}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-800"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Tema for samlingen</label>
                    <input
                      type="text"
                      defaultValue={activeService.theme}
                      id="input-theme"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-[#1A382B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Taler</label>
                    <input
                      type="text"
                      defaultValue={activeService.speaker}
                      id="input-speaker"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-[#1A382B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Møteleder</label>
                    <input
                      type="text"
                      defaultValue={activeService.leader}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-800"
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Viser på nettsidens forside og gudstjenestekalender.
                  </span>
                  <button
                    onClick={() => {
                      const themeEl = document.getElementById('input-theme') as HTMLInputElement;
                      const speakerEl = document.getElementById('input-speaker') as HTMLInputElement;
                      handleUpdateServiceTheme(themeEl?.value || activeService.theme, speakerEl?.value || activeService.speaker);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#1A382B] text-white font-bold text-xs hover:bg-[#234D3B] transition-colors cursor-pointer"
                  >
                    Lagre endringer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: TALER & MEDIA (LEVEL 1)
              ======================================================== */}
          {activeTab === 'taler' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Taler & Lydarkiv
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Prekenarkiv og opptak
                </h1>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-slate-900">Arkiverte taler</h3>
                  <span className="text-xs text-slate-500">{data.sermons.length} tilgjengelige opptak</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {data.sermons.map((s) => (
                    <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{s.title}</div>
                        <div className="text-slate-500 mt-0.5">
                          <span>{s.speaker}</span> · <span>Serie: {s.series}</span> · <span>{s.date}</span>
                        </div>
                      </div>
                      <span className="font-mono text-slate-500">{s.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: INNSTILLINGER (LEVEL 1)
              ======================================================== */}
          {activeTab === 'innstillinger' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Innstillinger
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Menighetens grunnoppsett
                </h1>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Menighetsnavn</label>
                  <input
                    type="text"
                    value={data.churchName}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Besøksadresse</label>
                  <input
                    type="text"
                    value={data.address}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Vipps-nummer</label>
                  <input
                    type="text"
                    value={data.vipps}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              LOCKED CALLOUT IF LEVEL 1 FOR NIVÅ 2 TABS
              ======================================================== */}
          {level === 1 && ['personer', 'grupper', 'bemanning', 'forfall', 'oppgaver'].includes(activeTab) && (
            <div className="p-8 rounded-3xl bg-white border-2 border-emerald-500/30 shadow-md text-center max-w-2xl mx-auto my-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200 shadow-2xs">
                <Lock className="w-7 h-7" />
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inngår i Menighetsplan (499 kr/mnd)</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activeTab === 'personer' && 'Personregister & Frivilligoversikt'}
                {activeTab === 'grupper' && 'Team, Tjenestegrupper & Roller'}
                {activeTab === 'bemanning' && 'Gudstjenesteplanlegger & Kjøreplan'}
                {activeTab === 'forfall' && 'Forfall & Automatisk Reservehåndtering'}
                {activeTab === 'oppgaver' && 'Oppgavelister & Forberedelser'}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                Denne funksjonen hører til <strong>Nivå 2 – Menighetsplan</strong>. Når dere velger Menighetsplan, får dere hele bemanningen, fraværshåndteringen, teamene og oppfølgingen på ett sted – og gratis CMS-plattformen er automatisk inkludert!
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onSelectLevel(2)}
                  className="px-6 py-3.5 rounded-xl bg-[#1A382B] hover:bg-[#234D3B] text-white font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Prøv Nivå 2 nå (Se hva du får for 499 kr/mnd)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Endringen skjer direkte i demoen så du kan utforske funksjonene i praksis.
              </p>
            </div>
          )}

          {/* ========================================================
              TAB: PERSONER & FRIVILLIGE (LEVEL 2)
              ======================================================== */}
          {level === 2 && activeTab === 'personer' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                    Nivå 2: Personregister
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Medlemmer og frivillige medarbeidere
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Søk navn, rolle, gruppe..."
                      value={peopleSearch}
                      onChange={(e) => setPeopleSearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Viser {filteredPeople.length} personer</span>
                  <span className="text-slate-500 font-medium">GDPR-tilpasset personvern</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {filteredPeople.map((person) => (
                    <div key={person.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#FAF7F2]/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1A382B] text-white font-bold flex items-center justify-center shrink-0">
                          {person.initials}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{person.name}</div>
                          <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{person.role}</span>
                            <span>·</span>
                            <span>{person.email}</span>
                            <span>·</span>
                            <span>{person.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {person.groups.map((g, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: GRUPPER & TEAM (LEVEL 2)
              ======================================================== */}
          {level === 2 && activeTab === 'grupper' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Nivå 2: Team & Tjenestegrupper
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Tjenesteteam og ansvarsområder
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Organiser frivillige i faste team med egne teamledere og turnusplaner.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base text-slate-900">Teknikk & Media</h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      3 medlemmer
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Lyd, lys, storskjerm og streaming for gudstjenester.</p>
                  <div className="text-xs text-slate-600">
                    <strong>Teamleder:</strong> Henrik Sand
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base text-slate-900">Lovsangsteam</h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      4 medlemmer
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Vokal, piano, trommer og gitarister.</p>
                  <div className="text-xs text-slate-600">
                    <strong>Teamleder:</strong> Jonas Berg
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base text-slate-900">Vertskap & Kirkekaffe</h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      5 medlemmer
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Velkomst i døren, nattverd og kafe etter møtet.</p>
                  <div className="text-xs text-slate-600">
                    <strong>Teamleder:</strong> Kari Moen
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base text-slate-900">Barnekirke</h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      4 medlemmer
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Søndagsskole og aktiviteter for barn 0–12 år.</p>
                  <div className="text-xs text-slate-600">
                    <strong>Teamleder:</strong> Silje Hansen
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: BEMANNINGSPLAN & ROLLER (LEVEL 2)
              ======================================================== */}
          {level === 2 && activeTab === 'bemanning' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                    Nivå 2: Kjøreplan & Bemanning
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Bemanningsplan for søndag 11. oktober
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                    {data.roster.filter(r => r.status === 'bekreftet').length} av {data.roster.length} bekreftet
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">
                    Rolle og tildelt person
                  </span>
                  <span className="text-slate-500">Status & Bekreftelse</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {data.roster.map((role) => (
                    <div key={role.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#1A382B] font-bold flex items-center justify-center border border-slate-200 shrink-0">
                          {role.personName[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span>{role.role}</span>
                            {role.isKeyRole && (
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold">
                                Nøkkelrolle
                              </span>
                            )}
                          </div>
                          <div className="text-slate-500 mt-0.5">
                            <span className="font-semibold text-slate-800">{role.personName}</span>
                            <span> · {role.group}</span>
                            <span> · Oppmøte: {role.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {role.status === 'bekreftet' && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200">
                            <Check className="w-3.5 h-3.5" />
                            Bekreftet
                          </span>
                        )}
                        {role.status === 'forespart' && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold text-xs flex items-center gap-1 border border-amber-200">
                            <Clock className="w-3.5 h-3.5" />
                            Venter på svar
                          </span>
                        )}
                        {role.status === 'forfall' && (
                          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 font-bold text-xs flex items-center gap-1 border border-rose-200 animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Forfall meldt!
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: FORFALL & BYTTER (LEVEL 2)
              ======================================================== */}
          {level === 2 && activeTab === 'forfall' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Nivå 2: Forfall & Reserve-oppfølging
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Intelligent forfallshåndtering
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Opplev hvordan Menighetsplan automatisk finner kvalifiserte reserver når noen melder forfall.
                </p>
              </div>

              {/* Simulation Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-700" />
                    <span>Aktiv fraværssituasjon: Lydtekniker</span>
                  </h3>
                  <span className="text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                    {data.roster.find(r => r.id === 'rst-4')?.status === 'forfall' ? 'Forfall aktivt' : 'Normal drift'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                  <p>
                    <strong>Planlagt:</strong> Henrik Sand som <em>Lyd & Streamingansvarlig</em> søndag kl. 09:00.
                  </p>
                  <p className="text-slate-500 text-xs">
                    Når Henrik melder fravær (f.eks. på Min Side eller via SMS), søker systemet automatisk etter andre personer i gruppen «Teknikk & Media» som ikke har vakt denne søndagen.
                  </p>
                </div>

                {data.roster.find(r => r.id === 'rst-4')?.status === 'forfall' ? (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Foreslått reserve fra Teknikk-teamet: Andreas Vik (Reserve Lyd/Lys)</span>
                    </div>

                    <p className="text-xs text-amber-800">
                      Andreas er registrert med kompetanse på miksebordet og har ingen andre oppgaver denne helgen.
                    </p>

                    <button
                      onClick={() => handleSubstituteAssign('rst-4', 'Andreas Vik (Reserve)')}
                      className="px-4 py-2 rounded-xl bg-[#1A382B] text-white font-bold text-xs hover:bg-[#234D3B] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Tildel Andreas Vik & Send varsel</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">
                      Test flyten: Simuler at Henrik melder fravær ↓
                    </span>
                    <button
                      onClick={() => {
                        onUpdateData(prev => ({
                          ...prev,
                          roster: prev.roster.map(r => r.id === 'rst-4' ? { ...r, status: 'forfall' } : r)
                        }));
                      }}
                      className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Simuler forfall for Henrik
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: OPPGAVER & HUSKLISTER (LEVEL 2)
              ======================================================== */}
          {level === 2 && activeTab === 'oppgaver' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block mb-1">
                  Nivå 2: Sjekklister & Oppgaver
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Oppgaver før søndagens gudstjeneste
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Sørg for at alt er klart: nattverdsbrød, mikrofoner, kaffe og barnerom.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Sjekkliste søndag 11. oktober</span>
                  <span className="text-slate-500">
                    {data.tasks.filter(t => t.completed).length} av {data.tasks.length} fullført
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {data.tasks.map((task) => (
                    <div key={task.id} className="p-4 flex items-center justify-between text-xs hover:bg-[#FAF7F2]/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            onUpdateData(prev => ({
                              ...prev,
                              tasks: prev.tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t)
                            }));
                          }}
                          className="cursor-pointer"
                        >
                          <CheckCircle2 className={`w-5 h-5 ${task.completed ? 'text-emerald-700' : 'text-slate-300 hover:text-slate-400'}`} />
                        </button>
                        <div>
                          <span className={`text-sm font-semibold block ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {task.title}
                          </span>
                          <span className="text-slate-500">
                            Tildelt: <strong className="text-slate-700">{task.assignedTo}</strong> ({task.group})
                          </span>
                        </div>
                      </div>

                      <span className="font-mono text-slate-500 text-xs">kl. {task.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
