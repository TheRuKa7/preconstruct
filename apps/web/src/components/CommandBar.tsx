import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, CornerDownLeft } from 'lucide-react';
import type { ActiveTab } from '../types';

interface CommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onSelectElement?: (id: string) => void;
  onToggleTheme: () => void;
  onToggleDensity: () => void;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectElement,
  onToggleTheme,
  onToggleDensity
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickItems = [
    { title: "Stage 01: Tenders & PQ Engine", subtitle: "Tender search, Go/No-Go scorecard, qualification gates", category: "Stages", action: () => { onNavigate('tenders'); onClose(); } },
    { title: "Stage 02: Contract Intelligence & Risks", subtitle: "Contradiction graph, LD delay scenario modeler, Pre-Bid RFIs", category: "Stages", action: () => { onNavigate('contracts'); onClose(); } },
    { title: "Stage 03: 2D/3D Takeoff Canvas", subtitle: "KCEPL/HVAC/007 Rev R1 · Vector blueprints & CAD measurements", category: "Stages", action: () => { onNavigate('workspace'); onClose(); } },
    { title: "Stage 04: Decision Inbox & Review Queue", subtitle: "Human triage with keyboard velocity (A/E/X)", category: "Stages", action: () => { onNavigate('review'); onClose(); } },
    { title: "Stage 05: BOQ & CSI Pricing Grid", subtitle: "Division 23 HVAC item schedules and rates", category: "Stages", action: () => { onNavigate('boq'); onClose(); } },
    { title: "Stage 06: Vendor Quote Leveling", subtitle: "Subcontractor scope gap analysis & normalized landing cost", category: "Stages", action: () => { onNavigate('leveling'); onClose(); } },
    { title: "Stage 07: Statutory Submission Pro", subtitle: "Word Track Changes annexures & 144p bid package", category: "Stages", action: () => { onNavigate('submission'); onClose(); } },
    { title: "Stage 08: Executive Portfolio Dashboard", subtitle: "Portfolio health, win probabilities, and enterprise metrics", category: "Stages", action: () => { onNavigate('overview'); onClose(); } },
    
    // Quick Item Deep Links
    { title: "FF-FA-AHU-05", subtitle: "26.5 TR · 9,500 CFM · AHU Room 05 Grid C37-C41", category: "Equipment", action: () => { onNavigate('workspace'); onSelectElement?.('FF-FA-AHU-05'); onClose(); } },
    { title: "DR-01 Supply Main 1600×450 mm", subtitle: "18 Gauge / 1.25 mm · 60.68 m² duct surface area", category: "Ductwork", action: () => { onNavigate('workspace'); onSelectElement?.('DR-01'); onClose(); } },
    { title: "Toggle Comfortable / Compact Density", subtitle: "Shortcut: D", category: "Preferences", action: () => { onToggleDensity(); onClose(); } },
    { title: "Toggle Light / Dark Mode", subtitle: "Cloud Dancer / Deep Void aesthetic", category: "Preferences", action: () => { onToggleTheme(); onClose(); } }
  ];

  const filtered = query.trim() === ''
    ? quickItems
    : quickItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(25, 24, 22, 0.55)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px',
        zIndex: 200
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
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 18px',
          borderBottom: '1px solid var(--color-rule)'
        }}>
          <Search size={16} color="var(--color-graphite)" />
          <input
            autoFocus
            type="text"
            placeholder="Type a stage number, sheet, equipment tag, or action..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '13.5px',
              color: 'var(--color-ink)'
            }}
          />
          <span className="keycap">ESC</span>
        </div>

        {/* Results List */}
        <div style={{
          maxHeight: '380px',
          overflowY: 'auto',
          padding: '6px'
        }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-graphite)', fontSize: '13px' }}>
              No matches found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={item.action}
                className="command-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--color-rule-subtle)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)' }}>
                      {item.title}
                    </span>
                    <span style={{
                      fontSize: '9.5px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      background: 'var(--color-paper)',
                      color: 'var(--color-graphite)'
                    }}>
                      {item.category}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                    {item.subtitle}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-graphite-faint)' }}>
                  <ArrowRight size={13} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div style={{
          padding: '8px 16px',
          borderTop: '1px solid var(--color-rule)',
          background: 'var(--color-paper)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--color-graphite)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Navigation:</span>
            <span className="font-mono">Keys 1-8</span>
            <span>·</span>
            <span>Select:</span>
            <span className="keycap">↵</span>
          </div>
          <div>Preconstruct Enterprise OS</div>
        </div>
      </div>
    </div>
  );
};
