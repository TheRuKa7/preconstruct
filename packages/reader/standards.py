"""
Preconstruct Engineering Standards & Takeoff Formulas
Implements exact SMACNA HVAC Duct Construction Standards & IS 655:2006 Specification for Sheet Metal Ductwork.
Provides honest provenance tagging: MEASURED (deterministic geometry), READ (OCR/vector text), LOOK (inferred/needs review).
"""

from dataclasses import dataclass
from enum import Enum
import math
from typing import Optional, Tuple, Dict, Any

class ProvenanceState(str, Enum):
    MEASURED = "MEASURED"   # Deterministic CAD geometry, calibrated vector run
    READ = "READ"           # Vector text or high-confidence OCR text
    LOOK = "LOOK"           # Model inference, unverified scale, needs human review
    VOID = "VOID"           # Missing parameter or out-of-spec error

@dataclass
class ProvenanceRecord:
    state: ProvenanceState
    sheet_ref: str
    bbox: Tuple[float, float, float, float]  # [x, y, w, h] normalized or PDF points
    confidence: float
    method: str
    rule_applied: Optional[str] = None

class IS655GaugeTable:
    """
    IS 655:2006 Table 1 - Thickness of Galvanized Steel Duct Sheets
    Based on the largest transverse dimension of rectangular ductwork.
    """
    @staticmethod
    def get_gauge_and_thickness(max_dimension_mm: float) -> Tuple[int, float]:
        """
        Returns (gauge_number, thickness_mm)
        - <= 750 mm: 24 Gauge (0.63 mm)
        - 751 to 1000 mm: 22 Gauge (0.80 mm)
        - 1001 to 1500 mm: 20 Gauge (1.00 mm)
        - 1501 to 2250 mm: 18 Gauge (1.25 mm)
        - > 2250 mm: 16 Gauge (1.60 mm)
        """
        if max_dimension_mm <= 750:
            return 24, 0.63
        elif max_dimension_mm <= 1000:
            return 22, 0.80
        elif max_dimension_mm <= 1500:
            return 20, 1.00
        elif max_dimension_mm <= 2250:
            return 18, 1.25
        else:
            return 16, 1.60

class DuctFormulas:
    @staticmethod
    def rectangular_perimeter_mm(w_mm: float, h_mm: float) -> float:
        """Perimeter = 2 * (Width + Height)"""
        return 2.0 * (w_mm + h_mm)

    @staticmethod
    def capsule_flat_oval_perimeter_mm(major_a_mm: float, minor_b_mm: float) -> float:
        """
        SMACNA 3rd Ed formula for flat-oval / capsule duct:
        Perimeter = 2 * (Major - Minor) + π * Minor
        """
        if major_a_mm < minor_b_mm:
            major_a_mm, minor_b_mm = minor_b_mm, major_a_mm
        return 2.0 * (major_a_mm - minor_b_mm) + math.pi * minor_b_mm

    @staticmethod
    def round_perimeter_mm(diameter_mm: float) -> float:
        """Perimeter = π * Diameter"""
        return math.pi * diameter_mm

    @staticmethod
    def duct_surface_area_sqm(perimeter_mm: float, length_m: float) -> float:
        """Area in square meters = (Perimeter in mm / 1000.0) * Length in meters"""
        return round((perimeter_mm / 1000.0) * length_m, 2)

    @staticmethod
    def insulation_area_sqm(w_mm: float, h_mm: float, length_m: float, insulation_thickness_mm: float = 19.0) -> float:
        """
        Outer surface area calculation for wrapped/lined rectangular ductwork.
        Outer perimeter = 2 * ((W + 2t) + (H + 2t)) = 2 * (W + H) + 8 * t
        """
        outer_perimeter_mm = 2.0 * (w_mm + h_mm) + (8.0 * insulation_thickness_mm)
        return round((outer_perimeter_mm / 1000.0) * length_m, 2)

    @staticmethod
    def sheet_metal_weight_kg(area_sqm: float, thickness_mm: float, wastage_factor: float = 1.10) -> float:
        """
        GI Sheet density is approx 7.85 kg/m² per 1 mm thickness.
        Total Weight = Area * thickness_mm * 7.85 * wastage_factor
        """
        nominal_kg_per_sqm = thickness_mm * 7.85
        return round(area_sqm * nominal_kg_per_sqm * wastage_factor, 2)
