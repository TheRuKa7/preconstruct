"""
Vanik Precon: Pydantic Data Models & Schemas
"""
from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class ComponentFinding(BaseModel):
    id: str
    tag: str
    component_type: str
    capacity_tr: Optional[float] = None
    nominal_cfm: Optional[int] = None
    zone_location: str
    coord_x: float
    coord_y: float
    width: float
    height: float
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    confidence_label: str  # 'High', 'Medium', 'Low'
    spec_notes: Optional[str] = None

class LinearMeasurement(BaseModel):
    id: str
    tag: str
    system_type: str  # 'Supply Air', 'Return Air', 'Exhaust Air', 'Chilled Water'
    cross_section_mm: str
    length_rmt: float
    sheet_metal_gauge: str
    surface_area_sqmt: float
    insulation_type: str
    insulation_area_sqmt: float
    unit_rate_usd: float
    extended_cost_usd: float

class AirTerminalItem(BaseModel):
    tag: str
    terminal_type: str
    count: int
    airflow_cfm_each: int
    unit_rate_usd: float
    total_cost_usd: float

class BOQLineItem(BaseModel):
    csi_code: str
    description: str
    quantity: float
    unit_of_measure: str
    unit_rate_usd: float
    extended_cost_usd: float
    trade_division: str

class TenderAnalysisRequest(BaseModel):
    project_name: str
    discipline: str = "auto"
    scale_calibration_ratio: Optional[float] = 100.0
    enable_vision_language_verification: bool = True

class SubcontractorBid(BaseModel):
    bidder_name: str
    total_bid_amount: float
    included_line_items: List[str]
    explicit_exclusions: List[str]

class BidLevelingResult(BaseModel):
    normalized_bids: Dict[str, float]
    scope_gaps_detected: List[Dict[str, str]]
    recommended_award_bidder: str
    variance_explanation: str
