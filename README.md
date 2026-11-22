# GeoAgri-Assam (NESFIC-D-13)
### Geospatial Identification of Cultivable & Fertile Agricultural Potential Lands

> **North East Seva First Innovation Challenge (NESFIC) 2026 — Government of Assam**  
> *Department of Science & Technology (Assam State Space Application Centre - ASSAC) | Directorate of Agriculture*

![GeoAgri-Assam](https://img.shields.io/badge/Platform-GeoAgri--Assam-emerald)
![Status](https://img.shields.io/badge/Status-Prototype%20Validated-brightgreen)
![Remote%20Sensing](https://img.shields.io/badge/Remote%20Sensing-Sentinel--1%2F2%20%7C%20Cartosat-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌾 Overview

**GeoAgri-Assam** is an AI-augmented Geospatial Decision Support System (DSS) engineered to identify, classify, score, and prioritize uncultivated, fertile, and seasonal fallow agricultural lands across Assam. 

Integrating multi-spectral optical imagery (**Sentinel-2**), Synthetic Aperture Radar (**Sentinel-1 SAR**), digital elevation models (**Cartosat DEM**), and state **Soil Health Card (SHC)** data grids, the platform bridges the gap between macro-satellite observation and village-level farm planning.

### Key Capabilities
- **Automated Fallow Land Detection:** Delineates seasonal fallows (Rabi/Kharif gap), current fallows, culturable wastelands, and degraded tea garden fringes.
- **Dynamic Post-Flood Silt Tracking:** Uses Sentinel-1 SAR cloud-penetrating imagery to distinguish flood-vulnerable zones from flood-receded, silt-enriched fertile tracts (*char-chaporis*) primed for winter Boro rice, mustard, and vegetables.
- **Fertility & Cultivability Index (FCI):** Multi-Criteria Decision Analysis (AHP) fusing Soil Organic Carbon (SOC), soil pH, N-P-K nutrient status, slope gradient, and river/canal proximity into a composite score (0–100).
- **AI Crop Recommendation Engine:** Machine learning model mapping soil-topographic traits to high-value North-Eastern crops (Joha rice, Kaji Nemu lemon, TS-36/38 mustard, ginger, black gram).
- **Interactive Web GIS & Export:** Responsive Leaflet/MapLibre map canvas with true satellite tiles, NDVI/SAR layer overlays, cadastral filtering, and one-click GeoJSON / PDF Dossier exports.
- **Field Ground-Truthing Task Dispatch:** Workflow to assign geo-tagged field verification tasks to local Agricultural Development Officers (ADOs) and KVK scientists.

---

## 🚀 Tech Stack

- **Frontend & GIS:** React 18, TypeScript, Tailwind CSS, Leaflet, React-Leaflet, Lucide Icons
- **Remote Sensing Data Sources:** Sentinel-2 L2A (10m), Sentinel-1 C-Band SAR, Cartosat/SRTM DEM, Bhuvan/ISRIC Soil Grids
- **Algorithms & Processing:** Analytical Hierarchy Process (AHP), NDVI Harmonic Phenology Analysis, XGBoost Crop Matcher
- **Build & Dev Tooling:** Vite, PostCSS, Autoprefixer

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/RonHatibaruah/nesfic-d13-geoagri-assam.git

# Navigate to project directory
cd nesfic-d13-geoagri-assam

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be live at `http://localhost:5173/` (or next available port).

### Production Build
```bash
npm run build
npm run preview
```

---

## 🗺️ Supported Pilot Regions

The current prototype includes georeferenced cadastral and satellite datasets for major Assam agro-ecological zones:
- **Kamrup Rural** (Hajo Alluvial Fallow Cluster, Boko Riverine Silt Tract)
- **Nagaon** (Koliabor Riparian Char Zone, Raha Lowland Fallows)
- **Barpeta** (Chenga Island Char Cluster, Sarthebari Uplands)
- **Sonitpur** (Dhekiajuli Arable Plains)
- **Jorhat** (Teok Upper Brahmaputra Alluvium)
- **Cachar** (Sonai Barak Valley Floodplain Depressions)

---

## 📄 License
This project is developed for the **NESFIC 2026 Innovation Challenge** under the Government of Assam. Distributed under the MIT License.
