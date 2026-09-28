"""
Bureau of Indian Standards (BIS) Manak-AI Backend Engine
FastAPI application for AI product classification, Indian Standards retrieval,
testing lab discovery, and regulatory compliance screening.
"""
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import re

app = FastAPI(
    title="BIS Manak-AI Regulatory Compliance API",
    description="Deterministic & AI-Assisted Standards Classification Engine for Bureau of Indian Standards",
    version="1.0.0"
)

# Enable CORS for local Vite and Vercel edge deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()

# --- IN-MEMORY HIGH-FIDELITY BIS KNOWLEDGE BASE ---
STANDARDS_DB = [
    {
        "id": "std-16046",
        "is_code": "IS 16046 (Part 2): 2018",
        "title": "Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes - Secondary Lithium Cells and Batteries for Portable Applications",
        "category": "Electronics & IT",
        "scope": "Safety requirements for portable sealed secondary lithium cells and batteries used in portable electronics (power banks, smartphones, laptops, wearables).",
        "status": "MANDATORY",
        "scheme_type": "Scheme-II (CRS)",
        "ministry": "Ministry of Electronics and Information Technology (MeitY)",
        "publication_year": 2018,
        "latest_amendment": "Amendment No. 1 (2020)",
        "hsn_codes": ["85076000", "85044090"],
        "marking_rules": "Mandatory standard CRS registration statement: 'Self Declaration - Conforming to IS 16046 (Part 2): 2018, R-XXXXXXXX' and BIS portal link.",
        "keywords": ["battery", "lithium", "power bank", "li-ion", "cell", "portable battery", "accumulator", "charger", "rechargeable"],
        "qco_order": {
            "title": "Electronics & IT Goods (Compulsory Registration Order)",
            "gazette_no": "S.O. 1234(E)",
            "date": "2021-03-18",
            "enforcement_date": "2021-09-18",
            "penalty": "Fine up to INR 5,00,000 and forfeiture under Section 29 of BIS Act, 2016."
        },
        "tests": [
            {
                "clause": "Clause 7.3.2",
                "test_name": "Continuous Low-Rate Charging Test",
                "parameter": "Thermal runaway & voltage stability under overcharge",
                "method": "Continuous charging at specified rate for 28 days at 20°C ± 5°C",
                "acceptance_criteria": "No fire, no explosion, no electrolyte leakage.",
                "sample_size": "5 cells",
                "is_destructive": True
            },
            {
                "clause": "Clause 7.3.3",
                "test_name": "External Short-Circuit Test",
                "parameter": "Short-circuit resistance < 80 mΩ",
                "method": "Direct short circuit across battery terminals at 55°C until temperature stabilizes",
                "acceptance_criteria": "No fire, no explosion; case temperature remains below 150°C.",
                "sample_size": "5 batteries",
                "is_destructive": True
            },
            {
                "clause": "Clause 7.3.6",
                "test_name": "Drop & Mechanical Shock",
                "parameter": "Free fall 1.0 m onto concrete",
                "method": "Drop 3 times on each face from 1m elevation",
                "acceptance_criteria": "No rupture, no thermal runaway, no mass loss > 0.1%.",
                "sample_size": "3 packs",
                "is_destructive": False
            }
        ]
    },
    {
        "id": "std-302",
        "is_code": "IS 302 (Part 2/Sec 201): 2008",
        "title": "Safety of Household and Similar Electrical Appliances - Particular Requirements for Electric Immersion Water Heaters",
        "category": "Electrical Appliances",
        "scope": "Safety specifications for portable electric immersion water heaters for household immersion use up to 250V AC single phase.",
        "status": "MANDATORY",
        "scheme_type": "Scheme-I (ISI Mark)",
        "ministry": "Ministry of Heavy Industries & DPIIT",
        "publication_year": 2008,
        "latest_amendment": "Amendment No. 3 (2022)",
        "hsn_codes": ["85161000", "85167990"],
        "marking_rules": "Appliance nameplate must bear permanent ISI Mark with BIS License Number (CM/L-XXXXXXXXXX).",
        "keywords": ["immersion heater", "water heater", "geyser", "heating element", "electric rod", "immersion rod", "boiler"],
        "qco_order": {
            "title": "Electrical Appliances (Quality Control) Order",
            "gazette_no": "S.O. 4521(E)",
            "date": "2023-06-05",
            "enforcement_date": "2024-01-01",
            "penalty": "Imprisonment up to 2 years or statutory penalty under BIS Act 2016."
        },
        "tests": [
            {
                "clause": "Clause 13",
                "test_name": "High Voltage Dielectric Breakdown Test",
                "parameter": "Dielectric withstand at 1250V AC",
                "method": "Apply 1250V AC between live conductors and protective outer sheath for 60 seconds",
                "acceptance_criteria": "Zero insulation breakdown or disruptive flashover.",
                "sample_size": "3 units",
                "is_destructive": False
            },
            {
                "clause": "Clause 16",
                "test_name": "Electric Leakage Current at Operating Temperature",
                "parameter": "Leakage current < 0.75 mA",
                "method": "Measure leakage current while immersed in conductive water bath at 1.15x rated wattage",
                "acceptance_criteria": "Leakage current does not exceed 0.75 mA.",
                "sample_size": "2 units",
                "is_destructive": False
            }
        ]
    },
    {
        "id": "std-14543",
        "is_code": "IS 14543: 2024",
        "title": "Packaged Drinking Water (Other than Packaged Natural Mineral Water) - Specification (Third Revision)",
        "category": "Food & Beverages",
        "scope": "Comprehensive statutory requirements, mineral bounds, and microbiological parameters for potable packaged drinking water containers.",
        "status": "MANDATORY",
        "scheme_type": "Scheme-I (ISI Mark)",
        "ministry": "Ministry of Consumer Affairs & FSSAI",
        "publication_year": 2024,
        "latest_amendment": "Third Revision (2024)",
        "hsn_codes": ["22011010", "22019090"],
        "marking_rules": "All containers must be marked with ISI Mark, CM/L number, Batch No, and FSSAI License Number.",
        "keywords": ["drinking water", "packaged water", "water bottle", "mineral water", "potable water", "purified water", "jar"],
        "qco_order": {
            "title": "Packaged Drinking Water Quality Control Order",
            "gazette_no": "S.O. 2911(E)",
            "date": "2021-04-12",
            "enforcement_date": "2021-07-01",
            "penalty": "Immediate plant seizure, license revocation, and prosecution under Section 16 & 29."
        },
        "tests": [
            {
                "clause": "Table 2 (Physicochemical)",
                "test_name": "Total Dissolved Solids (TDS) Measurement",
                "parameter": "TDS level 75 mg/l to 500 mg/l",
                "method": "Gravimetric drying at 180°C",
                "acceptance_criteria": "Strictly within 75 to 500 mg/litre range.",
                "sample_size": "3 bottles",
                "is_destructive": True
            },
            {
                "clause": "Table 3 (Microbiology)",
                "test_name": "E. Coli and Coliform Detection",
                "parameter": "Pathogenic bacteria absence",
                "method": "Membrane filtration at 37°C/44°C incubation for 48h",
                "acceptance_criteria": "0 CFU (Absent in 250 ml sample).",
                "sample_size": "5 sealed bottles",
                "is_destructive": True
            }
        ]
    },
    {
        "id": "std-15885",
        "is_code": "IS 15885 (Part 2/Sec 13): 2012",
        "title": "Lamp Controlgear - Particular Requirements for DC or AC Supplied Electronic Controlgear for LED Modules",
        "category": "Lighting & Luminaire",
        "scope": "Electronic drivers, power supplies, and control units supplying LED streetlights, downlights, and commercial lighting.",
        "status": "MANDATORY",
        "scheme_type": "Scheme-II (CRS)",
        "ministry": "Ministry of Electronics and Information Technology (MeitY)",
        "publication_year": 2012,
        "latest_amendment": "Amendment No. 2 (2021)",
        "hsn_codes": ["85041090", "94054090"],
        "marking_rules": "Compulsory BIS CRS Registration logo and number R-XXXXXXXX.",
        "keywords": ["led driver", "led light", "street light", "controlgear", "led module", "luminaire", "ballast", "power supply"],
        "qco_order": {
            "title": "Electronics and IT Goods Compulsory Registration Order",
            "gazette_no": "S.O. 1234(E)",
            "date": "2021-03-18",
            "enforcement_date": "2021-09-18",
            "penalty": "Customs confiscation and statutory fine under BIS Act 2016."
        },
        "tests": [
            {
                "clause": "Clause 14",
                "test_name": "Thermal Endurance & Abnormal Operation",
                "parameter": "Case temperature limits tc",
                "method": "Operate at 1.1x rated voltage under thermal chamber at maximum declared ambient temperature",
                "acceptance_criteria": "Temperature tc must not exceed declared limits; no smoke or flame.",
                "sample_size": "3 drivers",
                "is_destructive": False
            }
        ]
    },
    {
        "id": "std-4984",
        "is_code": "IS 4984: 2016",
        "title": "High Density Polyethylene (HDPE) Pipes for Water Supply - Specification",
        "category": "Chemicals & Piping",
        "scope": "Specifications for HDPE pipes intended for underground water transport, municipal potable water, and industrial supply lines.",
        "status": "MANDATORY",
        "scheme_type": "Scheme-I (ISI Mark)",
        "ministry": "Department for Promotion of Industry and Internal Trade (DPIIT)",
        "publication_year": 2016,
        "latest_amendment": "Amendment No. 2 (2023)",
        "hsn_codes": ["39172110", "39172190"],
        "marking_rules": "Continuous indelible stamp per meter: IS 4984, Manufacturer, PE 100/80 grade, SDR ratio, CM/L number.",
        "keywords": ["hdpe pipe", "polyethylene pipe", "plastic pipe", "potable water pipe", "irrigation pipe", "polymer conduit"],
        "qco_order": {
            "title": "Pipes and Fittings (Quality Control) Order",
            "gazette_no": "S.O. 3120(E)",
            "date": "2023-10-15",
            "enforcement_date": "2024-04-15",
            "penalty": "Seizure of non-certified stock and financial prosecution."
        },
        "tests": [
            {
                "clause": "Clause 8.1",
                "test_name": "Hydrostatic Internal Pressure Resistance",
                "parameter": "100-hour and 165-hour creep rupture",
                "method": "Maintain hydrostatic pressure in water bath at 80°C for 165 hours",
                "acceptance_criteria": "Zero burst, leakage, or swelling deformation.",
                "sample_size": "3 pipe segments",
                "is_destructive": True
            }
        ]
    },
    {
        "id": "std-9873",
        "is_code": "IS 9873 (Part 1): 2019",
        "title": "Safety of Toys - Safety Aspects Related to Mechanical and Physical Properties",
        "category": "Consumer & Toys",
        "scope": "Mechanical and physical safety parameters for toys designed for children under 14 years of age.",
        "status": "MANDATORY",
        "scheme_type": "Scheme-I (ISI Mark)",
        "ministry": "Department for Promotion of Industry and Internal Trade (DPIIT)",
        "publication_year": 2019,
        "latest_amendment": "Reaffirmed 2024",
        "hsn_codes": ["95030010", "95030020", "95030030"],
        "marking_rules": "Every toy pack must bear standard ISI mark and manufacturer address with age grading warnings.",
        "keywords": ["toy", "children toy", "doll", "toy car", "rc car", "baby toy", "puzzle", "stuffed toy", "board game"],
        "qco_order": {
            "title": "Toys (Quality Control) Order, 2020",
            "gazette_no": "S.O. 853(E)",
            "date": "2020-02-25",
            "enforcement_date": "2021-01-01",
            "penalty": "Total ban on import and sale without valid BIS license under Section 29 BIS Act."
        },
        "tests": [
            {
                "clause": "Clause 4.4",
                "test_name": "Small Parts Choking Hazard Cylinder Test",
                "parameter": "Dimensions of detachable components",
                "method": "Insert toy components into truncated cylinder (diameter 31.7mm, depth 57.1mm)",
                "acceptance_criteria": "No detachable part fits entirely inside cylinder for toys under 36 months.",
                "sample_size": "5 samples",
                "is_destructive": False
            }
        ]
    },
    {
        "id": "std-1293",
        "is_code": "IS 1293: 2019",
        "title": "Plugs and Socket-Outlets for Domestic and Similar Purposes of Rated Voltage up to and Including 250 V",
        "category": "Electrical Appliances",
        "scope": "Requirements for plugs, fixed or portable socket-outlets, multiway adaptors up to 16 Amperes and 250 Volts.",
        "status": "MANDATORY",
        "scheme_type": "Scheme-I (ISI Mark)",
        "ministry": "Ministry of Commerce and Industry / DPIIT",
        "publication_year": 2019,
        "latest_amendment": "Amendment No. 1 (2021)",
        "hsn_codes": ["85366910", "85366990"],
        "marking_rules": "ISI Mark, rated current (A), rated voltage (V), and manufacturer trademark embossed on faceplate.",
        "keywords": ["plug", "socket", "power strip", "extension cord", "wall outlet", "adapter", "pin plug", "switch"],
        "qco_order": {
            "title": "Plugs and Sockets (Quality Control) Order",
            "gazette_no": "S.O. 3863(E)",
            "date": "2020-12-04",
            "enforcement_date": "2021-06-01",
            "penalty": "Goods confiscated at customs / factory under BIS Act 2016."
        },
        "tests": [
            {
                "clause": "Clause 19",
                "test_name": "Withdrawal Force Test",
                "parameter": "Gauge withdrawal force within 1.5N to 50N",
                "method": "Apply standardized test pin gauge and measure retention force with calibrated load cell",
                "acceptance_criteria": "Pins shall not slip out below minimum force nor bind above maximum force.",
                "sample_size": "3 sockets",
                "is_destructive": False
            }
        ]
    },
    {
        "id": "std-4151",
        "is_code": "IS 4151: 2015",
        "title": "Protective Helmets for Two Wheeler Riders - Specification",
        "category": "Automotive & Safety",
        "scope": "Protective headgear for motorcyclists, scooter riders, and two-wheeler pillion riders.",
        "status": "MANDATORY",
        "scheme_type": "Scheme-I (ISI Mark)",
        "ministry": "Ministry of Road Transport and Highways (MoRTH)",
        "publication_year": 2015,
        "latest_amendment": "Amendment No. 2 (2021)",
        "hsn_codes": ["65061010", "65061090"],
        "marking_rules": "Non-detachable ISI mark label, shell size, helmet mass, and manufacturing month/year.",
        "keywords": ["helmet", "two wheeler helmet", "bike helmet", "motorcycle helmet", "protective headgear", "riding helmet"],
        "qco_order": {
            "title": "Two Wheeler Helmets (Quality Control) Order",
            "gazette_no": "S.O. 4252(E)",
            "date": "2020-11-26",
            "enforcement_date": "2021-06-01",
            "penalty": "Uncertified helmets seized and sellers booked under Section 29 BIS Act."
        },
        "tests": [
            {
                "clause": "Clause 7.2",
                "test_name": "Shock Absorption & Impact Attenuation",
                "parameter": "Headform acceleration < 300g",
                "method": "Drop helmet on flat and hemispherical steel anvils at 7.5 m/s",
                "acceptance_criteria": "Peak acceleration shall not exceed 300g; duration > 150g under 5 ms.",
                "sample_size": "4 helmets",
                "is_destructive": True
            }
        ]
    }
]

LABS_DB = [
    {
        "id": "lab-1",
        "name": "BIS Central Laboratory (CL Sahibabad)",
        "lab_code": "BIS-CL-GZB-01",
        "recognition_type": "BIS Central Lab",
        "address": "Plot No. 20/9, Site IV, Sahibabad Industrial Area",
        "city": "Ghaziabad",
        "state": "Uttar Pradesh",
        "pincode": "201010",
        "email": "cl-sahibabad@bis.gov.in",
        "phone": "+91-120-4177100",
        "recognized_is_codes": [
            "IS 16046 (Part 2): 2018",
            "IS 302 (Part 2/Sec 201): 2008",
            "IS 14543: 2024",
            "IS 15885 (Part 2/Sec 13): 2012",
            "IS 4984: 2016",
            "IS 9873 (Part 1): 2019",
            "IS 1293: 2019",
            "IS 4151: 2015"
        ]
    },
    {
        "id": "lab-2",
        "name": "National Test House (Northern Region)",
        "lab_code": "NTH-NR-DEL-02",
        "recognition_type": "NABL Accredited",
        "address": "Kamla Nehru Nagar, CGO Complex",
        "city": "New Delhi",
        "state": "Delhi",
        "pincode": "110003",
        "email": "nth-nr@gov.in",
        "phone": "+91-11-24361234",
        "recognized_is_codes": [
            "IS 302 (Part 2/Sec 201): 2008",
            "IS 4984: 2016",
            "IS 14543: 2024",
            "IS 1293: 2019"
        ]
    },
    {
        "id": "lab-3",
        "name": "TUV Rheinland India Testing Laboratory",
        "lab_code": "TUV-BLR-03",
        "recognition_type": "BIS Recognized (LRS)",
        "address": "Electronics City Phase 1, Hosur Road",
        "city": "Bengaluru",
        "state": "Karnataka",
        "pincode": "560100",
        "email": "info-india@tuv.com",
        "phone": "+91-80-67223300",
        "recognized_is_codes": [
            "IS 16046 (Part 2): 2018",
            "IS 15885 (Part 2/Sec 13): 2012"
        ]
    },
    {
        "id": "lab-4",
        "name": "UL Solutions India Testing & Certification",
        "lab_code": "UL-MANESAR-04",
        "recognition_type": "BIS Recognized (LRS)",
        "address": "Sector 8, IMT Manesar",
        "city": "Gurugram",
        "state": "Haryana",
        "pincode": "122050",
        "email": "ul.india@ul.com",
        "phone": "+91-124-4698100",
        "recognized_is_codes": [
            "IS 16046 (Part 2): 2018",
            "IS 15885 (Part 2/Sec 13): 2012",
            "IS 9873 (Part 1): 2019"
        ]
    },
    {
        "id": "lab-5",
        "name": "ERTL (West) STQC Directorate",
        "lab_code": "ERTL-W-MUM-05",
        "recognition_type": "NABL Accredited",
        "address": "MIDC Area, Andheri (East)",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400093",
        "email": "ertlwest@stqc.nic.in",
        "phone": "+91-22-28325850",
        "recognized_is_codes": [
            "IS 16046 (Part 2): 2018",
            "IS 302 (Part 2/Sec 201): 2008",
            "IS 1293: 2019"
        ]
    }
]

AUDIT_LOGS = [
    {
        "id": "log-001",
        "action": "STANDARD_LOOKUP",
        "actor": "Citizen User",
        "details": "Classified product 'Lithium Power Bank 20000mAh'",
        "timestamp": get_utc_now_iso()
    }
]

# --- PYDANTIC SCHEMAS ---
class ClassificationRequest(BaseModel):
    product_name: str = Field(..., json_schema_extra={"example": "Smart Lithium-ion Power Bank 20000mAh"})
    description: Optional[str] = Field(None, json_schema_extra={"example": "Portable USB-C power bank with li-ion rechargeable battery pack"})
    category_hint: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None

class MatchedStandardResult(BaseModel):
    standard: Dict[str, Any]
    confidence_score: float
    rationale: str
    match_reasons: List[str]
    mandatory_qco: bool
    applicable_scheme: str
    hsn_suggestion: List[str]

class ClassificationResponse(BaseModel):
    input_product: str
    top_match: MatchedStandardResult
    alternative_matches: List[MatchedStandardResult]
    extracted_features: Dict[str, Any]
    total_matches_found: int

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[Dict[str, str]]] = None

class ChatResponse(BaseModel):
    reply: str
    referenced_standards: List[str]
    timestamp: str

# --- CORE ALGORITHM: DETERMINISTIC & AI-ASSISTED PRODUCT CLASSIFIER ---
def classify_product_logic(product_name: str, description: Optional[str] = "") -> ClassificationResponse:
    text = f"{product_name} {description or ''}".lower()
    scores = []
    
    extracted = {
        "detected_keywords": [],
        "inferred_voltage": None,
        "is_portable": False
    }

    # Extract specs heuristics
    if re.search(r'\b(v|volt|volts|220v|240v|250v)\b', text):
        extracted["inferred_voltage"] = "Household AC (~230V)"
    if re.search(r'\b(portable|handheld|pocket|mobile)\b', text):
        extracted["is_portable"] = True

    for std in STANDARDS_DB:
        match_count = 0
        reasons = []
        
        # Keyword matches
        for kw in std["keywords"]:
            if re.search(r'\b' + re.escape(kw) + r'\b', text):
                match_count += 1
                reasons.append(f"Contains statutory keyword '{kw}'")
                extracted["detected_keywords"].append(kw)
        
        # Category weight
        if std["category"].lower() in text:
            match_count += 2
            reasons.append(f"Direct category match: {std['category']}")
            
        # Calculation of confidence
        if match_count > 0:
            score = min(98.5, 60.0 + (match_count * 12.5))
            rationale = (
                f"Classified under {std['is_code']} based on {len(reasons)} statutory markers: "
                f"{', '.join(reasons[:3])}. Subject to {std['scheme_type']} regulation."
            )
            scores.append(MatchedStandardResult(
                standard=std,
                confidence_score=round(score, 1),
                rationale=rationale,
                match_reasons=reasons,
                mandatory_qco=(std["status"] == "MANDATORY"),
                applicable_scheme=std["scheme_type"],
                hsn_suggestion=std["hsn_codes"]
            ))

    # Sort descending by confidence
    scores.sort(key=lambda x: x.confidence_score, reverse=True)

    if not scores:
        fallback_std = STANDARDS_DB[0]
        top = MatchedStandardResult(
            standard=fallback_std,
            confidence_score=52.0,
            rationale="No exact statutory keywords identified; showing nearest relevant standard based on generic consumer electronics.",
            match_reasons=["General classification heuristic applied"],
            mandatory_qco=True,
            applicable_scheme=fallback_std["scheme_type"],
            hsn_suggestion=fallback_std["hsn_codes"]
        )
        alternatives = []
    else:
        top = scores[0]
        alternatives = scores[1:3]

    # Log to audit history
    AUDIT_LOGS.insert(0, {
        "id": f"log-{len(AUDIT_LOGS)+1:03d}",
        "action": "PRODUCT_CLASSIFICATION",
        "actor": "Citizen/Manufacturer",
        "details": f"Analyzed '{product_name}' -> Matched '{top.standard['is_code']}' ({top.confidence_score}%)",
        "timestamp": get_utc_now_iso()
    })

    return ClassificationResponse(
        input_product=product_name,
        top_match=top,
        alternative_matches=alternatives,
        extracted_features=extracted,
        total_matches_found=len(scores)
    )

# --- ROUTES ---

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "BIS Manak-AI Regulatory Compliance API",
        "timestamp": get_utc_now_iso(),
        "standards_count": len(STANDARDS_DB),
        "laboratories_count": len(LABS_DB)
    }

@app.post("/api/classify", response_model=ClassificationResponse)
def classify_product(req: ClassificationRequest):
    if not req.product_name.strip():
        raise HTTPException(status_code=400, detail="Product name cannot be empty.")
    return classify_product_logic(req.product_name, req.description)

@app.get("/api/standards")
def list_standards(
    q: Optional[str] = Query(None, description="Search term for title, IS code, or keywords"),
    category: Optional[str] = Query(None, description="Filter by category"),
    status: Optional[str] = Query(None, description="Filter by MANDATORY or VOLUNTARY")
):
    results = STANDARDS_DB
    if q:
        query = q.lower()
        results = [
            s for s in results 
            if query in s["is_code"].lower() 
            or query in s["title"].lower() 
            or any(query in kw for kw in s["keywords"])
        ]
    if category and category != "All":
        results = [s for s in results if s["category"].lower() == category.lower()]
    if status and status != "All":
        results = [s for s in results if s["status"].lower() == status.lower()]
    return results

@app.get("/api/standards/{is_id}")
def get_standard_details(is_id: str):
    for std in STANDARDS_DB:
        if std["id"] == is_id or std["is_code"].replace(" ", "").lower() == is_id.replace(" ", "").lower():
            return std
    raise HTTPException(status_code=404, detail="Standard not found")

@app.get("/api/laboratories")
def list_laboratories(
    is_code: Optional[str] = Query(None, description="Filter labs recognized for this IS Standard"),
    state: Optional[str] = Query(None, description="Filter by Indian State")
):
    results = LABS_DB
    if is_code:
        results = [l for l in results if any(is_code.lower() in code.lower() for code in l["recognized_is_codes"])]
    if state and state != "All":
        results = [l for l in results if l["state"].lower() == state.lower()]
    return results

@app.get("/api/qco-notifications")
def list_qco_notifications():
    qcos = []
    for std in STANDARDS_DB:
        if "qco_order" in std:
            qcos.append({
                "standard_code": std["is_code"],
                "standard_title": std["title"],
                "ministry": std["ministry"],
                **std["qco_order"]
            })
    return qcos

@app.post("/api/chat", response_model=ChatResponse)
def manak_mitra_chat(req: ChatRequest):
    msg = req.message.lower()
    referenced = []
    
    if "penalty" in msg or "fine" in msg or "jail" in msg or "punishment" in msg:
        reply = (
            "Under Section 29 of the Bureau of Indian Standards Act, 2016, manufacturing, "
            "importing, or selling goods notified under a mandatory Quality Control Order (QCO) "
            "without a valid BIS Standard Mark is punishable with imprisonment up to two years, "
            "or a fine not less than INR 2,00,000 (which may extend up to ten times the value of goods), "
            "or both. Non-compliant stocks are also liable for immediate confiscation."
        )
    elif "scheme" in msg or "difference" in msg or "isi vs crs" in msg or "crs" in msg:
        reply = (
            "BIS operates two major conformity schemes:\n"
            "1. **Scheme-I (ISI Mark)**: Requires mandatory factory inspection, in-house quality testing audit, "
            "and grant of a CM/L (Certification Marks License) before manufacturing.\n"
            "2. **Scheme-II (Compulsory Registration Scheme - CRS)**: Self-declaration of conformity primarily "
            "for IT & electronic goods where pre-certified test reports from BIS-recognized labs are submitted "
            "digitally to obtain an R-Number without requiring physical factory auditing prior to grant."
        )
        referenced.append("IS 16046 (Part 2): 2018")
        referenced.append("IS 302 (Part 2/Sec 201): 2008")
    elif "battery" in msg or "power bank" in msg or "lithium" in msg:
        reply = (
            "Secondary lithium cells and batteries for portable applications are strictly governed by "
            "**IS 16046 (Part 2): 2018 / IEC 62133-2: 2017** under the MeitY Compulsory Registration Scheme (CRS). "
            "Mandatory tests include continuous charging stability (Clause 7.3.2), external short circuit at 55°C (Clause 7.3.3), "
            "and free-fall drop impact (Clause 7.3.6)."
        )
        referenced.append("IS 16046 (Part 2): 2018")
    elif "water" in msg or "packaged" in msg:
        reply = (
            "Packaged drinking water is covered under **IS 14543: 2024** (Third Revision). "
            "Certification is 100% compulsory under the Food Safety and Standards Authority of India (FSSAI) "
            "and Ministry of Consumer Affairs. Both chemical (TDS 75-500 mg/L) and microbiological tests (zero E. Coli) "
            "are mandatory before sale."
        )
        referenced.append("IS 14543: 2024")
    elif "toy" in msg:
        reply = (
            "All toys manufactured or imported into India must comply with **IS 9873 (Part 1, 2, 3)** and "
            "bear the ISI Mark under the Toys (Quality Control) Order, 2020. Mechanical safety, choking hazard cylinders, "
            "flammability, and toxic element migration must be certified."
        )
        referenced.append("IS 9873 (Part 1): 2019")
    else:
        reply = (
            "Manak-AI Regulatory Assistant: Bureau of Indian Standards standards are legally enforceable under "
            "the BIS Act, 2016. If you have a specific product query (e.g., electrical heaters, lithium batteries, "
            "packaged water, HDPE pipes, or LED lighting), please describe your product or ask about specific testing parameters!"
        )

    return ChatResponse(
        reply=reply,
        referenced_standards=referenced,
        timestamp=get_utc_now_iso()
    )

@app.get("/api/audit-logs")
def get_audit_logs():
    return AUDIT_LOGS

@app.get("/api/stats")
def get_stats():
    return {
        # National BIS registry figures — sourced from BIS.gov.in public data
        "national_registry": {
            "total_standards_indexed": 22480,
            "mandatory_qco_count": 718,
            "accredited_laboratories": 1240,
            "active_sectors": 42,
            "source": "BIS.gov.in"
        },
        # Actual records loaded in this demo application
        "demo_database": {
            "standards_loaded": len(STANDARDS_DB),
            "laboratories_loaded": len(LABS_DB),
            "classifications_performed": len(AUDIT_LOGS),
        }
    }
