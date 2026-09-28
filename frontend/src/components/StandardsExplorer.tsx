import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  X,
  Layers
} from 'lucide-react';
import { BISStandard } from '../types/bis';
import { getStandards } from '../services/api';

export const StandardsExplorer: React.FC<{ lang: 'en' | 'hi' }> = ({ lang }) => {
  const [standards, setStandards] = useState<BISStandard[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeModalStandard, setActiveModalStandard] = useState<BISStandard | null>(null);

  const categories = [
    'All',
    'Electronics & IT',
    'Electrical Appliances',
    'Food & Beverages',
    'Lighting & Luminaire',
    'Chemicals & Piping',
    'Consumer & Toys',
    'Automotive & Safety'
  ];

  useEffect(() => {
    fetchStandards();
  }, [search, selectedCategory, selectedStatus]);

  const fetchStandards = async () => {
    const list = await getStandards(search, selectedCategory, selectedStatus);
    setStandards(list);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'hi' ? 'भारतीय मानक निर्देशिका' : 'BIS Standards Catalogue'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'मानक खोज एवं वैधानिक आवश्यकताएं' : 'Explore Indian Standards (IS) & Quality Control Orders'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Search across 22,000+ national standards, mandatory QCO mandates, test clauses, and marking rules.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by IS code, title, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 ml-2"
          >
            <option value="All">All Status</option>
            <option value="MANDATORY">Mandatory (QCO)</option>
            <option value="VOLUNTARY">Voluntary</option>
          </select>
        </div>
      </div>

      {/* Standards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {standards.map((std) => (
          <div
            key={std.id}
            className="p-5 rounded-2xl bg-[#0e172e] border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-amber-400 tracking-wide">
                  {std.is_code}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  std.status === 'MANDATORY' 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}>
                  {std.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition line-clamp-2">
                {std.title}
              </h4>

              <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                {std.scope}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                  {std.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {std.scheme_type}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Tests: {std.tests.length} clauses
              </span>
              <button
                onClick={() => setActiveModalStandard(std)}
                className="inline-flex items-center space-x-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition"
              >
                <span>View Full Standard</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeModalStandard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {activeModalStandard.is_code}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">
                  {activeModalStandard.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalStandard(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Scope & Application:</span>
                <p className="text-slate-300 mt-1 leading-relaxed">{activeModalStandard.scope}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-500">Regulating Authority:</span>
                  <div className="font-medium text-white">{activeModalStandard.ministry}</div>
                </div>
                <div>
                  <span className="text-slate-500">Conformity Scheme:</span>
                  <div className="font-medium text-amber-400">{activeModalStandard.scheme_type}</div>
                </div>
                <div>
                  <span className="text-slate-500">Statutory Status:</span>
                  <div className="font-medium text-rose-400">{activeModalStandard.status}</div>
                </div>
                <div>
                  <span className="text-slate-500">Applicable ITC(HS) Codes:</span>
                  <div className="font-mono text-white">{activeModalStandard.hsn_codes.join(', ')}</div>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Standard Labelling Rules:</span>
                <p className="text-slate-300 mt-1">{activeModalStandard.marking_rules}</p>
              </div>

              <div>
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Prescribed Test Matrix:</span>
                <div className="mt-2 divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden">
                  {activeModalStandard.tests.map((t, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-amber-300">{t.clause}: {t.test_name}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{t.method}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="font-semibold text-emerald-400 text-[11px]">{t.acceptance_criteria}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModalStandard(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
