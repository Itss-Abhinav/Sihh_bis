import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  Calendar, 
  ExternalLink, 
  ShieldAlert, 
  Scale,
  Clock
} from 'lucide-react';
import { BIS_STANDARDS_MOCK } from '../data/standardsData';

export const QcoTracker: React.FC<{ lang: 'en' | 'hi' }> = ({ lang }) => {
  const qcos = BIS_STANDARDS_MOCK
    .filter(s => s.qco_order)
    .map(s => ({
      standard: s.is_code,
      product: s.title,
      category: s.category,
      ministry: s.ministry,
      ...s.qco_order!
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          <FileText className="w-4 h-4" />
          <span>{lang === 'hi' ? 'गुणवत्ता नियंत्रण आदेश (QCO)' : 'Mandatory QCO Gazette Tracker'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'भारत का राजपत्र - वैधानिक अधिसूचनाएं' : 'The Gazette of India - Mandatory Quality Control Orders'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Continuous tracking of mandatory orders notified by Government of India ministries under Section 16 of the BIS Act, 2016.
        </p>
      </div>

      {/* Statutory Advisory Callout */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 mb-8 flex items-start space-x-3 text-xs">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300">Mandatory Statutory Compliance Notice: </span>
          <span className="text-slate-300 leading-relaxed">
            Goods notified under Quality Control Orders (QCO) cannot be manufactured, imported, distributed, or sold in the Indian market without obtaining a valid BIS Standard Mark. Violation attracts criminal liability and asset seizure under Section 29 & 30 of the BIS Act, 2016.
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="space-y-4">
        {qcos.map((qco, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#0e172e] border border-slate-800 hover:border-slate-700 transition shadow-lg"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {qco.standard}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                    <span>Statutory Mandate Enforced</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                    {qco.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {qco.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Product Scope: {qco.product}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <div>
                    <span className="text-slate-500">Gazette Ref: </span>
                    <span className="font-mono text-slate-300 font-semibold">{qco.gazette_no}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Notification Date: </span>
                    <span className="text-slate-300">{qco.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Enforcement Date: </span>
                    <span className="text-emerald-400 font-semibold">{qco.enforcement_date}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Issuing Ministry: </span>
                    <span className="text-slate-300">{qco.ministry}</span>
                  </div>
                </div>
              </div>

              {/* Penalty Card */}
              <div className="lg:w-80 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-rose-400 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Statutory Penalties</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {qco.penalty}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
