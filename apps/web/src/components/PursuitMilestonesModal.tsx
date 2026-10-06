import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Copy, 
  ShieldAlert, 
  FileSpreadsheet,
  Check
} from 'lucide-react';
import type { PursuitMetadata } from '../types';

interface PursuitMilestonesModalProps {
  isOpen: boolean;
  onClose: () => void;
  pursuit: PursuitMetadata;
  onNavigateToContracts?: () => void;
}

export const PursuitMilestonesModal: React.FC<PursuitMilestonesModalProps> = ({
  isOpen,
  onClose,
  pursuit,
  onNavigateToContracts
}) => {
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!isOpen) return null;

  const milestones = [
    {
      id: 'm1',
      title: 'Pre-Bid Queries Submission Cut-off',
      date: 'Oct 10, 2026 · 17:00 IST',
      daysLeft: 4,
      urgency: 'CRITICAL',
      status: 'In Progress (2 Drafted)',
      description: 'Formal RFI queries must be submitted in tender Excel format to tender-queries@mahe.manipal.edu. Portal locks strictly at 17:00 IST.',
      actionLabel: 'Inspect 2 Draft Queries',
      actionTab: 'contracts'
    },
    {
      id: 'm2',
      title: 'Pre-Bid Meeting & Site Walkthrough',
      date: 'Oct 12, 2026 · 11:00 AM IST',
      daysLeft: 6,
      urgency: 'MANDATORY',
      status: 'Scheduled',
      description: 'Hybrid format: Boardroom 3, SE Office, Manipal Campus. VC Link: https://meet.mahe.edu/prebid-hvac-0891 (Passcode: 442089)',
      hasLink: true
    },
    {
      id: 'm3',
      title: 'Corrigendum 1 / Clarifications Release',
      date: 'Oct 16, 2026 · Tentative',
      daysLeft: 10,
      urgency: 'UPCOMING',
      status: 'Awaiting Client',
      description: 'Client responses to pre-bid queries, revised drawings SLD-04, and addendum specifications will be published on eProcure portal.'
    },
    {
      id: 'm4',
      title: 'Original EMD & Stamp BG Physical Drop',
      date: 'Oct 24, 2026 · 15:00 IST',
      daysLeft: 18,
      urgency: 'STATUTORY',
      status: 'Vault Verified',
      description: 'Bank Guarantee of ₹1.69 Cr (2% of tender value) on ₹500 stamp paper must reach the Superintending Engineer office before online closing.'
    },
    {
      id: 'm5',
      title: 'Technical Bid Online Submission Cut-off',
      date: 'Oct 25, 2026 · 15:00 IST',
      daysLeft: 19,
      urgency: 'FINAL CUT-OFF',
      status: 'Assemble Pro Active',
      description: 'CPPP / GeM portal upload closes. 144-page compiled PDF, priced BOQ sheet, and DSC token signatures required.'
    },
    {
      id: 'm6',
      title: 'Technical Bid Opening',
      date: 'Oct 26, 2026 · 15:30 IST',
      daysLeft: 20,
      urgency: 'PUBLIC',
      status: 'Scheduled',
      description: 'Online opening of Envelope-1 (Technical & PQ). Envelope-2 (Price Bid) opening date announced post-PQ qualification.'
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://meet.mahe.edu/prebid-hvac-0891 (Passcode: 442089)');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

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
        zIndex: 220,
        padding: '20px'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '720px',
          maxHeight: '90vh',
          background: 'var(--color-sheet-elevated)',
          border: '1px solid var(--color-rule)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-float)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--color-rule)',
          background: 'var(--color-sheet)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#D97706" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)' }}>
                Pursuit Statutory Deadlines & Milestones
              </h3>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '4px',
                background: 'rgba(217, 119, 6, 0.15)',
                color: '#D97706',
                fontFamily: 'var(--font-mono)'
              }}>
                Strict Statutory Timelines
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-graphite)', marginTop: '3px' }}>
              {pursuit.name} · Ref: <strong style={{ color: 'var(--color-ink)' }}>{pursuit.tender_ref}</strong> · Authority: {pursuit.authority}
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '6px 8px' }}
            title="Close (Esc)"
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Body / Timeline */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Urgency Highlight Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(220, 38, 38, 0.05))',
            border: '1px solid rgba(217, 119, 6, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#D97706',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '15px'
              }}>
                4d
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)' }}>
                  Pre-Bid Queries Portal Locks in 4 Days (Oct 10, 2026)
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                  Any contractual or drawing contradiction not officially raised before Oct 10 becomes non-arbitrable under GCC Cl. 4.1.
                </div>
              </div>
            </div>

            {onNavigateToContracts && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToContracts();
                }}
                className="btn-primary"
                style={{ fontSize: '11.5px', padding: '6px 12px', background: '#D97706', whiteSpace: 'nowrap' }}
              >
                Inspect RFIs
              </button>
            )}
          </div>

          {/* Timeline Milestones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {milestones.map((m, idx) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '12px 14px',
                  background: 'var(--color-paper)',
                  border: m.urgency === 'CRITICAL' ? '1px solid rgba(217, 119, 6, 0.4)' : '1px solid var(--color-rule-subtle)',
                  borderRadius: 'var(--radius-md)',
                  position: 'relative'
                }}
              >
                {/* Step Index & Indicator */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '46px'
                }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: m.urgency === 'CRITICAL' ? '#D97706' : 
                               m.urgency === 'FINAL CUT-OFF' ? '#DC2626' : 'var(--color-sheet-elevated)',
                    border: '1px solid var(--color-rule)',
                    color: (m.urgency === 'CRITICAL' || m.urgency === 'FINAL CUT-OFF') ? '#FFFFFF' : 'var(--color-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {idx + 1}
                  </div>
                  <span style={{
                    fontSize: '9.5px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-graphite)',
                    marginTop: '4px'
                  }}>
                    {m.daysLeft}d left
                  </span>
                </div>

                {/* Milestone Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)' }}>
                        {m.title}
                      </span>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '3px',
                        background: m.urgency === 'CRITICAL' ? 'rgba(217, 119, 6, 0.15)' :
                                    m.urgency === 'FINAL CUT-OFF' ? 'rgba(220, 38, 38, 0.15)' : 'var(--color-sheet-elevated)',
                        color: m.urgency === 'CRITICAL' ? '#D97706' :
                               m.urgency === 'FINAL CUT-OFF' ? '#DC2626' : 'var(--color-graphite)'
                      }}>
                        {m.urgency}
                      </span>
                    </div>

                    <span style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {m.date}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '11.5px',
                    color: 'var(--color-graphite)',
                    margin: '5px 0 0 0',
                    lineHeight: '1.45'
                  }}>
                    {m.description}
                  </p>

                  {/* Actions / Links inside milestone */}
                  {m.hasLink && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                      <button
                        onClick={handleCopyLink}
                        className="btn-secondary"
                        style={{ fontSize: '10.5px', padding: '3px 8px', gap: '4px' }}
                      >
                        {copiedLink ? <Check size={11} color="#2EA043" /> : <Copy size={11} />}
                        <span>{copiedLink ? 'Link Copied!' : 'Copy VC Meeting Link'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--color-rule)',
          background: 'var(--color-sheet)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--color-graphite)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={13} />
            <span>Time Zone: Indian Standard Time (IST · UTC+05:30)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                alert('Pre-Bid RFI table ready for download in official CPPP format.');
              }}
              className="btn-secondary"
              style={{ fontSize: '11px', padding: '5px 10px', gap: '5px' }}
            >
              <FileSpreadsheet size={13} />
              <span>Export RFI Excel</span>
            </button>
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ fontSize: '11px', padding: '5px 14px', background: '#0D9488' }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
