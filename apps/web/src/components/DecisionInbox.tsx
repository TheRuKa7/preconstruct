import React, { useState, useEffect } from 'react';
import type { UnifiedDecision } from '../types';
import { 
  Check, 
  X, 
  CheckCheck, 
  ArrowRight, 
  ArrowLeft, 
  FileCheck2, 
  Layers, 
  AlertTriangle, 
  Scale, 
  FileText, 
  Zap, 
  Building2
} from 'lucide-react';

interface DecisionInboxProps {
  decisions: UnifiedDecision[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onEdit: (id: string, newVal: string) => void;
  onApproveAll: () => void;
  onProceedToBOQ: () => void;
}

export const DecisionInbox: React.FC<DecisionInboxProps> = ({
  decisions,
  onApprove,
  onReject,
  onEdit,
  onApproveAll,
  onProceedToBOQ
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredDecisions = decisions.filter(d => 
    selectedCategory === 'all' ? true : d.category === selectedCategory
  );

  const pendingDecisions = filteredDecisions.filter(d => d.status === 'pending');
  const activeDecision = pendingDecisions[currentIndex] || filteredDecisions[0];

  // Keyboard shortcut listener: A (Approve), X (Reject), J/K (Nav)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        if (activeDecision && activeDecision.status === 'pending') {
          onApprove(activeDecision.id);
          if (currentIndex < pendingDecisions.length - 1) {
            setCurrentIndex(prev => prev + 1);
          }
        }
      } else if (e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        if (activeDecision && activeDecision.status === 'pending') {
          onReject(activeDecision.id);
          if (currentIndex < pendingDecisions.length - 1) {
            setCurrentIndex(prev => prev + 1);
          }
        }
      } else if (e.key === 'j' || e.key === 'J' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < pendingDecisions.length - 1) setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'k' || e.key === 'K' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDecision, currentIndex, pendingDecisions.length, onApprove, onReject]);

  const totalPending = decisions.filter(d => d.status === 'pending').length;

  if (totalPending === 0) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        textAlign: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--color-measured-tint)',
          color: 'var(--color-measured)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FileCheck2 size={32} />
        </div>
        <div>
          <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-ink)' }}>
            All Decisions Verified & Cleared
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-graphite)', maxWidth: '460px', marginTop: '6px' }}>
            Zero blockers remaining. All takeoff quantities, contract contradictions, gate showstoppers, and vendor exclusions have been human-verified and propagated to the live BOQ.
          </p>
        </div>
        <button onClick={onProceedToBOQ} className="btn-primary" style={{ padding: '9px 20px', fontSize: '13px' }}>
          Proceed to Measured BOQ & Pricing <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'quantity': return <Layers size={13} />;
      case 'contradiction': return <AlertTriangle size={13} />;
      case 'pq_rule': return <Scale size={13} />;
      case 'vendor_gap': return <Building2 size={13} />;
      case 'form_field': return <FileText size={13} />;
      default: return <Zap size={13} />;
    }
  };

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* Header & Category Filters */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--color-rule)',
        paddingBottom: '14px',
        gap: '16px',
        flexWrap: 'wrap',
        flexShrink: 0
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-ink)' }}>
              Unified Decision Inbox
            </h2>
            <span className="provenance-pill look" style={{ fontSize: '11px', fontWeight: 600 }}>
              {totalPending} decisions require human verification
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-graphite)', marginTop: '2px' }}>
            Cross-module triage: single-keystroke velocity (<span className="keycap">A</span> Approve · <span className="keycap">E</span> Pick Alternative · <span className="keycap">X</span> Reject / RFI)
          </p>
        </div>

        {/* Global Controls & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="btn-secondary"
            style={{ padding: '5px 8px' }}
            aria-label="Previous decision"
          >
            <ArrowLeft size={13} />
          </button>
          <span className="font-mono" style={{ fontSize: '11.5px', color: 'var(--color-graphite)' }}>
            {currentIndex + 1} / {pendingDecisions.length}
          </span>
          <button
            onClick={() => setCurrentIndex(prev => Math.min(pendingDecisions.length - 1, prev + 1))}
            disabled={currentIndex >= pendingDecisions.length - 1}
            className="btn-secondary"
            style={{ padding: '5px 8px' }}
            aria-label="Next decision"
          >
            <ArrowRight size={13} />
          </button>

          <div style={{ width: '1px', height: '18px', background: 'var(--color-rule)', margin: '0 4px' }} />

          <button
            onClick={onApproveAll}
            className="btn-secondary"
            style={{ fontSize: '11.5px', color: 'var(--color-mocha-deep)', fontWeight: 600 }}
          >
            <CheckCheck size={13} />
            Approve All Remaining ({totalPending})
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px', flexShrink: 0 }}>
        {[
          { key: 'all', label: `All Decisions (${decisions.filter(d => d.status === 'pending').length})` },
          { key: 'quantity', label: `Takeoff Quantities (${decisions.filter(d => d.category === 'quantity' && d.status === 'pending').length})` },
          { key: 'contradiction', label: `Contradictions (${decisions.filter(d => d.category === 'contradiction' && d.status === 'pending').length})` },
          { key: 'pq_rule', label: `PQ Gate Rules (${decisions.filter(d => d.category === 'pq_rule' && d.status === 'pending').length})` },
          { key: 'vendor_gap', label: `Subcontractor Gaps (${decisions.filter(d => d.category === 'vendor_gap' && d.status === 'pending').length})` },
          { key: 'form_field', label: `Submission Forms (${decisions.filter(d => d.category === 'form_field' && d.status === 'pending').length})` }
        ].map(cat => (
          <button
            key={cat.key}
            onClick={() => {
              setSelectedCategory(cat.key);
              setCurrentIndex(0);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11.5px',
              fontWeight: selectedCategory === cat.key ? 700 : 500,
              background: selectedCategory === cat.key ? 'var(--color-mocha-tint)' : 'var(--color-sheet-elevated)',
              color: selectedCategory === cat.key ? 'var(--color-mocha-deep)' : 'var(--color-graphite)',
              border: selectedCategory === cat.key ? '1px solid var(--color-mocha)' : '1px solid var(--color-rule)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              cursor: 'pointer'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Active Decision Card */}
      {activeDecision && (
        <div style={{
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-subtle)',
          display: 'grid',
          gridTemplateColumns: '460px 1fr',
          overflow: 'hidden',
          minHeight: '440px'
        }}>
          {/* Left: Evidence Viewer & Ground-Truth Anchor */}
          <div style={{
            background: '#191816',
            borderRight: '1px solid var(--color-rule)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: '#A8A296',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {getCategoryIcon(activeDecision.category)}
                  EVIDENCE SOURCE · {activeDecision.evidence.document_name}
                </span>
                <span className="font-mono" style={{ fontSize: '9.5px', color: '#666056' }}>
                  Page {activeDecision.evidence.page}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#8C857B', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                {activeDecision.evidence.section} {activeDecision.evidence.clause && `· ${activeDecision.evidence.clause}`}
              </div>
            </div>

            {/* Evidence Graphic / Vector Crop Preview */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '18px 0',
              background: '#211F1D',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #3A3630',
              padding: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {activeDecision.category === 'quantity' ? (
                <svg width="340" height="200" viewBox="0 0 340 200">
                  <pattern id="inboxGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2B2824" strokeWidth="0.5" />
                  </pattern>
                  <rect width="340" height="200" fill="url(#inboxGrid)" />
                  <rect x="20" y="20" width="300" height="160" fill="none" stroke="#524D44" strokeWidth="1.5" />
                  <rect x="70" y="50" width="200" height="100" fill="rgba(139, 92, 246, 0.2)" stroke="#8B5CF6" strokeWidth="2" rx="4" />
                  <line x1="70" y1="50" x2="270" y2="150" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="70" y1="150" x2="270" y2="50" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3 3" />
                  {/* Solid legible background plate */}
                  <rect x="95" y="80" width="150" height="42" rx="4" fill="#1E1C1A" stroke="#8B5CF6" strokeWidth="1" />
                  <text x="170" y="98" fill="#FFFFFF" fontSize="12" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
                    FF-FA-AHU-05
                  </text>
                  <text x="170" y="114" fill="#C4B5FD" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">
                    26.5 TR · 9500 CFM
                  </text>
                </svg>
              ) : (
                <div style={{
                  padding: '14px',
                  background: 'rgba(38, 35, 32, 0.85)',
                  borderLeft: '3px solid var(--color-mocha)',
                  borderRadius: '3px',
                  color: '#D4CEBF',
                  fontSize: '11.5px',
                  lineHeight: '1.5',
                  fontFamily: 'var(--font-mono)'
                }}>
                  "{activeDecision.evidence.snippet}"
                </div>
              )}
            </div>

            <div style={{ fontSize: '10.5px', color: '#756E63', textAlign: 'center' }}>
              Anchored to tender document repository with cryptographic page hash
            </div>
          </div>

          {/* Right: Decision Formulation, Impacts & Keystroke Actions */}
          <div style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              {/* Category Badge & Title */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="font-mono" style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--color-mocha-deep)',
                    textTransform: 'uppercase'
                  }}>
                    {activeDecision.id} · {activeDecision.category.replace('_', ' ')}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
                    {activeDecision.title}
                  </h3>
                </div>
                <span className="provenance-pill look" style={{ fontSize: '10px' }}>
                  AWAITING REVIEW
                </span>
              </div>

              {/* Rationale Callout */}
              <div style={{
                background: 'var(--color-paper)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-rule-subtle)',
                padding: '14px',
                marginTop: '14px'
              }}>
                <div style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>
                  Proposed Recommendation
                </div>
                <div className="font-mono" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '4px' }}>
                  {activeDecision.candidate_value}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-graphite)', marginTop: '6px', lineHeight: '1.45' }}>
                  <strong>Trigger context:</strong> {activeDecision.why_needs_human}
                </p>
              </div>

              {/* Cross-Module Impacts Pill Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '12px',
                flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', fontWeight: 600 }}>
                  Propagates to:
                </span>
                {activeDecision.impacts.affects_boq_code && (
                  <span className="badge-code" style={{ fontSize: '10px', background: 'var(--color-paper)', padding: '2px 6px' }}>
                    BOQ {activeDecision.impacts.affects_boq_code}
                  </span>
                )}
                {activeDecision.impacts.affects_rfi_id && (
                  <span className="provenance-pill measured" style={{ fontSize: '10px', padding: '2px 6px' }}>
                    RFI Sheet {activeDecision.impacts.affects_rfi_id}
                  </span>
                )}
                {activeDecision.impacts.financial_impact_cr && (
                  <span className="provenance-pill look" style={{ fontSize: '10px', padding: '2px 6px' }}>
                    Impact: ±₹{(activeDecision.impacts.financial_impact_cr * 100).toFixed(0)} Lakhs
                  </span>
                )}
              </div>

              {/* Alternative Standard Options */}
              <div style={{ marginTop: '14px' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>
                  Alternative Standard Options:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '6px' }}>
                  {activeDecision.alternatives.map((alt, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => onEdit(activeDecision.id, alt)}
                      style={{
                        textAlign: 'left',
                        padding: '7px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--color-sheet)',
                        border: '1px solid var(--color-rule)',
                        fontSize: '11.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{alt}</span>
                      <span className="keycap" style={{ fontSize: '9px' }}>Pick</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar with Keyboard Prompts */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              borderTop: '1px solid var(--color-rule-subtle)',
              paddingTop: '16px',
              marginTop: '16px'
            }}>
              <button
                onClick={() => onReject(activeDecision.id)}
                className="btn-secondary"
                data-testid="reject-btn"
                aria-label="Reject or raise RFI"
                style={{ padding: '8px 14px', fontSize: '12px', color: 'var(--color-void)' }}
              >
                <X size={14} />
                Reject / Escalate to RFI <span className="keycap">X</span>
              </button>

              <button
                onClick={() => onApprove(activeDecision.id)}
                className="btn-primary"
                data-testid="approve-btn"
                aria-label="Approve proposed value"
                style={{ padding: '8px 20px', fontSize: '12.5px' }}
              >
                <Check size={14} />
                Approve & Sync Everywhere <span className="keycap" style={{ background: 'var(--color-mocha-deep)', color: '#fff', border: 'none' }}>A</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
