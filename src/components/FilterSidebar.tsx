import React from 'react';
import { Filter, Search, SlidersHorizontal, Sparkles, RefreshCw, Layers, ShieldAlert, Mountain, Droplets } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  activeLayers: {
    parcels: boolean;
    ndvi: boolean;
    sarFlood: boolean;
    soilCarbon: boolean;
  };
  setActiveLayers: React.Dispatch<React.SetStateAction<{
    parcels: boolean;
    ndvi: boolean;
    sarFlood: boolean;
    soilCarbon: boolean;
  }>>;
  matchingCount: number;
  totalHectares: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filter,
  setFilter,
  activeLayers,
  setActiveLayers,
  matchingCount,
  totalHectares
}) => {
  const landStatuses = [
    { label: 'Seasonal Fallow', desc: 'Single-cropped Rabi/Kharif gap' },
    { label: 'Char Silt Land', desc: 'Brahmaputra post-flood rich silt' },
    { label: 'Current Fallow', desc: 'Uncultivated for 1–2 seasons' },
    { label: 'Culturable Waste', desc: 'Degraded arable plain / tea fringe' }
  ];

  const handleLandStatusToggle = (status: string) => {
    if (filter.landStatus.includes(status)) {
      setFilter({
        ...filter,
        landStatus: filter.landStatus.filter((s) => s !== status)
      });
    } else {
      setFilter({
        ...filter,
        landStatus: [...filter.landStatus, status]
      });
    }
  };

  const resetFilters = () => {
    setFilter({
      district: 'All Districts',
      landStatus: ['Seasonal Fallow', 'Char Silt Land', 'Current Fallow', 'Culturable Waste'],
      minFci: 70,
      maxSlope: 5.0,
      maxFloodRisk: 30,
      searchQuery: ''
    });
  };

  const applyPreset = (preset: 'prime' | 'char' | 'oilseed') => {
    if (preset === 'prime') {
      setFilter({
        ...filter,
        minFci: 88,
        maxSlope: 2.0,
        maxFloodRisk: 15
      });
    } else if (preset === 'char') {
      setFilter({
        ...filter,
        landStatus: ['Char Silt Land'],
        minFci: 85,
        maxSlope: 1.5,
        maxFloodRisk: 35
      });
    } else if (preset === 'oilseed') {
      setFilter({
        ...filter,
        landStatus: ['Seasonal Fallow', 'Current Fallow'],
        minFci: 75,
        maxSlope: 3.0,
        maxFloodRisk: 15
      });
    }
  };

  return (
    <aside className="w-80 bg-slate-900/95 border-r border-slate-800 text-slate-200 flex flex-col h-full shrink-0 z-20 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white">Geospatial Filters</h2>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition"
          title="Reset to defaults"
        >
          <RefreshCw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Result Counter Pill */}
      <div className="px-4 py-3 bg-emerald-950/40 border-b border-emerald-900/40 flex items-center justify-between">
        <div>
          <div className="text-xs text-emerald-300 font-medium">Filtered Potential</div>
          <div className="text-base font-bold text-emerald-400 font-mono">
            {totalHectares.toFixed(1)} ha
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 font-semibold">
          {matchingCount} parcels
        </span>
      </div>

      <div className="p-4 space-y-5 text-xs">
        {/* Search */}
        <div>
          <label className="block text-slate-400 font-medium mb-1.5">Search Location / Parcel</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="e.g. Hajo, Silghat, AS-KAM..."
              value={filter.searchQuery}
              onChange={(e) => setFilter({ ...filter, searchQuery: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Quick Decision Presets */}
        <div>
          <label className="block text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Priority Decision Presets
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => applyPreset('prime')}
              className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-700/50 transition flex items-center justify-between"
            >
              <span>⭐ Prime Fertile Fallows (FCI ≥ 88)</span>
            </button>
            <button
              onClick={() => applyPreset('char')}
              className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-700/50 transition flex items-center justify-between"
            >
              <span>🌊 Post-Flood Char Silt Tracts</span>
            </button>
            <button
              onClick={() => applyPreset('oilseed')}
              className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-700/50 transition flex items-center justify-between"
            >
              <span>🌾 Mustard / Pulse Expansion Zones</span>
            </button>
          </div>
        </div>

        {/* Land Category Selection */}
        <div>
          <label className="block text-slate-400 font-medium mb-2">Land Classification</label>
          <div className="space-y-1.5">
            {landStatuses.map(({ label, desc }) => {
              const checked = filter.landStatus.includes(label);
              return (
                <label
                  key={label}
                  className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer border transition ${
                    checked
                      ? 'bg-slate-800/70 border-emerald-600/40 text-slate-100'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleLandStatusToggle(label)}
                    className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-400 bg-slate-900"
                  />
                  <div>
                    <div className="font-medium text-xs text-slate-200">{label}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{desc}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Sliders: Fertility & Cultivability Index (FCI) */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-slate-300 font-medium flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              Min Fertility Index (FCI)
            </label>
            <span className="font-mono text-emerald-400 font-bold text-xs">{filter.minFci} / 100</span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            step="1"
            value={filter.minFci}
            onChange={(e) => setFilter({ ...filter, minFci: Number(e.target.value) })}
            className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>50 (Moderate)</span>
            <span>75 (High)</span>
            <span>95 (Exceptional)</span>
          </div>
        </div>

        {/* Topography: Slope */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-slate-300 font-medium flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              Max Ground Slope
            </label>
            <span className="font-mono text-amber-400 font-bold text-xs">≤ {filter.maxSlope}°</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="8.0"
            step="0.5"
            value={filter.maxSlope}
            onChange={(e) => setFilter({ ...filter, maxSlope: Number(e.target.value) })}
            className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>1° (Flat Alluvial)</span>
            <span>4° (Gentle)</span>
            <span>8° (Upland)</span>
          </div>
        </div>

        {/* Flood Risk Mask */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-slate-300 font-medium flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              Max Flood Recurrence
            </label>
            <span className="font-mono text-cyan-400 font-bold text-xs">≤ {filter.maxFloodRisk}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={filter.maxFloodRisk}
            onChange={(e) => setFilter({ ...filter, maxFloodRisk: Number(e.target.value) })}
            className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>10% (Low Risk)</span>
            <span>30% (Moderate)</span>
            <span>50% (High Silt/Rabi Only)</span>
          </div>
        </div>

        {/* Remote Sensing Layer Toggles */}
        <div className="pt-2 border-t border-slate-800">
          <label className="block text-slate-400 font-medium mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Satellite Remote Sensing Overlays
          </label>
          <div className="space-y-1.5">
            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300">Delineated Cultivable Parcels</span>
              <input
                type="checkbox"
                checked={activeLayers.parcels}
                onChange={(e) => setActiveLayers({ ...activeLayers, parcels: e.target.checked })}
                className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-400 bg-slate-900"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                Sentinel-2 NDVI Phenology
              </span>
              <input
                type="checkbox"
                checked={activeLayers.ndvi}
                onChange={(e) => setActiveLayers({ ...activeLayers, ndvi: e.target.checked })}
                className="rounded border-slate-700 text-lime-500 focus:ring-lime-400 bg-slate-900"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Sentinel-1 SAR Flood / Silt Mask
              </span>
              <input
                type="checkbox"
                checked={activeLayers.sarFlood}
                onChange={(e) => setActiveLayers({ ...activeLayers, sarFlood: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Soil Organic Carbon (SOC) Grid
              </span>
              <input
                type="checkbox"
                checked={activeLayers.soilCarbon}
                onChange={(e) => setActiveLayers({ ...activeLayers, soilCarbon: e.target.checked })}
                className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-900"
              />
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};
