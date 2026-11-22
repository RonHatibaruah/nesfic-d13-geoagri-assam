import React from 'react';
import { X, Sprout, ShieldCheck, Droplets, Mountain, Compass, FileText, Send, CheckCircle2, Award, TrendingUp } from 'lucide-react';
import { LandParcel } from '../types';
import confetti from 'canvas-confetti';

interface ParcelDossierProps {
  parcel: LandParcel | null;
  onClose: () => void;
  onAssignTask: (parcel: LandParcel) => void;
}

export const ParcelDossier: React.FC<ParcelDossierProps> = ({
  parcel,
  onClose,
  onAssignTask
}) => {
  if (!parcel) return null;

  const handleExportPDF = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 }
    });
    window.print();
  };

  const getFciColor = (score: number) => {
    if (score >= 88) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 78) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-slate-900 border-l border-slate-800 shadow-2xl z-40 flex flex-col h-full animate-in slide-in-from-right duration-300">
      {/* Dossier Header */}
      <div className="p-4 border-b border-slate-800 flex items-start justify-between bg-slate-950/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {parcel.id}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getFciColor(parcel.fciScore)}`}>
              {parcel.fertilityGrade}
            </span>
          </div>
          <h2 className="text-base font-bold text-white leading-snug">{parcel.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {parcel.village}, {parcel.revenueCircle} Circle, {parcel.district} District
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">FCI Score</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
              {parcel.fciScore}
              <span className="text-xs text-slate-500 font-normal">/100</span>
            </div>
            <div className="text-[10px] text-emerald-500 font-medium mt-1 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Prime Potential
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Extent</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">
              {parcel.areaHectares}
              <span className="text-xs text-slate-500 font-normal"> ha</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{(parcel.areaHectares * 7.47).toFixed(0)} Bighas approx</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Status</div>
            <div className="text-xs font-bold text-amber-300 mt-1.5 leading-tight">{parcel.landStatus}</div>
            <div className="text-[10px] text-slate-400 mt-1">Satellite: {parcel.lastObservedSatelliteDate}</div>
          </div>
        </div>

        {/* Soil Biophysical Health Card */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              Soil Health & Biochemical Profile
            </span>
            <span className="text-[10px] text-slate-400">Soil Health Card Grid Ref</span>
          </div>

          <div className="text-slate-300 text-[11px] bg-slate-900/80 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-400">Class: </span>
            <span className="font-semibold text-emerald-300">{parcel.soil.soilType}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
              <div className="text-slate-400 text-[10px]">Soil pH Reaction</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">
                {parcel.soil.ph}{' '}
                <span className="text-[10px] font-normal text-emerald-400">
                  {parcel.soil.ph < 6 ? '(Acidic Loam)' : '(Near Neutral)'}
                </span>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
              <div className="text-slate-400 text-[10px]">Soil Organic Carbon (SOC)</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">
                {parcel.soil.organicCarbon}%{' '}
                <span className="text-[10px] font-normal text-emerald-400">
                  {parcel.soil.organicCarbon > 1.2 ? '(High / Fertile)' : '(Moderate)'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="p-2 rounded bg-slate-900 text-center border border-slate-800/60">
              <div className="text-[10px] text-slate-400">Available N</div>
              <div className="font-bold text-xs mt-0.5 text-emerald-400">{parcel.soil.nitrogen}</div>
            </div>
            <div className="p-2 rounded bg-slate-900 text-center border border-slate-800/60">
              <div className="text-[10px] text-slate-400">Available P</div>
              <div className="font-bold text-xs mt-0.5 text-amber-400">{parcel.soil.phosphorus}</div>
            </div>
            <div className="p-2 rounded bg-slate-900 text-center border border-slate-800/60">
              <div className="text-[10px] text-slate-400">Available K</div>
              <div className="font-bold text-xs mt-0.5 text-emerald-400">{parcel.soil.potassium}</div>
            </div>
          </div>
        </div>

        {/* Remote Sensing & Topographic Parameters */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
            <Compass className="w-4 h-4 text-cyan-400" />
            Topographic & Hydrological Sensors
          </span>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800/70">
              <Mountain className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">Cartosat DEM Slope</div>
                <div className="font-semibold text-slate-200 font-mono">{parcel.slopeDegrees}° (Flat Alluvial)</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800/70">
              <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">Water Channel Distance</div>
                <div className="font-semibold text-slate-200 font-mono">{parcel.distanceToWaterMeters} meters</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800/70">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">Sentinel-2 NDVI Mean</div>
                <div className="font-semibold text-slate-200 font-mono">{parcel.ndviMean} (Fallow)</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800/70">
              <Compass className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">SAR Backscatter</div>
                <div className="font-semibold text-slate-200 font-mono">{parcel.sarBackscatterDb} dB</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Crop Suitability Recommendations */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
              <Sprout className="w-4 h-4 text-emerald-400" />
              AI Crop Suitability Recommendations
            </span>
            <span className="text-[10px] text-emerald-400 font-medium">XGBoost Ag-Model</span>
          </div>

          <div className="space-y-2">
            {parcel.recommendedCrops.map((crop, idx) => (
              <div
                key={crop.cropName}
                className="p-3 rounded-xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-100 flex items-center gap-1.5 text-xs">
                    <span className="w-4 h-4 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    {crop.cropName}
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/50">
                    {crop.suitabilityScore}% Match
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 pt-0.5">
                  <div>
                    <span className="text-slate-400">Est. Yield: </span>
                    <span className="font-semibold text-white">{crop.estimatedYieldPerHa}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Est. Gross Margin: </span>
                    <span className="font-semibold text-emerald-400">{crop.expectedGrossMarginPerHa}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic leading-relaxed pt-1 border-t border-slate-800/60">
                  {crop.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Applicable Schemes */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
          <div className="font-semibold text-slate-300 text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Aligned Government Schemes & Subsidies
          </div>
          <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
            {parcel.applicableSchemes.map((scheme) => (
              <li key={scheme} className="text-slate-300">
                <span className="text-emerald-300 font-medium">{scheme}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
        <button
          onClick={() => onAssignTask(parcel)}
          className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-950"
        >
          <Send className="w-3.5 h-3.5" />
          Dispatch Ground-Truthing Task
        </button>

        <button
          onClick={handleExportPDF}
          title="Export parcel suitability dossier"
          className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          Export Dossier
        </button>
      </div>
    </div>
  );
};
