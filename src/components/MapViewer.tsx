import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap, Tooltip, Circle, Rectangle } from 'react-leaflet';
import { LandParcel } from '../types';
import { DISTRICT_CENTERS } from '../data/assamGeospatialData';
import { MapPin, Sprout, Droplets, Info } from 'lucide-react';

interface MapViewerProps {
  parcels: LandParcel[];
  selectedParcel: LandParcel | null;
  onSelectParcel: (parcel: LandParcel) => void;
  selectedDistrict: string;
  activeLayers: {
    parcels: boolean;
    ndvi: boolean;
    sarFlood: boolean;
    soilCarbon: boolean;
  };
}

// Controller component to smoothly fly/pan the map when district or parcel changes
const MapViewController: React.FC<{
  center: [number, number];
  zoom: number;
  selectedParcel: LandParcel | null;
}> = ({ center, zoom, selectedParcel }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedParcel) {
      map.flyTo(selectedParcel.coordinates, 13, { duration: 1.2 });
    } else {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, selectedParcel, map]);

  return null;
};

export const MapViewer: React.FC<MapViewerProps> = ({
  parcels,
  selectedParcel,
  onSelectParcel,
  selectedDistrict,
  activeLayers
}) => {
  const [mapStyle, setMapStyle] = React.useState<'satellite' | 'dark' | 'topo'>('satellite');

  const defaultCenter = DISTRICT_CENTERS[selectedDistrict] || DISTRICT_CENTERS['All Districts'];
  const defaultZoom = selectedDistrict === 'All Districts' ? 8 : 10;

  const getParcelColor = (fci: number) => {
    if (fci >= 88) return '#10b981'; // Emerald - Grade A
    if (fci >= 78) return '#f59e0b'; // Amber - Grade B
    return '#ef4444'; // Red - Grade C
  };

  return (
    <div className="relative w-full h-full flex-1 bg-slate-950 overflow-hidden">
      {/* Basemap Switcher Floating Widget */}
      <div className="absolute top-4 right-4 z-[1000] flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 shadow-xl text-xs">
        <button
          onClick={() => setMapStyle('satellite')}
          className={`px-3 py-1.5 rounded-lg font-medium transition ${
            mapStyle === 'satellite'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          🛰️ True Satellite
        </button>
        <button
          onClick={() => setMapStyle('dark')}
          className={`px-3 py-1.5 rounded-lg font-medium transition ${
            mapStyle === 'dark'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          🗺️ Dark Carto
        </button>
        <button
          onClick={() => setMapStyle('topo')}
          className={`px-3 py-1.5 rounded-lg font-medium transition ${
            mapStyle === 'topo'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          ⛰️ Topo Terrain
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-2xl text-[11px] text-slate-300 space-y-2 pointer-events-auto max-w-[240px]">
        <div className="font-semibold text-white flex items-center gap-1.5 text-xs">
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          Fertility & Cultivability (FCI)
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block border border-emerald-400"></span>
              Grade A (Prime Fertile)
            </span>
            <span className="font-mono text-emerald-400 font-bold">88 - 100</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block border border-amber-400"></span>
              Grade B (Moderately Fertile)
            </span>
            <span className="font-mono text-amber-400 font-bold">75 - 87</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-500 inline-block border border-rose-400"></span>
              Grade C (Marginal / Remedial)
            </span>
            <span className="font-mono text-rose-400 font-bold">&lt; 75</span>
          </div>
        </div>

        {activeLayers.sarFlood && (
          <div className="pt-2 border-t border-slate-800">
            <div className="text-[10px] text-cyan-400 font-medium">Sentinel-1 SAR Silt Zones:</div>
            <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/40 border border-cyan-400"></span>
              Post-Flood Recessional Silt Plain
            </div>
          </div>
        )}

        {activeLayers.ndvi && (
          <div className="pt-2 border-t border-slate-800">
            <div className="text-[10px] text-lime-400 font-medium">Sentinel-2 NDVI Scale:</div>
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-700 via-yellow-400 to-emerald-500 rounded mt-1"></div>
            <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
              <span>0.1 (Fallow)</span>
              <span>0.4 (Emergent)</span>
              <span>0.8 (Dense)</span>
            </div>
          </div>
        )}
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapViewController
          center={defaultCenter}
          zoom={defaultZoom}
          selectedParcel={selectedParcel}
        />

        {/* Dynamic Basemap Tiles */}
        {mapStyle === 'satellite' && (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com">Esri</a>, Earthstar Geographics'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={18}
          />
        )}
        {mapStyle === 'dark' && (
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />
        )}
        {mapStyle === 'topo' && (
          <TileLayer
            attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            maxZoom={17}
          />
        )}

        {/* Simulated Sentinel-1 SAR Brahmaputra Flood / Recessional Silt Overlays */}
        {activeLayers.sarFlood && (
          <>
            <Rectangle
              bounds={[
                [26.15, 91.10],
                [26.35, 91.70]
              ]}
              pathOptions={{
                color: '#06b6d4',
                weight: 1,
                fillColor: '#06b6d4',
                fillOpacity: 0.12,
                dashArray: '4, 4'
              }}
            >
              <Tooltip sticky>
                <span className="font-semibold text-cyan-300">Sentinel-1 SAR:</span> Brahmaputra Lower Alluvial Basin (Post-Monsoon Recessional Silt Footprint)
              </Tooltip>
            </Rectangle>
            <Rectangle
              bounds={[
                [26.50, 92.60],
                [26.70, 93.10]
              ]}
              pathOptions={{
                color: '#06b6d4',
                weight: 1,
                fillColor: '#06b6d4',
                fillOpacity: 0.14,
                dashArray: '4, 4'
              }}
            >
              <Tooltip sticky>
                <span className="font-semibold text-cyan-300">Sentinel-1 SAR:</span> Central Assam Riparian Zone (Fertile Silt Deposit)
              </Tooltip>
            </Rectangle>
          </>
        )}

        {/* Simulated Sentinel-2 NDVI Phenology Overlays */}
        {activeLayers.ndvi && (
          <Circle
            center={[26.2420, 91.5830]}
            radius={6500}
            pathOptions={{
              color: '#84cc16',
              weight: 1,
              fillColor: '#84cc16',
              fillOpacity: 0.18
            }}
          >
            <Tooltip sticky>
              <span className="font-semibold text-lime-300">Sentinel-2 NDVI:</span> 0.18 - Bare Soil / Fallow Ready for Rabi Sowing
            </Tooltip>
          </Circle>
        )}

        {/* Simulated Soil Organic Carbon Grid */}
        {activeLayers.soilCarbon && (
          <Circle
            center={[26.6100, 92.9400]}
            radius={8500}
            pathOptions={{
              color: '#f59e0b',
              weight: 1,
              fillColor: '#f59e0b',
              fillOpacity: 0.15
            }}
          >
            <Tooltip sticky>
              <span className="font-semibold text-amber-300">Soil Health Grid:</span> High Organic Carbon (1.85%) & Available Potassium
            </Tooltip>
          </Circle>
        )}

        {/* Delineated Land Parcels */}
        {activeLayers.parcels &&
          parcels.map((parcel) => {
            const isSelected = selectedParcel?.id === parcel.id;
            const parcelColor = getParcelColor(parcel.fciScore);

            return (
              <Polygon
                key={parcel.id}
                positions={parcel.polygonCoordinates}
                pathOptions={{
                  color: isSelected ? '#ffffff' : parcelColor,
                  weight: isSelected ? 3.5 : 2,
                  fillColor: parcelColor,
                  fillOpacity: isSelected ? 0.75 : 0.45,
                  dashArray: isSelected ? undefined : '2, 1'
                }}
                eventHandlers={{
                  click: () => onSelectParcel(parcel)
                }}
              >
                <Tooltip sticky direction="top">
                  <div className="text-xs">
                    <div className="font-bold text-white flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {parcel.name}
                    </div>
                    <div className="text-slate-300 mt-0.5">
                      FCI Potential Score:{' '}
                      <span className="font-bold text-emerald-400 font-mono">
                        {parcel.fciScore}/100
                      </span>
                    </div>
                    <div className="text-slate-400">
                      Area: <span className="text-white font-mono">{parcel.areaHectares} ha</span> | {parcel.landStatus}
                    </div>
                  </div>
                </Tooltip>

                <Popup>
                  <div className="p-1 min-w-[200px] text-xs">
                    <div className="font-bold text-white text-sm mb-1">{parcel.name}</div>
                    <div className="text-slate-300 mb-2 font-mono text-[11px] text-emerald-400 font-semibold">
                      {parcel.id} • {parcel.revenueCircle}, {parcel.district}
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800 mb-2">
                      <div>
                        <div className="text-[10px] text-slate-400">FCI Score</div>
                        <div className="text-sm font-bold text-emerald-400 font-mono">{parcel.fciScore}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Extent</div>
                        <div className="text-sm font-bold text-white font-mono">{parcel.areaHectares} ha</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Soil pH</div>
                        <div className="text-xs font-semibold text-slate-200">{parcel.soil.ph}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Soil Carbon</div>
                        <div className="text-xs font-semibold text-slate-200">{parcel.soil.organicCarbon}%</div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mb-1">
                        <Sprout className="w-3 h-3 text-emerald-400" />
                        Top Recommended Crop:
                      </div>
                      <div className="font-semibold text-emerald-300 text-xs">
                        {parcel.recommendedCrops[0]?.cropName}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectParcel(parcel)}
                      className="w-full mt-1 py-1.5 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition"
                    >
                      Open Full Parcel Dossier →
                    </button>
                  </div>
                </Popup>
              </Polygon>
            );
          })}
      </MapContainer>
    </div>
  );
};
