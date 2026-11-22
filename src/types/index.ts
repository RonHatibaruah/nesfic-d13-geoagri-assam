export type LandStatus = 'Current Fallow' | 'Seasonal Fallow' | 'Char Silt Land' | 'Culturable Waste';
export type FertilityGrade = 'Grade A (Prime Fertile)' | 'Grade B (Moderately Fertile)' | 'Grade C (Marginal)';

export interface SoilMetrics {
  ph: number;
  organicCarbon: number; // in %
  nitrogen: 'Low' | 'Medium' | 'High';
  phosphorus: 'Low' | 'Medium' | 'High';
  potassium: 'Low' | 'Medium' | 'High';
  soilType: string;
}

export interface CropRecommendation {
  cropName: string;
  season: 'Rabi' | 'Kharif' | 'Zaid' | 'Perennial';
  suitabilityScore: number; // 0-100
  estimatedYieldPerHa: string;
  expectedGrossMarginPerHa: string;
  rationale: string;
}

export interface LandParcel {
  id: string; // e.g. "AS-KAM-2026-F101"
  name: string;
  district: string;
  revenueCircle: string;
  village: string;
  areaHectares: number;
  landStatus: LandStatus;
  fertilityGrade: FertilityGrade;
  fciScore: number; // Fertility & Cultivability Index 0-100
  slopeDegrees: number;
  distanceToWaterMeters: number;
  inundationFrequencyPercent: number; // flood risk
  coordinates: [number, number]; // [lat, lng] center
  polygonCoordinates: [number, number][]; // boundary polygon
  soil: SoilMetrics;
  recommendedCrops: CropRecommendation[];
  applicableSchemes: string[];
  lastObservedSatelliteDate: string;
  ndviMean: number;
  sarBackscatterDb: number;
}

export interface FilterState {
  district: string;
  landStatus: string[];
  minFci: number;
  maxSlope: number;
  maxFloodRisk: number;
  searchQuery: string;
}

export interface GroundTruthTask {
  id: string;
  parcelId: string;
  district: string;
  assignedOfficer: string;
  officerDesignation: string;
  status: 'Pending' | 'In Progress' | 'Verified' | 'Flagged';
  priority: 'High' | 'Medium' | 'Normal';
  targetDate: string;
  notes: string;
}
