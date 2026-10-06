import React, { useState } from 'react';
import type { ActiveTab, DensityMode, ThemeMode, RoleLens, MarketMode } from '../types';
import { 
  Sun, 
  Moon, 
  Maximize2, 
  Minimize2, 
  Search,
  FileCheck,
  Sparkles,
  Clock,
  ChevronDown,
  Globe,
  SlidersHorizontal
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  pendingReviewsCount: number;
  density: DensityMode;
  setDensity: (d: DensityMode | ((prev: DensityMode) => DensityMode)) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode | ((prev: ThemeMode) => ThemeMode)) => void;
  onOpenCommandBar: () => void;
  onOpenExport: () => void;
  onToggleAiAssistant?: () => void;
  onOpenMilestones?: () => void;
  projectName: string;
  sheetNumber: string;
  roleLens?: RoleLens;
  setRoleLens?: (lens: RoleLens) => void;
  market?: MarketMode;
  setMarket?: (m: MarketMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  pendingReviewsCount,
  density,
  setDensity,
  theme,
  setTheme,
  onOpenCommandBar,
  onOpenExport,
  onToggleAiAssistant,
  onOpenMilestones,
  projectName,
  sheetNumber,
  roleLens = 'all',
  setRoleLens,
  market = 'IN',
  setMarket
}) => {
  const [isLensDropdownOpen, setIsLensDropdownOpen] = useState(false);

  const roleLensOptions: { id: RoleLens; label: string; icon: string }[] = [
    { id: 'all', label: 'All Disciplines', icon: '🌐' },
    { id: 'legal', label: 'Legal & Contracts', icon: '⚖️' },
    { id: 'commercial', label: 'Commercial Lead', icon: '💼' },
    { id: 'technical', label: 'Technical Scope', icon: '⚙️' },
    { id: 'executive', label: 'Executive (1-Pager)', icon: '📊' }
  ];

  const currentLensMeta = roleLensOptions.find(o => o.id === roleLens) || roleLensOptions[0];

  return (
    <header style={{
      height: '52px',
      background: 'var(--color-sheet)',
      borderBottom: '1px solid var(--color-rule)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 14px',
      gap: '10px',
      flexShrink: 0,
      zIndex: 50,
      position: 'relative',
      boxSizing: 'border-box',
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      {/* 1. LEFT ZONE: Brand Mark & Fluid Project Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flexShrink: 1 }}>
        {/* Brand Mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: 'var(--radius-sm)',
            background: '#0D9488',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '14px',
            letterSpacing: '-0.04em',
            boxShadow: '0 1px 3px rgba(13, 148, 136, 0.3)'
          }}>
            P
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontWeight: 800, fontSize: '12.5px', letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>
              PRECONSTRUCT
            </span>
            <span style={{
              fontSize: '9px',
              fontWeight: 700,
              padding: '1px 4px',
              borderRadius: '3px',
              background: 'rgba(13, 148, 136, 0.12)',
              color: '#0D9488',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Vanik
            </span>
          </div>
        </div>

        <div style={{ width: '1px', height: '18px', background: 'var(--color-rule)', flexShrink: 0 }} />

        {/* Project Breadcrumb & Tender Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            minWidth: 0,
            maxWidth: '220px'
          }}>
            <span style={{
              fontWeight: 600,
              fontSize: '12px',
              color: 'var(--color-ink)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }} title={projectName}>
              {projectName}
            </span>
            <span style={{ color: 'var(--color-graphite-faint)', fontSize: '10px', flexShrink: 0 }}>/</span>
            <span className="font-mono" style={{
              fontSize: '11px',
              color: 'var(--color-graphite)',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              {sheetNumber}
            </span>
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '9.5px',
            fontWeight: 600,
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'var(--color-paper)',
            border: '1px solid var(--color-rule-subtle)',
            color: 'var(--color-graphite)',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E' }} />
            {market === 'IN' ? '₹84.5 Cr · 5 Vols' : '$10.85M · Div 23'}
          </span>
        </div>
      </div>

      {/* 2. CENTER ZONE: Interactive Pursuit Urgency & Milestone Clock */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <button
          onClick={onOpenMilestones}
          className="hover-card"
          title="Click to view statutory pre-bid query deadlines and portal timestamps"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.09), rgba(220, 38, 38, 0.05))',
            border: '1px solid rgba(217, 119, 6, 0.35)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'all var(--duration-fast) var(--ease-standard)'
          }}
        >
          <Clock size={12} color="#D97706" />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#D97706', fontWeight: 700 }}>
              ⏱ Queries Due: <strong>4d left</strong>
            </span>
            <span style={{ color: 'var(--color-rule)', fontWeight: 300 }}>|</span>
            <span style={{ color: 'var(--color-graphite)', fontWeight: 600 }}>
              Bid Due: <strong>19d</strong>
            </span>
          </div>

          <span style={{
            fontSize: '8.5px',
            fontWeight: 700,
            padding: '1px 4px',
            borderRadius: '3px',
            background: '#D97706',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Milestones
          </span>
        </button>
      </div>

      {/* 3. RIGHT ZONE: Market Switcher, Role Lens Dropdown & Workspace Utilities */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* Real-World Market Mode Toggle (India vs US) */}
        {setMarket && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--color-paper)',
            borderRadius: 'var(--radius-sm)',
            padding: '2px',
            border: '1px solid var(--color-rule-subtle)'
          }}>
            <button
              onClick={() => setMarket('IN')}
              title="Switch to Indian Market: INR (₹), IS 655:2018 duct standards, CPPP/GeM terms"
              style={{
                padding: '3px 6px',
                fontSize: '10px',
                fontWeight: market === 'IN' ? 700 : 500,
                borderRadius: 'var(--radius-xs)',
                background: market === 'IN' ? 'var(--color-sheet-elevated)' : 'transparent',
                color: market === 'IN' ? '#0D9488' : 'var(--color-graphite)',
                boxShadow: market === 'IN' ? 'var(--shadow-subtle)' : 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <span>🇮🇳</span>
              <span>IN (₹)</span>
            </button>
            <button
              onClick={() => setMarket('US')}
              title="Switch to US Market: USD ($), SMACNA 2016 duct standards, CSI MasterFormat, SAM.gov"
              style={{
                padding: '3px 6px',
                fontSize: '10px',
                fontWeight: market === 'US' ? 700 : 500,
                borderRadius: 'var(--radius-xs)',
                background: market === 'US' ? 'var(--color-sheet-elevated)' : 'transparent',
                color: market === 'US' ? '#0D9488' : 'var(--color-graphite)',
                boxShadow: market === 'US' ? 'var(--shadow-subtle)' : 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <span>🇺🇸</span>
              <span>US ($)</span>
            </button>
          </div>
        )}

        {/* Compact Role Lens Switcher */}
        {setRoleLens && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsLensDropdownOpen(prev => !prev)}
              className="btn-secondary"
              title={`Active discipline lens: ${currentLensMeta.label}`}
              style={{
                padding: '4px 8px',
                fontSize: '10.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600,
                color: roleLens === 'all' ? 'var(--color-graphite)' : '#0D9488'
              }}
            >
              <span>{currentLensMeta.icon}</span>
              <span style={{ maxWidth: '85px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentLensMeta.label.split(' ')[0]}
              </span>
              <ChevronDown size={11} />
            </button>

            {/* Dropdown Menu */}
            {isLensDropdownOpen && (
              <div
                onClick={() => setIsLensDropdownOpen(false)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  background: 'var(--color-sheet-elevated)',
                  border: '1px solid var(--color-rule)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-float)',
                  padding: '4px',
                  zIndex: 100,
                  width: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                {roleLensOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setRoleLens(opt.id);
                      setIsLensDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '6px 8px',
                      fontSize: '11px',
                      borderRadius: 'var(--radius-xs)',
                      background: roleLens === opt.id ? 'var(--color-mocha-tint)' : 'transparent',
                      color: roleLens === opt.id ? '#0D9488' : 'var(--color-ink)',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontWeight: roleLens === opt.id ? 700 : 500
                    }}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Hidden native select for accessibility and automated test harness */}
            <select
              value={roleLens}
              onChange={(e) => setRoleLens(e.target.value as RoleLens)}
              aria-label="Role lens filter"
              style={{
                position: 'absolute',
                opacity: 0,
                pointerEvents: 'none',
                width: '1px',
                height: '1px'
              }}
            >
              <option value="all">All Disciplines</option>
              <option value="legal">Legal & Contracts</option>
              <option value="commercial">Commercial Lead</option>
              <option value="technical">Technical Scope</option>
              <option value="executive">Executive (1-Pager)</option>
            </select>
          </div>
        )}

        {/* AI Co-Pilot Button */}
        {onToggleAiAssistant && (
          <button
            onClick={onToggleAiAssistant}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 9px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #0D9488, #115E59)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 1px 6px rgba(13, 148, 136, 0.25)',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={11} />
            <span>AI Co-Pilot</span>
          </button>
        )}

        {/* Command Bar Trigger */}
        <button
          onClick={onOpenCommandBar}
          className="btn-secondary"
          title="Quick command bar (Ctrl+K)"
          style={{ padding: '5px 7px', color: 'var(--color-graphite)' }}
        >
          <Search size={12} />
          <span style={{ fontSize: '10px', display: 'flex', alignItems: 'center' }}>
            <span className="keycap">⌘K</span>
          </span>
        </button>

        {/* Density Mode Switcher */}
        <button
          onClick={() => setDensity(prev => prev === 'comfortable' ? 'compact' : 'comfortable')}
          className="btn-secondary"
          title={`Switch density: Currently ${density} (Key: D)`}
          style={{ padding: '5px 7px' }}
        >
          {density === 'comfortable' ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
        </button>

        {/* Theme Mode Switcher */}
        <button
          onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          className="btn-secondary"
          title="Toggle Light / Dark mode"
          style={{ padding: '5px 7px' }}
        >
          {theme === 'light' ? <Moon size={12} /> : <Sun size={12} />}
        </button>

        {/* Export BOQ Button */}
        <button
          onClick={onOpenExport}
          className="btn-primary"
          style={{ fontSize: '11px', padding: '5px 10px', background: '#0D9488', whiteSpace: 'nowrap' }}
        >
          <FileCheck size={12} />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
