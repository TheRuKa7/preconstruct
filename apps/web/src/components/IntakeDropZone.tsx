import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, ArrowRight, Layers } from 'lucide-react';

interface IntakeDropZoneProps {
  onLoadSample: () => void;
  onCustomUpload: (fileName: string) => void;
  isProcessing: boolean;
}

export const IntakeDropZone: React.FC<IntakeDropZoneProps> = ({
  onLoadSample,
  onCustomUpload,
  isProcessing
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const names = Array.from(e.dataTransfer.files).map(f => f.name);
      onCustomUpload(names[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map(f => f.name);
      onCustomUpload(names[0]);
    }
  };

  return (
    <div style={{
      maxWidth: '780px',
      margin: '40px auto',
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Intro Header */}
      <div style={{ textAlign: 'center' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '3px 10px',
          borderRadius: '999px',
          background: 'var(--color-mocha-tint)',
          color: 'var(--color-mocha-deep)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.03em',
          marginBottom: '10px'
        }}>
          ZERO SETUP · REVIEW-FIRST MEP TAKEOFF
        </span>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--color-ink)',
          marginBottom: '8px'
        }}>
          Drop tender drawings to start takeoff
        </h1>
        <p style={{
          fontSize: '13px',
          color: 'var(--color-graphite)',
          maxWidth: '540px',
          margin: '0 auto'
        }}>
          Title blocks, scale, equipment tags, duct branches and air terminals are read directly from vector strokes and OCR. No manual tracing required.
        </p>
      </div>

      {/* Main Drag & Drop Box with Breathing Mocha Border */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={isDragOver ? "drop-target-active" : ""}
        style={{
          border: isDragOver ? '2px dashed var(--color-mocha)' : '1.5px dashed var(--color-rule)',
          borderRadius: 'var(--radius-lg)',
          background: isDragOver ? 'var(--color-mocha-tint)' : 'var(--color-sheet)',
          padding: '48px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all var(--duration-normal) var(--ease-standard)',
          boxShadow: isDragOver ? '0 0 20px var(--color-mocha-glow)' : 'var(--shadow-subtle)'
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          style={{ display: 'none' }}
          accept=".pdf,.dwg,.dxf,.zip"
          multiple
        />

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-mocha)',
          marginBottom: '16px'
        }}>
          <UploadCloud size={28} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-ink)' }}>
            Drag and drop tender drawing PDF or ZIP package
          </span>
          <div style={{ fontSize: '12px', color: 'var(--color-graphite)', marginTop: '4px' }}>
            or click to browse your local computer (Vector PDF, scanned blueprints, tender sets)
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-graphite-faint)', fontSize: '11px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FileText size={12} /> Auto-splits multi-page sets
          </span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Layers size={12} /> Identifies MEP disciplines
          </span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={12} /> Detects scale & title blocks
          </span>
        </div>
      </div>

      {/* Or Divider & Sample Plan Option */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        margin: '4px 0'
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--color-rule-subtle)' }} />
        <span style={{ fontSize: '11px', color: 'var(--color-graphite-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          or test immediately with verified tender drawing
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--color-rule-subtle)' }} />
      </div>

      {/* Sample Drawing Card */}
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
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-paper)',
            border: '1px solid var(--color-rule)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-mocha-deep)'
          }}>
            <FileText size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-ink)' }}>
                Manipal Sports Complex — First Floor HVAC Tender Layout
              </span>
              <span className="provenance-pill measured" style={{ fontSize: '9.5px' }}>
                Ground Truth M0
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--color-graphite)', marginTop: '2px' }}>
              Drawing KCEPL/HVAC/007 Rev R1 · Scale 1:100 · 8 AHUs & Fans · 50 Terminals · 220 m² GI Duct
            </div>
          </div>
        </div>

        <button
          onClick={onLoadSample}
          disabled={isProcessing}
          className="btn-primary"
          style={{ whiteSpace: 'nowrap', padding: '8px 16px', fontSize: '12px' }}
        >
          {isProcessing ? 'Reading drawing...' : 'Open Sample Tender'}
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
