import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, ax = plt.subplots(figsize=(10, 5.5), dpi=300)
ax.axis('off')

# Background
rect_bg = patches.Rectangle((0, 0), 10, 5.5, facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1)
ax.add_patch(rect_bg)

# Column 1: Earth Observation Data
ax.text(1.2, 5.0, "1. Multi-Source Ingestion", fontsize=11, fontweight='bold', color='#0f172a', ha='center')
box1 = patches.FancyBboxPatch((0.2, 0.6), 2.0, 4.1, boxstyle="round,pad=0.1", facecolor='#f0fdf4', edgecolor='#86efac', linewidth=1.5)
ax.add_patch(box1)
layers = [
    "• Sentinel-2 MSI (10m Optical)\n  NDVI / NDWI / BSI",
    "• Sentinel-1 SAR (C-Band)\n  Flood / Moisture / Silt",
    "• Cartosat / SRTM DEM (30m)\n  Slope / Aspect / Drainage",
    "• Digital Soil Health Cards\n  SOC, pH, N-P-K",
    "• Cadastral Parcel Bounds\n  DHARITREE / Bhuraksha"
]
y_pos = 4.0
for l in layers:
    ax.text(0.35, y_pos, l, fontsize=7.5, color='#14532d', va='top')
    y_pos -= 0.85

# Column 2: Preprocessing & ML Pipeline
ax.text(4.2, 5.0, "2. AI Remote Sensing Engine", fontsize=11, fontweight='bold', color='#0f172a', ha='center')
box2 = patches.FancyBboxPatch((3.0, 0.6), 2.4, 4.1, boxstyle="round,pad=0.1", facecolor='#eff6ff', edgecolor='#93c5fd', linewidth=1.5)
ax.add_patch(box2)
steps = [
    "• Atmospheric Corr (Sen2Cor)\n  Cloud/Shadow Masking",
    "• Harmonic Phenology Filter\n  Fallow vs Double-Crop",
    "• SAR Flood Recession Silt\n  Char-Chapori Delineation",
    "• AHP Multi-Criteria Index\n  Fertility Score (FCI 0-100)",
    "• XGBoost Crop Matcher\n  Yield & Margin Estimation"
]
y_pos = 4.0
for s in steps:
    ax.text(3.15, y_pos, s, fontsize=7.5, color='#1e3a8a', va='top')
    y_pos -= 0.85

# Column 3: Spatial DB & Microservices
ax.text(6.8, 5.0, "3. Spatial Data Services", fontsize=11, fontweight='bold', color='#0f172a', ha='center')
box3 = patches.FancyBboxPatch((5.8, 0.6), 2.0, 4.1, boxstyle="round,pad=0.1", facecolor='#fefce8', edgecolor='#fde047', linewidth=1.5)
ax.add_patch(box3)
db_items = [
    "• PostgreSQL 16 + PostGIS\n  Spatial R-Tree Indexing",
    "• Geoserver / Vector Tiles\n  OGC WMS / WFS / GeoJSON",
    "• FastAPI Asynchronous API\n  Sub-second Spatial Queries",
    "• Redis Tile & Query Cache\n  High Concurrency DSS"
]
y_pos = 3.9
for d in db_items:
    ax.text(5.95, y_pos, d, fontsize=7.5, color='#713f12', va='top')
    y_pos -= 0.95

# Column 4: Client & Decision Applications
ax.text(9.0, 5.0, "4. Decision UI", fontsize=11, fontweight='bold', color='#0f172a', ha='center')
box4 = patches.FancyBboxPatch((8.2, 0.6), 1.6, 4.1, boxstyle="round,pad=0.1", facecolor='#faf5ff', edgecolor='#d8b4fe', linewidth=1.5)
ax.add_patch(box4)
ui_items = [
    "• Web GIS Portal\n  React / Leaflet",
    "• Parcel Dossier\n  Soil & Crop AI",
    "• ADO Task PWA\n  Field Validation",
    "• Export Engine\n  PDF / GeoJSON"
]
y_pos = 3.8
for u in ui_items:
    ax.text(8.3, y_pos, u, fontsize=7.5, color='#581c87', va='top')
    y_pos -= 0.95

# Connecting arrows
ax.annotate('', xy=(3.0, 2.7), xytext=(2.2, 2.7), arrowprops=dict(arrowstyle="->", color='#475569', lw=2))
ax.annotate('', xy=(5.8, 2.7), xytext=(5.4, 2.7), arrowprops=dict(arrowstyle="->", color='#475569', lw=2))
ax.annotate('', xy=(8.2, 2.7), xytext=(7.8, 2.7), arrowprops=dict(arrowstyle="->", color='#475569', lw=2))

plt.tight_layout()
plt.savefig('pdf_assets/architecture_diagram.png')
plt.close()

print('Architecture diagram created!')
