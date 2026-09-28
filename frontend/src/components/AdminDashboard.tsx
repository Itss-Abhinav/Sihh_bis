import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  AlertOctagon, 
  Activity, 
  Users, 
  Database, 
  RefreshCw, 
  FileCheck2, 
  ArrowUpRight 
} from 'lucide-react';
import { AuditLog } from '../types/bis';
import { getAuditLogs } from '../services/api';

export const AdminDashboard: React.FC<{ lang: 'en' | 'hi' }> = ({ lang }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const data = await getAuditLogs();
    setLogs(data);
  };

  const handleSyncGazette = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      loadLogs();
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>{lang === 'hi' ? 'नियामक निगरानी केंद्र' : 'Regulatory Surveillance Hub'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {lang === 'hi' ? 'बीआईएस मानक अनुपालन निगरानी डैशबोर्ड' : 'Market Surveillance & Enforcement Dashboard'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time screening metrics, audit trails, and statutory QCO enforcement operations under the BIS Act, 2016.
          </p>
        </div>

        <button
          onClick={handleSyncGazette}
          disabled={syncing}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Syncing Gazette...' : 'Sync Gazette Registry'}</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Mandatory QCO Coverage', val: '718 Orders', icon: AlertOctagon, color: 'text-rose-400', bg: 'bg-rose-500/10' },
          { label: 'Indian Standards (IS)', val: '22,480 Active', icon: Database, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Recognized Testing Labs', val: '1,240 Facilities', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Screening Accuracy', val: '99.4% Deterministic', icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-500/10' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-[#0e172e] border border-slate-800 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{kpi.label}</span>
                <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-extrabold text-white mt-3">{kpi.val}</div>
            </div>
          );
        })}
      </div>

      {/* Audit Trail and Sectors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Live Audit Logs */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0e172e] border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Statutory Screening Audit Trail</h3>
              <p className="text-xs text-slate-400">Cryptographically verifiable log of citizen and manufacturer classifications</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 text-xs font-mono border border-slate-800">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {log.action}
                    </span>
                    <span className="font-semibold text-slate-300">{log.actor}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-slate-400 mt-1.5 leading-relaxed">{log.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: High-Risk Sector Surveillance */}
        <div className="p-6 rounded-2xl bg-[#0e172e] border border-slate-800 shadow-xl">
          <h3 className="text-base font-bold text-white mb-1">Priority Surveillance Sectors</h3>
          <p className="text-xs text-slate-400 mb-4">Industries under intense QCO compliance scrutiny</p>

          <div className="space-y-3 text-xs">
            {[
              { sector: 'Secondary Lithium Cells & Power Banks', is: 'IS 16046', risk: 'High Risk' },
              { sector: 'Electric Heating & Water Appliances', is: 'IS 302', risk: 'Critical' },
              { sector: 'Packaged Drinking & Mineral Water', is: 'IS 14543', risk: 'Critical' },
              { sector: 'LED Drivers & Commercial Lighting', is: 'IS 15885', risk: 'High Risk' },
              { sector: 'Children Toys & Mechanical Safety', is: 'IS 9873', risk: 'Strict Enforcement' }
            ].map((sec, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{sec.sector}</div>
                  <div className="text-[10px] font-mono text-amber-400 mt-0.5">{sec.is}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {sec.risk}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
