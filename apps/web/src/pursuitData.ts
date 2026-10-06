import type { PursuitMetadata, UnifiedDecision } from './types';

export const DEFAULT_PURSUIT: PursuitMetadata = {
  id: 'PURSUIT-2026-MANIPAL',
  tender_ref: 'KCEPL/TND/2026/0891',
  name: 'Manipal Sports Complex - Turnkey HVAC & MEP Package',
  authority: 'Manipal Academy of Higher Education (MAHE)',
  value_cr: 84.50,
  location: 'Manipal, Karnataka',
  deadlines: {
    pre_bid_queries: 'Oct 10, 2026',
    pre_bid_queries_days_left: 4,
    pre_bid_meeting: 'Oct 12, 2026 (11:00 AM IST)',
    bid_submission: 'Oct 25, 2026 (03:00 PM IST)',
    bid_submission_days_left: 19,
    validity_days: 120
  },
  active_stage: 'inbox',
  active_lens: 'all'
};

export const INITIAL_UNIFIED_DECISIONS: UnifiedDecision[] = [
  {
    id: 'DEC-01',
    category: 'quantity',
    title: 'Confirm Equipment Airflow & Sizing (FF-FA-AHU-05)',
    claim: 'FF-FA-AHU-05 serves Pickleball & Badminton Hall with 26.5 TR capacity and 9,500 CFM airflow',
    why_needs_human: 'Vector stroke text recognition confidence is 94% on First Floor Drawing KCEPL/HVAC/007 R1',
    candidate_value: '26.5 TR · 9,500 CFM',
    evidence: {
      document_name: 'KCEPL/HVAC/007 R1',
      section: 'First Floor Layout',
      clause: 'AHU Room Grid C37-C41',
      page: 1,
      snippet: 'FF-FA-AHU-05 · 26.5 TR · 9500 CFM · Static Pressure 70 mm WG · 415V 3-Ph 50Hz',
      crop_bbox: [70, 50, 200, 100]
    },
    alternatives: [
      '26.5 TR · 9500 CFM (Recommended)',
      '25.0 TR · 9000 CFM (Standard)',
      '30.0 TR · 10500 CFM (Heavy Duty)'
    ],
    impacts: {
      affects_boq_code: '23 74 13',
      financial_impact_cr: 0.18
    },
    status: 'pending'
  },
  {
    id: 'DEC-02',
    category: 'contradiction',
    title: 'Resolve Substation Feed Conflict (CTR-01)',
    claim: 'Single Line Diagram SLD-04 indicates 11kV feed, whereas HVAC specs Cl. 4.2 mandate 33kV for chillers',
    why_needs_human: 'A dedicated 33kV switchgear transformer adds ~₹45.0 Lakhs if not clarified with client prior to pre-bid meeting',
    candidate_value: 'Issue Pre-Bid RFI #1 requesting client confirm 11kV incoming substation feed',
    evidence: {
      document_name: 'SLD-04 vs HVAC Spec Vol II',
      section: 'Electrical & Chiller Interface',
      clause: 'Cl. 4.2 vs Sheet E-04',
      page: 18,
      snippet: 'Drawing SLD-04 specifies 11kV / 433V distribution. Tech Specs Page 18 Clause 4.2 states chillers shall be rated for 33kV feed.'
    },
    alternatives: [
      'Issue Pre-Bid RFI to confirm 11kV (Recommended)',
      'Price 33kV dedicated transformer contingency (+₹45L)',
      'Accept 11kV per drawing precedence clause'
    ],
    impacts: {
      affects_rfi_id: 'RFI-01',
      affects_boq_code: '26 12 16',
      financial_impact_cr: 0.45
    },
    status: 'pending'
  },
  {
    id: 'DEC-03',
    category: 'pq_rule',
    title: 'Defect Liability Period (DLP) 36 Months Gate',
    claim: 'Tender mandates a 36-month DLP with a 10% Bank Guarantee (Internal company policy ceiling is 24 months)',
    why_needs_human: 'Requires commercial director authorization to proceed with a condition, or submit a pre-bid query to reduce to 24 months',
    candidate_value: 'Bid with Condition: Request DLP reduction to 24 months in Pre-Bid Query Sheet',
    evidence: {
      document_name: 'Special Conditions of Contract (SCC)',
      section: 'Defect Liability & Warranties',
      clause: 'SCC Clause 7.1',
      page: 14,
      snippet: 'The Defect Liability Period shall be 36 (thirty-six) months from the date of virtual completion certified by the Engineer-in-Charge.'
    },
    alternatives: [
      'Request DLP reduction to 24 months in RFI (Recommended)',
      'Seek Executive Board exception for 36 months',
      'Trigger Strategic No-Bid'
    ],
    impacts: {
      affects_rfi_id: 'RFI-02',
      affects_risk_score: 16
    },
    status: 'pending'
  },
  {
    id: 'DEC-04',
    category: 'vendor_gap',
    title: 'Sterling MEP Quote: Excluded Air Balancing Scope',
    claim: 'Sterling quote is ₹7.98 Cr (lowest baseline), but excludes NEBB/AABC third-party testing & balancing (+₹24.0L)',
    why_needs_human: 'Normalized landed cost is ₹8.22 Cr, making Apex Air Conditioning (₹8.12 Cr) the true lowest compliant bidder',
    candidate_value: 'Normalize Sterling quote with +₹24.0 Lakhs testing contingency',
    evidence: {
      document_name: 'Sterling MEP Proposal #ST-8819',
      section: 'Schedule of Exclusions',
      clause: 'Exclusion 3.4',
      page: 4,
      snippet: 'Excludes third-party NEBB/AABC acoustic testing, vibration isolation certification, and air balancing instrumentation.'
    },
    alternatives: [
      'Apply +₹24L normalization (Apex becomes true L1)',
      'Negotiate with Sterling to absorb testing scope',
      'Award directly to Apex Air Conditioning (Fully Compliant)'
    ],
    impacts: {
      affects_boq_code: '23 05 93',
      financial_impact_cr: 0.24
    },
    status: 'pending'
  },
  {
    id: 'DEC-05',
    category: 'form_field',
    title: 'Form B: Audited Net Worth UDIN Verification',
    claim: 'Statutory Form B requires CA UDIN registration number for FY 2024-25 Net Worth certification (₹52.4 Cr)',
    why_needs_human: 'Verify UDIN 24098231AAAAA8892 automatically populated from Company Vault CA Certificate',
    candidate_value: 'UDIN 24098231AAAAA8892 (Verified with ICAI Portal)',
    evidence: {
      document_name: 'Tender Bidding Forms Volume I',
      section: 'Annexure B - Financial Capacity',
      clause: 'Clause 3.2',
      page: 6,
      snippet: 'Each bidder shall submit audited net worth certificate bearing valid Unique Document Identification Number (UDIN).'
    },
    alternatives: [
      'Approve Vault UDIN (Recommended)',
      'Upload revised CA Net Worth Certificate'
    ],
    impacts: {
      affects_boq_code: 'FORM-B'
    },
    status: 'pending'
  }
];
