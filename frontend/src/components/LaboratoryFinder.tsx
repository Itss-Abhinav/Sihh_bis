import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  Search, 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Filter, 
  ExternalLink 
} from 'lucide-react';
import { Laboratory } from '../types/bis';
import { getLaboratories } from '../services/api';

export const LaboratoryFinder: React.FC<{ lang: 'en' | 'hi' }> = ({ lang }) => {
  const [labs, setLabs] = useState<Laboratory[]>([]);
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const states = [
    'All',
    'Uttar Pradesh',
    'Delhi',
    'Karnataka',
    'Haryana',
    'Maharashtra'
  ];

  useEffect(() => {
    fetchLabs();
  }, [selectedStandard, selectedState]);

  const fetchLabs = async () => {
    const list = await getLaboratories(selectedStandard, selectedState);
    setLabs(list);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          <FlaskConical className="w-4 h-4" />
          <span>{lang === 'hi' ? 'मान्यता प्राप्त प्रयोगशालाएं' : 'Testing Laboratory Directory'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'बीआईएस एवं एनएबीएल मान्यता प्राप्त लैब खोजें' : 'NABL & BIS Recognized Testing Laboratories'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Locate accredited conformity testing centers under BIS Laboratory Recognition Scheme (LRS) for statutory sample testing.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Filter by IS Standard (e.g. IS 16046, IS 302)..."
            value={selectedStandard}
            onChange={(e) => setSelectedStandard(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>State:</span>
          </span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
          >
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Laboratories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="p-5 rounded-2xl bg-[#0e172e] border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-800 text-amber-400 border border-slate-700">
                  {lab.lab_code}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {lab.recognition_type}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mt-1">
                {lab.name}
              </h4>

              <div className="flex items-start space-x-2 text-xs text-slate-400 mt-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>{lab.address}, {lab.city}, {lab.state} - {lab.pincode}</span>
              </div>

              {/* Testing Scope List */}
              <div className="mt-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Recognized Testing Scope ({lab.recognized_is_codes.length} Standards):
                </div>
                <div className="flex flex-wrap gap-1">
                  {lab.recognized_is_codes.slice(0, 3).map((code, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">
                      {code}
                    </span>
                  ))}
                  {lab.recognized_is_codes.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                      +{lab.recognized_is_codes.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex flex-col gap-1.5 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a href={`mailto:${lab.email}`} className="text-slate-300 hover:text-amber-400 transition truncate">
                  {lab.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono">{lab.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
