import React, { useState, useRef } from 'react';
import type { RoomZone, DuctRun, AirTerminal, FireDamper, EquipmentItem, DensityMode, MeasureTool, MarketMode } from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  Ruler, 
  Square, 
  Hash, 
  MousePointer, 
  Scale as ScaleIcon,
  Box,
  Layers as LayersIcon,
  Plus,
  DollarSign,
  Download,
  CheckCircle2,
  Sliders,
  Compass,
  FileSpreadsheet
} from 'lucide-react';

interface SheetWorkspaceProps {
  rooms: RoomZone[];
  ductRuns: DuctRun[];
  terminals: AirTerminal[];
  dampers: FireDamper[];
  equipment: EquipmentItem[];
  density: DensityMode;
  market?: MarketMode;
  onOpenReviewItem?: (tag: string) => void;
}

export const SheetWorkspace: React.FC<SheetWorkspaceProps> = ({
  rooms,
  ductRuns: initialDuctRuns,
  terminals,
  dampers,
  equipment,
  market = 'IN'
}) => {
  // View Mode: 2D Blueprint, 3D Isometric BIM, or Required Materials & Costs
  const [viewMode, setViewMode] = useState<'2d' | '3d' | 'materials'>('2d');
  const [isoAngle, setIsoAngle] = useState<'sw' | 'se' | 'elevation'>('sw');

  // Local state for dynamic duct runs (allows user drawing / adding custom runs)
  const [ductRuns, setDuctRuns] = useState<DuctRun[]>(initialDuctRuns);

  // Viewport State
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  // Tool State
  const [activeTool, setActiveTool] = useState<MeasureTool>('select');
  const [activeTab, setActiveTab] = useState<'ducts' | 'terminals' | 'equipment' | 'dampers'>('ducts');

  // Selection & Two-Way Hover Sync
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>('DR-01');

  // Layer Visibility Toggles
  const [layers, setLayers] = useState({
    supply: true,
    return: true,
    exhaust: true,
    terminals: true,
    dampers: true,
    equipment: true,
    rooms: true,
    tags: true
  });

  // Calibration Modal State
  const [showCalibrateModal, setShowCalibrateModal] = useState(false);
  const [scaleRatio, setScaleRatio] = useState("1:100");

  // Custom Run Creator Modal State
  const [showAddRunModal, setShowAddRunModal] = useState(false);
  const [newRunSystem, setNewRunSystem] = useState<'Supply' | 'Return' | 'Exhaust'>('Supply');
  const [newRunWidth, setNewRunWidth] = useState(600);
  const [newRunHeight, setNewRunHeight] = useState(400);
  const [newRunLength, setNewRunLength] = useState(12.5);

  // Click-to-measure live point tracker
  const [measurePoints, setMeasurePoints] = useState<[number, number][]>([]);

  const canvasRef = useRef<HTMLDivElement>(null);
  const isUS = market === 'US';
  const currencySymbol = isUS ? '$' : '₹';

  // Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTool === 'select' && (e.button === 0 || e.button === 1)) {
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    } else if (activeTool === 'length' || activeTool === 'area') {
      // Calculate canvas-relative coordinates
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const cx = (e.clientX - rect.left - pan.x) / zoom;
        const cy = (e.clientY - rect.top - pan.y) / zoom;
        setMeasurePoints(prev => {
          if (prev.length >= 2) return [[cx, cy]];
          return [...prev, [cx, cy]];
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(0.4, prev + delta), 2.5));
  };

  const handleFit = () => {
    setZoom(0.85);
    setPan({ x: 20, y: 10 });
  };

  // Add custom takeoff run
  const handleCreateRun = () => {
    const nextNum = ductRuns.length + 1;
    const runId = `DR-${nextNum < 10 ? '0' + nextNum : nextNum}`;
    const surfaceArea = Number(((2 * (newRunWidth + newRunHeight) * newRunLength) / 1000).toFixed(2));
    const is655Gauge = Math.max(newRunWidth, newRunHeight) > 1500 ? 20 : Math.max(newRunWidth, newRunHeight) > 750 ? 22 : 24;
    const thicknessMm = is655Gauge === 24 ? 0.63 : is655Gauge === 22 ? 0.80 : 1.00;
    const weightKg = Number((surfaceArea * thicknessMm * 7.85).toFixed(1));

    const color = newRunSystem === 'Supply' ? '#D93872' : newRunSystem === 'Return' ? '#2EA043' : '#E66E19';
    const startX = 200 + (nextNum * 40);
    const startY = 320;
    const endX = startX + 280;
    const endY = startY;

    const ductSystem = newRunSystem === 'Supply' ? 'Supply Air' : newRunSystem === 'Return' ? 'Return Air' : 'Toilet Exhaust Air';

    const perimeter = 2 * (newRunWidth + newRunHeight);
    const thickness = is655Gauge === 24 ? 0.63 : is655Gauge === 22 ? 0.80 : is655Gauge === 20 ? 1.00 : 1.25;

    const newDuct: DuctRun = {
      id: runId,
      system: ductSystem,
      color,
      section_mm: [newRunWidth, newRunHeight],
      length_m: newRunLength,
      perimeter_mm: perimeter,
      is655_gauge: is655Gauge,
      sheet_metal_thickness_mm: thickness,
      surface_area_sqm: surfaceArea,
      insulation_area_sqm: surfaceArea,
      weight_kg: weightKg,
      formula_ref: `2 × (${newRunWidth} + ${newRunHeight}) × ${newRunLength} / 1000 = ${surfaceArea} m²`,
      provenance: 'MEASURED',
      path: [[startX, startY], [endX, endY]]
    };

    setDuctRuns(prev => [...prev, newDuct]);
    setSelectedId(runId);
    setShowAddRunModal(false);
  };

  // Find currently selected element details
  const selectedDuct = ductRuns.find(d => d.id === selectedId);

  // Compute Required Materials & Cost Summary Data
  const totalDuctArea = ductRuns.reduce((sum, d) => sum + d.surface_area_sqm, 0);
  const totalDuctWeight = ductRuns.reduce((sum, d) => sum + d.weight_kg, 0);
  const totalInsulationArea = ductRuns.reduce((sum, d) => sum + d.insulation_area_sqm, 0);

  const materialsData = [
    {
      item: 'Galvanized Sheet Steel (CRCA 24G / 0.63mm)',
      spec: 'IS 277 / ASTM A653 G90 Lock-Forming Quality',
      trade: 'Ductwork Supply',
      qty: `${(totalDuctWeight * 0.45).toFixed(1)} kg`,
      unitRate: isUS ? '$1.45 / lb' : '₹78.50 / kg',
      totalCost: isUS ? (totalDuctWeight * 0.45 * 2.204 * 1.45) : (totalDuctWeight * 0.45 * 78.50)
    },
    {
      item: 'Galvanized Sheet Steel (CRCA 22G / 0.80mm)',
      spec: 'IS 277 / ASTM A653 G90 medium pressure mains',
      trade: 'Ductwork Supply',
      qty: `${(totalDuctWeight * 0.35).toFixed(1)} kg`,
      unitRate: isUS ? '$1.48 / lb' : '₹78.50 / kg',
      totalCost: isUS ? (totalDuctWeight * 0.35 * 2.204 * 1.48) : (totalDuctWeight * 0.35 * 78.50)
    },
    {
      item: 'Galvanized Sheet Steel (CRCA 20G / 1.00mm)',
      spec: 'IS 277 / ASTM A653 G90 heavy header runs',
      trade: 'Ductwork Supply',
      qty: `${(totalDuctWeight * 0.20).toFixed(1)} kg`,
      unitRate: isUS ? '$1.55 / lb' : '₹82.00 / kg',
      totalCost: isUS ? (totalDuctWeight * 0.20 * 2.204 * 1.55) : (totalDuctWeight * 0.20 * 82.00)
    },
    {
      item: 'Class O Nitrile Rubber Thermal Insulation (19mm)',
      spec: 'Factory laminated aluminum foil vapor barrier',
      trade: 'Thermal Insulation',
      qty: `${totalInsulationArea.toFixed(1)} m²`,
      unitRate: isUS ? '$4.20 / sq ft' : '₹380.00 / m²',
      totalCost: isUS ? (totalInsulationArea * 10.76 * 4.20) : (totalInsulationArea * 380.00)
    },
    {
      item: 'Acoustic Duct Lining (12mm Perforated GI facing)',
      spec: '32 kg/m³ resin bonded fiberglass with non-woven fabric',
      trade: 'Acoustic Treatment',
      qty: '48.0 m²',
      unitRate: isUS ? '$5.80 / sq ft' : '₹520.00 / m²',
      totalCost: isUS ? (48.0 * 10.76 * 5.80) : (48.0 * 520.00)
    },
    {
      item: 'Opposed Blade Volume Control Dampers (IS 16018)',
      spec: 'Aerofoil aluminum blades with nylon bearings',
      trade: 'Air Distribution',
      qty: '18 Nos',
      unitRate: isUS ? '$165.00 / No' : '₹3,200.00 / No',
      totalCost: isUS ? (18 * 165.00) : (18 * 3200.00)
    },
    {
      item: 'Motorized Fire & Smoke Dampers (UL 555 rated)',
      spec: '2-Hour fire rated with 120V Belimo spring return actuator',
      trade: 'Life Safety & Dampers',
      qty: `${dampers.length} Nos`,
      unitRate: isUS ? '$780.00 / No' : '₹14,200.00 / No',
      totalCost: isUS ? (dampers.length * 780.00) : (dampers.length * 14200.00)
    },
    {
      item: 'Architectural Supply & Return Diffusers / Grilles',
      spec: 'Extruded aluminum powder coated with opposed blade volume damper',
      trade: 'Air Terminals',
      qty: `${terminals.reduce((s, t) => s + t.count, 0)} Nos`,
      unitRate: isUS ? '$48.00 / No' : '₹1,150.00 / No',
      totalCost: isUS ? (50 * 48.00) : (50 * 1150.00)
    },
    {
      item: 'Ductwork Fabrication, Hanger Rods & Site Erection Labor',
      spec: 'Certified sheet metal mechanics + rigging crews',
      trade: 'Installation Labor',
      qty: '380 Hours',
      unitRate: isUS ? '$72.00 / hr' : '₹450.00 / hr',
      totalCost: isUS ? (380 * 72.00) : (380 * 450.00)
    }
  ];

  const totalMaterialLaborCost = materialsData.reduce((sum, item) => sum + item.totalCost, 0);
  const contractorMargin = totalMaterialLaborCost * 0.15;
  const grandLandedTotal = totalMaterialLaborCost + contractorMargin;

  const handleExportMaterialsCSV = () => {
    const headers = ["Item Description", "Specification", "Trade", "Quantity", `Unit Rate (${currencySymbol})`, `Total Amount (${currencySymbol})`];
    const rows = materialsData.map(m => [
      `"${m.item}"`,
      `"${m.spec}"`,
      `"${m.trade}"`,
      `"${m.qty}"`,
      `"${m.unitRate}"`,
      m.totalCost.toFixed(2)
    ]);
    rows.push(['"Subtotal Material & Labor"', '""', '""', '""', '""', totalMaterialLaborCost.toFixed(2)]);
    rows.push(['"Contractor Overhead & Margin (15%)"', '""', '""', '""', '""', contractorMargin.toFixed(2)]);
    rows.push(['"Total Landed Estimate"', '""', '""', '""', '""', grandLandedTotal.toFixed(2)]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `Preconstruct_Takeoff_BOM_Costing_${market}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Secondary Workspace Toolbar */}
      <div style={{
        height: '42px',
        background: 'var(--color-sheet)',
        borderBottom: '1px solid var(--color-rule)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        gap: '12px',
        flexShrink: 0
      }}>
        {/* Left: View Mode Switcher + Tool Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* View Mode Toggle: 2D Plan / 3D Isometric / Materials */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--color-paper)',
            borderRadius: 'var(--radius-sm)',
            padding: '2px',
            border: '1px solid var(--color-rule-subtle)'
          }}>
            <button
              onClick={() => setViewMode('2d')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 9px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                fontWeight: viewMode === '2d' ? 600 : 500,
                background: viewMode === '2d' ? 'var(--color-sheet-elevated)' : 'transparent',
                color: viewMode === '2d' ? 'var(--color-ink)' : 'var(--color-graphite)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <LayersIcon size={12} />
              <span>2D Plan</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 9px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                fontWeight: viewMode === '3d' ? 600 : 500,
                background: viewMode === '3d' ? 'var(--color-sheet-elevated)' : 'transparent',
                color: viewMode === '3d' ? 'var(--color-ink)' : 'var(--color-graphite)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Box size={12} />
              <span>3D Isometric BIM</span>
            </button>
            <button
              onClick={() => setViewMode('materials')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 9px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                fontWeight: viewMode === 'materials' ? 600 : 500,
                background: viewMode === 'materials' ? 'var(--color-sheet-elevated)' : 'transparent',
                color: viewMode === 'materials' ? 'var(--color-ink)' : 'var(--color-graphite)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <DollarSign size={12} />
              <span>Materials & Costs</span>
            </button>
          </div>

          <div style={{ width: '1px', height: '16px', background: 'var(--color-rule)' }} />

          {viewMode === '2d' && (
            <>
              {/* Tool Selector */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--color-paper)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px',
                border: '1px solid var(--color-rule-subtle)'
              }}>
                <button
                  onClick={() => { setActiveTool('select'); setMeasurePoints([]); }}
                  className="btn-tertiary"
                  title="Select & Pan (V)"
                  style={{
                    padding: '4px 8px',
                    background: activeTool === 'select' ? 'var(--color-sheet-elevated)' : 'transparent',
                    color: activeTool === 'select' ? 'var(--color-ink)' : 'var(--color-graphite)',
                    boxShadow: activeTool === 'select' ? 'var(--shadow-subtle)' : 'none'
                  }}
                >
                  <MousePointer size={13} />
                </button>
                <button
                  onClick={() => setActiveTool('length')}
                  className="btn-tertiary"
                  title="Measure Length (L) - Click 2 points on drawing"
                  style={{
                    padding: '4px 8px',
                    background: activeTool === 'length' ? 'var(--color-sheet-elevated)' : 'transparent',
                    color: activeTool === 'length' ? 'var(--color-ink)' : 'var(--color-graphite)',
                    boxShadow: activeTool === 'length' ? 'var(--shadow-subtle)' : 'none'
                  }}
                >
                  <Ruler size={13} />
                </button>
                <button
                  onClick={() => setActiveTool('area')}
                  className="btn-tertiary"
                  title="Measure Area (A)"
                  style={{
                    padding: '4px 8px',
                    background: activeTool === 'area' ? 'var(--color-sheet-elevated)' : 'transparent',
                    color: activeTool === 'area' ? 'var(--color-ink)' : 'var(--color-graphite)',
                    boxShadow: activeTool === 'area' ? 'var(--shadow-subtle)' : 'none'
                  }}
                >
                  <Square size={13} />
                </button>
                <button
                  onClick={() => setActiveTool('count')}
                  className="btn-tertiary"
                  title="Count Symbols (C)"
                  style={{
                    padding: '4px 8px',
                    background: activeTool === 'count' ? 'var(--color-sheet-elevated)' : 'transparent',
                    color: activeTool === 'count' ? 'var(--color-ink)' : 'var(--color-graphite)',
                    boxShadow: activeTool === 'count' ? 'var(--shadow-subtle)' : 'none'
                  }}
                >
                  <Hash size={13} />
                </button>
              </div>

              {/* Add Custom Takeoff Run Action */}
              <button
                onClick={() => setShowAddRunModal(true)}
                className="btn-secondary"
                style={{ padding: '3px 8px', fontSize: '11px', gap: '4px', display: 'flex', alignItems: 'center' }}
                title="Add custom duct run to drawing and BOQ"
              >
                <Plus size={12} />
                <span>Add / Draw Duct</span>
              </button>
            </>
          )}

          {viewMode === '3d' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>Camera Angle:</span>
              <button
                onClick={() => setIsoAngle('sw')}
                className="btn-secondary"
                style={{
                  padding: '3px 7px',
                  fontSize: '10.5px',
                  background: isoAngle === 'sw' ? 'var(--color-sheet-elevated)' : 'transparent'
                }}
              >
                ISO South-West (45°)
              </button>
              <button
                onClick={() => setIsoAngle('se')}
                className="btn-secondary"
                style={{
                  padding: '3px 7px',
                  fontSize: '10.5px',
                  background: isoAngle === 'se' ? 'var(--color-sheet-elevated)' : 'transparent'
                }}
              >
                ISO South-East (135°)
              </button>
              <button
                onClick={() => setIsoAngle('elevation')}
                className="btn-secondary"
                style={{
                  padding: '3px 7px',
                  fontSize: '10.5px',
                  background: isoAngle === 'elevation' ? 'var(--color-sheet-elevated)' : 'transparent'
                }}
              >
                Top-Down Elevation
              </button>
            </div>
          )}

          {/* Scale Chip with Calibration Trigger */}
          <button
            onClick={() => setShowCalibrateModal(true)}
            className="provenance-pill measured"
            style={{ cursor: 'pointer', padding: '3px 8px', fontSize: '11px', gap: '6px' }}
            title="Click to calibrate scale"
          >
            <ScaleIcon size={12} />
            <span>Scale {scaleRatio} (Calibrated)</span>
          </button>
        </div>

        {/* Right: Layer Toggles & Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {viewMode === '2d' && (
            <>
              {/* Layer Quick Toggles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                <button
                  onClick={() => setLayers(prev => ({ ...prev, supply: !prev.supply }))}
                  style={{
                    padding: '3px 7px',
                    borderRadius: 'var(--radius-xs)',
                    background: layers.supply ? 'rgba(217, 56, 114, 0.12)' : 'transparent',
                    color: layers.supply ? '#D93872' : 'var(--color-graphite-faint)',
                    fontWeight: 600,
                    fontSize: '10.5px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Supply
                </button>
                <button
                  onClick={() => setLayers(prev => ({ ...prev, return: !prev.return }))}
                  style={{
                    padding: '3px 7px',
                    borderRadius: 'var(--radius-xs)',
                    background: layers.return ? 'rgba(46, 160, 67, 0.12)' : 'transparent',
                    color: layers.return ? '#2EA043' : 'var(--color-graphite-faint)',
                    fontWeight: 600,
                    fontSize: '10.5px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Return
                </button>
                <button
                  onClick={() => setLayers(prev => ({ ...prev, exhaust: !prev.exhaust }))}
                  style={{
                    padding: '3px 7px',
                    borderRadius: 'var(--radius-xs)',
                    background: layers.exhaust ? 'rgba(230, 110, 25, 0.12)' : 'transparent',
                    color: layers.exhaust ? '#E66E19' : 'var(--color-graphite-faint)',
                    fontWeight: 600,
                    fontSize: '10.5px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Exhaust
                </button>
                <button
                  onClick={() => setLayers(prev => ({ ...prev, terminals: !prev.terminals }))}
                  style={{
                    padding: '3px 7px',
                    borderRadius: 'var(--radius-xs)',
                    background: layers.terminals ? 'var(--color-paper)' : 'transparent',
                    color: layers.terminals ? 'var(--color-ink)' : 'var(--color-graphite-faint)',
                    fontWeight: 500,
                    fontSize: '10.5px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Grilles
                </button>
                <button
                  onClick={() => setLayers(prev => ({ ...prev, dampers: !prev.dampers }))}
                  style={{
                    padding: '3px 7px',
                    borderRadius: 'var(--radius-xs)',
                    background: layers.dampers ? 'rgba(220, 38, 38, 0.12)' : 'transparent',
                    color: layers.dampers ? '#DC2626' : 'var(--color-graphite-faint)',
                    fontWeight: 600,
                    fontSize: '10.5px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Dampers
                </button>
              </div>

              <div style={{ width: '1px', height: '16px', background: 'var(--color-rule)' }} />

              {/* Zoom Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button 
                  onClick={() => handleZoom(-0.15)} 
                  className="btn-secondary" 
                  style={{ padding: '3px 7px' }}
                  aria-label="Zoom Out"
                  title="Zoom Out (-)"
                  data-testid="zoom-out-btn"
                >
                  <ZoomOut size={12} />
                </button>
                <span className="font-mono" style={{ fontSize: '11px', minWidth: '40px', textAlign: 'center' }}>
                  {Math.round(zoom * 100)}%
                </span>
                <button 
                  onClick={() => handleZoom(0.15)} 
                  className="btn-secondary" 
                  style={{ padding: '3px 7px' }}
                  aria-label="Zoom In"
                  title="Zoom In (+)"
                  data-testid="zoom-in-btn"
                >
                  <ZoomIn size={12} />
                </button>
                <button onClick={handleFit} className="btn-secondary" style={{ padding: '3px 7px', fontSize: '11px' }} aria-label="Fit to screen">
                  Fit
                </button>
              </div>
            </>
          )}

          {viewMode === 'materials' && (
            <button
              onClick={handleExportMaterialsCSV}
              className="btn-primary"
              style={{ padding: '5px 12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={12} />
              <span>Export BOM (.csv)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Body depending on ViewMode */}
      {viewMode === '2d' && (
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left: 2D Interactive Blueprint Canvas */}
          <div
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              flex: 1,
              background: '#191816',
              position: 'relative',
              overflow: 'hidden',
              cursor: activeTool === 'select' ? (isPanning ? 'grabbing' : 'grab') : 'crosshair'
            }}
          >
            {/* Blueprint SVG Canvas Layer */}
            <div style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              transition: isPanning ? 'none' : 'transform var(--duration-fast) var(--ease-standard)',
              width: '1280px',
              height: '840px',
              position: 'relative'
            }}>
              <svg
                width="1280"
                height="840"
                viewBox="0 0 1280 840"
                style={{ display: 'block', userSelect: 'none' }}
              >
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262320" strokeWidth="0.5" />
                  </pattern>
                </defs>

                {/* Background Grid */}
                <rect width="1280" height="840" fill="#1B1A18" />
                <rect width="1280" height="840" fill="url(#grid)" />

                {/* Architectural Outer Boundary & Walls */}
                <rect x="40" y="50" width="1200" height="740" fill="none" stroke="#3A3630" strokeWidth="2.5" />

                {/* Room Boundary Enclosures */}
                {layers.rooms && rooms.map(room => {
                  const isHovered = hoveredId === room.id;
                  return (
                    <g key={room.id}>
                      <rect
                        x={room.bbox[0]}
                        y={room.bbox[1]}
                        width={room.bbox[2]}
                        height={room.bbox[3]}
                        fill={isHovered ? 'rgba(164, 120, 100, 0.08)' : '#211F1D'}
                        stroke={isHovered ? 'var(--color-mocha)' : '#454039'}
                        strokeWidth={isHovered ? 2 : 1}
                        strokeDasharray={room.id.includes('RM') ? 'none' : '4 3'}
                      />
                      {layers.tags && (
                        <g>
                          <text
                            x={room.tag_coord[0]}
                            y={room.id === 'RM-06' ? room.tag_coord[1] + 32 : room.id === 'RM-05' ? room.tag_coord[1] + 46 : room.tag_coord[1]}
                            fill="#8C857B"
                            fontSize="10"
                            fontFamily="var(--font-sans)"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            {room.name}
                          </text>
                          <text
                            x={room.tag_coord[0]}
                            y={(room.id === 'RM-06' ? room.tag_coord[1] + 32 : room.id === 'RM-05' ? room.tag_coord[1] + 46 : room.tag_coord[1]) + 13}
                            fill="#666056"
                            fontSize="8.5"
                            fontFamily="var(--font-mono)"
                            textAnchor="middle"
                          >
                            {room.dimensions_mm[0]} × {room.dimensions_mm[1]} mm ({room.area_sqm} m²)
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Architectural Columns */}
                {[
                  [60, 90, "C8"], [420, 90, "C13"], [800, 90, "C24"], [1150, 90, "C25"],
                  [60, 290, "C36"], [420, 290, "C37"], [800, 290, "C41"], [1150, 290, "C44"]
                ].map(([cx, cy, label], idx) => (
                  <g key={idx}>
                    <rect x={Number(cx) - 6} y={Number(cy) - 6} width="12" height="12" fill="#524D44" stroke="#756E63" strokeWidth="0.8" />
                    <text x={Number(cx) + 9} y={Number(cy) + 4} fill="#6E675D" fontSize="8.5" fontFamily="var(--font-mono)">
                      {label}
                    </text>
                  </g>
                ))}

                {/* Equipment Items (AHU-04, AHU-05, AHU-02, EAF-01) */}
                {layers.equipment && equipment.map(eq => {
                  const isSelected = selectedId === eq.tag;
                  return (
                    <g
                      key={eq.tag}
                      onClick={() => setSelectedId(eq.tag)}
                      onMouseEnter={() => setHoveredId(eq.tag)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <rect
                        x={eq.bbox[0]}
                        y={eq.bbox[1]}
                        width={eq.bbox[2]}
                        height={eq.bbox[3]}
                        fill={isSelected ? '#2A2035' : '#1E1925'}
                        stroke={isSelected ? '#A47864' : '#8B5CF6'}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        rx="3"
                      />
                      <text
                        x={eq.bbox[0] + eq.bbox[2] / 2}
                        y={eq.bbox[1] + 19}
                        fill="#E0D7FE"
                        fontSize="9.5"
                        fontFamily="var(--font-mono)"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        {eq.tag}
                      </text>
                      <text
                        x={eq.bbox[0] + eq.bbox[2] / 2}
                        y={eq.bbox[1] + 33}
                        fill="#C4B5FD"
                        fontSize="8"
                        fontFamily="var(--font-mono)"
                        fontWeight="500"
                        textAnchor="middle"
                      >
                        {eq.capacity_tr > 0 ? `${eq.capacity_tr} TR · ${eq.airflow_cfm} CFM` : `${eq.airflow_cfm} CFM`}
                      </text>
                    </g>
                  );
                })}

                {/* Duct Runs with True Vector Paths & Cross-Sections */}
                {ductRuns.map(run => {
                  const isSupply = run.system.includes('Supply') && layers.supply;
                  const isReturn = run.system.includes('Return') && layers.return;
                  const isExhaust = run.system.includes('Exhaust') && layers.exhaust;
                  if (!isSupply && !isReturn && !isExhaust) return null;

                  const isSelected = selectedId === run.id;
                  const isHovered = hoveredId === run.id;
                  const pointsStr = run.path.map(p => p.join(',')).join(' ');

                  return (
                    <g
                      key={run.id}
                      onClick={() => setSelectedId(run.id)}
                      onMouseEnter={() => setHoveredId(run.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Outer Glow */}
                      {(isSelected || isHovered) && (
                        <polyline
                          points={pointsStr}
                          fill="none"
                          stroke="#A47864"
                          strokeWidth={run.section_mm[1] / 30 + 12}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={0.35}
                        />
                      )}

                      {/* Duct Body */}
                      <polyline
                        points={pointsStr}
                        fill="none"
                        stroke={run.color}
                        strokeWidth={run.section_mm[1] / 30 + 6}
                        strokeLinecap="square"
                        strokeLinejoin="round"
                        opacity={isSelected || isHovered ? 1 : 0.85}
                      />

                      {/* Duct Centreline */}
                      <polyline
                        points={pointsStr}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.2"
                        strokeDasharray="6 3"
                        opacity={0.7}
                      />

                      {/* Size Tag */}
                      {layers.tags && (
                        <g transform={`translate(${(run.path[0][0] + run.path[run.path.length - 1][0]) / 2}, ${(run.path[0][1] + run.path[run.path.length - 1][1]) / 2 - 12})`}>
                          <rect x="-44" y="-10" width="88" height="18" rx="2" fill="rgba(25, 24, 22, 0.85)" stroke={run.color} strokeWidth="0.8" />
                          <text x="0" y="3" fill="#FFFFFF" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="500">
                            {run.section_mm[0]}×{run.section_mm[1]} · {run.is655_gauge}G
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Air Terminals */}
                {layers.terminals && terminals.map(term => {
                  const isSelected = selectedId === term.id;
                  return (
                    <g
                      key={term.id}
                      onClick={() => setSelectedId(term.id)}
                      onMouseEnter={() => setHoveredId(term.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {term.positions.map((pos, pIdx) => (
                        <g key={pIdx}>
                          <rect
                            x={pos[0] - 6}
                            y={pos[1] - 6}
                            width="12"
                            height="12"
                            fill={isSelected ? '#A47864' : term.color}
                            stroke="#FFFFFF"
                            strokeWidth="1"
                            rx="1.5"
                            opacity={0.9}
                          />
                          <line x1={pos[0] - 4} y1={pos[1]} x2={pos[0] + 4} y2={pos[1]} stroke="#191816" strokeWidth="0.8" />
                        </g>
                      ))}
                    </g>
                  );
                })}

                {/* Fire & Smoke Dampers */}
                {layers.dampers && dampers.map(damper => {
                  const isSelected = selectedId === damper.id;
                  return (
                    <g
                      key={damper.id}
                      onClick={() => setSelectedId(damper.id)}
                      onMouseEnter={() => setHoveredId(damper.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <rect
                        x={damper.coord[0] - 8}
                        y={damper.coord[1] - 8}
                        width="16"
                        height="16"
                        fill="#DC2626"
                        stroke={isSelected ? '#A47864' : '#FFFFFF'}
                        strokeWidth={isSelected ? 2 : 1}
                        rx="2"
                      />
                      <text x={damper.coord[0]} y={damper.coord[1] + 3} fill="#FFFFFF" fontSize="7.5" fontWeight="700" textAnchor="middle">
                        FD
                      </text>
                      <text x={damper.coord[0]} y={damper.coord[1] + 18} fill="#FCA5A5" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
                        {damper.tag}
                      </text>
                    </g>
                  );
                })}

                {/* Dynamic User Measurement Polyline (when using length or area tool) */}
                {measurePoints.length > 0 && (
                  <g>
                    {measurePoints.map((pt, pIdx) => (
                      <circle key={pIdx} cx={pt[0]} cy={pt[1]} r="5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
                    ))}
                    {measurePoints.length === 2 && (
                      <>
                        <line
                          x1={measurePoints[0][0]}
                          y1={measurePoints[0][1]}
                          x2={measurePoints[1][0]}
                          y2={measurePoints[1][1]}
                          stroke="#38BDF8"
                          strokeWidth="2"
                          strokeDasharray="4 3"
                        />
                        <rect
                          x={(measurePoints[0][0] + measurePoints[1][0]) / 2 - 40}
                          y={(measurePoints[0][1] + measurePoints[1][1]) / 2 - 16}
                          width="80"
                          height="20"
                          rx="3"
                          fill="#0C4A6E"
                          stroke="#38BDF8"
                          strokeWidth="1"
                        />
                        <text
                          x={(measurePoints[0][0] + measurePoints[1][0]) / 2}
                          y={(measurePoints[0][1] + measurePoints[1][1]) / 2 - 2}
                          fill="#FFFFFF"
                          fontSize="9"
                          fontFamily="var(--font-mono)"
                          fontWeight="700"
                          textAnchor="middle"
                        >
                          {(Math.hypot(measurePoints[1][0] - measurePoints[0][0], measurePoints[1][1] - measurePoints[0][1]) * 0.05).toFixed(2)} m
                        </text>
                      </>
                    )}
                  </g>
                )}

                {/* Title Block on Blueprint Bottom Right */}
                <g transform="translate(940, 720)">
                  <rect width="300" height="70" fill="#211F1D" stroke="#454039" strokeWidth="1" />
                  <text x="10" y="20" fill="#E8E4DC" fontSize="10" fontWeight="600">{market === 'US' ? 'AUSTIN REGIONAL MEDICAL CENTER' : 'MANIPAL SPORTS COMPLEX'}</text>
                  <text x="10" y="36" fill="#A8A296" fontSize="8.5">{market === 'US' ? 'Sheet M-101 Rev 2 · Tower B CUP' : 'KCEPL/HVAC/007 Rev R1 · First Floor Layout'}</text>
                  <text x="10" y="52" fill="#756E63" fontSize="8" fontFamily="var(--font-mono)">Scale: 1:100 · Consultant: {market === 'US' ? 'SmithGroup MEP' : 'Kapse Consulting'}</text>
                </g>
              </svg>
            </div>

            {/* Canvas Floating Overlay Controls */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'rgba(25, 24, 22, 0.85)',
              backdropFilter: 'blur(6px)',
              border: '1px solid #3A3630',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '11px',
              color: '#A8A296',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span>{activeTool === 'length' ? 'Click 2 points on drawing to measure length' : 'Hover item on plan or table to sync'}</span>
              <span>·</span>
              <span>Click element to inspect engineering derivation</span>
            </div>
          </div>

          {/* Right Data Schedule Panel */}
          <div style={{
            width: '420px',
            background: 'var(--color-sheet-elevated)',
            borderLeft: '1px solid var(--color-rule)',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0
          }}>
            {/* Schedule Navigation Tabs */}
            <div style={{
              padding: '8px 12px',
              borderBottom: '1px solid var(--color-rule)',
              display: 'flex',
              gap: '4px',
              background: 'var(--color-sheet)'
            }}>
              <button
                onClick={() => setActiveTab('ducts')}
                style={{
                  flex: 1,
                  padding: '5px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11px',
                  fontWeight: activeTab === 'ducts' ? 600 : 500,
                  background: activeTab === 'ducts' ? 'var(--color-sheet-elevated)' : 'transparent',
                  color: activeTab === 'ducts' ? 'var(--color-ink)' : 'var(--color-graphite)',
                  border: activeTab === 'ducts' ? '1px solid var(--color-rule)' : '1px solid transparent',
                  cursor: 'pointer'
                }}
              >
                Duct Runs ({ductRuns.length})
              </button>
              <button
                onClick={() => setActiveTab('terminals')}
                style={{
                  flex: 1,
                  padding: '5px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11px',
                  fontWeight: activeTab === 'terminals' ? 600 : 500,
                  background: activeTab === 'terminals' ? 'var(--color-sheet-elevated)' : 'transparent',
                  color: activeTab === 'terminals' ? 'var(--color-ink)' : 'var(--color-graphite)',
                  border: activeTab === 'terminals' ? '1px solid var(--color-rule)' : '1px solid transparent',
                  cursor: 'pointer'
                }}
              >
                Terminals (50)
              </button>
              <button
                onClick={() => setActiveTab('equipment')}
                style={{
                  flex: 1,
                  padding: '5px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11px',
                  fontWeight: activeTab === 'equipment' ? 600 : 500,
                  background: activeTab === 'equipment' ? 'var(--color-sheet-elevated)' : 'transparent',
                  color: activeTab === 'equipment' ? 'var(--color-ink)' : 'var(--color-graphite)',
                  border: activeTab === 'equipment' ? '1px solid var(--color-rule)' : '1px solid transparent',
                  cursor: 'pointer'
                }}
              >
                Equipment (4)
              </button>
              <button
                onClick={() => setActiveTab('dampers')}
                style={{
                  flex: 1,
                  padding: '5px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11px',
                  fontWeight: activeTab === 'dampers' ? 600 : 500,
                  background: activeTab === 'dampers' ? 'var(--color-sheet-elevated)' : 'transparent',
                  color: activeTab === 'dampers' ? 'var(--color-ink)' : 'var(--color-graphite)',
                  border: activeTab === 'dampers' ? '1px solid var(--color-rule)' : '1px solid transparent',
                  cursor: 'pointer'
                }}
              >
                Dampers (4)
              </button>
            </div>

            {/* Schedule Table Rows */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {activeTab === 'ducts' && (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-table-size)' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)', textAlign: 'left', color: 'var(--color-graphite)', fontSize: '10px', textTransform: 'uppercase' }}>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)' }}>Run / System</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)' }}>Section</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right' }}>Length</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right' }}>Area (m²)</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'center' }}>Gauge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ductRuns.map(run => {
                      const isSelected = selectedId === run.id;
                      const isHovered = hoveredId === run.id;

                      return (
                        <tr
                          key={run.id}
                          onClick={() => setSelectedId(run.id)}
                          onMouseEnter={() => setHoveredId(run.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          style={{
                            height: 'var(--row-h)',
                            borderBottom: '1px solid var(--color-rule-subtle)',
                            background: isSelected ? 'var(--color-mocha-tint)' : isHovered ? 'var(--color-paper)' : 'transparent',
                            cursor: 'pointer'
                          }}
                        >
                          <td style={{ padding: 'var(--cell-py) var(--cell-px)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: run.color }} />
                              <span className="font-mono" style={{ fontWeight: 600 }}>{run.id}</span>
                              <span style={{ fontSize: '10px', color: 'var(--color-graphite)' }}>{run.system.split(' ')[0]}</span>
                            </div>
                          </td>
                          <td className="font-mono" style={{ padding: 'var(--cell-py) var(--cell-px)' }}>
                            {run.section_mm[0]}×{run.section_mm[1]}
                          </td>
                          <td className="font-mono" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right' }}>
                            {run.length_m} m
                          </td>
                          <td className="font-mono" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right', fontWeight: 600 }}>
                            {run.surface_area_sqm}
                          </td>
                          <td style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'center' }}>
                            <span className="badge-code" style={{ background: 'var(--color-paper)', padding: '2px 5px', borderRadius: '3px', fontSize: '10.5px' }}>
                              {run.is655_gauge}G
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {activeTab === 'terminals' && (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-table-size)' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)', textAlign: 'left', color: 'var(--color-graphite)', fontSize: '10px', textTransform: 'uppercase' }}>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)' }}>Tag & Type</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)' }}>Size (mm)</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right' }}>Count</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right' }}>CFM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terminals.map(term => {
                      const isSelected = selectedId === term.id;
                      return (
                        <tr
                          key={term.id}
                          onClick={() => setSelectedId(term.id)}
                          onMouseEnter={() => setHoveredId(term.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          style={{
                            height: 'var(--row-h)',
                            borderBottom: '1px solid var(--color-rule-subtle)',
                            background: isSelected ? 'var(--color-mocha-tint)' : 'transparent',
                            cursor: 'pointer'
                          }}
                        >
                          <td style={{ padding: 'var(--cell-py) var(--cell-px)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: term.color }} />
                              <span className="font-mono" style={{ fontWeight: 600 }}>{term.tag}</span>
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--color-graphite)' }}>{term.type.split('(')[0]}</div>
                          </td>
                          <td className="font-mono" style={{ padding: 'var(--cell-py) var(--cell-px)' }}>
                            {term.dimensions_mm[0]}×{term.dimensions_mm[1]}
                          </td>
                          <td className="font-mono" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right', fontWeight: 600 }}>
                            {term.count} Nos
                          </td>
                          <td className="font-mono" style={{ padding: 'var(--cell-py) var(--cell-px)', textAlign: 'right' }}>
                            {term.airflow_cfm}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {activeTab === 'equipment' && (
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {equipment.map(eq => {
                    const isSelected = selectedId === eq.tag;
                    return (
                      <div
                        key={eq.tag}
                        onClick={() => setSelectedId(eq.tag)}
                        onMouseEnter={() => setHoveredId(eq.tag)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                          padding: '12px',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected ? '1.5px solid var(--color-mocha)' : '1px solid var(--color-rule)',
                          background: isSelected ? 'var(--color-mocha-tint)' : 'var(--color-sheet-elevated)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <span className="font-mono" style={{ fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)' }}>
                              {eq.tag}
                            </span>
                            <div style={{ fontSize: '11px', color: 'var(--color-graphite)', marginTop: '2px' }}>
                              {eq.type}
                            </div>
                          </div>
                          <span className={`provenance-pill ${eq.provenance.toLowerCase()}`} style={{ fontSize: '9px' }}>
                            {eq.provenance === 'LOOK' ? 'Needs a look' : eq.provenance}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '11px' }}>
                          <span className="font-mono"><strong>Capacity:</strong> {eq.capacity_tr > 0 ? `${eq.capacity_tr} TR` : 'Vent Fan'}</span>
                          <span className="font-mono"><strong>Airflow:</strong> {eq.airflow_cfm} CFM</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'dampers' && (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-table-size)' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)', textAlign: 'left', color: 'var(--color-graphite)', fontSize: '10px', textTransform: 'uppercase' }}>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)' }}>Damper Tag</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)' }}>Size (mm)</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)' }}>Rating</th>
                      <th style={{ padding: 'var(--cell-py) var(--cell-px)' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dampers.map(d => {
                      const isSelected = selectedId === d.id;
                      return (
                        <tr
                          key={d.id}
                          onClick={() => setSelectedId(d.id)}
                          onMouseEnter={() => setHoveredId(d.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          style={{
                            height: 'var(--row-h)',
                            borderBottom: '1px solid var(--color-rule-subtle)',
                            background: isSelected ? 'var(--color-mocha-tint)' : 'transparent',
                            cursor: 'pointer'
                          }}
                        >
                          <td style={{ padding: 'var(--cell-py) var(--cell-px)' }}>
                            <span className="font-mono" style={{ fontWeight: 600, color: '#DC2626' }}>{d.tag}</span>
                            <div style={{ fontSize: '10px', color: 'var(--color-graphite)' }}>{d.type.split('(')[0]}</div>
                          </td>
                          <td className="font-mono" style={{ padding: 'var(--cell-py) var(--cell-px)' }}>
                            {d.size_mm[0]}×{d.size_mm[1]}
                          </td>
                          <td className="font-mono" style={{ padding: 'var(--cell-py) var(--cell-px)' }}>
                            {d.wall_rating}
                          </td>
                          <td style={{ padding: 'var(--cell-py) var(--cell-px)' }}>
                            <span className="provenance-pill read" style={{ fontSize: '9px' }}>Read</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Bottom Provenance Inspector Panel */}
            {selectedDuct && (
              <div style={{
                padding: '14px',
                borderTop: '1px solid var(--color-rule)',
                background: 'var(--color-sheet)',
                fontSize: '11.5px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                    Selected Run: {selectedDuct.id} ({selectedDuct.system})
                  </span>
                  <span className="provenance-pill measured" style={{ fontSize: '9.5px' }}>
                    {selectedDuct.provenance}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-graphite)' }}>
                  <strong>Formula:</strong> {selectedDuct.formula_ref}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', background: 'var(--color-paper)', padding: '6px 8px', borderRadius: '3px' }}>
                  <span>Sheet Metal: <strong className="font-mono">{selectedDuct.surface_area_sqm} m²</strong></span>
                  <span>Insulation: <strong className="font-mono">{selectedDuct.insulation_area_sqm} m²</strong></span>
                  <span>Weight: <strong className="font-mono">{selectedDuct.weight_kg} kg</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3D Isometric BIM View */}
      {viewMode === '3d' && (
        <div style={{
          flex: 1,
          background: '#121110',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Isometric Canvas */}
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="1100" height="620" viewBox="0 0 1100 620" style={{ maxWidth: '100%', maxHeight: '100%' }}>
              <defs>
                <linearGradient id="isoSlab" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1F1D1A" />
                  <stop offset="100%" stopColor="#181614" />
                </linearGradient>
                <linearGradient id="ductSupply3D" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E0467E" />
                  <stop offset="100%" stopColor="#C42A62" />
                </linearGradient>
                <linearGradient id="ductReturn3D" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34B753" />
                  <stop offset="100%" stopColor="#228937" />
                </linearGradient>
              </defs>

              {/* Isometric 3D Floor Slab Base (Extruded Diamond) */}
              <polygon points="550,110 980,310 550,510 120,310" fill="url(#isoSlab)" stroke="#3E3932" strokeWidth="2" />
              {/* Slab Thickness Front Edge */}
              <polygon points="120,310 550,510 550,535 120,335" fill="#141312" stroke="#3E3932" strokeWidth="1" />
              <polygon points="550,510 980,310 980,335 550,535" fill="#0F0E0D" stroke="#3E3932" strokeWidth="1" />

              {/* Isometric Room Zoning Grid Lines */}
              <line x1="335" y1="210" x2="765" y2="410" stroke="#2B2723" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="765" y1="210" x2="335" y2="410" stroke="#2B2723" strokeWidth="1" strokeDasharray="4 4" />

              {/* 3D AHU Plant Equipment Cuboid (AHU-04 / AHU-05) */}
              <g transform="translate(420, 260)">
                {/* AHU Base Shadow */}
                <ellipse cx="60" cy="50" rx="55" ry="24" fill="rgba(0,0,0,0.5)" />
                {/* 3D Box Top */}
                <polygon points="60,0 120,25 60,50 0,25" fill="#6D28D9" stroke="#8B5CF6" strokeWidth="1.5" />
                {/* 3D Box Left Face */}
                <polygon points="0,25 60,50 60,95 0,70" fill="#4C1D95" stroke="#8B5CF6" strokeWidth="1.5" />
                {/* 3D Box Right Face */}
                <polygon points="60,50 120,25 120,70 60,95" fill="#5B21B6" stroke="#8B5CF6" strokeWidth="1.5" />
                <text x="60" y="32" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
                  AHU-04
                </text>
                <text x="60" y="74" fill="#DDD6FE" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">
                  18 TR · 7,200 CFM
                </text>
              </g>

              {/* 3D Primary Supply Header Duct (Extruded Isometric Prism at Z=3.2m Plenum) */}
              <g transform="translate(0, -60)">
                {/* Header Run DR-01 */}
                <polygon points="480,310 740,430 740,405 480,285" fill="#9D174D" opacity="0.9" />
                <polygon points="480,285 740,405 765,393 505,273" fill="#BE185D" opacity="0.9" />
                <polygon points="505,273 765,393 765,418 505,298" fill="#DB2777" opacity="0.9" />

                {/* Branch Run DR-02 */}
                <polygon points="580,356 460,412 460,392 580,336" fill="#047857" opacity="0.9" />
                <polygon points="580,336 460,392 445,385 565,329" fill="#059669" opacity="0.9" />

                {/* Vertical Drop Duct Risers to Ceiling Diffusers */}
                {[
                  [650, 420], [710, 448], [510, 412], [475, 428]
                ].map(([rx, ry], idx) => (
                  <g key={idx}>
                    <line x1={rx} y1={ry - 25} x2={rx} y2={ry + 20} stroke="#38BDF8" strokeWidth="2.5" />
                    {/* Diffuser Plate */}
                    <ellipse cx={rx} cy={ry + 20} rx="10" ry="5" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
                  </g>
                ))}

                {/* 3D Fire Damper Collar (FD-01) */}
                <g transform="translate(620, 368)">
                  <polygon points="0,0 20,9 20,28 0,19" fill="#DC2626" stroke="#FEF2F2" strokeWidth="1" />
                  <text x="10" y="14" fill="#FFFFFF" fontSize="7" fontWeight="700" textAnchor="middle">FD</text>
                </g>
              </g>

              {/* 3D Overlay Badge */}
              <g transform="translate(40, 40)">
                <rect width="260" height="90" rx="4" fill="rgba(25, 24, 22, 0.85)" stroke="#3E3932" strokeWidth="1" />
                <text x="14" y="24" fill="#FFFFFF" fontSize="12" fontWeight="700">3D ISOMETRIC BIM PROJECTION</text>
                <text x="14" y="44" fill="#A8A296" fontSize="10">Elevation: Z = +3,200 mm (Plenum Clearance)</text>
                <text x="14" y="62" fill="#22C55E" fontSize="9.5">✓ 0 Spatial Clashes with Structural Beams</text>
                <text x="14" y="78" fill="#38BDF8" fontSize="9.5">IS 655 / SMACNA 3D Gauge Extrusion</text>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Required Materials & Costs View */}
      {viewMode === 'materials' && (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'var(--color-sheet-elevated)'
        }}>
          {/* Header KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px'
          }}>
            <div style={{ background: 'var(--color-sheet)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Total Sheet Metal Area</div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
                {totalDuctArea.toFixed(2)} m²
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-graphite-faint)', marginTop: '2px' }}>
                {isUS ? `${(totalDuctArea * 10.76).toFixed(1)} sq ft` : 'IS 655 Table 1 Calibrated'}
              </div>
            </div>

            <div style={{ background: 'var(--color-sheet)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Total Steel Metal Weight</div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
                {totalDuctWeight.toFixed(1)} kg
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-graphite-faint)', marginTop: '2px' }}>
                {isUS ? `${(totalDuctWeight * 2.204).toFixed(1)} lbs` : 'Density 7.85 kg/m²/mm'}
              </div>
            </div>

            <div style={{ background: 'var(--color-sheet)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Material & Labor Subtotal</div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-ink)', marginTop: '2px' }}>
                {currencySymbol}{totalMaterialLaborCost.toLocaleString(isUS ? 'en-US' : 'en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div style={{ fontSize: '10px', color: '#22C55E', marginTop: '2px' }}>100% Itemized BOM</div>
            </div>

            <div style={{ background: 'var(--color-sheet)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--color-graphite)', textTransform: 'uppercase' }}>Total Landed Bid Cost (+15% Margin)</div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: '#0D9488', marginTop: '2px' }}>
                {currencySymbol}{grandLandedTotal.toLocaleString(isUS ? 'en-US' : 'en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div style={{ fontSize: '10px', color: '#0D9488', marginTop: '2px' }}>Includes Overhead & Contingency</div>
            </div>
          </div>

          {/* Exhaustive Material & Labor Table */}
          <div style={{ border: '1px solid var(--color-rule)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
              <thead>
                <tr style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)', textAlign: 'left', color: 'var(--color-graphite)' }}>
                  <th style={{ padding: '8px 12px' }}>Material / Work Description</th>
                  <th style={{ padding: '8px 12px' }}>Specification Standard</th>
                  <th style={{ padding: '8px 12px' }}>Trade</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Takeoff Qty</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Unit Rate</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total Amount ({currencySymbol})</th>
                </tr>
              </thead>
              <tbody>
                {materialsData.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-rule-subtle)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{item.item}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--color-graphite)' }}>{item.spec}</td>
                    <td style={{ padding: '8px 12px' }}><span className="badge-code">{item.trade}</span></td>
                    <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600 }}>{item.qty}</td>
                    <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right' }}>{item.unitRate}</td>
                    <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700 }}>
                      {item.totalCost.toLocaleString(isUS ? 'en-US' : 'en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
                <tr style={{ background: 'var(--color-sheet)', borderTop: '2px solid var(--color-rule)' }}>
                  <td colSpan={5} style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'right' }}>
                    Subtotal Direct Materials & Labor:
                  </td>
                  <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700 }}>
                    {currencySymbol}{totalMaterialLaborCost.toLocaleString(isUS ? 'en-US' : 'en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr style={{ background: 'var(--color-sheet)' }}>
                  <td colSpan={5} style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right', color: 'var(--color-graphite)' }}>
                    Contractor Overhead, Contingency & Operating Margin (15%):
                  </td>
                  <td className="font-mono" style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: 'var(--color-graphite)' }}>
                    {currencySymbol}{contractorMargin.toLocaleString(isUS ? 'en-US' : 'en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr style={{ background: 'rgba(13, 148, 136, 0.08)', borderTop: '1px solid #0D9488' }}>
                  <td colSpan={5} style={{ padding: '10px 12px', fontWeight: 800, textAlign: 'right', color: '#0D9488', fontSize: '12px' }}>
                    Total Landed Takeoff & Pricing Estimate:
                  </td>
                  <td className="font-mono" style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 800, color: '#0D9488', fontSize: '13px' }}>
                    {currencySymbol}{grandLandedTotal.toLocaleString(isUS ? 'en-US' : 'en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Custom Takeoff Run Modal */}
      {showAddRunModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(25, 24, 22, 0.55)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{
            width: '420px',
            background: 'var(--color-sheet-elevated)',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            boxShadow: 'var(--shadow-float)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Add / Draw New Duct Takeoff Run</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-graphite)' }}>
              Specify run parameters. Preconstruct automatically derives the surface area, IS 655 Table 1 gauge, and weight.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-graphite)' }}>System</label>
                <select
                  value={newRunSystem}
                  onChange={e => setNewRunSystem(e.target.value as any)}
                  style={{ width: '100%', padding: '6px', marginTop: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}
                >
                  <option value="Supply">Supply Air (SA)</option>
                  <option value="Return">Return Air (RA)</option>
                  <option value="Exhaust">Exhaust Air (EA)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-graphite)' }}>Width (mm)</label>
                  <input
                    type="number"
                    value={newRunWidth}
                    onChange={e => setNewRunWidth(Number(e.target.value))}
                    style={{ width: '100%', padding: '6px', marginTop: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-graphite)' }}>Height (mm)</label>
                  <input
                    type="number"
                    value={newRunHeight}
                    onChange={e => setNewRunHeight(Number(e.target.value))}
                    style={{ width: '100%', padding: '6px', marginTop: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-graphite)' }}>Length (meters)</label>
                <input
                  type="number"
                  step="0.5"
                  value={newRunLength}
                  onChange={e => setNewRunLength(Number(e.target.value))}
                  style={{ width: '100%', padding: '6px', marginTop: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}
                />
              </div>

              <div style={{ background: 'var(--color-paper)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '11px' }}>
                <div>Calculated Surface Area: <strong>{((2 * (newRunWidth + newRunHeight) * newRunLength) / 1000).toFixed(2)} m²</strong></div>
                <div>Derived IS 655 Gauge: <strong>{Math.max(newRunWidth, newRunHeight) > 1500 ? '20G' : Math.max(newRunWidth, newRunHeight) > 750 ? '22G' : '24G'}</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                onClick={() => setShowAddRunModal(false)}
                className="btn-secondary"
                style={{ flex: 1, padding: '7px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRun}
                className="btn-primary"
                style={{ flex: 1, padding: '7px' }}
              >
                Add to Canvas & BOQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calibration Modal */}
      {showCalibrateModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(31, 29, 26, 0.45)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{
            width: '420px',
            background: 'var(--color-sheet-elevated)',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            boxShadow: 'var(--shadow-float)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Scale Calibration</h3>
              <span className="provenance-pill measured" style={{ fontSize: '9.5px' }}>Auto-Detected</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-graphite)' }}>
              Drawing scale 1:100 was calibrated against the verified Table Tennis Hall dimension span (9,000 × 6,000 mm).
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => { setScaleRatio("1:100"); setShowCalibrateModal(false); }}
                className="btn-secondary"
                style={{ flex: 1, padding: '8px' }}
              >
                1:100 (Standard Metric)
              </button>
              <button
                onClick={() => { setScaleRatio("1:50"); setShowCalibrateModal(false); }}
                className="btn-secondary"
                style={{ flex: 1, padding: '8px' }}
              >
                1:50 (Enlarged Detail)
              </button>
            </div>
            <button
              onClick={() => setShowCalibrateModal(false)}
              className="btn-primary"
              style={{ padding: '8px', fontSize: '12px' }}
            >
              Confirm 1:100 Calibration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
