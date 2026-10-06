import React, { useState, useEffect } from 'react';
import type { ContradictionItem, PreBidQuery, MultiRoleSynopsis, RiskMatrixItem, RoleLens, MarketMode } from '../types';
import { 
  AlertOctagon, 
  FileSpreadsheet, 
  Briefcase, 
  ShieldAlert, 
  ArrowRight, 
  Check, 
  Sliders, 
  FileDown, 
  Info 
} from 'lucide-react';

interface ContractIntelligenceProps {
  contradictions: ContradictionItem[];
  preBidQueries: PreBidQuery[];
  synopsis: MultiRoleSynopsis;
  risks: RiskMatrixItem[];
  contractValueCr?: number;
  roleLens?: RoleLens;
  market?: MarketMode;
  onProceedToTakeoff: () => void;
  onProceedToSubmission: () => void;
}

export const ContractIntelligence: React.FC<ContractIntelligenceProps> = ({
  contradictions,
  preBidQueries: initialQueries,
  synopsis,
  risks,
  contractValueCr = 84.50,
  roleLens = 'all',
  market = 'IN',
  onProceedToTakeoff,
  onProceedToSubmission
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'contradictions' | 'synopsis' | 'rfi' | 'risk_heatmap' | 'market_research'>('contradictions');
  const [synopsisRole, setSynopsisRole] = useState<'executive' | 'legal' | 'commercial' | 'technical'>('executive');
  const [selectedContradictionId, setSelectedContradictionId] = useState<string>(contradictions[0]?.id || '');
  const [queries] = useState<PreBidQuery[]>(initialQueries);
  const [delayDays, setDelayDays] = useState<number>(45); // Interactive LD Slider
  const [copiedRfiId, setCopiedRfiId] = useState<string | null>(null);

  // Sync selectedContradictionId when contradictions prop changes
  React.useEffect(() => {
    if (contradictions.length > 0 && !contradictions.some(c => c.id === selectedContradictionId)) {
      setSelectedContradictionId(contradictions[0].id);
    }
  }, [contradictions, selectedContradictionId]);

  // Sync role lens to multi-role synopsis tab
  useEffect(() => {
    if (roleLens && roleLens !== 'all') {
      if (roleLens === 'legal') setSynopsisRole('legal');
      else if (roleLens === 'commercial') setSynopsisRole('commercial');
      else if (roleLens === 'technical') setSynopsisRole('technical');
      else if (roleLens === 'executive') setSynopsisRole('executive');
    }
  }, [roleLens]);

  const activeContradiction = contradictions.find(c => c.id === selectedContradictionId) || contradictions[0];

  // Liquidated Damages Formula: 0.5% per week = (0.5 / 7)% per day, capped at 10% of contract value
  const effectiveContractValue = market === 'US' ? 10.85 : contractValueCr;
  const dailyLdRate = (0.005 / 7);
  const rawLdPercentage = delayDays * dailyLdRate;
  const cappedLdPercentage = Math.min(rawLdPercentage, 0.10); // Capped at 10%
  const totalLdExposureCr = effectiveContractValue * cappedLdPercentage;
  const isLdCapped = rawLdPercentage >= 0.10;

  const handleCopyRfi = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRfiId(id);
    setTimeout(() => setCopiedRfiId(null), 2000);
  };

  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Query No,Category,Document Reference,Clause,Original Text,Contractor Concern,Requested Amendment"]
        .concat(queries.map(q => `"${q.query_no}","${q.category}","${q.doc_reference}","${q.clause_no}","${q.original_clause}","${q.contractor_concern}","${q.requested_amendment}"`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Preconstruct_PreBid_Queries_RFI.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: 'var(--color-paper)' }}>
      {/* Sub-Navigation Bar */}
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
          {[
            { id: 'contradictions', label: 'Cross-Doc Contradictions', icon: AlertOctagon, count: contradictions.length },
            { id: 'synopsis', label: 'Multi-Role Synopsis', icon: Briefcase },
            { id: 'rfi', label: 'Pre-Bid RFI Generator', icon: FileSpreadsheet, count: queries.length },
            { id: 'risk_heatmap', label: 'Risk Heatmap & Delay Modeler', icon: ShieldAlert, count: risks.length },
            { id: 'market_research', label: 'Market Research & Intelligence', icon: Info }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 14px',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2.5px solid #0D9488' : '2.5px solid transparent',
                  color: isActive ? '#0D9488' : 'var(--color-graphite)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span style={{
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontSize: '10px',
                    fontWeight: 700,
                    background: isActive ? 'rgba(13, 148, 136, 0.14)' : 'var(--color-paper)',
                    color: isActive ? '#0D9488' : 'var(--color-graphite)'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onProceedToTakeoff}
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
            <span>Proceed to 2D/3D Takeoff</span>
            <ArrowRight size={13} />
          </button>

          <button
            onClick={onProceedToSubmission}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: 'var(--color-paper)',
              color: 'var(--color-ink)',
              fontWeight: 600,
              fontSize: '11px',
              border: '1px solid var(--color-rule)',
              cursor: 'pointer'
            }}
          >
            <span>Submission Pro</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Main Tab Panels */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        
        {/* ======================================================== */}
        {/* SUBTAB 1: CONTRADICTION DETECTION ENGINE */}
        {/* ======================================================== */}
        {activeSubTab === 'contradictions' && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Left list of contradictions */}
            <div style={{ width: '42%', minWidth: '420px', borderRight: '1px solid var(--color-rule)', overflowY: 'auto', background: 'var(--color-sheet)', padding: '16px' }}>
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
                    Cross-Document Conflict Matrix
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                    Algorithmically detected discrepancies between GCC, SCC, BOQ, and Tech Specs
                  </span>
                </div>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#991B1B', fontWeight: 700 }}>
                  4 Active Conflicts
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {contradictions.map((c) => {
                  const isSelected = c.id === selectedContradictionId;
                  const isCrit = c.severity === 'CRITICAL';
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedContradictionId(c.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        background: isSelected ? 'var(--color-sheet-elevated)' : 'var(--color-paper)',
                        border: isSelected 
                          ? (isCrit ? '2px solid #EF4444' : '2px solid #EAB308')
                          : '1px solid var(--color-rule)',
                        boxShadow: isSelected ? 'var(--shadow-subtle)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '3px',
                          background: isCrit ? 'rgba(239, 68, 68, 0.12)' : 'rgba(234, 179, 8, 0.14)',
                          color: isCrit ? '#991B1B' : '#854D0E'
                        }}>
                          {c.severity} SEVERITY · {c.trade_domain.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-graphite)' }}>
                          {c.id}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                        {c.title}
                      </h4>

                      <div style={{ fontSize: '11px', color: 'var(--color-graphite)', marginBottom: '8px', lineHeight: 1.4 }}>
                        {c.conflict_summary}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        padding: '6px 8px',
                        borderRadius: '4px',
                        background: isCrit ? 'rgba(239, 68, 68, 0.06)' : 'rgba(234, 179, 8, 0.08)',
                        color: isCrit ? '#991B1B' : '#854D0E',
                        fontWeight: 600
                      }}>
                        <span>{c.financial_exposure_note}</span>
                        <span>Inspect Diffs ➔</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side: Deep-Dive Side-by-Side Comparison */}
            <div style={{ flex: 1, overflowY: 'auto', background: 'var(--color-sheet-elevated)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.12)', color: '#991B1B', fontWeight: 700 }}>
                      {activeContradiction.severity} CONFLICT
                    </span>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
                      {activeContradiction.title}
                    </h3>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--color-graphite)', display: 'block', marginTop: '4px' }}>
                    {activeContradiction.conflict_summary}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveSubTab('rfi');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: '#0D9488',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <FileSpreadsheet size={14} />
                  <span>View in Pre-Bid RFI Table</span>
                </button>
              </div>

              {/* Side-by-Side Comparison Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Source Document A */}
                <div style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'var(--color-paper)',
                  border: '1.5px solid #3B82F6',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      SOURCE A: {activeContradiction.doc_a.name}
                    </span>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-graphite)' }}>
                      Page {activeContradiction.doc_a.page} · {activeContradiction.doc_a.clause}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-graphite)', marginBottom: '8px' }}>
                    Section: <strong>{activeContradiction.doc_a.section}</strong>
                  </div>
                  <div style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '6px',
                    background: 'var(--color-sheet-elevated)',
                    border: '1px solid var(--color-rule)',
                    fontSize: '12.5px',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                    color: '#1E293B'
                  }}>
                    "{activeContradiction.doc_a.text}"
                  </div>
                </div>

                {/* Source Document B */}
                <div style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'var(--color-paper)',
                  border: '1.5px solid #EF4444',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#B91C1C', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      SOURCE B: {activeContradiction.doc_b.name}
                    </span>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-graphite)' }}>
                      Page {activeContradiction.doc_b.page} · {activeContradiction.doc_b.clause}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-graphite)', marginBottom: '8px' }}>
                    Section: <strong>{activeContradiction.doc_b.section}</strong>
                  </div>
                  <div style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '6px',
                    background: 'var(--color-sheet-elevated)',
                    border: '1px solid var(--color-rule)',
                    fontSize: '12.5px',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                    color: '#1E293B'
                  }}>
                    "{activeContradiction.doc_b.text}"
                  </div>
                </div>
              </div>

              {/* Recommended Commercial Resolution Strategy */}
              <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(13, 148, 136, 0.08)', border: '1px solid rgba(13, 148, 136, 0.25)' }}>
                <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: '#0D9488', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={15} />
                  Autonomous AI Resolution Strategy & Commercial Mitigation
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-ink)', lineHeight: 1.5, margin: 0 }}>
                  Preconstruct recommends raising a formal Pre-Bid Query during the tender conference. If the employer clarifies that the higher specification applies, request an addendum amending the BOQ schedule description and baseline rate benchmark prior to final submission.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 2: MULTI-ROLE SYNOPSIS */}
        {/* ======================================================== */}
        {activeSubTab === 'synopsis' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Role Switcher Pill Bar */}
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-sheet)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-graphite)', marginRight: '6px', fontWeight: 600 }}>
                Persona-Engineered View:
              </span>
              {[
                { id: 'executive', label: 'Executive Management (1-Pager)' },
                { id: 'legal', label: 'Legal & Contracts Council' },
                { id: 'commercial', label: 'Commercial & Finance Lead' },
                { id: 'technical', label: 'Technical & Engineering Scope' }
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSynopsisRole(role.id as any)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: synopsisRole === role.id ? 600 : 500,
                    background: synopsisRole === role.id ? '#0D9488' : 'var(--color-paper)',
                    color: synopsisRole === role.id ? '#FFFFFF' : 'var(--color-ink)',
                    border: '1px solid var(--color-rule)',
                    cursor: 'pointer'
                  }}
                >
                  {role.label}
                </button>
              ))}
            </div>

            {/* Synopsis Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', background: 'var(--color-sheet-elevated)' }}>
              {synopsisRole === 'executive' && (
                <div style={{ maxWidth: '820px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '14px' }}>
                    Executive Management Brief — 1-Page Pursuit Summary
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ padding: '12px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-graphite)', display: 'block' }}>Contract Value</span>
                      <strong style={{ fontSize: '14px', color: '#0D9488' }}>{synopsis.executive.estimated_value}</strong>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-graphite)', display: 'block' }}>Project Timeline</span>
                      <strong style={{ fontSize: '14px', color: 'var(--color-ink)' }}>{synopsis.executive.timeline_months} Months</strong>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-graphite)', display: 'block' }}>Target Handover</span>
                      <strong style={{ fontSize: '14px', color: 'var(--color-ink)' }}>{synopsis.executive.completion_deadline}</strong>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '6px', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
                      <span style={{ fontSize: '11px', color: '#854D0E', display: 'block' }}>Overall Risk Rating</span>
                      <strong style={{ fontSize: '14px', color: '#854D0E' }}>{synopsis.executive.overall_risk_rating}</strong>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '6px' }}>Project Scope Summary</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--color-graphite)', lineHeight: 1.6 }}>{synopsis.executive.project_scope}</p>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '6px' }}>Strategic Positioning & Fit</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--color-graphite)', lineHeight: 1.6 }}>{synopsis.executive.strategic_fit}</p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '8px' }}>Key Pursuit Decision Triggers</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12.5px', color: 'var(--color-ink)', lineHeight: 1.6 }}>
                      {synopsis.executive.key_decision_triggers.map((trigger, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{trigger}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {synopsisRole === 'legal' && (
                <div style={{ maxWidth: '820px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '14px' }}>
                    Legal & Contractual Conditions Analysis
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase' }}>Overall Liability Cap</span>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-ink)', margin: '4px 0 0 0' }}>{synopsis.legal.overall_liability_cap}</p>
                    </div>

                    <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase' }}>Liquidated Damages (LD) Formula</span>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-ink)', margin: '4px 0 0 0' }}>{synopsis.legal.liquidated_damages}</p>
                    </div>

                    <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#1D4ED8', textTransform: 'uppercase' }}>Dispute Resolution & Governing Law</span>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-ink)', margin: '4px 0 0 0' }}>{synopsis.legal.dispute_resolution} · {synopsis.legal.governing_law}</p>
                    </div>

                    <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Termination & Force Majeure Scope</span>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-ink)', margin: '4px 0 0 0' }}>{synopsis.legal.termination_clauses} · {synopsis.legal.force_majeure_scope}</p>
                    </div>
                  </div>
                </div>
              )}

              {synopsisRole === 'commercial' && (
                <div style={{ maxWidth: '820px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '14px' }}>
                    Commercial & Financial Terms Summary
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase' }}>EMD & Performance Security</span>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-ink)', margin: '4px 0 0 0' }}>{synopsis.commercial.emd_and_pbg}</p>
                    </div>
                    <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase' }}>Mobilization Advance</span>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-ink)', margin: '4px 0 0 0' }}>{synopsis.commercial.mobilization_advance}</p>
                    </div>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)', marginBottom: '14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-ink)', textTransform: 'uppercase' }}>Progress Payment Milestones</span>
                    <ul style={{ margin: '6px 0 0 0', paddingLeft: '20px', fontSize: '12.5px', color: 'var(--color-graphite)' }}>
                      {synopsis.commercial.payment_terms.map((term, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{term}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Price Variation (PVC)</span>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-ink)', margin: '4px 0 0 0' }}>{synopsis.commercial.price_variation_clause}</p>
                    </div>
                    <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Retention Money</span>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-ink)', margin: '4px 0 0 0' }}>{synopsis.commercial.retention_money}</p>
                    </div>
                  </div>
                </div>
              )}

              {synopsisRole === 'technical' && (
                <div style={{ maxWidth: '820px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '14px' }}>
                    Technical Specifications & Approved Makes
                  </h3>
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '6px' }}>Major Inclusions</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12.5px', color: 'var(--color-graphite)', lineHeight: 1.6 }}>
                      {synopsis.technical.scope_inclusions.map((inc, i) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#991B1B', marginBottom: '6px' }}>Explicit Scope Exclusions (Employer Scope)</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12.5px', color: 'var(--color-graphite)', lineHeight: 1.6 }}>
                      {synopsis.technical.scope_exclusions.map((exc, i) => (
                        <li key={i}>{exc}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-ink)', textTransform: 'uppercase', marginBottom: '8px' }}>Approved Manufacturer / Make List</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                      {synopsis.technical.approved_makes.map((make, i) => (
                        <div key={i} style={{ fontSize: '12px' }}>
                          <strong style={{ color: '#0D9488' }}>{make.category}:</strong>
                          <span style={{ color: 'var(--color-ink)', marginLeft: '6px' }}>{make.makes.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 3: PRE-BID QUERY (RFI) GENERATOR */}
        {/* ======================================================== */}
        {activeSubTab === 'rfi' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--color-sheet-elevated)' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-rule)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-sheet)' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
                  Pre-Bid Clarification & Deviation Request Table
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                  Auto-populated from detected contradictions & No-Go deviations with client-ready wording
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handleExportExcel}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    borderRadius: '6px',
                    background: '#166534',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '11px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <FileDown size={14} />
                  <span>Export Formatted Excel (.csv)</span>
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--color-paper)', borderBottom: '1.5px solid var(--color-rule)' }}>
                    <th style={{ padding: '8px 10px', color: 'var(--color-graphite)', fontWeight: 600 }}>Ref #</th>
                    <th style={{ padding: '8px 10px', color: 'var(--color-graphite)', fontWeight: 600 }}>Tender Citation</th>
                    <th style={{ padding: '8px 10px', color: 'var(--color-graphite)', fontWeight: 600 }}>Original Clause Excerpt</th>
                    <th style={{ padding: '8px 10px', color: 'var(--color-graphite)', fontWeight: 600 }}>Contractor's Concern / Deviation</th>
                    <th style={{ padding: '8px 10px', color: 'var(--color-graphite)', fontWeight: 600 }}>Requested Change / Clarification</th>
                    <th style={{ padding: '8px 10px', color: 'var(--color-graphite)', fontWeight: 600 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queries.map((q) => (
                    <tr key={q.id} style={{ borderBottom: '1px solid var(--color-rule)' }}>
                      <td style={{ padding: '10px 10px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0D9488' }}>
                        {q.query_no}
                      </td>
                      <td style={{ padding: '10px 10px', color: 'var(--color-ink)' }}>
                        <strong>{q.doc_reference}</strong>
                        <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)' }}>Page {q.page_no} · {q.clause_no}</div>
                      </td>
                      <td style={{ padding: '10px 10px', color: 'var(--color-graphite)', fontStyle: 'italic', maxWidth: '200px' }}>
                        "{q.original_clause}"
                      </td>
                      <td style={{ padding: '10px 10px', color: 'var(--color-ink)', maxWidth: '220px' }}>
                        {q.contractor_concern}
                      </td>
                      <td style={{ padding: '10px 10px', color: '#166534', fontWeight: 600, maxWidth: '260px', background: 'rgba(34, 197, 94, 0.04)' }}>
                        {q.requested_amendment}
                      </td>
                      <td style={{ padding: '10px 10px' }}>
                        <button
                          onClick={() => handleCopyRfi(q.id, q.requested_amendment)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid var(--color-rule)',
                            background: copiedRfiId === q.id ? '#22C55E' : 'var(--color-sheet-elevated)',
                            color: copiedRfiId === q.id ? '#FFFFFF' : 'var(--color-ink)',
                            fontSize: '11px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {copiedRfiId === q.id ? <Check size={12} /> : null}
                          <span>{copiedRfiId === q.id ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 4: 5x5 RISK HEATMAP & DELAY EXPOSURE SLIDER */}
        {/* ======================================================== */}
        {activeSubTab === 'risk_heatmap' && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Left: 5x5 Heat Map Grid & Risks List */}
            <div style={{ width: '55%', borderRight: '1px solid var(--color-rule)', overflowY: 'auto', background: 'var(--color-sheet)', padding: '20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
                  2D Contractual Risk Matrix (5 × 5 Likelihood vs Cost Impact)
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                  Synthesized with internal enterprise lessons-learned and regional environmental scans
                </span>
              </div>

              {/* 5x5 Grid Visualization */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '4px',
                background: 'var(--color-rule)',
                padding: '4px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                {[5, 4, 3, 2, 1].map((impact) => (
                  <React.Fragment key={impact}>
                    {[1, 2, 3, 4, 5].map((likelihood) => {
                      const score = impact * likelihood;
                      const isExtreme = score >= 16;
                      const isHigh = score >= 12 && score < 16;
                      const isMedium = score >= 6 && score < 12;
                      const matchingRisks = risks.filter(r => r.likelihood === likelihood && r.cost_impact === impact);

                      return (
                        <div
                          key={`${impact}-${likelihood}`}
                          style={{
                            height: '52px',
                            background: isExtreme ? 'rgba(239, 68, 68, 0.25)' : isHigh ? 'rgba(249, 115, 22, 0.22)' : isMedium ? 'rgba(234, 179, 8, 0.20)' : 'rgba(34, 197, 94, 0.18)',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ fontSize: '9px', color: 'var(--color-graphite)', position: 'absolute', top: '2px', left: '4px' }}>
                            {impact}×{likelihood}
                          </span>
                          {matchingRisks.map(r => (
                            <span key={r.id} style={{
                              padding: '2px 5px',
                              borderRadius: '3px',
                              background: '#991B1B',
                              color: '#FFFFFF',
                              fontWeight: 700,
                              fontSize: '9px',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                            }}>
                              {r.id}
                            </span>
                          ))}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>

              {/* Risks Cards with Lessons Learned */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {risks.map((risk) => (
                  <div key={risk.id} style={{ padding: '12px 14px', borderRadius: '6px', background: 'var(--color-sheet-elevated)', border: '1px solid var(--color-rule)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-ink)' }}>
                        {risk.id}: {risk.title}
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '3px', background: risk.severity === 'EXTREME' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(234, 179, 8, 0.15)', color: risk.severity === 'EXTREME' ? '#991B1B' : '#854D0E' }}>
                        {risk.severity} (Score: {risk.calculated_score})
                      </span>
                    </div>

                    <div style={{ fontSize: '11px', color: '#1E293B', marginBottom: '6px' }}>
                      <strong style={{ color: '#0D9488' }}>Internal Lessons Learned:</strong> {risk.internal_lessons_learned}
                    </div>

                    <div style={{ fontSize: '11px', color: '#166534', background: 'rgba(34, 197, 94, 0.08)', padding: '6px 8px', borderRadius: '4px' }}>
                      <strong>Recommended Mitigation:</strong> {risk.recommended_mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive Liquidated Damages Delay Modeler Slider */}
            <div style={{ flex: 1, overflowY: 'auto', background: 'var(--color-sheet-elevated)', padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sliders size={16} color="#0D9488" />
                  Interactive Scenario Modeler: Liquidated Damages Exposure
                </h3>
                <span style={{ fontSize: '11.5px', color: 'var(--color-graphite)' }}>
                  Dynamically simulate monetary penalty exposure based on handover delay days & contract ceilings
                </span>
              </div>

              {/* Slider Component */}
              <div style={{ padding: '20px', borderRadius: '8px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)' }}>
                    Simulated Project Handover Delay:
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#0D9488', fontFamily: 'var(--font-mono)' }}>
                    {delayDays} Days ({Math.round(delayDays / 7)} Weeks)
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="180"
                  step="5"
                  value={delayDays}
                  onChange={(e) => setDelayDays(parseInt(e.target.value, 10))}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: '#CBD5E1',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-graphite)', marginTop: '4px' }}>
                  <span>0 Days (On-Time)</span>
                  <span>45 Days</span>
                  <span>90 Days</span>
                  <span>140 Days (10% Cap Breached)</span>
                  <span>180 Days</span>
                </div>
              </div>

              {/* Calculated Monetary Exposure Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)', display: 'block' }}>Contract Value</span>
                  <strong style={{ fontSize: '16px', color: 'var(--color-ink)' }}>₹{contractValueCr.toFixed(2)} Cr</strong>
                </div>

                <div style={{ padding: '14px', borderRadius: '6px', background: isLdCapped ? 'rgba(239, 68, 68, 0.12)' : 'var(--color-paper)', border: isLdCapped ? '1.5px solid #EF4444' : '1px solid var(--color-rule)' }}>
                  <span style={{ fontSize: '11px', color: isLdCapped ? '#991B1B' : 'var(--color-graphite)', display: 'block' }}>
                    Calculated Penalty %
                  </span>
                  <strong style={{ fontSize: '16px', color: isLdCapped ? '#991B1B' : '#0D9488' }}>
                    {(cappedLdPercentage * 100).toFixed(2)}% {isLdCapped && '(CAPPED)'}
                  </strong>
                </div>

                <div style={{ padding: '14px', borderRadius: '6px', background: isLdCapped ? 'rgba(239, 68, 68, 0.12)' : 'var(--color-paper)', border: isLdCapped ? '1.5px solid #EF4444' : '1px solid var(--color-rule)' }}>
                  <span style={{ fontSize: '11px', color: isLdCapped ? '#991B1B' : 'var(--color-graphite)', display: 'block' }}>
                    Monetary Balance Sheet Loss
                  </span>
                  <strong style={{ fontSize: '16px', color: isLdCapped ? '#991B1B' : '#EF4444' }}>
                    ₹{totalLdExposureCr.toFixed(2)} Cr
                  </strong>
                </div>
              </div>

              {/* Analytical Callout */}
              <div style={{ padding: '14px', borderRadius: '6px', background: isLdCapped ? 'rgba(239, 68, 68, 0.08)' : 'rgba(234, 179, 8, 0.08)', border: isLdCapped ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid rgba(234, 179, 8, 0.25)', fontSize: '12px', lineHeight: 1.5 }}>
                <strong style={{ color: isLdCapped ? '#991B1B' : '#854D0E', display: 'block', marginBottom: '4px' }}>
                  {isLdCapped ? '⚠️ MAXIMUM CONTRACTUAL LIABILITY CEILING REACHED' : 'ℹ️ DELAY PENALTY ACCRUAL TRAJECTORY'}
                </strong>
                At <strong>{delayDays} days of delay</strong>, the client is contractually entitled to withhold{' '}
                <strong>{market === 'US' ? `$${totalLdExposureCr.toFixed(3)}M` : `₹${totalLdExposureCr.toFixed(2)} Crores (₹${(totalLdExposureCr * 100).toFixed(0)} Lakhs)`}</strong>{' '}
                from final payment milestones. It is imperative to submit pre-bid queries negotiating a grace window and capping LD at 5% ({market === 'US' ? '$542.5K' : '₹4.22 Cr'}).
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: MARKET RESEARCH & DEEP INTELLIGENCE */}
        {activeSubTab === 'market_research' && (
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: 'var(--color-paper)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header */}
            <div style={{
              padding: '18px 22px',
              borderRadius: '8px',
              background: 'var(--color-sheet-elevated)',
              border: '1px solid var(--color-rule)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#0D9488', fontWeight: 700, letterSpacing: '0.5px' }}>
                  Enterprise Market Intelligence Lake
                </span>
                <h3 style={{ margin: '2px 0 4px 0', fontSize: '16px', fontWeight: 800, color: 'var(--color-ink)' }}>
                  {market === 'US' ? 'US Federal & Texas Commercial Healthcare Bid Intelligence' : 'Indian Public Infrastructure & CPWD DSR Pricing Intelligence'}
                </h3>
                <span style={{ fontSize: '11.5px', color: 'var(--color-graphite)' }}>
                  Calibrated against 140+ historical tender openings and live preconstruction commodity indexes
                </span>
              </div>
              <span style={{ padding: '3px 8px', borderRadius: '4px', background: 'rgba(13, 148, 136, 0.1)', color: '#0D9488', fontWeight: 700, fontSize: '11px' }}>
                Live Model v2026.4
              </span>
            </div>

            {/* 1. Historical Competitor Bid Spread Matrix */}
            <div style={{ padding: '18px', borderRadius: '8px', background: 'var(--color-sheet)', border: '1px solid var(--color-rule)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)' }}>
                    Authority Historical Bid Winning Spread & Competitor Dispersion
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                    {market === 'US' ? 'Travis County Healthcare District / Austin Procurement Past 8 Solicitations' : 'Manipal Academy / Karnataka Health Engineering Past 12 Tenders'}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                  Median L1 Margin: <strong style={{ color: '#166534' }}>14.8%</strong> · Average L1-L2 Spread: <strong style={{ color: 'var(--color-ink)' }}>3.4%</strong>
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  {
                    tier: 'L1 Lowest Bidder Pattern',
                    spread: '-3.8% below engineer estimate',
                    behavior: market === 'US' ? 'Aggressive mechanical subcontractors (Southland, TDIndustries) bid tight base with exclusions' : 'Regional contractors discount standard CPWD DSR schedule by 4-6%',
                    color: '#166534',
                    bg: 'rgba(34, 197, 94, 0.1)'
                  },
                  {
                    tier: 'Preconstruct Target Positioning',
                    spread: '-1.4% below engineer estimate',
                    behavior: market === 'US' ? 'Competitive $10.85M position with zero hidden scope gaps, backed by Travelers surety' : 'Optimal ₹84.50 Cr commercial sweet-spot preserving 15.2% gross operating margin',
                    color: '#0D9488',
                    bg: 'rgba(13, 148, 136, 0.1)'
                  },
                  {
                    tier: 'L2 / L3 Field Dispersion',
                    spread: '+2.6% above engineer estimate',
                    behavior: 'Conservative general MEP contractors factoring full 36-month defect liability contingencies',
                    color: '#854D0E',
                    bg: 'rgba(234, 179, 8, 0.1)'
                  }
                ].map((item, i) => (
                  <div key={i} style={{ padding: '12px', borderRadius: '6px', background: item.bg, border: `1px solid ${item.color}40` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '12px', color: item.color }}>{item.tier}</strong>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', display: 'block', marginBottom: '4px' }}>
                      {item.spread}
                    </span>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-graphite)', lineHeight: 1.35 }}>
                      {item.behavior}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Raw Material Commodity Escalation Tracker */}
            <div style={{ padding: '18px', borderRadius: '8px', background: 'var(--color-sheet)', border: '1px solid var(--color-rule)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)' }}>
                    Raw Material Commodity Price Tracking (90-Day Moving Average)
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                    Real-time material price indexes informing contingency calculations
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#854D0E', fontWeight: 600 }}>
                  ⚠️ Copper & Aluminum Inflation Alert (+5.8%)
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {[
                  {
                    material: 'Galvanized Steel Coil (CRCA)',
                    currentPrice: market === 'US' ? '$1,180 / ton' : '₹78,500 / MT',
                    trend: '+3.2%',
                    impact: 'Impacts 18G & 20G ductwork supply costs'
                  },
                  {
                    material: 'Copper Pipe & Control Wiring',
                    currentPrice: market === 'US' ? '$4.35 / lb' : '₹840 / kg',
                    trend: '+5.8%',
                    impact: 'Affects chilled water bypass lines & cabling'
                  },
                  {
                    material: 'Refrigerant R-410A / R-32',
                    currentPrice: market === 'US' ? '$14.20 / lb' : '₹1,250 / kg',
                    trend: 'Stable',
                    impact: 'Chiller & VRF initial charging charge'
                  },
                  {
                    material: 'Class O Nitrile Rubber Insulation',
                    currentPrice: market === 'US' ? '$1.85 / sq ft' : '₹380 / sqm',
                    trend: '+1.4%',
                    impact: 'Acoustic & thermal duct lining'
                  }
                ].map((comm, idx) => (
                  <div key={idx} style={{ padding: '12px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-graphite)', display: 'block', marginBottom: '3px' }}>{comm.material}</span>
                    <strong style={{ fontSize: '14px', color: 'var(--color-ink)', display: 'block', marginBottom: '2px' }}>{comm.currentPrice}</strong>
                    <span style={{ fontSize: '10.5px', color: comm.trend.includes('+') ? '#991B1B' : '#166534', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      {comm.trend} (90-Day Trajectory)
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--color-graphite)', lineHeight: 1.3, display: 'block' }}>{comm.impact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Statutory Building Codes & Engineering Standards Library */}
            <div style={{ padding: '18px', borderRadius: '8px', background: 'var(--color-sheet)', border: '1px solid var(--color-rule)' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)' }}>
                Governing Building Codes & Standard Cross-Reference Library
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {(market === 'US' ? [
                  { code: 'SMACNA 2016 3rd Ed', title: 'HVAC Duct Construction Standards', desc: 'Prescribes sheet metal gauge, joint reinforcement, and static pressure rating tables.' },
                  { code: 'ASHRAE 90.1-2022 & 170', title: 'Energy & Healthcare Ventilation', desc: 'Sets minimum COP for centrifugal chillers (6.1+) and hospital airflow exchange rates.' },
                  { code: 'NFPA 90A & UL 555/555S', title: 'Fire & Smoke Damper Safety Code', desc: 'Requires 1-1/2 hr fire partition rating and motorized 120V actuator fail-close mechanisms.' }
                ] : [
                  { code: 'IS 655:2006 (Reaffirmed 2021)', title: 'Specification for Metal Air Ducts', desc: 'Governs galvanized steel sheet metal thickness (Table 1: 18G to 24G) and transverse jointing.' },
                  { code: 'CPWD DSR 2026 (HVAC Works)', title: 'Central Public Works Schedule', desc: 'Establishes statutory unit rates and item specifications for Indian government hospital contracting.' },
                  { code: 'NBC 2016 Part 8 / IS 16018', title: 'National Building Code Fire Safety', desc: 'Mandates motorized smoke dampers and clean air containment protocols for multi-specialty blocks.' }
                ]).map((std, i) => (
                  <div key={i} style={{ padding: '10px 12px', borderRadius: '6px', background: 'var(--color-paper)', border: '1px solid var(--color-rule)' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0D9488', display: 'block', marginBottom: '2px' }}>
                      {std.code}
                    </span>
                    <strong style={{ fontSize: '11.5px', color: 'var(--color-ink)', display: 'block', marginBottom: '4px' }}>
                      {std.title}
                    </strong>
                    <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', lineHeight: 1.3, display: 'block' }}>
                      {std.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
