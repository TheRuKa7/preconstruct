import React, { useState } from 'react';
import type { ActiveTab } from '../types';
import { 
  Building2, 
  Scale, 
  Layers, 
  CheckSquare, 
  FileSpreadsheet, 
  Users, 
  Paperclip, 
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FolderGit2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface StageSidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  pendingReviewsCount: number;
  onOpenVault?: () => void;
}

interface StageItem {
  id: ActiveTab;
  stageNumber: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge?: string;
  badgeType?: 'look' | 'measured' | 'neutral' | 'critical';
  hotkey: string;
  numericKey: string;
  isCompleted?: boolean;
}

export const StageSidebar: React.FC<StageSidebarProps> = ({
  activeTab,
  setActiveTab,
  pendingReviewsCount,
  onOpenVault
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const stages: StageItem[] = [
    {
      id: 'tenders',
      stageNumber: '01',
      title: 'Tenders & PQ',
      subtitle: 'Discovery & Go/No-Go',
      icon: <Building2 size={16} />,
      badge: '3 Pass · 1 Gate',
      badgeType: 'look',
      hotkey: 'T',
      numericKey: '1',
      isCompleted: true
    },
    {
      id: 'contracts',
      stageNumber: '02',
      title: 'Contract & Risks',
      subtitle: 'Contradictions & LDs',
      icon: <Scale size={16} />,
      badge: '4 Conflicts',
      badgeType: 'critical',
      hotkey: 'C',
      numericKey: '2',
      isCompleted: true
    },
    {
      id: 'workspace',
      stageNumber: '03',
      title: '2D/3D Takeoff',
      subtitle: 'Vector CAD & Sizing',
      icon: <Layers size={16} />,
      badge: '5 Runs · 1:100',
      badgeType: 'measured',
      hotkey: 'W',
      numericKey: '3',
      isCompleted: true
    },
    {
      id: 'review',
      stageNumber: '04',
      title: 'Review Queue',
      subtitle: 'Decision Inbox (A/X)',
      icon: <CheckSquare size={16} />,
      badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} Action` : 'Cleared',
      badgeType: pendingReviewsCount > 0 ? 'look' : 'measured',
      hotkey: 'A',
      numericKey: '4',
      isCompleted: pendingReviewsCount === 0
    },
    {
      id: 'boq',
      stageNumber: '05',
      title: 'BOQ & Pricing',
      subtitle: 'CSI Div 23 Pricing',
      icon: <FileSpreadsheet size={16} />,
      badge: '₹84.5 Cr',
      badgeType: 'neutral',
      hotkey: 'B',
      numericKey: '5',
      isCompleted: true
    },
    {
      id: 'leveling',
      stageNumber: '06',
      title: 'Vendor Leveling',
      subtitle: 'Exclusions & Scope Gaps',
      icon: <Users size={16} />,
      badge: '3 Quotes',
      badgeType: 'neutral',
      hotkey: 'L',
      numericKey: '6',
      isCompleted: false
    },
    {
      id: 'submission',
      stageNumber: '07',
      title: 'Submission Pro',
      subtitle: 'Word Autofill & 144p PDF',
      icon: <Paperclip size={16} />,
      badge: 'Ready',
      badgeType: 'measured',
      hotkey: 'S',
      numericKey: '7',
      isCompleted: true
    },
    {
      id: 'overview',
      stageNumber: '08',
      title: 'Dashboard',
      subtitle: 'Portfolio Health & KPIs',
      icon: <LayoutDashboard size={16} />,
      badge: 'Live',
      badgeType: 'neutral',
      hotkey: 'O',
      numericKey: '8',
      isCompleted: false
    }
  ];

  return (
    <aside style={{
      width: isCollapsed ? '60px' : '236px',
      background: 'var(--color-sheet)',
      borderRight: '1px solid var(--color-rule)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexShrink: 0,
      transition: 'width var(--duration-fast) var(--ease-standard)',
      position: 'relative',
      zIndex: 30,
      overflow: 'hidden'
    }}>
      {/* Top Header / Pursuit Spine Status */}
      <div>
        <div style={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          padding: isCollapsed ? '0' : '0 12px 0 14px',
          borderBottom: '1px solid var(--color-rule-subtle)'
        }}>
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '10.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-graphite)'
              }}>
                Pursuit Pipeline
              </span>
              <span style={{
                fontSize: '9px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: '#0D9488',
                background: 'rgba(13, 148, 136, 0.12)',
                padding: '1px 5px',
                borderRadius: '3px'
              }}>
                8 Stages
              </span>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(prev => !prev)}
            className="btn-tertiary"
            title={isCollapsed ? "Expand Pursuit Pipeline" : "Collapse Sidebar"}
            style={{
              padding: '4px',
              borderRadius: 'var(--radius-xs)',
              color: 'var(--color-graphite)'
            }}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Readiness Progress Bar (Expanded Only) */}
        {!isCollapsed && (
          <div style={{
            padding: '8px 14px 10px',
            borderBottom: '1px solid var(--color-rule-subtle)',
            background: 'var(--color-paper)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
              <span style={{ color: 'var(--color-graphite)', fontWeight: 600 }}>Bid Readiness</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0D9488' }}>
                82% (5/8 Done)
              </span>
            </div>
            <div style={{
              height: '4px',
              background: 'var(--color-rule-subtle)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginTop: '5px'
            }}>
              <div style={{
                height: '100%',
                width: '82%',
                background: 'linear-gradient(90deg, #0D9488, #22C55E)',
                borderRadius: '2px'
              }} />
            </div>
          </div>
        )}

        {/* Stage Navigation List */}
        <nav style={{ padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {stages.map(stage => {
            const isActive = activeTab === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveTab(stage.id)}
                title={`${stage.stageNumber} ${stage.title} (${stage.subtitle}) — Key: ${stage.numericKey} or ${stage.hotkey}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isCollapsed ? '0' : '10px',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  padding: isCollapsed ? '9px 0' : '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--color-sheet-elevated)' : 'transparent',
                  color: isActive ? 'var(--color-ink)' : 'var(--color-graphite)',
                  border: isActive ? '1px solid var(--color-rule)' : '1px solid transparent',
                  boxShadow: isActive ? 'var(--shadow-subtle)' : 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background var(--duration-fast), border var(--duration-fast)'
                }}
              >
                {/* Active Indicator Strip on Left */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: '2px',
                    top: '6px',
                    bottom: '6px',
                    width: '3px',
                    borderRadius: '2px',
                    background: '#0D9488'
                  }} />
                )}

                {/* Stage Icon or Stage Number */}
                <div style={{
                  color: isActive ? '#0D9488' : 'var(--color-graphite)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  flexShrink: 0
                }}>
                  {stage.icon}
                </div>

                {/* Stage Labels (when expanded) */}
                {!isCollapsed && (
                  <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', minWidth: 0 }}>
                        <span style={{
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: isActive ? '#0D9488' : 'var(--color-graphite-faint)'
                        }}>
                          {stage.stageNumber}
                        </span>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? 'var(--color-ink)' : 'inherit',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {stage.title}
                        </span>
                      </div>

                      {stage.badge && (
                        <span style={{
                          fontSize: '9px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '3px',
                          flexShrink: 0,
                          background: stage.badgeType === 'look' ? 'rgba(217, 119, 6, 0.12)' :
                                      stage.badgeType === 'critical' ? 'rgba(220, 38, 38, 0.12)' :
                                      stage.badgeType === 'measured' ? 'rgba(46, 160, 67, 0.12)' : 'var(--color-paper)',
                          color: stage.badgeType === 'look' ? '#D97706' :
                                 stage.badgeType === 'critical' ? '#DC2626' :
                                 stage.badgeType === 'measured' ? '#2EA043' : 'var(--color-graphite)'
                        }}>
                          {stage.badge}
                        </span>
                      )}
                    </div>

                    <div style={{
                      fontSize: '10px',
                      color: 'var(--color-graphite-faint)',
                      marginTop: '1px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span>{stage.subtitle}</span>
                      <span className="font-mono" style={{ fontSize: '9px', opacity: 0.6 }}>
                        [{stage.numericKey}]
                      </span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Vault & System Verification Status */}
      <div style={{
        padding: isCollapsed ? '10px 0' : '10px 12px',
        borderTop: '1px solid var(--color-rule-subtle)',
        background: 'var(--color-paper)'
      }}>
        {/* Company Vault Link */}
        <button
          onClick={onOpenVault}
          title="Company Vault (Financials, Past Credentials, Rate Lake)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isCollapsed ? '0' : '8px',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            width: '100%',
            padding: '6px 8px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11px',
            color: 'var(--color-graphite)',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent'
          }}
        >
          <FolderGit2 size={14} color="#0D9488" />
          {!isCollapsed && (
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Company Vault</div>
              <div style={{ fontSize: '9.5px', color: 'var(--color-graphite-faint)' }}>Audited FY24 · ISO · Rates</div>
            </div>
          )}
        </button>

        {/* Verification Chip */}
        {!isCollapsed && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            marginTop: '8px',
            padding: '4px 6px',
            fontSize: '9.5px',
            color: 'var(--color-graphite)',
            fontFamily: 'var(--font-mono)'
          }}>
            <ShieldCheck size={12} color="#2EA043" />
            <span>Ground-Truth: 100% Provenance</span>
          </div>
        )}
      </div>
    </aside>
  );
};
