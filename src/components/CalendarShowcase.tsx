import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Share2, 
  Filter, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { MOCK_CALENDAR_EVENTS, CalendarEvent } from '../data/mockData';

export const CalendarShowcase: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Alle');
  const [selectedEventId, setSelectedEventId] = useState<string>('evt-1');

  const filteredEvents = selectedFilter === 'Alle'
    ? MOCK_CALENDAR_EVENTS
    : MOCK_CALENDAR_EVENTS.filter(e => e.category === selectedFilter);

  const activeEvent = MOCK_CALENDAR_EVENTS.find(e => e.id === selectedEventId) || MOCK_CALENDAR_EVENTS[0];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#1A382B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
            Kalender
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Én kalender for hele menigheten
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Legg inn samlinger ett sted. Kalenderinformasjonen brukes automatisk på nettsiden, i ukeoversikter og for menighetens grupper uten manuelt dobbeltarbeid.
          </p>
        </div>

        {/* Calendar Interactive UI Container */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm">
          
          {/* Top Bar: Controls & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A382B] text-white flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Oktober 2026</h3>
                <span className="text-xs text-slate-500 font-medium">Offisiell menighetskalender</span>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 overflow-x-auto">
              {['Alle', 'Gudstjeneste', 'Husgruppe', 'Bønn'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedFilter === cat
                      ? 'bg-[#1A382B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'Alle' ? 'Alle samlinger' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Body: Event List + Single Event Deep-dive Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            
            {/* Left: Events List (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {filteredEvents.map((evt) => {
                const isSelected = evt.id === activeEvent.id;
                return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-white border-[#1A382B] shadow-md ring-1 ring-[#1A382B]/20'
                        : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Date badge */}
                      <div className="text-center w-14 py-2 px-1 bg-[#FAF7F2] rounded-xl border border-slate-200 shrink-0">
                        <span className="block text-[11px] font-bold uppercase text-slate-500">
                          {evt.day.slice(0, 3)}
                        </span>
                        <span className="block text-base font-extrabold text-[#1A382B] tabular-nums">
                          {evt.date.split('.')[0]}
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          okt
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">{evt.title}</h4>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {evt.category}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {evt.time}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {evt.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pt-1">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        isSelected ? 'text-[#1A382B] bg-[#E5EFE9]' : 'text-slate-400'
                      }`}>
                        {isSelected ? 'Valgt' : 'Se detaljer'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Where this calendar data is used across the system (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-2">
                  Gjenbruk i hele løsningen
                </div>
                
                <h4 className="text-xl font-bold text-slate-900">
                  {activeEvent.title}
                </h4>

                <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-[#1A382B]" />
                    <span>{activeEvent.day} {activeEvent.date} kl. {activeEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ansvarlig: {activeEvent.speakerOrLeader}</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                  {activeEvent.description}
                </p>

                {/* Automation highlight */}
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                  <div className="text-xs font-bold text-slate-800">
                    Automatisk synkronisert til:
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Nettsidens forside ("Kommende i uken")</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Mobilvennlig arrangementsliste</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Relevante husgrupper og frivillige team</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kalendernedlasting for medlemmer (.ics / Google)</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                Endre én gang i Menighetsplan – oppdatert overalt umiddelbart.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
