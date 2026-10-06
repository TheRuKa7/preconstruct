# Vanik Precon: Estimating Standards & Engineering Formulas
*Reference Standards: SMACNA HVAC Duct Construction Standards · IS 655:2006 · ASHRAE Fundamentals*

---

## 1. Sheet Metal Duct Takeoff Formulas

### 1.1 Rectangular Ducts
For a duct with width $W$ (meters) and height $H$ (meters) running a length $L$ (meters):
$$\text{Perimeter } P = 2 \times (W + H)$$
$$\text{Sheet Metal Area } A_{\text{rect}} = P \times L = 2 \times (W + H) \times L$$

### 1.2 Flat-Oval & Capsule Ducts (`CAPSULE SAD`)
A flat-oval duct consists of two semi-circular rounded ends connected by straight flat segments.  
If major axis is $A$ and minor axis is $B$:
$$\text{Flat Segment Length } L_{\text{flat}} = A - B$$
$$\text{Circumference } C_{\text{oval}} = 2 \times (A - B) + \pi \times B$$
$$\text{Sheet Metal Surface Area } A_{\text{oval}} = C_{\text{oval}} \times L$$

*Example from Manipal Sports Complex:*
* $1600 \times 700\text{ mm}$ Capsule Duct:
  $$C_{\text{oval}} = 2 \times (1.60 - 0.70) + 3.1416 \times 0.70 = 2 \times (0.90) + 2.20 = 1.80 + 2.20 = 4.00\text{ m}$$
  *(Notice flat-oval reduces surface area and perimeter compared to a pure rectangular duct of $2(1.6+0.7) = 4.60\text{ m}$, saving 13% in sheet metal and insulation weight!)*

### 1.3 Circular Spiral Ducts
For a duct with diameter $D$ (meters) and length $L$ (meters):
$$A_{\text{circ}} = \pi \times D \times L$$

---

## 2. Galvanized Iron (GI) Sheet Gauge Selection Matrix (SMACNA / IS 655)

The gauge of galvanized iron sheet metal is determined by the **largest cross-sectional dimension** of the duct and the operating static pressure class:

| Maximum Duct Dimension ($mm$) | Low Pressure Class ($< 500\text{ Pa}$) | Medium Pressure Class ($500 - 1000\text{ Pa}$) | Nominal Sheet Thickness ($mm$) | Weight of Sheet ($kg/m^2$) |
| :--- | :--- | :--- | :--- | :--- |
| **Up to 750 mm** | **24 Gauge** | 22 Gauge | $0.63\text{ mm}$ | $4.95\text{ kg/m}^2$ |
| **751 to 1500 mm** | **22 Gauge** | 20 Gauge | $0.80\text{ mm}$ | $6.28\text{ kg/m}^2$ |
| **1501 to 2250 mm** | **20 Gauge** | 18 Gauge | $1.00\text{ mm}$ | $7.85\text{ kg/m}^2$ |
| **2251 mm and above** | **18 Gauge** | 16 Gauge | $1.25\text{ mm}$ | $9.81\text{ kg/m}^2$ |

*Standard Practice Rule in Vanik Engine:*
* All branches $\le 750\text{ mm}$ are assigned **24G**.
* Intermediate trunks $751 - 1500\text{ mm}$ are assigned **22G**.
* Primary AHU supply mains $1501 - 2250\text{ mm}$ (like the $1600 \times 700$ duct) are assigned **20G**.

---

## 3. Thermal & Acoustic Insulation Standards

1. **Internal Acoustic Lining (`25MM INSIDE INSULATION`):**
   * Applied directly to internal duct surfaces with flame-retardant neoprene adhesive and mechanical stick pins (minimum 12 pins per $m^2$).
   * Insulation area equals duct internal surface area $A_{\text{rect}}$ or $A_{\text{oval}}$.
   * Material: Factory-faced open-cell acoustic nitrile foam or $32\text{ kg/m}^3$ resin-bonded fiberglass with black glass-tissue facing.
2. **External Thermal Insulation:**
   * Applied on unlined supply trunks passing through non-conditioned plenums: $19\text{ mm}$ or $25\text{ mm}$ closed-cell elastomeric nitrile rubber with reinforced aluminum foil facing.

---

## 4. Hydronic Chilled Water Hydraulic Formulas

* **Heat Transfer Equation:**
  $$Q = \dot{m} \cdot C_p \cdot \Delta T$$
* **Standard HVAC Metric Sizing:**
  $$\text{Flow Rate } (\text{m}^3/\text{hr}) = \frac{\text{Tons of Refrigeration (TR)} \times 3.024}{\Delta T (^\circ\text{C})}$$
  For standard AHU design at $\Delta T = 5.5^\circ\text{C}$ ($7^\circ\text{C}$ supply, $12.5^\circ\text{C}$ return):
  $$\text{Flow Rate per TR} \approx 0.55\text{ m}^3/\text{hr/TR} \approx 2.42\text{ GPM/TR}$$
* **Pipe Sizing Criteria:**
  Water velocity maintained between $1.2\text{ m/s}$ and $2.4\text{ m/s}$ to minimize pipe erosion and friction head loss.
  * For **28 TR AHU**: Flow rate $= 15.4\text{ m}^3/\text{hr}$ ($67.8\text{ GPM}$) $\to$ Sized at **$65\text{ mm}$ ($2.5"$) NB pipe**.
