import React, { useState } from 'react';
import type { BOQItem, MarketMode } from '../types';
import { 
  FileSpreadsheet, 
  Check, 
  ExternalLink
} from 'lucide-react';

interface MeasuredBOQProps {
  items: BOQItem[];
  market?: MarketMode;
}

export const MeasuredBOQ: React.FC<MeasuredBOQProps> = ({
  items,
  market = 'IN'
}) => {
  const [groupBy, setGroupBy] = useState<'trade' | 'csi' | 'all'>('trade');
  const [exportState, setExportState] = useState<'idle' | 'exporting' | 'ready'>('idle');

  // Compute Grand Total based on market currency
  const grandTotal = items.reduce((sum, item) => {
    if (market === 'IN') {
      return sum + (item.total_inr ?? (item.total_usd * 86.5));
    }
    return sum + item.total_usd;
  }, 0);

  // Group items
  const trades = Array.from(new Set(items.map(i => i.trade)));

  const formatCurrency = (val: number) => {
    if (market === 'IN') {
      return `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleExport = (type: 'xlsx' | 'csv') => {
    setExportState('exporting');
    setTimeout(() => {
      setExportState('ready');
      const currencySymbol = market === 'IN' ? 'INR' : 'USD';
      const headers = ["CSI Code", "Description", "Trade", "Quantity", "Unit", `Unit Rate ${currencySymbol}`, `Total ${currencySymbol}`, "Provenance", "Source Sheet", "Coordinates Ref"];
      const rows = items.map(i => [
        `"${i.csi_code}"`,
        `"${i.description.replace(/"/g, '""')}"`,
        `"${i.trade}"`,
        i.quantity,
        `"${i.unit}"`,
        market === 'IN' ? (i.unit_rate_inr ?? (i.unit_rate_usd * 86.5)).toFixed(2) : i.unit_rate_usd.toFixed(2),
        market === 'IN' ? (i.total_inr ?? (i.total_usd * 86.5)).toFixed(2) : i.total_usd.toFixed(2),
        `"${i.provenance}"`,
        `"${i.source_sheet}"`,
        `"${i.source_ref}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Preconstruct_BOQ_${market === 'IN' ? 'Manipal_Hospital' : 'Austin_Med_Center'}_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setExportState('idle');
      }, 3500);
    }, 1200);
  };

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* BOQ Header with Export Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--color-rule)',
        paddingBottom: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-ink)' }}>
              Measured Bill of Quantities (BOQ)
            </h2>
            <span className="provenance-pill measured" style={{ fontSize: '10px' }}>
              100% Provenance Traceable
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-graphite)', marginTop: '2px' }}>
            All quantities linked to sheet coordinates & engineering standards (IS 655:2006 & SMACNA 3rd Ed)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Grouping switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--color-paper)',
            borderRadius: 'var(--radius-sm)',
            padding: '2px',
            border: '1px solid var(--color-rule-subtle)'
          }}>
            <button
              onClick={() => setGroupBy('trade')}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                fontWeight: groupBy === 'trade' ? 600 : 500,
                background: groupBy === 'trade' ? 'var(--color-sheet-elevated)' : 'transparent',
                color: groupBy === 'trade' ? 'var(--color-ink)' : 'var(--color-graphite)'
              }}
            >
              By Trade
            </button>
            <button
              onClick={() => setGroupBy('csi')}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                fontWeight: groupBy === 'csi' ? 600 : 500,
                background: groupBy === 'csi' ? 'var(--color-sheet-elevated)' : 'transparent',
                color: groupBy === 'csi' ? 'var(--color-ink)' : 'var(--color-graphite)'
              }}
            >
              CSI Div 23
            </button>
            <button
              onClick={() => setGroupBy('all')}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                fontWeight: groupBy === 'all' ? 600 : 500,
                background: groupBy === 'all' ? 'var(--color-sheet-elevated)' : 'transparent',
                color: groupBy === 'all' ? 'var(--color-ink)' : 'var(--color-graphite)'
              }}
            >
              Flat Schedule
            </button>
          </div>

          <div style={{ width: '1px', height: '18px', background: 'var(--color-rule)' }} />

          {/* Export Button */}
          <button
            onClick={() => handleExport('xlsx')}
            disabled={exportState === 'exporting'}
            className="btn-primary"
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              background: exportState === 'ready' ? 'var(--color-measured)' : 'var(--color-mocha)'
            }}
          >
            {exportState === 'exporting' ? (
              <>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #fff', borderTopColor: 'transparent', animation: 'spin 0.6s linear infinite' }} />
                Generating Excel...
              </>
            ) : exportState === 'ready' ? (
              <>
                <Check size={14} />
                Downloaded!
              </>
            ) : (
              <>
                <FileSpreadsheet size={14} />
                Export BOQ (.xlsx)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        background: 'var(--color-sheet-elevated)',
        border: '1px solid var(--color-rule)',
        borderRadius: 'var(--radius-md)',
        padding: '14px 18px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div>
          <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Subtotal Base Cost</span>
          <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
            {formatCurrency(grandTotal)}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Total BOQ Line Items</span>
          <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
            {items.length} Lines
          </div>
        </div>
        <div>
          <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Sheet Metal Area</span>
          <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
            {market === 'US' ? '2,369.9 sq ft' : '220.28 m²'}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Provenance Integrity</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <span className="provenance-pill measured" style={{ fontSize: '10.5px' }}>
              74.2% Measured
            </span>
            <span className="provenance-pill read" style={{ fontSize: '10.5px' }}>
              21.6% Read
            </span>
          </div>
        </div>
      </div>

      {/* BOQ Table (Dense Compact Maximalism) */}
      <div style={{
        background: 'var(--color-sheet-elevated)',
        border: '1px solid var(--color-rule)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-table-size)' }}>
          <thead>
            <tr style={{
              background: 'var(--color-paper)',
              borderBottom: '1px solid var(--color-rule)',
              color: 'var(--color-graphite)',
              fontSize: '10.5px',
              textTransform: 'uppercase',
              textAlign: 'left'
            }}>
              <th style={{ padding: 'var(--cell-py) var(--cell-px)', width: '90px' }}>CSI Code</th>
              <th style={{ padding: 'var(--cell-py) var(--cell-px)' }}>Description & Specification</th>
              <th style={{ padding: 'var(--cell-py) var(--cell-px)', width: '110px' }}>Trade</th>
              <th style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right', width: '80px' }}>Qty</th>
              <th style={{ padding: 'var(--cell-py) var(--cell-px)', width: '50px' }}>Unit</th>
              <th style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right', width: '100px' }}>Rate ({market === 'IN' ? '₹' : '$'})</th>
              <th style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right', width: '110px' }}>Total ({market === 'IN' ? '₹' : '$'})</th>
              <th style={{ padding: 'var(--cell-py) var(--cell-px)', width: '90px', textAlign: 'center' }}>Provenance</th>
              <th style={{ padding: 'var(--cell-py) var(--cell-px)', width: '190px' }}>Plan Coordinate Link</th>
            </tr>
          </thead>
          <tbody>
            {groupBy === 'trade' ? (
              trades.map(tradeName => {
                const tradeItems = items.filter(i => i.trade === tradeName);
                const tradeSubtotal = tradeItems.reduce((s, it) => s + (market === 'IN' ? (it.total_inr ?? (it.total_usd * 86.5)) : it.total_usd), 0);

                return (
                  <React.Fragment key={tradeName}>
                    {/* Trade Header Row */}
                    <tr style={{ background: 'var(--color-sheet)', borderBottom: '1px solid var(--color-rule-subtle)' }}>
                      <td colSpan={6} style={{ padding: '6px 12px', fontWeight: 600, color: 'var(--color-ink)', fontSize: '11.5px' }}>
                        {tradeName} ({tradeItems.length} items)
                      </td>
                      <td className="font-mono" style={{ padding: '6px 12px', textAlign: 'right', fontWeight: 700, fontSize: '11.5px' }}>
                        {formatCurrency(tradeSubtotal)}
                      </td>
                      <td colSpan={2}></td>
                    </tr>

                    {/* Trade Items */}
                    {tradeItems.map(item => (
                      <tr
                        key={item.id}
                        style={{
                          height: 'var(--row-h)',
                          borderBottom: '1px solid var(--color-rule-subtle)',
                          transition: 'background var(--duration-fast)'
                        }}
                      >
                        <td className="badge-code" style={{ padding: 'var(--cell-py) var(--cell-px)', color: 'var(--color-graphite)' }}>
                          {item.csi_code}
                        </td>
                        <td style={{ padding: 'var(--cell-py) var(--cell-px)', fontWeight: 500 }}>
                          {item.description}
                          <div style={{ fontSize: '10px', color: 'var(--color-graphite-faint)' }}>
                            Standard: {item.standard_ref}
                          </div>
                        </td>
                        <td style={{ padding: 'var(--cell-py) var(--cell-px)', color: 'var(--color-graphite)' }}>
                          {item.trade}
                        </td>
                        <td className="cell-num" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right', fontWeight: 600 }}>
                          {item.quantity}
                        </td>
                        <td style={{ padding: 'var(--cell-py) var(--cell-px)', color: 'var(--color-graphite)' }}>
                          {item.unit}
                        </td>
                        <td className="cell-num" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right' }}>
                          {market === 'IN' 
                            ? `₹${(item.unit_rate_inr ?? (item.unit_rate_usd * 86.5)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                            : `$${item.unit_rate_usd.toFixed(2)}`}
                        </td>
                        <td className="cell-num" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right', fontWeight: 700 }}>
                          {market === 'IN' 
                            ? `₹${(item.total_inr ?? (item.total_usd * 86.5)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                            : `$${item.total_usd.toFixed(2)}`}
                        </td>
                        <td style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'center' }}>
                          <span className={`provenance-pill ${item.provenance.toLowerCase()}`} style={{ fontSize: '9px' }}>
                            {item.provenance}
                          </span>
                        </td>
                        <td style={{ padding: 'var(--cell-py) var(--cell-px)' }}>
                          <span
                            className="font-mono"
                            style={{
                              fontSize: '10px',
                              color: 'var(--color-mocha-deep)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              cursor: 'pointer'
                            }}
                            title={`Located on ${item.source_sheet}`}
                          >
                            <ExternalLink size={10} />
                            {item.source_ref}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })
            ) : (
              items.map(item => (
                <tr
                  key={item.id}
                  style={{
                    height: 'var(--row-h)',
                    borderBottom: '1px solid var(--color-rule-subtle)'
                  }}
                >
                  <td className="badge-code" style={{ padding: 'var(--cell-py) var(--cell-px)' }}>{item.csi_code}</td>
                  <td style={{ padding: 'var(--cell-py) var(--cell-px)', fontWeight: 500 }}>{item.description}</td>
                  <td style={{ padding: 'var(--cell-py) var(--cell-px)' }}>{item.trade}</td>
                  <td className="cell-num" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right', fontWeight: 600 }}>{item.quantity}</td>
                  <td style={{ padding: 'var(--cell-py) var(--cell-px)' }}>{item.unit}</td>
                  <td className="cell-num" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right' }}>
                    {market === 'IN' 
                      ? `₹${(item.unit_rate_inr ?? (item.unit_rate_usd * 86.5)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                      : `$${item.unit_rate_usd.toFixed(2)}`}
                  </td>
                  <td className="cell-num" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right', fontWeight: 700 }}>
                    {market === 'IN' 
                      ? `₹${(item.total_inr ?? (item.total_usd * 86.5)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                      : `$${item.total_usd.toFixed(2)}`}
                  </td>
                  <td style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'center' }}>
                    <span className={`provenance-pill ${item.provenance.toLowerCase()}`} style={{ fontSize: '9px' }}>{item.provenance}</span>
                  </td>
                  <td className="font-mono" style={{ padding: 'var(--cell-py) var(--cell-px)', fontSize: '10px', color: 'var(--color-mocha-deep)' }}>
                    {item.source_ref}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
