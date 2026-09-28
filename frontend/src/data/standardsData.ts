import { BISStandard, Laboratory, AuditLog } from '../types/bis';

export const BIS_STANDARDS_MOCK: BISStandard[] = [
  {
    id: "std-16046",
    is_code: "IS 16046 (Part 2): 2018 / IEC 62133-2: 2017",
    title: "Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes - Secondary Lithium Cells and Batteries for Portable Applications",
    category: "Electronics & IT",
    scope: "Safety requirements for portable sealed secondary lithium cells and batteries used in portable electronics (power banks, smartphones, laptops, smartwatches).",
    status: "MANDATORY",
    scheme_type: "Scheme-II (CRS)",
    ministry: "Ministry of Electronics and Information Technology (MeitY)",
    publication_year: 2018,
    latest_amendment: "Amendment No. 1 (2020)",
    hsn_codes: ["85076000", "85044090"],
    marking_rules: "Mandatory standard CRS registration statement: 'Self Declaration - Conforming to IS 16046 (Part 2): 2018, R-XXXXXXXX' and BIS portal link.",
    keywords: ["battery", "lithium", "power bank", "li-ion", "cell", "portable battery", "accumulator", "charger", "rechargeable"],
    qco_order: {
      title: "Electronics & IT Goods (Requirement for Compulsory Registration) Order, 2021",
      gazette_no: "S.O. 1234(E)",
      date: "2021-03-18",
      enforcement_date: "2021-09-18",
      penalty: "Imprisonment up to 2 years or fine not less than INR 2,00,000 under Section 29 of BIS Act, 2016."
    },
    tests: [
      {
        clause: "Clause 7.3.2",
        test_name: "Continuous Low-Rate Charging Test",
        parameter: "Thermal runaway & voltage stability under overcharge",
        method: "Continuous charging at specified rate for 28 days at 20°C ± 5°C",
        acceptance_criteria: "No fire, no explosion, no electrolyte leakage.",
        sample_size: "5 cells",
        is_destructive: true
      },
      {
        clause: "Clause 7.3.3",
        test_name: "External Short-Circuit Test",
        parameter: "Short-circuit resistance < 80 mΩ",
        method: "Direct short circuit across battery terminals at 55°C until temperature stabilizes",
        acceptance_criteria: "No fire, no explosion; case temperature remains below 150°C.",
        sample_size: "5 batteries",
        is_destructive: true
      },
      {
        clause: "Clause 7.3.6",
        test_name: "Drop & Mechanical Shock",
        parameter: "Free fall 1.0 m onto concrete",
        method: "Drop 3 times on each face from 1m elevation",
        acceptance_criteria: "No rupture, no thermal runaway, no mass loss > 0.1%.",
        sample_size: "3 packs",
        is_destructive: false
      }
    ]
  },
  {
    id: "std-302",
    is_code: "IS 302 (Part 2/Sec 201): 2008",
    title: "Safety of Household and Similar Electrical Appliances - Particular Requirements for Electric Immersion Water Heaters",
    category: "Electrical Appliances",
    scope: "Safety specifications for portable electric immersion water heaters for household immersion use with rated voltage not exceeding 250V AC single phase.",
    status: "MANDATORY",
    scheme_type: "Scheme-I (ISI Mark)",
    ministry: "Ministry of Heavy Industries & DPIIT",
    publication_year: 2008,
    latest_amendment: "Amendment No. 3 (2022)",
    hsn_codes: ["85161000", "85167990"],
    marking_rules: "Appliance nameplate must bear permanent ISI Mark with BIS License Number (CM/L-XXXXXXXXXX).",
    keywords: ["immersion heater", "water heater", "geyser", "heating element", "electric rod", "immersion rod", "boiler"],
    qco_order: {
      title: "Electrical Appliances (Quality Control) Order, 2023",
      gazette_no: "S.O. 4521(E)",
      date: "2023-06-05",
      enforcement_date: "2024-01-01",
      penalty: "Imprisonment up to 2 years or statutory penalty under BIS Act 2016."
    },
    tests: [
      {
        clause: "Clause 13",
        test_name: "High Voltage Dielectric Breakdown Test",
        parameter: "Dielectric withstand at 1250V AC",
        method: "Apply 1250V AC between live conductors and protective outer sheath for 60 seconds",
        acceptance_criteria: "Zero insulation breakdown or disruptive flashover.",
        sample_size: "3 units",
        is_destructive: false
      },
      {
        clause: "Clause 16",
        test_name: "Electric Leakage Current at Operating Temperature",
        parameter: "Leakage current < 0.75 mA",
        method: "Measure leakage current while immersed in conductive water bath at 1.15x rated wattage",
        acceptance_criteria: "Leakage current does not exceed 0.75 mA.",
        sample_size: "2 units",
        is_destructive: false
      }
    ]
  },
  {
    id: "std-14543",
    is_code: "IS 14543: 2024",
    title: "Packaged Drinking Water (Other than Packaged Natural Mineral Water) - Specification (Third Revision)",
    category: "Food & Beverages",
    scope: "Comprehensive statutory requirements, mineral bounds, and microbiological parameters for potable packaged drinking water containers.",
    status: "MANDATORY",
    scheme_type: "Scheme-I (ISI Mark)",
    ministry: "Ministry of Consumer Affairs & FSSAI",
    publication_year: 2024,
    latest_amendment: "Third Revision (2024)",
    hsn_codes: ["22011010", "22019090"],
    marking_rules: "All containers must be marked with ISI Mark, CM/L number, Batch No, and FSSAI License Number.",
    keywords: ["drinking water", "packaged water", "water bottle", "mineral water", "potable water", "purified water", "jar"],
    qco_order: {
      title: "Packaged Drinking Water Quality Control and Compulsory Certification Order",
      gazette_no: "S.O. 2911(E)",
      date: "2021-04-12",
      enforcement_date: "2021-07-01",
      penalty: "Immediate plant seizure, license revocation, and prosecution under Section 16 & 29."
    },
    tests: [
      {
        clause: "Table 2 (Physicochemical)",
        test_name: "Total Dissolved Solids (TDS) Measurement",
        parameter: "TDS level 75 mg/l to 500 mg/l",
        method: "Gravimetric drying at 180°C",
        acceptance_criteria: "Strictly within 75 to 500 mg/litre range.",
        sample_size: "3 bottles",
        is_destructive: true
      },
      {
        clause: "Table 3 (Microbiology)",
        test_name: "E. Coli and Coliform Detection",
        parameter: "Pathogenic bacteria absence",
        method: "Membrane filtration at 37°C/44°C incubation for 48h",
        acceptance_criteria: "0 CFU (Absent in 250 ml sample).",
        sample_size: "5 sealed bottles",
        is_destructive: true
      }
    ]
  },
  {
    id: "std-15885",
    is_code: "IS 15885 (Part 2/Sec 13): 2012",
    title: "Lamp Controlgear - Particular Requirements for DC or AC Supplied Electronic Controlgear for LED Modules",
    category: "Lighting & Luminaire",
    scope: "Electronic drivers, power supplies, and control units supplying LED streetlights, downlights, and commercial lighting.",
    status: "MANDATORY",
    scheme_type: "Scheme-II (CRS)",
    ministry: "Ministry of Electronics and Information Technology (MeitY)",
    publication_year: 2012,
    latest_amendment: "Amendment No. 2 (2021)",
    hsn_codes: ["85041090", "94054090"],
    marking_rules: "Compulsory BIS CRS Registration logo and number R-XXXXXXXX.",
    keywords: ["led driver", "led light", "street light", "controlgear", "led module", "luminaire", "ballast", "power supply"],
    qco_order: {
      title: "Electronics and IT Goods Compulsory Registration Order",
      gazette_no: "S.O. 1234(E)",
      date: "2021-03-18",
      enforcement_date: "2021-09-18",
      penalty: "Customs confiscation and statutory fine under BIS Act 2016."
    },
    tests: [
      {
        clause: "Clause 14",
        test_name: "Thermal Endurance & Abnormal Operation",
        parameter: "Case temperature limits tc",
        method: "Operate at 1.1x rated voltage under thermal chamber at maximum declared ambient temperature",
        acceptance_criteria: "Temperature tc must not exceed declared limits; no smoke or flame.",
        sample_size: "3 drivers",
        is_destructive: false
      }
    ]
  },
  {
    id: "std-4984",
    is_code: "IS 4984: 2016",
    title: "High Density Polyethylene (HDPE) Pipes for Water Supply - Specification",
    category: "Chemicals & Piping",
    scope: "Specifications for HDPE pipes intended for underground water transport, municipal potable water, and industrial supply lines.",
    status: "MANDATORY",
    scheme_type: "Scheme-I (ISI Mark)",
    ministry: "Department for Promotion of Industry and Internal Trade (DPIIT)",
    publication_year: 2016,
    latest_amendment: "Amendment No. 2 (2023)",
    hsn_codes: ["39172110", "39172190"],
    marking_rules: "Continuous indelible stamp per meter: IS 4984, Manufacturer, PE 100/80 grade, SDR ratio, CM/L number.",
    keywords: ["hdpe pipe", "polyethylene pipe", "plastic pipe", "potable water pipe", "irrigation pipe", "polymer conduit"],
    qco_order: {
      title: "Pipes and Fittings (Quality Control) Order",
      gazette_no: "S.O. 3120(E)",
      date: "2023-10-15",
      enforcement_date: "2024-04-15",
      penalty: "Seizure of non-certified stock and financial prosecution."
    },
    tests: [
      {
        clause: "Clause 8.1",
        test_name: "Hydrostatic Internal Pressure Resistance",
        parameter: "100-hour and 165-hour creep rupture",
        method: "Maintain hydrostatic pressure in water bath at 80°C for 165 hours",
        acceptance_criteria: "Zero burst, leakage, or swelling deformation.",
        sample_size: "3 pipe segments",
        is_destructive: true
      }
    ]
  },
  {
    id: "std-9873",
    is_code: "IS 9873 (Part 1): 2019",
    title: "Safety of Toys - Safety Aspects Related to Mechanical and Physical Properties",
    category: "Consumer & Toys",
    scope: "Mechanical and physical safety parameters for toys designed for children under 14 years of age.",
    status: "MANDATORY",
    scheme_type: "Scheme-I (ISI Mark)",
    ministry: "Department for Promotion of Industry and Internal Trade (DPIIT)",
    publication_year: 2019,
    latest_amendment: "Reaffirmed 2024",
    hsn_codes: ["95030010", "95030020", "95030030"],
    marking_rules: "Every toy pack must bear standard ISI mark and manufacturer address with age grading warnings.",
    keywords: ["toy", "children toy", "doll", "toy car", "rc car", "baby toy", "puzzle", "stuffed toy", "board game"],
    qco_order: {
      title: "Toys (Quality Control) Order, 2020",
      gazette_no: "S.O. 853(E)",
      date: "2020-02-25",
      enforcement_date: "2021-01-01",
      penalty: "Total ban on import and sale without valid BIS license under Section 29 BIS Act."
    },
    tests: [
      {
        clause: "Clause 4.4",
        test_name: "Small Parts Choking Hazard Cylinder Test",
        parameter: "Dimensions of detachable components",
        method: "Insert toy components into truncated cylinder (diameter 31.7mm, depth 57.1mm)",
        acceptance_criteria: "No detachable part fits entirely inside cylinder for toys under 36 months.",
        sample_size: "5 samples",
        is_destructive: false
      }
    ]
  },
  {
    id: "std-1293",
    is_code: "IS 1293: 2019",
    title: "Plugs and Socket-Outlets for Domestic and Similar Purposes of Rated Voltage up to and Including 250 V",
    category: "Electrical Appliances",
    scope: "Requirements for plugs, fixed or portable socket-outlets, multiway adaptors up to 16 Amperes and 250 Volts.",
    status: "MANDATORY",
    scheme_type: "Scheme-I (ISI Mark)",
    ministry: "Ministry of Commerce and Industry / DPIIT",
    publication_year: 2019,
    latest_amendment: "Amendment No. 1 (2021)",
    hsn_codes: ["85366910", "85366990"],
    marking_rules: "ISI Mark, rated current (A), rated voltage (V), and manufacturer trademark embossed on faceplate.",
    keywords: ["plug", "socket", "power strip", "extension cord", "wall outlet", "adapter", "pin plug", "switch"],
    qco_order: {
      title: "Plugs and Sockets (Quality Control) Order",
      gazette_no: "S.O. 3863(E)",
      date: "2020-12-04",
      enforcement_date: "2021-06-01",
      penalty: "Goods confiscated at customs / factory under BIS Act 2016."
    },
    tests: [
      {
        clause: "Clause 19",
        test_name: "Withdrawal Force Test",
        parameter: "Gauge withdrawal force within 1.5N to 50N",
        method: "Apply standardized test pin gauge and measure retention force with calibrated load cell",
        acceptance_criteria: "Pins shall not slip out below minimum force nor bind above maximum force.",
        sample_size: "3 sockets",
        is_destructive: false
      }
    ]
  },
  {
    id: "std-4151",
    is_code: "IS 4151: 2015",
    title: "Protective Helmets for Two Wheeler Riders - Specification",
    category: "Automotive & Safety",
    scope: "Protective headgear for motorcyclists, scooter riders, and two-wheeler pillion riders.",
    status: "MANDATORY",
    scheme_type: "Scheme-I (ISI Mark)",
    ministry: "Ministry of Road Transport and Highways (MoRTH)",
    publication_year: 2015,
    latest_amendment: "Amendment No. 2 (2021)",
    hsn_codes: ["65061010", "65061090"],
    marking_rules: "Non-detachable ISI mark label, shell size, helmet mass, and manufacturing month/year.",
    keywords: ["helmet", "two wheeler helmet", "bike helmet", "motorcycle helmet", "protective headgear", "riding helmet"],
    qco_order: {
      title: "Two Wheeler Helmets (Quality Control) Order",
      gazette_no: "S.O. 4252(E)",
      date: "2020-11-26",
      enforcement_date: "2021-06-01",
      penalty: "Uncertified helmets seized and sellers booked under Section 29 BIS Act."
    },
    tests: [
      {
        clause: "Clause 7.2",
        test_name: "Shock Absorption & Impact Attenuation",
        parameter: "Headform acceleration < 300g",
        method: "Drop helmet on flat and hemispherical steel anvils at 7.5 m/s",
        acceptance_criteria: "Peak acceleration shall not exceed 300g; duration > 150g under 5 ms.",
        sample_size: "4 helmets",
        is_destructive: true
      }
    ]
  }
];

export const LABORATORIES_MOCK: Laboratory[] = [
  {
    id: "lab-1",
    name: "BIS Central Laboratory (CL Sahibabad)",
    lab_code: "BIS-CL-GZB-01",
    recognition_type: "BIS Central Lab",
    address: "Plot No. 20/9, Site IV, Sahibabad Industrial Area",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201010",
    email: "cl-sahibabad@bis.gov.in",
    phone: "+91-120-4177100",
    recognized_is_codes: [
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
    id: "lab-2",
    name: "National Test House (Northern Region)",
    lab_code: "NTH-NR-DEL-02",
    recognition_type: "NABL Accredited",
    address: "Kamla Nehru Nagar, CGO Complex",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110003",
    email: "nth-nr@gov.in",
    phone: "+91-11-24361234",
    recognized_is_codes: [
      "IS 302 (Part 2/Sec 201): 2008",
      "IS 4984: 2016",
      "IS 14543: 2024",
      "IS 1293: 2019"
    ]
  },
  {
    id: "lab-3",
    name: "TUV Rheinland India Testing Laboratory",
    lab_code: "TUV-BLR-03",
    recognition_type: "BIS Recognized (LRS)",
    address: "Electronics City Phase 1, Hosur Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560100",
    email: "info-india@tuv.com",
    phone: "+91-80-67223300",
    recognized_is_codes: [
      "IS 16046 (Part 2): 2018",
      "IS 15885 (Part 2/Sec 13): 2012"
    ]
  },
  {
    id: "lab-4",
    name: "UL Solutions India Testing & Certification",
    lab_code: "UL-MANESAR-04",
    recognition_type: "BIS Recognized (LRS)",
    address: "Sector 8, IMT Manesar",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122050",
    email: "ul.india@ul.com",
    phone: "+91-124-4698100",
    recognized_is_codes: [
      "IS 16046 (Part 2): 2018",
      "IS 15885 (Part 2/Sec 13): 2012",
      "IS 9873 (Part 1): 2019"
    ]
  },
  {
    id: "lab-5",
    name: "ERTL (West) STQC Directorate",
    lab_code: "ERTL-W-MUM-05",
    recognition_type: "NABL Accredited",
    address: "MIDC Area, Andheri (East)",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400093",
    email: "ertlwest@stqc.nic.in",
    phone: "+91-22-28325850",
    recognized_is_codes: [
      "IS 16046 (Part 2): 2018",
      "IS 302 (Part 2/Sec 201): 2008",
      "IS 1293: 2019"
    ]
  }
];

export const AUDIT_LOGS_MOCK: AuditLog[] = [
  {
    id: "log-101",
    action: "STANDARD_VERIFICATION",
    actor: "Surveillance Inspector (North Zone)",
    details: "Automated QCO audit on market sample of Electric Immersion Rod (IS 302)",
    timestamp: "2026-09-28T14:15:00Z"
  },
  {
    id: "log-102",
    action: "CLASSIFICATION_REQUEST",
    actor: "Manufacturer (Bengaluru)",
    details: "Screened product '20000mAh Dual Port Power Bank' -> IS 16046",
    timestamp: "2026-09-28T13:42:00Z"
  },
  {
    id: "log-103",
    action: "QCO_GAZETTE_SYNC",
    actor: "BIS Registry Bot",
    details: "Synchronized DPIIT Gazette Notification for Quality Control Orders 2026",
    timestamp: "2026-09-28T12:00:00Z"
  }
];
