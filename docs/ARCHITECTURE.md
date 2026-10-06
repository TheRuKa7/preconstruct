# Vanik Precon: System Architecture Specification

---

## 1. High-Level Architecture Overview

```mermaid
graph TD
    subgraph Client Tier [Modern Web Client: Desktop & Tablet]
        UI[Vanik Precon App Shell] --> Canvas2D[HTML5 / WebGL 2D Blueprint Canvas]
        UI --> Viewer3D[Three.js 0.160 + Web-IFC WASM 3D Engine]
        UI --> Grid[AG Grid Enterprise WBS & BOQ]
        UI --> BatchView[Unified Multi-Trade Tender Dashboard]
    end

    subgraph Edge & Gateway [Edge Layer]
        CDN[Cloudflare CDN & WAF] --> Gateway[Traefik / NGINX Ingress]
        Gateway --> Auth[SAML 2.0 / OIDC / JWT Auth Provider]
    end

    subgraph API & Orchestration Tier [FastAPI Cluster]
        Gateway --> API[FastAPI Async Server: Python 3.12]
        API --> WS[WebSocket Real-Time Progress Telemetry]
        API --> Queue[Redis Task Broker & Cache]
    end

    subgraph Worker & AI Inference Tier [Celery GPU/CPU Worker Fleet]
        Queue --> W1[Worker Pool: Document Ingestion & PyPDF Tiling]
        Queue --> W2[Worker Pool: OpenCV Vector Layer & Line Segmentation]
        Queue --> W3[Worker Pool: YOLOv11 Symbol Detection & NER]
        Queue --> W4[Worker Pool: DDC cad2data & IfcOpenShell Engine]
    end

    subgraph Data & Knowledge Tier [Persistent Storage]
        API & W1 & W4 --> SQL[(PostgreSQL 16: Multi-Tenant & RBAC)]
        API & W3 --> VectorDB[(pgvector: MasterFormat & Spec Embeddings)]
        API & W1 --> BlobStore[(S3 / Cloudflare R2: Vector PDFs & 3D Models)]
        W4 --> CWICR[(CWICR Cost Lake: 55,719 Items & Rates)]
    end

    UI <-->|HTTPS REST & WSS| Gateway
```

---

## 2. Component Subsystems

### 2.1 2D Drawing Engine Subsystem
* **Rendering Strategy:** Combines an SVG/Vector path parsing pass with an HTML5 `<canvas>` rendering loop running in an `OffscreenCanvas` Web Worker.
* **Coordinate Mapping:** Transforms raw PDF points (1/72 inch) into canvas viewport pixels at variable zoom levels ($0.1\times$ to $8.0\times$) while maintaining sub-millimeter precision.
* **Bounding Box Indexing:** Spatial R-Tree index stored in client memory maps every extracted text label, diffuser, and fire damper symbol to a unique screen coordinate for instantaneous hover response and table sync.

### 2.2 In-Browser 3D BIM Subsystem
* **Zero-Server Processing:** Uses `web-ifc` compiled to WebAssembly (`web-ifc.wasm`), running directly inside the user's browser.
* **Memory Management:** Geometry meshes are extracted into typed `Float32Array` buffers and attached to Three.js `BufferGeometry` instances.
* **Property Tree Inspection:** Queries IFC STEP entity records (`IFCWALL`, `IFCDUCTSEGMENT`, `IFCVALVE`) to retrieve manufacturer names, fire ratings, dimensions, and system classifications.

### 2.3 5-Layer AI Pipeline
```
[Raw Blueprints]
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ Layer 1: Spatial OCR & Document Preprocessing          │  Extracts text strings and coordinates
└────────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ Layer 2: Named Entity Recognition (CSI MasterFormat)   │  Identifies AHUs, diffusers, dampers
└────────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ Layer 3: CAD Vector Color-Layer Classification        │  Segments Supply, Return, and Exhaust
└────────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ Layer 4: Vision-Language Model Symbol Detection       │  Finds unlabeled icons via YOLOv11
└────────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ Layer 5: Parametric SMACNA / Engineering Rules         │  Computes sheet gauge & insulation m²
└────────────────────────────────────────────────────────┘
       │
       ▼
[Structured WBS / BOQ Table]
```

---

## 3. Data Schema & Entities

```mermaid
erDiagram
    ORGANIZATION ||--o{ PROJECT : owns
    PROJECT ||--o{ TENDER_PACKAGE : contains
    TENDER_PACKAGE ||--o{ DRAWING_SHEET : includes
    TENDER_PACKAGE ||--o{ BIM_MODEL : includes
    DRAWING_SHEET ||--o{ COMPONENT_FINDING : detects
    DRAWING_SHEET ||--o{ LINEAR_MEASUREMENT : tracks
    TENDER_PACKAGE ||--o{ BOQ_LINE_ITEM : aggregates
    COMPONENT_FINDING }o--|| CWICR_COST_ITEM : maps_to

    ORGANIZATION {
        uuid id PK
        string name
        string enterprise_tier
        jsonb settings
    }

    PROJECT {
        uuid id PK
        uuid org_id FK
        string project_name
        string location_city
        string currency
    }

    DRAWING_SHEET {
        uuid id PK
        uuid package_id FK
        string sheet_number
        string discipline_trade
        float scale_ratio
        int page_number
    }

    COMPONENT_FINDING {
        uuid id PK
        uuid sheet_id FK
        string tag
        string symbol_type
        float coord_x
        float coord_y
        string confidence_level
    }

    BOQ_LINE_ITEM {
        uuid id PK
        uuid package_id FK
        string csi_code
        string description
        float quantity
        string unit_of_measure
        float unit_rate
        float extended_cost
    }
```

---

## 4. Security & Compliance Baseline
* **Authentication:** SAML 2.0 / OpenID Connect with multi-factor authentication (MFA).
* **Authorization:** Role-Based Access Control (RBAC) enforced at database query level using PostgreSQL Row-Level Security (RLS).
* **Data Privacy:** Customer blueprint files and bid pricing datasets are never used to train public foundational AI models.
* **Encryption:** AES-256 GCM encryption at rest in storage buckets; TLS 1.3 encryption for all network traffic.
