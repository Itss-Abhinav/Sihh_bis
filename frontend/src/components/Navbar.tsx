import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Compass, 
  FlaskConical, 
  FileText, 
  Bot, 
  LayoutDashboard,
  Globe
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, lang, setLang }) => {
  const navItems = [
    { id: 'classifier', labelEn: 'AI Classifier', labelHi: 'उत्पाद वर्गीकरण', icon: ShieldCheck },
    { id: 'standards', labelEn: 'Standards Search', labelHi: 'भारतीय मानक', icon: Search },
    { id: 'navigator', labelEn: 'Compliance Navigator', labelHi: 'प्रमाणन मार्गदर्शक', icon: Compass },
    { id: 'laboratories', labelEn: 'Testing Labs', labelHi: 'परीक्षण प्रयोगशालाएं', icon: FlaskConical },
    { id: 'qco', labelEn: 'QCO Gazette', labelHi: 'गजट अधिसूचनाएं', icon: FileText },
    { id: 'assistant', labelEn: 'Manak Mitra AI', labelHi: 'मानक मित्र AI', icon: Bot },
    { id: 'admin', labelEn: 'Surveillance Hub', labelHi: 'निगरानी डैशबोर्ड', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b1329]/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top tricolor micro-strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('classifier')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-300/30">
              <span className="font-extrabold text-xl text-slate-950 tracking-wider">BIS</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">MANAK-AI</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                  BIS-SETU 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                National Standards & Conformity Intelligence Engine
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right controls: Language Toggle & Statutory badge */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Toggle Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-full text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BIS Act 2016 Compliant</span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium transition ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
