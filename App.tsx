
import React, { useState, useMemo } from 'react';
import { BATCH_1_DATA } from './curriculumData';
import { LanguageCurriculum, Module, Lesson } from './types';
import { 
  BookOpen, 
  ChevronRight, 
  Search, 
  Globe, 
  AlertTriangle, 
  Info,
  Layers,
  Award
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string>(BATCH_1_DATA[0].language);
  const [activeModuleId, setActiveModuleId] = useState<string>(BATCH_1_DATA[0].modules[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const currentLanguageData = useMemo(() => 
    BATCH_1_DATA.find(l => l.language === selectedLang) || BATCH_1_DATA[0]
  , [selectedLang]);

  const currentModule = useMemo(() => 
    currentLanguageData.modules.find(m => m.id === activeModuleId) || currentLanguageData.modules[0]
  , [currentLanguageData, activeModuleId]);

  const filteredModules = useMemo(() => {
    if (!searchTerm) return currentLanguageData.modules;
    return currentLanguageData.modules.filter(m => 
      m.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.lessons.some(l => l.english.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [currentLanguageData, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Curriculum Architect</h1>
              <p className="text-xs text-slate-500 font-medium">BATCH 1: JP, HI, FR | 2025 EDITION</p>
            </div>
          </div>

          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
            <Search size={18} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search modules or lessons..."
              className="bg-transparent border-none outline-none text-sm w-48 md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Language & Module Selection */}
        <aside className="lg:col-span-3 space-y-8">
          <section>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Globe size={14} /> Languages
            </h3>
            <div className="flex flex-col gap-2">
              {BATCH_1_DATA.map(lang => (
                <button
                  key={lang.language}
                  onClick={() => {
                    setSelectedLang(lang.language);
                    setActiveModuleId(lang.modules[0].id);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    selectedLang === lang.language 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1' 
                      : 'bg-white hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className="font-semibold">{lang.language}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedLang === lang.language ? 'bg-indigo-500' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {lang.level}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers size={14} /> Modules
            </h3>
            <div className="flex flex-col gap-2">
              {filteredModules.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModuleId(m.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                    activeModuleId === m.id 
                      ? 'bg-white border-2 border-indigo-600 ring-4 ring-indigo-50' 
                      : 'bg-white border border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    activeModuleId === m.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${activeModuleId === m.id ? 'text-indigo-600' : 'text-slate-700'}`}>
                      {m.theme}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">{m.lessons.length} Lessons</p>
                  </div>
                </button>
              ))}
              {filteredModules.length === 0 && (
                <div className="p-4 text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="text-xs text-slate-400">No matching modules found.</p>
                </div>
              )}
            </div>
          </section>
        </aside>

        {/* Main Content Area */}
        <section className="lg:col-span-9 space-y-6">
          {/* Module Header */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Award size={160} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">
                <ChevronRight size={14} strokeWidth={3} /> {selectedLang} A1 Beginner
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800">{currentModule.theme}</h2>
              <p className="text-slate-500 mt-2 max-w-2xl leading-relaxed">
                Fundamental communication patterns and essential vocabulary for the {currentModule.theme.toLowerCase()} theme, adhering to CEFR A1 standards.
              </p>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentModule.lessons.map((lesson, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-100 text-slate-400 text-[10px] font-bold py-1 px-2 rounded-md">LESSON {idx + 1}</span>
                  <button className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                    <Info size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-2xl font-bold ${selectedLang === 'Japanese' ? 'jp-font' : selectedLang === 'Hindi' ? 'hi-font' : ''} text-slate-900`}>
                      {lesson.target_text}
                    </h4>
                    <p className="text-indigo-600 font-medium text-sm mt-1">{lesson.phonetic_transcription}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-50">
                    <p className="text-slate-500 italic text-sm">"{lesson.english}"</p>
                    {lesson.radical_breakdown && (
                      <div className="mt-3 bg-slate-50 rounded-lg p-2 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase px-1.5 py-0.5 bg-white border border-slate-200 rounded">Analysis</span>
                        <p className="text-[11px] text-slate-600 font-medium">{lesson.radical_breakdown}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Liar Game Section (Trap) */}
          <div className="bg-amber-50 rounded-3xl p-6 md:p-8 border border-amber-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-500 p-2 rounded-xl text-white shadow-lg shadow-amber-200">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-900">Liar Game: Common Trap</h3>
                <p className="text-amber-700 text-xs">Test your intuition and avoid this plausible error.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-amber-200">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2 block">The Deception</span>
                <p className="text-slate-800 font-bold text-lg">{currentModule.liar_game_data.trap}</p>
              </div>
              <div className="bg-emerald-50 p-5 rounded-2xl border-2 border-emerald-100 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 block">The Correction</span>
                <p className="text-emerald-900 font-bold">{currentModule.liar_game_data.correct_version}</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white/50 rounded-xl">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Info size={12} /> Architect's Explanation
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {currentModule.liar_game_data.explanation}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
          <p>© 2025 Polyglot Data Systems. All linguistic data conforms to CEFR standards.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">API Export</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Firebase Sync</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
