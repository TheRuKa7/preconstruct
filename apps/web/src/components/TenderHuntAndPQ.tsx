import React, { useState } from 'react';
import type { TenderItem, PQRule, GoNoGoFactor, MarketMode } from '../types';
import { 
  FileText, 
  Download, 
  Scale, 
  ArrowRight, 
  Search, 
  Filter, 
  Layers 
} from 'lucide-react';

interface TenderHuntAndPQProps {
  tenders: TenderItem[];
  pqRules: PQRule[];
  goNoGoFactors: GoNoGoFactor[];
  market?: MarketMode;
  onSelectTender?: (tenderId: string) => void;
  onProceedToContracts: () => void;
  onProceedToWorkspace: () => void;
}

export const TenderHuntAndPQ: React.FC<TenderHuntAndPQProps> = ({
  tenders,
  pqRules,
  goNoGoFactors,
  market = 'IN',
  onSelectTender,
  onProceedToContracts,
  onProceedToWorkspace
}) => {
  const [selectedTenderId, setSelectedTenderId] = useState<string>(tenders[0]?.id || '');
  const [selectedRuleId, setSelectedRuleId] = useState<string>(pqRules[2]?.id || pqRules[0]?.id || '');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activePqTab, setActivePqTab] = useState<'pq_rules' | 'gonogo_board' | 'tender_lake'>('pq_rules');
  const initialDecision: 'GO' | 'CONDITIONAL_GO' | 'NO_GO' = 
    tenders[0]?.status === 'GO' ? 'GO' : tenders[0]?.status === 'NO_GO' ? 'NO_GO' : 'CONDITIONAL_GO';
  const [gatekeeperDecision, setGatekeeperDecision] = useState<'GO' | 'CONDITIONAL_GO' | 'NO_GO'>(initialDecision);
  const [gatekeeperNotes, setGatekeeperNotes] = useState<string>(
    market === 'US'
      ? 'Approved for full proposal preparation with conditions: Submit Pre-Bid RFI on 3-year warranty and SMACNA static pressure discrepancy.'
      : 'Approved for full proposal preparation with conditions: Submit Pre-Bid RFI on 36-month DLP and 11kV vs 33kV switchgear conflict.'
  );
  const [showIngestModal, setShowIngestModal] = useState(false);
  const [ingestStatus, setIngestStatus] = useState<'idle' | 'processing' | 'done'>('idle');

  // Keep selectedTenderId synced if tender list changes (e.g. market switch)
  React.useEffect(() => {
    if (tenders.length > 0 && !tenders.some(t => t.id === selectedTenderId)) {
      setSelectedTenderId(tenders[0].id);
      const nextDecision: 'GO' | 'CONDITIONAL_GO' | 'NO_GO' = 
        tenders[0].status === 'GO' ? 'GO' : tenders[0].status === 'NO_GO' ? 'NO_GO' : 'CONDITIONAL_GO';
      setGatekeeperDecision(nextDecision);
    }
  }, [tenders, selectedTenderId]);

  const currentTender = tenders.find(t => t.id === selectedTenderId) || tenders[0];
  const activeRule = pqRules.find(r => r.id === selectedRuleId) || pqRules[0];

  const tenderVolumes = market === 'US' ? [
    { vol: 'Volume I', title: 'Commercial Conditions & FAR Clauses', files: 'Instructions to Bidders, FAR Part 15, Wage Determination TX2026-0014', pages: 144, status: 'OCR Indexed', size: '18.4 MB' },
    { vol: 'Volume II', title: 'Technical Specifications (CSI MasterFormat)', files: 'Div 21 Fire, Div 22 Plumbing, Div 23 HVAC & BAS Controls, Div 26 Elec', pages: 386, status: 'Vectorized', size: '42.1 MB' },
    { vol: 'Volume III', title: 'Client Bill of Quantities (Pricing Schedule)', files: 'Unpriced Trade Schedule Div 23 HVAC (.xlsx + scanned PDF)', pages: 32, status: 'Schema Mapped', size: '4.8 MB' },
    { vol: 'Volume IV', title: 'Tender Drawing Sheets (CAD & Vector PDFs)', files: 'M-101 Rev 2, E-201 SLD, P-101 Piping, Arch Floor Plans A-101 to A-105', pages: 24, status: 'Vector Parsed', size: '86.5 MB' },
    { vol: 'Volume V', title: 'Addenda & Pre-Bid Meeting Corrigenda', files: 'Addendum 01 (Pre-Bid Q&A), Addendum 02 (Revised Voltage Feed)', pages: 18, status: 'Synchronized', size: '6.2 MB' },
  ] : [
    { vol: 'Volume I', title: 'Commercial Conditions (NIT, GCC & SCC)', files: 'NIT Notice, CPWD GCC 2026, Special Conditions, Form Annexures A-E', pages: 168, status: 'OCR Indexed', size: '21.2 MB' },
    { vol: 'Volume II', title: 'Technical Specifications & Brand Makes', files: 'CPWD DSR MEP Specs, Approved Makes List (Daikin/Carrier/Blue Star)', pages: 412, status: 'Vectorized', size: '48.6 MB' },
    { vol: 'Volume III', title: 'Client Bill of Quantities (Priced Template)', files: 'BoQ_MEP_Block2.xls (CPWD Schedule of Items)', pages: 45, status: 'Schema Mapped', size: '5.6 MB' },
    { vol: 'Volume IV', title: 'Tender Drawing Sheets (HVAC/Elec/Plumb)', files: 'KCEPL/HVAC/007 R1, SLD-Substation-01, Chilled Water Schematics', pages: 28, status: 'Vector Parsed', size: '94.2 MB' },
    { vol: 'Volume V', title: 'Addenda & Pre-Bid Corrigenda Bulletins', files: 'Corrigendum 01 (Pre-Bid Minutes), Corrigendum 02 (DLP Amendment)', pages: 14, status: 'Synchronized', size: '5.1 MB' },
  ];

  const filteredRules = pqRules.filter(r => {
    if (filterCategory !== 'ALL' && r.category !== filterCategory) return false;
    if (searchTerm && !r.rule_title.toLowerCase().includes(searchTerm.toLowerCase()) && !r.required_threshold.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const passedCount = pqRules.filter(r => r.status === 'PASS').length;
  const showstopperCount = pqRules.filter(r => r.showstopper && r.status === 'FAIL').length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: 'var(--color-paper)' }}>
      {/* Top Scraper & Portal Status Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: 'var(--color-sheet)',
        borderBottom: '1px solid var(--color-rule)',
        fontSize: '11.5px',
        color: 'var(--color-graphite)',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-ink)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
            {market === 'US' ? 'Federal & State Tender Ingestion Engine (Active)' : 'Tender Hunt Engine (75+ Portals Active)'}
          </span>
          <span style={{ color: 'var(--color-rule)' }}>|</span>
          {market === 'US' ? (
            <>
              <span>SAM.gov: <strong style={{ color: 'var(--color-ink)' }}>2,840 active</strong></span>
              <span>GovTribe: <strong style={{ color: 'var(--color-ink)' }}>1,120 scanned</strong></span>
              <span>DOD & GSA: <strong style={{ color: 'var(--color-ink)' }}>740 scanned</strong></span>
            </>
          ) : (
            <>
              <span>eProcure CPPP: <strong style={{ color: 'var(--color-ink)' }}>1,420 scanned</strong></span>
              <span>GeM Portal: <strong style={{ color: 'var(--color-ink)' }}>890 scanned</strong></span>
              <span>State Tenders: <strong style={{ color: 'var(--color-ink)' }}>610 scanned</strong></span>
            </>
          )}
          <span>Quota: <strong style={{ color: '#0D9488' }}>18/20 Live Runs Active</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--color-mocha-tint)', color: 'var(--color-mocha-deep)', fontWeight: 600, fontSize: '11px' }}>
            {market === 'US' ? 'Client Rule Profile: US Federal FAR / AIA Healthcare v2026.4' : 'Client Rule Profile: EPC General MEP v2026.4'}
          </span>
        </div>
      </div>

      {/* Main 2-Column Responsive Split */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', flexWrap: 'nowrap' }}>
        
        {/* Left Column: Tenders Ingestion & Pre-Qualification Scorecard */}
        <div style={{
          flex: '1 1 540px',
          minWidth: '380px',
          maxWidth: '640px',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid var(--color-rule)',
          background: 'var(--color-sheet)',
          overflowY: 'auto'
        }}>
          {/* Active Tender Header Card */}
          <div style={{ padding: '16px', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-sheet-elevated)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <select
                    value={selectedTenderId}
                    onChange={(e) => {
                      setSelectedTenderId(e.target.value);
                      onSelectTender?.(e.target.value);
                    }}
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--color-rule)',
                      background: 'var(--color-paper)',
                      color: 'var(--color-ink)',
                      outline: 'none',
                      cursor: 'pointer',
                      maxWidth: '100%'
                    }}
                  >
                    {tenders.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.tender_ref} — {t.title.slice(0, 42)}... ({market === 'US' ? `$${t.estimated_value_cr}M` : `₹${t.estimated_value_cr} Cr`})
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)', whiteSpace: 'nowrap' }}>
                    via {currentTender.portal_source}
                  </span>
                </div>
                <h2 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1.35, margin: '0 0 6px 0', wordBreak: 'break-word' }}>
                  {currentTender.title}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', color: 'var(--color-graphite)', flexWrap: 'wrap' }}>
                  <span>Authority: <strong style={{ color: 'var(--color-ink)' }}>{currentTender.authority}</strong></span>
                  <span>Est. Value: <strong style={{ color: '#0D9488' }}>{market === 'US' ? `$${currentTender.estimated_value_cr.toFixed(2)}M` : `₹${currentTender.estimated_value_cr.toFixed(2)} Cr`}</strong></span>
                  <span>Due: <strong style={{ color: 'var(--color-ink)' }}>{currentTender.submission_deadline}</strong></span>
                </div>
              </div>

              {/* Go/No-Go Badge */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: currentTender.status === 'GO' ? 'rgba(34, 197, 94, 0.12)' : currentTender.status === 'CONDITIONAL_GO' ? 'rgba(234, 179, 8, 0.14)' : 'rgba(239, 68, 68, 0.12)',
                  color: currentTender.status === 'GO' ? '#166534' : currentTender.status === 'CONDITIONAL_GO' ? '#854D0E' : '#991B1B',
                  fontWeight: 700,
                  fontSize: '11.5px',
                  letterSpacing: '0.4px',
                  whiteSpace: 'nowrap'
                }}>
                  {currentTender.status === 'CONDITIONAL_GO' ? '⚠️ CONDITIONAL GO' : currentTender.status === 'GO' ? '✅ QUALIFIED GO' : '🛑 NO GO'}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', marginTop: '4px', whiteSpace: 'nowrap' }}>
                  PQ Score: <strong>{currentTender.pq_score}%</strong> · Match: <strong>{currentTender.match_confidence}%</strong>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--color-rule)', flexWrap: 'wrap' }}>
              <button
                onClick={onProceedToContracts}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: '#0D9488',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '11.5px',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>Review Contradictions & RFI</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={onProceedToWorkspace}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'var(--color-sheet)',
                  color: 'var(--color-ink)',
                  fontWeight: 600,
                  fontSize: '11.5px',
                  border: '1px solid var(--color-rule)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <Layers size={13} />
                <span>Open 2D/3D Takeoff Canvas</span>
              </button>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '11px', padding: '3px 7px', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.1)', color: '#166534', fontWeight: 600 }}>
                  {passedCount} Met
                </span>
                <span style={{ fontSize: '11px', padding: '3px 7px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#991B1B', fontWeight: 600 }}>
                  {showstopperCount} Showstoppers
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Tab Navigation Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--color-rule)',
            background: 'var(--color-sheet)',
            padding: '0 16px',
            gap: '6px'
          }}>
            <button
              onClick={() => setActivePqTab('pq_rules')}
              style={{
                padding: '9px 12px',
                background: 'transparent',
                border: 'none',
                borderBottom: activePqTab === 'pq_rules' ? '2.5px solid #0D9488' : '2.5px solid transparent',
                color: activePqTab === 'pq_rules' ? '#0D9488' : 'var(--color-graphite)',
                fontSize: '11.5px',
                fontWeight: activePqTab === 'pq_rules' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>📋 PQ Rules & Citations</span>
            </button>

            <button
              onClick={() => setActivePqTab('gonogo_board')}
              style={{
                padding: '9px 12px',
                background: 'transparent',
                border: 'none',
                borderBottom: activePqTab === 'gonogo_board' ? '2.5px solid #0D9488' : '2.5px solid transparent',
                color: activePqTab === 'gonogo_board' ? '#0D9488' : 'var(--color-graphite)',
                fontSize: '11.5px',
                fontWeight: activePqTab === 'gonogo_board' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>⚖️ Go / No-Go Decision Board</span>
            </button>

            <button
              onClick={() => setActivePqTab('tender_lake')}
              style={{
                padding: '9px 12px',
                background: 'transparent',
                border: 'none',
                borderBottom: activePqTab === 'tender_lake' ? '2.5px solid #0D9488' : '2.5px solid transparent',
                color: activePqTab === 'tender_lake' ? '#0D9488' : 'var(--color-graphite)',
                fontSize: '11.5px',
                fontWeight: activePqTab === 'tender_lake' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>🗄️ 5-Volume Tender Lake</span>
            </button>
          </div>

          {/* VIEW 1: PQ RULES & CITATIONS */}
          {activePqTab === 'pq_rules' && (
            <>
              {/* PQ Rule Cards Filter Bar */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-rule)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Filter size={13} color="var(--color-graphite)" />
                  {['ALL', 'Financial Turnover', 'Past Experience', 'Defect Liability', 'Compliance & Legal'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: filterCategory === cat ? 600 : 400,
                        background: filterCategory === cat ? 'var(--color-ink)' : 'transparent',
                        color: filterCategory === cat ? 'var(--color-sheet-elevated)' : 'var(--color-graphite)',
                        border: filterCategory === cat ? 'none' : '1px solid var(--color-rule)',
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div style={{ position: 'relative', width: '160px' }}>
                  <Search size={12} style={{ position: 'absolute', left: '8px', top: '7px', color: 'var(--color-graphite)' }} />
                  <input
                    type="text"
                    placeholder="Search clauses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '4px 8px 4px 24px',
                      borderRadius: '4px',
                      border: '1px solid var(--color-rule)',
                      background: 'var(--color-paper)',
                      fontSize: '11px',
                      color: 'var(--color-ink)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Interactive Rule Cards Grid */}
              <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredRules.map((rule) => {
                  const isSelected = selectedRuleId === rule.id;
                  const isPass = rule.status === 'PASS';

                  return (
                    <div
                      key={rule.id}
                      onClick={() => setSelectedRuleId(rule.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        background: isSelected ? 'var(--color-sheet-elevated)' : 'var(--color-sheet)',
                        border: isSelected 
                          ? (isPass ? '2px solid #22C55E' : '2px solid #EAB308')
                          : '1px solid var(--color-rule)',
                        boxShadow: isSelected ? 'var(--shadow-subtle)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isPass ? 'rgba(34, 197, 94, 0.14)' : 'rgba(234, 179, 8, 0.16)',
                            color: isPass ? '#166534' : '#854D0E',
                            fontSize: '12px',
                            fontWeight: 700
                          }}>
                            {isPass ? '✓' : '!'}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)' }}>
                            {rule.rule_title}
                          </span>
                          {rule.showstopper && (
                            <span style={{
                              fontSize: '10px',
                              padding: '1px 6px',
                              borderRadius: '3px',
                              background: 'rgba(239, 68, 68, 0.12)',
                              color: '#991B1B',
                              fontWeight: 700,
                              letterSpacing: '0.4px'
                            }}>
                              SHOWSTOPPER RISK
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-graphite)' }}>
                          Page {rule.page_number} · {rule.clause_ref}
                        </span>
                      </div>

                      {/* Criteria vs Actual */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '6px', fontSize: '11px' }}>
                        <div style={{ padding: '6px 8px', borderRadius: '4px', background: 'var(--color-paper)' }}>
                          <span style={{ color: 'var(--color-graphite)', display: 'block', fontSize: '10px', textTransform: 'uppercase', marginBottom: '2px' }}>
                            Tender Required Threshold
                          </span>
                          <strong style={{ color: 'var(--color-ink)' }}>{rule.required_threshold}</strong>
                        </div>

                        <div style={{ padding: '6px 8px', borderRadius: '4px', background: isPass ? 'rgba(34, 197, 94, 0.08)' : 'rgba(234, 179, 8, 0.1)' }}>
                          <span style={{ color: 'var(--color-graphite)', display: 'block', fontSize: '10px', textTransform: 'uppercase', marginBottom: '2px' }}>
                            Company Verified Standing
                          </span>
                          <strong style={{ color: isPass ? '#166534' : '#854D0E' }}>{rule.company_actual}</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: 'var(--color-graphite)' }}>
                        <span>Citation: <em>{rule.citation_doc}</em></span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#0D9488', fontWeight: 600 }}>
                          Inspect Clause in Split View ➔
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Go/No-Go Decision Engine Summary Card */}
              <div style={{ padding: '16px', borderTop: '1px solid var(--color-rule)', background: 'var(--color-paper)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-ink)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Scale size={15} color="#0D9488" />
                    Executive Go / No-Go Decision Model
                  </h3>
                  <button
                    onClick={() => setActivePqTab('gonogo_board')}
                    style={{ fontSize: '11px', color: '#0D9488', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Open Full Decision Board ➔
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {goNoGoFactors.map((factor, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                      <div style={{ width: '40%' }}>
                        <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>{factor.dimension}</span>
                        <span style={{ color: 'var(--color-graphite)', marginLeft: '6px' }}>({factor.weight}%)</span>
                      </div>
                      <div style={{ flex: 1, padding: '0 12px' }}>
                        <div style={{ width: '100%', height: '6px', background: 'var(--color-rule)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${factor.score * 10}%`,
                            height: '100%',
                            background: factor.status === 'favorable' ? '#22C55E' : factor.status === 'moderate' ? '#EAB308' : '#EF4444',
                            borderRadius: '3px'
                          }} />
                        </div>
                      </div>
                      <div style={{ width: '60px', textAlign: 'right', fontWeight: 700, color: 'var(--color-ink)' }}>
                        {factor.score.toFixed(1)} / 10
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* VIEW 2: INTERACTIVE GO / NO-GO DECISION BOARD */}
          {activePqTab === 'gonogo_board' && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Decision Header Banner */}
              <div style={{
                padding: '14px',
                borderRadius: '8px',
                background: gatekeeperDecision === 'GO' ? 'rgba(34, 197, 94, 0.1)' : gatekeeperDecision === 'CONDITIONAL_GO' ? 'rgba(234, 179, 8, 0.12)' : 'rgba(239, 68, 68, 0.1)',
                border: gatekeeperDecision === 'GO' ? '1px solid #22C55E' : gatekeeperDecision === 'CONDITIONAL_GO' ? '1px solid #EAB308' : '1px solid #EF4444'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-graphite)', fontWeight: 700 }}>
                      Gatekeeper Consensus Status
                    </span>
                    <h3 style={{
                      margin: '2px 0 0 0',
                      fontSize: '15px',
                      fontWeight: 800,
                      color: gatekeeperDecision === 'GO' ? '#166534' : gatekeeperDecision === 'CONDITIONAL_GO' ? '#854D0E' : '#991B1B'
                    }}>
                      {gatekeeperDecision === 'GO' ? '✅ QUALIFIED TO BID (GO)' : gatekeeperDecision === 'CONDITIONAL_GO' ? '⚠️ BID WITH CONDITIONS (CONDITIONAL GO)' : '🛑 DECLINED TO BID (NO-GO)'}
                    </h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#0D9488' }}>82.4%</span>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-graphite)' }}>Composite Fit</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--color-ink)', lineHeight: 1.4 }}>
                  {gatekeeperDecision === 'GO' 
                    ? 'All pre-qualification thresholds passed without showstoppers. Commercial margin and capacity confirmed.'
                    : gatekeeperDecision === 'CONDITIONAL_GO'
                    ? 'Technical and financial qualifications fully satisfied, but contractual defect liability / warranty terms require formal Pre-Bid RFI resolution.'
                    : 'Tender conditions exceed corporate risk ceiling. Pursuit logged to Company Vault as declined.'}
                </p>
              </div>

              {/* Detailed Evaluation Factors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: 700, color: 'var(--color-ink)' }}>
                  Multi-Factor Gatekeeper Criteria:
                </h4>
                {goNoGoFactors.map((factor, idx) => (
                  <div key={idx} style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    background: 'var(--color-sheet-elevated)',
                    border: '1px solid var(--color-rule)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink)' }}>
                        {factor.dimension}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          padding: '1px 6px',
                          borderRadius: '3px',
                          fontSize: '10px',
                          fontWeight: 700,
                          background: factor.status === 'favorable' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: factor.status === 'favorable' ? '#166534' : '#991B1B'
                        }}>
                          {factor.status === 'favorable' ? 'FAVORABLE' : 'SHOWSTOPPER RISK'}
                        </span>
                        <strong style={{ fontSize: '11.5px', color: 'var(--color-ink)' }}>{factor.score.toFixed(1)}/10</strong>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-graphite)', lineHeight: 1.35 }}>
                      {factor.rationale}
                    </p>
                  </div>
                ))}
              </div>

              {/* Gatekeeper Decision Controls */}
              <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 700, color: 'var(--color-ink)' }}>
                  Executive Gatekeeper Sign-Off Action:
                </h4>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <button
                    onClick={() => setGatekeeperDecision('GO')}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: gatekeeperDecision === 'GO' ? '#166534' : 'var(--color-sheet)',
                      color: gatekeeperDecision === 'GO' ? '#FFFFFF' : 'var(--color-ink)',
                      border: '1px solid #166534',
                      cursor: 'pointer'
                    }}
                  >
                    Confirm Bid (GO)
                  </button>
                  <button
                    onClick={() => setGatekeeperDecision('CONDITIONAL_GO')}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: gatekeeperDecision === 'CONDITIONAL_GO' ? '#854D0E' : 'var(--color-sheet)',
                      color: gatekeeperDecision === 'CONDITIONAL_GO' ? '#FFFFFF' : 'var(--color-ink)',
                      border: '1px solid #854D0E',
                      cursor: 'pointer'
                    }}
                  >
                    Bid with Conditions
                  </button>
                  <button
                    onClick={() => setGatekeeperDecision('NO_GO')}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: gatekeeperDecision === 'NO_GO' ? '#991B1B' : 'var(--color-sheet)',
                      color: gatekeeperDecision === 'NO_GO' ? '#FFFFFF' : 'var(--color-ink)',
                      border: '1px solid #991B1B',
                      cursor: 'pointer'
                    }}
                  >
                    Decline to Bid
                  </button>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--color-graphite)', marginBottom: '4px' }}>
                    Gatekeeper Rationale & Required Conditions:
                  </label>
                  <textarea
                    value={gatekeeperNotes}
                    onChange={(e) => setGatekeeperNotes(e.target.value)}
                    rows={2}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--color-rule)',
                      background: 'var(--color-sheet)',
                      fontSize: '11px',
                      color: 'var(--color-ink)',
                      resize: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10.5px', color: 'var(--color-graphite)', paddingTop: '6px', borderTop: '1px dashed var(--color-rule)' }}>
                  <span>Audit Sign-Off: <strong>Preconstruction Director & Lead MEP Estimator</strong></span>
                  <span style={{ color: '#0D9488', fontWeight: 600 }}>Recorded in Company Vault</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: 5-VOLUME TENDER LAKE REPOSITORY */}
          {activePqTab === 'tender_lake' && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)' }}>
                    Tender Document Lake (5 Volumes Indexed)
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                    {market === 'US' ? 'Austin Regional Medical Center — SAM.gov RFP Package' : 'Manipal Hospital — Karnataka eProcure CPPP Repository'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => { setShowIngestModal(true); setIngestStatus('idle'); }}
                    className="btn-primary"
                    style={{ padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <span>+ Ingest New Tender / Volume</span>
                  </button>
                  <span style={{ padding: '3px 8px', borderRadius: '4px', background: 'rgba(13, 148, 136, 0.1)', color: '#0D9488', fontWeight: 700, fontSize: '10.5px' }}>
                    100% Vectorized
                  </span>
                </div>
              </div>

              {tenderVolumes.map((vol, idx) => (
                <div key={idx} style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'var(--color-sheet-elevated)',
                  border: '1px solid var(--color-rule)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#0D9488', letterSpacing: '0.4px' }}>
                        {vol.vol}
                      </span>
                      <h5 style={{ margin: '1px 0 0 0', fontSize: '12.5px', fontWeight: 700, color: 'var(--color-ink)' }}>
                        {vol.title}
                      </h5>
                    </div>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: 'rgba(34, 197, 94, 0.12)',
                      color: '#166534'
                    }}>
                      {vol.status}
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-graphite)' }}>
                    {vol.files}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px dashed var(--color-rule)', fontSize: '10.5px', color: 'var(--color-graphite)' }}>
                    <span>{vol.pages} Pages · {vol.size}</span>
                    <button
                      onClick={() => {
                        if (idx === 1 || idx === 3) onProceedToWorkspace();
                        else onProceedToContracts();
                      }}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'transparent',
                        border: '1px solid #0D9488',
                        color: '#0D9488',
                        fontSize: '10.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Inspect in Canvas ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Split-Screen Live Document Deep Link Viewer */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--color-sheet-elevated)' }}>
          {/* Document Viewer Header Bar */}
          <div style={{
            padding: '10px 16px',
            borderBottom: '1px solid var(--color-rule)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-sheet)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="#0D9488" />
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink)' }}>
                  {activeRule.citation_doc}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-graphite)', marginLeft: '8px' }}>
                  Viewing Page {activeRule.page_number} · Clause {activeRule.clause_ref}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-graphite)', fontFamily: 'var(--font-mono)' }}>
                100% Vector Deep Link
              </span>
              <button
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--color-rule)',
                  background: 'var(--color-sheet-elevated)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Download size={12} />
                <span>Export PDF Snippet</span>
              </button>
            </div>
          </div>

          {/* Document Page Simulation with Pulsing Amber Highlight */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '32px 40px',
            background: '#EAE7E1',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '680px',
              minHeight: '780px',
              background: '#FFFFFF',
              borderRadius: '4px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              padding: '48px 56px',
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '13px',
              lineHeight: 1.6,
              color: '#1A1A1A',
              position: 'relative'
            }}>
              {/* Simulated Header */}
              <div style={{ textAlign: 'center', borderBottom: '1px solid #CCCCCC', paddingBottom: '12px', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666666' }}>
                  {currentTender.authority}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '4px' }}>
                  {activeRule.citation_doc.toUpperCase()}
                </div>
                <div style={{ fontSize: '10px', color: '#888888', marginTop: '2px' }}>
                  Tender Reference: {currentTender.tender_ref} · Sheet Page {activeRule.page_number} of 144
                </div>
              </div>

              {/* Surrounding Dummy Legal Context */}
              <p style={{ color: '#666666', fontSize: '12px', marginBottom: '16px' }}>
                3.1 General Eligibility of the Contractor: Bidders participating in this tendering process must satisfy all the general conditions, financial thresholds, plant capabilities, and statutory registrations set forth under Section II of these bidding documents.
              </p>

              {/* The Live Highlighting Target Box */}
              <div style={{
                position: 'relative',
                padding: '16px 20px',
                borderRadius: '6px',
                background: activeRule.status === 'PASS' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(234, 179, 8, 0.12)',
                border: activeRule.status === 'PASS' ? '1.5px solid #22C55E' : '1.5px solid #EAB308',
                marginBottom: '20px',
                boxShadow: '0 0 16px rgba(234, 179, 8, 0.2)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '14px',
                  background: activeRule.status === 'PASS' ? '#22C55E' : '#EAB308',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  letterSpacing: '0.4px',
                  fontFamily: 'var(--font-sans)'
                }}>
                  {activeRule.clause_ref} — EXTRACTED CITATION
                </div>

                <p style={{ fontWeight: 600, color: '#111827', margin: '4px 0 0 0', fontStyle: 'italic', fontSize: '13.5px' }}>
                  "{activeRule.extracted_clause_text}"
                </p>
              </div>

              <p style={{ color: '#666666', fontSize: '12px', marginBottom: '16px' }}>
                3.3 Submissions without complete supporting document copies (duly attested and signed by the statutory auditor or company director) shall be treated as non-responsive and summarily rejected at the technical bid opening stage.
              </p>

              <p style={{ color: '#666666', fontSize: '12px', marginBottom: '16px' }}>
                3.4 The Employer reserves the right to verify the authenticity of all submitted project credentials and bank solvency certificates directly with the issuing authorities.
              </p>

              {/* Watermark / Footer */}
              <div style={{ position: 'absolute', bottom: '24px', left: '56px', right: '56px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#999999', borderTop: '1px solid #E5E5E5', paddingTop: '8px' }}>
                <span>Preconstruct Vector OCR Engine</span>
                <span>Page {activeRule.page_number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tender Ingestion Simulation Modal */}
      {showIngestModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(25, 24, 22, 0.55)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{
            width: '460px',
            background: 'var(--color-sheet-elevated)',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            boxShadow: 'var(--shadow-float)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Ingest New Tender or Supplemental Volume</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-graphite)' }}>
              Drop tender files, addenda bulletins, or enter portal reference for automated OCR segmentation into Volumes I–V.
            </p>

            <div style={{
              border: '1.5px dashed var(--color-rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '20px',
              textAlign: 'center',
              background: 'var(--color-sheet)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink)' }}>
                Drag & Drop PDF, ZIP, or Drawing Sets (.dwg/.dxf)
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-graphite)', marginTop: '4px' }}>
                Supports multi-gigabyte files with parallel OCR vectorization
              </div>
            </div>

            {ingestStatus === 'processing' && (
              <div style={{ background: 'var(--color-paper)', padding: '10px', borderRadius: '4px', fontSize: '11.5px', color: 'var(--color-graphite)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ color: '#0D9488', fontWeight: 600 }}>⟳ Autonomous Ingestion Pipeline Active:</div>
                <div>1. Optical Character Recognition (OCR) running...</div>
                <div>2. Segmenting into Volumes I–V & Annexures...</div>
                <div>3. Cross-referencing Company Vault qualifications...</div>
              </div>
            )}

            {ingestStatus === 'done' && (
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22C55E', padding: '10px', borderRadius: '4px', fontSize: '11.5px', color: '#166534', fontWeight: 600 }}>
                ✓ Ingestion Complete: 5 Volumes Indexed, 0 OCR errors, 100% Provenance Anchored!
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                onClick={() => setShowIngestModal(false)}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '11.5px' }}
              >
                Close
              </button>
              {ingestStatus !== 'done' && (
                <button
                  onClick={() => {
                    setIngestStatus('processing');
                    setTimeout(() => setIngestStatus('done'), 1200);
                  }}
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '11.5px' }}
                >
                  {ingestStatus === 'processing' ? 'Processing...' : 'Run Autonomous Ingestion'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
