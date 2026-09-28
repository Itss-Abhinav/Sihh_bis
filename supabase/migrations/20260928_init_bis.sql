-- ==========================================================
-- Bureau of Indian Standards (BIS) Manak-AI Schema Migration
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Standards Table
CREATE TABLE IF NOT EXISTS standards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. "IS 16046 (Part 2): 2018"
    title TEXT NOT NULL,
    category VARCHAR(100) NOT NULL, -- e.g. "Electronics & IT", "Electrical Appliances"
    scope TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'MANDATORY', -- 'MANDATORY' or 'VOLUNTARY'
    scheme_type VARCHAR(50) NOT NULL, -- 'Scheme-I (ISI Mark)' or 'Scheme-II (CRS)'
    ministry VARCHAR(150) NOT NULL, -- e.g. "Ministry of Electronics & Information Technology"
    publication_year INT NOT NULL,
    latest_amendment VARCHAR(50),
    hsn_codes TEXT[] NOT NULL DEFAULT '{}',
    marking_rules TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Quality Control Orders (QCO) Table
CREATE TABLE IF NOT EXISTS qco_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    standard_id UUID REFERENCES standards(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    gazette_no VARCHAR(100) NOT NULL,
    notification_date DATE NOT NULL,
    enforcement_date DATE NOT NULL,
    issuing_ministry VARCHAR(150) NOT NULL,
    penalty_clause TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Test Requirements & Compliance Matrix
CREATE TABLE IF NOT EXISTS test_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    standard_id UUID REFERENCES standards(id) ON DELETE CASCADE,
    clause_no VARCHAR(50) NOT NULL,
    test_name VARCHAR(150) NOT NULL,
    parameter VARCHAR(150) NOT NULL,
    test_method TEXT NOT NULL,
    acceptance_criteria TEXT NOT NULL,
    sample_size VARCHAR(50),
    is_destructive BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Accredited Testing Laboratories (NABL / BIS Recognized)
CREATE TABLE IF NOT EXISTS laboratories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    lab_code VARCHAR(50) UNIQUE NOT NULL,
    recognition_type VARCHAR(50) NOT NULL, -- 'BIS Central Lab', 'NABL Accredited', 'BIS Recognized (LRS)'
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    contact_email VARCHAR(120),
    contact_phone VARCHAR(50),
    recognized_is_codes TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Classification History & Audit Logs
CREATE TABLE IF NOT EXISTS classification_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_description TEXT NOT NULL,
    matched_is_code VARCHAR(50) NOT NULL,
    confidence_score NUMERIC(5,2) NOT NULL,
    classification_rationale TEXT NOT NULL,
    extracted_features JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_hash VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    actor VARCHAR(100) NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid querying
CREATE INDEX IF NOT EXISTS idx_standards_is_code ON standards(is_code);
CREATE INDEX IF NOT EXISTS idx_standards_category ON standards(category);
CREATE INDEX IF NOT EXISTS idx_laboratories_state ON laboratories(state);
