import React from 'react';
import type { DuctRun, AirTerminal, FireDamper } from '../types';
import { 
  AlertTriangle, 
  ArrowRight
} from 'lucide-react';

interface ProjectOverviewProps {
  onOpenWorkspace: () => void;
  onOpenReview: () => void;
  ductRuns: DuctRun[];
  terminals: AirTerminal[];
  dampers: FireDamper[];
  pendingReviewsCount: number;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  onOpenWorkspace,
  onOpenReview,
  ductRuns,
  terminals,
  dampers,
  pendingReviewsCount
}) => {
  // Aggregate KPIs
  const totalSheetMetal = ductRuns.reduce((sum, d) => sum + d.surface_area_sqm, 0);
  const totalInsulation = ductRuns.reduce((sum, d) => sum + d.insulation_area_sqm, 0);
  const totalWeight = ductRuns.reduce((sum, d) => sum + d.weight_kg, 0);
  const totalTerminals = terminals.reduce((sum, t) => sum + t.count, 0);

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* Top Banner: Senior Estimator Status */}
      <div style={{
        background: 'var(--color-sheet-elevated)',
        border: '1px solid var(--color-rule)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-look-tint)',
            color: 'var(--color-look)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-ink)' }}>
                {pendingReviewsCount} items need a look before tender finalization
              </span>
              <span className="provenance-pill look" style={{ fontSize: '9.5px' }}>
                Human Verification Queue
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--color-graphite)', marginTop: '2px' }}>
              AHU-05 capacity inferred from cooling zone · 1600mm duct gauge verified to 18G · Scale calibrated to 1:100
            </div>
          </div>
        </div>

        <button
          onClick={onOpenReview}
          className="btn-primary"
          style={{ whiteSpace: 'nowrap', padding: '6px 14px', fontSize: '12px' }}
        >
          Review Items <span className="keycap" style={{ background: 'var(--color-mocha-deep)', color: '#fff', border: 'none' }}>R</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* KPI Cards Grid (Compact Maximalism) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '14px'
      }}>
        {/* KPI 1: Sheet Metal Area */}
        <div style={{
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>
              GI Ductwork Area
            </span>
            <span className="provenance-pill measured" style={{ fontSize: '9px' }}>
              IS 655 Table 1
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span className="hero-num" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-ink)' }}>
              {totalSheetMetal.toFixed(2)}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--color-graphite)', fontWeight: 500 }}>m²</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-graphite)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span className="badge-code" style={{ background: 'var(--color-paper)', padding: '1px 5px', borderRadius: '3px' }}>18G: 60.7m²</span>
            <span className="badge-code" style={{ background: 'var(--color-paper)', padding: '1px 5px', borderRadius: '3px' }}>20G: 118.2m²</span>
            <span className="badge-code" style={{ background: 'var(--color-paper)', padding: '1px 5px', borderRadius: '3px' }}>22G: 28.1m²</span>
          </div>
        </div>

        {/* KPI 2: Class O Insulation */}
        <div style={{
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>
              Thermal Insulation
            </span>
            <span className="provenance-pill measured" style={{ fontSize: '9px' }}>
              Outer Perim 19mm
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span className="hero-num" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-ink)' }}>
              {totalInsulation.toFixed(2)}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--color-graphite)', fontWeight: 500 }}>m²</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
            Class O closed-cell nitrile rubber with reinforced aluminum foil wrap
          </div>
        </div>

        {/* KPI 3: Total Ductwork GI Weight */}
        <div style={{
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>
              Sheet Metal Weight
            </span>
            <span className="provenance-pill measured" style={{ fontSize: '9px' }}>
              7.85 kg/m²/mm
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span className="hero-num" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-ink)' }}>
              {totalWeight.toFixed(1)}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--color-graphite)', fontWeight: 500 }}>kg</span>
            <span style={{ fontSize: '11px', color: 'var(--color-graphite-faint)' }}>({(totalWeight / 1000).toFixed(2)} MT)</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
            Includes 10% fabrication wastage & transverse slip flanges
          </div>
        </div>

        {/* KPI 4: Air Terminals & Dampers */}
        <div style={{
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>
              Terminals & Safety
            </span>
            <span className="provenance-pill measured" style={{ fontSize: '9px' }}>
              54 Total
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span className="hero-num" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-ink)' }}>
              {totalTerminals}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--color-graphite)', fontWeight: 500 }}>Terminals</span>
            <span style={{ fontSize: '12px', color: 'var(--color-graphite-faint)' }}>+ {dampers.length} Dampers</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-graphite)', display: 'flex', gap: '6px' }}>
            <span>28 SAD</span> · <span>14 RAD</span> · <span>8 EAG</span> · <span>4 Fire Dampers</span>
          </div>
        </div>
      </div>

      {/* Provenance Distribution Bar (Honest Certainty) */}
      <div style={{
        background: 'var(--color-sheet-elevated)',
        border: '1px solid var(--color-rule)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink)' }}>
              Takeoff Provenance Breakdown
            </span>
            <span style={{ fontSize: '11px', color: 'var(--color-graphite)', marginLeft: '8px' }}>
              Every quantity is strictly tagged by derivation method
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-measured)' }} />
              74.2% Measured (Geometry)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-read)' }} />
              21.6% Read (Vector Text / OCR)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-look)' }} />
              4.2% Needs a look (Inferred)
            </span>
          </div>
        </div>

        {/* 3-Segment Progress Bar */}
        <div style={{
          width: '100%',
          height: '8px',
          borderRadius: '999px',
          background: 'var(--color-paper)',
          display: 'flex',
          overflow: 'hidden',
          gap: '2px'
        }}>
          <div style={{ width: '74.2%', background: 'var(--color-measured)', borderRadius: '999px 0 0 999px' }} title="74.2% Measured" />
          <div style={{ width: '21.6%', background: 'var(--color-read)' }} title="21.6% Read" />
          <div style={{ width: '4.2%', background: 'var(--color-look)', borderRadius: '0 999px 999px 0' }} title="4.2% Needs a look" />
        </div>
      </div>

      {/* Sheets Section: Grid of Tender Sheets */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-ink)' }}>
              Drawing Sheets in Tender Set (1 Active · 4 Linked)
            </h3>
            <span style={{ fontSize: '11.5px', color: 'var(--color-graphite)' }}>
              Hover sheet card for live detection preview or click to open interactive 2D workspace
            </span>
          </div>
          <button onClick={onOpenWorkspace} className="btn-secondary" style={{ fontSize: '11.5px' }}>
            Open Active Drawing <ArrowRight size={13} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '14px'
        }}>
          {/* Active Sheet Card */}
          <div
            onClick={onOpenWorkspace}
            style={{
              background: 'var(--color-sheet-elevated)',
              border: '1.5px solid var(--color-mocha)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-subtle)',
              transition: 'transform var(--duration-fast), box-shadow var(--duration-fast)'
            }}
          >
            {/* Thumbnail Canvas Representation */}
            <div style={{
              height: '140px',
              background: '#2A2723',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid var(--color-rule)'
            }}>
              {/* Miniature blueprint layout preview */}
              <svg width="240" height="120" viewBox="0 0 240 120" style={{ opacity: 0.85 }}>
                <rect x="10" y="10" width="220" height="100" fill="none" stroke="#6B665E" strokeWidth="1" />
                <rect x="20" y="20" width="80" height="40" fill="rgba(217, 56, 114, 0.15)" stroke="#D93872" strokeWidth="1.2" />
                <rect x="110" y="20" width="80" height="40" fill="rgba(217, 56, 114, 0.15)" stroke="#D93872" strokeWidth="1.2" />
                <polyline points="40,40 150,40 150,80" fill="none" stroke="#D93872" strokeWidth="2.5" />
                <polyline points="50,25 140,25" fill="none" stroke="#2EA043" strokeWidth="2" strokeDasharray="3 2" />
                <circle cx="60" cy="40" r="3" fill="#D93872" />
                <circle cx="100" cy="40" r="3" fill="#D93872" />
                <circle cx="140" cy="40" r="3" fill="#D93872" />
              </svg>

              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(0,0,0,0.75)',
                color: '#fff',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '9.5px',
                fontFamily: 'var(--font-mono)'
              }}>
                ACTIVE · 1:100
              </div>
            </div>

            <div style={{ padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="font-mono" style={{ fontSize: '11px', color: 'var(--color-mocha-deep)', fontWeight: 600 }}>
                    KCEPL/HVAC/007 Rev R1
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-ink)', marginTop: '2px' }}>
                    First Floor HVAC Layout
                  </div>
                </div>
                <span className="provenance-pill measured" style={{ fontSize: '9px' }}>
                  Measured
                </span>
              </div>

              <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                <span style={{ fontSize: '9.5px', padding: '1px 5px', borderRadius: '3px', background: 'rgba(217,56,114,0.1)', color: '#D93872', fontWeight: 600 }}>
                  Supply (28)
                </span>
                <span style={{ fontSize: '9.5px', padding: '1px 5px', borderRadius: '3px', background: 'rgba(46,160,67,0.1)', color: '#2EA043', fontWeight: 600 }}>
                  Return (14)
                </span>
                <span style={{ fontSize: '9.5px', padding: '1px 5px', borderRadius: '3px', background: 'rgba(230,110,25,0.1)', color: '#E66E19', fontWeight: 600 }}>
                  Exhaust (8)
                </span>
              </div>
            </div>
          </div>

          {/* Linked Sheet 2: Ground Floor */}
          <div style={{
            background: 'var(--color-sheet-elevated)',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-md)',
            opacity: 0.7,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '140px',
              background: 'var(--color-paper)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid var(--color-rule-subtle)'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--color-graphite-faint)' }}>Queued in Tender Set</span>
            </div>
            <div style={{ padding: '14px' }}>
              <div className="font-mono" style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>KCEPL/HVAC/006 Rev R0</div>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-ink)', marginTop: '2px' }}>
                Ground Floor HVAC Layout
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-graphite)', marginTop: '6px' }}>
                Main Gymnasium & Squash Courts · Pending reading pass
              </div>
            </div>
          </div>

          {/* Linked Sheet 3: Equipment Schedule */}
          <div style={{
            background: 'var(--color-sheet-elevated)',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-md)',
            opacity: 0.7,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '140px',
              background: 'var(--color-paper)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid var(--color-rule-subtle)'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--color-graphite-faint)' }}>Equipment Schedule</span>
            </div>
            <div style={{ padding: '14px' }}>
              <div className="font-mono" style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>KCEPL/HVAC/SCH-01</div>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-ink)', marginTop: '2px' }}>
                HVAC Equipment & Fan Schedules
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-graphite)', marginTop: '6px' }}>
                AHU-01 to AHU-06 specifications · Ready for cross-linking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
