import React from 'react';
import { LandParcel } from '../types';
import { BarChart3, TrendingUp, Sprout, Layers, PieChart, Calendar, Award } from 'lucide-react';

interface AnalyticsDashboardProps {
  parcels: LandParcel[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ parcels }) => {
  const totalHectares = parcels.reduce((acc, p) => acc + p.areaHectares, 0);
  const avgFci = parcels.length > 0
    ? (parcels.reduce((acc, p) => acc + p.fciScore, 0) / parcels.length).toFixed(1)
    : '0';

  const primeParcels = parcels.filter((p) => p.fciScore >= 88);
  const primeHectares = primeParcels.reduce((acc, p) => acc + p.areaHectares, 0);

  // Group by District
  const districtMap: Record<string, { hectares: number; count: number }> = {};
  parcels.forEach((p) => {
    if (!districtMap[p.district]) {
      districtMap[p.district] = { hectares: 0, count: 0 };
    }
    districtMap[p.district].hectares += p.areaHectares;
    districtMap[p.district].count += 1;
  });

  // Group by Status
  const statusMap: Record<string, number> = {};
  parcels.forEach((p) => {
    statusMap[p.landStatus] = (statusMap[p.landStatus] || 0) + p.areaHectares;
  });

  return (
    <div className="flex-1 bg-slate-950 overflow-y-auto p-6 text-slate-100 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Assam State Agro-Geospatial Intelligence Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Spatial analytics derived from Sentinel-1/2, Cartosat DEM, and Digital Soil Health Card registers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            Phenological Analysis Window: 2024–2026 Time-Series
          </span>
        </div>
      </div>

      {/* Top Executive KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Total Cultivable Fallow Mapped</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {totalHectares.toFixed(1)} <span className="text-sm font-normal text-slate-400">ha</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Across {parcels.length} verified spatial clusters
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Grade A (Prime Fertile) Potential</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {primeHectares.toFixed(1)} <span className="text-sm font-normal text-slate-400">ha</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1.5">
            {((primeHectares / (totalHectares || 1)) * 100).toFixed(0)}% of total identified land
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Mean Fertility & Cultivability Index</div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
            {avgFci} <span className="text-sm font-normal text-slate-400">/ 100</span>
          </div>
          <div className="text-[11px] text-amber-500/80 mt-1.5 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> High regional agricultural viability
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Projected Revenue Upside</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">
            ₹{(totalHectares * 0.65).toFixed(1)} <span className="text-sm font-normal text-slate-400">Cr</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1.5">Annual crop gross margin potential</div>
        </div>
      </div>

      {/* Row 2: District Breakdown & Land Classification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Breakdown */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              District-Wise Cultivable Fallow Acreage
            </h3>
            <span className="text-xs text-slate-400">Area in Hectares</span>
          </div>

          <div className="space-y-3">
            {Object.entries(districtMap).map(([district, data]) => {
              const percentage = Math.min(100, (data.hectares / totalHectares) * 100);
              return (
                <div key={district} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">{district}</span>
                    <span className="font-mono text-emerald-400 font-semibold">
                      {data.hectares.toFixed(1)} ha ({data.count} parcels)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Land Category Distribution */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-cyan-400" />
              Land Classification Categories
            </h3>
            <span className="text-xs text-slate-400">Aggregated Area</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(statusMap).map(([status, ha]) => (
              <div key={status} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <div className="text-[11px] text-slate-400 font-medium">{status}</div>
                <div className="text-lg font-bold text-white font-mono mt-1">{ha.toFixed(1)} ha</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">
                  {((ha / (totalHectares || 1)) * 100).toFixed(0)}% of total
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Phenological Cycle & High-Value Crops */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phenological NDVI Cycle Chart */}
        <div className="lg:col-span-2 bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-lime-400" />
              Assam Agro-Phenological Cycle (Harmonic NDVI Profile)
            </h3>
            <span className="text-xs text-lime-400 font-mono">Fallow Detection Window</span>
          </div>
          <p className="text-xs text-slate-400">
            Automated detection captures the drop in NDVI (vegetation index) post-Kharif harvest (Nov–Jan), identifying prime fallow windows for Rabi oilseeds and winter vegetables.
          </p>

          {/* Simple SVG Phenology Visualizer */}
          <div className="pt-2">
            <div className="h-32 w-full bg-slate-950 rounded-lg p-3 border border-slate-800/80 flex items-end justify-between gap-1">
              {[
                { month: 'Jan', ndvi: 0.22, fallow: true },
                { month: 'Feb', ndvi: 0.35, fallow: false },
                { month: 'Mar', ndvi: 0.40, fallow: false },
                { month: 'Apr', ndvi: 0.48, fallow: false },
                { month: 'May', ndvi: 0.55, fallow: false },
                { month: 'Jun', ndvi: 0.62, fallow: false },
                { month: 'Jul', ndvi: 0.78, fallow: false },
                { month: 'Aug', ndvi: 0.85, fallow: false },
                { month: 'Sep', ndvi: 0.80, fallow: false },
                { month: 'Oct', ndvi: 0.60, fallow: false },
                { month: 'Nov', ndvi: 0.20, fallow: true },
                { month: 'Dec', ndvi: 0.18, fallow: true }
              ].map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t transition-all ${
                      m.fallow
                        ? 'bg-amber-500/80 border-t-2 border-amber-300'
                        : 'bg-emerald-600/60'
                    }`}
                    style={{ height: `${m.ndvi * 100}%` }}
                    title={`${m.month}: NDVI ${m.ndvi} ${m.fallow ? '(Arable Fallow Window)' : ''}`}
                  ></div>
                  <span className="text-[10px] text-slate-400">{m.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600"></span> Kharif Paddy / Monsoon Peak
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Detected Arable Fallow Window (Rabi Potential)
              </span>
            </div>
          </div>
        </div>

        {/* High Value Crop Potential */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            Top Recommended Crops
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Mustard / Yellow Sarson</div>
                <div className="text-[10px] text-slate-400">TS-36 / TS-38 varieties</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">95% Match</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Boro / Specialty Rice</div>
                <div className="text-[10px] text-slate-400">Joha & Deepwater organic</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">92% Match</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Kaji Nemu (Assam Lemon)</div>
                <div className="text-[10px] text-slate-400">GI-tagged export citrus</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">89% Match</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Riverbed Cucurbits</div>
                <div className="text-[10px] text-slate-400">Watermelon & winter gourds</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">88% Match</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
