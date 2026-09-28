export type SchemeType = 'Scheme-I (ISI Mark)' | 'Scheme-II (CRS)' | 'Scheme-IV';

export interface TestRequirement {
  clause: string;
  test_name: string;
  parameter: string;
  method: string;
  acceptance_criteria: string;
  sample_size?: string;
  is_destructive: boolean;
}

export interface QCOOrder {
  title: string;
  gazette_no: string;
  date: string;
  enforcement_date: string;
  penalty: string;
}

export interface BISStandard {
  id: string;
  is_code: string;
  title: string;
  category: string;
  scope: string;
  status: 'MANDATORY' | 'VOLUNTARY';
  scheme_type: SchemeType;
  ministry: string;
  publication_year: number;
  latest_amendment: string;
  hsn_codes: string[];
  marking_rules: string;
  keywords: string[];
  qco_order?: QCOOrder;
  tests: TestRequirement[];
}

export interface Laboratory {
  id: string;
  name: string;
  lab_code: string;
  recognition_type: 'BIS Central Lab' | 'NABL Accredited' | 'BIS Recognized (LRS)';
  address: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  phone: string;
  recognized_is_codes: string[];
}

export interface MatchedStandardResult {
  standard: BISStandard;
  confidence_score: number;
  rationale: string;
  match_reasons: string[];
  mandatory_qco: boolean;
  applicable_scheme: string;
  hsn_suggestion: string[];
}

export interface ClassificationResponse {
  input_product: string;
  top_match: MatchedStandardResult;
  alternative_matches: MatchedStandardResult[];
  extracted_features: {
    detected_keywords: string[];
    inferred_voltage?: string;
    is_portable: boolean;
  };
  total_matches_found: number;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  details: string;
  timestamp: string;
}
