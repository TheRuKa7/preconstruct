import React, { useState } from 'react';
import type { MarketMode } from '../types';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  Award, 
  Coins, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  Scale,
  TrendingUp,
  Search,
  Lock
} from 'lucide-react';

interface CompanyVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  market: MarketMode;
}

export const CompanyVaultModal: React.FC<CompanyVaultModalProps> = ({
  isOpen,
  onClose,
  market
}) => {
  const [activeTab, setActiveTab] = useState<'credentials' | 'experience' | 'solvency' | 'rates' | 'winloss'>('credentials');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const isUS = market === 'US';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(25, 24, 22, 0.55)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '880px',
        maxHeight: '90vh',
        background: 'var(--color-sheet-elevated)',
        border: '1px solid var(--color-rule)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-float)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-rule)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--color-sheet)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} color="#0D9488" />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)' }}>
                Enterprise Company Vault & Ground-Truth Knowledge Base
              </h2>
              <span className="provenance-pill measured" style={{ fontSize: '10px' }}>
                <ShieldCheck size={11} /> 100% Audited
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-graphite)', marginTop: '2px' }}>
              Central repository of audited corporate financials, project track records, banker limits, and standard engineering rate books.
            </p>
          </div>

          <button
            onClick={onClose}
            className="btn-tertiary"
            style={{ padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--color-graphite)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid var(--color-rule)',
          background: 'var(--color-paper)',
          padding: '0 16px',
          gap: '4px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'credentials', label: 'Corporate & Statutory', icon: <FileText size={13} /> },
            { id: 'experience', label: 'Past Track Record', icon: <Briefcase size={13} /> },
            { id: 'solvency', label: 'Solvency & Bonding', icon: <Coins size={13} /> },
            { id: 'rates', label: 'Rate Lake & Rules', icon: <BookOpen size={13} /> },
            { id: 'winloss', label: 'Historical Win/Loss', icon: <TrendingUp size={13} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 12px',
                fontSize: '11.5px',
                fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? '#0D9488' : 'var(--color-graphite)',
                borderBottom: activeTab === tab.id ? '2px solid #0D9488' : '2px solid transparent',
                background: 'transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div style={{
          padding: '20px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {activeTab === 'credentials' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
              }}>
                <div style={{ background: 'var(--color-sheet)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Audited Turnover (FY24)</div>
                  <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
                    {isUS ? '$68.4M USD' : '₹410.50 Cr'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#22C55E', marginTop: '2px' }}>✓ CA UDIN: 24089123AAAAA4412</div>
                </div>

                <div style={{ background: 'var(--color-sheet)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Net Worth (Audited)</div>
                  <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
                    {isUS ? '$19.2M USD' : '₹118.20 Cr'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#22C55E', marginTop: '2px' }}>✓ Positive Reserves (Zero NPA)</div>
                </div>

                <div style={{ background: 'var(--color-sheet)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Corporate Entity Type</div>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-ink)', marginTop: '4px' }}>
                    {isUS ? 'Delaware C-Corp / MBE' : 'Pvt Ltd (MCA Class 1)'}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-graphite)', marginTop: '4px' }}>
                    {isUS ? 'CAGE: 7X4D1 · UEI: M7B8N9KL4J2' : 'CIN: U45200DL2018PTC334190'}
                  </div>
                </div>
              </div>

              {/* Statutory Registrations Table */}
              <div style={{ border: '1px solid var(--color-rule)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: 'var(--color-sheet)', borderBottom: '1px solid var(--color-rule)', fontWeight: 600, fontSize: '12px' }}>
                  Statutory Registrations & Portal ID Tokens
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-rule-subtle)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600, width: '220px' }}>{isUS ? 'SAM.gov UEI & CAGE' : 'GSTIN & PAN'}</td>
                      <td className="font-mono" style={{ padding: '8px 12px' }}>{isUS ? 'UEI: M7B8N9KL4J2 / CAGE: 7X4D1' : 'GSTIN: 29AAACP1234F1Z8 / PAN: AAACP1234F'}</td>
                      <td style={{ padding: '8px 12px', color: '#22C55E' }}>Active & Verified</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-rule-subtle)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>{isUS ? 'OSHA Safety Rating' : 'EPFO & ESIC Code'}</td>
                      <td className="font-mono" style={{ padding: '8px 12px' }}>{isUS ? 'EMR 0.74 (Zero lost-time injuries)' : 'DL/CPM/1029482 & 11000982340001001'}</td>
                      <td style={{ padding: '8px 12px', color: '#22C55E' }}>100% Compliant</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>Quality & Safety ISO</td>
                      <td className="font-mono" style={{ padding: '8px 12px' }}>ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 (Valid thru 2028)</td>
                      <td style={{ padding: '8px 12px', color: '#22C55E' }}>Certified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-graphite)' }}>
                Verified past completion certificates available for 1-click PQ citation:
              </div>
              {[
                {
                  client: isUS ? 'Memorial Hermann Medical Center' : 'Apollo Hospitals Enterprise Ltd',
                  project: isUS ? 'Houston Specialty Surgical Pavilion — Turnkey HVAC' : 'Apollo Health City 450-Bed Multi-Specialty Block MEP',
                  value: isUS ? '$14.2M USD' : '₹110.40 Cr',
                  year: 'Completed 2024',
                  scope: 'Central Chiller Plant (1,800 TR), 32 Class 1000 Cleanrooms, 14,000 m² GI Ductwork',
                  ref: 'APOLLO/MEP/CC/2024/09'
                },
                {
                  client: isUS ? 'Baylor Scott & White Health' : 'Embassy TechVillage SEZ',
                  project: isUS ? 'Round Rock Clinic Central Utility Plant Expansion' : 'Block 4B Commercial IT Park — Complete HVAC Installation',
                  value: isUS ? '$9.8M USD' : '₹86.20 Cr',
                  year: 'Completed 2023',
                  scope: 'Water-Cooled Centrifugal Chillers, VRF Systems, SMACNA Medium Pressure Ducting',
                  ref: 'EMBASSY/HVAC/BLR/411'
                },
                {
                  client: isUS ? 'Texas Children’s Hospital' : 'Manipal Hospitals Bangalore',
                  project: isUS ? 'West Campus Pediatric Surgery HVAC Modernization' : 'HAL Airport Road ICU & Cleanroom Renovation',
                  value: isUS ? '$6.5M USD' : '₹42.80 Cr',
                  year: 'Completed 2022',
                  scope: 'HEPA filtration modules, negative pressure isolation suites, BMS automated control valves',
                  ref: 'MANIPAL/ENGG/CC/2022/18'
                }
              ].map((proj, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-rule)',
                    background: 'var(--color-sheet)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-ink)' }}>
                      {proj.project}
                    </span>
                    <span className="font-mono" style={{ fontWeight: 700, color: '#0D9488', fontSize: '13px' }}>
                      {proj.value}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                    Client: <strong>{proj.client}</strong> · {proj.year} · Ref: <span className="font-mono">{proj.ref}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-graphite-faint)', marginTop: '2px' }}>
                    {proj.scope}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'solvency' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'var(--color-sheet)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-rule)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Active Banker Solvency Certificate</span>
                  <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
                    {isUS ? '$25,000,000 USD (JPMorgan Chase)' : '₹65.00 Cr (State Bank of India)'}
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--color-graphite)', marginTop: '4px' }}>
                    Issued by Commercial Branch on letterhead with official seal. Valid for current fiscal year.
                  </p>
                </div>
                <span className="provenance-pill measured">Verified Valid</span>
              </div>

              <div style={{
                background: 'var(--color-sheet)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-rule)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Surety Bonding & Bank Guarantee Limits</span>
                  <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
                    {isUS ? '$50M Single / $100M Aggregate (Travelers)' : '₹120.00 Cr Non-Fund Based Facility (BG/LC)'}
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--color-graphite)', marginTop: '4px' }}>
                    Available headroom for EMD Bid Bond & Performance Bank Guarantee (PBG).
                  </p>
                </div>
                <span className="provenance-pill measured">Ready to Issue</span>
              </div>
            </div>
          )}

          {activeTab === 'rates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-graphite)' }}>
                Standard rate masters calibrated against {isUS ? 'US NECA/MCAA & RSMeans 2026' : 'CPWD DSR 2026 & Market Spot Indexes'}:
              </div>

              <div style={{ border: '1px solid var(--color-rule)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)', textAlign: 'left', color: 'var(--color-graphite)' }}>
                      <th style={{ padding: '8px 12px' }}>Material / Trade Description</th>
                      <th style={{ padding: '8px 12px' }}>Standard Specification</th>
                      <th style={{ padding: '8px 12px', textAlign: 'right' }}>Master Unit Rate</th>
                      <th style={{ padding: '8px 12px', textAlign: 'center' }}>Rule Citation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-rule-subtle)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>GI Sheet Metal 24G (0.63mm)</td>
                      <td style={{ padding: '8px 12px' }}>IS 277 / ASTM A653 G90</td>
                      <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right' }}>{isUS ? '$1.45 / lb' : '₹78.50 / kg'}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }} className="badge-code">IS 655 T1</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-rule-subtle)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>GI Sheet Metal 22G (0.80mm)</td>
                      <td style={{ padding: '8px 12px' }}>IS 277 / ASTM A653 G90</td>
                      <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right' }}>{isUS ? '$1.48 / lb' : '₹78.50 / kg'}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }} className="badge-code">IS 655 T1</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-rule-subtle)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>GI Sheet Metal 20G (1.00mm)</td>
                      <td style={{ padding: '8px 12px' }}>IS 277 / ASTM A653 G90</td>
                      <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right' }}>{isUS ? '$1.55 / lb' : '₹82.00 / kg'}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }} className="badge-code">IS 655 T1</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-rule-subtle)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>Nitrile Rubber Insulation 19mm</td>
                      <td style={{ padding: '8px 12px' }}>Class 'O' Fire Retardant</td>
                      <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right' }}>{isUS ? '$4.20 / sq ft' : '₹380.00 / m²'}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }} className="badge-code">CPWD 23.4</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>Motorized Smoke & Fire Damper</td>
                      <td style={{ padding: '8px 12px' }}>UL 555 / IS 16018 (2-Hour)</td>
                      <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right' }}>{isUS ? '$780.00 / No' : '₹14,200 / No'}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }} className="badge-code">NFPA 90A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'winloss' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                background: 'var(--color-sheet)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-rule)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>Historical Healthcare & SEZ Win Rate</span>
                  <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: '#0D9488' }}>
                    68.4% (13 of 19 Bids Awarded)
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>Average Gross Operating Margin</span>
                  <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-ink)' }}>
                    15.6% Realized
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '11.5px', color: 'var(--color-graphite)' }}>
                Key Win Intelligence:
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.5px', color: 'var(--color-graphite)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Client consistently awards bids positioned between <strong>-1.0% and -3.5%</strong> below official estimate.</li>
                <li>Competitor 'Sterling MEP' routinely bids low (-8%) but incurs arbitration claims on defect liability.</li>
                <li>Pre-Bid queries challenging 36-month DLP were approved in 80% of past health authority tenders.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--color-rule)',
          background: 'var(--color-sheet)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--color-graphite)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={12} color="#0D9488" />
            <span>Vault Data is encrypted with AES-256 and syncs directly into Submission Pro forms</span>
          </div>

          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '6px 16px', fontSize: '11.5px' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
