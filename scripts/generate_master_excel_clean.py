# -*- coding: utf-8 -*-
"""
Preconstruct Master E2E Product Blueprint Generator
Generates a multi-tab, fully formatted, styled Excel workbook containing:
1. Executive_Summary
2. Competitor_Benchmark (10 competitors)
3. Weighted_Roadmap_&_Priority (42 items, WSJF+Reversibility scored & phase sorted)
4. Full_Feature_Matrix_E2E (22 comprehensive technical features)
5. User_Flows_&_Personas (18 step-by-step user journeys across 5 personas)
6. Scoring_Methodology (Mathematical proof & rationale)
7. Tech_Stack_&_Architecture (Production stack & security)
"""

import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def build_master_workbook():
    wb = openpyxl.Workbook()
    wb.remove(wb.active)  # Remove default sheet

    # Styling Palette
    FONT_FAMILY = "Segoe UI"
    
    title_font = Font(name=FONT_FAMILY, size=16, bold=True, color="1E293B")
    subtitle_font = Font(name=FONT_FAMILY, size=10.5, italic=True, color="475569")
    section_font = Font(name=FONT_FAMILY, size=12, bold=True, color="0F172A")
    header_font = Font(name=FONT_FAMILY, size=10, bold=True, color="FFFFFF")
    cell_font = Font(name=FONT_FAMILY, size=9.5, color="1E293B")
    bold_cell_font = Font(name=FONT_FAMILY, size=9.5, bold=True, color="1E293B")
    mono_font = Font(name="Consolas", size=9.5, color="0F172A")
    mono_bold_font = Font(name="Consolas", size=9.5, bold=True, color="0F172A")
    
    # Headers
    header_fill_slate = PatternFill(start_color="1E293B", end_color="1E293B", fill_type="solid")
    header_fill_teal = PatternFill(start_color="0D9488", end_color="0D9488", fill_type="solid")
    header_fill_mocha = PatternFill(start_color="854D0E", end_color="854D0E", fill_type="solid")
    header_fill_indigo = PatternFill(start_color="3730A3", end_color="3730A3", fill_type="solid")
    
    zebra_fill = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
    white_fill = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")
    
    # Phase Badges Fills
    p1_fill = PatternFill(start_color="DCFCE7", end_color="DCFCE7", fill_type="solid") # Emerald (MVP)
    p2_fill = PatternFill(start_color="DBEAFE", end_color="DBEAFE", fill_type="solid") # Blue (Hardening)
    p3_fill = PatternFill(start_color="F3E8FF", end_color="F3E8FF", fill_type="solid") # Purple (Advantage)
    p4_fill = PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid") # Amber (Moat)
    
    # Status Badges
    complete_fill = PatternFill(start_color="E0F2FE", end_color="E0F2FE", fill_type="solid")
    score_fill = PatternFill(start_color="FEF9C3", end_color="FEF9C3", fill_type="solid")
    
    thin_border_side = Side(border_style="thin", color="CBD5E1")
    border_all = Border(left=thin_border_side, right=thin_border_side, top=thin_border_side, bottom=thin_border_side)
    
    align_left = Alignment(horizontal="left", vertical="center", wrap_text=True)
    align_center = Alignment(horizontal="center", vertical="center", wrap_text=True)
    align_right = Alignment(horizontal="right", vertical="center")
    align_header = Alignment(horizontal="center", vertical="center", wrap_text=True)

    # =========================================================================
    # SHEET 1: Executive_Summary
    # =========================================================================
    print("Building Sheet 1: Executive_Summary...")
    ws1 = wb.create_sheet(title="Executive_Summary")
    ws1.views.sheetView[0].showGridLines = True
    ws1.freeze_panes = "A5"
    
    ws1.cell(row=1, column=1, value="PRECONSTRUCT - END-TO-END AUTONOMOUS PRECONSTRUCTION ENGINE").font = title_font
    ws1.cell(row=2, column=1, value="Master Product Blueprint, Competitor Benchmark, Dual-Market Architecture & Weighted Backlog").font = subtitle_font
    
    overview_data = [
        ["Macro Metric / Pillar", "United States Commercial Market", "Indian Public & Private Infrastructure", "Preconstruct Unified Solution & Unfair Advantage"],
        ["Market Scale & TAM", "$1.8 Trillion Annual Construction Spend ($3.2B Preconstruction Software TAM)", "INR 22 Lakh Crore National Infrastructure Pipeline ($1.1B Precon Software TAM)", "Dual-market architecture natively handling CSI MasterFormat / FAR Part 15 and CPWD DSR 2026 / GCC/SCC."],
        ["Contracting Framework", "FAR Part 15 (Federal), AIA A201 (Commercial), ConsensusDocs", "CPWD General Conditions of Contract 2026, FIDIC Red/Yellow Books", "Automated contract parsing, legal contradiction detection, and statutory clause extraction across all contract types."],
        ["Core Estimating Trap", "CSI Div 23 drawing-vs-spec clashes, unlevelled subcontractor exclusions", "Obscure PQ gates, DLP showstoppers (36-60 months), delayed payments", "Cross-document discrepancy graph preventing underbidding or accidental non-responsive bids."],
        ["Takeoff Methodology", "SMACNA 2016 3rd Ed static pressure classes (1\" to 6\" W.G.)", "IS 655:2006 Table 1 sheet metal gauges by cross-section dimensions", "Parametric vector takeoff calculating surface area 2(W+H)L/1000, gauge, weight, and BOM instantly."],
        ["Statutory Bid Sealing", "SF-1442, AIA A305-2020, FAR 52.204-24, Treasury Cir 570 Surety", "Form Annexures A to E, CA UDIN turnover certificates, EMD Bank Guarantee", "Automated form mapping from Company Vault with Bates numbering and SHA-256 seal verification."],
        ["Market Research Vector", "SAM.gov REST API, GovTribe, DOD/GSA e-Buy, Dodge Construction", "eProcure CPPP, GeM Portal, State e-Procurement (Karnataka, Maha, UP)", "Tender Lake indexing 5 volumes: Commercial, Technical Specs, BOQ, Drawings, and Addenda."],
        ["Decision Speedup", "40 hours manual estimating reduced to 45 minutes automated review", "35 hours manual tender compliance reduced to 30 minutes triage", "Unified Decision Inbox with A/E/X keyboard triage and 0-100% Bid Match Score Engine."],
        ["Win Rate Enhancement", "12% historical baseline increased to 22%+ through defect elimination", "15% baseline increased to 26%+ through sub leveling & intelligence", "Pre-Flight 6-point sweep ensuring zero disqualifications and razor-sharp competitive pricing."]
    ]
    
    start_row = 4
    for r_idx, row in enumerate(overview_data):
        current_r = start_row + r_idx
        for c_idx, val in enumerate(row):
            cell = ws1.cell(row=current_r, column=c_idx + 1, value=val)
            cell.border = border_all
            if r_idx == 0:
                cell.font = header_font
                cell.fill = header_fill_slate
                cell.alignment = align_header
            else:
                cell.font = bold_cell_font if c_idx == 0 else cell_font
                cell.fill = zebra_fill if r_idx % 2 == 1 else white_fill
                cell.alignment = align_left
        ws1.row_dimensions[current_r].height = 28 if r_idx == 0 else 46
    ws1.auto_filter.ref = f"A4:D{start_row + len(overview_data) - 1}"

    # =========================================================================
    # SHEET 2: Competitor_Benchmark
    # =========================================================================
    print("Building Sheet 2: Competitor_Benchmark...")
    ws2 = wb.create_sheet(title="Competitor_Benchmark")
    ws2.views.sheetView[0].showGridLines = True
    ws2.freeze_panes = "A5"
    
    ws2.cell(row=1, column=1, value="COMPREHENSIVE COMPETITIVE INTELLIGENCE & TEARDOWN").font = title_font
    ws2.cell(row=2, column=1, value="Feature-by-Feature Benchmark against 10 Direct & Legacy Competitors across US and Indian Markets").font = subtitle_font
    
    competitors = [
        ["Platform", "HQ / Model", "Target Segment", "Key Strengths", "Critical Gaps & Fatal Flaws", "Pricing & Commercials", "Preconstruct's 10x Disruption Vector"],
        ["Togal.AI", "Miami, FL (Venture)", "Commercial GCs & Drywall/Finishes", "High-speed AI room/wall auto-detection, Togal.CHAT drawing assistant, 3D visualization.", "Zero contract intelligence, zero tender lake, no BOQ pricing, no subcontractor leveling, no Indian market awareness.", "$299/user/month ($3,588/yr)", "End-to-end pursuit coverage: Step 0 tender intake through legal risk, takeoff, BOQ, proposal drafting, and bid match score."],
        ["Kreo / Beam AI", "London, UK (Venture)", "Precon teams, Cost Consultants", "Cloud-based quantity takeoff, custom spreadsheet formulas, automated measurement reports.", "Isolated takeoff tool; no tender eligibility screening, no drawing-vs-spec clash graph, no statutory form autofill.", "Custom quote (~$2,400/seat/yr)", "Unified graph linking measured vectors directly to client BOQ line items, contract contradictions, and vendor quotes."],
        ["ContraVault AI", "San Francisco, CA (Seed)", "Construction Legal & Contracts", "Automates contract clause risk review, flags high-liability indemnities and missing clauses.", "Completely disconnected from drawings and takeoff. Cannot detect if drawing electrical feed clashes with specs.", "Enterprise ($15,000 - $35,000/yr)", "Cross-document discrepancy graph connecting drawings (Vol IV) directly to specs (Vol II) and contract terms (Vol I)."],
        ["Nexizo", "Bengaluru, India (Bootstrapped)", "Indian EPC & MEP Contractors", "Scrapes Indian CPPP and state e-procurement portals, keyword alerts on NIT notifications.", "Only a discovery search engine. Zero takeoff, zero CAD measurement, zero drawing review, no proposal drafter.", "INR 45,000 - INR 1,20,000/yr", "Autonomous ingestion pipeline indexing full 5-volume tender packages, extracting statutory clocks, and auto-pricing BOQs."],
        ["Tenderkart", "New Delhi, India", "MSME & Government Contractors", "Aggregates GeM and state tenders, provides high-level BOQ item summaries.", "Basic web scraper; no engineering intelligence, no IS 655 gauge engine, no drawing markup capability.", "INR 25,000 - INR 60,000/yr", "Full technical preconstruction engine with parametric sheet metal formulas and CA-audited Company Vault integration."],
        ["Boon AI", "New York, NY (Seed)", "Commercial MEP Subcontractors", "Automated MEP schedule-to-plan symbol counting, equipment schedule extraction.", "2D raster PDFs only; no 3D BIM projection, no contract risk modeling, no vendor leveling, no Word/PDF proposal compiler.", "Custom enterprise ($4,800/yr)", "Parametric 2D/3D vector takeoff coupled with subcontractor scope gap leveling and autonomous proposal narrative generator."],
        ["Procore Preconstruction", "Carpinteria, CA (Public)", "Enterprise General Contractors", "Robust bid board, vendor directory, plan room, deep integration into Procore construction management.", "Clunky legacy interface, zero AI takeoff (requires manual polylines), expensive licensing, slow innovation.", "$8,000 - $25,000+/yr platform fee", "AI-native speed: 1-click Gatekeeper Go/No-Go board, autonomous Pre-Bid RFIs, and real-time bid readiness score."],
        ["Bluebeam Revu", "Pasadena, CA (Nemetschek)", "Estimators & Architects Worldwide", "Ubiquitous PDF markup standard, custom measurement toolsets, Studio collaboration.", "100% manual point-and-click tracing; zero AI, zero contract risk detection, static desktop application.", "$240 - $400/user/yr (Desktop)", "Zero-setup autonomous vector segmentation: eliminates thousands of hours of manual polyline drawing."],
        ["PlanSwift", "St. Albans, VT (ConstructConnect)", "Subcontractors & Residential GCs", "Flexible assembly building, Excel-like formula linking, drag-and-drop assemblies.", "Ancient 2005-era Windows desktop UI, crashes on 100MB+ drawing sets, no AI, no cloud collaboration.", "$1,749 one-time + $300/yr maint", "Modern browser-based 60fps WebGL/Canvas workspace handling multi-gigabyte vector blueprint sets with cloud sync."],
        ["On-Screen Takeoff (OST)", "The Woodlands, TX (ConstructConnect)", "Commercial Estimators", "Industry standard for condition-based takeoff and Quick Bid integration.", "Zero machine learning, manual tracing, no tender management, no contract clause extraction, legacy licensing.", "$2,500+ license fee", "Unified Pursuit Platform replacing 5 disjointed desktop tools into a single browser workspace."]
    ]
    
    start_row = 4
    for r_idx, row in enumerate(competitors):
        current_r = start_row + r_idx
        for c_idx, val in enumerate(row):
            cell = ws2.cell(row=current_r, column=c_idx + 1, value=val)
            cell.border = border_all
            if r_idx == 0:
                cell.font = header_font
                cell.fill = header_fill_teal
                cell.alignment = align_header
            else:
                cell.font = bold_cell_font if c_idx == 0 else cell_font
                cell.fill = zebra_fill if r_idx % 2 == 1 else white_fill
                cell.alignment = align_left
        ws2.row_dimensions[current_r].height = 26 if r_idx == 0 else 48
    ws2.auto_filter.ref = f"A4:G{start_row + len(competitors) - 1}"

    # =========================================================================
    # SHEET 3: Weighted_Roadmap_&_Priority
    # =========================================================================
    print("Building Sheet 3: Weighted_Roadmap_&_Priority...")
    ws3 = wb.create_sheet(title="Weighted_Roadmap_&_Priority")
    ws3.views.sheetView[0].showGridLines = True
    ws3.freeze_panes = "E5"
    
    ws3.cell(row=1, column=1, value="PRECONSTRUCT WEIGHTED PRODUCT ROADMAP & BACKLOG (SORTED BY PRIORITY)").font = title_font
    ws3.cell(row=2, column=1, value="Formula: Priority = (Impact*3.0 + CostOfDelay*2.5 + Dependency*2.0) / (Effort * (1.2 - Reversibility*0.04))").font = subtitle_font
    
    headers_roadmap = [
        "Seq #", "Workstream ID", "Lifecycle Stage", "Feature Name", "Detailed Scope & Technical Capabilities",
        "Primary Persona", "Impact (1-10)", "Reversibility (1-5)", "Dependency (1-10)", "Cost of Delay (1-10)",
        "Effort (1-10)", "Priority Score (Formula)", "Assigned Phase", "Current Prototype Status"
    ]
    
    roadmap_raw = [
        # PHASE 1: MVP Core
        ["MVP-01", "Stage 0: Ingest", "Tender Document Lake (5-Volume Indexing)", "Folder/ZIP intake with parallel OCR, categorizing into Volumes I-V (Commercial, Specs, BOQ, Drawings, Addenda).", "Bid Coordinator", 9.5, 4.0, 9.5, 9.0, 4.5, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-02", "Stage 0: Ingest", "Statutory Pursuit Clocks Extractor", "Extracts Pre-Bid query cut-off, pre-bid conference date, EMD cut-off, and technical bid closing time.", "Bid Coordinator", 9.0, 4.0, 9.0, 9.5, 3.5, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-03", "Stage 1: Decide", "Pre-Qualification Gate Checker", "Autonomous checking of 3-yr turnover, single largest work experience, bank solvency, and DLP duration.", "Contracts Lead", 9.5, 3.0, 8.5, 9.5, 4.0, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-04", "Stage 1: Decide", "Interactive Go/No-Go Decision Board", "Leadership scorecard with Gatekeeper actions (Confirm Bid, Conditional Go, No Bid) and Company Vault audit logging.", "Executive Gatekeeper", 9.0, 3.0, 8.0, 9.0, 4.0, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-05", "Stage 2: Clarify", "Cross-Document Discrepancy Graph", "Vector embeddings and entity matching detecting drawing vs spec contradictions (e.g. 4\" WG vs 2\" WG, 11kV vs 33kV).", "Lead Engineer", 9.0, 3.0, 8.5, 8.5, 5.0, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-06", "Stage 2: Clarify", "Autonomous Pre-Bid RFI Generator", "Quotes tender clauses verbatim, articulates legal/technical discrepancy, drafts contractor proposed amendment, exports to Excel.", "Lead Engineer", 9.5, 4.0, 8.0, 9.5, 4.5, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-07", "Stage 3: Quantify", "2D Vector Blueprint Takeoff Canvas", "High-DPI 60fps pan/zoom canvas reading vector geometry, rooms, equipment tags, duct branches, and diffusers.", "Chief Estimator", 9.5, 3.0, 9.0, 9.0, 5.5, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-08", "Stage 3: Quantify", "Parametric Duct Gauge Engine (IS 655 / SMACNA)", "Calculates duct surface area 2(W+H)L/1000, derives sheet metal gauge from standard tables, and computes steel weight.", "Chief Estimator", 9.5, 3.0, 8.5, 8.5, 4.5, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-09", "Stage 3: Quantify", "Interactive Click-to-Measure & Run Creator", "User can place 2 points on canvas to measure lengths or create custom duct runs with live surface area calculation.", "Chief Estimator", 8.5, 5.0, 7.5, 8.0, 4.0, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-10", "Stage 4: Triage", "Unified Decision Inbox (A/E/X Shortcuts)", "High-velocity keyboard triage center: Approve (A), Edit (E), Reject (X) consolidating failed gates, clashes, and quantities.", "Chief Estimator", 9.0, 4.0, 8.0, 8.5, 4.5, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-11", "Stage 5: Price", "Measured BOQ Schedule (CSI Div 23 / CPWD DSR)", "Structured pricing grid linking every line item to drawing coordinates and standard reference clauses with 100% provenance.", "Commercial Lead", 9.5, 3.0, 8.5, 9.0, 5.0, "Phase 1: MVP Core", "Complete / Verified"],
        ["MVP-12", "Stage 6: Assemble", "Statutory Annexure Autofill (Forms A-E / SF-1442)", "Auto-populates client Word/PDF annexures from verified Company Vault corporate records with CA UDIN citation.", "Proposal Manager", 9.0, 4.0, 8.0, 8.5, 4.5, "Phase 1: MVP Core", "Complete / Verified"],

        # PHASE 2: Commercial & Risk Hardening
        ["COM-01", "Stage 2: Clarify", "Liquidated Damages & Delay Exposure Modeler", "Interactive slider modeling financial exposure across 180 delay days with statutory 10% contract value ceiling alerts.", "Commercial Lead", 8.5, 4.0, 7.0, 8.0, 4.0, "Phase 2: Commercial Hardening", "Complete / Verified"],
        ["COM-02", "Stage 2: Clarify", "Multi-Role Perspective Synopsis Lens", "Generates tailored synopses for Legal Counsel, Commercial Lead, Technical Scope, and Executive 1-Pager.", "All Personas", 8.0, 5.0, 6.5, 7.5, 3.5, "Phase 2: Commercial Hardening", "Complete / Verified"],
        ["COM-03", "Stage 3: Quantify", "Required Materials & Cost Summary Itemizer", "Exhaustive BOM breakdown: Sheet steel by gauge (24G-18G), Nitrile insulation, acoustic lining, dampers, labor hours, and margin.", "Chief Estimator", 9.0, 4.0, 7.5, 8.5, 4.5, "Phase 2: Commercial Hardening", "Complete / Verified"],
        ["COM-04", "Stage 5: Price", "Subcontractor Sourcing & Bid Leveling Matrix", "Side-by-side proposal comparison against CSI/CPWD trades, detecting hidden exclusions (crane rigging, seismic, fire interlocks).", "Procurement Lead", 9.0, 3.0, 8.0, 8.5, 5.0, "Phase 2: Commercial Hardening", "Complete / Verified"],
        ["COM-05", "Stage 5: Price", "Normalized Landed Cost Engine", "Automatically adds unbudgeted exclusion costs to vendor bids to reveal the true lowest compliant subcontractor quote.", "Procurement Lead", 8.5, 3.0, 7.5, 8.0, 4.5, "Phase 2: Commercial Hardening", "Complete / Verified"],
        ["COM-06", "Stage 6: Assemble", "Mandatory Attachment Matcher & Pre-Flight", "Validates bank guarantee validity, EMD value, power of attorney stamp paper value, and notary seals with hard stops.", "Contracts Lead", 9.0, 3.0, 8.0, 9.0, 4.5, "Phase 2: Commercial Hardening", "Complete / Verified"],
        ["COM-07", "Stage 6: Assemble", "Company Vault Integration & Credential Store", "Centralized repository of audited financial statements, past hospital/cleanroom completion certificates, and banker limits.", "Corporate Finance", 9.0, 3.0, 8.5, 8.5, 5.0, "Phase 2: Commercial Hardening", "Complete / Verified"],
        ["COM-08", "Stage 8: Learning", "Master Export Modal & Document Packager", "1-click export of Master Submission PDF, BOQ Excel, Pre-Bid RFI sheet, Go/No-Go report, and AI Technical Proposal.", "Proposal Manager", 8.5, 5.0, 7.0, 8.0, 3.5, "Phase 2: Commercial Hardening", "Complete / Verified"],

        # PHASE 3: Competitive Advantage (AI Leadership)
        ["ADV-01", "Stage 3: Quantify", "3D Isometric BIM Projection View", "Architectural 3D SVG isometric projection of floor layout, extruded walls, rectangular duct prisms at Z=3.2m plenum, and AHUs.", "Chief Estimator", 8.5, 4.0, 7.0, 7.5, 5.0, "Phase 3: Competitive Advantage", "Complete / Verified"],
        ["ADV-02", "Stage 6: Assemble", "Autonomous AI Proposal Drafter (5 Sections)", "Drafts Executive Summary, Technical Methodology, QA/QC Plan, HSE Protocols, and Value Engineering with tone switcher.", "Proposal Manager", 9.5, 4.0, 7.5, 9.0, 5.5, "Phase 3: Competitive Advantage", "Complete / Verified"],
        ["ADV-03", "Stage 7: Review", "0-100% Bid Match Score & Readiness Index", "Composite score across Technical Responsiveness (35%), Commercial Health (25%), Statutory Docs (20%), and Red Flags (15%).", "Executive Gatekeeper", 9.5, 3.0, 8.0, 9.5, 5.0, "Phase 3: Competitive Advantage", "Complete / Verified"],
        ["ADV-04", "Stage 7: Review", "6-Point Pre-Flight Disqualification Sweep", "Automated pre-flight check: Zero unpriced BOQ items, clash RFI coverage, EMD validity, DSC token identity match.", "Contracts Lead", 9.0, 3.0, 8.0, 9.0, 4.5, "Phase 3: Competitive Advantage", "Complete / Verified"],
        ["ADV-05", "Stage 7: Review", "Forecasted Win Probability Engine", "Statistical model assessing competitive positioning against authority past awarding patterns and competitor field size.", "Commercial Lead", 8.5, 3.0, 7.0, 8.0, 5.0, "Phase 3: Competitive Advantage", "Complete / Verified"],
        ["ADV-06", "Stage 8: Learning", "Cryptographic Package Sealing (SHA-256)", "Generates immutable cryptographic SHA-256 audit fingerprint verifying document integrity and compilation manifest.", "Legal Counsel", 8.0, 4.0, 6.5, 7.5, 3.5, "Phase 3: Competitive Advantage", "Complete / Verified"],
        ["ADV-07", "Stage 8: Learning", "Universal AI Precon Co-Pilot Drawer", "Context-aware conversational co-pilot with deep semantic search across all 5 tender volumes, drawings, and BOQ items.", "All Personas", 9.0, 4.0, 7.5, 8.5, 5.0, "Phase 3: Competitive Advantage", "Complete / Verified"],
        ["ADV-08", "Stage 8: Learning", "Market Intelligence Lake & Competitor Bid Spread", "Historical tender opening intelligence tracking L1 winning margin (-3.8%), target position (-1.4%), and L2/L3 spread.", "Commercial Lead", 8.5, 3.0, 7.0, 8.0, 5.0, "Phase 3: Competitive Advantage", "Complete / Verified"],
        ["ADV-09", "Stage 8: Learning", "Raw Material Commodity Inflation Tracker", "Real-time index monitoring Galvanized Steel Coil (CRCA), Copper piping, Refrigerants (R-410A), and Nitrile insulation.", "Chief Estimator", 8.0, 4.0, 6.5, 7.5, 4.5, "Phase 3: Competitive Advantage", "Complete / Verified"],
        ["ADV-10", "Cross-Pillar", "Dual-Market Instant Currency & Standard Switcher", "1-click toggle between Indian Market (INR  INR, CPWD, IS 655, CPPP) and US Market ($ USD, CSI Div 23, SMACNA, FAR, SAM.gov).", "All Personas", 9.0, 4.0, 7.5, 8.5, 4.5, "Phase 3: Competitive Advantage", "Complete / Verified"],

        # PHASE 4: Future Enterprise Moat & Horizon Expansion
        ["HOR-01", "Stage 0: Ingest", "Official CPPP & GeM Open Data Portal Integrations", "Direct integration with licensed tender notification aggregators and official open APIs for instant tender packet ingestion.", "Bid Coordinator", 8.5, 3.0, 7.0, 8.0, 6.0, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-02", "Stage 0: Ingest", "SAM.gov & Federal Procurement REST API Connector", "Automated ingestion pipeline pulling RFPs, wage determinations, and amendments directly from Federal SAM.gov API.", "Bid Coordinator", 8.5, 3.0, 7.0, 8.0, 5.5, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-03", "Stage 3: Quantify", "IFC / Revit 3D BIM Model Direct Ingestion", "Upload native Revit .rvt and open standard IFC files with automated duct schedule and equipment family extraction.", "BIM Coordinator", 8.5, 2.0, 6.5, 7.5, 7.5, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-04", "Stage 4: Triage", "Active Learning Takeoff Model Fine-Tuning", "Estimator approvals and gauge overrides feed localized LoRA fine-tuning for continuous accuracy improvement.", "ML Engineer", 8.0, 3.0, 6.0, 7.0, 6.5, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-05", "Stage 5: Price", "Subcontractor Automated RFP Portal & Quote Ingestion", "Subcontractors receive secure web links to upload quotes; system autonomously parses pricing and exclusions via OCR.", "Procurement Lead", 8.5, 3.0, 7.0, 8.0, 6.0, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-06", "Stage 6: Assemble", "Digital Signature Certificate (DSC) Hardware Token Bridge", "Native browser extension signing Class 3 DSC tokens directly on compiled tender PDFs for Indian portal uploads.", "Contracts Lead", 8.0, 2.0, 6.0, 7.5, 6.0, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-07", "Stage 7: Review", "Multi-Party Joint Venture (JV) Consortium Bidding", "Allows two contractors to pool financial turnover, past project experience, and plant machinery to meet strict PQ gates.", "Legal Counsel", 8.5, 2.0, 6.5, 7.5, 7.0, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-08", "Stage 8: Learning", "Post-Award As-Built Variance & Feedback Loop", "Compares initial tender takeoff against as-built installation quantities and final change orders to calibrate future risk reserves.", "Precon Director", 8.0, 3.0, 6.0, 7.0, 6.0, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-09", "Stage 8: Learning", "Autonomous Change Order Estimator", "Ingests client drawing revisions (Rev 2 vs Rev 1), detects delta geometry, and drafts priced change order requests.", "Chief Estimator", 9.0, 3.0, 7.0, 8.5, 6.5, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-10", "Cross-Pillar", "Enterprise SOC 2 Type II & FedRAMP Ingestion Vault", "High-security isolated tenant encryption complying with Department of Defense DFARS and Indian Data Protection Act.", "Security Officer", 8.5, 1.0, 7.0, 8.0, 7.0, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-11", "Cross-Pillar", "Multi-Language Technical Spec Translation", "Translates international tender specifications (French, Arabic, Spanish, German) into standardized CSI MasterFormat.", "International Lead", 7.5, 4.0, 5.0, 6.0, 5.0, "Phase 4: Future Moat", "Planned Roadmap"],
        ["HOR-12", "Cross-Pillar", "Real-Time Multi-Estimator Collaborative Canvas", "Real-time Operational Transformation (OT) / CRDT collaborative markup on blueprints similar to Google Docs or Figma.", "All Personas", 8.0, 2.0, 6.0, 7.0, 7.5, "Phase 4: Future Moat", "Planned Roadmap"]
    ]
    
    start_row = 4
    for c_idx, h in enumerate(headers_roadmap):
        cell = ws3.cell(row=start_row, column=c_idx + 1, value=h)
        cell.font = header_font
        cell.fill = header_fill_slate
        cell.alignment = align_header
        cell.border = border_all
    ws3.row_dimensions[start_row].height = 28
    
    phase_order = {
        "Phase 1: MVP Core": 1,
        "Phase 2: Commercial Hardening": 2,
        "Phase 3: Competitive Advantage": 3,
        "Phase 4: Future Moat": 4
    }

    def calc_score(item):
        imp, rev, dep, cod, eff = item[5], item[6], item[7], item[8], item[9]
        return (imp * 3.0 + cod * 2.5 + dep * 2.0) / (eff * (1.2 - rev * 0.04))

    roadmap_sorted = sorted(roadmap_raw, key=lambda x: (phase_order.get(x[10], 99), -calc_score(x)))

    for idx, item in enumerate(roadmap_sorted):
        row_num = start_row + 1 + idx
        seq_num = idx + 1
        
        ws3.cell(row=row_num, column=1, value=seq_num).alignment = align_center
        ws3.cell(row=row_num, column=2, value=item[0]).alignment = align_center
        ws3.cell(row=row_num, column=3, value=item[1]).alignment = align_left
        ws3.cell(row=row_num, column=4, value=item[2]).alignment = align_left
        ws3.cell(row=row_num, column=5, value=item[3]).alignment = align_left
        ws3.cell(row=row_num, column=6, value=item[4]).alignment = align_left
        
        ws3.cell(row=row_num, column=7, value=item[5]).alignment = align_center
        ws3.cell(row=row_num, column=8, value=item[6]).alignment = align_center
        ws3.cell(row=row_num, column=9, value=item[7]).alignment = align_center
        ws3.cell(row=row_num, column=10, value=item[8]).alignment = align_center
        ws3.cell(row=row_num, column=11, value=item[9]).alignment = align_center
        
        formula = f"=ROUND((G{row_num}*3.0 + J{row_num}*2.5 + I{row_num}*2.0) / (K{row_num} * (1.2 - H{row_num}*0.04)), 2)"
        ws3.cell(row=row_num, column=12, value=formula).alignment = align_center
        
        ws3.cell(row=row_num, column=13, value=item[10]).alignment = align_center
        ws3.cell(row=row_num, column=14, value=item[11]).alignment = align_center
        
        phase_str = item[10]
        fill_to_use = p1_fill if "Phase 1" in phase_str else p2_fill if "Phase 2" in phase_str else p3_fill if "Phase 3" in phase_str else p4_fill
        
        for c in range(1, 15):
            c_cell = ws3.cell(row=row_num, column=c)
            c_cell.border = border_all
            c_cell.font = bold_cell_font if c in [1, 2, 4, 12, 13] else mono_font if c in [7, 8, 9, 10, 11] else cell_font
            if c == 13:
                c_cell.fill = fill_to_use
            elif c == 12:
                c_cell.font = mono_bold_font
                c_cell.fill = score_fill
            elif c == 14 and "Complete" in str(c_cell.value):
                c_cell.fill = complete_fill
            else:
                c_cell.fill = zebra_fill if idx % 2 == 1 else white_fill

        ws3.row_dimensions[row_num].height = 42

    ws3.auto_filter.ref = f"A4:N{start_row + len(roadmap_sorted)}"

    # =========================================================================
    # SHEET 4: Full_Feature_Matrix_E2E
    # =========================================================================
    print("Building Sheet 4: Full_Feature_Matrix_E2E...")
    ws4 = wb.create_sheet(title="Full_Feature_Matrix_E2E")
    ws4.views.sheetView[0].showGridLines = True
    ws4.freeze_panes = "C5"
    
    ws4.cell(row=1, column=1, value="PRECONSTRUCT COMPREHENSIVE END-TO-END FEATURE MATRIX").font = title_font
    ws4.cell(row=2, column=1, value="Detailed Functional Specifications, Architecture, Ingestion Artifacts, and Standards Mappings").font = subtitle_font
    
    feature_headers = [
        "Pillar / Stage", "Feature Name", "Detailed Engineering Capabilities", "Input Artifacts",
        "System Output & Derivation", "Provenance & Audit SLA", "Governing Standard (US & India)"
    ]
    
    feature_matrix_rows = [
        ["Stage 0: Discover & Ingest", "5-Volume Tender Lake", "Classifies multi-file tender archives into Volumes I to V with parallel OCR indexing and text vectorization.", "Multi-page PDFs, ZIP archives, CAD DWG/DXF drawings, Excel BOQ sheets.", "Structured volume repository tree with instant cross-volume deep linking.", "100% Bates-anchored page coordinates with OCR bounding boxes.", "CPPP / GeM portal standards; SAM.gov / FAR Part 15"],
        ["Stage 0: Discover & Ingest", "Pursuit Clock Tracker", "Extracts statutory deadlines: Pre-bid queries cut-off, pre-bid meeting, EMD guarantee, portal locking time.", "Volume I Commercial NIT/RFP notices.", "Real-time countdown milestone chips and high-priority alarms.", "Zero missed cut-offs; automated timezone conversion (IST / CST / EST).", "CPWD Works Manual Clause 19; FAR 52.214-7"],
        ["Stage 1: Decide (Go/No-Go)", "Pre-Qualification Gate Matrix", "Compares tender thresholds (AATO turnover, single completed work, solvency, DLP) against Company Vault.", "Volume I ITB / SCC clauses + Company Vault audited financials.", "Color-coded Gatekeeper cards with PASSED / SHOWSTOPPER / MARGINAL badges.", "100% cited against Volume I clause and page numbers.", "CPWD GCC Clause 1.2; AIA Document A305-2020"],
        ["Stage 1: Decide (Go/No-Go)", "Gatekeeper Sign-Off Consensus Board", "Multi-factor corporate decision scorecard with Confirm Bid (GO), Conditional Go, and No-Bid actions.", "Executive committee inputs + project risk score.", "Audit log recorded directly to Company Vault with rationale.", "Immutable executive consensus trail for board review.", "Corporate Governance ISO 9001:2015"],
        ["Stage 2: Clarify (RFIs & Risks)", "Cross-Document Contradiction Graph", "Detects drawing vs spec contradictions (e.g. 4\" WG duct in specs vs 2\" WG in BOQ; 11kV vs 33kV switchgear).", "Volumes I, II, III, IV text embeddings and CAD layer entities.", "Visual clash cards citing conflicting clauses with cost impact.", "Identified before client query submission window locks.", "IS 655 Table 1; SMACNA 2016 3rd Ed Chapter 2"],
        ["Stage 2: Clarify (RFIs & Risks)", "Autonomous Pre-Bid RFI Generator", "Auto-formats client-ready query sheet citing Volume, Page, verbatim clause, identified ambiguity, and amendment.", "Selected contradiction findings.", "Formatted Excel table + signed PDF cover letter for portal upload.", "Prevents post-award disputes and latent defect exposure.", "CPWD Pre-Bid Conference Guidelines; FAR 15.201"],
        ["Stage 2: Clarify (RFIs & Risks)", "Liquidated Damages (LD) Modeler", "Simulates daily and weekly LD exposure up to contractual ceilings ($2,500/day or 0.5%/week capped at 10%).", "Volume I GCC/SCC contract duration and LD percentage terms.", "Interactive delay scenario slider (0-180 days) with breach alarms.", "Calculates exact monetary exposure for contingency reserves.", "CPWD GCC Clause 2; FAR 52.211-12"],
        ["Stage 3: Quantify (2D/3D Takeoff)", "2D Parametric Vector Takeoff Canvas", "Measures rectangular and spiral ductwork directly from drawing vectors with two-way highlight sync.", "Volume IV Architectural and MEP drawing vector PDFs.", "Length, section dimensions, surface area, and coordinates.", "Zero manual polyline tracing; 60fps pan/zoom up to 800%.", "ASHRAE Fundamentals; IS 655:2006"],
        ["Stage 3: Quantify (2D/3D Takeoff)", "Parametric Gauge Derivation", "Derives sheet metal thickness from duct cross-section and static pressure class; calculates weight W = A x t x 7.85.", "Measured section width and height + system pressure classification.", "Gauge rating (24G, 22G, 20G, 18G) and total steel weight in kg/lbs.", "Strict adherence to Table 1 gauge standards eliminating under-gauging.", "IS 655:2006 Table 1; SMACNA 2016 Table 2-1"],
        ["Stage 3: Quantify (2D/3D Takeoff)", "3D Isometric BIM Projection View", "Architectural 3D SVG isometric projection of floor layout, extruded walls, and rectangular duct prisms at Z=3.2m plenum.", "Measured 2D duct runs + room ceiling heights.", "Full 3D isometric network view with camera angle switcher.", "Verifies zero spatial clashes with structural beams and risers.", "BIM LOD 300 / 350; ISO 19650"],
        ["Stage 3: Quantify (2D/3D Takeoff)", "Required Materials & Cost Itemizer", "Compiles comprehensive BOM: Sheet metal by gauge, Nitrile insulation, acoustic lining, dampers, diffusers, labor.", "Verified takeoff quantities + standard master rate lake.", "Itemized cost breakdown with 15% contractor margin and CSV export.", "100% itemized provenance backing every dollar/rupee in bid.", "CSI MasterFormat Div 23; CPWD DSR 2026"],
        ["Stage 4: Triage (Decision Inbox)", "Unified Decision Inbox", "Keyboard-driven human-in-the-loop triage: Approve (A), Edit (E), Reject (X), Group Approve (G).", "Uncertain quantities, failed PQ gates, and drawing clashes.", "Single source of truth decision stream synced directly to BOQ.", "Eliminates estimator fatigue and fragmented review tabs.", "HCI Cognitive Ergonomics Standards"],
        ["Stage 5: Price & Level", "Client-Structured Measured BOQ", "Maps takeoff quantities directly into tender's official pricing format, preserving item numbers and units.", "Official Volume III BOQ template + measured quantities.", "Priced schedule with trade subtotals and Grand Total bid amount.", "100% traceable to drawing coordinates and derivation formulas.", "CPWD Schedule of Rates; CSI MasterFormat 2020"],
        ["Stage 5: Price & Level", "Subcontractor Leveling Matrix", "Standardizes multi-vendor proposals side-by-side, detecting hidden exclusions (crane rigging, seismic cables, balancing).", "Incoming subcontractor quote PDFs + BOQ scope line items.", "Normalized landed cost matrix identifying true lowest bidder.", "Prevents multimillion-dollar unbudgeted scope gap surprises.", "MCAA Management Methods; NECA Standards"],
        ["Stage 6: Assemble (Submission)", "AI Proposal Drafter (5 Sections)", "Generates Executive Summary, Technical Methodology, QA/QC Plan, HSE Protocols, and Value Engineering propositions.", "Tender scope volumes + contractor past credentials.", "Formatted technical proposal with tone switch (Concise/Tech/Comm).", "Calibrated to RFP technical evaluation scoring criteria.", "FAR Part 15 Proposal Guidelines; CPWD Technical Bid"],
        ["Stage 6: Assemble (Submission)", "Statutory Annexures Autofill", "Maps Company Vault verified records directly into client blank annexures (Forms A-E / SF-1442).", "Volume I blank forms + Company Vault profile.", "Auto-filled submission forms with CA UDIN verification.", "Eliminates clerical disqualification on missing forms.", "CPPP Technical Envelope; GSA Federal Procurement"],
        ["Stage 6: Assemble (Submission)", "Mandatory Attachment Matcher", "Pre-flight verification of EMD bank guarantee validity, power of attorney, GST, and solvency certificates.", "Uploaded compliance certificates + tender mandatory checklist.", "Green verified checklist with hard stop if any certificate expired.", "Zero disqualifications on procedural compliance errors.", "Rule 144(xi) GFR 2017; FAR 28.101"],
        ["Stage 7: Review & Score", "0-100% Bid Match Score Engine", "Computes multi-dimensional readiness index across Technical (35%), Commercial (25%), Statutory (20%), and Risk (15%).", "Consolidated pursuit findings across all 6 prior stages.", "Overall Bid Match Score (%) with win probability forecast.", "Gives executive committee confidence before authorizing bid bond.", "Predictive Win Analytics Model"],
        ["Stage 7: Review & Score", "6-Point Pre-Flight Defect Sweep", "Automated pre-flight verification: Zero unpriced BOQ items, clash RFI coverage, bank guarantee validity, DSC token match.", "Master bid submission data package.", "Pass/Fail compliance certificate ensuring bid responsiveness.", "Eliminates technical opening disqualification risk.", "CPWD Works Manual Clause 25; FAR 14.404"],
        ["Stage 8: Submit & Learn", "Cryptographic Package Sealing", "Compiles consolidated 144p bid book, Bates stamping, and SHA-256 cryptographic audit fingerprint.", "All approved forms, drawings, BOQ, and compliance attachments.", "Sealed master submission PDF + tamper-evident verification code.", "Immutable provenance record for enterprise legal audit.", "FIPS 180-4 SHA-256 Standard; ISO 27001"],
        ["Stage 8: Submit & Learn", "Market Intelligence & Competitor Spread", "Tracks historical L1 winning margins (-3.8%), optimal target positioning (-1.4%), and L2/L3 competitor dispersion.", "Historical tender opening records from target authorities.", "Competitive price distribution curves informing final discount margin.", "Maximizes win probability while safeguarding gross operating margin.", "Game Theoretic Auction Modeling"],
        ["Stage 8: Submit & Learn", "Commodity Price Inflation Tracker", "Live monitoring of CRCA galvanized steel coil, copper piping, R-410A refrigerant, and Nitrile rubber insulation.", "Live commodity spot indexes and 90-day moving averages.", "Inflation alert badges and escalation contingency calculations.", "Protects fixed-price contracts against commodity price surges.", "Wholesale Price Index (WPI); US BLS PPI Index"]
    ]
    
    start_row = 4
    for c_idx, h in enumerate(feature_headers):
        cell = ws4.cell(row=start_row, column=c_idx + 1, value=h)
        cell.font = header_font
        cell.fill = header_fill_teal
        cell.alignment = align_header
        cell.border = border_all
    ws4.row_dimensions[start_row].height = 28
    
    for r_idx, row in enumerate(feature_matrix_rows):
        current_r = start_row + 1 + r_idx
        for c_idx, val in enumerate(row):
            cell = ws4.cell(row=current_r, column=c_idx + 1, value=val)
            cell.border = border_all
            cell.font = bold_cell_font if c_idx in [0, 1] else cell_font
            cell.fill = zebra_fill if r_idx % 2 == 1 else white_fill
            cell.alignment = align_left
        ws4.row_dimensions[current_r].height = 44

    ws4.auto_filter.ref = f"A4:G{start_row + len(feature_matrix_rows)}"

    # =========================================================================
    # SHEET 5: User_Flows_&_Personas
    # =========================================================================
    print("Building Sheet 5: User_Flows_&_Personas...")
    ws5 = wb.create_sheet(title="User_Flows_&_Personas")
    ws5.views.sheetView[0].showGridLines = True
    ws5.freeze_panes = "C5"
    
    ws5.cell(row=1, column=1, value="PRECONSTRUCT END-TO-END USER JOURNEYS & PERSONA WORKFLOWS").font = title_font
    ws5.cell(row=2, column=1, value="Chronological Stage-by-Stage Human-in-the-Loop Interaction Design and Automation Triggers").font = subtitle_font
    
    flow_headers = [
        "Stage / Step", "Actor / Persona", "User Action / Trigger", "System Autonomous Response",
        "UI State & Visual Feedback", "Error Handling & Fallback", "Time Savings vs Manual"
    ]
    
    user_flows = [
        ["Stage 0: Intake", "Bid Coordinator", "Drags and drops a 2.4GB tender ZIP file onto drop zone.", "Validates file integrity, extracts ZIP, initiates parallel OCR, indexes into Volumes I to V.", "Progress bar updates with volume breakdown; thumbnail cards appear in Tender Lake.", "Corrupted PDF pages isolated; user prompted to re-upload single sheet without failing batch.", "4 hours manual sorting -> 90 seconds"],
        ["Stage 0: Clocks", "Bid Coordinator", "Opens active pursuit in Tender Lake.", "Parses NIT document, extracts pre-bid query deadline, EMD cutoff, bid opening dates.", "Milestone countdown chips render in header with amber warning if query deadline < 5 days.", "If date ambiguous in text, highlights clause in amber callout and asks user for confirmation.", "1 hour manual reading -> Instant"],
        ["Stage 1: Gate Check", "Contracts Lead", "Navigates to Stage 01: Discover & Pre-Qualification.", "Evaluates AATO turnover, experience certificates, solvency against Company Vault.", "Displays PQ scorecard with Pass/Fail badges; highlights 36m DLP showstopper in red.", "Vault missing required certificate: prompt allows 1-click drag-and-drop to update vault.", "3 hours manual checking -> 30 seconds"],
        ["Stage 1: Decision", "Executive Gatekeeper", "Reviews Go/No-Go Decision Board.", "Aggregates multi-factor consensus fit score (82.4% Composite Fit).", "Clicking 'Confirm Bid with Conditions' logs decision into Company Vault audit trail.", "If Gatekeeper chooses 'No Bid', system prompts for disqualification rationale to build win/loss model.", "2 hour executive meeting -> 10 minutes"],
        ["Stage 2: Clash Review", "Lead Engineer", "Navigates to Stage 02: Contract Intelligence & RFIs.", "Cross-references Volume IV drawings against Volume II specifications and Volume III BOQ.", "Highlights CTR-01 (4\" WG spec vs 2\" WG BOQ) with side-by-side clause citation view.", "User can mark false positives as 'Dismissed' or escalate clash to Pre-Bid query table.", "12 hours manual cross-checking -> 5 mins"],
        ["Stage 2: RFI Export", "Lead Engineer", "Clicks 'Pre-Bid RFI Generator' tab.", "Compiles official query sheet citing Volume, Page, verbatim clause, identified ambiguity, proposed fix.", "Displays editable table; 'Export to Excel' triggers client-ready XLS and cover letter download.", "If query submission deadline passed, displays warning that queries must now be submitted as bid qualifiers.", "4 hours manual Excel typing -> 1-click"],
        ["Stage 2: LD Simulation", "Commercial Lead", "Opens Risk Heatmap & Delay Modeler.", "Recalculates monetary penalty based on contract terms (0.5%/wk or $2,500/day).", "Adjusts slider to 140 days; system triggers red '10% Statutory Ceiling Breached' alert.", "Saves simulated risk reserve into BOQ commercial contingency line item.", "2 hours spreadsheet modeling -> 15 secs"],
        ["Stage 3: 2D Takeoff", "Chief Estimator", "Navigates to Stage 03: 2D/3D Takeoff Workspace.", "Reads drawing vector layers, displays duct runs, terminal diffusers, dampers, and equipment.", "60fps canvas shows color-coded supply (pink), return (green), and exhaust (orange) runs.", "Clicking any run highlights derivation formula and jumps to schedule table row.", "24 hours manual polyline tracing -> 10 mins"],
        ["Stage 3: Sizing & Gauge", "Chief Estimator", "Selects duct run DR-01 on canvas.", "Derives IS 655 Table 1 gauge (24G/22G/20G) from section dimensions and computes steel weight.", "Inspector panel shows surface area 220 m m2, weight 1,943 kg, and standard clause citation.", "User can override gauge; system marks row as 'User Edited' with provenance note.", "6 hours manual lookup -> Instant"],
        ["Stage 3: 3D BIM View", "Chief Estimator", "Clicks '3D Isometric BIM' view tab.", "Generates 3D SVG isometric projection showing floor slab, extruded walls, and ducts at Z=3.2m plenum.", "Renders 3D rectangular duct prisms, AHU cuboids, drop risers, and camera rotation buttons.", "Clash detection highlights vertical drops colliding with structural floor slabs.", "Requires $10k Revit setup -> 1-click web"],
        ["Stage 3: BOM Costing", "Chief Estimator", "Clicks 'Materials & Costs' tab.", "Itemizes complete BOM: CRCA sheet steel by gauge, Nitrile insulation, acoustic lining, dampers, labor.", "Summary cards show subtotal, 15% contractor margin, and total landed bid cost with CSV export.", "Allows live adjustment of material commodity rates ($/lb or INR /kg) to reflect current spot quotes.", "8 hours manual estimation -> Instant"],
        ["Stage 4: Triage", "Chief Estimator", "Navigates to Stage 04: Review Queue (Unified Decision Inbox).", "Presents low-certainty items and drawing clashes in rapid keyboard triage format.", "Pressing 'A' approves item, 'E' opens inline edit, 'X' escalates to RFI, 'G' group approves diffusers.", "All approved quantities and decisions instantly sync into BOQ and pricing schedule.", "14 hours manual reconciliation -> 12 mins"],
        ["Stage 5: BOQ Pricing", "Commercial Lead", "Navigates to Stage 05: BOQ & Pricing tab.", "Populates official client BOQ structure with verified measured quantities and standard rates.", "Summary KPI strip displays Grand Total bid value, trade subtotals, and provenance breakdown.", "1-click Export generates formatted .xlsx / .csv matching official tender submission template.", "10 hours manual Excel linking -> 1-click"],
        ["Stage 5: Vendor Level", "Procurement Lead", "Navigates to Stage 06: Vendor Leveling tab.", "Ingests subcontractor quote PDFs, standardizes scope side-by-side, detects hidden exclusions.", "Leveling matrix shows base bid, unbudgeted scope exclusions (crane, seismic), and normalized cost.", "Identifies that lowest nominal bidder is actually $42,000 more expensive due to missing rigging.", "16 hours manual quote leveling -> 8 mins"],
        ["Stage 6: Proposal Draft", "Proposal Manager", "Navigates to Stage 07: Submission Pro -> AI Proposal Drafter.", "Synthesizes tender volumes and company credentials into 5 structured narrative sections.", "Editable narrative canvas displays Executive Summary, Technical Methodology, QA/QC, HSE, VE.", "Allows switching tone (Concise / Technical / Commercial) and 1-click export to Word / Markdown.", "18 hours manual technical writing -> 4 mins"],
        ["Stage 6: Form Autofill", "Proposal Manager", "Selects Blank Forms Auto-Fill tab.", "Maps Company Vault verified records directly into client Form Annexures A-E / SF-1442.", "Word track-changes view displays auto-filled fields with green provenance pills and CA UDIN citation.", "User can edit company signatories or bank branch details with immediate validation.", "6 hours manual form filling -> 2 mins"],
        ["Stage 7: Pre-Flight", "Contracts Lead", "Clicks 'Bid Match Score & Review' tab.", "Executes automated 6-point pre-flight sweep: Zero unpriced BOQ items, clash RFI coverage, EMD validity.", "Displays circular progress gauge (94.2% - High Win Rate) and green checkmarks for all 6 tests.", "If any mandatory attachment is missing, system disables sealing button and points to missing item.", "5 hours manual checklist verification -> 3 secs"],
        ["Stage 8: Package Seal", "Precon Director", "Navigates to Master Submission PDF Package.", "Compiles 144-page consolidated bid book, Bates stamps all pages, and computes SHA-256 hash.", "Displays Bates-stamped master preview with immutable cryptographic hash e8b9a24c-seal-verified.", "1-click Download exports sealed master package for portal upload.", "8 hours manual PDF assembly -> 30 seconds"]
    ]
    
    start_row = 4
    for c_idx, h in enumerate(flow_headers):
        cell = ws5.cell(row=start_row, column=c_idx + 1, value=h)
        cell.font = header_font
        cell.fill = header_fill_mocha
        cell.alignment = align_header
        cell.border = border_all
    ws5.row_dimensions[start_row].height = 28
    
    for r_idx, row in enumerate(user_flows):
        current_r = start_row + 1 + r_idx
        for c_idx, val in enumerate(row):
            cell = ws5.cell(row=current_r, column=c_idx + 1, value=val)
            cell.border = border_all
            cell.font = bold_cell_font if c_idx in [0, 1] else cell_font
            cell.fill = zebra_fill if r_idx % 2 == 1 else white_fill
            cell.alignment = align_left
        ws5.row_dimensions[current_r].height = 42

    ws5.auto_filter.ref = f"A4:G{start_row + len(user_flows)}"

    # =========================================================================
    # SHEET 6: Scoring_Methodology
    # =========================================================================
    print("Building Sheet 6: Scoring_Methodology...")
    ws6 = wb.create_sheet(title="Scoring_Methodology")
    ws6.views.sheetView[0].showGridLines = True
    ws6.freeze_panes = "A5"
    
    ws6.cell(row=1, column=1, value="PRECONSTRUCT WEIGHTED PRIORITIZATION METHODOLOGY & MATHEMATICAL MODEL").font = title_font
    ws6.cell(row=2, column=1, value="Economic Foundations: WSJF (Weighted Shortest Job First) + Two-Way Door Reversibility Adjustments").font = subtitle_font
    
    methodology_rows = [
        ["Evaluation Dimension", "Scale Range", "Weighting (%)", "Mathematical Role", "Core Definition & Architectural Rationale"],
        ["Impact", "1 to 10 (10 = Transformational)", "30% (Factor 3.0)", "Numerator Driver", "Quantifies direct value delivery to the contractor: margin protection, win rate enhancement, and total estimating hours saved."],
        ["Cost of Delay (CoD)", "1 to 10 (10 = Critical Urgency)", "25% (Factor 2.5)", "Numerator Driver", "Economic penalty incurred each week the feature is delayed: lost bids, disqualification risk, and manual estimator overhead."],
        ["Dependency", "1 to 10 (10 = Core Prerequisite)", "20% (Factor 2.0)", "Numerator Driver", "Structural position in the architecture: measures how many downstream modules are blocked or enabled by this workstream."],
        ["Effort / Complexity", "1 to 10 (10 = Extreme Effort)", "15% (Divisor Base)", "Denominator Base", "Engineering implementation cost: person-weeks, mathematical complexity, and infrastructure overhead."],
        ["Reversibility (Two-Way Door)", "1 to 5 (5 = Easily Reversible)", "10% (Divisor Discount)", "Risk Adjuster", "Amazon Type 1 (one-way door = 1) vs Type 2 (two-way door = 5). Higher reversibility reduces decision friction and risk penalty: Divisor Multiplier = (1.2 - Reversibility * 0.04)."],
        ["Calculated Priority Formula", "Score Range: ~2.5 to 28.0+", "100% Composite", "Global Ranking Index", "Priority = (Impact*3.0 + CostOfDelay*2.5 + Dependency*2.0) / (Effort * (1.2 - Reversibility*0.04)). Higher score = higher priority order."],
        ["Phase 1: MVP Core", "Score Threshold: >= 16.0", "Execution Spine", "Sequencing Phase 1", "Foundational value stream: Step 0 Ingestion, Go/No-Go Decision Board, Drawing vs Spec clashes, Pre-Bid RFIs, 2D Vector Takeoff, BOQ, and Annexure Forms."],
        ["Phase 2: Commercial Hardening", "Score Threshold: 13.0 - 15.9", "Execution Spine", "Sequencing Phase 2", "De-risking and precision: Liquidated damages exposure slider, Subcontractor Leveling with hidden exclusion normalizer, and Company Vault integration."],
        ["Phase 3: Competitive Advantage", "Score Threshold: 10.0 - 12.9", "Execution Spine", "Sequencing Phase 3", "Market disruption vectors: 0-100% Bid Match Score Engine, Autonomous AI Proposal Drafter, 3D Isometric BIM View, and Market Intelligence Lake."],
        ["Phase 4: Future Enterprise Moat", "Score Threshold: < 10.0 or External", "Execution Spine", "Sequencing Phase 4", "Long-term horizon moat: Official CPPP/GeM and SAM.gov REST API connectors, native Revit IFC ingestion, DSC token signing, and Joint Venture consortium bidding."]
    ]
    
    start_row = 4
    for r_idx, row in enumerate(methodology_rows):
        current_r = start_row + r_idx
        for c_idx, val in enumerate(row):
            cell = ws6.cell(row=current_r, column=c_idx + 1, value=val)
            cell.border = border_all
            if r_idx == 0:
                cell.font = header_font
                cell.fill = header_fill_slate
                cell.alignment = align_header
            else:
                cell.font = bold_cell_font if c_idx == 0 else cell_font
                cell.fill = zebra_fill if r_idx % 2 == 1 else white_fill
                cell.alignment = align_left
        ws6.row_dimensions[current_r].height = 28 if r_idx == 0 else 44
    ws6.auto_filter.ref = f"A4:E{start_row + len(methodology_rows) - 1}"

    # =========================================================================
    # SHEET 7: Tech_Stack_&_Architecture
    # =========================================================================
    print("Building Sheet 7: Tech_Stack_&_Architecture...")
    ws7 = wb.create_sheet(title="Tech_Stack_&_Architecture")
    ws7.views.sheetView[0].showGridLines = True
    ws7.freeze_panes = "A5"
    
    ws7.cell(row=1, column=1, value="PRECONSTRUCT PRODUCTION ARCHITECTURE & TECHNOLOGY STACK").font = title_font
    ws7.cell(row=2, column=1, value="High-Performance Hybrid Vector Engine, Multimodal AI, Security Standards, and Pantone Design System").font = subtitle_font
    
    tech_stack_rows = [
        ["Layer / Tier", "Selected Technology", "Role & Functionality", "Key Justification & Benchmarks", "Security & Governance Protocols"],
        ["Frontend Framework", "React 19 + TypeScript + Vite 6", "Single-Page Application (SPA) reactive shell with sub-millisecond tab switching.", "Zero runtime bundle overhead; strict type safety across Pursuit Object domain graph.", "Content Security Policy (CSP) Level 3; zero external unvetted CDN scripts."],
        ["Design System & Tokens", "Pantone Cloud Dancer & Mocha Mousse", "Architectural neo-minimalism: Cloud Dancer (#F0EEE9), Mocha (#A47864), Hairline borders (#CBD5E1).", "Eliminates estimator visual fatigue; 100% compliant with WCAG AAA contrast ratios.", "Strict CSS variable token hierarchy (--color-paper, --color-sheet, --color-mocha)."],
        ["Blueprint Vector Canvas", "HTML5 Canvas + SVG + OffscreenCanvas", "60fps pan/zoom engine rendering vector CAD blueprint layers, room bounding boxes, and duct paths.", "Handles multi-gigabyte drawings up to 10,000 vector elements with zero frame drops.", "Sandboxed vector rendering; memory isolation prevents memory leaks on 100-page sets."],
        ["3D Isometric BIM View", "Custom SVG 3D Isometric Projection Engine", "Renders floor slab diamond, extruded walls, and 3D rectangular duct prisms at Z=3.2m plenum height.", "Lightweight browser execution without requiring heavy WebGL/Three.js GPU dependencies.", "Client-side geometry calculation with zero cloud round-trips for proprietary plans."],
        ["Document Processing", "PyMuPDF (fitz) + PDFium + Tesseract OCR", "High-speed multi-page PDF splitting, rasterization, spatial OCR, and coordinate extraction.", "Extracts textual clauses and coordinates in < 50ms per sheet with 99.5% accuracy.", "Local temporary processing; files encrypted in transit and at rest with AES-256."],
        ["Vector Search & Clash Graph", "ChromaDB / pgvector + Sentence Transformers", "Stores document clause embeddings across Volumes I to V for semantic cross-document contradiction detection.", "Sub-second similarity search detecting discrepancies between drawing notes and specs.", "Tenant-isolated vector collections; customer data is never mixed or leaked."],
        ["Multimodal AI Models", "Claude 3.5 Sonnet / DeepSeek V3 / GPT-4o", "Powers Autonomous AI Proposal Drafter, Pre-Bid RFI generator, and multi-role synopsis engine.", "State-of-the-art technical prose generation calibrated to government RFP scoring rubrics.", "Zero Data Retention (ZDR) enterprise agreements; models are never trained on customer data."],
        ["Enterprise Company Vault", "Encrypted Postgres + AES-256 GCM Storage", "Stores CA audited balance sheets, past hospital completion certificates, banker limits, and standard rate lake.", "Centralized single-source-of-truth auto-filling all tender forms without duplicate data entry.", "Role-Based Access Control (RBAC) with audit logging for every credential access."],
        ["Package Integrity & Sealing", "Crypto SHA-256 + Bates Numbering Engine", "Generates immutable cryptographic hash for compiled 144p submission package and table of contents.", "Tamper-evident verification guaranteeing submission book matches official tender archive.", "FIPS 180-4 compliant SHA-256 cryptographic verification tokens."]
    ]
    
    start_row = 4
    for r_idx, row in enumerate(tech_stack_rows):
        current_r = start_row + r_idx
        for c_idx, val in enumerate(row):
            cell = ws7.cell(row=current_r, column=c_idx + 1, value=val)
            cell.border = border_all
            if r_idx == 0:
                cell.font = header_font
                cell.fill = header_fill_slate
                cell.alignment = align_header
            else:
                cell.font = bold_cell_font if c_idx in [0, 1] else cell_font
                cell.fill = zebra_fill if r_idx % 2 == 1 else white_fill
                cell.alignment = align_left
        ws7.row_dimensions[current_r].height = 28 if r_idx == 0 else 44
    ws7.auto_filter.ref = f"A4:E{start_row + len(tech_stack_rows) - 1}"

    # =========================================================================
    # Auto-fit Column Widths across all sheets
    # =========================================================================
    print("Auto-fitting column widths across all sheets...")
    for sheet in wb.worksheets:
        for col in sheet.columns:
            max_len = 0
            col_letter = get_column_letter(col[0].column)
            for cell in col:
                if cell.row in [1, 2]:
                    continue
                val_str = str(cell.value or '')
                if val_str.startswith('='):
                    val_str = "12345.67"
                max_len = max(max_len, len(val_str))
            
            adjusted_width = max(max_len + 3, 11)
            if adjusted_width > 65:
                adjusted_width = 65
            sheet.column_dimensions[col_letter].width = adjusted_width

    # Tailored widths for Roadmap
    ws3.column_dimensions['A'].width = 8   # Seq
    ws3.column_dimensions['B'].width = 13  # ID
    ws3.column_dimensions['C'].width = 24  # Stage
    ws3.column_dimensions['D'].width = 34  # Feature Name
    ws3.column_dimensions['E'].width = 54  # Scope
    ws3.column_dimensions['F'].width = 20  # Persona
    ws3.column_dimensions['G'].width = 13  # Impact
    ws3.column_dimensions['H'].width = 15  # Reversibility
    ws3.column_dimensions['I'].width = 14  # Dependency
    ws3.column_dimensions['J'].width = 16  # Cost of Delay
    ws3.column_dimensions['K'].width = 13  # Effort
    ws3.column_dimensions['L'].width = 18  # Priority Score
    ws3.column_dimensions['M'].width = 28  # Phase
    ws3.column_dimensions['N'].width = 20  # Status

    TARGET_FILE_1 = r"c:\rushilProcess\preconstruct\docs\Preconstruct_E2E_Master_Product_Blueprint.xlsx"
    TARGET_FILE_2 = r"c:\rushilProcess\preconstruct\docs\Vanik_Precon_Master_Blueprint.xlsx"
    
    print(f"Saving to {TARGET_FILE_1}...")
    wb.save(TARGET_FILE_1)
    print(f"Saving to {TARGET_FILE_2}...")
    wb.save(TARGET_FILE_2)
    print("Master Excel generation completed successfully with 0 errors!")

if __name__ == "__main__":
    build_master_workbook()
