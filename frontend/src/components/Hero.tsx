import React from 'react';
import { 
  Zap, 
  Sparkles, 
  ArrowRight, 
  FileCheck2, 
  Building2, 
  Layers
} from 'lucide-react';

interface HeroProps {
  onSelectPreset: (productName: string, description: string) => void;
  lang: 'en' | 'hi';
}

export const Hero: React.FC<HeroProps> = ({ onSelectPreset, lang }) => {
  const presets = [
    {
      name: "Lithium Power Bank 20000mAh",
      desc: "Portable rechargeable li-ion battery pack with USB-C fast charging",
      tag: "IS 16046 / CRS",
      icon: "🔋"
    },
    {
      name: "Electric Immersion Water Heater 1500W",
      desc: "Household immersion rod with copper tubular element 230V AC",
      tag: "IS 302 / ISI Mark",
      icon: "⚡"
    },
    {
      name: "Packaged Natural Drinking Water 1L",
      desc: "Sealed PET bottle treated potable water for commercial retail",
      tag: "IS 14543 / ISI Mark",
      icon: "💧"
    },
    {
      name: "LED Streetlight Electronic Driver 100W",
      desc: "AC supplied constant current LED controlgear luminaire driver",
      tag: "IS 15885 / CRS",
      icon: "💡"
    },
    {
      name: "Industrial HDPE Pipe for Potable Water",
      desc: "High density polyethylene pipe PE 100 grade SDR 11 PN 16",
      tag: "IS 4984 / ISI Mark",
      icon: "🚰"
    },
    {
      name: "Electric Remote Control Toy Car",
      desc: "Rechargeable battery powered toy car for children above 3 years",
      tag: "IS 9873 / Toys QCO",
      icon: "🧸"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0e172e] via-[#0b1120] to-[#070b14] border-b border-slate-800/80 pt-8 pb-12">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-amber-400 font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {lang === 'hi' 
              ? 'राष्ट्रीय एआई संचालित मानक एवं अनुपालन प्रणाली' 
              : 'Autonomous BIS Standards Classification & Certification Engine'}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-semibold">QCO 2026.2 Live</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          {lang === 'hi' ? (
            <>
              उत्पाद विवरण से <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">भारतीय मानक (BIS)</span> एवं परीक्षण अनुपालन तक
            </>
          ) : (
            <>
              From Product Conception to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">BIS Indian Standards</span> & Conformity Certification
            </>
          )}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          {lang === 'hi'
            ? 'निर्माताओं, आयातकों और स्टार्टअप्स के लिए स्वचालित बीआईएस वर्गीकरण: सेकंडों में अनिवार्य मानक, क्यूसीओ अधिसूचना, लैब परीक्षण आवश्यकताएं और प्रयोगशाला खोजें।'
            : 'Deterministic AI pipeline mapped to the Bureau of Indian Standards Act, 2016. Instantly identify applicable Indian Standards (IS), mandatory Quality Control Orders (QCOs), clause-by-clause test requirements, and accredited NABL laboratories.'}
        </p>

        {/* Workflow Chain Visualizer */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Mandatory Demonstration Pathway / अनिवार्य प्रदर्शन प्रवाह</span>
            <span className="text-amber-400">8-Stage Automated Pipeline</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
            {[
              { step: '1', title: 'Product Desc', sub: 'उत्पाद विवरण' },
              { step: '2', title: 'AI Classification', sub: 'एआई वर्गीकरण' },
              { step: '3', title: 'BIS Standard', sub: 'भारतीय मानक' },
              { step: '4', title: 'Requirements', sub: 'वैधानिक शर्तें' },
              { step: '5', title: 'Lab Testing', sub: 'प्रयोगशाला परीक्षण' },
              { step: '6', title: 'NABL Labs', sub: 'मान्यता प्राप्त लैब' },
              { step: '7', title: 'Certification', sub: 'प्रमाणन प्रक्रिया' },
              { step: '8', title: 'Audit Evidence', sub: 'डिजिटल साक्ष्य' }
            ].map((node, idx) => (
              <div 
                key={idx} 
                className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center justify-center hover:border-amber-500/50 transition group"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center mb-1 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                  {node.step}
                </span>
                <span className="font-semibold text-slate-200 text-[11px] leading-tight">{node.title}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{node.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Demo Presets */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
              <Zap className="w-4 h-4" />
              <span>{lang === 'hi' ? 'त्वरित डेमो परिदृश्य (1-क्लिक परीक्षण)' : 'Instant Demo Test Cases (Click to Test)'}</span>
            </span>
            <span className="text-xs text-slate-400">Pre-validated statutory datasets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPreset(preset.name, preset.desc)}
                className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 transition text-left group"
              >
                <span className="text-2xl mt-0.5">{preset.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition truncate">
                      {preset.name}
                    </h4>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-slate-800 text-amber-400 border border-slate-700 whitespace-nowrap ml-2">
                      {preset.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-1">{preset.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition opacity-0 group-hover:opacity-100 flex-shrink-0 self-center" />
              </button>
            ))}
          </div>
        </div>

        {/* Key Statistics Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
          {/* Source label */}
          <div className="col-span-2 md:col-span-4 -mb-2">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">National BIS Registry — Source: BIS.gov.in</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">22,480+</div>
              <div className="text-xs text-slate-400">Indian Standards (IS)</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">718+</div>
              <div className="text-xs text-slate-400">Mandatory QCO Orders</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">1,240+</div>
              <div className="text-xs text-slate-400">Recognized Labs</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">42 Sectors</div>
              <div className="text-xs text-slate-400">Full Coverage</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
