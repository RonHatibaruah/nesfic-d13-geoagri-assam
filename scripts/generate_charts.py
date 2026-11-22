import matplotlib.pyplot as plt
import numpy as np
import os

os.makedirs('pdf_assets', exist_ok=True)
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')

# 1. NDVI Phenology Curve
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
ndvi_double_crop = [0.45, 0.55, 0.65, 0.50, 0.40, 0.58, 0.75, 0.88, 0.82, 0.65, 0.50, 0.42]
ndvi_single_fallow = [0.22, 0.20, 0.18, 0.25, 0.35, 0.55, 0.72, 0.85, 0.78, 0.45, 0.18, 0.16]

fig, ax = plt.subplots(figsize=(8, 4), dpi=300)
ax.plot(months, ndvi_double_crop, color='#0284c7', marker='o', linewidth=2.5, label='Double-Cropped Land (Paddy -> Mustard/Boro)')
ax.plot(months, ndvi_single_fallow, color='#d97706', marker='s', linewidth=2.5, linestyle='--', label='Single-Cropped Fallow (Kharif only -> Rabi Fallow)')
ax.axvspan(9.5, 11.5, color='#fef3c7', alpha=0.6, label='Detected Arable Fallow Window (Nov-Dec)')
ax.axhline(0.25, color='#dc2626', linestyle=':', label='Bare Soil / Fallow Baseline Threshold (0.25)')

ax.set_title('Assam Agro-Phenological Spectral Profile (Sentinel-2 NDVI Time-Series)', fontsize=12, fontweight='bold', pad=12)
ax.set_xlabel('Month of Year', fontsize=10, fontweight='semibold')
ax.set_ylabel('Mean Normalized Difference Veg Index (NDVI)', fontsize=10, fontweight='semibold')
ax.set_ylim(0, 1.0)
ax.legend(loc='upper left', frameon=True, fontsize=8)
plt.tight_layout()
plt.savefig('pdf_assets/ndvi_phenology.png')
plt.close()

# 2. AHP Multi-Criteria Weights
criteria = ['Soil Fertility (SOC & NPK)', 'Irrigation / Water Proximity', 'Ground Slope (DEM)', 'Flood Recurrence Risk']
weights = [35, 25, 20, 20]
colors_ahp = ['#059669', '#0284c7', '#d97706', '#dc2626']

fig, ax = plt.subplots(figsize=(6, 4), dpi=300)
wedges, texts, autotexts = ax.pie(
    weights, 
    labels=criteria, 
    autopct='%1.0f%%', 
    startangle=140, 
    colors=colors_ahp,
    textprops={'fontsize': 9, 'weight': 'bold'},
    wedgeprops={'edgecolor': 'white', 'linewidth': 2}
)
for at in autotexts:
    at.set_color('white')
    at.set_fontsize(10)
ax.set_title('Fertility & Cultivability Index (FCI) AHP Weights Matrix', fontsize=11, fontweight='bold', pad=10)
plt.tight_layout()
plt.savefig('pdf_assets/ahp_weights.png')
plt.close()

# 3. Model Accuracy Metrics & Pilot F1-Scores
districts = ['Kamrup Rural', 'Nagaon', 'Barpeta', 'Sonitpur', 'Jorhat', 'Cachar']
precision = [92.4, 91.0, 89.5, 93.1, 90.8, 88.2]
recall = [88.5, 87.0, 89.0, 86.4, 88.0, 85.5]
f1 = [90.4, 88.9, 89.2, 89.6, 89.4, 86.8]

x = np.arange(len(districts))
width = 0.25

fig, ax = plt.subplots(figsize=(8, 4), dpi=300)
rects1 = ax.bar(x - width, precision, width, label='Precision (%)', color='#0284c7')
rects2 = ax.bar(x, recall, width, label='Recall (%)', color='#059669')
rects3 = ax.bar(x + width, f1, width, label='F1-Score (%)', color='#d97706')

ax.set_ylabel('Validation Accuracy (%)', fontsize=10, fontweight='semibold')
ax.set_title('Fallow Land Detection & Classification Benchmark across Assam Pilot Districts', fontsize=11, fontweight='bold', pad=12)
ax.set_xticks(x)
ax.set_xticklabels(districts, fontsize=9, fontweight='semibold')
ax.set_ylim(70, 100)
ax.axhline(88, color='#dc2626', linestyle='--', linewidth=1.5, label='Target Threshold (88%)')
ax.legend(loc='lower right', frameon=True, fontsize=8)
plt.tight_layout()
plt.savefig('pdf_assets/accuracy_metrics.png')
plt.close()

# 4. SAR Flood Recessional Silt Detection Backscatter
dates = ['Aug 15 (Peak Flood)', 'Sep 10 (Receding)', 'Oct 05 (Exposed Silt)', 'Nov 01 (Dry Silt / Toria Sowing)', 'Dec 01 (Emergent Crop)']
water_db = [-23.5, -21.8, -16.2, -14.1, -11.5] # Water to bare silt to crop
sand_bar_db = [-18.0, -17.5, -18.2, -18.0, -18.1] # Coarse sand (non-arable)

fig, ax = plt.subplots(figsize=(7, 3.8), dpi=300)
ax.plot(dates, water_db, marker='o', linewidth=2.5, color='#059669', label='High-Fertility Riverine Silt (Char-Chapori)')
ax.plot(dates, sand_bar_db, marker='^', linewidth=2, color='#94a3b8', linestyle=':', label='Coarse Riverbed Sand (Non-Cultivable)')
ax.set_ylabel('Sentinel-1 C-Band VV/VH Backscatter (dB)', fontsize=9, fontweight='semibold')
ax.set_title('Sentinel-1 SAR Detection: Alluvial Silt vs. Barren Sand Separation', fontsize=11, fontweight='bold', pad=10)
ax.axhspan(-15, -11, color='#ecfdf5', alpha=0.5, label='Arable Silt Optimal Sowing Zone (-11 to -15 dB)')
ax.legend(loc='lower left', frameon=True, fontsize=8)
plt.xticks(rotation=15, fontsize=8)
plt.tight_layout()
plt.savefig('pdf_assets/sar_silt_separation.png')
plt.close()

print('All 4 technical figures generated successfully!')
