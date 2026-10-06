import React, { useState, useEffect } from 'react';
import type { 
  ActiveTab, 
  DensityMode, 
  ThemeMode, 
  RoleLens,
  MarketMode,
  RoomZone, 
  DuctRun, 
  AirTerminal, 
  FireDamper, 
  EquipmentItem, 
  ReviewItem, 
  BOQItem,
  UnifiedDecision 
} from './types';
import { 
  MANIPAL_PROJECT, 
  INITIAL_ROOMS, 
  INITIAL_DUCT_RUNS, 
  INITIAL_AIR_TERMINALS, 
  INITIAL_FIRE_DAMPERS, 
  INITIAL_EQUIPMENT, 
  INITIAL_REVIEW_ITEMS, 
  INITIAL_BOQ_ITEMS,
  SAMPLE_TENDERS,
  SAMPLE_PQ_RULES,
  SAMPLE_GONOGO_FACTORS,
  SAMPLE_CONTRADICTIONS,
  SAMPLE_PREBID_QUERIES,
  SAMPLE_SYNOPSIS,
  SAMPLE_RISKS,
  SAMPLE_SUBMISSION_FORMS,
  SAMPLE_ATTACHMENTS,
  SAMPLE_SUBCONTRACTOR_BIDS,
  AUSTIN_PROJECT,
  SAMPLE_TENDERS_US,
  SAMPLE_PQ_RULES_US,
  SAMPLE_CONTRADICTIONS_US,
  SAMPLE_PREBID_QUERIES_US,
  SAMPLE_SYNOPSIS_US,
  SAMPLE_RISKS_US,
  SAMPLE_SUBMISSION_FORMS_US,
  SAMPLE_ATTACHMENTS_US,
  SAMPLE_SUBCONTRACTOR_BIDS_US,
  INITIAL_BOQ_ITEMS_US
} from './sampleData';
import { INITIAL_UNIFIED_DECISIONS, DEFAULT_PURSUIT } from './pursuitData';

import { Header } from './components/Header';
import { StageSidebar } from './components/StageSidebar';
import { StatusBar } from './components/StatusBar';
import { IntakeDropZone } from './components/IntakeDropZone';
import { ReadingPassOverlay } from './components/ReadingPassOverlay';
import { ProjectOverview } from './components/ProjectOverview';
import { SheetWorkspace } from './components/SheetWorkspace';
import { DecisionInbox } from './components/DecisionInbox';
import { MeasuredBOQ } from './components/MeasuredBOQ';
import { CommandBar } from './components/CommandBar';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { TenderHuntAndPQ } from './components/TenderHuntAndPQ';
import { ContractIntelligence } from './components/ContractIntelligence';
import { SubmissionPro } from './components/SubmissionPro';
import { VendorLeveling } from './components/VendorLeveling';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { PursuitMilestonesModal } from './components/PursuitMilestonesModal';
import { PursuitStageBanner } from './components/PursuitStageBanner';
import { ExportModal } from './components/ExportModal';
import { CompanyVaultModal } from './components/CompanyVaultModal';

export const App: React.FC = () => {
  // App State - Default to Tenders & PQ for end-to-end audit walkthrough
  const [activeTab, setActiveTab] = useState<ActiveTab>('tenders');
  const [density, setDensity] = useState<DensityMode>('comfortable');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [roleLens, setRoleLens] = useState<RoleLens>('all');
  const [market, setMarket] = useState<MarketMode>('IN');
  const [showIntake, setShowIntake] = useState(false);
  
  // Data State - Blueprint Takeoff & Unified Decisions
  const [rooms] = useState<RoomZone[]>(INITIAL_ROOMS);
  const [ductRuns] = useState<DuctRun[]>(INITIAL_DUCT_RUNS);
  const [terminals] = useState<AirTerminal[]>(INITIAL_AIR_TERMINALS);
  const [dampers] = useState<FireDamper[]>(INITIAL_FIRE_DAMPERS);
  const [equipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>(INITIAL_REVIEW_ITEMS);
  const [unifiedDecisions, setUnifiedDecisions] = useState<UnifiedDecision[]>(INITIAL_UNIFIED_DECISIONS);
  const [boqItemsIN, setBoqItemsIN] = useState<BOQItem[]>(INITIAL_BOQ_ITEMS);
  const [boqItemsUS, setBoqItemsUS] = useState<BOQItem[]>(INITIAL_BOQ_ITEMS_US);
  const [goNoGoFactors] = useState(SAMPLE_GONOGO_FACTORS);

  // Dynamic Market-Aware Data Selection
  const isUS = market === 'US';
  const activeProject = isUS ? AUSTIN_PROJECT : MANIPAL_PROJECT;
  const activeTenders = isUS ? SAMPLE_TENDERS_US : SAMPLE_TENDERS;
  const activePqRules = isUS ? SAMPLE_PQ_RULES_US : SAMPLE_PQ_RULES;
  const activeContradictions = isUS ? SAMPLE_CONTRADICTIONS_US : SAMPLE_CONTRADICTIONS;
  const activePreBidQueries = isUS ? SAMPLE_PREBID_QUERIES_US : SAMPLE_PREBID_QUERIES;
  const activeSynopsis = isUS ? SAMPLE_SYNOPSIS_US : SAMPLE_SYNOPSIS;
  const activeRisks = isUS ? SAMPLE_RISKS_US : SAMPLE_RISKS;
  const activeSubmissionForms = isUS ? SAMPLE_SUBMISSION_FORMS_US : SAMPLE_SUBMISSION_FORMS;
  const activeAttachments = isUS ? SAMPLE_ATTACHMENTS_US : SAMPLE_ATTACHMENTS;
  const activeSubcontractorBids = isUS ? SAMPLE_SUBCONTRACTOR_BIDS_US : SAMPLE_SUBCONTRACTOR_BIDS;
  const currentBoqItems = isUS ? boqItemsUS : boqItemsIN;

  // Modals & Overlays
  const [isReadingPass, setIsReadingPass] = useState(false);
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCompanyVaultOpen, setIsCompanyVaultOpen] = useState(false);

  // Sync density & theme with DOM attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-density', density);
    document.body.setAttribute('data-density', density);
  }, [density]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsCommandBarOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsCommandBarOpen(false);
        setIsShortcutsOpen(false);
        setIsAiAssistantOpen(false);
        setIsMilestonesOpen(false);
        setIsExportModalOpen(false);
        setIsCompanyVaultOpen(false);
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setDensity(prev => prev === 'comfortable' ? 'compact' : 'comfortable');
      } else if (e.key === '1' || e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setShowIntake(false);
        setActiveTab('tenders');
      } else if (e.key === '2' || e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setShowIntake(false);
        setActiveTab('contracts');
      } else if (e.key === '3' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        setShowIntake(false);
        setActiveTab('workspace');
      } else if (e.key === '4' || ((e.key === 'a' || e.key === 'A') && activeTab !== 'review')) {
        e.preventDefault();
        setShowIntake(false);
        setActiveTab('review');
      } else if (e.key === '5' || e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        setShowIntake(false);
        setActiveTab('boq');
      } else if (e.key === '6' || e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        setShowIntake(false);
        setActiveTab('leveling');
      } else if (e.key === '7' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setShowIntake(false);
        setActiveTab('submission');
      } else if (e.key === '8' || e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        setShowIntake(false);
        setActiveTab('overview');
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeTab]);

  // Unified Decision & Review Handlers
  const handleApproveReview = (id: string) => {
    setUnifiedDecisions(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'approved' } : item
    ));
    setReviewItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'approved' } : item
    ));

    // Propagate to BOQ: find decision impact
    const target = unifiedDecisions.find(d => d.id === id);
    if (target?.impacts?.affects_boq_code) {
      setBoqItemsIN(prev => prev.map(b => 
        b.csi_code === target.impacts.affects_boq_code ? { ...b, provenance: 'MEASURED' } : b
      ));
      setBoqItemsUS(prev => prev.map(b => 
        b.csi_code === target.impacts.affects_boq_code ? { ...b, provenance: 'MEASURED' } : b
      ));
    }
  };

  const handleRejectReview = (id: string) => {
    setUnifiedDecisions(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'rejected' } : item
    ));
    setReviewItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'rejected' } : item
    ));
  };

  const handleEditReview = (id: string, newVal: string) => {
    setUnifiedDecisions(prev => prev.map(item => 
      item.id === id ? { ...item, candidate_value: newVal, status: 'edited' } : item
    ));
    setReviewItems(prev => prev.map(item => 
      item.id === id ? { ...item, candidate_value: newVal, status: 'edited' } : item
    ));
  };

  const handleApproveAllReviews = () => {
    setUnifiedDecisions(prev => prev.map(item => ({ ...item, status: 'approved' })));
    setReviewItems(prev => prev.map(item => ({ ...item, status: 'approved' })));
    setBoqItemsIN(prev => prev.map(b => ({ ...b, provenance: 'MEASURED' })));
    setBoqItemsUS(prev => prev.map(b => ({ ...b, provenance: 'MEASURED' })));
  };

  const handleLoadSample = () => {
    setIsReadingPass(true);
  };

  const handleCustomUpload = (_fileName: string) => {
    setIsReadingPass(true);
  };

  const pendingReviewsCount = unifiedDecisions.filter(i => i.status === 'pending').length;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-paper)',
      color: 'var(--color-ink)'
    }}>
      {/* Top Header with Pursuit Clock & Role Lens */}
      <Header
        activeTab={activeTab}
        setActiveTab={(t) => {
          setShowIntake(false);
          setActiveTab(t);
        }}
        pendingReviewsCount={pendingReviewsCount}
        density={density}
        setDensity={setDensity}
        theme={theme}
        setTheme={setTheme}
        roleLens={roleLens}
        setRoleLens={setRoleLens}
        market={market}
        setMarket={setMarket}
        onOpenCommandBar={() => setIsCommandBarOpen(true)}
        onOpenMilestones={() => setIsMilestonesOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onToggleAiAssistant={() => setIsAiAssistantOpen(prev => !prev)}
        projectName={activeProject.name}
        sheetNumber={`${activeProject.sheet_number} ${activeProject.revision}`}
      />

      {/* Center Layout: Pursuit Stage Rail + Main Workspace */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        <StageSidebar
          activeTab={activeTab}
          setActiveTab={(t) => {
            setShowIntake(false);
            setActiveTab(t);
          }}
          pendingReviewsCount={pendingReviewsCount}
          onOpenVault={() => setIsCompanyVaultOpen(true)}
        />

        {/* Main Content Area */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {/* Contextual E2E Stage Navigation & Breadcrumb Banner */}
          {!showIntake && (
            <PursuitStageBanner
              activeTab={activeTab}
              onNavigateTab={(t) => {
                setShowIntake(false);
                setActiveTab(t);
              }}
              roleLens={roleLens}
              market={market}
              pendingReviewsCount={pendingReviewsCount}
            />
          )}

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
            {showIntake ? (
              <IntakeDropZone
                onLoadSample={handleLoadSample}
                onCustomUpload={handleCustomUpload}
                isProcessing={isReadingPass}
              />
            ) : (
              <>
                {/* PILLAR 1: TENDERS HUNTING & PRE-QUALIFICATION */}
                {activeTab === 'tenders' && (
                  <TenderHuntAndPQ
                    tenders={activeTenders}
                    pqRules={activePqRules}
                    goNoGoFactors={goNoGoFactors}
                    market={market}
                    onProceedToContracts={() => setActiveTab('contracts')}
                    onProceedToWorkspace={() => setActiveTab('workspace')}
                  />
                )}

                {/* PILLAR 2: CONTRACT INTELLIGENCE, CONTRADICTIONS, RFIs & RISK HEATMAP */}
                {activeTab === 'contracts' && (
                  <ContractIntelligence
                    contradictions={activeContradictions}
                    preBidQueries={activePreBidQueries}
                    synopsis={activeSynopsis}
                    risks={activeRisks}
                    contractValueCr={isUS ? 10.85 : 84.50}
                    roleLens={roleLens}
                    market={market}
                    onProceedToTakeoff={() => setActiveTab('workspace')}
                    onProceedToSubmission={() => setActiveTab('submission')}
                  />
                )}

                {/* PILLAR 3: 2D & 3D TAKEOFF WORKSPACE */}
                {activeTab === 'workspace' && (
                  <SheetWorkspace
                    rooms={rooms}
                    ductRuns={ductRuns}
                    terminals={terminals}
                    dampers={dampers}
                    equipment={equipment}
                    density={density}
                    market={market}
                    onOpenReviewItem={(_tag) => {
                      setActiveTab('review');
                    }}
                  />
                )}

                {/* PILLAR 4: MEASURED BOQ & PRICING GRID */}
                {activeTab === 'boq' && (
                  <MeasuredBOQ
                    items={currentBoqItems}
                    market={market}
                  />
                )}

                {/* PILLAR 5: BID SUBMISSION PRO & KNOWLEDGE BASE AUTO-FILL */}
                {activeTab === 'submission' && (
                  <SubmissionPro
                    forms={activeSubmissionForms}
                    attachments={activeAttachments}
                    market={market}
                    onProceedToLeveling={() => setActiveTab('leveling')}
                  />
                )}

                {/* PILLAR 6: SUBCONTRACTOR SOURCING & BID LEVELING */}
                {activeTab === 'leveling' && (
                  <VendorLeveling
                    quotes={activeSubcontractorBids}
                    market={market}
                  />
                )}

                {/* DASHBOARD OVERVIEW */}
                {activeTab === 'overview' && (
                  <ProjectOverview
                    onOpenWorkspace={() => setActiveTab('workspace')}
                    onOpenReview={() => setActiveTab('review')}
                    ductRuns={ductRuns}
                    terminals={terminals}
                    dampers={dampers}
                    pendingReviewsCount={pendingReviewsCount}
                  />
                )}

                {/* UNIFIED DECISION INBOX (STAGE 4: TRIAGE & CROSS-MODULE SYNC) */}
                {activeTab === 'review' && (
                  <DecisionInbox
                    decisions={unifiedDecisions}
                    onApprove={handleApproveReview}
                    onReject={handleRejectReview}
                    onEdit={handleEditReview}
                    onApproveAll={handleApproveAllReviews}
                    onProceedToBOQ={() => setActiveTab('boq')}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Contextual Status Bar */}
      <StatusBar
        activeTab={activeTab}
        roleLens={roleLens}
        market={market}
        onOpenCommandBar={() => setIsCommandBarOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onToggleAi={() => setIsAiAssistantOpen(prev => !prev)}
      />

      {/* AI Co-Pilot Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onNavigateTab={(tab) => {
          setShowIntake(false);
          setActiveTab(tab);
        }}
      />

      {/* Reading Pass Live Scanning Animation Overlay */}
      {isReadingPass && (
        <ReadingPassOverlay
          onComplete={() => {
            setIsReadingPass(false);
            setShowIntake(false);
            setActiveTab('tenders');
          }}
          sheetTitle={`${MANIPAL_PROJECT.sheet_title} (${MANIPAL_PROJECT.sheet_number})`}
        />
      )}

      {/* Quick Command Bar (Ctrl+K) */}
      <CommandBar
        isOpen={isCommandBarOpen}
        onClose={() => setIsCommandBarOpen(false)}
        onNavigate={(tab) => {
          setShowIntake(false);
          setActiveTab(tab);
        }}
        onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        onToggleDensity={() => setDensity(prev => prev === 'comfortable' ? 'compact' : 'comfortable')}
      />

      {/* Keyboard Shortcuts Cheat Sheet (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Pursuit Statutory Deadlines & Milestones Modal */}
      <PursuitMilestonesModal
        isOpen={isMilestonesOpen}
        onClose={() => setIsMilestonesOpen(false)}
        pursuit={DEFAULT_PURSUIT}
        onNavigateToContracts={() => {
          setShowIntake(false);
          setActiveTab('contracts');
        }}
      />

      {/* Master Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        market={market}
        boqItems={currentBoqItems}
        projectName={activeProject.name}
      />

      {/* Enterprise Company Vault Modal */}
      <CompanyVaultModal
        isOpen={isCompanyVaultOpen}
        onClose={() => setIsCompanyVaultOpen(false)}
        market={market}
      />
    </div>
  );
};

export default App;
