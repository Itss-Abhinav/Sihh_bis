import { BIS_STANDARDS_MOCK, LABORATORIES_MOCK, AUDIT_LOGS_MOCK } from '../data/standardsData';
import { BISStandard, Laboratory, ClassificationResponse, MatchedStandardResult, AuditLog } from '../types/bis';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function classifyProduct(productName: string, description?: string): Promise<ClassificationResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_name: productName, description: description || '' }),
      signal: AbortSignal.timeout(2500)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Graceful fallback to client-side deterministic & heuristic engine
  }

  // Client-side deterministic classification
  const text = `${productName} ${description || ''}`.toLowerCase();
  const scores: MatchedStandardResult[] = [];
  const detectedKeywords: string[] = [];

  for (const std of BIS_STANDARDS_MOCK) {
    let matchCount = 0;
    const reasons: string[] = [];

    for (const kw of std.keywords) {
      if (text.includes(kw.toLowerCase())) {
        matchCount++;
        reasons.push(`Contains statutory keyword '${kw}'`);
        detectedKeywords.push(kw);
      }
    }

    if (text.includes(std.category.toLowerCase())) {
      matchCount += 2;
      reasons.push(`Direct category match: ${std.category}`);
    }

    if (matchCount > 0) {
      const score = Math.min(98.5, 60.0 + matchCount * 12.5);
      const rationale = `Classified under ${std.is_code} based on ${reasons.length} statutory markers: ${reasons.slice(0, 3).join(', ')}. Subject to ${std.scheme_type} regulation.`;
      scores.push({
        standard: std,
        confidence_score: Number(score.toFixed(1)),
        rationale,
        match_reasons: reasons,
        mandatory_qco: std.status === 'MANDATORY',
        applicable_scheme: std.scheme_type,
        hsn_suggestion: std.hsn_codes
      });
    }
  }

  scores.sort((a, b) => b.confidence_score - a.confidence_score);

  const topMatch = scores[0] || {
    standard: BIS_STANDARDS_MOCK[0],
    confidence_score: 52.0,
    rationale: "Defaulted to nearest consumer standard based on generic electronics classification.",
    match_reasons: ["General classification heuristic applied"],
    mandatory_qco: true,
    applicable_scheme: BIS_STANDARDS_MOCK[0].scheme_type,
    hsn_suggestion: BIS_STANDARDS_MOCK[0].hsn_codes
  };

  return {
    input_product: productName,
    top_match: topMatch,
    alternative_matches: scores.slice(1, 3),
    extracted_features: {
      detected_keywords: Array.from(new Set(detectedKeywords)),
      inferred_voltage: text.includes('volt') || text.includes('230v') ? 'Household AC (~230V)' : undefined,
      is_portable: text.includes('portable') || text.includes('handheld') || text.includes('mobile')
    },
    total_matches_found: scores.length
  };
}

export async function getStandards(query?: string, category?: string, status?: string): Promise<BISStandard[]> {
  try {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    if (status) params.append('status', status);

    const res = await fetch(`${API_BASE_URL}/api/standards?${params.toString()}`, {
      signal: AbortSignal.timeout(2000)
    });
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }

  let list = [...BIS_STANDARDS_MOCK];
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(s => 
      s.is_code.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.keywords.some(k => k.toLowerCase().includes(q))
    );
  }
  if (category && category !== 'All') {
    list = list.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }
  if (status && status !== 'All') {
    list = list.filter(s => s.status.toLowerCase() === status.toLowerCase());
  }
  return list;
}

export async function getLaboratories(isCode?: string, state?: string): Promise<Laboratory[]> {
  try {
    const params = new URLSearchParams();
    if (isCode) params.append('is_code', isCode);
    if (state) params.append('state', state);

    const res = await fetch(`${API_BASE_URL}/api/laboratories?${params.toString()}`, {
      signal: AbortSignal.timeout(2000)
    });
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }

  let list = [...LABORATORIES_MOCK];
  if (isCode) {
    list = list.filter(l => l.recognized_is_codes.some(c => c.toLowerCase().includes(isCode.toLowerCase())));
  }
  if (state && state !== 'All') {
    list = list.filter(l => l.state.toLowerCase() === state.toLowerCase());
  }
  return list;
}

export async function sendChatMessage(message: string): Promise<{ reply: string; referenced_standards: string[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }

  const msg = message.toLowerCase();
  const referenced: string[] = [];
  let reply = '';

  if (msg.includes('penalty') || msg.includes('fine') || msg.includes('jail') || msg.includes('punishment')) {
    reply = "Under Section 29 of the Bureau of Indian Standards Act, 2016, manufacturing, importing, or selling goods notified under a mandatory Quality Control Order (QCO) without a valid BIS Standard Mark is punishable with imprisonment up to two years, or a fine not less than INR 2,00,000 (which may extend up to ten times the value of goods), or both.";
  } else if (msg.includes('scheme') || msg.includes('isi') || msg.includes('crs')) {
    reply = "BIS operates two major conformity schemes:\n1. Scheme-I (ISI Mark): Requires mandatory factory inspection, laboratory quality audit, and grant of CM/L license.\n2. Scheme-II (CRS): Compulsory Registration Scheme for electronics/IT where test reports from BIS-recognized labs are submitted online to obtain an R-Number.";
    referenced.push('IS 16046 (Part 2): 2018', 'IS 302 (Part 2/Sec 201): 2008');
  } else if (msg.includes('battery') || msg.includes('power bank')) {
    reply = "Secondary lithium cells and batteries for portable applications are strictly governed by IS 16046 (Part 2): 2018 / IEC 62133-2 under the MeitY Compulsory Registration Scheme (CRS).";
    referenced.push('IS 16046 (Part 2): 2018');
  } else if (msg.includes('water')) {
    reply = "Packaged drinking water is covered under IS 14543: 2024. Certification is 100% compulsory with both chemical (TDS 75-500 mg/L) and microbiological testing (zero E. Coli).";
    referenced.push('IS 14543: 2024');
  } else {
    reply = "Manak-AI Regulatory Assistant: Bureau of Indian Standards standards are legally enforceable under the BIS Act, 2016. Ask about electrical appliances, lithium batteries, packaged water, toys, or specific test methods!";
  }

  return { reply, referenced_standards: referenced };
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/audit-logs`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return await res.json();
  } catch {}
  return AUDIT_LOGS_MOCK;
}
