export type ProvenanceState = 'MEASURED' | 'READ' | 'LOOK' | 'VOID';

export interface RoomZone {
  id: string;
  name: string;
  dimensions_mm: [number, number];
  area_sqm: number;
  bbox: [number, number, number, number]; // [x, y, w, h]
  tag_coord: [number, number];
  hvac_served_by: string;
  provenance: ProvenanceState;
}

export interface DuctRun {
  id: string;
  system: 'Supply Air' | 'Return Air' | 'Toilet Exhaust Air' | 'Fresh Air';
  color: string;
  section_mm: [number, number];
  length_m: number;
  perimeter_mm: number;
  is655_gauge: number;
  sheet_metal_thickness_mm: number;
  surface_area_sqm: number;
  insulation_area_sqm: number;
  weight_kg: number;
  path: [number, number][]; // 2D points on blueprint
  provenance: ProvenanceState;
  formula_ref: string;
}

export interface AirTerminal {
  id: string;
  tag: string;
  type: string;
  dimensions_mm: [number, number];
  airflow_cfm: number;
  count: number;
  color: string;
  positions: [number, number][];
  provenance: ProvenanceState;
  provenance_note: string;
}

export interface FireDamper {
  id: string;
  tag: string;
  type: string;
  size_mm: [number, number];
  wall_rating: string;
  coord: [number, number];
  provenance: ProvenanceState;
  provenance_note: string;
}

export interface EquipmentItem {
  tag: string;
  type: string;
  capacity_tr: number;
  airflow_cfm: number;
  location: string;
  bbox: [number, number, number, number];
  provenance: ProvenanceState;
  provenance_note: string;
}

export interface ReviewItem {
  id: string;
  item_type: 'equipment' | 'duct_size' | 'damper' | 'scale';
  tag: string;
  candidate_value: string;
  unit: string;
  location: string;
  confidence_note: string;
  provenance: ProvenanceState;
  crop_bbox: [number, number, number, number];
  alternatives: string[];
  status: 'pending' | 'approved' | 'edited' | 'rejected';
  user_value?: string;
}

export interface BOQItem {
  id: string;
  csi_code: string;
  description: string;
  trade: string;
  quantity: number;
  unit: string;
  unit_rate_usd: number;
  total_usd: number;
  unit_rate_inr?: number;
  total_inr?: number;
  currency?: 'INR' | 'USD';
  provenance: ProvenanceState;
  source_sheet: string;
  source_ref: string;
  standard_ref: string;
}

// ==========================================
// TENDER HUNTING & PRE-QUALIFICATION TYPES
// ==========================================
export interface TenderItem {
  id: string;
  tender_ref: string;
  title: string;
  authority: string;
  portal_source: string; // eProcure CPPP, GeM, MahaTenders, NTPC, SAM.gov, GovTribe
  estimated_value_cr: number;
  emd_amount_lakh: number;
  estimated_value_usd?: number;
  bid_bond_usd?: number;
  currency?: 'INR' | 'USD';
  submission_deadline: string;
  location: string;
  status: 'DISCOVERED' | 'EVALUATING' | 'GO' | 'CONDITIONAL_GO' | 'NO_GO';
  pq_score: number; // 0 - 100
  match_confidence: number; // 0 - 100%
  volumes_count: number;
  tags: string[];
}

export interface PQRule {
  id: string;
  category: 'Financial Turnover' | 'Past Experience' | 'Net Worth & Solvency' | 'Defect Liability' | 'JV & Consortium' | 'Compliance & Legal';
  rule_title: string;
  required_threshold: string;
  company_actual: string;
  status: 'PASS' | 'FAIL' | 'FLAG';
  showstopper: boolean;
  citation_doc: string;
  page_number: number;
  clause_ref: string;
  extracted_clause_text: string;
}

export interface GoNoGoFactor {
  dimension: string;
  weight: number;
  score: number; // 0 - 10
  rationale: string;
  status: 'favorable' | 'moderate' | 'unfavorable';
}

// ==========================================
// CONTRACT INTELLIGENCE & CONTRADICTIONS
// ==========================================
export interface ContradictionItem {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  title: string;
  trade_domain: 'Electrical' | 'Mechanical' | 'Commercial' | 'Structural';
  doc_a: {
    name: string;
    section: string;
    clause: string;
    page: number;
    text: string;
  };
  doc_b: {
    name: string;
    section: string;
    clause: string;
    page: number;
    text: string;
  };
  conflict_summary: string;
  financial_exposure_note: string;
  rfi_generated: boolean;
}

export interface PreBidQuery {
  id: string;
  query_no: string;
  doc_reference: string;
  clause_no: string;
  page_no: number;
  original_clause: string;
  contractor_concern: string;
  requested_amendment: string;
  category: 'Commercial' | 'Technical' | 'Legal';
  status: 'DRAFT' | 'READY_TO_SUBMIT' | 'CLIENT_ANSWERED';
}

export interface MultiRoleSynopsis {
  executive: {
    project_scope: string;
    estimated_value: string;
    timeline_months: number;
    completion_deadline: string;
    overall_risk_rating: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
    strategic_fit: string;
    key_decision_triggers: string[];
  };
  legal: {
    overall_liability_cap: string;
    liquidated_damages: string;
    dispute_resolution: string;
    governing_law: string;
    termination_clauses: string;
    indemnity_obligations: string;
    force_majeure_scope: string;
  };
  commercial: {
    emd_and_pbg: string;
    payment_terms: string[];
    mobilization_advance: string;
    retention_money: string;
    price_variation_clause: string;
    statutory_taxes_duties: string;
  };
  technical: {
    scope_inclusions: string[];
    scope_exclusions: string[];
    approved_makes: { category: string; makes: string[] }[];
    design_standards: string[];
    warranty_terms: string;
  };
}

export interface RiskMatrixItem {
  id: string;
  risk_category: 'Contractual' | 'Site & Environmental' | 'Supply Chain' | 'Financial & Cashflow';
  title: string;
  likelihood: number; // 1 to 5
  cost_impact: number; // 1 to 5
  calculated_score: number; // likelihood * impact (1 to 25)
  severity: 'EXTREME' | 'HIGH' | 'MEDIUM' | 'LOW';
  internal_lessons_learned: string;
  recommended_mitigation: string;
  external_scan_data?: string;
}

// ==========================================
// BID SUBMISSION PRO & KNOWLEDGE BASE
// ==========================================
export interface SubmissionForm {
  id: string;
  form_code: string;
  form_name: string;
  category: 'General' | 'Financial' | 'Experience' | 'Technical';
  fields_total: number;
  fields_autofilled: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NEEDS_INPUT';
  key_fields: { label: string; value: string; source: string; verified: boolean }[];
}

export interface AttachmentItem {
  id: string;
  title: string;
  tender_requirement: string;
  citation_page: number;
  matched_file_name: string;
  matched_file_date: string;
  validity_status: 'VALID' | 'EXPIRING_SOON' | 'MISSING';
  file_size_kb: number;
  is_attached: boolean;
}

// ==========================================
// VENDOR SOURCING & BID LEVELING
// ==========================================
export interface SubcontractorQuote {
  vendor_id: string;
  vendor_name: string;
  contact_person: string;
  quoted_base_usd: number;
  delivery_weeks: number;
  warranty_months: number;
  detected_exclusions: string[];
  normalized_additions_usd: number;
  final_leveled_usd: number;
  quoted_base_inr?: number;
  normalized_additions_inr?: number;
  final_leveled_inr?: number;
  currency?: 'INR' | 'USD';
  rank: number;
  compliance_rating: 'FULL' | 'PARTIAL' | 'NON_COMPLIANT';
}

export type ActiveTab = 
  | 'tenders'     // 75+ Portals, PQ Engine, Go/No-Go
  | 'contracts'   // Contradictions, Multi-Role Synopsis, RFIs, Risk Heatmap, LD Slider
  | 'workspace'   // 2D Vector Takeoff, 3D BIM Estimodeling, Scale Calibrator
  | 'boq'         // Live Interactive Spreadsheet Grid
  | 'submission'  // Blank Form Autofill, Attachment Matcher, Master PDF Export
  | 'leveling'    // Subcontractor Bid Leveling Matrix
  | 'overview'    // Project Dashboard
  | 'review';     // Flagged Review Queue

export type DensityMode = 'comfortable' | 'compact';
export type ThemeMode = 'light' | 'dark';
export type MeasureTool = 'select' | 'length' | 'area' | 'count' | 'calibrate';
export type CanvasDisplayMode = '2D_VECTOR' | '3D_BIM' | 'SPLIT_VIEW';

// ==========================================
// UNIFIED PURSUIT GRAPH & DECISION INBOX TYPES
// ==========================================
export type RoleLens = 'all' | 'legal' | 'commercial' | 'technical' | 'executive';
export type MarketMode = 'IN' | 'US';

export type PursuitStage = 
  | 'discover'   // Stage 0: Discover & Intake
  | 'decide'     // Stage 1: Decide (Go/No-Go Gate)
  | 'clarify'    // Stage 2: Clarify (RFIs, Contradictions, LDs)
  | 'quantify'   // Stage 3: Quantify (2D/3D Takeoff)
  | 'inbox'      // Stage 4: Triage (Unified Decision Inbox)
  | 'price'      // Stage 5: Price & Level (Client BOQ & Subcontractor Matrix)
  | 'assemble'   // Stage 6: Assemble (Submission Pro & Compliance Matcher)
  | 'learn';     // Stage 7: Submit & Learn (Post-Bid Feedback Loop)

export interface UnifiedDecision {
  id: string;
  category: 'quantity' | 'contradiction' | 'pq_rule' | 'vendor_gap' | 'form_field';
  title: string;
  claim: string;
  why_needs_human: string;
  candidate_value: string;
  unit?: string;
  evidence: {
    document_name: string;
    section: string;
    clause?: string;
    page: number;
    snippet: string;
    crop_bbox?: [number, number, number, number];
  };
  alternatives: string[];
  impacts: {
    affects_boq_code?: string;
    affects_rfi_id?: string;
    affects_risk_score?: number;
    financial_impact_cr?: number;
  };
  status: 'pending' | 'approved' | 'edited' | 'rejected';
  user_value?: string;
}

export interface PursuitMetadata {
  id: string;
  tender_ref: string;
  name: string;
  authority: string;
  value_cr: number;
  location: string;
  deadlines: {
    pre_bid_queries: string;
    pre_bid_queries_days_left: number;
    pre_bid_meeting: string;
    bid_submission: string;
    bid_submission_days_left: number;
    validity_days: number;
  };
  active_stage: PursuitStage;
  active_lens: RoleLens;
}

