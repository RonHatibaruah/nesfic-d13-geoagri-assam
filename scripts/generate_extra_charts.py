import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
import os

os.makedirs('pdf_assets', exist_ok=True)
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')

# -------------------------------------------------------------
# 1. Before vs. After: Conventional vs. GeoAgri AI Discovery
# -------------------------------------------------------------
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9, 4.0), dpi=300)

# Left: Conventional
ax1.set_xlim(0, 10)
ax1.set_ylim(0, 10)
ax1.axis('off')
rect1 = patches.Rectangle((0, 0), 10, 10, facecolor='#f1f5f9', edgecolor='#94a3b8', linewidth=1.5)
ax1.add_patch(rect1)

river = patches.Polygon([[0, 2], [10, 3], [10, 1], [0, 0]], facecolor='#93c5fd', edgecolor='#60a5fa')
ax1.add_patch(river)
sand = patches.Polygon([[2, 4], [8, 5], [7, 8], [3, 7]], facecolor='#e2e8f0', edgecolor='#cbd5e1')
ax1.add_patch(sand)

ax1.text(5, 9.2, "Conventional Single-Date Optical Survey", fontsize=10.5, fontweight='bold', color='#1e293b', ha='center')
ax1.text(5, 5.8, "CLASSIFIED AS:\n'Barren River Sand / Wasteland'\n(Decadal Survey: UNUSABLE)", 
         fontsize=9, fontweight='bold', color='#b91c1c', ha='center',
         bbox=dict(boxstyle="round,pad=0.4", facecolor='#fee2e2', edgecolor='#f87171'))
ax1.text(5, 0.6, "Fails to detect post-flood alluvial nutrient richness", fontsize=8, color='#64748b', ha='center', style='italic')

# Right: GeoAgri AI Discovery
ax2.set_xlim(0, 10)
ax2.set_ylim(0, 10)
ax2.axis('off')
rect2 = patches.Rectangle((0, 0), 10, 10, facecolor='#09101d', edgecolor='#10b981', linewidth=2)
ax2.add_patch(rect2)

river2 = patches.Polygon([[0, 2], [10, 3], [10, 1], [0, 0]], facecolor='#0369a1', edgecolor='#0284c7')
ax2.add_patch(river2)
silt2 = patches.Polygon([[2, 4], [8, 5], [7, 8], [3, 7]], facecolor='#059669', edgecolor='#34d399', alpha=0.85, linewidth=2)
ax2.add_patch(silt2)

ax2.text(5, 9.2, "GeoAgri SAR + Soil Multi-Spectral Fusion", fontsize=10.5, fontweight='bold', color='#34d399', ha='center')
ax2.text(5, 6.0, "DISCOVERED & DELINEATED:\nPrime Recessional Silt Plain\nFCI Score: 92/100 (Grade A Prime)", 
         fontsize=9, fontweight='bold', color='#ecfdf5', ha='center',
         bbox=dict(boxstyle="round,pad=0.4", facecolor='#065f46', edgecolor='#10b981'))
ax2.text(5, 3.8, "• Soil Organic Carbon: 1.62% (High Fertility)\n• Recommended Crop: Toria TS-36 / Mustard\n• Projected Producer Margin: Rs. 45,000 / ha",
         fontsize=7.5, color='#a7f3d0', ha='center')
ax2.text(5, 0.6, "Unlocks high-value riverine char tracts for FPO expansion", fontsize=8, color='#6ee7b7', ha='center', style='italic')

plt.tight_layout()
plt.savefig('pdf_assets/before_after_char.png')
plt.close()

# -------------------------------------------------------------
# 2. False Color Composite (FCC) & Spectral Reflectance Curve
# -------------------------------------------------------------
fig, (ax_fcc, ax_spec) = plt.subplots(1, 2, figsize=(9.5, 4.0), dpi=300)

ax_fcc.set_xlim(0, 10)
ax_fcc.set_ylim(0, 10)
ax_fcc.axis('off')
ax_fcc.add_patch(patches.Rectangle((0, 0), 10, 10, facecolor='#1e1b4b', edgecolor='#4338ca', linewidth=1.5))
ax_fcc.add_patch(patches.Polygon([[0, 4], [4, 9], [9, 8], [6, 3]], facecolor='#e11d48', alpha=0.9, label='Active Vegetation (Crimson)'))
ax_fcc.add_patch(patches.Polygon([[0, 1], [10, 2], [10, 0], [0, 0]], facecolor='#020617', edgecolor='#1e293b'))
ax_fcc.add_patch(patches.Polygon([[4, 3], [8, 4], [7, 7], [3, 6]], facecolor='#06b6d4', alpha=0.85, label='Moist Fertile Silt (Cyan)'))

ax_fcc.set_title("Simulated Sentinel-2 FCC (B8-B4-B3 NIR/Red/Green)", fontsize=9, fontweight='bold', color='#1e293b', pad=8)
ax_fcc.text(5, 0.5, "Deep Crimson = Crops | Cyan = Moist Arable Silt | Black = River", fontsize=7.5, color='#64748b', ha='center')

# Spectral Reflectance Curve
wavelengths = np.linspace(400, 2200, 100)
veg_sig = np.piecewise(wavelengths, 
    [wavelengths < 700, (wavelengths >= 700) & (wavelengths < 1300), wavelengths >= 1300],
    [lambda w: 0.08 - 0.03*np.sin((w-400)/300), lambda w: 0.52 + 0.05*np.cos((w-700)/600), lambda w: 0.28 - 0.08*np.sin((w-1300)/900)]
)
silt_sig = 0.12 + 0.22 * (wavelengths - 400) / 1800 - 0.06 * np.exp(-((wavelengths - 1450)/120)**2) - 0.07 * np.exp(-((wavelengths - 1950)/120)**2)
sand_sig = 0.22 + 0.35 * (wavelengths - 400) / 1800

ax_spec.plot(wavelengths, veg_sig, color='#e11d48', linewidth=2.2, label='Vegetation (Chlorophyll Red Edge)')
ax_spec.plot(wavelengths, silt_sig, color='#0284c7', linewidth=2.2, label='Moist Fertile Silt (Moisture Dips)')
ax_spec.plot(wavelengths, sand_sig, color='#d97706', linewidth=2, linestyle='--', label='Coarse Dry Sand (High Albedo)')

ax_spec.axvline(490, color='#94a3b8', linestyle=':', alpha=0.7)
ax_spec.axvline(665, color='#94a3b8', linestyle=':', alpha=0.7)
ax_spec.axvline(842, color='#94a3b8', linestyle=':', alpha=0.7)
ax_spec.axvline(1610, color='#94a3b8', linestyle=':', alpha=0.7)

ax_spec.text(842, 0.55, 'B8 (NIR)', fontsize=7, color='#e11d48', ha='center', fontweight='bold')
ax_spec.text(1610, 0.42, 'B11 (SWIR)', fontsize=7, color='#0284c7', ha='center', fontweight='bold')

ax_spec.set_title("Optical Reflectance Curves: Silt vs. Barren Sand", fontsize=9, fontweight='bold', pad=8)
ax_spec.set_xlabel("Wavelength (nm)", fontsize=8, fontweight='bold')
ax_spec.set_ylabel("Surface Reflectance", fontsize=8, fontweight='bold')
ax_spec.set_ylim(0, 0.7)
ax_spec.legend(loc='upper left', fontsize=7, frameon=True)

plt.tight_layout()
plt.savefig('pdf_assets/fcc_spectral_reflectance.png')
plt.close()

# -------------------------------------------------------------
# 3. 4-Season Satellite Phenology Sequence
# -------------------------------------------------------------
fig, axes = plt.subplots(1, 4, figsize=(10, 3.2), dpi=300)
seasons = [
    ("1. July: Peak Monsoon", "#0284c7", "SAR Inundation Mask", "Brahmaputra overflow tracks\nsilt deposition footprint"),
    ("2. October: Flood Recedes", "#0d9488", "Recessional Silt Delineation", "Moist alluvial silt beds\nexposed along river bends"),
    ("3. December: Arable Fallow", "#d97706", "GeoAgri Detection Window", "NDVI ~0.18, high moisture;\nflagged for Rabi sowing"),
    ("4. February: Mustard Harvest", "#16a34a", "Emergent Crop Canopy", "Double-cropped yellow sarson\nyields Rs. 45k/ha margin")
]

for i, (ax, (title, col, sub, desc)) in enumerate(zip(axes, seasons)):
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    card = patches.FancyBboxPatch((0.2, 0.2), 9.6, 9.6, boxstyle="round,pad=0.2", facecolor='#f8fafc', edgecolor=col, linewidth=1.5)
    ax.add_patch(card)
    
    header = patches.Rectangle((0.2, 7.8), 9.6, 2.0, facecolor=col)
    ax.add_patch(header)
    ax.text(5, 8.8, title, fontsize=8, fontweight='bold', color='white', ha='center')
    
    circle = patches.Circle((5, 5.0), 1.8, facecolor=col, alpha=0.2, edgecolor=col, linewidth=1.5)
    ax.add_patch(circle)
    ax.text(5, 5.0, f"Stage {i+1}", fontsize=9, fontweight='bold', color=col, ha='center', va='center')
    
    ax.text(5, 2.5, sub, fontsize=8, fontweight='bold', color='#1e293b', ha='center')
    ax.text(5, 1.2, desc, fontsize=7, color='#64748b', ha='center')

plt.suptitle("Multi-Temporal Earth Observation Sequence: Unlocking Seasonal Fallows across Assam", fontsize=10.5, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig('pdf_assets/four_season_phenology_strip.png')
plt.close()

# -------------------------------------------------------------
# 4. Mobile Ground-Truthing & ADO Field Verification Workflow
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(8.5, 4.0), dpi=300)
ax.axis('off')
ax.set_xlim(0, 10)
ax.set_ylim(0, 6)

phone = patches.FancyBboxPatch((0.8, 0.5), 3.2, 5.0, boxstyle="round,pad=0.2", facecolor='#0f172a', edgecolor='#334155', linewidth=2.5)
ax.add_patch(phone)
screen = patches.Rectangle((1.0, 0.8), 2.8, 4.2, facecolor='#020617')
ax.add_patch(screen)

ax.text(2.4, 4.6, "GeoAgri Field ADO", fontsize=8.5, fontweight='bold', color='#34d399', ha='center')
ax.text(2.4, 4.2, "Task #TSK-2026-081", fontsize=7, color='#94a3b8', ha='center')

map_box = patches.Rectangle((1.2, 2.2), 2.4, 1.8, facecolor='#1e293b', edgecolor='#10b981', linewidth=1)
ax.add_patch(map_box)
ax.text(2.4, 3.2, "GPS: 26.2420 N, 91.5830 E", fontsize=6.5, color='#38bdf8', ha='center', fontweight='bold')
ax.text(2.4, 2.7, "Parcel: AS-KAM-2026-F101", fontsize=6, color='#f1f5f9', ha='center')
ax.text(2.4, 2.4, "Hajo Block, Kamrup Rural", fontsize=5.5, color='#94a3b8', ha='center')

ax.text(1.3, 1.8, "Soil pH: 6.2 (Tested OK)", fontsize=6.5, color='#e2e8f0')
ax.text(1.3, 1.5, "Organic Carbon: 1.45%", fontsize=6.5, color='#e2e8f0')

btn = patches.Rectangle((1.3, 0.95), 2.2, 0.4, facecolor='#059669', edgecolor='#34d399', linewidth=0.5)
ax.add_patch(btn)
ax.text(2.4, 1.15, "[SUBMIT GROUND VERIFICATION]", fontsize=5.5, color='white', ha='center', fontweight='bold')

ax.text(5.0, 5.2, "Field Verification & Ground-Truthing Workflow", fontsize=11, fontweight='bold', color='#065f46')
workflow_steps = [
    ("Step 1: Automated Dispatch", "DAO filters prime fallows and dispatches geo-fenced tasks to field ADO with digital boundary."),
    ("Step 2: On-Site Inspection", "ADO arrives at exact parcel coordinates; app logs GPS timestamp and verifies terrain access."),
    ("Step 3: Rapid Soil Testing", "Soil pH and rapid test kit results cross-checked against satellite-derived Fertility Index (FCI)."),
    ("Step 4: Beneficiary FPO Onboarding", "Verified land tagged for collective multi-cropping under state schemes (MOVCDNER, PM-KUSUM)."),
    ("Step 5: Immutable State Registry", "Field report synced to Assam State Space Application Centre (ASSAC) spatial repository.")
]

y_pos = 4.4
for title, desc in workflow_steps:
    ax.text(5.0, y_pos, title, fontsize=8.5, fontweight='bold', color='#0f172a')
    ax.text(5.0, y_pos - 0.35, desc, fontsize=7.5, color='#475569')
    bullet = patches.Circle((4.7, y_pos - 0.1), 0.12, facecolor='#10b981')
    ax.add_patch(bullet)
    y_pos -= 0.85

plt.tight_layout()
plt.savefig('pdf_assets/mobile_ground_truthing_pwa.png')
plt.close()

# -------------------------------------------------------------
# 5. Macro-Level State Agricultural Upside & Heatmap
# -------------------------------------------------------------
districts_assam = ['Nagaon', 'Barpeta', 'Kamrup Rural', 'Darrang', 'Sonitpur', 'Jorhat', 'Cachar', 'Golaghat']
fallow_area_k_ha = [38.5, 34.2, 29.8, 24.5, 21.0, 16.4, 14.2, 12.0]
economic_gain_cr = [ha * 0.48 for ha in fallow_area_k_ha]

fig, ax1 = plt.subplots(figsize=(9, 4.0), dpi=300)

x = np.arange(len(districts_assam))
width = 0.38

rects1 = ax1.bar(x - width/2, fallow_area_k_ha, width, label='Identified Cultivable Fallow (\'000 Hectares)', color='#059669')
ax2 = ax1.twinx()
rects2 = ax2.bar(x + width/2, economic_gain_cr, width, label='Projected Annual Agricultural Margin (Rs. Crores)', color='#0284c7')

ax1.set_xlabel('Assam Priority Agro-Ecological Districts', fontsize=9, fontweight='bold')
ax1.set_ylabel('Arable Fallow Land (\'000 Hectares)', fontsize=8.5, fontweight='bold', color='#059669')
ax2.set_ylabel('Annual Revenue Upside (Rs. Crores)', fontsize=8.5, fontweight='bold', color='#0284c7')
ax1.set_xticks(x)
ax1.set_xticklabels(districts_assam, rotation=20, fontsize=8, fontweight='semibold')
ax1.set_title('Macro-Level Economic Upside: Converting Seasonal Fallows to Double-Cropped Agriculture', fontsize=10.5, fontweight='bold', pad=12)

ax1.text(0.5, 30, "Total State Potential:\n• 1.9 Lakh Hectares Fallows\n• Rs. 720+ Cr Annual Producer Margin\n• Primary Crops: Mustard, Joha Rice, Citrus",
         fontsize=7.5, fontweight='bold', color='#065f46',
         bbox=dict(boxstyle="round,pad=0.5", facecolor='#ecfdf5', edgecolor='#86efac'))

lines1, labels1 = ax1.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper right', fontsize=7.5, frameon=True)

plt.tight_layout()
plt.savefig('pdf_assets/macro_state_impact_heatmap.png')
plt.close()

print('All 5 clean technical figures generated!')
