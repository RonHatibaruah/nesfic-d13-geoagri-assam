import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { FilterSidebar } from './components/FilterSidebar';
import { MapViewer } from './components/MapViewer';
import { ParcelDossier } from './components/ParcelDossier';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { GroundTruthingModal } from './components/GroundTruthingModal';
import { MOCK_PARCELS, MOCK_TASKS } from './data/assamGeospatialData';
import { LandParcel, FilterState, GroundTruthTask } from './types';
import confetti from 'canvas-confetti';

export function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'analytics' | 'tasks'>('map');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);
  const [tasks, setTasks] = useState<GroundTruthTask[]>(MOCK_TASKS);
  const [parcelForTask, setParcelForTask] = useState<LandParcel | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    district: 'All Districts',
    landStatus: ['Seasonal Fallow', 'Char Silt Land', 'Current Fallow', 'Culturable Waste'],
    minFci: 70,
    maxSlope: 5.0,
    maxFloodRisk: 30,
    searchQuery: ''
  });

  const [activeLayers, setActiveLayers] = useState({
    parcels: true,
    ndvi: false,
    sarFlood: true,
    soilCarbon: false
  });

  // Sync navbar district with filter
  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setFilter((prev) => ({ ...prev, district }));
    setSelectedParcel(null);
  };

  // Filter parcels
  const filteredParcels = useMemo(() => {
    return MOCK_PARCELS.filter((p) => {
      // District check
      if (selectedDistrict !== 'All Districts' && p.district !== selectedDistrict) {
        return false;
      }
      // Land status check
      if (!filter.landStatus.includes(p.landStatus)) {
        return false;
      }
      // Min FCI check
      if (p.fciScore < filter.minFci) {
        return false;
      }
      // Slope check
      if (p.slopeDegrees > filter.maxSlope) {
        return false;
      }
      // Flood risk check
      if (p.inundationFrequencyPercent > filter.maxFloodRisk) {
        return false;
      }
      // Search query check
      if (filter.searchQuery.trim() !== '') {
        const q = filter.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCircle = p.revenueCircle.toLowerCase().includes(q);
        const matchesVillage = p.village.toLowerCase().includes(q);
        const matchesId = p.id.toLowerCase().includes(q);
        if (!matchesName && !matchesCircle && !matchesVillage && !matchesId) {
          return false;
        }
      }
      return true;
    });
  }, [selectedDistrict, filter]);

  const totalFilteredHectares = useMemo(() => {
    return filteredParcels.reduce((sum, p) => sum + p.areaHectares, 0);
  }, [filteredParcels]);

  // Export GeoJSON
  const handleExportGeoJSON = () => {
    const geojson = {
      type: 'FeatureCollection',
      features: filteredParcels.map((p) => ({
        type: 'Feature',
        properties: {
          id: p.id,
          name: p.name,
          district: p.district,
          revenueCircle: p.revenueCircle,
          village: p.village,
          areaHectares: p.areaHectares,
          landStatus: p.landStatus,
          fertilityGrade: p.fertilityGrade,
          fciScore: p.fciScore,
          slopeDegrees: p.slopeDegrees,
          distanceToWaterMeters: p.distanceToWaterMeters,
          soilPh: p.soil.ph,
          soilOrganicCarbon: p.soil.organicCarbon,
          topCrop: p.recommendedCrops[0]?.cropName
        },
        geometry: {
          type: 'Polygon',
          coordinates: [p.polygonCoordinates.map(([lat, lng]) => [lng, lat])]
        }
      }))
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GeoAgri_Assam_Cultivable_Lands_${selectedDistrict.replace(/\s+/g, '_')}_2026.geojson`;
    a.click();
    URL.revokeObjectURL(url);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleOpenTaskForParcel = (parcel: LandParcel) => {
    setParcelForTask(parcel);
    setActiveTab('tasks');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={handleDistrictChange}
        totalParcelsCount={filteredParcels.length}
        totalHectares={totalFilteredHectares}
        onExportGeoJSON={handleExportGeoJSON}
      />

      {/* Main View Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {activeTab === 'map' && (
          <>
            <FilterSidebar
              filter={filter}
              setFilter={setFilter}
              activeLayers={activeLayers}
              setActiveLayers={setActiveLayers}
              matchingCount={filteredParcels.length}
              totalHectares={totalFilteredHectares}
            />

            <MapViewer
              parcels={filteredParcels}
              selectedParcel={selectedParcel}
              onSelectParcel={(parcel) => setSelectedParcel(parcel)}
              selectedDistrict={selectedDistrict}
              activeLayers={activeLayers}
            />

            {/* Parcel Details Dossier Drawer */}
            {selectedParcel && (
              <ParcelDossier
                parcel={selectedParcel}
                onClose={() => setSelectedParcel(null)}
                onAssignTask={handleOpenTaskForParcel}
              />
            )}
          </>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard parcels={filteredParcels} />
        )}

        {activeTab === 'tasks' && (
          <GroundTruthingModal
            tasks={tasks}
            setTasks={setTasks}
            parcels={MOCK_PARCELS}
            selectedParcelForTask={parcelForTask}
            onCloseTaskModal={() => setParcelForTask(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
