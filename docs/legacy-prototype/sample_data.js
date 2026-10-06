// Ground-Truth Sample Dataset: Manipal Sports Complex HVAC Tender Drawing (Sheet 2 of 5)
// Reference Ref: KCEPL/HVAC/007 | Project No: KCEPL/MANIPAL/JAIPUR/25-26/872

window.VANIK_SAMPLE_DATA = {
  project_info: {
    project_name: "Manipal Sports Complex",
    drawing_title: "Proposed HVAC Layout First Floor",
    drawing_no: "KCEPL/HVAC/007 Rev R1",
    client: "Manipal Sports Complex, Jaipur",
    consultant: "Kapse Consulting Engineers Pvt. Ltd., Thane West",
    scale_ratio: 100, // 1:100
    page_format: "ISO A3 Landscape",
    floor_level: "First Floor (SSL +108.50 M)"
  },

  equipment_findings: [
    {
      id: "FF-FA-AHU-01",
      tag: "AHU-01",
      type: "Draw-Through Air Handling Unit",
      capacity_tr: 28.0,
      airflow_cfm: 11200,
      zone: "Cricket Practice Nets (West Wing)",
      pipe_nb_mm: 65,
      x: 155, y: 195, w: 55, h: 40,
      confidence: "High",
      spec: "28 TR / 11,200 CFM · DIDW Centrifugal · Starter Panel for BMS"
    },
    {
      id: "FF-FA-AHU-02",
      tag: "AHU-02",
      type: "Draw-Through Air Handling Unit",
      capacity_tr: 28.0,
      airflow_cfm: 11200,
      zone: "Table Tennis & Billiards",
      pipe_nb_mm: 65,
      x: 155, y: 310, w: 55, h: 40,
      confidence: "High",
      spec: "28 TR / 11,200 CFM · 1600x700 Capsule SAD · 25mm Acoustic"
    },
    {
      id: "FF-FA-AHU-03",
      tag: "AHU-03",
      type: "Central Circulation AHU",
      capacity_tr: 20.0,
      airflow_cfm: 8000,
      zone: "Central Lobby & 3.0m Passage",
      pipe_nb_mm: 50,
      x: 620, y: 380, w: 50, h: 35,
      confidence: "High",
      spec: "20 TR / 8,000 CFM · DIDW Centrifugal Fan"
    },
    {
      id: "FF-FA-AHU-04",
      tag: "AHU-04",
      type: "Pickleball West Court AHU",
      capacity_tr: 25.5,
      airflow_cfm: 10200,
      zone: "Pickleball Courts 1 & 2",
      pipe_nb_mm: 65,
      x: 940, y: 195, w: 55, h: 40,
      confidence: "High",
      spec: "25.5 TR / 10,200 CFM · Ø1200mm Spiral Duct · BMS Interlock"
    },
    {
      id: "FF-FA-AHU-05",
      tag: "AHU-05",
      type: "Pickleball East Court AHU",
      capacity_tr: 25.5,
      airflow_cfm: 10200,
      zone: "Pickleball Court 3 & Spectators",
      pipe_nb_mm: 65,
      x: 940, y: 345, w: 55, h: 40,
      confidence: "High",
      spec: "25.5 TR / 10,200 CFM · Ø1200mm Spiral Duct · 25mm Inside Ins."
    },
    {
      id: "CSU-FCU-01",
      tag: "FCU-01",
      type: "Ceiling Chilled Water FCU",
      capacity_tr: 1.5,
      airflow_cfm: 600,
      zone: "Hub Room (Grid C-5)",
      pipe_nb_mm: 25,
      x: 185, y: 445, w: 25, h: 20,
      confidence: "High",
      spec: "1.5 TR / 600 CFM · High Static Ceiling Suspended"
    },
    {
      id: "HI-WALL-01",
      tag: "SPLIT-01",
      type: "Ductless Inverter Split AC",
      capacity_tr: 2.0,
      airflow_cfm: 750,
      zone: "Electrical & UPS Room",
      pipe_nb_mm: 16,
      x: 645, y: 235, w: 30, h: 15,
      confidence: "High",
      spec: "2.0 TR Inverter DX Unit · R410A Refrigerant"
    },
    {
      id: "SPF-01",
      tag: "PRESS-01",
      type: "Staircase Pressurization Fan",
      capacity_tr: 0.0,
      airflow_cfm: 12000,
      zone: "Fire Staircase ST-1",
      pipe_nb_mm: 0,
      x: 165, y: 400, w: 35, h: 30,
      confidence: "High",
      spec: "12,000 CFM at 50 Pa · Essential DG Emergency Power"
    }
  ],

  duct_measurements: [
    {
      id: "DUCT-01",
      tag: "SAD-CAPSULE-1600",
      description: "GI Capsule Supply Duct (1600x700 mm)",
      system: "Supply Air",
      size_mm: "1600 x 700",
      length_rmt: 14.50,
      gauge: "20G (1.00 mm)",
      surface_area_sqmt: 66.70,
      insulation_spec: "25mm Internal Acoustic Nitrile",
      insulation_sqmt: 66.70,
      unit_rate: 48.00,
      total_cost: 3201.60
    },
    {
      id: "DUCT-02",
      tag: "SAD-REDUCER-1600/1050",
      description: "GI Concentric Transition Reducer (1600 to 1050 mm)",
      system: "Supply Air",
      size_mm: "1600/1050 x 700",
      length_rmt: 1.20,
      gauge: "20G (1.00 mm)",
      surface_area_sqmt: 4.86,
      insulation_spec: "25mm Internal Acoustic Nitrile",
      insulation_sqmt: 4.86,
      unit_rate: 55.00,
      total_cost: 267.30
    },
    {
      id: "DUCT-03",
      tag: "SAD-CAPSULE-1050",
      description: "GI Capsule Supply Duct (1050x700 mm)",
      system: "Supply Air",
      size_mm: "1050 x 700",
      length_rmt: 18.00,
      gauge: "22G (0.80 mm)",
      surface_area_sqmt: 63.00,
      insulation_spec: "25mm Internal Acoustic Nitrile",
      insulation_sqmt: 63.00,
      unit_rate: 42.00,
      total_cost: 2646.00
    },
    {
      id: "DUCT-04",
      tag: "SAD-SPIRAL-Ø1200",
      description: "Spiral Circular Supply Duct (Ø1200 mm)",
      system: "Supply Air",
      size_mm: "Ø1200 Circular",
      length_rmt: 12.00,
      gauge: "20G (1.00 mm)",
      surface_area_sqmt: 45.24,
      insulation_spec: "Uninsulated Exposed Spiral",
      insulation_sqmt: 0.00,
      unit_rate: 52.00,
      total_cost: 2352.48
    },
    {
      id: "DUCT-05",
      tag: "SAD-SPIRAL-Ø700",
      description: "Spiral Circular Supply Duct (Ø700 mm)",
      system: "Supply Air",
      size_mm: "Ø700 Circular",
      length_rmt: 16.50,
      gauge: "22G (0.80 mm)",
      surface_area_sqmt: 36.28,
      insulation_spec: "Uninsulated Exposed Spiral",
      insulation_sqmt: 0.00,
      unit_rate: 44.00,
      total_cost: 1596.32
    },
    {
      id: "DUCT-06",
      tag: "RAD-HEADER-1250",
      description: "GI Low-Velocity Return Air Duct (1250x500 mm)",
      system: "Return Air",
      size_mm: "1250 x 500",
      length_rmt: 22.00,
      gauge: "22G (0.80 mm)",
      surface_area_sqmt: 77.00,
      insulation_spec: "Uninsulated Return Air",
      insulation_sqmt: 0.00,
      unit_rate: 38.00,
      total_cost: 2926.00
    },
    {
      id: "DUCT-07",
      tag: "EAD-TOILET-450",
      description: "GI Toilet Exhaust Header Duct (450x300 mm)",
      system: "Exhaust Air",
      size_mm: "450 x 300",
      length_rmt: 16.00,
      gauge: "24G (0.63 mm)",
      surface_area_sqmt: 24.00,
      insulation_spec: "Uninsulated Exhaust",
      insulation_sqmt: 0.00,
      unit_rate: 34.00,
      total_cost: 816.00
    }
  ],

  air_terminals: [
    { tag: "SIDE THROW GRILLE", type: "Linear Side Throw Grille 600x150", count: 64, unit: "No", airflow_cfm: 350, unit_rate: 85.00, total_cost: 5440.00 },
    { tag: "RETURN AIR GRILLE", type: "Sight-Proof Inverted V Grille 600x600", count: 22, unit: "No", airflow_cfm: 800, unit_rate: 65.00, total_cost: 1430.00 },
    { tag: "EXHAUST GRILLE", type: "Aluminum Toilet Exhaust Grille 300x300", count: 16, unit: "No", airflow_cfm: 175, unit_rate: 35.00, total_cost: 560.00 },
    { tag: "LV", type: "Weatherproof Sand/Rain Intake Louver 1800x1200", count: 6, unit: "No", airflow_cfm: 4500, unit_rate: 220.00, total_cost: 1320.00 }
  ],

  fire_dampers: [
    { tag: "FDA", type: "Motorized Fire & Smoke Damper Class 1 (2-Hour)", count: 10, unit: "No", actuator: "230V Spring-Return Electric", unit_rate: 450.00, total_cost: 4500.00 },
    { tag: "FD1-FD5", type: "Curtain Fusible Link Fire Damper 74°C", count: 24, unit: "No", actuator: "Mechanical Fusible Link", unit_rate: 120.00, total_cost: 2880.00 }
  ],

  hydronics: [
    { tag: "CHWS/R-65", description: "MS Heavy Class C Chilled Water Pipe (65mm NB / 2.5 Inch)", length_rmt: 97.0, insulation: "50mm Nitrile + Alum Cladding", unit_rate: 90.00, total_cost: 8730.00 },
    { tag: "VALVE-PKG", description: "AHU Hookup Valve Package (PICV, DRV, Y-Strainer, Isolation)", count: 5, unit: "Set", unit_rate: 1850.00, total_cost: 9250.00 },
    { tag: "DRAIN-40", description: "uPVC Condensate Gravity Drainage Pipe (40mm NB)", length_rmt: 64.0, insulation: "9mm Elastomeric Nitrile", unit_rate: 18.00, total_cost: 1152.00 }
  ],

  batch_tender_data: {
    summary: {
      tender_title: "Manipal Sports Complex - Phase 1 Tender Package",
      total_files: 8,
      total_pages: 36,
      disciplines_count: 5,
      total_components: 842,
      total_contract_estimate: "$384,250.00"
    },
    by_discipline: [
      { name: "HVAC Mechanical", code: "DIV-23", files: 2, pages: 10, total_items: 218, cost: "$136,345.00" },
      { name: "Electrical & Lighting", code: "DIV-26", files: 2, pages: 12, total_items: 384, cost: "$118,500.00" },
      { name: "Plumbing & Drainage", code: "DIV-22", files: 2, pages: 8, total_items: 142, cost: "$64,200.00" },
      { name: "Fire Protection", code: "DIV-21", files: 1, pages: 4, total_items: 68, cost: "$42,400.00" },
      { name: "Structural Framing", code: "DIV-05", files: 1, pages: 2, total_items: 30, cost: "$22,805.00" }
    ]
  }
};
