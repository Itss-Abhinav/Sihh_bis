import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle, 
  Clock, 
  FileSpreadsheet, 
  Building, 
  ShieldAlert,
  ChevronRight,
  HelpCircle,
  Award
} from 'lucide-react';

export const ComplianceNavigator: React.FC<{ lang: 'en' | 'hi' }> = ({ lang }) => {
  const [selectedScheme, setSelectedScheme] = useState<'scheme1' | 'scheme2'>('scheme1');
  
  // Interactive readiness checklist
  const [checklist, setChecklist] = useState({
    stdIdentified: true,
    sampleTested: false,
    labReportReady: false,
    factoryAuditReady: false,
    markingPrepared: false,
    authorizedRepresentative: true
  });

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / Object.keys(checklist).length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          <Compass className="w-4 h-4" />
          <span>{lang === 'hi' ? 'प्रमाणन मार्गदर्शक' : 'BIS Certification Roadmap'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'भारतीय मानक ब्यूरो प्रमाणन प्रक्रिया' : 'Step-by-Step Conformity Assessment Navigator'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Navigate statutory requirements for ISI Mark (Scheme-I) and Compulsory Registration Scheme (Scheme-II CRS).
        </p>
      </div>

      {/* Scheme Selector Tabs */}
      <div className="flex space-x-2 mb-8 p-1.5 rounded-xl bg-slate-900 border border-slate-800 max-w-md">
        <button
          onClick={() => setSelectedScheme('scheme1')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition ${
            selectedScheme === 'scheme1'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Scheme-I (ISI Mark)
        </button>
        <button
          onClick={() => setSelectedScheme('scheme2')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition ${
            selectedScheme === 'scheme2'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Scheme-II (CRS - IT & Electronics)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Step-by-Step Process Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {selectedScheme === 'scheme1' ? (
            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Identify Applicable Indian Standard (IS)',
                  desc: 'Determine product specification, raw material constraints, and check whether mandatory Quality Control Order (QCO) is enforced.',
                  form: 'BIS Portal Standard Catalogue'
                },
                {
                  step: '02',
                  title: 'Implement In-House Quality Control & STI',
                  desc: 'Establish manufacturing facility compliant with Scheme of Testing and Inspection (STI). Ensure necessary lab test equipment is calibrated.',
                  form: 'Form V Manufacturing Infrastructure Dossier'
                },
                {
                  step: '03',
                  title: 'Apply for Certification Marks License (CM/L)',
                  desc: 'Submit application online via Manakonline portal with plant layout, machinery details, quality manual, and statutory fees.',
                  form: 'Form I Online Application'
                },
                {
                  step: '04',
                  title: 'Preliminary Factory Inspection by BIS Officer',
                  desc: 'BIS inspecting officer visits the factory premises, audits quality control procedures, draws independent samples for test verification.',
                  form: 'Factory Audit Report (FAR)'
                },
                {
                  step: '05',
                  title: 'Independent Testing in BIS Recognized Lab',
                  desc: 'Drawn samples undergo rigorous clause-by-clause evaluation at BIS Central Laboratory or NABL recognized facility.',
                  form: 'Form VI Test Report'
                },
                {
                  step: '06',
                  title: 'Grant of ISI License & Standard Mark Affixation',
                  desc: 'BIS issues Certification Marks License (CM/L). Manufacturer is authorized to emboss the ISI Mark with CM/L number on retail packages.',
                  form: 'Statutory License Certificate'
                }
              ].map((s) => (
                <div key={s.step} className="p-5 rounded-2xl bg-[#0e172e] border border-slate-800 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">{s.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{s.desc}</p>
                    <div className="mt-2 text-[11px] font-mono text-amber-300 bg-slate-900 px-2.5 py-1 rounded inline-block border border-slate-800">
                      Required Document: {s.form}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Submit Samples to BIS Recognized Lab (LRS)',
                  desc: 'Manufacturer sends production model samples directly to a BIS-recognized laboratory for complete safety evaluation.',
                  form: 'Sample Test Request Letter'
                },
                {
                  step: '02',
                  title: 'Obtain Test Report (Valid for 90 Days)',
                  desc: 'The laboratory issues an official test report verifying compliance with the respective Indian Standard (e.g. IS 16046).',
                  form: 'Laboratory Test Report (BIS Format)'
                },
                {
                  step: '03',
                  title: 'File Online CRS Registration',
                  desc: 'Upload test report and self-declaration affidavit on the official BIS CRS Portal (www.crsbis.in) along with brand authorization.',
                  form: 'Self-Declaration Form B'
                },
                {
                  step: '04',
                  title: 'Grant of CRS Registration Number (R-XXXXXXXX)',
                  desc: 'BIS verifies digital submission and grants Registration Number within 15-20 working days without mandatory pre-grant factory audit.',
                  form: 'CRS Registration Certificate'
                },
                {
                  step: '05',
                  title: 'Affix Standard CRS Label Mark',
                  desc: 'Display standard statement: "Self Declaration - Conforming to IS XXXXX, R-XXXXXXXX" on product and outer carton.',
                  form: 'CRS Packaging Compliance'
                }
              ].map((s) => (
                <div key={s.step} className="p-5 rounded-2xl bg-[#0e172e] border border-slate-800 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">{s.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{s.desc}</p>
                    <div className="mt-2 text-[11px] font-mono text-blue-300 bg-slate-900 px-2.5 py-1 rounded inline-block border border-slate-800">
                      Required Document: {s.form}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Interactive Readiness Audit Checklist */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0e172e] border border-slate-800 shadow-xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Award className="w-4 h-4" />
              <span>Conformity Readiness Audit</span>
            </div>
            <h3 className="text-lg font-bold text-white">Application Checklist</h3>
            <p className="text-xs text-slate-400 mt-1">
              Verify prerequisite preparedness before initiating statutory filings.
            </p>

            {/* Progress Bar */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Readiness Score:</span>
                <span className="font-bold text-amber-400">{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="mt-4 space-y-2.5">
              {[
                { key: 'stdIdentified', label: 'Applicable Indian Standard (IS) Mapped' },
                { key: 'sampleTested', label: 'Samples Tested in NABL / BIS Recognized Lab' },
                { key: 'labReportReady', label: 'Valid Form VI Test Report Issued (< 90 Days)' },
                { key: 'factoryAuditReady', label: 'Scheme of Testing & Inspection (STI) Formulated' },
                { key: 'authorizedRepresentative', label: 'Authorized Indian Representative (AIR) Nominated (for Foreign Brands)' },
                { key: 'markingPrepared', label: 'Standard Mark Artwork & Box Label Proof Prepared' }
              ].map((item) => {
                const checked = checklist[item.key as keyof typeof checklist];
                return (
                  <button
                    key={item.key}
                    onClick={() => toggleChecklist(item.key as keyof typeof checklist)}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 text-left transition"
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                      checked 
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                        : 'border-slate-600 bg-transparent'
                    }`}>
                      {checked && <CheckCircle className="w-3.5 h-3.5 text-slate-950" />}
                    </div>
                    <span className={`text-xs ${checked ? 'text-white font-medium' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Under Section 16 of the BIS Act 2016, no entity shall manufacture or import without valid certification for mandatory QCO goods.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
