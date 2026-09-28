-- ==========================================================
-- Bureau of Indian Standards (BIS) Seed Data
-- ==========================================================

-- Insert Standards
INSERT INTO standards (id, is_code, title, category, scope, status, scheme_type, ministry, publication_year, latest_amendment, hsn_codes, marking_rules)
VALUES 
(
    'a1111111-1111-1111-1111-111111111111',
    'IS 16046 (Part 2): 2018 / IEC 62133-2: 2017',
    'Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes - Secondary Lithium Cells and Batteries for Portable Applications',
    'Electronics & IT',
    'Safety requirements for portable sealed secondary lithium cells, and for batteries made from them, for use in portable applications like smartphones, laptops, power banks, and tablets.',
    'MANDATORY',
    'Scheme-II (CRS)',
    'Ministry of Electronics and Information Technology (MeitY)',
    2018,
    'Amendment No. 1 (2020)',
    ARRAY['85076000', '85044090'],
    'Must display standard CRS registration number R-XXXXXXXX and web portal details (www.crsbis.in) as per BIS CRS Guidelines.'
),
(
    'a2222222-2222-2222-2222-222222222222',
    'IS 302 (Part 2/Sec 201): 2008',
    'Safety of Household and Similar Electrical Appliances - Particular Requirements for Electric Immersion Water Heaters',
    'Electrical Appliances',
    'Covers safety requirements of electric immersion water heaters for household and similar use with rated voltage not exceeding 250V AC single phase.',
    'MANDATORY',
    'Scheme-I (ISI Mark)',
    'Ministry of Heavy Industries / DPIIT',
    2008,
    'Amendment No. 3 (2022)',
    ARRAY['85161000', '85167990'],
    'Must emboss or permanently etch ISI mark along with License number (CM/L-XXXXXXXXXX) on appliance nameplate.'
),
(
    'a3333333-3333-3333-3333-333333333333',
    'IS 14543: 2024',
    'Packaged Drinking Water (Other than Packaged Natural Mineral Water) - Specification (Third Revision)',
    'Food & Beverages',
    'Prescribes requirements and methods of sampling and test for packaged drinking water other than packaged natural mineral water.',
    'MANDATORY',
    'Scheme-I (ISI Mark)',
    'Ministry of Consumer Affairs, Food & Public Distribution / FSSAI',
    2024,
    'Third Revision (2024)',
    ARRAY['22011010', '22019090'],
    'Mandatory ISI Mark and FSSAI license number on all retail container labels. No container may be manufactured or sold without valid BIS certification.'
),
(
    'a4444444-4444-4444-4444-444444444444',
    'IS 15885 (Part 2/Sec 13): 2012',
    'Lamp Controlgear - Particular Requirements for DC or AC Supplied Electronic Controlgear for LED Modules',
    'Lighting & Luminaire',
    'Safety and performance requirements for electronic controlgear for use on d.c. supplies up to 250V and a.c. supplies up to 1000V at 50/60Hz with LED luminaires.',
    'MANDATORY',
    'Scheme-II (CRS)',
    'Ministry of Electronics and Information Technology (MeitY)',
    2012,
    'Amendment No. 2 (2021)',
    ARRAY['85041090', '94054090'],
    'CRS Mark with Registration number is mandatory before custom clearance or commercial supply in India.'
),
(
    'a5555555-5555-5555-5555-555555555555',
    'IS 4984: 2016',
    'High Density Polyethylene (HDPE) Pipes for Water Supply - Specification',
    'Chemicals & Piping',
    'Lays down requirements for high density polyethylene (HDPE) pipes for potable water supplies, sewage, and industrial effluents.',
    'MANDATORY',
    'Scheme-I (ISI Mark)',
    'Department for Promotion of Industry and Internal Trade (DPIIT)',
    2016,
    'Amendment No. 2 (2023)',
    ARRAY['39172110', '39172190'],
    'Every meter of pipe shall be indelibly marked with manufacturer name, pipe class, PE grade, SDR ratio, and ISI Standard Mark.'
),
(
    'a6666666-6666-6666-6666-666666666666',
    'IS 9873 (Part 1): 2019',
    'Safety of Toys - Part 1: Safety Aspects Related to Mechanical and Physical Properties',
    'Consumer & Toys',
    'Specifies acceptable criteria for mechanical and physical properties of toys intended for use by children in various age categories up to 14 years.',
    'MANDATORY',
    'Scheme-I (ISI Mark)',
    'Department for Promotion of Industry and Internal Trade (DPIIT)',
    2019,
    'Reaffirmed 2024',
    ARRAY['95030010', '95030020', '95030030'],
    'Toys Quality Control Order (2020) makes ISI Mark compulsory for domestic manufacturing as well as import.'
)
ON CONFLICT (is_code) DO NOTHING;

-- Insert QCO Orders
INSERT INTO qco_orders (standard_id, title, gazette_no, notification_date, enforcement_date, issuing_ministry, penalty_clause, is_active)
VALUES
(
    'a1111111-1111-1111-1111-111111111111',
    'Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order, 2021',
    'S.O. 1234(E)',
    '2021-03-18',
    '2021-09-18',
    'Ministry of Electronics and IT',
    'Imprisonment up to 2 years or fine not less than INR 2,00,000 or both under Section 29 of the Bureau of Indian Standards Act, 2016.',
    TRUE
),
(
    'a2222222-2222-2222-2222-222222222222',
    'Electrical Appliances (Quality Control) Order, 2023',
    'S.O. 4521(E)',
    '2023-06-05',
    '2024-01-01',
    'DPIIT',
    'Prohibits manufacture, storage, sale, distribution or import without BIS certification mark under BIS Act 2016 Section 29 & 30.',
    TRUE
),
(
    'a3333333-3333-3333-3333-333333333333',
    'Packaged Drinking Water Quality Control and Compulsory Certification Order, 2021',
    'S.O. 2911(E)',
    '2021-04-12',
    '2021-07-01',
    'Ministry of Consumer Affairs',
    'Seizure of goods, cancellation of manufacturing license, and criminal prosecution under Sections 16 & 29 of BIS Act 2016.',
    TRUE
)
ON CONFLICT DO NOTHING;

-- Insert Test Requirements
INSERT INTO test_requirements (standard_id, clause_no, test_name, parameter, test_method, acceptance_criteria, sample_size, is_destructive)
VALUES
(
    'a1111111-1111-1111-1111-111111111111',
    'Clause 7.3.2',
    'Continuous Low-Rate Charging',
    'Thermal & Voltage Stability',
    'Charge fully discharged cells at continuous specified rate for 28 days at 20°C ± 5°C.',
    'No fire, no explosion, no electrolyte leakage observed.',
    '5 cells',
    TRUE
),
(
    'a1111111-1111-1111-1111-111111111111',
    'Clause 7.3.3',
    'External Short-Circuit Test',
    'Short Circuit Resistance < 80 mΩ',
    'Short circuit battery terminals at 55°C until case temp decreases by 20% or 24 hours.',
    'No fire, no explosion. Temperature shall not exceed 150°C.',
    '5 batteries',
    TRUE
),
(
    'a1111111-1111-1111-1111-111111111111',
    'Clause 7.3.6',
    'Drop & Impact Test',
    'Free fall from 1.0 meter',
    'Drop 3 times from 1m height on concrete floor at ambient temperature.',
    'No fire, no explosion, no venting or rupture.',
    '3 packs',
    FALSE
),
(
    'a2222222-2222-2222-2222-222222222222',
    'Clause 13',
    'High Voltage Breakdown Test',
    'Dielectric Strength',
    'Apply 1250V AC (for Class II: 3750V AC) between live parts and accessible metallic enclosure for 60 seconds.',
    'No breakdown or flashover shall occur.',
    '3 appliances',
    FALSE
),
(
    'a2222222-2222-2222-2222-222222222222',
    'Clause 16',
    'Leakage Current & Electric Strength',
    'Leakage Current limit < 0.75 mA',
    'Measure leakage current at 1.15 times rated power input while submerged to maximum water mark.',
    'Leakage current shall not exceed 0.75 mA.',
    '2 units',
    FALSE
),
(
    'a3333333-3333-3333-3333-333333333333',
    'Table 2, Row 3',
    'Total Dissolved Solids (TDS)',
    'Mineral concentration',
    'Gravimetric determination after drying at 180°C.',
    'TDS must be within 75 mg/l to 500 mg/l.',
    '3 containers',
    TRUE
),
(
    'a3333333-3333-3333-3333-333333333333',
    'Table 3, Microbiological',
    'Escherichia coli & Coliform Bacteria',
    'Microbial pathogens',
    'Membrane filtration incubation at 37°C and 44°C for 24-48 hours.',
    'Shall be absent in 250 ml of sample.',
    '5 sealed bottles',
    TRUE
)
ON CONFLICT DO NOTHING;

-- Insert Laboratories
INSERT INTO laboratories (name, lab_code, recognition_type, address, city, state, pincode, contact_email, contact_phone, recognized_is_codes)
VALUES
(
    'BIS Central Laboratory (CL)',
    'BIS-CL-GZB-01',
    'BIS Central Lab',
    'Plot No. 20/9, Site IV, Sahibabad Industrial Area',
    'Ghaziabad',
    'Uttar Pradesh',
    '201010',
    'cl-sahibabad@bis.gov.in',
    '+91-120-4177100',
    ARRAY['IS 16046 (Part 2): 2018', 'IS 302 (Part 2/Sec 201): 2008', 'IS 14543: 2024', 'IS 15885 (Part 2/Sec 13): 2012', 'IS 4984: 2016', 'IS 9873 (Part 1): 2019']
),
(
    'National Test House (Northern Region)',
    'NTH-NR-DEL-02',
    'NABL Accredited',
    'Kamla Nehru Nagar, Ghaziabad / CGO Complex',
    'New Delhi',
    'Delhi',
    '110003',
    'nth-nr@gov.in',
    '+91-11-24361234',
    ARRAY['IS 302 (Part 2/Sec 201): 2008', 'IS 4984: 2016', 'IS 14543: 2024']
),
(
    'TUV Rheinland India Testing Laboratory',
    'TUV-BLR-03',
    'BIS Recognized (LRS)',
    'Electronics City Phase 1, Hosur Road',
    'Bengaluru',
    'Karnataka',
    '560100',
    'info-india@tuv.com',
    '+91-80-67223300',
    ARRAY['IS 16046 (Part 2): 2018', 'IS 15885 (Part 2/Sec 13): 2012']
),
(
    'UL Solutions India Testing & Certification',
    'UL-MANESAR-04',
    'BIS Recognized (LRS)',
    'Sector 8, IMT Manesar',
    'Gurugram',
    'Haryana',
    '122050',
    'ul.india@ul.com',
    '+91-124-4698100',
    ARRAY['IS 16046 (Part 2): 2018', 'IS 15885 (Part 2/Sec 13): 2012', 'IS 9873 (Part 1): 2019']
),
(
    'ERTL (West) STQC Directorate',
    'ERTL-W-MUM-05',
    'NABL Accredited',
    'MIDC Area, Andheri (East)',
    'Mumbai',
    'Maharashtra',
    '400093',
    'ertlwest@stqc.nic.in',
    '+91-22-28325850',
    ARRAY['IS 16046 (Part 2): 2018', 'IS 302 (Part 2/Sec 201): 2008']
)
ON CONFLICT (lab_code) DO NOTHING;
