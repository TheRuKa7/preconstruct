import React from 'react';
import type { ActiveTab, RoleLens, MarketMode } from '../types';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldAlert, 
  Layers, 
  CheckSquare, 
  FileSpreadsheet, 
  Users, 
  Paperclip, 
  LayoutDashboard,
  Building2,
  Scale
} from 'lucide-react';

interface PursuitStageBannerProps {
  activeTab: ActiveTab;
  onNavigateTab: (tab: ActiveTab) => void;
  roleLens?: RoleLens;
  market?: MarketMode;
  pendingReviewsCount?: number;
}

interface StageMeta {
  number: string;
  title: string;
  objective: string;
  kpi: string;
  nextTab: ActiveTab | null;
  nextTitle: string | null;
  prevTab: ActiveTab | null;
  prevTitle: string | null;
}

const STAGE_META_MAP: Record<ActiveTab, StageMeta> = {
  tenders: {
    number: '01',
    title: 'Discover & Pre-Qualification',
    objective: 'Evaluate tender eligibility, statutory showstoppers, and Go/No-Go scorecard',
    kpi: '3 Passed Gates · 1 DLP Flagged',
    nextTab: 'contracts',
    nextTitle: '02 Contract & Risks',
    prevTab: null,
    prevTitle: null
  },
  contracts: {
    number: '02',
    title: 'Contract Intelligence & RFIs',
    objective: 'Detect drawing vs spec contradictions, simulate LD exposure, and generate Pre-Bid RFIs',
    kpi: '4 Contradictions · 4d to RFI Cut-off',
    nextTab: 'workspace',
    nextTitle: '03 2D/3D Takeoff',
    prevTab: 'tenders',
    prevTitle: '01 Tenders & PQ'
  },
  workspace: {
    number: '03',
    title: '2D/3D Vector Takeoff',
    objective: 'Auto-measure HVAC duct runs, terminal diffusers, and fire dampers with parametric scaling',
    kpi: '5 Duct Runs · 1:100 Scale Verified',
    nextTab: 'review',
    nextTitle: '04 Review Queue',
    prevTab: 'contracts',
    prevTitle: '02 Contract & Risks'
  },
  review: {
    number: '04',
    title: 'Unified Decision Inbox',
    objective: 'Rapid keyboard triage (A/E/X) across quantities, contradictions, PQ gates, and vendor gaps',
    kpi: '5 Cross-Module Actions',
    nextTab: 'boq',
    nextTitle: '05 BOQ & Pricing',
    prevTab: 'workspace',
    prevTitle: '03 2D/3D Takeoff'
  },
  boq: {
    number: '05',
    title: 'BOQ & CSI Div 23 Pricing',
    objective: 'Synchronize verified takeoff quantities with client pricing schedules and rate libraries',
    kpi: '₹84.50 Cr Total Bid · 4 Line Items',
    nextTab: 'leveling',
    nextTitle: '06 Vendor Leveling',
    prevTab: 'review',
    prevTitle: '04 Review Queue'
  },
  leveling: {
    number: '06',
    title: 'Vendor Quote Leveling',
    objective: 'Standardize subcontractor quotes side-by-side and calculate true landed costs with scope gaps',
    kpi: '3 Subcontractors · Apex vs Comfort',
    nextTab: 'submission',
    nextTitle: '07 Submission Pro',
    prevTab: 'boq',
    prevTitle: '05 BOQ & Pricing'
  },
  submission: {
    number: '07',
    title: 'Statutory Submission Pro',
    objective: 'Auto-populate Annexure forms from Company Vault and compile consolidated 144p bid package',
    kpi: '4 Forms Complete · 6 Attachments Matched',
    nextTab: 'overview',
    nextTitle: '08 Dashboard',
    prevTab: 'leveling',
    prevTitle: '06 Vendor Leveling'
  },
  overview: {
    number: '08',
    title: 'Portfolio Dashboard & KPIs',
    objective: 'Review overall pursuit health, win probability, margin sensitivity, and corporate metrics',
    kpi: '82% Bid Readiness · ₹84.5 Cr',
    nextTab: null,
    nextTitle: null,
    prevTab: 'submission',
    prevTitle: '07 Submission Pro'
  }
};

export const PursuitStageBanner: React.FC<PursuitStageBannerProps> = ({
  activeTab,
  onNavigateTab,
  roleLens = 'all',
  market = 'IN',
  pendingReviewsCount = 0
}) => {
  const currentMeta = {
    ...STAGE_META_MAP[activeTab] || STAGE_META_MAP.tenders,
    kpi: activeTab === 'boq' 
      ? (market === 'US' ? '$10.85M Total Bid · CSI Div 23' : '₹84.50 Cr Total Bid · 4 Line Items')
      : activeTab === 'leveling'
      ? (market === 'US' ? '3 Subcontractors · McKinstry vs Southland' : '3 Subcontractors · Apex vs Comfort')
      : activeTab === 'submission'
      ? (market === 'US' ? 'SF-1442 & AIA A305 · 100% Sealed' : '4 Forms Complete · 6 Attachments Matched')
      : activeTab === 'review'
      ? `${pendingReviewsCount} Cross-Module Actions`
      : (STAGE_META_MAP[activeTab] || STAGE_META_MAP.tenders).kpi
  };

  const roleLensDescriptions: Record<RoleLens, string | null> = {
    all: null,
    legal: 'Legal & Counsel Filter: Highlighting GCC/SCC contradictions, DLP liability, and dispute arbitration clauses.',
    commercial: 'Commercial Lead Filter: Focusing on BOQ item rates, payment milestones, subcontractor margins, and cash flow.',
    technical: 'Technical Scope Filter: Highlighting vector CAD dimensions, equipment CFM, and engineering inconsistencies.',
    executive: 'Executive 1-Pager Filter: Displaying high-level risk exposure, Go/No-Go probability, and strategic summaries.'
  };

  const lensDescription = roleLensDescriptions[roleLens];

  return (
    <div style={{
      background: 'var(--color-sheet)',
      borderBottom: '1px solid var(--color-rule)',
      padding: '7px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      fontSize: '12px',
      flexShrink: 0,
      zIndex: 20,
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      {/* Left: Stage Index, Title & Objective */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flexShrink: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span style={{
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'var(--color-mocha)',
            color: '#FFFFFF',
            letterSpacing: '0.04em'
          }}>
            STAGE {currentMeta.number} / 08
          </span>
          <span style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--color-ink)', whiteSpace: 'nowrap' }}>
            {currentMeta.title}
          </span>
        </div>

        <div style={{ width: '1px', height: '14px', background: 'var(--color-rule)', flexShrink: 0 }} />

        <span style={{
          fontSize: '11px',
          color: 'var(--color-graphite)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '440px',
          minWidth: 0,
          flexShrink: 1
        }}>
          {currentMeta.objective}
        </span>

        {/* Role Lens Active Indicator Chip */}
        {lensDescription && (
          <span style={{
            fontSize: '10px',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '12px',
            background: 'rgba(13, 148, 136, 0.12)',
            color: '#0D9488',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={11} />
            <span style={{ textTransform: 'capitalize' }}>{roleLens} Lens Active</span>
          </span>
        )}
      </div>

      {/* Right: Stage KPI & Sequential Progression Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <span style={{
          fontSize: '10.5px',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--color-graphite)',
          background: 'var(--color-paper)',
          padding: '2px 7px',
          borderRadius: '3px',
          border: '1px solid var(--color-rule-subtle)'
        }}>
          {currentMeta.kpi}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {currentMeta.prevTab && (
            <button
              onClick={() => onNavigateTab(currentMeta.prevTab!)}
              className="btn-secondary"
              style={{
                fontSize: '11px',
                padding: '3px 8px',
                gap: '4px',
                color: 'var(--color-graphite)'
              }}
              title={`Go back to ${currentMeta.prevTitle}`}
            >
              <ArrowLeft size={11} />
              <span>Prev</span>
            </button>
          )}

          {currentMeta.nextTab && (
            <button
              onClick={() => onNavigateTab(currentMeta.nextTab!)}
              className="btn-primary"
              style={{
                fontSize: '11px',
                padding: '3px 10px',
                gap: '5px',
                background: '#0D9488'
              }}
              title={`Advance to ${currentMeta.nextTitle}`}
            >
              <span>Next: {currentMeta.nextTitle}</span>
              <ArrowRight size={11} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
