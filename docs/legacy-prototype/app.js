// Vanik Precon: Client-Side Interactive Engine & 2D/3D Hybrid Workspace

(function() {
  // Global State
  const state = {
    viewMode: '2d', // '2d' | '3d'
    activeTab: 'equipment', // 'equipment' | 'ductwork' | 'terminals' | 'dampers' | 'hydronics' | 'boq'
    activeTool: 'select', // 'select' | 'point' | 'line' | 'area' | 'edit'
    scaleRatio: 100, // 1:100
    zoom: 1.0,
    findingsVisible: true,
    selectedRowId: null,
    measurePoints: [],
    sampleData: window.VANIK_SAMPLE_DATA || {}
  };

  // DOM Elements
  const el = {
    btn2D: document.getElementById('btn-2d'),
    btn3D: document.getElementById('btn-3d'),
    panel2D: document.getElementById('panel-2d'),
    panel3D: document.getElementById('panel-3d'),
    canvas: document.getElementById('annotation-canvas'),
    canvasContainer: document.getElementById('canvas-container'),
    blueprintImg: document.getElementById('blueprint-img'),
    tableBody: document.getElementById('table-body'),
    tableHeaders: document.getElementById('table-headers'),
    tableSummary: document.getElementById('table-summary'),
    zoomLabel: document.getElementById('zoom-label'),
    scaleDisplay: document.getElementById('scale-display'),
    batchModal: document.getElementById('batch-modal')
  };

  // --- Event Listeners ---
  function setupEventListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '+' || e.key === '=') window.zoomIn();
      if (e.key === '-') window.zoomOut();
      if (e.key === '0') window.zoomFit();
      if (e.key === 'h' || e.key === 'H') window.toggleFindings();
    });
  }

  // --- Initialize Application ---
  function init() {
    setupEventListeners();
    setupCanvas();
    renderTable();
    init3DViewer();
  }

  // --- View Mode Toggle (2D / 3D) ---
  function setViewMode(mode) {
    state.viewMode = mode;
    if (mode === '3d') {
      el.btn2D.classList.remove('active');
      el.btn3D.classList.add('active');
      el.panel2D.style.display = 'none';
      el.panel3D.style.display = 'flex';
      if (window.resize3D) window.resize3D();
    } else {
      el.btn3D.classList.remove('active');
      el.btn2D.classList.add('active');
      el.panel3D.style.display = 'none';
      el.panel2D.style.display = 'flex';
      draw2DCanvas();
    }
  }

  // --- 2D Canvas & Drawing Engine ---
  function setupCanvas() {
    if (!el.canvas) return;
    
    // Set native canvas resolution
    el.canvas.width = 1200;
    el.canvas.height = 700;
    
    el.canvas.addEventListener('click', handleCanvasClick);
    draw2DCanvas();
  }

  function draw2DCanvas() {
    if (!el.canvas) return;
    const ctx = el.canvas.getContext('2d');
    const w = el.canvas.width;
    const h = el.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw architectural sports arena background layout
    ctx.fillStyle = '#0f1118';
    ctx.fillRect(0, 0, w, h);

    // Boundary walls
    ctx.strokeStyle = '#2d3045';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, w - 80, h - 80);

    // Structural Grids (C1 to C8)
    ctx.strokeStyle = 'rgba(74, 85, 104, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (let x = 120; x < w - 80; x += 140) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, h - 40);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Zones
    // Cricket Nets (Left top)
    ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
    ctx.fillRect(80, 80, 400, 220);
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText("CRICKET PRACTICE NETS (BATSMAN / BOWLER MATS)", 100, 105);

    // Table Tennis & Billiards (Left bottom)
    ctx.fillRect(80, 340, 400, 240);
    ctx.fillText("TABLE TENNIS ARENAS (4 CTS) & BILLIARDS ROOM", 100, 365);

    // Pickleball Courts (Right wing)
    ctx.fillRect(660, 80, 460, 500);
    ctx.fillText("TOURNAMENT PICKLEBALL COURTS 1, 2, 3", 680, 105);

    // Central Circulation Lobby
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(500, 80, 140, 500);
    ctx.fillText("CENTRAL LOBBY & 3.0M PASSAGE", 510, 260);

    if (!state.findingsVisible) return;

    // Draw Equipment Bounding Boxes (AHUs)
    const eqList = state.sampleData.equipment_findings || [];
    for (const eq of eqList) {
      const isSelected = state.selectedRowId === eq.id;
      
      ctx.fillStyle = isSelected ? 'rgba(20, 184, 166, 0.25)' : 'rgba(239, 68, 68, 0.12)';
      ctx.fillRect(eq.x, eq.y, eq.w, eq.h);

      ctx.strokeStyle = isSelected ? '#14b8a6' : '#ef4444';
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.strokeRect(eq.x, eq.y, eq.w, eq.h);

      // Label Tag
      ctx.fillStyle = isSelected ? '#14b8a6' : '#f87171';
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.fillText(eq.tag, eq.x + 4, eq.y + 15);
      ctx.font = '9px Inter, sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`${eq.capacity_tr} TR`, eq.x + 4, eq.y + 28);
    }

    // Draw Ductwork Runs (Supply = Magenta, Return = Green, Exhaust = Orange)
    // Main West Supply Duct
    ctx.strokeStyle = '#d946ef';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(210, 215);
    ctx.lineTo(440, 215);
    ctx.lineTo(440, 290);
    ctx.stroke();

    // Duct Tag
    ctx.fillStyle = '#f0abfc';
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillText("1600x700 CAPSULE SAD (20G) - 25mm INS", 220, 205);

    // East Pickleball Supply Duct
    ctx.strokeStyle = '#d946ef';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(940, 215);
    ctx.lineTo(720, 215);
    ctx.lineTo(720, 480);
    ctx.stroke();
    ctx.fillText("Ø1200mm SPIRAL SUPPLY DUCT", 740, 205);

    // Return Duct (North Perimeter)
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(120, 60);
    ctx.lineTo(1080, 60);
    ctx.stroke();
    ctx.fillStyle = '#86efac';
    ctx.fillText("1250x500 LOW VELOCITY RETURN AIR DUCT", 350, 52);

    // Draw Side Throw Grilles (Comb arrows)
    ctx.strokeStyle = '#d946ef';
    ctx.lineWidth = 2;
    for (let gx = 250; gx <= 420; gx += 40) {
      // Arrow combs
      ctx.beginPath();
      ctx.moveTo(gx, 222);
      ctx.lineTo(gx, 235);
      ctx.lineTo(gx - 3, 230);
      ctx.moveTo(gx, 235);
      ctx.lineTo(gx + 3, 230);
      ctx.stroke();
    }
  }

  function handleCanvasClick(e) {
    const rect = el.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / state.zoom;
    const y = (e.clientY - rect.top) / state.zoom;

    // Check hit test against equipment
    const eqList = state.sampleData.equipment_findings || [];
    let hit = null;
    for (const eq of eqList) {
      if (x >= eq.x && x <= eq.x + eq.w && y >= eq.y && y <= eq.y + eq.h) {
        hit = eq;
        break;
      }
    }

    if (hit) {
      state.selectedRowId = hit.id;
      state.activeTab = 'equipment';
      updateTabButtons();
      renderTable();
      draw2DCanvas();
      highlightTableRow(hit.id);
    }
  }

  function highlightTableRow(id) {
    const rows = el.tableBody.querySelectorAll('tr');
    rows.forEach(tr => {
      if (tr.dataset.id === id) {
        tr.classList.add('selected');
        tr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        tr.classList.remove('selected');
      }
    });
  }

  // --- Table & BOQ Engine ---
  function setActiveTab(tab) {
    state.activeTab = tab;
    updateTabButtons();
    renderTable();
  }

  function updateTabButtons() {
    document.querySelectorAll('.data-tab-btn').forEach(btn => {
      if (btn.dataset.tab === state.activeTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function renderTable() {
    if (!el.tableBody) return;
    el.tableBody.innerHTML = '';

    let headers = [];
    let rowsHtml = '';
    let totalExtended = 0;

    if (state.activeTab === 'equipment') {
      headers = ["Tag", "Type", "Capacity", "Airflow", "Zone", "Confidence"];
      const data = state.sampleData.equipment_findings || [];
      data.forEach(item => {
        const isSel = state.selectedRowId === item.id ? 'selected' : '';
        rowsHtml += `
          <tr data-id="${item.id}" class="${isSel}" onclick="window.selectRow('${item.id}')">
            <td><span class="mono-tag">${item.tag}</span></td>
            <td>${item.type}</td>
            <td class="text-right" style="font-family:var(--font-mono);">${item.capacity_tr} TR</td>
            <td class="text-right" style="font-family:var(--font-mono);">${item.airflow_cfm} CFM</td>
            <td style="color:var(--text-muted);">${item.zone}</td>
            <td><span style="color:var(--status-success); font-weight:600;">${item.confidence}</span></td>
          </tr>
        `;
      });
      el.tableSummary.innerHTML = `Total Equipment Count: <strong>${data.length} Units</strong> · Total Airflow: <strong>55,400 CFM</strong>`;
    } 
    else if (state.activeTab === 'ductwork') {
      headers = ["Tag", "Cross Section", "Length", "Gauge", "Area (m²)", "Insulation", "Total ($)"];
      const data = state.sampleData.duct_measurements || [];
      data.forEach(item => {
        totalExtended += item.total_cost;
        rowsHtml += `
          <tr data-id="${item.id}">
            <td><span class="mono-tag">${item.tag}</span></td>
            <td style="font-family:var(--font-mono);">${item.size_mm}</td>
            <td class="text-right" style="font-family:var(--font-mono);">${item.length_rmt.toFixed(1)} m</td>
            <td><span style="color:#f59e0b; font-weight:600;">${item.gauge}</span></td>
            <td class="text-right" style="font-family:var(--font-mono);">${item.surface_area_sqmt.toFixed(1)}</td>
            <td style="color:var(--text-muted); font-size:10px;">${item.insulation_spec}</td>
            <td class="text-right" style="font-weight:600; color:#fff;">$${item.total_cost.toFixed(2)}</td>
          </tr>
        `;
      });
      el.tableSummary.innerHTML = `Total Sheet Metal Area: <strong>317.08 m²</strong> · Extended Total: <strong>$${totalExtended.toLocaleString(undefined, {minimumFractionDigits: 2})}</strong>`;
    }
    else if (state.activeTab === 'terminals') {
      headers = ["Symbol Mark", "Terminal Specification", "Count", "Unit CFM", "Unit Rate", "Total ($)"];
      const data = state.sampleData.air_terminals || [];
      data.forEach(item => {
        totalExtended += item.total_cost;
        rowsHtml += `
          <tr>
            <td><span class="mono-tag">${item.tag}</span></td>
            <td>${item.type}</td>
            <td class="text-right" style="font-family:var(--font-mono); font-weight:600;">${item.count} ${item.unit}</td>
            <td class="text-right" style="font-family:var(--font-mono);">${item.airflow_cfm}</td>
            <td class="text-right">$${item.unit_rate.toFixed(2)}</td>
            <td class="text-right" style="font-weight:600; color:#fff;">$${item.total_cost.toFixed(2)}</td>
          </tr>
        `;
      });
      el.tableSummary.innerHTML = `Total Grilles & Terminals: <strong>108 Units</strong> · Extended: <strong>$${totalExtended.toLocaleString(undefined, {minimumFractionDigits: 2})}</strong>`;
    }
    else if (state.activeTab === 'boq') {
      headers = ["CSI Code", "Item Description", "Qty", "Unit", "Unit Rate", "Extended Cost"];
      const boqItems = [
        { code: "23 74 13", desc: "Air Handling Units (28 TR / 11,200 CFM DIDW)", qty: 2, unit: "No", rate: 14500, total: 29000 },
        { code: "23 74 13", desc: "Air Handling Units (25.5 TR / 10,200 CFM DIDW)", qty: 2, unit: "No", rate: 13200, total: 26400 },
        { code: "23 74 13", desc: "Circulation Air Handling Unit (20 TR / 8,000 CFM)", qty: 1, unit: "No", rate: 11000, total: 11000 },
        { code: "23 31 13", desc: "Galvanized Sheet Metal Ductwork (20G / 22G)", qty: 317, unit: "m²", rate: 45, total: 14265 },
        { code: "23 07 13", desc: "Internal 25mm Acoustic Nitrile Duct Insulation", qty: 260, unit: "m²", rate: 28, total: 7280 },
        { code: "23 37 13", desc: "Extruded Aluminum Side Throw Linear Grilles", qty: 64, unit: "No", rate: 85, total: 5440 },
        { code: "23 33 13", desc: "Motorized 2-Hour Fire & Smoke Dampers (FDA)", qty: 10, unit: "No", rate: 450, total: 4500 },
        { code: "23 21 13", desc: "MS Chilled Water Piping (65mm NB Class C)", qty: 97, unit: "m", rate: 90, total: 8730 },
        { code: "23 21 16", desc: "AHU Valve Package (PICV, Balancing, Strainer)", qty: 5, unit: "Set", rate: 1850, total: 9250 }
      ];
      boqItems.forEach(item => {
        totalExtended += item.total;
        rowsHtml += `
          <tr>
            <td><span class="mono-tag">${item.code}</span></td>
            <td>${item.desc}</td>
            <td class="text-right" style="font-family:var(--font-mono);">${item.qty}</td>
            <td style="color:var(--text-muted);">${item.unit}</td>
            <td class="text-right">$${item.rate.toFixed(2)}</td>
            <td class="text-right" style="font-weight:600; color:var(--brand-teal);">$${item.total.toLocaleString()}</td>
          </tr>
        `;
      });
      el.tableSummary.innerHTML = `Grand Total Division 23 (First Floor HVAC): <strong style="color:var(--brand-teal); font-size:13px;">$${totalExtended.toLocaleString(undefined, {minimumFractionDigits: 2})}</strong>`;
    }

    // Set headers
    el.tableHeaders.innerHTML = headers.map(h => `<th>${h}</th>`).join('');
    el.tableBody.innerHTML = rowsHtml;
  }

  // --- In-Browser Three.js 3D Viewer ---
  let scene, camera, renderer, controls;
  function init3DViewer() {
    const container = document.getElementById('three-d-canvas-wrap');
    if (!container || !window.THREE) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0b0f);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(30, 25, 40);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    if (window.THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
    }

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(20, 40, 20);
    scene.add(dir);

    // Ground Grid
    const grid = new THREE.GridHelper(60, 60, 0x242533, 0x181922);
    grid.position.y = -0.01;
    scene.add(grid);

    // Build procedural 3D model of Manipal Sports Arena (Columns, Ducts, Slabs)
    buildProceduralBIMModel();

    function animate() {
      requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.resize3D = function() {
      if (!renderer || !camera || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', window.resize3D);
  }

  function buildProceduralBIMModel() {
    const group = new THREE.Group();

    // Floor Slab
    const slabGeo = new THREE.BoxGeometry(45, 0.4, 25);
    const slabMat = new THREE.MeshStandardMaterial({ color: 0x181a24, roughness: 0.8 });
    const slab = new THREE.Mesh(slabGeo, slabMat);
    slab.position.y = -0.2;
    group.add(slab);

    // Structural Columns (C1 to C8)
    const colGeo = new THREE.BoxGeometry(0.8, 6.0, 0.8);
    const colMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.2 });
    for (let x = -20; x <= 20; x += 6.5) {
      for (let z = -10; z <= 10; z += 10) {
        const col = new THREE.Mesh(colGeo, colMat);
        col.position.set(x, 3.0, z);
        group.add(col);
      }
    }

    // Main West Supply Duct (1600x700 Capsule SAD - Magenta)
    const ductMat = new THREE.MeshStandardMaterial({ color: 0xd946ef, metalness: 0.4, roughness: 0.3 });
    const ductGeo = new THREE.BoxGeometry(16, 0.7, 1.6);
    const mainDuct = new THREE.Mesh(ductGeo, ductMat);
    mainDuct.position.set(-10, 4.5, -4);
    group.add(mainDuct);

    // Main East Spiral Duct (Ø1200mm - Magenta cylinder)
    const spiralGeo = new THREE.CylinderGeometry(0.6, 0.6, 18, 16);
    const spiralDuct = new THREE.Mesh(spiralGeo, ductMat);
    spiralDuct.rotation.z = Math.PI / 2;
    spiralDuct.position.set(10, 4.5, 0);
    group.add(spiralDuct);

    // Return Air Header (Green)
    const returnMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, metalness: 0.3, roughness: 0.5 });
    const returnGeo = new THREE.BoxGeometry(38, 0.5, 1.25);
    const returnDuct = new THREE.Mesh(returnGeo, returnMat);
    returnDuct.position.set(0, 5.0, 11);
    group.add(returnDuct);

    // AHUs in Plant Rooms (Red Double-Box)
    const ahuMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.5, roughness: 0.4 });
    const ahu1 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.4, 2.0), ahuMat);
    ahu1.position.set(-19, 1.2, -6);
    group.add(ahu1);

    const ahu2 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.4, 2.0), ahuMat);
    ahu2.position.set(19, 1.2, 6);
    group.add(ahu2);

    scene.add(group);
  }

  // --- Global Window Helpers for HTML Handlers ---
  window.setViewMode = setViewMode;
  window.setActiveTab = setActiveTab;
  
  window.selectRow = function(id) {
    state.selectedRowId = id;
    renderTable();
    draw2DCanvas();
  };

  window.zoomIn = function() {
    state.zoom = Math.min(state.zoom + 0.25, 4.0);
    el.canvasContainer.style.transform = `scale(${state.zoom})`;
    el.zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
  };

  window.zoomOut = function() {
    state.zoom = Math.max(state.zoom - 0.25, 0.25);
    el.canvasContainer.style.transform = `scale(${state.zoom})`;
    el.zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
  };

  window.zoomFit = function() {
    state.zoom = 1.0;
    el.canvasContainer.style.transform = `scale(1.0)`;
    el.zoomLabel.textContent = `100%`;
  };

  window.toggleFindings = function() {
    state.findingsVisible = !state.findingsVisible;
    draw2DCanvas();
  };

  window.openBatchModal = function() {
    if (el.batchModal) el.batchModal.style.display = 'flex';
  };

  window.closeBatchModal = function() {
    if (el.batchModal) el.batchModal.style.display = 'none';
  };

  window.exportExcel = function() {
    alert("Vanik Precon: Exporting complete MasterFormat Division 23 Takeoff to Excel (.xlsx)...");
    // Trigger download of pre-generated master workbook
    window.location.href = "../docs/Vanik_Precon_Master_Blueprint.xlsx";
  };

  window.loadSamplePlan = function() {
    state.selectedRowId = "FF-FA-AHU-01";
    state.activeTab = "equipment";
    updateTabButtons();
    renderTable();
    draw2DCanvas();
    setViewMode('2d');
  };

  // Run on load
  window.addEventListener('DOMContentLoaded', init);
})();
