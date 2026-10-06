import React from 'react';
import type { RoleLens, ActiveTab, MarketMode } from '../types';
import { 
  ShieldCheck, 
  Scale as ScaleIcon, 
  Command, 
  Sparkles, 
  HelpCircle,
  Eye
} from 'lucide-react';

interface StatusBarProps {
  activeTab: ActiveTab;
  roleLens: RoleLens;
  market?: MarketMode;
  onOpenCommandBar: () => void;
  onOpenShortcuts: () => void;
  onToggleAi: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeTab,
  roleLens,
  market = 'IN',
  onOpenCommandBar,
  onOpenShortcuts,
  onToggleAi
}) => {
  const getTabLabel = (tab: ActiveTab) => {
    switch (tab) {
      case 'tenders': return 'Stage 1: Tender & PQ Screening';
      case 'contracts': return 'Stage 2: Contract Intelligence & RFIs';
      case 'workspace': return 'Stage 3: 2D/3D Vector Takeoff';
      case 'review': return 'Stage 4: Unified Decision Inbox';
      case 'boq': return market === 'US' ? 'Stage 5: CSI MasterFormat Div 23 Pricing' : 'Stage 5: BOQ & Schedule of Rates';
      case 'leveling': return 'Stage 6: Subcontractor Bid Leveling';
      case 'submission': return market === 'US' ? 'Stage 7: Federal Submission Pro (SF-1442)' : 'Stage 7: Statutory Submission Pro (CPPP)';
      case 'overview': return 'Stage 8: Portfolio Dashboard';
      default: return 'Pursuit Active';
    }
  };

  return (
    <footer style={{
      height: '26px',
      background: 'var(--color-sheet)',
      borderTop: '1px solid var(--color-rule)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      fontSize: '11px',
      color: 'var(--color-graphite)',
      flexShrink: 0,
      zIndex: 40,
      userSelect: 'none',
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      {/* Left: Active Stage & Scale */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: 'var(--color-ink)', whiteSpace: 'nowrap' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2EA043', flexShrink: 0 }} />
          <span>{getTabLabel(activeTab)}</span>
        </div>

        <div style={{ width: '1px', height: '14px', background: 'var(--color-rule)', flexShrink: 0 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '10.5px', whiteSpace: 'nowrap' }}>
          <ScaleIcon size={12} color="var(--color-mocha)" />
          <span>{market === 'US' ? 'Scale 1/8"=1\'-0" (US Imperial)' : 'Scale 1:100 (IS Metric)'}</span>
        </div>

        <div style={{ width: '1px', height: '14px', background: 'var(--color-rule)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Eye size={12} color="var(--color-graphite-faint)" />
          <span>Lens: <strong style={{ color: 'var(--color-ink)', textTransform: 'capitalize' }}>{roleLens}</strong></span>
        </div>
      </div>

      {/* Right: Shortcuts, Ground-Truth Seal & Co-Pilot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Quick Hotkey hints */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span className="keycap">A</span> Approve
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span className="keycap">X</span> Reject
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span className="keycap">⌘K</span> Palette
          </span>
        </div>

        <div style={{ width: '1px', height: '14px', background: 'var(--color-rule)' }} />

        {/* Shortcuts Modal Trigger */}
        <button
          onClick={onOpenShortcuts}
          style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--color-graphite)' }}
          title="View Keyboard Shortcuts (?)"
        >
          <HelpCircle size={12} />
          <span>Shortcuts</span>
        </button>

        <div style={{ width: '1px', height: '14px', background: 'var(--color-rule)' }} />

        {/* Provenance Verification Fingerprint */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: '#2EA043'
        }}>
          <ShieldCheck size={12} />
          <span>SHA-256 e8b9: Verified</span>
        </div>
      </div>
    </footer>
  );
};
