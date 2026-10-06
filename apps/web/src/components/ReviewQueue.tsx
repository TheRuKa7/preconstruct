import React, { useState, useEffect } from 'react';
import type { ReviewItem } from '../types';
import { 
  Check, 
  X, 
  CheckCheck, 
  ArrowRight, 
  ArrowLeft, 
  FileCheck2
} from 'lucide-react';

interface ReviewQueueProps {
  items: ReviewItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onEdit: (id: string, newVal: string) => void;
  onApproveAll: () => void;
  onFinishReview: () => void;
}

export const ReviewQueue: React.FC<ReviewQueueProps> = ({
  items,
  onApprove,
  onReject,
  onEdit,
  onApproveAll,
  onFinishReview
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeItem = items[currentIndex];
  const pendingCount = items.filter(i => i.status === 'pending').length;

  // Keyboard shortcut listener for A, E, X, J, K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        if (activeItem && activeItem.status === 'pending') {
          onApprove(activeItem.id);
          if (currentIndex < items.length - 1) setCurrentIndex(prev => prev + 1);
        }
      } else if (e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        if (activeItem && activeItem.status === 'pending') {
          onReject(activeItem.id);
          if (currentIndex < items.length - 1) setCurrentIndex(prev => prev + 1);
        }
      } else if (e.key === 'j' || e.key === 'J' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < items.length - 1) setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'k' || e.key === 'K' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, currentIndex, items.length, onApprove, onReject]);

  if (!activeItem || pendingCount === 0) {
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
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--color-measured-tint)',
          color: 'var(--color-measured)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FileCheck2 size={28} />
        </div>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-ink)' }}>
            Review Queue Cleared
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-graphite)', maxWidth: '420px', marginTop: '6px' }}>
            All items requiring human verification have been approved and reconciled against the tender sheet.
          </p>
        </div>
        <button onClick={onFinishReview} className="btn-primary" style={{ padding: '8px 18px', fontSize: '12.5px' }}>
          Proceed to Measured BOQ <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* Queue Progress Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--color-rule)',
        paddingBottom: '14px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)' }}>
              Estimator Review Queue
            </h2>
            <span className="provenance-pill look" style={{ fontSize: '10px' }}>
              {pendingCount} remaining of {items.length}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-graphite)', marginTop: '2px' }}>
            Review drafts and approve with single-keystroke speed (<span className="keycap">A</span> Approve · <span className="keycap">E</span> Edit · <span className="keycap">X</span> Reject)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="btn-secondary"
            style={{ padding: '5px 8px' }}
          >
            <ArrowLeft size={13} />
          </button>
          <span className="font-mono" style={{ fontSize: '11.5px', color: 'var(--color-graphite)' }}>
            {currentIndex + 1} / {items.length}
          </span>
          <button
            onClick={() => setCurrentIndex(prev => Math.min(items.length - 1, prev + 1))}
            disabled={currentIndex === items.length - 1}
            className="btn-secondary"
            style={{ padding: '5px 8px' }}
          >
            <ArrowRight size={13} />
          </button>

          <div style={{ width: '1px', height: '18px', background: 'var(--color-rule)', margin: '0 4px' }} />

          <button
            onClick={onApproveAll}
            className="btn-secondary"
            style={{ fontSize: '11.5px', color: 'var(--color-mocha-deep)' }}
          >
            <CheckCheck size={13} />
            Approve All Remaining
          </button>
        </div>
      </div>

      {/* Main Review Card (Crop on Left, Values on Right) */}
      <div style={{
        background: 'var(--color-sheet-elevated)',
        border: '1px solid var(--color-rule)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-subtle)',
        display: 'grid',
        gridTemplateColumns: '460px 1fr',
        overflow: 'hidden',
        minHeight: '360px'
      }}>
        {/* Left: Zoomed Drawing Crop Preview */}
        <div style={{
          background: '#191816',
          borderRight: '1px solid var(--color-rule)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: '#A8A296',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              DRAWING CROP · {activeItem.location}
            </span>
            <span className="font-mono" style={{ fontSize: '9.5px', color: '#666056' }}>
              [{activeItem.crop_bbox.join(', ')}]
            </span>
          </div>

          {/* SVG Crop Visualizer */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '16px 0'
          }}>
            <svg width="340" height="200" viewBox="0 0 340 200" style={{ background: '#211F1D', borderRadius: '4px', border: '1px solid #3A3630' }}>
              {/* Grid */}
              <pattern id="cropGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2B2824" strokeWidth="0.5" />
              </pattern>
              <rect width="340" height="200" fill="url(#cropGrid)" />

              {/* Room Boundary */}
              <rect x="20" y="20" width="300" height="160" fill="none" stroke="#524D44" strokeWidth="1.5" />

              {/* Element Representation based on item_type */}
              {activeItem.item_type === 'equipment' && (
                <g>
                  <rect x="70" y="50" width="200" height="100" fill="rgba(139, 92, 246, 0.2)" stroke="#8B5CF6" strokeWidth="2" rx="4" />
                  <line x1="70" y1="50" x2="270" y2="150" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="70" y1="150" x2="270" y2="50" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3 3" />
                  <text x="170" y="105" fill="#FFFFFF" fontSize="13" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
                    FF-FA-AHU-05
                  </text>
                  <text x="170" y="125" fill="#C4B5FD" fontSize="10.5" fontFamily="var(--font-mono)" textAnchor="middle">
                    26.5 TR · 9500 CFM
                  </text>
                </g>
              )}

              {activeItem.item_type === 'duct_size' && (
                <g>
                  <polyline points="40,100 300,100" stroke="#D93872" strokeWidth="28" strokeLinecap="square" />
                  <line x1="40" y1="100" x2="300" y2="100" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 4" />
                  <rect x="110" y="85" width="120" height="30" fill="rgba(25, 24, 22, 0.9)" stroke="#D93872" strokeWidth="1" rx="3" />
                  <text x="170" y="104" fill="#FFFFFF" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">
                    1600 × 450 mm · 18G
                  </text>
                </g>
              )}

              {activeItem.item_type === 'scale' && (
                <g>
                  <rect x="50" y="40" width="240" height="120" fill="none" stroke="#A47864" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="170" y="95" fill="#E8E4DC" fontSize="12" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
                    TABLE TENNIS HALL
                  </text>
                  <text x="170" y="115" fill="#A8A296" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
                    9,000 × 6,000 mm (Calibrated 1:100)
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div style={{ fontSize: '10.5px', color: '#756E63', textAlign: 'center' }}>
            Coordinate provenance verified directly on tender sheet KCEPL/HVAC/007
          </div>
        </div>

        {/* Right: Candidate Value, Alternatives & Verification Actions */}
        <div style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '12px', color: 'var(--color-mocha-deep)', fontWeight: 600 }}>
                  {activeItem.tag}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)', marginTop: '2px' }}>
                  {activeItem.item_type === 'equipment' ? 'Verify Equipment Capacity' : activeItem.item_type === 'duct_size' ? 'Confirm Sheet Metal Gauge' : 'Confirm Calibration'}
                </h3>
              </div>
              <span className="provenance-pill look" style={{ fontSize: '10px' }}>
                {activeItem.provenance}
              </span>
            </div>

            {/* Candidate Value Callout */}
            <div style={{
              background: 'var(--color-paper)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-rule-subtle)',
              padding: '16px',
              marginTop: '16px'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Proposed Measured Value
              </span>
              <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '4px' }}>
                {activeItem.candidate_value}
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--color-graphite)', marginTop: '6px' }}>
                <strong>Derivation rationale:</strong> {activeItem.confidence_note}
              </p>
            </div>

            {/* Alternative Picks */}
            <div style={{ marginTop: '16px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>
                Alternative Standard Options:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                {activeItem.alternatives.map((alt, aIdx) => (
                  <button
                    key={aIdx}
                    onClick={() => onEdit(activeItem.id, alt)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-sheet)',
                      border: '1px solid var(--color-rule)',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'border-color var(--duration-fast)'
                    }}
                  >
                    <span>{alt}</span>
                    <span className="keycap" style={{ fontSize: '9px' }}>Pick</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons with Keycaps */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            borderTop: '1px solid var(--color-rule-subtle)',
            paddingTop: '18px',
            marginTop: '16px'
          }}>
            <button
              onClick={() => onReject(activeItem.id)}
              className="btn-secondary"
              data-testid="reject-btn"
              aria-label="Reject or raise RFI"
              style={{ padding: '8px 14px', fontSize: '12px', color: 'var(--color-void)' }}
            >
              <X size={14} />
              Reject / RFI <span className="keycap">X</span>
            </button>

            <button
              onClick={() => onApprove(activeItem.id)}
              className="btn-primary"
              data-testid="approve-btn"
              aria-label="Approve proposed value"
              style={{ padding: '8px 20px', fontSize: '12.5px' }}
            >
              <Check size={14} />
              Approve Proposed Value <span className="keycap" style={{ background: 'var(--color-mocha-deep)', color: '#fff', border: 'none' }}>A</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
