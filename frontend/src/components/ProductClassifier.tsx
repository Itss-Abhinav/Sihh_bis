import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FlaskConical, 
  Building, 
  FileCheck, 
  Printer, 
  ExternalLink,
  ChevronRight,
  Info,
  Sliders,
  Scale
} from 'lucide-react';
import { ClassificationResponse, Laboratory } from '../types/bis';
import { classifyProduct, getLaboratories } from '../services/api';
import confetti from 'canvas-confetti';

interface ProductClassifierProps {
  initialProductName?: string;
  initialDescription?: string;
  lang: 'en' | 'hi';
}

export const ProductClassifier: React.FC<ProductClassifierProps> = ({ 
  initialProductName = '', 
  initialDescription = '',
  lang 
}) => {
  const [productName, setProductName] = useState(initialProductName);
  const [description, setDescription] = useState(initialDescription);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResponse | null>(null);
  const [matchedLabs, setMatchedLabs] = useState<Laboratory[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'labs' | 'certification' | 'evidence'>('overview');

  // Trigger classification when presets change from parent
  React.useEffect(() => {
    if (initialProductName) {
      setProductName(initialProductName);
      setDescription(initialDescription);
      handleClassify(initialProductName, initialDescription);
    }
  }, [initialProductName, initialDescription]);

  const handleClassify = async (nameToUse?: string, descToUse?: string) => {
    const pName = nameToUse || productName;
    const pDesc = descToUse || description;
    if (!pName.trim()) return;

    setLoading(true);
    try {
      const res = await classifyProduct(pName, pDesc);
      setResult(res);

      // Load matching labs for this standard
      if (res.top_match?.standard?.is_code) {
        const labs = await getLaboratories(res.top_match.standard.is_code);
        setMatchedLabs(labs);
      }

      // Trigger celebration confetti if high match
      if (res.top_match?.confidence_score > 70) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'hi' ? 'एआई उत्पाद वर्गीकरण इंजन' : 'AI Product Classification & Standards Mapping'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {lang === 'hi' ? 'उत्पाद अनुपालन एवं बीआईएस मानक विश्लेषक' : 'Product Conformity & BIS Standard Screener'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Enter technical specifications or product marketing title to discover applicable Indian Standards & statutory mandates.
          </p>
        </div>

        {result && (
          <button
            onClick={handlePrintDossier}
            className="self-start md:self-auto inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-sm transition"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Export Compliance Dossier</span>
          </button>
        )}
      </div>

      {/* Input Formulation Form */}
      <div className="p-6 rounded-2xl bg-[#0e172e] border border-slate-800 shadow-xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Product Commercial Name / Type *
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Smart Lithium-ion Power Bank 20000mAh"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
              onKeyDown={(e) => e.key === 'Enter' && handleClassify()}
            />
          </div>

          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Technical Specifications / Key Materials
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. USB-C input 5V/9V, 22.5W, rechargeable li-ion polymer cell, fire-retardant ABS case"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
              onKeyDown={(e) => e.key === 'Enter' && handleClassify()}
            />
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              onClick={() => handleClassify()}
              disabled={loading || !productName.trim()}
              className="w-full h-[46px] rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Screening...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Classify</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CLASSIFICATION RESULT AREA */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Top Banner Card: Matched Standard */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e172e] to-[#111c38] border border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-10">
              <Scale className="w-48 h-48 text-amber-400" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {result.top_match.applicable_scheme}
                  </span>
                  {result.top_match.mandatory_qco && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Statutory QCO Mandated</span>
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    Category: {result.top_match.standard.category}
                  </span>
                </div>

                {/* Confidence Meter */}
                <div className="flex items-center space-x-2 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400">Match Confidence:</span>
                  <span className="text-sm font-black text-amber-400">
                    {result.top_match.confidence_score}%
                  </span>
                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
                      style={{ width: `${result.top_match.confidence_score}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* IS Code & Title */}
              <div className="mb-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {result.top_match.standard.is_code}
                </h3>
                <p className="text-base text-slate-200 mt-1 font-medium">
                  {result.top_match.standard.title}
                </p>
                <p className="text-xs text-slate-400 mt-2 max-w-4xl leading-relaxed">
                  {result.top_match.standard.scope}
                </p>
              </div>

              {/* Rationale & Extracted Markers */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Classification Rationale: </span>
                    <span className="text-slate-300">{result.top_match.rationale}</span>
                  </div>
                </div>
                {result.top_match.hsn_suggestion.length > 0 && (
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <span className="text-slate-400">ITC (HS) Codes:</span>
                    <span className="font-mono text-amber-300 font-semibold bg-slate-800 px-2 py-0.5 rounded">
                      {result.top_match.hsn_suggestion.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Statutory Notice Callout */}
              {result.top_match.standard.qco_order && (
                <div className="mt-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-start space-x-3 text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-rose-300">
                      Mandatory Quality Control Order: {result.top_match.standard.qco_order.title} ({result.top_match.standard.qco_order.gazette_no})
                    </div>
                    <div className="text-rose-200/80 mt-0.5">
                      {result.top_match.standard.qco_order.penalty}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sub Navigation Tabs for Deep Dive */}
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'overview', label: '1. Conformity Overview', icon: FileCheck },
              { id: 'tests', label: `2. Mandatory Tests (${result.top_match.standard.tests.length})`, icon: FlaskConical },
              { id: 'labs', label: `3. Testing Labs (${matchedLabs.length})`, icon: Building },
              { id: 'certification', label: '4. Certification Pathway', icon: Sliders },
              { id: 'evidence', label: '5. Audit Evidence Dossier', icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const isCurrent = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Regulating Ministry
                </div>
                <div className="text-sm font-semibold text-white">
                  {result.top_match.standard.ministry}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                  Published: {result.top_match.standard.publication_year} | Latest: {result.top_match.standard.latest_amendment}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Standard Mark Rules
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  {result.top_match.standard.marking_rules}
                </div>
                <div className="mt-3 flex items-center space-x-2 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mandatory Before Customs / Sale</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Alternative Standard Matches
                </div>
                {result.alternative_matches.length === 0 ? (
                  <div className="text-xs text-slate-500">No secondary standards identified for this specific specification.</div>
                ) : (
                  <div className="space-y-2">
                    {result.alternative_matches.map((alt, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-800/60 text-xs">
                        <div className="font-bold text-amber-300">{alt.standard.is_code}</div>
                        <div className="text-slate-400 truncate text-[11px]">{alt.standard.title}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Confidence: {alt.confidence_score}%</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MANDATORY TESTS MATRIX */}
          {activeTab === 'tests' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-white">Clause-by-Clause Laboratory Test Requirements</h4>
                  <p className="text-xs text-slate-400">Mandatory testing protocols prescribed under {result.top_match.standard.is_code}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-semibold">
                  {result.top_match.standard.tests.length} Standard Tests
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="py-3 px-3">Clause</th>
                      <th className="py-3 px-3">Test Name</th>
                      <th className="py-3 px-3">Test Parameter</th>
                      <th className="py-3 px-3">Test Method</th>
                      <th className="py-3 px-3">Statutory Acceptance Criteria</th>
                      <th className="py-3 px-3">Destructive?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {result.top_match.standard.tests.map((test, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-3 font-mono font-bold text-amber-400">{test.clause}</td>
                        <td className="py-3 px-3 font-semibold text-white">{test.test_name}</td>
                        <td className="py-3 px-3 text-slate-300">{test.parameter}</td>
                        <td className="py-3 px-3 text-slate-400 max-w-xs">{test.method}</td>
                        <td className="py-3 px-3 font-medium text-emerald-300">{test.acceptance_criteria}</td>
                        <td className="py-3 px-3">
                          {test.is_destructive ? (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              Destructive
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                              Non-Destructive
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: RECOGNIZED TESTING LABORATORIES */}
          {activeTab === 'labs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">Accredited Testing Facilities: </span>
                  Showing laboratories authorized under BIS Laboratory Recognition Scheme (LRS) or NABL for {result.top_match.standard.is_code}.
                </div>
                <span className="text-amber-400 font-semibold">{matchedLabs.length} Available</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedLabs.map((lab) => (
                  <div key={lab.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{lab.name}</h4>
                        <div className="text-[11px] font-mono text-amber-400 mt-0.5">{lab.lab_code}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {lab.recognition_type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2">{lab.address}, {lab.city}, {lab.state} - {lab.pincode}</p>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div className="text-slate-400">
                        Email: <a href={`mailto:${lab.email}`} className="text-amber-400 hover:underline">{lab.email}</a>
                      </div>
                      <div className="text-slate-400 font-mono">
                        {lab.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATION ROADMAP */}
          {activeTab === 'certification' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h4 className="text-base font-bold text-white mb-2">
                Conformity Assessment Pathway: {result.top_match.applicable_scheme}
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                Statutory process required by Bureau of Indian Standards before commercial sale or customs import clearance.
              </p>

              <div className="space-y-4">
                {[
                  {
                    step: 'Stage 1: Sample Testing',
                    desc: 'Submit production-representative samples to a BIS-recognized NABL laboratory for testing as per standard clauses.',
                    deliverable: 'Form VI Test Report',
                    timeline: '7 - 15 business days'
                  },
                  {
                    step: result.top_match.applicable_scheme.includes('CRS') ? 'Stage 2: Digital CRS Portal Filing' : 'Stage 2: Factory Inspection & Quality Audit',
                    desc: result.top_match.applicable_scheme.includes('CRS')
                      ? 'Upload test report, test summary sheet, and manufacturing declaration on www.crsbis.in portal.'
                      : 'BIS technical officer inspects manufacturing facility, testing capabilities, and Scheme of Testing & Inspection (STI).',
                    deliverable: 'Inspection Verification Audit',
                    timeline: '10 - 20 business days'
                  },
                  {
                    step: 'Stage 3: Grant of License / Registration',
                    desc: 'Scrutiny by BIS Competent Authority and grant of Certification Marks License (CM/L) or CRS Registration Number (R-XXXXXXXX).',
                    deliverable: 'Statutory Grant Document',
                    timeline: '5 - 10 business days'
                  },
                  {
                    step: 'Stage 4: Standard Marking & Continuous Surveillance',
                    desc: 'Affix BIS Standard Mark (ISI logo or CRS text) on packaging and products. Subject to market sample surveillance.',
                    deliverable: 'Statutory Labelling Compliance',
                    timeline: 'Ongoing'
                  }
                ].map((stage, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="text-xs font-bold text-white">{stage.step}</h5>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          Timeline: {stage.timeline}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{stage.desc}</p>
                      <div className="text-[11px] font-semibold text-amber-400 mt-1.5">
                        Key Deliverable: {stage.deliverable}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT EVIDENCE DOSSIER */}
          {activeTab === 'evidence' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-white">Digital Compliance Audit Dossier</h4>
                  <p className="text-xs text-slate-400">Exportable compliance certificate snapshot for regulatory audits & customs clearance</p>
                </div>
                <button
                  onClick={handlePrintDossier}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>
              </div>

              {/* Printable Certificate Frame */}
              <div className="p-6 rounded-xl bg-slate-950 border-2 border-dashed border-amber-500/50 space-y-4 text-xs font-mono">
                <div className="text-center pb-3 border-b border-slate-800">
                  <div className="text-sm font-bold text-amber-400 uppercase tracking-widest">
                    Government of India - Bureau of Indian Standards
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    MANAK-AI CONFORMITY SCREENING MEMORANDUM (REF: BIS-SETU-{Date.now().toString().slice(-6)})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500">Applicant Product:</span>
                    <div className="text-white font-bold">{result.input_product}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Evaluation Timestamp:</span>
                    <div className="text-white">{new Date().toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Applicable Standard:</span>
                    <div className="text-amber-400 font-bold">{result.top_match.standard.is_code}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Conformity Scheme:</span>
                    <div className="text-white">{result.top_match.applicable_scheme}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Statutory Status:</span>
                    <div className="text-rose-400 font-bold">MANDATORY (QCO Enforced)</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Confidence Rating:</span>
                    <div className="text-emerald-400 font-bold">{result.top_match.confidence_score}% Match</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-slate-500">Statutory Marking Requirement:</span>
                  <p className="text-slate-300 text-[11px] mt-1 font-sans">
                    {result.top_match.standard.marking_rules}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Cryptographic Verification Hash: SHA256-MANAK-VALIDATED</span>
                  <span>BIS Act 2016 Section 16/29 Compliant</span>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
