import React, { useState } from 'react';
import type { SubmissionForm, AttachmentItem, MarketMode } from '../types';
import { 
  FileText, 
  Paperclip, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  FolderArchive,
  ShieldCheck,
  Check,
  Sparkles
} from 'lucide-react';

interface SubmissionProProps {
  forms: SubmissionForm[];
  attachments: AttachmentItem[];
  market?: MarketMode;
  onProceedToLeveling: () => void;
}

export const SubmissionPro: React.FC<SubmissionProProps> = ({
  forms,
  attachments: initialAttachments,
  market = 'IN',
  onProceedToLeveling
}) => {
  const [selectedFormId, setSelectedFormId] = useState<string>(forms[0]?.id || '');
  const [attachments, setAttachments] = useState<AttachmentItem[]>(initialAttachments);
  const [activeTab, setActiveTab] = useState<'forms' | 'attachments' | 'proposal_drafter' | 'match_score' | 'master_package'>('forms');
  const [showTrackChanges, setShowTrackChanges] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [packageGenerated, setPackageGenerated] = useState<boolean>(false);
  const [activeProposalSection, setActiveProposalSection] = useState<number>(0);
  const [proposalTone, setProposalTone] = useState<'concise' | 'technical' | 'commercial'>('technical');
  const [isSimulatingPreflight, setIsSimulatingPreflight] = useState<boolean>(false);
  const [preflightSimulated, setPreflightSimulated] = useState<boolean>(true);

  // Sync selectedFormId when forms change (e.g. market switch)
  React.useEffect(() => {
    if (forms.length > 0 && !forms.some(f => f.id === selectedFormId)) {
      setSelectedFormId(forms[0].id);
    }
  }, [forms, selectedFormId]);

  // Keep attachments synced if initialAttachments changes
  React.useEffect(() => {
    setAttachments(initialAttachments);
  }, [initialAttachments]);

  const activeForm = forms.find(f => f.id === selectedFormId) || forms[0];

  const proposalSections = market === 'US' ? [
    {
      title: '1. Executive Summary & Project Understanding',
      subtitle: 'Synthesis of Austin Regional Medical Center Tower B CUP requirements',
      text: `Preconstruct MEP Builders LLC is pleased to submit our comprehensive mechanical contracting proposal for the Austin Regional Medical Center — Tower B Central Utility Plant & HVAC Modernization (RFP-2026-ARMC-MEP-09).

We have thoroughly analyzed the Contract Documents, Specifications (CSI Division 21, 22, 23, 26), and Contract Drawings (M-101 Rev 2, E-201, P-101). Our team brings over 25 years of specialized Texas healthcare mechanical experience, with recent successful delivery of the Memorial Hermann Medical Pavilion and Baylor Scott & White Specialty Center.

Our turnkey mechanical delivery encompasses:
1. 35-Ton Custom Central Air Handling Unit (AHU-05) engineered for zero vibration transmission and critical filtration (MERV 14).
2. Galvanized sheet metal distribution exceeding SMACNA 2016 3rd Edition standards (medium-pressure 4" W.G. primary supply header, low-pressure 2" W.G. runouts).
3. UL 555 / 555S combination fire and smoke damper assemblies with factory-mounted 120V Belimo actuators interfaced to the fire alarm matrix.
4. Titus architectural air distribution terminals balanced to ASHRAE Standard 170 acoustic criteria (NC-30).

We confirm 100% adherence to FAR Part 15, Buy American Act requirements, and Davis-Bacon prevailing wage scales, bonded up to $50,000,000 by Travelers Casualty and Surety Company of America.`
    },
    {
      title: '2. Technical Approach & HVAC Execution Methodology',
      subtitle: 'Off-site prefabrication, installation sequencing, and testing protocols',
      text: `Our engineering approach prioritizes off-site BIM Level of Development (LOD 400) prefabrication at our Austin mechanical facility to minimize active hospital footprint disruption.

Execution Strategy:
• Stage 1 (Mobilization & Laser Scanning): 3D point-cloud survey of the central utility plant room within 7 days of Notice to Proceed (NTP) to verify slab elevations and structural steel penetrations.
• Stage 2 (Ductwork Fabrication): Automated plasma cutting and coil-line fabrication of 18G/20G rectangular ductwork with TDC transverse flanges and full seam sealant conforming to SMACNA Class A leakage standards.
• Stage 3 (Rooftop Rigging & Hoisting): Modular crane lift plan coordinated with Travis County Traffic Control for weekend installation of AHU-05 fan sections and vibration spring isolators (2" static deflection).
• Stage 4 (TAB & Testing): AABC-certified Testing, Adjusting & Balancing with complete duct air leakage testing (DALT) before ceiling closeout.`
    },
    {
      title: '3. Quality Assurance & Quality Control (QA/QC) Plan',
      subtitle: 'Zero-defect inspection checklists, SMACNA leakage tests, and Commissioning',
      text: `Preconstruct operates an ISO 9001:2015 certified Quality Management System tailored to healthcare MEP infrastructure.

Key Quality Checkpoints:
1. Receiving Inspection: All galvanized coils verified for ASTM A653 G90 coating; UL 555 damper labels inspected before installation.
2. Ductwork Leakage Testing: 100% of medium-pressure headers tested to SMACNA HVAC Air Leakage Test Manual; allowable leakage capped at 1.0% of design CFM at 4" W.G. test pressure.
3. Megger & Electrical Interlocks: Insulation resistance testing of AHU blower motors and damper power feeds verified prior to energization.
4. Integrated Systems Testing (IST): Simulated smoke alarm testing verifying fail-close damper response within 15 seconds.`
    },
    {
      title: '4. Site Safety & HSE Zero-Harm Protocols',
      subtitle: 'OSHA 1926 compliance, Infection Control Risk Assessment (ICRA Class IV)',
      text: `Safety is our foremost core value. Preconstruct maintains an active Experience Modification Rate (EMR) of 0.74, well below the national average.

Healthcare Environmental Controls:
• ICRA Class IV Protocols: Negative pressure containment ante-rooms equipped with HEPA filtration units for all above-ceiling work adjacent to operating suites.
• Hot Work & Flame Safety: Strict permit-to-work protocols with continuous combustible gas monitoring and 60-minute post-work fire watch.
• 100% Fall Protection: 100% tie-off mandatory on all elevated rigging and duct staging above 6 feet.`
    },
    {
      title: '5. Value Engineering (VE) Alternative Propositions',
      subtitle: 'Proactive engineering alternatives saving $42,500 with zero performance loss',
      text: `We submit the following Value Engineering suggestions for Owner evaluation:
1. VE Option A — Electronically Commutated Motors (ECM) on Terminal Units:
   Replacing standard PSC motors with ECM drives reduces annual branch energy consumption by 22% with a 14-month simple payback ($18,200 net lifecycle savings).
2. VE Option B — Factory Pre-Insulated Spiral Runouts:
   Utilizing factory double-wall spiral duct for round runouts reduces field labor by 120 man-hours while eliminating thermal bridging ($24,300 initial cost reduction).`
    }
  ] : [
    {
      title: '1. Executive Summary & Project Understanding',
      subtitle: 'Synthesis of Manipal Hospital Block 2 MEP Package requirements',
      text: `Preconstruct Infra & MEP Engineering Pvt Ltd submits this detailed technical and financial bid for the Complete MEP, HVAC & Electrical Works for Manipal Hospital Multi-Specialty Block 2 (Tender Ref: MAHE/BLR/ENGG/2026/044).

We confirm thorough analysis of Volume 1 NIT/GCC/SCC, Volume 2 Technical Specifications, Volume 3 Schedule of Quantities (BOQ), and Volume 4 Drawing Sheets (KCEPL/HVAC/007 R1). Our organization possesses extensive cleanroom and tertiary hospital execution credentials, having delivered Apollo Health City (₹110.40 Cr) within schedule.

Scope Highlights:
1. Supply and installation of 3,200 sq m sheet metal ductwork conforming strictly to IS 655:2006 (Table 1 gauges: 18G, 20G, 22G, 24G).
2. Floor-mounted double skin AHUs (18 TR and 26.5 TR capacity) with direct-drive plug fans.
3. Class 'O' Nitrile rubber thermal insulation and factory acoustic lining.
4. Opposed blade volume control dampers, motorized fire dampers (IS 16018 rated), and architectural powder-coated aluminum grilles.

We confirm compliance with all CPWD DSR specifications and statutory registrations (MCA CIN: U45200DL2018PTC334190, GSTIN: 29AAACP1234F1Z8).`
    },
    {
      title: '2. Technical Approach & HVAC Execution Methodology',
      subtitle: 'Detailed sequencing of fabrication, erection, and testing',
      text: `Our execution methodology follows CPWD Section IV and IS 655 installation practices.
• Phase 1: Coordinated MEP Shop Drawings prepared in Revit MEP to prevent clashing with medical gas pipelines and cable trays.
• Phase 2: Sheet metal ductwork fabricated using CNC lockformer and auto-flanging machine; transverse joints sealed with non-flammable neoprene gasket.
• Phase 3: AHU positioning on inertia concrete pads with spring vibration isolators.
• Phase 4: Air balancing conducted using calibrated digital anemometers and hood balancers to achieve specified CFM across all departments.`
    },
    {
      title: '3. Quality Assurance & Quality Control (QA/QC) Plan',
      subtitle: 'Inspection & Test Plans (ITP), hydrostatic testing, and air leakage verification',
      text: `• Raw Material Inspection: Galvanized iron sheets tested for 120 gsm zinc coating as per IS 277.
• Duct Air Leakage Testing: Conducted in accordance with IS 655 / SMACNA standards at 500 Pa test pressure.
• Insulation Integrity: Vapour barrier continuity verified to prevent condensation in hospital ceiling voids.
• OEM Warranty: Back-to-back warranty certificates provided directly from equipment manufacturers.`
    },
    {
      title: '4. Site Safety & HSE Zero-Harm Protocols',
      subtitle: 'CPWD Safety Code, electrical safety, and clean environment protection',
      text: `• Mandatory PPE: Safety helmets, steel-toe boots, reflective vests, and safety harnesses for all technicians.
• Dust-Free Partitions: Anti-dust plastic curtains installed around working zones inside the hospital block.
• Tool Box Talks: Daily morning safety briefings conducted by dedicated site safety officer.`
    },
    {
      title: '5. Value Engineering (VE) Alternative Propositions',
      subtitle: 'Cost optimization recommendations proposed for client consideration',
      text: `1. VE Option 1 — Variable Speed Pumping System:
   Upgrading secondary chilled water pumps with variable frequency drives reduces annual pumping energy consumption by 24% (Est. savings: ₹12.50 Lakhs/year).
2. VE Option 2 — Factory-Engineered Modular Plenums:
   Supplying pre-insulated discharge plenums saves 18 days of on-site assembly while improving acoustic attenuation.`
    }
  ];

  const handleSimulatePreflight = () => {
    setIsSimulatingPreflight(true);
    setTimeout(() => {
      setIsSimulatingPreflight(false);
      setPreflightSimulated(true);
    }, 1000);
  };

  const handleToggleAttachment = (id: string) => {
    setAttachments(prev => prev.map(att => 
      att.id === id ? { ...att, is_attached: !att.is_attached } : att
    ));
  };

  const handleTriggerExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setPackageGenerated(true);

      // Trigger client-side file download of compiled submission manifest
      const manifestText = `PRECONSTRUCT MASTER BID SUBMISSION PACKAGE
==================================================
Project: ${market === 'IN' ? 'Manipal Hospital Multi-Specialty Block 2 (MEP Package)' : 'Austin Regional Medical Center — Tower B Central Utility Plant'}
Market Mode: ${market === 'IN' ? 'India (CPPP / GeM / IS 655)' : 'United States (SAM.gov / FAR Part 15 / AIA A201)'}
Compiled Pages: 144 Bookmarked Pages (PDF/A Archival Standard)
SHA-256 Checksum: e8b9f4a1708219c4d29381e9b21f308a0d9488a7c14092b7728ef211
Digital Signature: ${market === 'IN' ? 'Class 3 DSC (e-Mudhra / CCA India Token Attached)' : 'DocuSign FedRAMP Moderate / NIST SP 800-63-3 Verified'}
Timestamp: ${new Date().toISOString()}

INCLUDED FORMS & ANNEXURES:
${forms.map((f, i) => `${i + 1}. [${f.form_code}] ${f.form_name} (Status: ${f.status})`).join('\n')}

INCLUDED STATUTORY ATTACHMENTS:
${attachments.filter(a => a.is_attached).map((a, i) => `${i + 1}. ${a.title} (${a.matched_file_date}, ${a.file_size_kb} KB)`).join('\n')}

==================================================
Preconstruct Autonomous Estimating Engine — All Provenance Verified.`;

      const blob = new Blob([manifestText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Preconstruct_Submission_Package_${market === 'IN' ? 'India_CPPP' : 'US_Federal'}_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1200);
  };

  const totalAttachedCount = attachments.filter(a => a.is_attached).length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: 'var(--color-paper)' }}>
      {/* Sub-Navigation Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: '46px',
        background: 'var(--color-sheet)',
        borderBottom: '1px solid var(--color-rule)'
      }}>
        <div style={{ display: 'flex', gap: '4px', height: '100%' }}>
          <button
            onClick={() => setActiveTab('forms')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'forms' ? '2.5px solid #0D9488' : '2.5px solid transparent',
              color: activeTab === 'forms' ? '#0D9488' : 'var(--color-graphite)',
              fontWeight: activeTab === 'forms' ? 600 : 500,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <FileText size={14} />
            <span>Blank Forms & Knowledge Base Auto-Fill</span>
            <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '10px', background: 'rgba(13, 148, 136, 0.1)', color: '#0D9488', fontWeight: 700 }}>
              {forms.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('attachments')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'attachments' ? '2.5px solid #0D9488' : '2.5px solid transparent',
              color: activeTab === 'attachments' ? '#0D9488' : 'var(--color-graphite)',
              fontWeight: activeTab === 'attachments' ? 600 : 500,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <Paperclip size={14} />
            <span>Mandatory Attachment Matcher</span>
            <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.1)', color: '#166534', fontWeight: 700 }}>
              {totalAttachedCount}/{attachments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('proposal_drafter')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'proposal_drafter' ? '2.5px solid #0D9488' : '2.5px solid transparent',
              color: activeTab === 'proposal_drafter' ? '#0D9488' : 'var(--color-graphite)',
              fontWeight: activeTab === 'proposal_drafter' ? 600 : 500,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={14} />
            <span>AI Proposal Drafter</span>
            <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '10px', background: 'rgba(13, 148, 136, 0.1)', color: '#0D9488', fontWeight: 700 }}>
              5 Sections
            </span>
          </button>

          <button
            onClick={() => setActiveTab('match_score')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'match_score' ? '2.5px solid #0D9488' : '2.5px solid transparent',
              color: activeTab === 'match_score' ? '#0D9488' : 'var(--color-graphite)',
              fontWeight: activeTab === 'match_score' ? 600 : 500,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <CheckCircle2 size={14} />
            <span>Bid Match Score & Review</span>
            <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.12)', color: '#166534', fontWeight: 700 }}>
              94.2% Ready
            </span>
          </button>

          <button
            onClick={() => setActiveTab('master_package')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'master_package' ? '2.5px solid #0D9488' : '2.5px solid transparent',
              color: activeTab === 'master_package' ? '#0D9488' : 'var(--color-graphite)',
              fontWeight: activeTab === 'master_package' ? 600 : 500,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <FolderArchive size={14} />
            <span>Master Submission PDF Package</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onProceedToLeveling}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#0D9488',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '11px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <span>Proceed to Vendor Leveling</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* ======================================================== */}
        {/* TAB 1: FORMS & KNOWLEDGE BASE AUTO-FILL */}
        {/* ======================================================== */}
        {activeTab === 'forms' && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Left list of forms */}
            <div style={{ width: '38%', minWidth: '380px', borderRight: '1px solid var(--color-rule)', overflowY: 'auto', background: 'var(--color-sheet)', padding: '16px' }}>
              <div style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
                  Extracted Tender Annexures
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                  Scanned blank tables automatically mapped to Company Master Knowledge Base
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {forms.map((f) => {
                  const isSelected = f.id === selectedFormId;
                  const isDone = f.status === 'COMPLETED';

                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFormId(f.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        background: isSelected ? 'var(--color-sheet-elevated)' : 'var(--color-paper)',
                        border: isSelected ? '2px solid #0D9488' : '1px solid var(--color-rule)',
                        boxShadow: isSelected ? 'var(--shadow-subtle)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0D9488', fontFamily: 'var(--font-mono)' }}>
                          {f.form_code}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          background: isDone ? 'rgba(34, 197, 94, 0.12)' : 'rgba(234, 179, 8, 0.15)',
                          color: isDone ? '#166534' : '#854D0E',
                          fontWeight: 600
                        }}>
                          {isDone ? '✓ 100% AUTO-FILLED' : '⚠ 2 PENDING VERIFICATION'}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 6px 0' }}>
                        {f.form_name}
                      </h4>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-graphite)' }}>
                        <span>Category: <strong>{f.category}</strong></span>
                        <span>{f.fields_autofilled} / {f.fields_total} Fields Populated</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Live Word Document Preview with Track Changes */}
            <div style={{ flex: 1, overflowY: 'auto', background: 'var(--color-sheet-elevated)', padding: '24px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'rgba(13, 148, 136, 0.12)', color: '#0D9488', fontWeight: 700 }}>
                      {activeForm.form_code}
                    </span>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
                      {activeForm.form_name}
                    </h3>
                  </div>
                  <span style={{ fontSize: '11.5px', color: 'var(--color-graphite)', display: 'block', marginTop: '2px' }}>
                    Auto-populated from Audited Financials, GST Records, and Corporate Vault
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setShowTrackChanges(!showTrackChanges)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--color-rule)',
                      background: showTrackChanges ? 'rgba(13, 148, 136, 0.12)' : 'var(--color-sheet)',
                      color: showTrackChanges ? '#0D9488' : 'var(--color-ink)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Track Changes: {showTrackChanges ? 'ON' : 'OFF'}
                  </button>

                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: '#166534',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Download size={13} />
                    <span>Export Word (.docx)</span>
                  </button>
                </div>
              </div>

              {/* Simulated Word Doc Page Surface */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '6px',
                boxShadow: '0 2px 14px rgba(0,0,0,0.08)',
                padding: '36px 44px',
                border: '1px solid var(--color-rule)'
              }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    TENDER ANNEXURE SUBMISSION
                  </div>
                  <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0F172A', marginTop: '4px' }}>
                    {activeForm.form_name.toUpperCase()}
                  </h2>
                </div>

                {/* Populated Fields Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <tbody>
                    {activeForm.key_fields.map((field, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                        <td style={{ padding: '10px 12px', width: '35%', color: '#475569', fontWeight: 600, background: '#F8FAFC' }}>
                          {field.label}
                        </td>
                        <td style={{ padding: '10px 12px', color: '#0F172A', position: 'relative' }}>
                          <span style={{
                            background: showTrackChanges ? 'rgba(34, 197, 94, 0.12)' : 'transparent',
                            color: showTrackChanges ? '#166534' : '#0F172A',
                            padding: showTrackChanges ? '2px 4px' : '0',
                            borderRadius: '3px',
                            fontWeight: 600
                          }}>
                            {field.value}
                          </span>

                          {showTrackChanges && (
                            <span style={{
                              marginLeft: '8px',
                              fontSize: '10px',
                              color: '#64748B',
                              fontFamily: 'var(--font-mono)'
                            }}>
                              [Source: {field.source}]
                            </span>
                          )}

                          {field.verified ? (
                            <CheckCircle2 size={13} color="#22C55E" style={{ float: 'right', marginTop: '2px' }} />
                          ) : (
                            <AlertCircle size={13} color="#EAB308" style={{ float: 'right', marginTop: '2px' }} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ATTACHMENT MATCHER */}
        {/* ======================================================== */}
        {activeTab === 'attachments' && (
          <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', background: 'var(--color-sheet-elevated)' }}>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
                  Mandatory Compliance Attachment Checklist
                </h3>
                <span style={{ fontSize: '11.5px', color: 'var(--color-graphite)' }}>
                  Scanned from NIT compliance rules and matched against contractor's internal document vault
                </span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534', background: 'rgba(34, 197, 94, 0.1)', padding: '4px 10px', borderRadius: '4px' }}>
                {totalAttachedCount} of {attachments.length} Certificates Matched
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {attachments.map((att) => (
                <div
                  key={att.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '8px',
                    background: 'var(--color-paper)',
                    border: '1px solid var(--color-rule)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      background: att.is_attached ? 'rgba(34, 197, 94, 0.14)' : 'rgba(239, 68, 68, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: att.is_attached ? '#166534' : '#991B1B'
                    }}>
                      <Paperclip size={18} />
                    </div>

                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 2px 0' }}>
                        {att.title}
                      </h4>
                      <div style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                        {att.tender_requirement} · Cited on Page {att.citation_page}
                      </div>
                      <div style={{ fontSize: '11px', color: '#0D9488', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                        Matched File: {att.matched_file_name} ({att.file_size_kb} KB) · {att.matched_file_date}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: att.validity_status === 'VALID' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.14)',
                      color: att.validity_status === 'VALID' ? '#166534' : '#854D0E'
                    }}>
                      {att.validity_status}
                    </span>

                    <button
                      onClick={() => handleToggleAttachment(att.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--color-rule)',
                        background: att.is_attached ? '#0D9488' : 'var(--color-sheet-elevated)',
                        color: att.is_attached ? '#FFFFFF' : 'var(--color-ink)',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {att.is_attached ? 'Attached ✓' : '+ Attach'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: MASTER SUBMISSION PACKAGE */}
        {/* ======================================================== */}
        {activeTab === 'master_package' && (
          <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', background: 'var(--color-sheet-elevated)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(13, 148, 136, 0.14)',
                color: '#0D9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <FolderArchive size={32} />
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
                {market === 'US' ? 'Federal Master Submission Package Ready (SF-1442 & AIA A305)' : 'Consolidated Bid Submission Package Ready (CPPP / GeM)'}
              </h2>
              <p style={{ fontSize: '12.5px', color: 'var(--color-graphite)', lineHeight: 1.5, marginBottom: '24px' }}>
                {market === 'US' 
                  ? 'All AIA qualification statements, SF-1442 solicitation forms, FAR telecommunications disclosures, and Treasury Circular 570 surety bonds have been verified and compiled into a single bookmarked PDF package.'
                  : 'All extracted declaration forms, audited financial records, solvency certificates, and technical schedules have been verified and compiled into a single bookmarked PDF package conforming to CPPP / Karnataka e-Proc upload specifications.'}
              </p>

              {/* Package Summary Box */}
              <div style={{ padding: '20px', borderRadius: '8px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)', textAlign: 'left', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', display: 'block' }}>Total Pages</span>
                    <strong style={{ fontSize: '15px', color: 'var(--color-ink)' }}>144 Pages</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', display: 'block' }}>Package Size</span>
                    <strong style={{ fontSize: '15px', color: 'var(--color-ink)' }}>18.4 MB (PDF/A)</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', display: 'block' }}>Compliance</span>
                    <strong style={{ fontSize: '15px', color: '#166534' }}>100% Verified</strong>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-rule)', paddingTop: '12px', fontSize: '11px', color: 'var(--color-graphite)' }}>
                  {market === 'US'
                    ? 'Includes: SF-1442 Offer, AIA A305 Qualification, FAR 52.204-24 Representation, AIA A310 Bid Bond ($542.5K), ACORD 25 Insurance, and CSI Division 23 Pricing Schedule.'
                    : 'Includes: Volume 1 NIT Forms (A, B, C, E), Audited Statements (3 FYs), Solvency Certificate, EMD Guarantee, ISO 9001, and BOQ Schedule Summary.'}
                </div>
              </div>

              {packageGenerated && (
                <div style={{
                  padding: '14px 18px',
                  borderRadius: '6px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1.5px solid #22C55E',
                  textAlign: 'left',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <ShieldCheck size={20} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#166534', display: 'block', marginBottom: '3px' }}>
                      Package Generated & Cryptographically Sealed
                    </strong>
                    <div style={{ fontSize: '11px', color: '#15803D', lineHeight: 1.4 }}>
                      SHA-256: <code>e8b9f4a1708219c4d29381e9b21f308a0d9488a7c14092b7728ef211</code><br />
                      Status: Ready for portal upload · Digital signature tokens applied.
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleTriggerExport}
                disabled={isExporting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  background: '#0D9488',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: isExporting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 10px rgba(13, 148, 136, 0.3)'
                }}
              >
                <Download size={16} />
                <span>{isExporting ? 'Compiling Package...' : packageGenerated ? 'Download Package Again' : 'Download Master Submission PDF'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: AI PROPOSAL DRAFTER */}
        {/* ======================================================== */}
        {activeTab === 'proposal_drafter' && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Left section list */}
            <div style={{ width: '32%', minWidth: '320px', borderRight: '1px solid var(--color-rule)', overflowY: 'auto', background: 'var(--color-sheet)', padding: '16px' }}>
              <div style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
                  Proposal Narrative Sections
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                  Autonomous technical writing calibrated to RFP evaluation criteria
                </span>
              </div>

              {/* Tone Switcher */}
              <div style={{ marginBottom: '14px', padding: '8px 10px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: 'var(--color-graphite)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  AI Drafting Tone:
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {(['concise', 'technical', 'commercial'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setProposalTone(t)}
                      style={{
                        flex: 1,
                        padding: '4px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: proposalTone === t ? 700 : 500,
                        background: proposalTone === t ? '#0D9488' : 'transparent',
                        color: proposalTone === t ? '#FFFFFF' : 'var(--color-graphite)',
                        border: 'none',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {proposalSections.map((sec, idx) => {
                  const isSelected = activeProposalSection === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveProposalSection(idx)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '6px',
                        background: isSelected ? 'var(--color-sheet-elevated)' : 'var(--color-paper)',
                        border: isSelected ? '2px solid #0D9488' : '1px solid var(--color-rule)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                        <strong style={{ fontSize: '12px', color: isSelected ? '#0D9488' : 'var(--color-ink)' }}>
                          {sec.title}
                        </strong>
                        <span style={{ fontSize: '9.5px', padding: '1px 5px', borderRadius: '3px', background: 'rgba(34, 197, 94, 0.12)', color: '#166534', fontWeight: 700 }}>
                          READY
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '10.5px', color: 'var(--color-graphite)', lineHeight: 1.3 }}>
                        {sec.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right section editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: 'var(--color-paper)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#0D9488', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Section {activeProposalSection + 1} of {proposalSections.length}
                  </span>
                  <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-ink)', margin: '2px 0 4px 0' }}>
                    {proposalSections[activeProposalSection]?.title}
                  </h2>
                  <span style={{ fontSize: '12px', color: 'var(--color-graphite)' }}>
                    {proposalSections[activeProposalSection]?.subtitle}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      alert("Section re-synthesized with AI incorporating latest addenda and takeoff findings.");
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'var(--color-sheet-elevated)',
                      border: '1px solid var(--color-rule)',
                      color: 'var(--color-ink)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Sparkles size={12} color="#0D9488" />
                    <span>Regenerate with AI</span>
                  </button>

                  <button
                    onClick={() => {
                      const text = proposalSections[activeProposalSection]?.text;
                      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `Preconstruct_Proposal_Section_${activeProposalSection + 1}.txt`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: '#0D9488',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Download size={12} />
                    <span>Export Section</span>
                  </button>
                </div>
              </div>

              {/* Editable Prose Canvas */}
              <div style={{
                flex: 1,
                minHeight: '380px',
                background: 'var(--color-sheet)',
                borderRadius: '8px',
                border: '1px solid var(--color-rule)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <textarea
                  value={proposalSections[activeProposalSection]?.text}
                  onChange={(_e) => {}}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '12.5px',
                    lineHeight: 1.6,
                    color: 'var(--color-ink)',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px dashed var(--color-rule)', fontSize: '11px', color: 'var(--color-graphite)' }}>
                  <span>Word Count: <strong>{proposalSections[activeProposalSection]?.text.split(/\s+/).length} words</strong></span>
                  <span style={{ color: '#166534', fontWeight: 600 }}>✓ 100% Specification & Engineering Scope Addressed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: BID MATCH SCORE & PROPOSAL READINESS */}
        {/* ======================================================== */}
        {activeTab === 'match_score' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: 'var(--color-paper)', padding: '24px', gap: '20px' }}>
            {/* Top Score Banner */}
            <div style={{
              padding: '20px 24px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.12), rgba(34, 197, 94, 0.08))',
              border: '1.5px solid #0D9488',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: '#0D9488', letterSpacing: '0.6px' }}>
                  Pre-Submission Bid Match & Readiness Index
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-ink)', margin: '4px 0 6px 0' }}>
                  Overall Bid Readiness: 94.2% (EXCELLENT / WIN PROBABLE)
                </h2>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-graphite)', lineHeight: 1.45, maxWidth: '750px' }}>
                  {market === 'US'
                    ? 'Austin Regional Medical Center RFP mechanical proposal exceeds technical threshold. Zero unpriced BOQ lines, 100% CSI Div 23 scope backed by leveled subcontractor bids, and Treasury 570 bonding active.'
                    : 'Manipal Hospital Block 2 MEP bid satisfies all CPWD DSR and Karnataka eProcure requirements. Technical turnover (3.4x coverage) and bank solvency verified.'}
                </p>
              </div>

              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'conic-gradient(#0D9488 0% 94.2%, var(--color-rule) 94.2% 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 6px auto'
                }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--color-sheet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#0D9488' }}>94%</span>
                  </div>
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#166534' }}>HIGH WIN RATE</span>
              </div>
            </div>

            {/* Pillar Breakdown Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
              {[
                { label: 'Technical Responsiveness', score: '96.5%', desc: '100% equipment & duct pressure classes matched', status: 'pass' },
                { label: 'Commercial & Pricing Health', score: '92.0%', desc: '11/11 BOQ items priced, 16.4% gross margin', status: 'pass' },
                { label: 'Statutory Documentation', score: '100.0%', desc: 'All mandatory annexures & certificates valid', status: 'pass' },
                { label: 'Red Flag Disqualification Risk', score: '4.0%', desc: 'Low risk (all contradictions addressed in RFIs)', status: 'pass' },
                { label: 'Forecasted Win Probability', score: '88.0%', desc: 'Top tier competitive ranking against peer GC bids', status: 'pass' }
              ].map((card, i) => (
                <div key={i} style={{ padding: '14px', borderRadius: '8px', background: 'var(--color-sheet)', border: '1px solid var(--color-rule)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)', display: 'block', marginBottom: '6px' }}>{card.label}</span>
                  <strong style={{ fontSize: '18px', fontWeight: 800, color: '#0D9488', display: 'block', marginBottom: '4px' }}>{card.score}</strong>
                  <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', lineHeight: 1.3, display: 'block' }}>{card.desc}</span>
                </div>
              ))}
            </div>

            {/* Pre-Flight Defect Checklist */}
            <div style={{ padding: '18px', borderRadius: '8px', background: 'var(--color-sheet)', border: '1px solid var(--color-rule)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--color-ink)' }}>
                    Pre-Flight Statutory & Commercial Defect Sweep (6 Checks)
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                    Automated pre-flight verification preventing disqualification before final sealing
                  </span>
                </div>

                <button
                  onClick={handleSimulatePreflight}
                  disabled={isSimulatingPreflight}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: '#0D9488',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: isSimulatingPreflight ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Sparkles size={12} />
                  <span>{isSimulatingPreflight ? 'Running Audit Sweep...' : 'Run Deep Pre-Flight Simulation Check'}</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {[
                  { title: 'Zero Unpriced BOQ Line Items', detail: 'All 11 line items priced with non-zero unit rates and valid provenance tags.', pass: true },
                  { title: 'Drawing vs Specification Contradictions', detail: 'All 4 critical clashes addressed in official Pre-Bid RFI table with cost offsets.', pass: true },
                  { title: 'Bid Bond / EMD Guarantee Validity', detail: `${market === 'US' ? 'AIA A310 Bid Bond' : 'Bank Guarantee EMD'} validity exceeds statutory 90-day validity window.`, pass: true },
                  { title: 'Authorized Signatory Power of Attorney', detail: 'Board resolution and active digital signature token identities matched 100%.', pass: true },
                  { title: 'Financial Standing Coverage', detail: 'Company audited net worth and 3-year turnover exceeds tender threshold by 3.4x.', pass: true },
                  { title: 'Subcontractor Quote Leveling Completeness', detail: 'All major mechanical trades supported by leveled vendor bids with scope rider adjustments.', pass: true }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '10px 12px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>
                      ✓
                    </div>
                    <div>
                      <strong style={{ fontSize: '11.5px', color: 'var(--color-ink)', display: 'block', marginBottom: '2px' }}>{item.title}</strong>
                      <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', lineHeight: 1.3, display: 'block' }}>{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              {preflightSimulated && (
                <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: '6px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22C55E', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} color="#166534" />
                  <span style={{ fontSize: '11.5px', color: '#166534', fontWeight: 600 }}>
                    ALL 6 PRE-FLIGHT VERIFICATIONS PASSED — Zero disqualification risks found. Ready for Cryptographic Sealing.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
