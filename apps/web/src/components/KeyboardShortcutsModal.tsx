import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { section: "Stage Spine Navigation", items: [
      { key: "1 or T", description: "Stage 01: Tenders & PQ Gate" },
      { key: "2 or C", description: "Stage 02: Contract & Risks" },
      { key: "3 or W", description: "Stage 03: 2D/3D Takeoff Canvas" },
      { key: "4 or A", description: "Stage 04: Decision Inbox Triage" },
      { key: "5 or B", description: "Stage 05: BOQ & Pricing Grid" },
      { key: "6 or L", description: "Stage 06: Vendor Quote Leveling" },
      { key: "7 or S", description: "Stage 07: Submission Pro & Forms" },
      { key: "8 or O", description: "Stage 08: Executive Dashboard" }
    ]},
    { section: "Triage & Review Actions", items: [
      { key: "A", description: "Approve candidate value & propagate" },
      { key: "E", description: "Edit / Pick alternative standard" },
      { key: "X", description: "Reject / Flag for pre-bid RFI" },
      { key: "J / →", description: "Next item in triage inbox" },
      { key: "K / ←", description: "Previous item in triage inbox" },
      { key: "⌘K", description: "Open Global Command Bar" }
    ]},
    { section: "CAD & Viewport Tools", items: [
      { key: "V", description: "Select & Pan canvas" },
      { key: "L", description: "Linear / Length measurement tool" },
      { key: "C", description: "Symbol count tool" },
      { key: "D", description: "Toggle row density (Comfortable/Compact)" },
      { key: "?", description: "Toggle this keybindings cheat sheet" },
      { key: "Esc", description: "Close modal / Clear active selection" }
    ]}
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(25, 24, 22, 0.55)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 250
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '580px',
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-float)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Keyboard size={18} color="#0D9488" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-ink)' }}>
              Keyboard Shortcuts & High-Velocity Ergonomics
            </h3>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '4px 6px' }}>
            <X size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {shortcuts.map((sec, sIdx) => (
            <div key={sIdx}>
              <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, marginBottom: '6px' }}>
                {sec.section}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '6px'
              }}>
                {sec.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'var(--color-paper)',
                      padding: '6px 9px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-rule-subtle)'
                    }}
                  >
                    <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                      {item.description}
                    </span>
                    <span className="keycap" style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>
                      {item.key}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: 'var(--color-graphite-faint)',
          borderTop: '1px solid var(--color-rule)',
          paddingTop: '12px'
        }}>
          <span>Press <span className="keycap">?</span> anytime to show/hide this cheat sheet</span>
          <button onClick={onClose} className="btn-primary" style={{ padding: '4px 12px', fontSize: '11.5px', background: '#0D9488' }}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
