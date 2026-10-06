import type { RoomZone, DuctRun, AirTerminal, FireDamper, EquipmentItem, ReviewItem, BOQItem } from './types';

export const MANIPAL_PROJECT = {
  name: "Manipal Sports Complex",
  sheet_number: "KCEPL/HVAC/007",
  revision: "R1",
  sheet_title: "PROPOSED HVAC LAYOUT_FIRST FLOOR",
  client: "Manipal Academy of Higher Education",
  consultant: "Kapse Consulting Engineers Pvt Ltd",
  date: "2026-03-15",
  scale: "1:100",
  discipline: "Mechanical / HVAC (Division 23)",
  total_sheets: 5,
  current_sheet_index: 2
};

export const INITIAL_ROOMS: RoomZone[] = [
  {
    id: "RM-01",
    name: "PICKLEBALL COURT 01",
    dimensions_mm: [19500, 10350],
    area_sqm: 201.83,
    bbox: [60, 90, 360, 200],
    tag_coord: [240, 190],
    hvac_served_by: "FF-FA-AHU-05",
    provenance: "READ"
  },
  {
    id: "RM-02",
    name: "PICKLEBALL COURT 02",
    dimensions_mm: [19500, 10350],
    area_sqm: 201.83,
    bbox: [440, 90, 360, 200],
    tag_coord: [620, 190],
    hvac_served_by: "FF-FA-AHU-05",
    provenance: "READ"
  },
  {
    id: "RM-03",
    name: "TABLE TENNIS HALL",
    dimensions_mm: [9000, 6000],
    area_sqm: 54.00,
    bbox: [820, 90, 180, 150],
    tag_coord: [910, 165],
    hvac_served_by: "FF-FA-AHU-02",
    provenance: "READ"
  },
  {
    id: "RM-04",
    name: "BILLIARD ROOM",
    dimensions_mm: [4750, 6500],
    area_sqm: 30.88,
    bbox: [1020, 90, 130, 150],
    tag_coord: [1085, 165],
    hvac_served_by: "FF-FA-AHU-02",
    provenance: "READ"
  },
  {
    id: "RM-05",
    name: "AHU ROOM - 04",
    dimensions_mm: [4950, 7450],
    area_sqm: 36.88,
    bbox: [60, 310, 110, 160],
    tag_coord: [115, 390],
    hvac_served_by: "FF-FA-AHU-04",
    provenance: "MEASURED"
  },
  {
    id: "RM-06",
    name: "AHU ROOM - 05",
    dimensions_mm: [5100, 3200],
    area_sqm: 16.32,
    bbox: [190, 310, 120, 100],
    tag_coord: [250, 360],
    hvac_served_by: "FF-FA-AHU-05",
    provenance: "READ"
  },
  {
    id: "RM-07",
    name: "BOYS TOILET & CHANGING",
    dimensions_mm: [4800, 5200],
    area_sqm: 24.96,
    bbox: [820, 260, 150, 150],
    tag_coord: [895, 335],
    hvac_served_by: "EAF-01",
    provenance: "READ"
  },
  {
    id: "RM-08",
    name: "STORE ROOM",
    dimensions_mm: [5100, 2950],
    area_sqm: 15.05,
    bbox: [990, 260, 160, 100],
    tag_coord: [1070, 310],
    hvac_served_by: "Natural / Transfer",
    provenance: "READ"
  }
];

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    tag: "FF-FA-AHU-05",
    type: "Floor Mounted Air Handling Unit",
    capacity_tr: 26.5,
    airflow_cfm: 9500,
    location: "AHU ROOM - 05",
    bbox: [200, 325, 80, 50],
    provenance: "LOOK",
    provenance_note: "Capacity inferred from 403.7 m² Pickleball cooling load (ISHRAE guide)"
  },
  {
    tag: "FF-FA-AHU-04",
    type: "Floor Mounted Air Handling Unit",
    capacity_tr: 18.0,
    airflow_cfm: 6500,
    location: "AHU ROOM - 04",
    bbox: [75, 330, 75, 50],
    provenance: "LOOK",
    provenance_note: "Tag verified from vector geometry; equipment schedule unlinked"
  },
  {
    tag: "FF-FA-AHU-02",
    type: "Floor Mounted Air Handling Unit",
    capacity_tr: 12.5,
    airflow_cfm: 4500,
    location: "AHU ROOM - 02",
    bbox: [730, 330, 75, 50],
    provenance: "LOOK",
    provenance_note: "Serves Table Tennis & Billiard Hall"
  },
  {
    tag: "EAF-01",
    type: "Inline Centrifugal Exhaust Fan",
    capacity_tr: 0.0,
    airflow_cfm: 1200,
    location: "BOYS TOILET",
    bbox: [930, 340, 30, 30],
    provenance: "READ",
    provenance_note: "Shaft mounted exhaust fan for toilet cubicles"
  }
];

export const INITIAL_DUCT_RUNS: DuctRun[] = [
  {
    id: "DR-01",
    system: "Supply Air",
    color: "#D93872",
    section_mm: [1600, 450],
    length_m: 14.8,
    perimeter_mm: 4100,
    is655_gauge: 18,
    sheet_metal_thickness_mm: 1.25,
    surface_area_sqm: 60.68,
    insulation_area_sqm: 63.85,
    weight_kg: 657.8,
    path: [[250, 330], [250, 230], [380, 230]],
    provenance: "MEASURED",
    formula_ref: "IS 655:2006 Table 1 (1600 mm max dimension -> 18 Gauge / 1.25 mm)"
  },
  {
    id: "DR-02",
    system: "Supply Air",
    color: "#D93872",
    section_mm: [1200, 400],
    length_m: 18.5,
    perimeter_mm: 3200,
    is655_gauge: 20,
    sheet_metal_thickness_mm: 1.00,
    surface_area_sqm: 59.20,
    insulation_area_sqm: 62.38,
    weight_kg: 510.6,
    path: [[380, 230], [580, 230], [740, 230]],
    provenance: "MEASURED",
    formula_ref: "IS 655:2006 Table 1 (1200 mm max dimension -> 20 Gauge / 1.00 mm)"
  },
  {
    id: "DR-03",
    system: "Supply Air",
    color: "#D93872",
    section_mm: [800, 350],
    length_m: 12.2,
    perimeter_mm: 2300,
    is655_gauge: 22,
    sheet_metal_thickness_mm: 0.80,
    surface_area_sqm: 28.06,
    insulation_area_sqm: 30.15,
    weight_kg: 193.9,
    path: [[740, 230], [860, 230], [940, 230]],
    provenance: "MEASURED",
    formula_ref: "IS 655:2006 Table 1 (800 mm max dimension -> 22 Gauge / 0.80 mm)"
  },
  {
    id: "DR-04",
    system: "Return Air",
    color: "#2EA043",
    section_mm: [1400, 400],
    length_m: 16.4,
    perimeter_mm: 3600,
    is655_gauge: 20,
    sheet_metal_thickness_mm: 1.00,
    surface_area_sqm: 59.04,
    insulation_area_sqm: 62.21,
    weight_kg: 509.2,
    path: [[270, 330], [270, 150], [640, 150]],
    provenance: "MEASURED",
    formula_ref: "IS 655:2006 Table 1 (1400 mm max dimension -> 20 Gauge / 1.00 mm)"
  },
  {
    id: "DR-05",
    system: "Toilet Exhaust Air",
    color: "#E66E19",
    section_mm: [450, 250],
    length_m: 9.5,
    perimeter_mm: 1400,
    is655_gauge: 24,
    sheet_metal_thickness_mm: 0.63,
    surface_area_sqm: 13.30,
    insulation_area_sqm: 0.0,
    weight_kg: 72.4,
    path: [[930, 340], [930, 280], [880, 280]],
    provenance: "MEASURED",
    formula_ref: "IS 655:2006 Table 1 (450 mm max dimension -> 24 Gauge / 0.63 mm, uninsulated)"
  }
];

export const INITIAL_AIR_TERMINALS: AirTerminal[] = [
  {
    id: "AT-01",
    tag: "SAD-01",
    type: "Supply Air Diffuser / Grille (Side Throw)",
    dimensions_mm: [600, 300],
    airflow_cfm: 550,
    count: 28,
    color: "#D93872",
    positions: [
      [140, 230], [200, 230], [260, 230], [320, 230], [380, 230],
      [440, 230], [500, 230], [560, 230], [620, 230], [680, 230],
      [740, 230], [800, 230], [860, 230], [920, 230],
      [140, 120], [200, 120], [260, 120], [320, 120], [380, 120],
      [440, 120], [500, 120], [560, 120], [620, 120], [680, 120],
      [740, 120], [800, 120], [860, 120], [920, 120]
    ],
    provenance: "MEASURED",
    provenance_note: "Pattern matched across supply branches at 6m grid intervals"
  },
  {
    id: "AT-02",
    tag: "RAD-01",
    type: "Return Air Grille (Egg Crate Ceiling)",
    dimensions_mm: [600, 600],
    airflow_cfm: 800,
    count: 14,
    color: "#2EA043",
    positions: [
      [180, 150], [280, 150], [380, 150], [480, 150], [580, 150], [680, 150], [780, 150],
      [180, 270], [280, 270], [380, 270], [480, 270], [580, 270], [680, 270], [780, 270]
    ],
    provenance: "MEASURED",
    provenance_note: "Egg-crate return air grilles on return plenum ceiling grid"
  },
  {
    id: "AT-03",
    tag: "EAG-01",
    type: "Exhaust Air Grille (Toilet Exhaust)",
    dimensions_mm: [300, 300],
    airflow_cfm: 150,
    count: 8,
    color: "#E66E19",
    positions: [
      [840, 280], [870, 280], [900, 280], [930, 280],
      [840, 360], [870, 360], [900, 360], [930, 360]
    ],
    provenance: "MEASURED",
    provenance_note: "Toilet exhaust points mounted directly above WC and shower cubicles"
  }
];

export const INITIAL_FIRE_DAMPERS: FireDamper[] = [
  {
    id: "FD-01",
    tag: "FD1",
    type: "Motorized Fire & Smoke Damper (24V Belimo)",
    size_mm: [1600, 450],
    wall_rating: "2 HR",
    coord: [250, 310],
    provenance: "READ",
    provenance_note: "Fire wall separation between AHU Room-05 and Pickleball arena"
  },
  {
    id: "FD-02",
    tag: "FD2",
    type: "Fusible Link Fire Damper (72°C)",
    size_mm: [1200, 400],
    wall_rating: "2 HR",
    coord: [420, 230],
    provenance: "READ",
    provenance_note: "Demising wall penetration between Court 1 and Court 2"
  },
  {
    id: "FD-03",
    tag: "FD3",
    type: "Fusible Link Fire Damper (72°C)",
    size_mm: [800, 350],
    wall_rating: "2 HR",
    coord: [810, 230],
    provenance: "READ",
    provenance_note: "Table Tennis hall partition penetration"
  },
  {
    id: "FD-04",
    tag: "FD4",
    type: "Motorized Fire Damper (Toilet Shaft)",
    size_mm: [450, 250],
    wall_rating: "2 HR",
    coord: [930, 305],
    provenance: "READ",
    provenance_note: "Vertical toilet exhaust shaft fire-rated penetration"
  }
];

export const INITIAL_REVIEW_ITEMS: ReviewItem[] = [
  {
    id: "REV-01",
    item_type: "equipment",
    tag: "FF-FA-AHU-05",
    candidate_value: "26.5 TR · 9,500 CFM",
    unit: "TR / CFM",
    location: "AHU Room - 05 (Pickleball Courts 01 & 02)",
    confidence_note: "Tag text read from vector stroke crop; capacity inferred from room cooling area (403.7 m²)",
    provenance: "LOOK",
    crop_bbox: [190, 310, 120, 100],
    alternatives: ["26.5 TR · 9,500 CFM (Recommended)", "30.0 TR · 10,800 CFM", "24.0 TR · 8,600 CFM"],
    status: "pending"
  },
  {
    id: "REV-02",
    item_type: "duct_size",
    tag: "DR-01 Trunk Transition",
    candidate_value: "1600 × 450 mm → 18G (1.25 mm)",
    unit: "mm / Gauge",
    location: "Pickleball West Supply Main",
    confidence_note: "Calculated with corrected IS 655 Table 1: max dim > 1500 mm mandates 18G (1.25 mm), not 20G",
    provenance: "LOOK",
    crop_bbox: [240, 220, 150, 120],
    alternatives: ["18 Gauge / 1.25 mm (IS 655 Standard)", "20 Gauge / 1.00 mm (Subcontractor Deviation)"],
    status: "pending"
  },
  {
    id: "REV-03",
    item_type: "scale",
    tag: "Scale Benchmark",
    candidate_value: "1:100 (9,000 × 6,000 mm Table Tennis Hall)",
    unit: "Ratio",
    location: "Table Tennis Hall Dim Bounds",
    confidence_note: "Scale cross-verified against architect grid C8–C13 (18,000 mm span)",
    provenance: "LOOK",
    crop_bbox: [820, 90, 180, 150],
    alternatives: ["1:100 Calibrated (±0.2% error)", "1:96 (Imperial 1/8\" = 1'-0\")", "1:125"],
    status: "pending"
  }
];

export const INITIAL_BOQ_ITEMS: BOQItem[] = [
  {
    id: "BOQ-01",
    csi_code: "23 31 13.13",
    description: "GI Sheet Metal Ductwork — 18 Gauge (1.25 mm), IS 655 compliant with transverse slip-on flanges",
    trade: "Supply Air",
    quantity: 60.68,
    unit: "m²",
    unit_rate_usd: 38.50,
    total_usd: 2336.18,
    unit_rate_inr: 1850.00,
    total_inr: 112258.00,
    currency: "INR",
    provenance: "MEASURED",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "DR-01 [250, 330] to [380, 230]",
    standard_ref: "IS 655:2006 Table 1 / SMACNA"
  },
  {
    id: "BOQ-02",
    csi_code: "23 31 13.13",
    description: "GI Sheet Metal Ductwork — 20 Gauge (1.00 mm), IS 655 compliant",
    trade: "Supply & Return",
    quantity: 118.24,
    unit: "m²",
    unit_rate_usd: 32.00,
    total_usd: 3783.68,
    unit_rate_inr: 1520.00,
    total_inr: 179724.80,
    currency: "INR",
    provenance: "MEASURED",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "DR-02 & DR-04 [380, 230] to [740, 230]",
    standard_ref: "IS 655:2006 Table 1"
  },
  {
    id: "BOQ-03",
    csi_code: "23 31 13.13",
    description: "GI Sheet Metal Ductwork — 22 Gauge (0.80 mm), IS 655 compliant",
    trade: "Supply Air",
    quantity: 28.06,
    unit: "m²",
    unit_rate_usd: 26.50,
    total_usd: 743.59,
    unit_rate_inr: 1280.00,
    total_inr: 35916.80,
    currency: "INR",
    provenance: "MEASURED",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "DR-03 [740, 230] to [940, 230]",
    standard_ref: "IS 655:2006 Table 1"
  },
  {
    id: "BOQ-04",
    csi_code: "23 31 13.13",
    description: "GI Sheet Metal Ductwork — 24 Gauge (0.63 mm), Toilet Exhaust",
    trade: "Toilet Exhaust",
    quantity: 13.30,
    unit: "m²",
    unit_rate_usd: 22.00,
    total_usd: 292.60,
    unit_rate_inr: 1050.00,
    total_inr: 13965.00,
    currency: "INR",
    provenance: "MEASURED",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "DR-05 [930, 340] to [880, 280]",
    standard_ref: "IS 655:2006 Table 1"
  },
  {
    id: "BOQ-05",
    csi_code: "23 07 13.13",
    description: "Class O Closed-Cell Nitrile Rubber External Thermal Insulation (19 mm thick) with factory aluminium foil",
    trade: "Insulation",
    quantity: 218.59,
    unit: "m²",
    unit_rate_usd: 19.50,
    total_usd: 4262.51,
    unit_rate_inr: 950.00,
    total_inr: 207660.50,
    currency: "INR",
    provenance: "MEASURED",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "DR-01, DR-02, DR-03, DR-04 Outer Perimeter",
    standard_ref: "Outer Perim = 2*(W+H) + 8*t"
  },
  {
    id: "BOQ-06",
    csi_code: "23 37 13.13",
    description: "Extruded Aluminium Supply Air Diffuser (600 × 300 mm) with opposed blade volume control damper",
    trade: "Air Terminals",
    quantity: 28,
    unit: "Nos",
    unit_rate_usd: 68.00,
    total_usd: 1904.00,
    unit_rate_inr: 3400.00,
    total_inr: 95200.00,
    currency: "INR",
    provenance: "MEASURED",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "SAD-01 Pattern Matching (28 points)",
    standard_ref: "Tender Spec 23 37 13"
  },
  {
    id: "BOQ-07",
    csi_code: "23 37 13.23",
    description: "Ceiling Return Air Egg Crate Grille (600 × 600 mm) powder coated RAL 9010",
    trade: "Air Terminals",
    quantity: 14,
    unit: "Nos",
    unit_rate_usd: 54.00,
    total_usd: 756.00,
    unit_rate_inr: 2600.00,
    total_inr: 36400.00,
    currency: "INR",
    provenance: "MEASURED",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "RAD-01 (14 points)",
    standard_ref: "Tender Spec 23 37 13"
  },
  {
    id: "BOQ-08",
    csi_code: "23 37 13.33",
    description: "Toilet Exhaust Air Grille (300 × 300 mm) with insect screen",
    trade: "Air Terminals",
    quantity: 8,
    unit: "Nos",
    unit_rate_usd: 35.00,
    total_usd: 280.00,
    unit_rate_inr: 1800.00,
    total_inr: 14400.00,
    currency: "INR",
    provenance: "MEASURED",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "EAG-01 (8 points)",
    standard_ref: "Tender Spec 23 37 13"
  },
  {
    id: "BOQ-09",
    csi_code: "23 33 13.13",
    description: "Motorized Fire & Smoke Damper (2 HR Rated) with 24V Belimo Spring Return Actuator",
    trade: "Fire & Safety",
    quantity: 2,
    unit: "Nos",
    unit_rate_usd: 480.00,
    total_usd: 960.00,
    unit_rate_inr: 24500.00,
    total_inr: 49000.00,
    currency: "INR",
    provenance: "READ",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "FD1 (1600x450), FD4 (450x250)",
    standard_ref: "UL 555 / NFPA 90A"
  },
  {
    id: "BOQ-10",
    csi_code: "23 33 13.11",
    description: "Curtain Type Fusible Link Fire Damper (72°C rated, 2 HR)",
    trade: "Fire & Safety",
    quantity: 2,
    unit: "Nos",
    unit_rate_usd: 185.00,
    total_usd: 370.00,
    unit_rate_inr: 9500.00,
    total_inr: 19000.00,
    currency: "INR",
    provenance: "READ",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "FD2 (1200x400), FD3 (800x350)",
    standard_ref: "UL 555 / IS 655"
  },
  {
    id: "BOQ-11",
    csi_code: "23 74 13.00",
    description: "Floor Mounted Double Skin Air Handling Unit — 26.5 TR, 9500 CFM, EC Plug Fan, DX Coil",
    trade: "Equipment",
    quantity: 1,
    unit: "Nos",
    unit_rate_usd: 14500.00,
    total_usd: 14500.00,
    unit_rate_inr: 680000.00,
    total_inr: 680000.00,
    currency: "INR",
    provenance: "LOOK",
    source_sheet: "KCEPL/HVAC/007 Rev R1",
    source_ref: "FF-FA-AHU-05 [AHU Room - 05]",
    standard_ref: "Pending Consultant Schedule Verification"
  }
];

// ==========================================
// TENDER HUNTING & PRE-QUALIFICATION DATA
// ==========================================
export const SAMPLE_TENDERS: import('./types').TenderItem[] = [
  {
    id: "TND-2026-0891",
    tender_ref: "MAHE/BLR/ENGG/2026/044",
    title: "Manipal Hospital Multi-Specialty Block 2 - Complete MEP, HVAC & Electrical Works",
    authority: "Manipal Academy of Higher Education (MAHE)",
    portal_source: "Karnataka e-Procurement Portal",
    estimated_value_cr: 84.50,
    emd_amount_lakh: 84.50,
    submission_deadline: "2026-10-24 15:00 IST",
    location: "Bengaluru, Karnataka",
    status: "CONDITIONAL_GO",
    pq_score: 82,
    match_confidence: 94,
    volumes_count: 5,
    tags: ["Hospital", "HVAC Chilled Water", "Cleanrooms", "Substation", "BMS"]
  },
  {
    id: "TND-2026-1044",
    tender_ref: "NTPC/CC/CS/2026/FGD-800",
    title: "Flue Gas Desulphurization (FGD) System Package - 2 x 800 MW Thermal Power Station",
    authority: "NTPC Limited (Govt. of India PSU)",
    portal_source: "Central Public Procurement Portal (CPPP / GeM)",
    estimated_value_cr: 450.00,
    emd_amount_lakh: 450.00,
    submission_deadline: "2026-11-05 14:00 IST",
    location: "Ramagundam, Telangana",
    status: "EVALUATING",
    pq_score: 91,
    match_confidence: 88,
    volumes_count: 8,
    tags: ["PSU", "Heavy Industrial", "EPC", "High Value", "Boiler Auxiliaries"]
  },
  {
    id: "TND-2026-0922",
    tender_ref: "VOLTAS/COM/HYD/2026/012",
    title: "Tower C Commercial IT Campus - 3,600 TR Central Chilled Water Plant & Low-Side",
    authority: "Tata Voltas Infrastructure Limited",
    portal_source: "Tata Private e-Tendering Gateway",
    estimated_value_cr: 120.00,
    emd_amount_lakh: 120.00,
    submission_deadline: "2026-10-30 17:00 IST",
    location: "HITEC City, Hyderabad",
    status: "GO",
    pq_score: 96,
    match_confidence: 98,
    volumes_count: 4,
    tags: ["Commercial IT", "Water Cooled Chillers", "LEED Platinum", "Fast Track"]
  },
  {
    id: "TND-2026-0780",
    tender_ref: "MMRDA/METRO3/UG/VENT-08",
    title: "Metro Line 3 Underground Stations - Tunnel Ventilation & Environmental Control System",
    authority: "Mumbai Metropolitan Region Development Authority",
    portal_source: "MahaTenders Portal (Maharashtra)",
    estimated_value_cr: 280.00,
    emd_amount_lakh: 280.00,
    submission_deadline: "2026-11-18 15:30 IST",
    location: "Mumbai, Maharashtra",
    status: "DISCOVERED",
    pq_score: 68,
    match_confidence: 76,
    volumes_count: 6,
    tags: ["Metro Rail", "Tunnel Ventilation", "Underground", "High Fire Rating"]
  }
];

export const SAMPLE_PQ_RULES: import('./types').PQRule[] = [
  {
    id: "PQ-01",
    category: "Financial Turnover",
    rule_title: "Average Annual Financial Turnover",
    required_threshold: "Minimum ₹120.00 Cr in last 3 audited financial years",
    company_actual: "₹410.50 Cr (Verified from CA Audited Balance Sheets)",
    status: "PASS",
    showstopper: false,
    citation_doc: "Volume 1: NIT & Instructions to Bidders",
    page_number: 12,
    clause_ref: "Section II, Clause 3.2(a)",
    extracted_clause_text: "The Bidder should have achieved a minimum average annual financial turnover of INR 120 Crores during the immediate last three consecutive financial years (FY 2022-23, 2023-24, and 2024-25)."
  },
  {
    id: "PQ-02",
    category: "Past Experience",
    rule_title: "Single Similar Completed Project Value",
    required_threshold: "At least 1 similar hospital/cleanroom MEP work ≥ ₹67.20 Cr (80% of estimate)",
    company_actual: "₹110.40 Cr (Apollo Health City Multi-Specialty Block, Completed 2024)",
    status: "PASS",
    showstopper: false,
    citation_doc: "Volume 1: NIT & Instructions to Bidders",
    page_number: 14,
    clause_ref: "Section II, Clause 3.3(b)",
    extracted_clause_text: "Experience of having successfully completed one similar work of value not less than 80% of the estimated tender cost in a 400+ bedded hospital or pharmaceutical cleanroom facility."
  },
  {
    id: "PQ-03",
    category: "Defect Liability",
    rule_title: "Defect Liability & Warranty Period (DLP)",
    required_threshold: "36 Months comprehensive DLP including free consumable spares",
    company_actual: "Company standard policy ceiling is 12 Months. 36 Months exceeds threshold.",
    status: "FAIL",
    showstopper: true,
    citation_doc: "Volume 2: Special Conditions of Contract (SCC)",
    page_number: 14,
    clause_ref: "SCC Clause 7.1",
    extracted_clause_text: "The Defect Liability Period for the entire HVAC and MEP installation shall be 36 (thirty-six) calendar months from the date of final issuance of the Taking-Over Certificate, during which the contractor shall provide comprehensive maintenance and free replacement of all components."
  },
  {
    id: "PQ-04",
    category: "Compliance & Legal",
    rule_title: "Liquidated Damages (LD) Exposure Ceiling",
    required_threshold: "LD rate 0.5% per week up to maximum 10% without grace period or force majeure weather waiver",
    company_actual: "Internal Risk Policy caps LD at 5% with mandatory 14-day grace window. 10% is prohibitive.",
    status: "FAIL",
    showstopper: true,
    citation_doc: "Volume 1: General Conditions of Contract (GCC)",
    page_number: 88,
    clause_ref: "GCC Clause 24.3",
    extracted_clause_text: "If the Contractor fails to achieve milestone dates or complete the works within the stipulated completion period, Liquidated Damages shall be levied at 0.5% of contract price per week of delay or part thereof, up to an aggregate ceiling of 10% of the Contract Price."
  },
  {
    id: "PQ-05",
    category: "Net Worth & Solvency",
    rule_title: "Bank Solvency Certificate",
    required_threshold: "Solvency Certificate of minimum ₹35.00 Cr from a Scheduled Commercial Bank",
    company_actual: "₹50.00 Cr Solvency Certificate issued by HDFC Bank (Dated Sept 2026)",
    status: "PASS",
    showstopper: false,
    citation_doc: "Volume 1: NIT & Instructions to Bidders",
    page_number: 16,
    clause_ref: "Section II, Clause 3.5",
    extracted_clause_text: "The Bidder shall submit a Solvency Certificate of value not less than INR 35 Crores issued by any Nationalised / Scheduled Commercial Bank within 3 months prior to bid submission."
  },
  {
    id: "PQ-06",
    category: "JV & Consortium",
    rule_title: "Consortium Lead Partner Share",
    required_threshold: "Lead partner must hold minimum 51% equity share in Joint Venture",
    company_actual: "Bidding as Sole Proprietary EPC Contractor (100% capacity)",
    status: "PASS",
    showstopper: false,
    citation_doc: "Volume 1: Instructions to Bidders",
    page_number: 22,
    clause_ref: "Section II, Clause 5.1",
    extracted_clause_text: "In case of Joint Venture / Consortium, the Lead Partner shall have at least 51% share and meet at least 60% of the financial turnover and technical experience criteria."
  },
  {
    id: "PQ-07",
    category: "Compliance & Legal",
    rule_title: "Non-Blacklisting & Debarment Declaration",
    required_threshold: "Affidavit confirming non-debarment by any Central/State Govt or PSU in last 5 years",
    company_actual: "Clean compliance record; notarized declaration on stamp paper ready",
    status: "PASS",
    showstopper: false,
    citation_doc: "Volume 1: Instructions to Bidders",
    page_number: 28,
    clause_ref: "Section II, Clause 7.4",
    extracted_clause_text: "The bidder must submit a notarized affidavit stating that the firm has not been blacklisted, debarred or banned from business by any Government department, PSU or autonomous body."
  }
];

export const SAMPLE_GONOGO_FACTORS: import('./types').GoNoGoFactor[] = [
  { dimension: "Financial & Turnover Qualification", weight: 20, score: 9.5, rationale: "Company turnover (₹410 Cr) comfortably exceeds required ₹120 Cr threshold.", status: "favorable" },
  { dimension: "Technical Track Record", weight: 25, score: 9.0, rationale: "Demonstrated prior completion of Apollo 450-bed hospital MEP block.", status: "favorable" },
  { dimension: "Contractual Terms & LD Exposure", weight: 20, score: 4.0, rationale: "Uncapped 10% LD and 36-month DLP exceed corporate risk tolerance thresholds.", status: "unfavorable" },
  { dimension: "Commercial Margin Potential", weight: 20, score: 8.5, rationale: "Expected gross margin 14.5% based on benchmark equipment make-lists.", status: "favorable" },
  { dimension: "Resource Availability & Mobilization", weight: 15, score: 8.0, rationale: "Site team finishing nearby Bengaluru project ready for phased redeployment.", status: "favorable" }
];

// ==========================================
// CONTRADICTIONS & PRE-BID QUERIES DATA
// ==========================================
export const SAMPLE_CONTRADICTIONS: import('./types').ContradictionItem[] = [
  {
    id: "CTR-01",
    severity: "CRITICAL",
    title: "Electrical Voltage Inconsistency: Sub-Station Incomer 11 kV vs 33 kV",
    trade_domain: "Electrical",
    doc_a: {
      name: "Volume 3: Technical Specifications",
      section: "Section 4.2: High Voltage Switchgear",
      clause: "Clause 4.2.1",
      page: 112,
      text: "The main incomer HT panels shall be rated for 11 kV, 3-Phase, 50 Hz, with 25 kA symmetrical fault withstand rating for 3 seconds."
    },
    doc_b: {
      name: "Volume 4: Bill of Quantities (BOQ)",
      section: "Schedule E: Substation Equipment",
      clause: "Item 14.02",
      page: 4,
      text: "Supply, installation, testing and commissioning of 33 kV Vacuum Circuit Breaker (VCB) indoor panel with numerical protection relays."
    },
    conflict_summary: "Tech Specs specify 11 kV incomer while BOQ line item specifies 33 kV switchgear equipment. A 33 kV substation panel costs ~3.5x an 11 kV panel, creating an estimated ₹1.40 Cr pricing variance.",
    financial_exposure_note: "Direct equipment mispricing risk: ₹1.40 Cr. Critical showstopper for pricing team.",
    rfi_generated: true
  },
  {
    id: "CTR-02",
    severity: "HIGH",
    title: "Defect Liability Duration Conflict: GCC 12 Months vs SCC 36 Months",
    trade_domain: "Commercial",
    doc_a: {
      name: "Volume 1: General Conditions of Contract (GCC)",
      section: "Section 18: Warranty & Defects",
      clause: "Clause 18.1",
      page: 64,
      text: "The Defect Liability Period shall be 12 (twelve) calendar months calculated from the date of issuance of the Provisional Handover Certificate."
    },
    doc_b: {
      name: "Volume 2: Special Conditions of Contract (SCC)",
      section: "Section 7: Extended Maintenance",
      clause: "Clause 7.1",
      page: 14,
      text: "The Defect Liability Period shall be 36 (thirty-six) calendar months from final completion, during which the contractor shall bear all maintenance and consumable costs."
    },
    conflict_summary: "GCC standard 12-month DLP conflicts with SCC 36-month comprehensive AMC clause. SCC takes precedence in typical contract hierarchy, adding 2 extra years of unbudgeted maintenance.",
    financial_exposure_note: "Estimated unbudgeted maintenance and labor liability: ₹45.00 Lakhs over years 2 and 3.",
    rfi_generated: true
  },
  {
    id: "CTR-03",
    severity: "MEDIUM",
    title: "Mobilization Advance Interest Dispute: 10% Interest-Bearing vs Zero Advance",
    trade_domain: "Commercial",
    doc_a: {
      name: "Volume 1: Notice Inviting Tender (NIT)",
      section: "Section 4: Financial Arrangements",
      clause: "Clause 4.3",
      page: 6,
      text: "Mobilization advance of up to 10% of contract value shall be paid to the contractor against submission of an unconditional Bank Guarantee of equivalent amount."
    },
    doc_b: {
      name: "Volume 1: General Conditions of Contract (GCC)",
      section: "Section 32: Advances & Recoveries",
      clause: "Clause 32.1",
      page: 92,
      text: "No mobilization advance, equipment advance or material advance shall be payable under any circumstances for this work."
    },
    conflict_summary: "NIT promises 10% mobilization advance to aid initial procurement, but GCC explicitly prohibits any advances. Impacts initial cash flow model.",
    financial_exposure_note: "Working capital requirement shifts by ₹8.45 Cr during the first 90 days of project mobilization.",
    rfi_generated: true
  },
  {
    id: "CTR-04",
    severity: "HIGH",
    title: "Duct Sheet Metal Gauge Specification: BOQ 22 Gauge vs Tech Spec 20 Gauge",
    trade_domain: "Mechanical",
    doc_a: {
      name: "Volume 4: Bill of Quantities (BOQ)",
      section: "Schedule M: HVAC Low Side",
      clause: "Item 3.04",
      page: 9,
      text: "GI Sheet Metal Ducting fabricated from 22 Gauge (0.80 mm) sheet for duct sizes up to 1800 mm maximum dimension."
    },
    doc_b: {
      name: "Volume 3: Technical Specifications",
      section: "Section 15: Ductwork Construction",
      clause: "Clause 15.3.2",
      page: 204,
      text: "All GI ductwork having larger side dimension between 1501 mm and 2250 mm shall be fabricated strictly using minimum 20 Gauge (1.00 mm) sheet conforming to IS 655 / SMACNA."
    },
    conflict_summary: "BOQ specifies lighter 22G sheet for ducts up to 1800mm, while Tech Specs mandate heavier 20G sheet above 1500mm. Consultant inspection may reject lighter ductwork on site.",
    financial_exposure_note: "Sheet metal weight difference of ~25% on 2,400 m² of large duct runs (~₹12.50 Lakhs variance).",
    rfi_generated: true
  }
];

export const SAMPLE_PREBID_QUERIES: import('./types').PreBidQuery[] = [
  {
    id: "RFI-01",
    query_no: "RFI-ELEC-01",
    doc_reference: "Vol 3 Tech Specs Clause 4.2.1 vs Vol 4 BOQ Item 14.02",
    clause_no: "Clause 4.2.1 / Item 14.02",
    page_no: 112,
    original_clause: "Tech Specs mention 11 kV switchgear while BOQ mentions 33 kV VCB incomer.",
    contractor_concern: "Voltage rating mismatch directly impacts transformer sizing, cable cross-sections, and panel pricing.",
    requested_amendment: "Kindly confirm whether the incoming electrical supply is 11 kV or 33 kV, and issue an amended BOQ description accordingly.",
    category: "Technical",
    status: "READY_TO_SUBMIT"
  },
  {
    id: "RFI-02",
    query_no: "RFI-COMM-02",
    doc_reference: "Vol 1 GCC Clause 18.1 vs Vol 2 SCC Clause 7.1",
    clause_no: "Clause 18.1 / Clause 7.1",
    page_no: 14,
    original_clause: "GCC states 12 months DLP; SCC states 36 months comprehensive DLP with free spares.",
    contractor_concern: "Industry standard for hospital HVAC equipment warranty is 12 months from handover. 36 months comprehensive AMC requires additional warranty reserve.",
    requested_amendment: "Request reducing the comprehensive DLP to 12 months, with an optional Comprehensive Maintenance Contract (CMC) for Year 2 & 3 quoted separately.",
    category: "Commercial",
    status: "READY_TO_SUBMIT"
  },
  {
    id: "RFI-03",
    query_no: "RFI-LEGAL-03",
    doc_reference: "Vol 1 GCC Clause 24.3 (Liquidated Damages)",
    clause_no: "Clause 24.3",
    page_no: 88,
    original_clause: "LD at 0.5% per week of delay up to a maximum aggregate ceiling of 10% of Contract Price.",
    contractor_concern: "A 10% LD ceiling is disproportionate and violates Ministry of Finance OM No. F.9/4/2020-PPD guidelines.",
    requested_amendment: "Request revising LD ceiling to maximum 5% of contract value, and incorporating a 14-day cure period for monsoon-related site handovers.",
    category: "Legal",
    status: "READY_TO_SUBMIT"
  },
  {
    id: "RFI-04",
    query_no: "RFI-MECH-04",
    doc_reference: "Vol 4 BOQ Item 3.04 vs Vol 3 Tech Spec Clause 15.3.2",
    clause_no: "Item 3.04 / Clause 15.3.2",
    page_no: 204,
    original_clause: "BOQ specifies 22G for ducts up to 1800mm; Tech Specs mandate 20G above 1500mm.",
    contractor_concern: "Contractor requires unambiguous clarification to price sheet metal weights accurately in accordance with SMACNA tables.",
    requested_amendment: "Kindly confirm that 22 Gauge is acceptable for ducts up to 1800mm as per BOQ description, or confirm 20G with adjusted BOQ rate.",
    category: "Technical",
    status: "DRAFT"
  },
  {
    id: "RFI-05",
    query_no: "RFI-COMM-05",
    doc_reference: "Vol 1 NIT Clause 4.3 vs Vol 1 GCC Clause 32.1",
    clause_no: "Clause 4.3 / Clause 32.1",
    page_no: 6,
    original_clause: "NIT allows 10% mobilization advance; GCC prohibits all advance payments.",
    contractor_concern: "Ambiguity over advance payment impacts bidder working capital credit facilities.",
    requested_amendment: "Kindly confirm that 10% Mobilization Advance shall be disbursed against unconditional Bank Guarantee as stipulated in NIT Clause 4.3.",
    category: "Commercial",
    status: "READY_TO_SUBMIT"
  }
];

export const SAMPLE_SYNOPSIS: import('./types').MultiRoleSynopsis = {
  executive: {
    project_scope: "Turnkey MEP Package including 3,200 TR Chilled Water System, 24 AHUs, Cleanroom HVAC for 12 Operation Theaters, 11 kV Substation, and BMS.",
    estimated_value: "INR 84.50 Crores (~$10.2M USD)",
    timeline_months: 18,
    completion_deadline: "May 31, 2028",
    overall_risk_rating: "MEDIUM",
    strategic_fit: "High strategic value — reinforces healthcare MEP leadership in Southern India; aligns with existing Bengaluru supply chain.",
    key_decision_triggers: [
      "Must obtain clarification on 11 kV vs 33 kV switchgear in Pre-Bid conference.",
      "Must negotiate Liquidated Damages cap down from 10% to 5%.",
      "Ensure advance payment clause is upheld for initial equipment orders."
    ]
  },
  legal: {
    overall_liability_cap: "Capped at 100% of Contract Value (Excludes gross negligence and third-party patent indemnities).",
    liquidated_damages: "0.5% per week of delay up to a maximum cap of 10% of Contract Value. No grace period specified.",
    dispute_resolution: "Arbitration under Arbitration & Conciliation Act 1996; Sole Arbitrator appointed by Client; Venue: Bengaluru.",
    governing_law: "Laws of the Republic of India; Jurisdiction of Courts at Bengaluru, Karnataka.",
    termination_clauses: "Termination for Default upon 14 days notice; Termination for Convenience by Client with compensation for executed work only.",
    indemnity_obligations: "Comprehensive indemnity covering site accidents, third-party bodily injury, property damage, and environmental non-compliance.",
    force_majeure_scope: "Covers war, riot, earthquakes, floods, and government lockdowns. Excludes normal monsoon rain delays."
  },
  commercial: {
    emd_and_pbg: "EMD: INR 84.50 Lakhs (1%); Performance Security (PBG): 5% of Contract Value valid up to DLP completion + 60 days.",
    payment_terms: [
      "70% upon delivery of major equipment (Chillers, AHUs, Panels) to site in good condition.",
      "20% upon completion of physical erection and alignment.",
      "10% upon testing, balancing, commissioning and final handover."
    ],
    mobilization_advance: "10% of Contract Value payable in two equal installments against Bank Guarantee @ 8.5% simple interest per annum.",
    retention_money: "5% deducted from each running account (RA) bill, released 50% on commercial handover and 50% on DLP completion.",
    price_variation_clause: "Fixed Price Contract. No price escalation on labor or steel/copper materials during the initial 18 months.",
    statutory_taxes_duties: "GST @ 18% shall be payable extra over the quoted base rates."
  },
  technical: {
    scope_inclusions: [
      "4 x 800 TR Water-Cooled Centrifugal Chillers (VFD driven, R-134a/R-513A).",
      "24 Double Skin Air Handling Units with EC plug fans and MERV 14 filtration.",
      "Cleanroom HEPA filtration units (H14 grade) for 12 Super-Specialty OTs.",
      "Complete GI ductwork conforming to SMACNA / IS 655 with nitrile rubber insulation.",
      "Centralized Building Management System (BACnet IP protocol) with 1,200 I/O points."
    ],
    scope_exclusions: [
      "Civil equipment foundations, civil trenches and RCC louvers (Client Scope).",
      "Raw water supply to cooling tower makeup tank (Client Scope).",
      "Permanent electrical power supply up to HT incomer terminal (Client Scope)."
    ],
    approved_makes: [
      { category: "Water-Cooled Chillers", makes: ["Trane", "Carrier", "York / Johnson Controls", "Daikin"] },
      { category: "Air Handling Units", makes: ["Voltas", "Blue Star", "Zeco", "Edgetech"] },
      { category: "HT Switchgear Panels", makes: ["ABB", "Schneider Electric", "Siemens", "L&T"] },
      { category: "Fire Dampers & Actuators", makes: ["Belimo", "Ruskin", "Systemair", "Caryaire"] }
    ],
    design_standards: ["ASHRAE 90.1", "ASHRAE 170 (Healthcare)", "IS 655 (Ducting)", "National Building Code 2016 Part 4"],
    warranty_terms: "36 Months comprehensive warranty required as per SCC Clause 7.1 (Subject to Pre-Bid Query)."
  }
};

export const SAMPLE_RISKS: import('./types').RiskMatrixItem[] = [
  {
    id: "RSK-01",
    risk_category: "Contractual",
    title: "Liquidated Damages Exposure (10% Uncapped Delay Penalties)",
    likelihood: 4,
    cost_impact: 5,
    calculated_score: 20,
    severity: "EXTREME",
    internal_lessons_learned: "On Apollo Hospital (2023), civil handover was delayed by 60 days, causing client to trigger provisional LD deductions. Required 4 months of dispute board mediation to recover.",
    recommended_mitigation: "Submit Pre-Bid Query RFI-03 to cap LD at 5% and add contract clause establishing that delay penalties only apply if delays are solely attributable to MEP contractor.",
    external_scan_data: "Bengaluru municipal approvals for healthcare electrical substations currently average 45-60 days processing time."
  },
  {
    id: "RSK-02",
    risk_category: "Contractual",
    title: "36-Month Comprehensive Defect Liability & Unbudgeted Spares",
    likelihood: 5,
    cost_impact: 4,
    calculated_score: 20,
    severity: "EXTREME",
    internal_lessons_learned: "Multi-year hospital maintenance clauses often incur surprise chiller motor rewinding and sensor replacements. On Fortis project, year 3 AMC expenses exceeded estimates by ₹22 Lakhs.",
    recommended_mitigation: "Separate base bid from Years 2 & 3 AMC. In pricing model, build in 2.5% annual escalation contingency for chiller maintenance.",
    external_scan_data: "OEM chiller service contract costs have escalated by 12% year-on-year in India."
  },
  {
    id: "RSK-03",
    risk_category: "Supply Chain",
    title: "Long Lead Times on Centrifugal Chillers and Cleanroom VFDs",
    likelihood: 3,
    cost_impact: 4,
    calculated_score: 12,
    severity: "HIGH",
    internal_lessons_learned: "Imported centrifugal chillers have a standard 22-week factory delivery window. Any delay in advance payment approval causes immediate milestone slippage.",
    recommended_mitigation: "Issue early Letter of Intent (LOI) to Trane/Carrier immediately upon award; secure 10% mobilization advance against BG within 15 days.",
    external_scan_data: "Global container shipping transit times to Chennai port currently stable at 18-24 days."
  },
  {
    id: "RSK-04",
    risk_category: "Financial & Cashflow",
    title: "Fixed Price Clause Exposure against Copper and Steel Inflation",
    likelihood: 3,
    cost_impact: 3,
    calculated_score: 9,
    severity: "MEDIUM",
    internal_lessons_learned: "Copper cable rates fluctuated 18% during 2024. Fixed-price hospital contracts experienced margin compression of 2.1%.",
    recommended_mitigation: "Negotiate back-to-back fixed pricing with Polycab/Havells for cable supplies upon contract execution.",
    external_scan_data: "RBI Wholesale Price Index (WPI) for electrical machinery forecasted to rise 3.2% in FY 2026-27."
  },
  {
    id: "RSK-05",
    risk_category: "Site & Environmental",
    title: "Monsoon Flooding & Cleanroom Humidity Control During Erection",
    likelihood: 2,
    cost_impact: 4,
    calculated_score: 8,
    severity: "MEDIUM",
    internal_lessons_learned: "High humidity during July-August cleanroom duct installation can cause bacterial growth inside unsealed ducts prior to HEPA commissioning.",
    recommended_mitigation: "Mandate end-capping on all GI ducts during transport and site staging; install temporary dehumidifiers inside OT zones.",
    external_scan_data: "Karnataka State Pollution Control Board (KSPCB) mandates strict acoustic enclosure for DG sets and chillers."
  }
];

// ==========================================
// BID SUBMISSION PRO & KNOWLEDGE BASE DATA
// ==========================================
export const SAMPLE_SUBMISSION_FORMS: import('./types').SubmissionForm[] = [
  {
    id: "FRM-01",
    form_code: "Form A",
    form_name: "General Information & Authorized Signatory Power of Attorney",
    category: "General",
    fields_total: 14,
    fields_autofilled: 14,
    status: "COMPLETED",
    key_fields: [
      { label: "Company Legal Name", value: "Preconstruct Infra & MEP Engineering Pvt Ltd", source: "Company Vault", verified: true },
      { label: "Registration No. / CIN", value: "U45200DL2018PTC334190", source: "MCA Portal Record", verified: true },
      { label: "GSTIN", value: "29AAACP1234F1Z8", source: "GST Certificate", verified: true },
      { label: "Authorized Signatory", value: "Rajeshwar Rao (Director - Tendering)", source: "Board Resolution 2026", verified: true }
    ]
  },
  {
    id: "FRM-02",
    form_code: "Form B",
    form_name: "Financial Turnover & Net Worth Summary (Last 3 FY)",
    category: "Financial",
    fields_total: 18,
    fields_autofilled: 18,
    status: "COMPLETED",
    key_fields: [
      { label: "FY 2024-25 Turnover", value: "₹452.80 Crores", source: "CA Certified Balance Sheet", verified: true },
      { label: "FY 2023-24 Turnover", value: "₹398.20 Crores", source: "CA Certified Balance Sheet", verified: true },
      { label: "FY 2022-23 Turnover", value: "₹380.50 Crores", source: "CA Certified Balance Sheet", verified: true },
      { label: "Average 3-Year Turnover", value: "₹410.50 Crores", source: "System Computed", verified: true },
      { label: "Net Worth (as on March 2025)", value: "₹184.20 Crores (Positive)", source: "Statutory Auditor Certificate", verified: true }
    ]
  },
  {
    id: "FRM-03",
    form_code: "Form C",
    form_name: "Similar Work Experience & Past Performance Credentials",
    category: "Experience",
    fields_total: 22,
    fields_autofilled: 20,
    status: "IN_PROGRESS",
    key_fields: [
      { label: "Major Qualifying Project 1", value: "Apollo Health City 450-Bed Block (₹110.4 Cr)", source: "Completion Certificate", verified: true },
      { label: "Major Qualifying Project 2", value: "Max Healthcare Super-Specialty Tower (₹82.5 Cr)", source: "Completion Certificate", verified: true },
      { label: "Client Performance Rating", value: "Excellent (Zero LD Deducted)", source: "Client Letter", verified: true },
      { label: "Contact Person Verification", value: "Chief Project Engineer - Apollo Hospitals", source: "User Confirmation Required", verified: false }
    ]
  },
  {
    id: "FRM-04",
    form_code: "Form E",
    form_name: "Non-Blacklisting Affidavit & Litigation History Declaration",
    category: "General",
    fields_total: 8,
    fields_autofilled: 8,
    status: "COMPLETED",
    key_fields: [
      { label: "Pending Litigation Cases", value: "Nil material litigation affecting financial standing", source: "Legal Department Declaration", verified: true },
      { label: "Debarment / Blacklisting Status", value: "Never debarred or blacklisted by any Govt / PSU", source: "Notarized Stamp Paper", verified: true },
      { label: "Date of Affidavit", value: "02 October 2026", source: "Document Store", verified: true }
    ]
  }
];

export const SAMPLE_ATTACHMENTS: import('./types').AttachmentItem[] = [
  {
    id: "ATT-01",
    title: "ISO 9001:2015 Quality Management System Certificate",
    tender_requirement: "Mandatory requirement as per NIT Section II Clause 4.1",
    citation_page: 18,
    matched_file_name: "Preconstruct_ISO_9001_2015_TUV_Nord.pdf",
    matched_file_date: "Valid until 14 Nov 2027",
    validity_status: "VALID",
    file_size_kb: 420,
    is_attached: true
  },
  {
    id: "ATT-02",
    title: "Audited Balance Sheets with UDIN & CA Certificate (3 FY)",
    tender_requirement: "Mandatory requirement as per NIT Section II Clause 3.2",
    citation_page: 12,
    matched_file_name: "Audited_Financial_Statements_FY23_FY24_FY25_UDIN.pdf",
    matched_file_date: "Certified 18 August 2026",
    validity_status: "VALID",
    file_size_kb: 3450,
    is_attached: true
  },
  {
    id: "ATT-03",
    title: "Bank Solvency Certificate (₹50.00 Cr)",
    tender_requirement: "Mandatory requirement as per NIT Section II Clause 3.5",
    citation_page: 16,
    matched_file_name: "HDFC_Bank_Solvency_Certificate_50Cr_Sept2026.pdf",
    matched_file_date: "Issued 12 Sept 2026",
    validity_status: "VALID",
    file_size_kb: 280,
    is_attached: true
  },
  {
    id: "ATT-04",
    title: "Notarized Power of Attorney on ₹500 Stamp Paper",
    tender_requirement: "Mandatory requirement as per Instructions to Bidders Clause 6.1",
    citation_page: 24,
    matched_file_name: "Board_Resolution_Power_of_Attorney_Rajeshwar_Rao.pdf",
    matched_file_date: "Executed 15 Sept 2026",
    validity_status: "VALID",
    file_size_kb: 890,
    is_attached: true
  },
  {
    id: "ATT-05",
    title: "Earnest Money Deposit (EMD) Bank Guarantee (₹84.50 Lakhs)",
    tender_requirement: "Mandatory requirement as per NIT Clause 2.1",
    citation_page: 4,
    matched_file_name: "State_Bank_of_India_EMD_BG_84_5Lakhs.pdf",
    matched_file_date: "Issued 01 Oct 2026 (Valid 180 Days)",
    validity_status: "VALID",
    file_size_kb: 512,
    is_attached: true
  }
];

// ==========================================
// SUBCONTRACTOR SOURCING & BID LEVELING
// ==========================================
export const SAMPLE_SUBCONTRACTOR_BIDS: import('./types').SubcontractorQuote[] = [
  {
    vendor_id: "VND-01",
    vendor_name: "Apex Air Conditioning & Engineering Works",
    contact_person: "Virendra Singh (VP Estimating)",
    quoted_base_usd: 138500.00,
    delivery_weeks: 14,
    warranty_months: 24,
    detected_exclusions: ["Excludes 25mm acoustic insulation on return air elbows", "Excludes fire damper cabling to BMS panel"],
    normalized_additions_usd: 8400.00,
    final_leveled_usd: 146900.00,
    rank: 1,
    compliance_rating: "FULL"
  },
  {
    vendor_id: "VND-02",
    vendor_name: "Comfort Airflow Systems Pvt Ltd",
    contact_person: "K. Muralidharan (General Manager)",
    quoted_base_usd: 144200.00,
    delivery_weeks: 16,
    warranty_months: 36,
    detected_exclusions: ["Excludes vibration isolator spring hangers", "Excludes scaffolding above 4.5m ceiling height"],
    normalized_additions_usd: 6200.00,
    final_leveled_usd: 150400.00,
    rank: 2,
    compliance_rating: "PARTIAL"
  },
  {
    vendor_id: "VND-03",
    vendor_name: "Sterling MEP Infrastructure Solutions",
    contact_person: "Anirban Bhattacharya (Director)",
    quoted_base_usd: 152000.00,
    quoted_base_inr: 15200000.00,
    delivery_weeks: 12,
    warranty_months: 36,
    detected_exclusions: ["Includes all scope items; zero exclusions detected"],
    normalized_additions_usd: 0.00,
    normalized_additions_inr: 0.00,
    final_leveled_usd: 152000.00,
    final_leveled_inr: 15200000.00,
    currency: "INR",
    rank: 3,
    compliance_rating: "FULL"
  }
];

// Enrich Indian subcontractor bids with INR values
SAMPLE_SUBCONTRACTOR_BIDS[0].quoted_base_inr = 13850000.00;
SAMPLE_SUBCONTRACTOR_BIDS[0].normalized_additions_inr = 840000.00;
SAMPLE_SUBCONTRACTOR_BIDS[0].final_leveled_inr = 14690000.00;
SAMPLE_SUBCONTRACTOR_BIDS[0].currency = "INR";

SAMPLE_SUBCONTRACTOR_BIDS[1].quoted_base_inr = 14420000.00;
SAMPLE_SUBCONTRACTOR_BIDS[1].normalized_additions_inr = 620000.00;
SAMPLE_SUBCONTRACTOR_BIDS[1].final_leveled_inr = 15040000.00;
SAMPLE_SUBCONTRACTOR_BIDS[1].currency = "INR";

// ==========================================
// UNITED STATES REAL-WORLD MARKET DATASETS (USD / CSI DIV 23 / SMACNA / SAM.GOV)
// ==========================================

export const AUSTIN_PROJECT = {
  id: "PRJ-US-2026-004",
  name: "Austin Regional Medical Center — Tower B",
  client: "Travis County Healthcare District / Austin Health Authority",
  sheet_title: "Central Utility Plant & Low-Side HVAC Distribution",
  sheet_number: "M-101",
  revision: "Rev 2",
  scale: "1/8\" = 1'-0\"",
  discipline: "Mechanical (CSI Div 23)",
  standard: "SMACNA 3rd Ed / ASHRAE 90.1 / ASHRAE 170",
  date: "October 2026",
  estimated_value_usd: 10850000.00
};

export const SAMPLE_TENDERS_US: import('./types').TenderItem[] = [
  {
    id: "TND-US-2026-0412",
    tender_ref: "RFP-2026-ARMC-MEP-09",
    title: "Austin Regional Medical Center — Tower B Central Utility Plant & HVAC Modernization",
    authority: "Travis County Healthcare District / Austin Health Authority",
    portal_source: "SAM.gov / Austin Procurement Gateway",
    estimated_value_cr: 10.85,
    estimated_value_usd: 10850000.00,
    emd_amount_lakh: 54.25,
    bid_bond_usd: 542500.00,
    currency: "USD",
    submission_deadline: "2026-10-28 14:00 CST",
    location: "Austin, Texas",
    status: "CONDITIONAL_GO",
    pq_score: 88,
    match_confidence: 96,
    volumes_count: 5,
    tags: ["Healthcare", "Central Utility Plant", "ASHRAE 170", "Davis-Bacon", "CSI Div 23"]
  },
  {
    id: "TND-US-2026-0819",
    tender_ref: "TAMU-RFP-7729-MEP",
    title: "Texas A&M Health Science Center — Biosafety Level 3 Research Facility MEP Package",
    authority: "Texas A&M University System Real Estate Office",
    portal_source: "GovTribe / Texas SmartBuy Portal",
    estimated_value_cr: 18.40,
    estimated_value_usd: 18400000.00,
    emd_amount_lakh: 92.00,
    bid_bond_usd: 920000.00,
    currency: "USD",
    submission_deadline: "2026-11-12 15:00 CST",
    location: "Bryan-College Station, Texas",
    status: "GO",
    pq_score: 94,
    match_confidence: 91,
    volumes_count: 7,
    tags: ["Higher Ed", "Cleanroom / BSL-3", "Chilled Water", "Specialty Exhaust"]
  },
  {
    id: "TND-US-2026-0550",
    tender_ref: "GSA-PBS-07-2026-0031",
    title: "GSA Federal Courthouse — Comprehensive Chiller Plant Replacement & BAS Upgrades",
    authority: "General Services Administration (GSA Region 7)",
    portal_source: "SAM.gov / GSA eBuy",
    estimated_value_cr: 8.95,
    estimated_value_usd: 8950000.00,
    emd_amount_lakh: 44.75,
    bid_bond_usd: 447500.00,
    currency: "USD",
    submission_deadline: "2026-11-20 16:00 CST",
    location: "San Antonio, Texas",
    status: "EVALUATING",
    pq_score: 84,
    match_confidence: 86,
    volumes_count: 4,
    tags: ["Federal / GSA", "Buy American Act", "P-100 Standards", "FAR Part 15"]
  }
];

export const SAMPLE_PQ_RULES_US: import('./types').PQRule[] = [
  {
    id: "PQ-US-01",
    category: "Financial Turnover",
    rule_title: "Surety Bonding Capacity & Treasury Listing",
    required_threshold: "Minimum $25M single project / $50M aggregate bonding from a Treasury Circular 570 licensed surety (A.M. Best 'A' rated)",
    company_actual: "$35M Single / $70M Aggregate (Travelers Casualty and Surety Company of America, A.M. Best A++ XV)",
    status: "PASS",
    showstopper: false,
    citation_doc: "RFP Volume 1: Instructions to Bidders",
    page_number: 14,
    clause_ref: "ITB Section 4.2",
    extracted_clause_text: "Bidder must submit a formal Letter of Bondability confirming single project bonding capacity of at least $25,000,000 and aggregate capacity of at least $50,000,000."
  },
  {
    id: "PQ-US-02",
    category: "Past Experience",
    rule_title: "Healthcare Facility Mechanical Contracting Experience",
    required_threshold: "Completion of at least 3 healthcare/hospital mechanical projects exceeding $8.0M value within the last 5 calendar years",
    company_actual: "4 qualifying hospital projects completed (Memorial Hermann $14.2M, Baylor Scott & White $11.8M, Houston Methodist $9.5M)",
    status: "PASS",
    showstopper: false,
    citation_doc: "RFP Volume 1: Section II Qualification Criteria",
    page_number: 22,
    clause_ref: "ITB Section 6.1(a)",
    extracted_clause_text: "General Contractor or prime mechanical subcontractor must document substantial completion of three (3) comparable hospital facility HVAC and central plant installations exceeding $8,000,000 in value."
  },
  {
    id: "PQ-US-03",
    category: "Defect Liability",
    rule_title: "Correction of Work & Comprehensive Equipment Warranty",
    required_threshold: "AIA A201 Section 12.2 mandates 1-year correction of work; RFP Division 23 mandates 3-year extended compressor parts and labor warranty",
    company_actual: "Standard warranty is 12 months; 3-year manufacturer warranty requires unbudgeted OEM service agreement ($120,000 liability)",
    status: "FAIL",
    showstopper: true,
    citation_doc: "Project Manual Volume 2: Division 23 Specifications",
    page_number: 38,
    clause_ref: "Spec Section 23 00 00 Part 1.8",
    extracted_clause_text: "The mechanical contractor shall provide a non-prorated comprehensive warranty covering all central plant chiller compressors, variable frequency drives, and fan assemblies for a period of thirty-six (36) months from substantial completion."
  },
  {
    id: "PQ-US-04",
    category: "Compliance & Legal",
    rule_title: "Davis-Bacon Act Prevailing Wage & Certified Payroll",
    required_threshold: "Compliance with US Department of Labor General Decision TX20260014 and submission of weekly certified payroll forms (WH-347)",
    company_actual: "Prevailing wage compliance program in place; subcontractor union rate parity verified with Sheet Metal Workers Local 67",
    status: "PASS",
    showstopper: false,
    citation_doc: "RFP Volume 1: General Requirements",
    page_number: 9,
    clause_ref: "Section 00 73 46",
    extracted_clause_text: "All laborers and mechanics employed on the site of the work will be paid unconditionally and not less often than once a week at wage rates not less than those contained in the wage determination of the Secretary of Labor."
  }
];

export const SAMPLE_CONTRADICTIONS_US: import('./types').ContradictionItem[] = [
  {
    id: "CTR-US-01",
    severity: "CRITICAL",
    title: "Chiller Electrical Voltage Mismatch: Spec 480V 3-Phase vs Drawing 208V",
    trade_domain: "Electrical",
    doc_a: {
      name: "Project Manual Volume 2: Technical Specifications",
      section: "Section 23 64 16: Centrifugal Water Chillers",
      clause: "Part 2.2 Electrical Requirements",
      page: 84,
      text: "The chiller compressor motors and solid-state starters shall be engineered strictly for 480 Volt, 3-Phase, 60 Hz electrical service."
    },
    doc_b: {
      name: "Drawing Volume 3: Electrical Power Distribution",
      section: "Sheet E-201: Main Electrical Room Schedule",
      clause: "Panelboard MDP-CUP Tag 4",
      page: 6,
      text: "Feeders to Chiller CH-01 and CH-02 routed from 208Y/120V 3-Phase distribution board with 1200A circuit breakers."
    },
    conflict_summary: "Specifications mandate 480V centrifugal chiller compressor, but drawing power schedule feeds chillers from a 208V bus. Operating chillers on 208V requires step-up transformers or re-engineered switchgear with estimated $185,000 cost impact.",
    financial_exposure_note: "Direct switchgear/transformer variance: $185,000. Critical RFI required prior to equipment release.",
    rfi_generated: true
  },
  {
    id: "CTR-US-02",
    severity: "HIGH",
    title: "Warranty Term Conflict: AIA A201 1-Year Correction vs Division 23 3-Year Warranty",
    trade_domain: "Commercial",
    doc_a: {
      name: "Volume 1: General Conditions of the Contract for Construction",
      section: "AIA Document A201-2017 Article 12: Uncovering and Correction of Work",
      clause: "Section 12.2.2.1",
      page: 34,
      text: "If, within one year after the date of Substantial Completion, any of the Work is found to be not in accordance with the Contract Documents, the Contractor shall correct it promptly."
    },
    doc_b: {
      name: "Project Manual Volume 2: Division 23 Mechanical",
      section: "Section 23 00 00: Common Work Results for HVAC",
      clause: "Part 1.8 Warranty Requirements",
      page: 12,
      text: "All major HVAC equipment including chillers, cooling towers, and air handling units shall include a 3-year comprehensive parts and labor warranty."
    },
    conflict_summary: "AIA A201 establishes the standard 1-year correction period, while Division 23 requires 3 years of comprehensive warranty coverage including consumables and refrigerant.",
    financial_exposure_note: "Unbudgeted OEM extended warranty service contract: $120,000 over years 2 and 3.",
    rfi_generated: true
  },
  {
    id: "CTR-US-03",
    severity: "HIGH",
    title: "Duct Static Pressure Classification: SMACNA 2\" W.G. vs General Note 4\" W.G.",
    trade_domain: "Mechanical",
    doc_a: {
      name: "Project Manual Volume 2: HVAC Ductwork",
      section: "Section 23 31 13: Metal Ducts",
      clause: "Part 2.1 Static Pressure Classification",
      page: 142,
      text: "Supply air ductwork downstream of VAV terminal units shall be constructed to SMACNA 2-inch water gage positive pressure classification."
    },
    doc_b: {
      name: "Drawing Sheet M-001: Mechanical General Notes",
      section: "General Note 14: Duct Construction",
      clause: "Note 14.B",
      page: 2,
      text: "All supply duct systems throughout the hospital shall be fabricated and reinforced to withstand 4-inch water gage static pressure."
    },
    conflict_summary: "4-inch W.G. construction requires heavier gauge sheet metal and reinforced transverse joints (TDC/TDF) on 18,000 sq ft of ductwork.",
    financial_exposure_note: "Additional sheet metal fabrication and seam sealing cost: ~$42,000 variance.",
    rfi_generated: true
  },
  {
    id: "CTR-US-04",
    severity: "MEDIUM",
    title: "Buy American Act FAR 52.225-9: Domestic Origin for Chiller Compressors",
    trade_domain: "Commercial",
    doc_a: {
      name: "Volume 1: Supplementary Conditions",
      section: "Federal Requirements Appendix",
      clause: "FAR Clause 52.225-9",
      page: 78,
      text: "The Contractor shall use only domestic construction materials in performing this contract, except as provided in paragraph (b) of this clause."
    },
    doc_b: {
      name: "Division 23 Equipment Schedule",
      section: "Schedule 23 64 00: Approved Manufacturers",
      clause: "Approved Makes",
      page: 95,
      text: "Approved water-cooled centrifugal chillers: Daikin Applied (Manufactured in Staunton VA or Suzhu China) or Carrier 19DV (assembled in Charlotte NC)."
    },
    conflict_summary: "Must verify that chiller models selected are 100% compliant with domestic manufacturing origin under Buy American / BABA guidelines.",
    financial_exposure_note: "Potential non-compliance penalty or equipment rejection if foreign-assembled unit is submitted.",
    rfi_generated: true
  }
];

export const SAMPLE_PREBID_QUERIES_US: import('./types').PreBidQuery[] = [
  {
    id: "RFI-US-01",
    query_no: "RFI-ELEC-01",
    doc_reference: "Spec Section 23 64 16 vs Drawing Sheet E-201",
    clause_no: "Part 2.2 / Panelboard MDP-CUP",
    page_no: 84,
    original_clause: "Spec specifies 480V chiller incomer; Drawing E-201 shows 208V power feed.",
    contractor_concern: "Voltage rating mismatch directly affects motor ampacity, starter sizing, and feeder cross-sections.",
    requested_amendment: "Please confirm whether incoming electrical service to Chillers CH-01/02 is 480V 3-Phase or 208V 3-Phase, and issue an addendum with the corrected electrical drawing.",
    category: "Technical",
    status: "READY_TO_SUBMIT"
  },
  {
    id: "RFI-US-02",
    query_no: "RFI-COMM-02",
    doc_reference: "AIA A201 Section 12.2.2.1 vs Division 23 Section 23 00 00 Part 1.8",
    clause_no: "A201 Sec 12.2 / Spec 23 00 00",
    page_no: 34,
    original_clause: "AIA A201 specifies 1-year correction period; Spec mandates 3-year comprehensive parts & labor warranty.",
    contractor_concern: "Standard equipment manufacturer warranties are 12 months. 3-year extended warranty adds $120,000 in unbudgeted service reserves.",
    requested_amendment: "Request reducing base contract warranty to standard 12 months as per AIA A201, with Years 2 & 3 quoted as an optional Owner-elected Preventative Maintenance Agreement.",
    category: "Commercial",
    status: "READY_TO_SUBMIT"
  },
  {
    id: "RFI-US-03",
    query_no: "RFI-LEGAL-03",
    doc_reference: "Supplementary Conditions Section 00 73 00 (Liquidated Damages)",
    clause_no: "Section 8.4",
    page_no: 45,
    original_clause: "Liquidated damages assessed at $2,500 per calendar day of delay beyond Substantial Completion.",
    contractor_concern: "Clause lacks distinction for concurrent delay caused by owner equipment delivery or city utility tie-in delays.",
    requested_amendment: "Request amending Section 8.4 to clarify that Liquidated Damages will not accrue during excusable delays or weather events exceeding NOAA 10-year historic averages.",
    category: "Legal",
    status: "READY_TO_SUBMIT"
  },
  {
    id: "RFI-US-04",
    query_no: "RFI-MECH-04",
    doc_reference: "Spec Section 23 31 13 Part 2.1 vs Drawing Sheet M-001 Note 14.B",
    clause_no: "Part 2.1 / Note 14.B",
    page_no: 142,
    original_clause: "Spec allows 2\" W.G. static pressure downstream of VAVs; General Note 14.B mandates 4\" W.G. on all ductwork.",
    contractor_concern: "Fabricating low-pressure distribution ductwork to 4\" W.G. standard significantly increases gauge thickness and joint sealing labor without engineering necessity.",
    requested_amendment: "Please confirm that SMACNA 2\" W.G. construction is acceptable downstream of terminal VAV units as stated in Spec Section 23 31 13.",
    category: "Technical",
    status: "DRAFT"
  }
];

export const SAMPLE_SYNOPSIS_US: import('./types').MultiRoleSynopsis = {
  executive: {
    project_scope: "Central Utility Plant & Low-Side HVAC Modernization: 2 x 750-Ton Magnetic Bearing Chillers, 24 Air Handling Units, Cleanroom Operating Suites, and Niagara 4 BAS.",
    estimated_value: "USD $10,850,000.00",
    timeline_months: 16,
    completion_deadline: "February 28, 2028",
    overall_risk_rating: "MEDIUM",
    strategic_fit: "Key healthcare expansion in Central Texas market; aligns with our existing Austin field operations and prefabrication shop.",
    key_decision_triggers: [
      "Confirm 480V vs 208V electrical incomer during pre-bid conference.",
      "Clarify 1-Year AIA vs 3-Year equipment warranty terms.",
      "Lock in equipment pricing with Daikin/Carrier before scheduled price increases."
    ]
  },
  legal: {
    overall_liability_cap: "Capped at 100% of Contract Sum (Excludes gross negligence and hazardous material indemnification).",
    liquidated_damages: "$2,500.00 per calendar day beyond Substantial Completion date.",
    dispute_resolution: "Mediation pursuant to AIA Document A201 Article 15; followed by Binding Arbitration administered by AAA (American Arbitration Association); Venue: Austin, Texas.",
    governing_law: "Laws of the State of Texas; Travis County District Courts.",
    termination_clauses: "Termination for Cause upon 7 days written notice; Termination for Convenience by Owner pursuant to Section 14.4.",
    indemnity_obligations: "Broad form indemnity covering claims arising out of negligent acts, errors, or omissions of the Contractor or Subcontractors.",
    force_majeure_scope: "Includes acts of God, labor disputes, unusual delays in deliveries, unavoidable casualties, or other causes beyond Contractor's control."
  },
  commercial: {
    emd_and_pbg: "Bid Bond: 5% ($542,500); Performance & Payment Bonds: 100% of Contract Sum from Treasury Circular 570 Surety.",
    payment_terms: [
      "Monthly progress billings via AIA Document G702 / G703 Application and Certificate for Payment.",
      "90% of work in place and stored materials invoiced monthly.",
      "10% retainage withheld until Substantial Completion (reduced to 5% at 50% milestone upon Owner approval)."
    ],
    mobilization_advance: "Zero mobilization advance. Progress payments based strictly on work in place and bonded off-site stored materials.",
    retention_money: "10% retainage held on all trade applications.",
    price_variation_clause: "Lump Sum Stipulated Sum Contract. No escalation adjustments permitted.",
    statutory_taxes_duties: "Texas Sales Tax Exempt Project (Texas Sales and Use Tax Exemption Certificate provided by Healthcare District)."
  },
  technical: {
    scope_inclusions: [
      "2 x 750-Ton Water-Cooled Chillers with magnetic-bearing variable speed centrifugal compressors.",
      "2 Induced-Draft Crossflow Cooling Towers with variable speed fan drives (VFDs).",
      "24 Custom Air Handling Units with MERV 14 filtration and ultraviolet germicidal irradiation (UVGI).",
      "Complete SMACNA galvanized steel supply, return, and exhaust ductwork distribution.",
      "Niagara 4 Framework Building Automation System (BAS) with BACnet IP communication."
    ],
    scope_exclusions: [
      "Concrete housekeeping pads and equipment foundations (General Contractor Scope).",
      "Main electrical feeder conduit and wire up to chiller starter terminals (Division 26 Scope).",
      "Domestic water and natural gas supply piping up to CUP mechanical room shutoff valves."
    ],
    approved_makes: [
      { category: "Water Chillers", makes: ["Daikin Applied", "Carrier Commercial", "Trane", "York / Johnson Controls"] },
      { category: "Air Handling Units", makes: ["Trane", "Daikin", "Governair", "ClimateCraft"] },
      { category: "Cooling Towers", makes: ["Baltimore Aircoil Company (BAC)", "Marley / SPX", "Evapco"] },
      { category: "Dampers & Actuators", makes: ["Belimo", "Ruskin", "Greenheck", "Nailor"] }
    ],
    design_standards: ["ASHRAE Standard 90.1-2022", "ASHRAE Standard 170 (Ventilation of Healthcare Facilities)", "SMACNA HVAC Duct Construction Standards 3rd Ed", "NFPA 90A"],
    warranty_terms: "1 Year standard correction of work per AIA A201; 5-Year non-prorated chiller compressor parts warranty."
  }
};

export const SAMPLE_RISKS_US: import('./types').RiskMatrixItem[] = [
  {
    id: "RSK-US-01",
    risk_category: "Contractual",
    title: "Liquidated Damages Exposure ($2,500/day Uncapped Delay Penalties)",
    likelihood: 4,
    cost_impact: 4,
    calculated_score: 16,
    severity: "HIGH",
    internal_lessons_learned: "On Methodist West Hospital expansion, mechanical room dry-in delay caused 42-day milestone slip. Owner attempted $105,000 LD assessment until resolved via joint CPM schedule analysis.",
    recommended_mitigation: "Submit Pre-Bid Query RFI-US-03 to tie delay damages strictly to mechanical contractor critical path delays and insert 14-day weather grace provisions.",
    external_scan_data: "City of Austin mechanical inspection backlog currently averages 12-16 business days for final occupancy sign-off."
  },
  {
    id: "RSK-US-02",
    risk_category: "Supply Chain",
    title: "Long Lead Times on Magnetic Bearing Chillers (24-28 Weeks)",
    likelihood: 4,
    cost_impact: 5,
    calculated_score: 20,
    severity: "EXTREME",
    internal_lessons_learned: "Factory lead times for custom variable-speed centrifugal chillers have averaged 26 weeks. Delay in submittal review or starter voltage resolution halts equipment release.",
    recommended_mitigation: "Issue early submittal package within 10 days of notice of award; negotiate pre-purchased production slots with Daikin Applied.",
    external_scan_data: "Supply chain report indicates domestic commercial HVAC equipment backlogs remain elevated at 22-26 weeks across North America."
  },
  {
    id: "RSK-US-03",
    risk_category: "Financial & Cashflow",
    title: "10% Retainage Retention Impact on Operating Working Capital",
    likelihood: 3,
    cost_impact: 3,
    calculated_score: 9,
    severity: "MEDIUM",
    internal_lessons_learned: "Holding 10% retainage across an 18-month hospital project ties up ~$1,085,000 until punch list closeout.",
    recommended_mitigation: "Negotiate retainage reduction from 10% to 5% upon reaching 50% physical completion, as permitted under standard Texas public works practice.",
    external_scan_data: "Federal Reserve interest rate projections indicate commercial borrowing costs of 6.25% for revolving credit lines."
  },
  {
    id: "RSK-US-04",
    risk_category: "Contractual",
    title: "Davis-Bacon Act Prevailing Wage & Certified Payroll Audit Risk",
    likelihood: 2,
    cost_impact: 4,
    calculated_score: 8,
    severity: "MEDIUM",
    internal_lessons_learned: "Failure to capture lower-tier subcontractor sheet metal journeyman wages can prompt Department of Labor payroll audit penalties and payment withholding.",
    recommended_mitigation: "Require all trade subcontractors to submit weekly certified payroll reports via LCPtracker electronic compliance software.",
    external_scan_data: "Department of Labor Wage and Hour Division has increased healthcare public work audit enforcement by 24%."
  }
];

export const SAMPLE_SUBMISSION_FORMS_US: import('./types').SubmissionForm[] = [
  {
    id: "FRM-US-01",
    form_code: "AIA A305",
    form_name: "AIA Document A305-2020 Contractor's Qualification Statement",
    category: "General",
    fields_total: 16,
    fields_autofilled: 16,
    status: "COMPLETED",
    key_fields: [
      { label: "Contractor Legal Entity", value: "Preconstruct MEP Builders LLC", source: "Company Vault / SAM.gov", verified: true },
      { label: "State of Organization / EIN", value: "Delaware LLC / EIN 82-4190821", source: "IRS SS-4 Form", verified: true },
      { label: "CAGE Code / UEI", value: "CAGE: 7X9K2 / UEI: K8J2N4M884L1", source: "SAM.gov Active Entity", verified: true },
      { label: "Surety & Agent", value: "Travelers Casualty and Surety Co (Agent: Marsh McLennan)", source: "Surety Letter of Bondability", verified: true }
    ]
  },
  {
    id: "FRM-US-02",
    form_code: "SF-1442",
    form_name: "Standard Form 1442: Solicitation, Offer, and Award (Construction)",
    category: "Financial",
    fields_total: 20,
    fields_autofilled: 20,
    status: "COMPLETED",
    key_fields: [
      { label: "Solicitation Number", value: "RFP-2026-ARMC-MEP-09", source: "Tender Intake", verified: true },
      { label: "Total Base Offer Amount", value: "$10,850,000.00 USD", source: "Master BOQ & CSI Pricing Grid", verified: true },
      { label: "Calendar Days for Performance", value: "480 Calendar Days from Notice to Proceed", source: "Project CPM Schedule", verified: true },
      { label: "Authorized Signatory", value: "Michael R. Vance (Vice President Preconstruction)", source: "Corporate Resolution", verified: true }
    ]
  },
  {
    id: "FRM-US-03",
    form_code: "FAR 52.204-24",
    form_name: "FAR 52.204-24: Representation Regarding Covered Telecommunications",
    category: "General",
    fields_total: 10,
    fields_autofilled: 10,
    status: "COMPLETED",
    key_fields: [
      { label: "Covered Equipment Use", value: "Will NOT provide covered telecommunications equipment (Huawei, Dahua, Hikvision, ZTE)", source: "Supply Chain Audit 2026", verified: true },
      { label: "Building Automation Hardware", value: "100% BACnet BTL Certified (Johnson Controls Metasys / Trane Tracer)", source: "BMS Submittal Vault", verified: true },
      { label: "Compliance Officer", value: "Jennifer Cole, Chief Compliance Officer", source: "Ethics & Compliance Vault", verified: true }
    ]
  },
  {
    id: "FRM-US-04",
    form_code: "AIA A310",
    form_name: "AIA Document A310-2010 Bid Bond (5% Penal Sum)",
    category: "Financial",
    fields_total: 12,
    fields_autofilled: 12,
    status: "COMPLETED",
    key_fields: [
      { label: "Penal Sum (5% of Bid)", value: "$542,500.00 USD", source: "Calculated from SF-1442 Offer", verified: true },
      { label: "Surety Corporation", value: "Travelers Casualty and Surety Company of America", source: "Bond Power of Attorney", verified: true },
      { label: "Attorney-in-Fact", value: "Robert Sterling, Attorney-in-Fact", source: "Travelers Corporate Seal", verified: true }
    ]
  }
];

export const SAMPLE_ATTACHMENTS_US: import('./types').AttachmentItem[] = [
  {
    id: "ATT-US-01",
    title: "AIA Document A310 Bid Bond & Surety Power of Attorney ($542.5K)",
    tender_requirement: "Mandatory requirement as per ITB Section 4.1",
    citation_page: 8,
    matched_file_name: "Travelers_Bid_Bond_AIA_A310_Austin_Med_Signed.pdf",
    matched_file_date: "Executed 14 Oct 2026",
    validity_status: "VALID",
    file_size_kb: 640,
    is_attached: true
  },
  {
    id: "ATT-US-02",
    title: "Treasury Circular 570 Surety Financial Capacity Verification",
    tender_requirement: "Mandatory requirement as per ITB Section 4.2",
    citation_page: 14,
    matched_file_name: "Treasury_Circular_570_Travelers_Surety_Listing.pdf",
    matched_file_date: "Current FY2026 Publication",
    validity_status: "VALID",
    file_size_kb: 420,
    is_attached: true
  },
  {
    id: "ATT-US-03",
    title: "Certificate of Liability Insurance (ACORD 25 with $10M Umbrella)",
    tender_requirement: "Mandatory requirement as per General Conditions Section 11",
    citation_page: 42,
    matched_file_name: "ACORD_25_Certificate_Insurance_Austin_Healthcare.pdf",
    matched_file_date: "Valid through 31 Dec 2027",
    validity_status: "VALID",
    file_size_kb: 380,
    is_attached: true
  },
  {
    id: "ATT-US-04",
    title: "SAM.gov Active Entity Registration Record (UEI K8J2N4M884L1)",
    tender_requirement: "Mandatory requirement as per Federal Solicitation Clauses",
    citation_page: 6,
    matched_file_name: "SAM_gov_Entity_Validation_Preconstruct_Active.pdf",
    matched_file_date: "Renewal Date: 12 Aug 2027",
    validity_status: "VALID",
    file_size_kb: 510,
    is_attached: true
  },
  {
    id: "ATT-US-05",
    title: "OSHA 300A Summary of Injuries & Workers Comp EMR Rating (0.78)",
    tender_requirement: "Mandatory safety criteria as per ITB Section 7.3",
    citation_page: 29,
    matched_file_name: "Safety_EMR_Rating_Letter_0_78_NCCI_Certified.pdf",
    matched_file_date: "Certified 01 June 2026",
    validity_status: "VALID",
    file_size_kb: 290,
    is_attached: true
  }
];

export const SAMPLE_SUBCONTRACTOR_BIDS_US: import('./types').SubcontractorQuote[] = [
  {
    vendor_id: "VND-US-01",
    vendor_name: "McKinstry Mechanical Contractors",
    contact_person: "David Miller (Preconstruction Executive)",
    quoted_base_usd: 1285000.00,
    delivery_weeks: 12,
    warranty_months: 24,
    detected_exclusions: ["Excludes seismic restraint cables (IBC Category D)", "Excludes fire damper 120V power interlocks to fire alarm panel"],
    normalized_additions_usd: 75000.00,
    final_leveled_usd: 1360000.00,
    currency: "USD",
    rank: 1,
    compliance_rating: "FULL"
  },
  {
    vendor_id: "VND-US-02",
    vendor_name: "Southland Industries",
    contact_person: "Sarah Jenkins (Director of Estimating)",
    quoted_base_usd: 1340000.00,
    delivery_weeks: 14,
    warranty_months: 36,
    detected_exclusions: ["Excludes sound attenuator testing and acoustic baffles", "Excludes crane hoisting rigging for rooftop units"],
    normalized_additions_usd: 55000.00,
    final_leveled_usd: 1395000.00,
    currency: "USD",
    rank: 2,
    compliance_rating: "PARTIAL"
  },
  {
    vendor_id: "VND-US-03",
    vendor_name: "TDIndustries Inc",
    contact_person: "Marcus Vance (Senior MEP Estimator)",
    quoted_base_usd: 1410000.00,
    delivery_weeks: 10,
    warranty_months: 36,
    detected_exclusions: ["Full turnkey scope included; zero exclusions detected"],
    normalized_additions_usd: 0.00,
    final_leveled_usd: 1410000.00,
    currency: "USD",
    rank: 3,
    compliance_rating: "FULL"
  }
];

export const INITIAL_BOQ_ITEMS_US: import('./types').BOQItem[] = [
  {
    id: "BOQ-US-01",
    csi_code: "23 31 13.13",
    description: "Galvanized Steel Ductwork (18 Gauge / SMACNA 4\" W.G. Medium Pressure Construction)",
    trade: "Supply Air",
    quantity: 653.15,
    unit: "sq ft",
    unit_rate_usd: 18.50,
    total_usd: 12083.28,
    currency: "USD",
    provenance: "MEASURED",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "DR-01 Primary Supply Header [250, 330] to [380, 230]",
    standard_ref: "SMACNA 3rd Ed Table 2-1"
  },
  {
    id: "BOQ-US-02",
    csi_code: "23 31 13.13",
    description: "Galvanized Steel Ductwork (20 Gauge / SMACNA 2\" W.G. Low Pressure Construction)",
    trade: "Supply & Return",
    quantity: 1272.72,
    unit: "sq ft",
    unit_rate_usd: 15.20,
    total_usd: 19345.34,
    currency: "USD",
    provenance: "MEASURED",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "DR-02 & DR-04 Secondary Branches",
    standard_ref: "SMACNA 3rd Ed Table 2-1"
  },
  {
    id: "BOQ-US-03",
    csi_code: "23 31 13.13",
    description: "Galvanized Steel Ductwork (22 Gauge / SMACNA 2\" W.G.)",
    trade: "Supply Air",
    quantity: 302.04,
    unit: "sq ft",
    unit_rate_usd: 13.50,
    total_usd: 4077.54,
    currency: "USD",
    provenance: "MEASURED",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "DR-03 Runout Distribution",
    standard_ref: "SMACNA 3rd Ed Table 2-1"
  },
  {
    id: "BOQ-US-04",
    csi_code: "23 31 13.13",
    description: "Galvanized Steel Toilet Exhaust Ductwork (24 Gauge)",
    trade: "Toilet Exhaust",
    quantity: 143.16,
    unit: "sq ft",
    unit_rate_usd: 11.80,
    total_usd: 1689.29,
    currency: "USD",
    provenance: "MEASURED",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "DR-05 Exhaust Drops",
    standard_ref: "SMACNA 3rd Ed Table 2-1"
  },
  {
    id: "BOQ-US-05",
    csi_code: "23 07 13.13",
    description: "Closed-Cell Elastomeric Duct Thermal Insulation (1-inch thick, ASTM C534)",
    trade: "Insulation",
    quantity: 2352.88,
    unit: "sq ft",
    unit_rate_usd: 8.50,
    total_usd: 19999.48,
    currency: "USD",
    provenance: "MEASURED",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "Outer Duct Perimeter Insulation",
    standard_ref: "ASHRAE Standard 90.1-2022"
  },
  {
    id: "BOQ-US-06",
    csi_code: "23 37 13.13",
    description: "Supply Air Diffusers (24\" × 24\" Architectural Lay-In, Titus TDC with Opposed Blade Damper)",
    trade: "Air Terminals",
    quantity: 28,
    unit: "EA",
    unit_rate_usd: 185.00,
    total_usd: 5180.00,
    currency: "USD",
    provenance: "MEASURED",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "SAD-01 Pattern Matched (28 points)",
    standard_ref: "Tender Spec 23 37 13"
  },
  {
    id: "BOQ-US-07",
    csi_code: "23 37 13.23",
    description: "Perforated Return Air Grilles (24\" × 24\" with Steel Backpan)",
    trade: "Air Terminals",
    quantity: 14,
    unit: "EA",
    unit_rate_usd: 145.00,
    total_usd: 2030.00,
    currency: "USD",
    provenance: "MEASURED",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "RAD-01 (14 points)",
    standard_ref: "Tender Spec 23 37 13"
  },
  {
    id: "BOQ-US-08",
    csi_code: "23 37 13.33",
    description: "Exhaust Air Louvered Grilles (12\" × 12\" with Insect Screen)",
    trade: "Air Terminals",
    quantity: 8,
    unit: "EA",
    unit_rate_usd: 95.00,
    total_usd: 760.00,
    currency: "USD",
    provenance: "MEASURED",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "EAG-01 (8 points)",
    standard_ref: "Tender Spec 23 37 13"
  },
  {
    id: "BOQ-US-09",
    csi_code: "23 33 13.13",
    description: "Combination Fire & Smoke Damper (UL 555S Class I, 250°F, 120V Belimo Actuator)",
    trade: "Fire & Safety",
    quantity: 2,
    unit: "EA",
    unit_rate_usd: 1850.00,
    total_usd: 3700.00,
    currency: "USD",
    provenance: "READ",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "FD1 (64\"x18\"), FD4 (18\"x10\")",
    standard_ref: "UL 555 / NFPA 90A"
  },
  {
    id: "BOQ-US-10",
    csi_code: "23 33 13.11",
    description: "Dynamic Fire Damper (1-1/2 Hour, Curtain Type, UL 555 Classified)",
    trade: "Fire & Safety",
    quantity: 2,
    unit: "EA",
    unit_rate_usd: 650.00,
    total_usd: 1300.00,
    currency: "USD",
    provenance: "READ",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "FD2 (48\"x16\"), FD3 (32\"x14\")",
    standard_ref: "UL 555 / SMACNA"
  },
  {
    id: "BOQ-US-11",
    csi_code: "23 74 13.00",
    description: "Custom Central Station Air Handling Unit (35 Ton, 12,000 CFM, Dual Direct Drive Fans with ECM, MERV 14)",
    trade: "Equipment",
    quantity: 1,
    unit: "EA",
    unit_rate_usd: 148000.00,
    total_usd: 148000.00,
    currency: "USD",
    provenance: "LOOK",
    source_sheet: "AUSTIN/HVAC/M-101 Rev 2",
    source_ref: "AHU-05 [Mechanical Room M-05]",
    standard_ref: "Spec Section 23 74 13"
  }
];


