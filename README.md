# MANAK-AI (BIS-SETU) 🇮🇳

> **National AI-Powered Standards Classification & Regulatory Compliance Engine for the Bureau of Indian Standards (BIS)**  
> Developed for **Smart India Hackathon (SIH)** | Evaluated strictly against the **Bureau of Indian Standards Act, 2016** and Mandatory **Quality Control Orders (QCO)**.

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel_Ready-000000.svg?logo=vercel&logoColor=white)](https://vercel.com)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI_0.115+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React 19](https://img.shields.io/badge/Frontend-React_19_+_TypeScript-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Security Hardened](https://img.shields.io/badge/Security-Zero_Secrets-brightgreen.svg?logo=shield)](https://github.com/Itss-Abhinav/Sihh_bis)

---

## 🏛️ Statutory Notice & Purpose

> **"Automated screening result — statutory conformity guidance under Section 16/29 of the BIS Act, 2016."**  
> Manak-AI assists domestic manufacturers, MSMEs, startups, and importers to deterministically identify applicable Indian Standards (IS), mandatory Quality Control Orders (QCO), clause-by-clause test methods, and accredited NABL / BIS laboratories before commercial distribution.

---

## 🚀 Live Demonstration Flow (P0 Architecture)

```
USER
  │
  ▼
PRODUCT DESCRIPTION & KEY PARAMETERS
  │ (e.g. Smart Lithium Power Bank 20000mAh, Immersion Heater, Packaged Water)
  ▼
AI PRODUCT CLASSIFICATION ENGINE
  │ (Deterministic statutory keyword extraction & HS code mapping)
  ▼
POTENTIAL BIS STANDARD (IS CODE)
  │ (e.g. IS 16046 Part 2, IS 302, IS 14543, IS 15885, IS 4984)
  ▼
STATUTORY REQUIREMENTS & QCO CHECK
  │ (Mandatory Gazette Notification, Regulating Ministry, Legal Penalties)
  ▼
CLAUSE-BY-CLAUSE TESTING MATRIX
  │ (Dielectric withstand, short-circuit, microbial limits, drop impact)
  ▼
ACCREDITED TESTING LABORATORY FINDER
  │ (BIS Central Lab, NABL testing facilities, contact emails, addresses)
  ▼
CERTIFICATION GUIDANCE & ROADMAP
  │ (Scheme-I ISI Mark vs Scheme-II CRS, Form V / Form VI dossiers)
  ▼
DIGITAL AUDIT EVIDENCE & DOSSIER EXPORT
  │ (Cryptographically hashed audit memorandum & printable certificate)
```

---

## 🌟 Key Functional Pillars

1. **Dual-Scheme Conformity Navigator**:
   - **Scheme-I (ISI Mark)**: Factory inspection, in-house laboratory testing setup (STI), Form V filing, grant of CM/L license.
   - **Scheme-II (Compulsory Registration Scheme - CRS)**: Self-declaration of conformity for electronics/IT based on pre-certified test reports from BIS recognized labs (R-XXXXXXXX).
2. **Deterministic & AI-Assisted Classification**: Eliminates statutory hallucinations by strictly binding classification rationale to statutory keywords, definitions, and Harmonized System (HS) codes.
3. **Mandatory Quality Control Order (QCO) Gazette Tracker**: Live tracking of orders notified by DPIIT, MeitY, MoRTH, and Consumer Affairs under Section 16 of the BIS Act 2016, with statutory penalties under Section 29.
4. **NABL & BIS Recognized Lab Directory**: Multi-state directory of authorized testing centers under the BIS Laboratory Recognition Scheme (LRS).
5. **"Manak Mitra" AI Regulatory Assistant**: Conversational agent providing instant statutory clarification on BIS guidelines, transition grace periods, and testing parameters.
6. **Digital Compliance Dossier Generator**: One-click printable compliance memorandum formatted for regulatory audits and customs clearance.
7. **Bilingual User Experience**: Instant English ⇄ हिन्दी language switching for national portal accessibility.

---

## 🛡️ Security & Zero-Secret Hygiene

- **Strict Root `.gitignore`**: All `.env`, `*.key`, `*.pem`, `credentials.json`, `service-account*.json` are strictly excluded from version control.
- **Frontend Isolation**: Browser bundles only consume safe `VITE_` variables; zero server secrets, database credentials, or private keys are exposed to the client.
- **Controlled Demo Fallback**: Works 100% reliably out of the box even without external API keys or live network connectivity.

---

## 💻 Local Quickstart

### Prerequisites
- Node.js 18+ (tested on v24.16.0)
- Python 3.10+ (tested on v3.14.6)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Itss-Abhinav/Sihh_bis.git
cd Sihh_bis
```

### 2. Frontend Launch
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Backend Launch (Optional FastAPI Engine)
```bash
cd backend
python -m pip install -r requirements.txt # or: pip install fastapi uvicorn pydantic pytest httpx
uvicorn main:app --reload --port 8000
```
Swagger UI will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 4. Running Backend Unit Tests
```bash
pytest backend/test_main.py
```

### 5. Supabase Database Setup
Execute the SQL migration scripts in your Supabase SQL editor:
- `supabase/migrations/20260928_init_bis.sql` (Tables & schema)
- `supabase/seed.sql` (Standards & laboratory dataset)

---

## 🌐 Deploy to Vercel

The application is pre-configured with `vercel.json` for zero-configuration 1-click deployment:
1. Import repository `Itss-Abhinav/Sihh_bis` into Vercel.
2. Framework Preset: **Vite**.
3. Build Command: `cd frontend && npm install && npm run build`
4. Output Directory: `frontend/dist`
5. Deploy!

---

## 📜 License
MIT License. Bureau of Indian Standards nomenclature and standard references are property of the statutory authorities under the Government of India.
