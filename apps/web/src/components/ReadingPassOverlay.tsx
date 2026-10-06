import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ReadingPassOverlayProps {
  onComplete: () => void;
  sheetTitle: string;
}

export const ReadingPassOverlay: React.FC<ReadingPassOverlayProps> = ({
  onComplete,
  sheetTitle
}) => {
  const [step, setStep] = useState(0);
  const [symbolsCount, setSymbolsCount] = useState(0);
  const [ductCount, setDuctCount] = useState(0);
  const [terminalsCount, setTerminalsCount] = useState(0);

  const steps = [
    "Vector geometry & text pass: 315 coordinates mapped",
    "Title block & scale calibration: 1:100 verified against C8–C13 grid",
    "Symbol matcher: seeded from legend crops (SAD, RAD, EAG, FD)",
    "Duct tracer: parallel strokes grouped to centrelines (IS 655 Table 1)",
    "Association & rules: tag linking & outer insulation areas computed"
  ];

  useEffect(() => {
    // Stage 1
    const t1 = setTimeout(() => {
      setStep(1);
      setSymbolsCount(12);
    }, 400);

    // Stage 2
    const t2 = setTimeout(() => {
      setStep(2);
      setSymbolsCount(28);
      setTerminalsCount(20);
    }, 900);

    // Stage 3
    const t3 = setTimeout(() => {
      setStep(3);
      setSymbolsCount(41);
      setTerminalsCount(42);
      setDuctCount(3);
    }, 1400);

    // Stage 4
    const t4 = setTimeout(() => {
      setStep(4);
      setTerminalsCount(50);
      setDuctCount(5);
    }, 1900);

    // Stage 5 Complete
    const t5 = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(31, 29, 26, 0.45)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        width: '520px',
        background: 'var(--color-sheet-elevated)',
        border: '1px solid var(--color-rule)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        boxShadow: 'var(--shadow-float)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top Laser Scanner Bar */}
        <div className="laser-scanner" />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <span style={{
              fontSize: '10.5px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--color-mocha-deep)',
              fontWeight: 600
            }}>
              AUTOMATED READING PASS IN PROGRESS
            </span>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)', marginTop: '4px' }}>
              {sheetTitle}
            </h2>
          </div>
          <span className="provenance-pill measured" style={{ fontSize: '10px' }}>
            5 Stages
          </span>
        </div>

        {/* Counter Tickers in JetBrains Mono */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          background: 'var(--color-paper)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-rule-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Equipment Tags</div>
            <div className="mono-val" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
              {symbolsCount > 0 ? '4' : '0'}<span style={{ fontSize: '11px', color: 'var(--color-graphite-faint)' }}> / 4</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Air Terminals</div>
            <div className="mono-val" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
              {terminalsCount}<span style={{ fontSize: '11px', color: 'var(--color-graphite-faint)' }}> / 50</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Duct Runs</div>
            <div className="mono-val" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
              {ductCount}<span style={{ fontSize: '11px', color: 'var(--color-graphite-faint)' }}> / 5</span>
            </div>
          </div>
        </div>

        {/* Step Progress Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {steps.map((st, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '11.5px',
                color: i <= step ? 'var(--color-ink)' : 'var(--color-graphite-faint)',
                transition: 'color var(--duration-fast)'
              }}
            >
              {i < step ? (
                <CheckCircle2 size={14} color="var(--color-measured)" />
              ) : i === step ? (
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: '2px solid var(--color-mocha)',
                  borderTopColor: 'transparent',
                  animation: 'spin 0.8s linear infinite'
                }} />
              ) : (
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-rule)',
                  background: 'var(--color-paper)'
                }} />
              )}
              <span style={{ fontWeight: i === step ? 600 : 400 }}>
                {st}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div style={{
          fontSize: '11px',
          color: 'var(--color-graphite)',
          borderTop: '1px solid var(--color-rule-subtle)',
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Non-destructive overlay · Raw vector coordinates preserved</span>
          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-graphite-faint)' }}>
            87% Complete
          </span>
        </div>
      </div>
    </div>
  );
};
