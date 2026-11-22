import React from 'react';
import { Map, BarChart3, ClipboardCheck, Satellite, Layers, ShieldCheck, Download } from 'lucide-react';
import { ASSAM_DISTRICTS } from '../data/assamGeospatialData';

interface NavbarProps {
  activeTab: 'map' | 'analytics' | 'tasks';
  setActiveTab: (tab: 'map' | 'analytics' | 'tasks') => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  totalParcelsCount: number;
  totalHectares: number;
  onExportGeoJSON: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedDistrict,
  setSelectedDistrict,
  totalParcelsCount,
  totalHectares,
  onExportGeoJSON
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white shrink-0 z-30">
      {/* Top Banner */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/70 text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            NESFIC 2026 • Challenge Track D-13
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Dept of Science & Technology (ASSAC) | Directorate of Agriculture, Govt of Assam
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <Satellite className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Sentinel-1/2 SAR Synced:</span>
            <span className="text-cyan-300 font-mono font-semibold">22-Nov-2026</span>
          </div>
          <div className="flex items-center gap-1.5 hidden md:flex">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Resolution:</span>
            <span className="text-amber-300 font-mono font-semibold">10m Cadastral Mesh</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-500/30">
            <Layers className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                GeoAgri-Assam <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">DSS v2.4</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Geospatial Identification of Cultivable & Fertile Agricultural Potential Lands
            </p>
          </div>
        </div>

        {/* Center Tab Switcher */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'map'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Map className="w-4 h-4" />
            Spatial GIS Map
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'analytics'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            State & District Analytics
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'tasks'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            Ground-Truthing Tasks
          </button>
        </div>

        {/* Right Section: District Selector & Export */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden lg:block">
            <div className="text-xs text-slate-400">Delineated Potential</div>
            <div className="text-sm font-semibold text-emerald-400 font-mono">
              {totalHectares.toFixed(1)} ha <span className="text-xs text-slate-500 font-normal">({totalParcelsCount} parcels)</span>
            </div>
          </div>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {ASSAM_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d === 'All Districts' ? '🌍 All Assam Districts' : `📍 ${d}`}
              </option>
            ))}
          </select>

          <button
            onClick={onExportGeoJSON}
            title="Export Delineated Land Parcels as GeoJSON"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export GeoJSON</span>
          </button>
        </div>
      </div>
    </header>
  );
};
