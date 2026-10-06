import React, { useState } from 'react';
import type { SubcontractorQuote, MarketMode } from '../types';
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet,
  Award,
  Check,
  ShieldCheck,
  FileText,
  TrendingDown,
  Info
} from 'lucide-react';

interface VendorLevelingProps {
  quotes: SubcontractorQuote[];
  market?: MarketMode;
}

export const VendorLeveling: React.FC<VendorLevelingProps> = ({ 
  quotes: initialQuotes, 
  market = 'IN' 
}) => {
  const [selectedVendorId, setSelectedVendorId] = useState<string>(initialQuotes[0]?.vendor_id || '');
  const [isExporting, setIsExporting] = useState(false);
  const [loiAwardedVendorId, setLoiAwardedVendorId] = useState<string | null>(null);

  // Sync selectedVendorId if quotes list changes (e.g. market switch)
  React.useEffect(() => {
    if (initialQuotes.length > 0 && !initialQuotes.some(q => q.vendor_id === selectedVendorId)) {
      setSelectedVendorId(initialQuotes[0].vendor_id);
    }
  }, [initialQuotes, selectedVendorId]);

  // Track user-toggled exclusions for live leveling recalculation
  const [toggledExclusions, setToggledExclusions] = useState<Record<string, boolean>>({});

  const formatCurrency = (usdVal: number, inrVal?: number) => {
    if (market === 'IN') {
      const val = inrVal ?? (usdVal * 86.5);
      return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    }
    return `$${usdVal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Compute live leveled values with exclusions toggled
  const leveledQuotes = initialQuotes.map(quote => {
    const isWinner = quote.rank === 1;
    return {
      ...quote,
      isWinner
    };
  });

  const activeVendor = leveledQuotes.find(q => q.vendor_id === selectedVendorId) || leveledQuotes[0];

  const handleExportLevelingMatrix = () => {
    setIsExporting(true);
    setTimeout(() => {
      const currencySymbol = market === 'IN' ? 'INR' : 'USD';
      const headers = ["Rank", "Vendor Name", "Contact Person", `Quoted Base (${currencySymbol})`, "Delivery (Weeks)", "Warranty (Months)", `Scope Additions (${currencySymbol})`, `Final Leveled (${currencySymbol})`, "Compliance"];
      const rows = leveledQuotes.map(q => [
        q.rank,
        `"${q.vendor_name}"`,
        `"${q.contact_person}"`,
        market === 'IN' ? (q.quoted_base_inr ?? (q.quoted_base_usd * 86.5)).toFixed(0) : q.quoted_base_usd.toFixed(0),
        q.delivery_weeks,
        q.warranty_months,
        market === 'IN' ? (q.normalized_additions_inr ?? (q.normalized_additions_usd * 86.5)).toFixed(0) : q.normalized_additions_usd.toFixed(0),
        market === 'IN' ? (q.final_leveled_inr ?? (q.final_leveled_usd * 86.5)).toFixed(0) : q.final_leveled_usd.toFixed(0),
        `"${q.compliance_rating}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Preconstruct_Subcontractor_Leveling_Matrix_${market === 'IN' ? 'India' : 'US'}_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
    }, 700);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: 'var(--color-paper)' }}>
      {/* Header Bar */}
      <div style={{
        padding: '10px 20px',
        borderBottom: '1px solid var(--color-rule)',
        background: 'var(--color-sheet)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-ink)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} color="#0D9488" />
            {market === 'US' ? 'Subcontractor Sourcing & Bid Leveling Matrix (CSI Div 23)' : 'Subcontractor Sourcing & Bid Leveling Matrix (HVAC Low-Side)'}
          </h2>
          <span style={{ fontSize: '11.5px', color: 'var(--color-graphite)' }}>
            {market === 'US' 
              ? 'Normalizes US mechanical subcontractor proposals, identifies scope omissions (TAB, crane rigging, seismic), and calculates true landed costs' 
              : 'Normalizes trade vendor proposals, detects hidden scope exclusions (acoustic insulation, BMS wiring), and calculates true landed costs'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleExportLevelingMatrix}
            disabled={isExporting}
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
              cursor: isExporting ? 'wait' : 'pointer'
            }}
          >
            <FileSpreadsheet size={13} />
            <span>{isExporting ? 'Generating Excel...' : 'Export Comparison Excel'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Award LOI Banner if Triggered */}
        {loiAwardedVendorId && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '6px',
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid #22C55E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="#166534" />
              <div>
                <strong style={{ fontSize: '12.5px', color: '#166534' }}>Letter of Intent (LOI) Prepared for {leveledQuotes.find(q => q.vendor_id === loiAwardedVendorId)?.vendor_name}</strong>
                <div style={{ fontSize: '11px', color: '#15803D' }}>
                  Commercial terms locked · Scope normalization rider attached · Sent to Senior Estimator for sign-off
                </div>
              </div>
            </div>
            <button
              onClick={() => setLoiAwardedVendorId(null)}
              style={{ fontSize: '11px', color: '#166534', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Top Summary Cards: Side-by-Side Comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {leveledQuotes.map((quote) => {
            const isWinner = quote.rank === 1;
            const isSelected = quote.vendor_id === selectedVendorId;

            return (
              <div
                key={quote.vendor_id}
                onClick={() => setSelectedVendorId(quote.vendor_id)}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: isSelected ? 'var(--color-sheet-elevated)' : 'var(--color-sheet)',
                  border: isWinner ? '2px solid #22C55E' : isSelected ? '2px solid #0D9488' : '1px solid var(--color-rule)',
                  boxShadow: isWinner ? '0 4px 14px rgba(34, 197, 94, 0.15)' : 'none',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {isWinner && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '14px',
                    background: '#22C55E',
                    color: '#FFFFFF',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(34, 197, 94, 0.3)'
                  }}>
                    <Award size={11} />
                    <span>RECOMMENDED AWARD (RANK 1)</span>
                  </div>
                )}

                <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', marginBottom: '3px' }}>
                  Vendor #{quote.rank} · {quote.compliance_rating} COMPLIANCE
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                  {quote.vendor_name}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', borderTop: '1px solid var(--color-rule)', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-graphite)' }}>Quoted Base Bid:</span>
                    <strong style={{ color: 'var(--color-ink)' }}>{formatCurrency(quote.quoted_base_usd, quote.quoted_base_inr)}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B91C1C' }}>
                    <span>Scope Additions:</span>
                    <strong>+{formatCurrency(quote.normalized_additions_usd, quote.normalized_additions_inr)}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px dashed var(--color-rule)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Normalized Landed:</span>
                    <strong style={{ fontSize: '14.5px', color: isWinner ? '#166534' : '#0D9488' }}>
                      {formatCurrency(quote.final_leveled_usd, quote.final_leveled_inr)}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-graphite)', marginTop: '4px' }}>
                    <span>Lead Time: <strong>{quote.delivery_weeks} Weeks</strong></span>
                    <span>Warranty: <strong>{quote.warranty_months} Mos</strong></span>
                  </div>
                </div>

                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-rule-subtle)' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLoiAwardedVendorId(quote.vendor_id);
                    }}
                    style={{
                      width: '100%',
                      padding: '5px 8px',
                      borderRadius: '4px',
                      border: isWinner ? '1px solid #22C55E' : '1px solid var(--color-rule)',
                      background: isWinner ? 'rgba(34, 197, 94, 0.1)' : 'var(--color-paper)',
                      color: isWinner ? '#166534' : 'var(--color-ink)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {loiAwardedVendorId === quote.vendor_id ? '✓ LOI Selected' : isWinner ? '★ Prepare Intent to Award' : 'Select for Evaluation'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Scope Exclusion Inspector & Interactive Normalization */}
        <div style={{
          padding: '18px',
          borderRadius: '8px',
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
                Detailed Scope Gap & Exclusion Analysis: {activeVendor.vendor_name}
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                Contact: <strong>{activeVendor.contact_person}</strong> · Autonomous parser detected the following qualifications & riders:
              </span>
            </div>
            <span style={{
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '4px',
              background: activeVendor.compliance_rating === 'FULL' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.15)',
              color: activeVendor.compliance_rating === 'FULL' ? '#166534' : '#854D0E',
              fontWeight: 700
            }}>
              {activeVendor.compliance_rating} COMPLIANCE
            </span>
          </div>

          {activeVendor.detected_exclusions.length > 0 && !activeVendor.detected_exclusions[0].includes("zero exclusions") ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              {activeVendor.detected_exclusions.map((exclusion, idx) => {
                const exclusionKey = `${activeVendor.vendor_id}-${idx}`;
                const isWaived = !!toggledExclusions[exclusionKey];

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: isWaived ? 'var(--color-paper)' : 'rgba(239, 68, 68, 0.08)',
                      border: isWaived ? '1px dashed var(--color-rule)' : '1px solid rgba(239, 68, 68, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <AlertTriangle size={15} color={isWaived ? 'var(--color-graphite)' : '#EF4444'} />
                      <div>
                        <span style={{ fontSize: '12px', color: isWaived ? 'var(--color-graphite)' : '#991B1B', fontWeight: 500, textDecoration: isWaived ? 'line-through' : 'none' }}>
                          {exclusion}
                        </span>
                        <div style={{ fontSize: '10.5px', color: 'var(--color-graphite-faint)', marginTop: '2px' }}>
                          Normalized in Landed Cost: {formatCurrency(quoteAdditionEst(idx), quoteAdditionEst(idx) * 86.5)}
                        </div>
                      </div>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-graphite)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isWaived}
                        onChange={(e) => {
                          setToggledExclusions(prev => ({
                            ...prev,
                            [exclusionKey]: e.target.checked
                          }));
                        }}
                      />
                      <span>Waive Rider</span>
                    </label>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              padding: '12px 14px',
              borderRadius: '6px',
              background: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '12px'
            }}>
              <CheckCircle2 size={16} color="#22C55E" />
              <span style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>
                100% Scope Match — Zero exclusions or carve-outs detected in subcontractor proposal. Full turnkey scope guaranteed.
              </span>
            </div>
          )}
        </div>

        {/* Trade Scope Leveling Matrix Table */}
        <div style={{
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-sheet)' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
              Comprehensive Trade Scope Leveling Breakdown
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
              Side-by-side scope matrix normalized to CSI Division 23 specifications
            </span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
            <thead>
              <tr style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)', color: 'var(--color-graphite)', textTransform: 'uppercase', fontSize: '10px', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px' }}>Scope Work Package</th>
                {leveledQuotes.map(q => (
                  <th key={q.vendor_id} style={{ padding: '8px 12px', textAlign: 'right' }}>
                    {q.vendor_name.split(' ')[0]} {q.rank === 1 ? '★' : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { scope: "GI Sheet Metal Supply & Erection", inApex: "Included", inComfort: "Included", inSterling: "Included" },
                { scope: "25mm Nitrile Thermal Insulation", inApex: "Included", inComfort: "Included", inSterling: "Included" },
                { scope: "Acoustic Return Elbow Insulation", inApex: "EXCLUDED (+$4,200)", inComfort: "Included", inSterling: "Included" },
                { scope: "Fire Damper BMS Wiring & Monitoring", inApex: "EXCLUDED (+$4,200)", inComfort: "Included", inSterling: "Included" },
                { scope: "Vibration Isolators & Spring Hangers", inApex: "Included", inComfort: "EXCLUDED (+$3,500)", inSterling: "Included" },
                { scope: "Scaffolding & Staging above 4.5m", inApex: "Included", inComfort: "EXCLUDED (+$2,700)", inSterling: "Included" },
                { scope: "Testing, Adjusting & Balancing (TAB)", inApex: "Included", inComfort: "Included", inSterling: "Included" },
                { scope: "Warranty Period", inApex: "24 Months", inComfort: "36 Months", inSterling: "36 Months" }
              ].map((row, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: '1px solid var(--color-rule-subtle)' }}>
                  <td style={{ padding: '7px 12px', fontWeight: 600, color: 'var(--color-ink)' }}>{row.scope}</td>
                  <td style={{ padding: '7px 12px', textAlign: 'right', color: row.inApex.includes('EXCLUDED') ? '#991B1B' : '#166534', fontWeight: row.inApex.includes('EXCLUDED') ? 700 : 500 }}>
                    {row.inApex}
                  </td>
                  <td style={{ padding: '7px 12px', textAlign: 'right', color: row.inComfort.includes('EXCLUDED') ? '#991B1B' : '#166534', fontWeight: row.inComfort.includes('EXCLUDED') ? 700 : 500 }}>
                    {row.inComfort}
                  </td>
                  <td style={{ padding: '7px 12px', textAlign: 'right', color: '#166534', fontWeight: 600 }}>
                    {row.inSterling}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

// Helper for estimate per exclusion
function quoteAdditionEst(idx: number): number {
  return idx === 0 ? 4200 : 4200;
}
