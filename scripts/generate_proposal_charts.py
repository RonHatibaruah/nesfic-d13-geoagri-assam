import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
import os

os.makedirs('pdf_assets', exist_ok=True)
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')

# -------------------------------------------------------------
# 1. Workflow Comparison: Current vs. Proposed
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9.5, 3.2), dpi=300)
ax.set_xlim(0, 10)
ax.set_ylim(0, 5.5)
ax.axis('off')

# Top: Current Legacy Workflow
ax.text(0.2, 4.8, "CURRENT WORKFLOW (Paper & Coarse Records):", fontsize=8.5, fontweight='bold', color='#dc2626')
c_boxes = [
    ("Paper Cadastre\n(Chitha / Jamabandi)", 1.2),
    ("ADO Block Office\n(Manual Routing)", 3.8),
    ("Subjective Ground Visit\n(6-8 Week Delay)", 6.4),
    ("Delayed Sanction\n(Fallows Neglected)", 9.0)
]
for text, x in c_boxes:
    card = patches.FancyBboxPatch((x-0.9, 3.4), 1.8, 1.1, boxstyle="round,pad=0.1", facecolor='#fee2e2', edgecolor='#fca5a5', linewidth=1)
    ax.add_patch(card)
    ax.text(x, 3.95, text, fontsize=7, color='#7f1d1d', ha='center', va='center')

for x in [2.1, 4.7, 7.3]:
    ax.annotate('', xy=(x+0.8, 3.95), xytext=(x, 3.95), arrowprops=dict(arrowstyle="->", color='#ef4444', lw=1.5))

# Bottom: GeoAgri Proposed Workflow
ax.text(0.2, 2.5, "GEOAGRI PROPOSED WORKFLOW (AI-Augmented Cloud GIS):", fontsize=8.5, fontweight='bold', color='#059669')
p_boxes = [
    ("Sentinel-1/2 Satellites\n(Bi-Weekly 10m Mesh)", 1.2),
    ("AI Silt & Fallow Engine\n(SAR + NDVI + DEM)", 3.8),
    ("Instant FCI Ranking\n(0-100 Parcel Score)", 6.4),
    ("Mobile ADO Dispatch\n(FPO Land Allocation)", 9.0)
]
for text, x in p_boxes:
    card = patches.FancyBboxPatch((x-0.9, 0.8), 1.8, 1.1, boxstyle="round,pad=0.1", facecolor='#ecfdf5', edgecolor='#6ee7b7', linewidth=1.2)
    ax.add_patch(card)
    ax.text(x, 1.35, text, fontsize=7, color='#064e3b', ha='center', va='center', fontweight='bold')

for x in [2.1, 4.7, 7.3]:
    ax.annotate('', xy=(x+0.8, 1.35), xytext=(x, 1.35), arrowprops=dict(arrowstyle="->", color='#10b981', lw=2))

plt.tight_layout()
plt.savefig('pdf_assets/workflow_comparison.png')
plt.close()

# -------------------------------------------------------------
# 2. 4-Pillar Solution Architecture
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9.2, 3.0), dpi=300)
ax.set_xlim(0, 10)
ax.set_ylim(0, 5)
ax.axis('off')

pillars = [
    ("1. Fallow Detection", "#0284c7", "• Sentinel-2 MSI (10m)\n• Harmonic NDVI Curves\n• Bare Soil Index (BSI)\n• Rabi/Kharif Gap Flagging", 1.2),
    ("2. SAR Silt Masking", "#0d9488", "• Sentinel-1 C-Band Radar\n• Cloud-Penetrating Waves\n• Flood Footprint Analysis\n• Recessional Silt Plain", 3.7),
    ("3. Composite FCI", "#d97706", "• AHP Weighting Matrix\n• Soil Chemistry (pH, SOC)\n• Cartosat DEM Slope\n• Water Body Proximity", 6.2),
    ("4. Crop AI & PWA", "#059669", "• XGBoost Crop Matcher\n• Mustard / Joha / Citrus\n• Gross Margin Estimates\n• Offline Mobile ADO Tool", 8.7)
]

for title, col, desc, x in pillars:
    card = patches.FancyBboxPatch((x-1.1, 0.4), 2.2, 4.2, boxstyle="round,pad=0.15", facecolor='#f8fafc', edgecolor=col, linewidth=1.5)
    ax.add_patch(card)
    header = patches.Rectangle((x-1.1, 3.8), 2.2, 0.8, facecolor=col)
    ax.add_patch(header)
    ax.text(x, 4.2, title, fontsize=8, fontweight='bold', color='white', ha='center')
    ax.text(x, 2.1, desc, fontsize=7, color='#1e293b', ha='center', va='center')

plt.suptitle("GeoAgri-Assam: 4 Core Functional Engine Modules", fontsize=10, fontweight='bold', y=0.98)
plt.tight_layout()
plt.savefig('pdf_assets/solution_anatomy_pillars.png')
plt.close()

# -------------------------------------------------------------
# 3. Interactive Web GIS Dashboard Layout
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9.2, 4.0), dpi=300)
ax.set_xlim(0, 10)
ax.set_ylim(0, 6)
ax.axis('off')

# Outer frame
frame = patches.FancyBboxPatch((0.2, 0.2), 9.6, 5.6, boxstyle="round,pad=0.1", facecolor='#090e17', edgecolor='#334155', linewidth=1.5)
ax.add_patch(frame)

# Navbar
nav = patches.Rectangle((0.2, 5.1), 9.6, 0.7, facecolor='#0f172a')
ax.add_patch(nav)
ax.text(0.5, 5.45, "GeoAgri-Assam DSS", fontsize=8.5, fontweight='bold', color='#34d399')
ax.text(3.5, 5.45, "[Spatial GIS Map]   [State Analytics]   [Ground-Truthing]", fontsize=7, color='#94a3b8')
ax.text(8.5, 5.45, "Live: nesfic-d13-geoagri-assam.pages.dev", fontsize=6.5, color='#38bdf8')

# Left Sidebar (Filters)
sidebar = patches.Rectangle((0.4, 0.4), 2.4, 4.5, facecolor='#1e293b', edgecolor='#334155', linewidth=0.5)
ax.add_patch(sidebar)
ax.text(1.6, 4.5, "GEOSPATIAL FILTERS", fontsize=7, fontweight='bold', color='white', ha='center')
ax.text(1.6, 3.8, "• District: All Assam / Nagaon\n• Land: Seasonal Fallow / Char\n• Min FCI: 75 / 100\n• Max Slope: <= 3.0 deg\n• Flood Risk: <= 20%", fontsize=6.5, color='#cbd5e1', ha='center')
ax.text(1.6, 2.0, "LAYERS ACTIVE:\n* Sentinel-2 NDVI\n* Sentinel-1 SAR Silt\n* Soil Organic Carbon", fontsize=6.5, color='#a7f3d0', ha='center')

# Center: Map Viewport
map_vp = patches.Rectangle((3.0, 0.4), 4.2, 4.5, facecolor='#020617', edgecolor='#334155', linewidth=0.5)
ax.add_patch(map_vp)

# Delineated parcels
p1 = patches.Polygon([[3.4, 3.2], [4.5, 3.8], [4.2, 4.3], [3.2, 3.8]], facecolor='#10b981', alpha=0.8, edgecolor='white', linewidth=1)
ax.add_patch(p1)
ax.text(3.8, 3.8, "Grade A Prime\nFCI: 92", fontsize=6, fontweight='bold', color='white', ha='center')

p2 = patches.Polygon([[5.0, 1.8], [6.4, 2.2], [6.1, 2.8], [4.8, 2.3]], facecolor='#f59e0b', alpha=0.8, edgecolor='white', linewidth=1)
ax.add_patch(p2)
ax.text(5.6, 2.3, "Grade B Silt\nFCI: 81", fontsize=6, fontweight='bold', color='white', ha='center')

ax.text(5.1, 0.8, "Leaflet Map: Assam Brahmaputra Valley (10m Resolution)", fontsize=6.5, color='#94a3b8', ha='center')

# Right Drawer: Parcel Dossier
drawer = patches.Rectangle((7.4, 0.4), 2.2, 4.5, facecolor='#1e293b', edgecolor='#10b981', linewidth=1)
ax.add_patch(drawer)
ax.text(8.5, 4.5, "PARCEL DOSSIER", fontsize=7, fontweight='bold', color='#34d399', ha='center')
ax.text(8.5, 4.1, "AS-KAM-2026-F101", fontsize=6.5, color='#e2e8f0', ha='center', fontweight='bold')
ax.text(8.5, 3.2, "FCI: 92/100 (Prime)\nArea: 48.5 ha\npH: 6.2 | SOC: 1.45%\nSlope: 1.2 deg", fontsize=6.5, color='#cbd5e1', ha='center')
ax.text(8.5, 2.1, "RECOMMENDED CROPS:\n1. Mustard TS-36 (95%)\n2. Black Rice (90%)\nMargin: Rs. 45k/ha", fontsize=6.5, color='#fef08a', ha='center')
ax.text(8.5, 0.9, "[Export GeoJSON / PDF]\n[Dispatch ADO Task]", fontsize=6, color='#38bdf8', ha='center', fontweight='bold')

plt.tight_layout()
plt.savefig('pdf_assets/dashboard_ui_preview.png')
plt.close()

# -------------------------------------------------------------
# 4. Cloud-Native Geospatial Microservices Diagram
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9.2, 2.8), dpi=300)
ax.set_xlim(0, 10)
ax.set_ylim(0, 4.5)
ax.axis('off')

# Data Tier
d_box = patches.FancyBboxPatch((0.4, 0.5), 2.5, 3.4, boxstyle="round,pad=0.1", facecolor='#f0fdf4', edgecolor='#86efac', linewidth=1.2)
ax.add_patch(d_box)
ax.text(1.65, 3.5, "1. INGESTION TIER", fontsize=7.5, fontweight='bold', color='#065f46', ha='center')
ax.text(1.65, 2.0, "• ESA Copernicus API\n  Sentinel-1/2 (Open Data)\n• Cartosat DEM (30m)\n• Soil Health Card Registry\n• Survey of India Cadastre", fontsize=7, color='#1e293b', ha='center')

# Compute Tier
c_box = patches.FancyBboxPatch((3.75, 0.5), 2.5, 3.4, boxstyle="round,pad=0.1", facecolor='#eff6ff', edgecolor='#93c5fd', linewidth=1.2)
ax.add_patch(c_box)
ax.text(5.0, 3.5, "2. ANALYTICS TIER", fontsize=7.5, fontweight='bold', color='#1e40af', ha='center')
ax.text(5.0, 2.0, "• Sen2Cor Cloud Masking\n• PostGIS 16 (Spatial R-Tree)\n• FastAPI Python Microservices\n• AHP Fertility Weighting\n• XGBoost Crop Matcher", fontsize=7, color='#1e293b', ha='center')

# Delivery Tier
u_box = patches.FancyBboxPatch((7.1, 0.5), 2.5, 3.4, boxstyle="round,pad=0.1", facecolor='#faf5ff', edgecolor='#d8b4fe', linewidth=1.2)
ax.add_patch(u_box)
ax.text(8.35, 3.5, "3. DELIVERY TIER", fontsize=7.5, fontweight='bold', color='#6b21a8', ha='center')
ax.text(8.35, 2.0, "• Cloudflare Pages CDN\n• React 18 + Leaflet Map\n• Vector Tiles (GeoJSON/WFS)\n• ADO Mobile Ground PWA\n• PDF Dossier Generator", fontsize=7, color='#1e293b', ha='center')

# Connecting arrows
ax.annotate('', xy=(3.6, 2.2), xytext=(3.0, 2.2), arrowprops=dict(arrowstyle="->", color='#475569', lw=2))
ax.annotate('', xy=(6.95, 2.2), xytext=(6.35, 2.2), arrowprops=dict(arrowstyle="->", color='#475569', lw=2))

plt.suptitle("GeoAgri Cloud-Native Architecture: Zero Proprietary License Overhead", fontsize=9.5, fontweight='bold', y=0.98)
plt.tight_layout()
plt.savefig('pdf_assets/cloud_tech_stack.png')
plt.close()

# -------------------------------------------------------------
# 5. 24-Week Phased Gantt Roadmap & Gateways
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9.2, 2.8), dpi=300)

phases = [
    ("M6: VAPT Security & Handover", 20, 4, "#0f172a"),
    ("M5: Ground-Truthing & Tuning", 16, 4, "#0284c7"),
    ("M4: MVP Release [CRITICAL GATE]", 12, 4, "#dc2626"),
    ("M3: Spatial Backend & APIs", 8, 4, "#d97706"),
    ("M2: Fallow & Silt Algorithms", 4, 4, "#0d9488"),
    ("M1: Inception & Data Pipeline", 0, 4, "#059669")
]

for i, (p_name, start, duration, col) in enumerate(phases):
    ax.barh(i, duration, left=start, height=0.55, color=col, edgecolor='black', linewidth=0.5)

ax.set_yticks(range(len(phases)))
ax.set_yticklabels([p[0] for p in phases], fontsize=7.5, fontweight='bold')
ax.set_xlabel("Development Timeline (Weeks 1 to 24)", fontsize=8, fontweight='bold')
ax.set_xlim(0, 24)
ax.set_xticks(range(0, 25, 4))
ax.set_xticklabels([f"W{w}" for w in range(0, 25, 4)], fontsize=7.5)

# Highlight M4 Gate
ax.axvline(16, color='#dc2626', linestyle='--', linewidth=1.5)
ax.text(16.2, 1.8, "Month 4 Validation Gate:\nAlpha DSS Staging Live", fontsize=7, color='#dc2626', fontweight='bold')

ax.set_title("24-Week Agile Development Roadmap with Month 4 Field Validation Readiness", fontsize=9.5, fontweight='bold', pad=8)
plt.tight_layout()
plt.savefig('pdf_assets/gantt_roadmap.png')
plt.close()

# -------------------------------------------------------------
# 6. Governance & Compliance Badge
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9.0, 2.2), dpi=300)
ax.set_xlim(0, 10)
ax.set_ylim(0, 4)
ax.axis('off')

gov_items = [
    ("National Geospatial\nPolicy (2022)", "#0284c7", "Full DST compliance;\nsanctioned open satellite\nfeeds only.", 1.2),
    ("DPDP Act (2023)\nPrivacy by Design", "#059669", "Zero farmer PII on maps;\nindexed purely by spatial\nULPIN Bhu-Aadhaar.", 3.7),
    ("Jan Parichay SSO\nTiered RBAC", "#d97706", "Role-based security\n(State, District DAO,\nField ADO permissions).", 6.2),
    ("Human-in-the-Loop\nSafety Guard", "#7c3aed", "AI provides advisory DSS;\nformal scheme sign-off\nmandates physical ADO.", 8.7)
]

for title, col, desc, x in gov_items:
    card = patches.FancyBboxPatch((x-1.1, 0.3), 2.2, 3.4, boxstyle="round,pad=0.1", facecolor='#f8fafc', edgecolor=col, linewidth=1.2)
    ax.add_patch(card)
    ax.text(x, 3.2, title, fontsize=7.5, fontweight='bold', color=col, ha='center')
    ax.text(x, 1.6, desc, fontsize=6.5, color='#334155', ha='center')

plt.suptitle("Institutional Governance, Privacy & Regulatory Compliance Framework", fontsize=9.5, fontweight='bold', y=0.98)
plt.tight_layout()
plt.savefig('pdf_assets/governance_security_badge.png')
plt.close()

# -------------------------------------------------------------
# 7. Feature Comparison Radar / Benchmark
# -------------------------------------------------------------
categories = ['Update Frequency', 'Spatial Resolution', 'Monsoon Cloud Penetration', 'Actionable Decision Support', 'Field Ground PWA Integration']
geoagri_scores = [9.5, 9.0, 9.5, 9.2, 9.0]
bhuvan_scores = [4.0, 5.0, 2.0, 4.0, 2.0]
legacy_scores = [2.0, 3.0, 1.0, 2.0, 1.0]

x = np.arange(len(categories))
width = 0.26

fig, ax = plt.subplots(figsize=(9.2, 3.4), dpi=300)

rects1 = ax.bar(x - width, legacy_scores, width, label='Conventional Revenue Records (Chitha)', color='#94a3b8')
rects2 = ax.bar(x, bhuvan_scores, width, label='Standard Bhuvan LULC (Decadal Coarse)', color='#0284c7')
rects3 = ax.bar(x + width, geoagri_scores, width, label='GeoAgri-Assam (NESFIC-D-13 Solution)', color='#059669')

ax.set_ylabel('Capability Rating (1 - 10)', fontsize=8, fontweight='bold')
ax.set_title('Comparative Capability Benchmark: GeoAgri vs. Existing State Alternatives', fontsize=10, fontweight='bold', pad=10)
ax.set_xticks(x)
ax.set_xticklabels(categories, fontsize=7, fontweight='semibold', rotation=10)
ax.set_ylim(0, 11)
ax.legend(loc='upper left', fontsize=7.5, frameon=True)

plt.tight_layout()
plt.savefig('pdf_assets/feature_comparison_radar.png')
plt.close()

print('All 7 proposal enhancement diagrams generated successfully!')
