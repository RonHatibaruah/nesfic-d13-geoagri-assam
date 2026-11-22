import { LandParcel, GroundTruthTask } from '../types';

export const ASSAM_DISTRICTS = [
  'All Districts',
  'Kamrup Rural',
  'Nagaon',
  'Barpeta',
  'Sonitpur',
  'Jorhat',
  'Cachar'
] as const;

export const DISTRICT_CENTERS: Record<string, [number, number]> = {
  'All Districts': [26.2006, 92.9376],
  'Kamrup Rural': [26.1550, 91.5600],
  'Nagaon': [26.3450, 92.6850],
  'Barpeta': [26.3200, 91.0000],
  'Sonitpur': [26.6500, 92.7900],
  'Jorhat': [26.7500, 94.2200],
  'Cachar': [24.8333, 92.7789]
};

export const MOCK_PARCELS: LandParcel[] = [
  // Kamrup Rural
  {
    id: 'AS-KAM-2026-F101',
    name: 'Hajo Alluvial Fallow Cluster A',
    district: 'Kamrup Rural',
    revenueCircle: 'Hajo',
    village: 'Ramdia',
    areaHectares: 48.5,
    landStatus: 'Seasonal Fallow',
    fertilityGrade: 'Grade A (Prime Fertile)',
    fciScore: 92,
    slopeDegrees: 1.2,
    distanceToWaterMeters: 280,
    inundationFrequencyPercent: 12,
    coordinates: [26.2420, 91.5830],
    polygonCoordinates: [
      [26.2460, 91.5780],
      [26.2470, 91.5870],
      [26.2390, 91.5890],
      [26.2380, 91.5790],
      [26.2460, 91.5780]
    ],
    soil: {
      ph: 6.2,
      organicCarbon: 1.45,
      nitrogen: 'Medium',
      phosphorus: 'High',
      potassium: 'High',
      soilType: 'Alluvial Loam (Old Brahmaputra Alluvium)'
    },
    recommendedCrops: [
      {
        cropName: 'Toria / Yellow Sarson (Mustard TS-36)',
        season: 'Rabi',
        suitabilityScore: 95,
        estimatedYieldPerHa: '1.4 - 1.8 MT',
        expectedGrossMarginPerHa: '₹42,000 - ₹55,000',
        rationale: 'High residual soil moisture post-monsoon and favorable nitrogen balance ideal for oilseeds.'
      },
      {
        cropName: 'Black Rice (Chak-hao / Local aromatic)',
        season: 'Kharif',
        suitabilityScore: 90,
        estimatedYieldPerHa: '3.2 - 3.8 MT',
        expectedGrossMarginPerHa: '₹75,000 - ₹95,000',
        rationale: 'Slightly acidic loam with excellent water holding capacity supports specialty organic rice.'
      },
      {
        cropName: 'Assam Lemon (Kaji Nemu - GI tagged)',
        season: 'Perennial',
        suitabilityScore: 88,
        estimatedYieldPerHa: '12 - 15 MT',
        expectedGrossMarginPerHa: '₹1,20,000 - ₹1,60,000',
        rationale: 'Gentle gradient prevents waterlogging, well-suited for high-value citrus plantation clusters.'
      }
    ],
    applicableSchemes: [
      'National Mission on Edible Oils - Oilseeds (NMEO-OS)',
      'Mission Organic Value Chain Development (MOVCDNER)',
      'PM-KUSUM Component A (Solar Micro-Irrigation)'
    ],
    lastObservedSatelliteDate: '2026-11-18',
    ndviMean: 0.18,
    sarBackscatterDb: -14.2
  },
  {
    id: 'AS-KAM-2026-F102',
    name: 'Boko Riverine Silt Tract',
    district: 'Kamrup Rural',
    revenueCircle: 'Boko',
    village: 'Singra',
    areaHectares: 64.2,
    landStatus: 'Char Silt Land',
    fertilityGrade: 'Grade A (Prime Fertile)',
    fciScore: 89,
    slopeDegrees: 0.8,
    distanceToWaterMeters: 140,
    inundationFrequencyPercent: 18,
    coordinates: [26.0150, 91.2200],
    polygonCoordinates: [
      [26.0190, 91.2140],
      [26.0210, 91.2250],
      [26.0120, 91.2270],
      [26.0100, 91.2170],
      [26.0190, 91.2140]
    ],
    soil: {
      ph: 6.5,
      organicCarbon: 1.62,
      nitrogen: 'High',
      phosphorus: 'Medium',
      potassium: 'High',
      soilType: 'Recent Riverine Silt Loam'
    },
    recommendedCrops: [
      {
        cropName: 'Winter Potato (Kufri Jyoti / Pukhraj)',
        season: 'Rabi',
        suitabilityScore: 94,
        estimatedYieldPerHa: '20 - 24 MT',
        expectedGrossMarginPerHa: '₹85,000 - ₹1,10,000',
        rationale: 'Friable newly deposited silt beds allow unhindered tuber expansion with minimal tillage.'
      },
      {
        cropName: 'French Beans & Garden Pea',
        season: 'Rabi',
        suitabilityScore: 88,
        estimatedYieldPerHa: '7 - 9 MT',
        expectedGrossMarginPerHa: '₹60,000 - ₹80,000',
        rationale: 'Quick 60-day turnover allows farmers to catch high early-season market prices.'
      }
    ],
    applicableSchemes: [
      'Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)',
      'Sub-Mission on Agriculture Mechanization (SMAM)'
    ],
    lastObservedSatelliteDate: '2026-11-15',
    ndviMean: 0.14,
    sarBackscatterDb: -12.8
  },

  // Nagaon
  {
    id: 'AS-NAG-2026-F103',
    name: 'Koliabor Brahmaputra Riparian Zone',
    district: 'Nagaon',
    revenueCircle: 'Koliabor',
    village: 'Silghat',
    areaHectares: 82.0,
    landStatus: 'Char Silt Land',
    fertilityGrade: 'Grade A (Prime Fertile)',
    fciScore: 94,
    slopeDegrees: 0.5,
    distanceToWaterMeters: 90,
    inundationFrequencyPercent: 22,
    coordinates: [26.6100, 92.9400],
    polygonCoordinates: [
      [26.6150, 92.9320],
      [26.6180, 92.9470],
      [26.6060, 92.9490],
      [26.6040, 92.9340],
      [26.6150, 92.9320]
    ],
    soil: {
      ph: 6.8,
      organicCarbon: 1.85,
      nitrogen: 'High',
      phosphorus: 'High',
      potassium: 'High',
      soilType: 'Rich Post-Flood Brahmaputra Alluvium'
    },
    recommendedCrops: [
      {
        cropName: 'Boro Rice / Deepwater Organic Rice',
        season: 'Rabi',
        suitabilityScore: 96,
        estimatedYieldPerHa: '4.8 - 5.5 MT',
        expectedGrossMarginPerHa: '₹68,000 - ₹82,000',
        rationale: 'Perennial surface water adjacency enables ultra-low-cost low-lift pumping for Boro rice.'
      },
      {
        cropName: 'Lentils / Black Gram (Urad - IPU 02-43)',
        season: 'Rabi',
        suitabilityScore: 92,
        estimatedYieldPerHa: '1.2 - 1.5 MT',
        expectedGrossMarginPerHa: '₹40,000 - ₹52,000',
        rationale: 'Relay cropping into receding moisture requires zero chemical fertilizer inputs.'
      }
    ],
    applicableSchemes: [
      'National Food Security Mission - Pulses (NFSM)',
      'Assam Agribusiness & Rural Transformation Project (APART)'
    ],
    lastObservedSatelliteDate: '2026-11-20',
    ndviMean: 0.16,
    sarBackscatterDb: -11.5
  },
  {
    id: 'AS-NAG-2026-F104',
    name: 'Raha Lowland Seasonal Fallow',
    district: 'Nagaon',
    revenueCircle: 'Raha',
    village: 'Chaparmukh',
    areaHectares: 35.8,
    landStatus: 'Seasonal Fallow',
    fertilityGrade: 'Grade B (Moderately Fertile)',
    fciScore: 78,
    slopeDegrees: 1.5,
    distanceToWaterMeters: 420,
    inundationFrequencyPercent: 8,
    coordinates: [26.2200, 92.5100],
    polygonCoordinates: [
      [26.2240, 92.5050],
      [26.2260, 92.5160],
      [26.2170, 92.5170],
      [26.2160, 92.5070],
      [26.2240, 92.5050]
    ],
    soil: {
      ph: 5.8,
      organicCarbon: 1.15,
      nitrogen: 'Medium',
      phosphorus: 'Medium',
      potassium: 'Medium',
      soilType: 'Heavy Clayey Loam'
    },
    recommendedCrops: [
      {
        cropName: 'Sunflower & Sesame',
        season: 'Rabi',
        suitabilityScore: 84,
        estimatedYieldPerHa: '1.5 - 2.0 MT',
        expectedGrossMarginPerHa: '₹38,000 - ₹48,000',
        rationale: 'Tolerates heavier soil textures and utilizes sub-surface moisture efficiently.'
      },
      {
        cropName: 'Jute (Tarun / JRO 204)',
        season: 'Zaid',
        suitabilityScore: 82,
        estimatedYieldPerHa: '28 - 32 qtl/ha',
        expectedGrossMarginPerHa: '₹45,000 - ₹58,000',
        rationale: 'Traditional retting pond proximity and suitable clay-loam substrate.'
      }
    ],
    applicableSchemes: [
      'Jute-ICARE Program',
      'Chief Minister’s Samagra Gramya Unnayan Yojana (CMSGUY)'
    ],
    lastObservedSatelliteDate: '2026-11-17',
    ndviMean: 0.22,
    sarBackscatterDb: -15.1
  },

  // Barpeta
  {
    id: 'AS-BAR-2026-F105',
    name: 'Chenga Brahmaputra Island Cluster',
    district: 'Barpeta',
    revenueCircle: 'Chenga',
    village: 'Bahari',
    areaHectares: 110.4,
    landStatus: 'Char Silt Land',
    fertilityGrade: 'Grade A (Prime Fertile)',
    fciScore: 91,
    slopeDegrees: 0.4,
    distanceToWaterMeters: 110,
    inundationFrequencyPercent: 28,
    coordinates: [26.2600, 90.9800],
    polygonCoordinates: [
      [26.2670, 90.9710],
      [26.2710, 90.9900],
      [26.2550, 90.9930],
      [26.2520, 90.9740],
      [26.2670, 90.9710]
    ],
    soil: {
      ph: 6.6,
      organicCarbon: 1.55,
      nitrogen: 'High',
      phosphorus: 'Medium',
      potassium: 'High',
      soilType: 'Fine Sandy Silt Alluvium'
    },
    recommendedCrops: [
      {
        cropName: 'Cucurbits (Watermelon, Pumpkin & Ridge Gourd)',
        season: 'Zaid',
        suitabilityScore: 97,
        estimatedYieldPerHa: '25 - 35 MT',
        expectedGrossMarginPerHa: '₹1,10,000 - ₹1,50,000',
        rationale: 'Riverbed riverbank farming with natural sub-irrigation delivers exceptional fruit size and sweetness.'
      },
      {
        cropName: 'Maize (Hybrid HQPM-1)',
        season: 'Rabi',
        suitabilityScore: 89,
        estimatedYieldPerHa: '6.0 - 7.5 MT',
        expectedGrossMarginPerHa: '₹55,000 - ₹72,000',
        rationale: 'High silage/feed demand across poultry belts in Barpeta and Guwahati.'
      }
    ],
    applicableSchemes: [
      'Mission for Integrated Development of Horticulture (MIDH)',
      'PM Formalisation of Micro food processing Enterprises (PMFME)'
    ],
    lastObservedSatelliteDate: '2026-11-19',
    ndviMean: 0.12,
    sarBackscatterDb: -12.1
  },
  {
    id: 'AS-BAR-2026-F106',
    name: 'Sarthebari Uplands Fallow',
    district: 'Barpeta',
    revenueCircle: 'Sarthebari',
    village: 'Nagaon-Sarthebari',
    areaHectares: 29.5,
    landStatus: 'Current Fallow',
    fertilityGrade: 'Grade B (Moderately Fertile)',
    fciScore: 76,
    slopeDegrees: 2.1,
    distanceToWaterMeters: 620,
    inundationFrequencyPercent: 4,
    coordinates: [26.3500, 91.1800],
    polygonCoordinates: [
      [26.3540, 91.1750],
      [26.3560, 91.1850],
      [26.3470, 91.1860],
      [26.3460, 91.1760],
      [26.3540, 91.1750]
    ],
    soil: {
      ph: 5.4,
      organicCarbon: 0.95,
      nitrogen: 'Low',
      phosphorus: 'Medium',
      potassium: 'Medium',
      soilType: 'Lateritic Sandy Clay'
    },
    recommendedCrops: [
      {
        cropName: 'Ginger (Nadia Variety)',
        season: 'Kharif',
        suitabilityScore: 86,
        estimatedYieldPerHa: '14 - 18 MT',
        expectedGrossMarginPerHa: '₹90,000 - ₹1,30,000',
        rationale: 'Non-waterlogged upland conditions suited for high-pungency ginger with bio-fertilizer supplements.'
      },
      {
        cropName: 'Turmeric (Megha Turmeric-1)',
        season: 'Kharif',
        suitabilityScore: 85,
        estimatedYieldPerHa: '18 - 22 MT',
        expectedGrossMarginPerHa: '₹85,000 - ₹1,20,000',
        rationale: 'High curcumin content potential with light soil amendment.'
      }
    ],
    applicableSchemes: [
      'National Ayush Mission (Medicinal & Aromatic Plants)',
      'MOVCDNER Organic Spices Cluster'
    ],
    lastObservedSatelliteDate: '2026-11-16',
    ndviMean: 0.28,
    sarBackscatterDb: -16.4
  },

  // Sonitpur
  {
    id: 'AS-SON-2026-F107',
    name: 'Dhekiajuli Peripheral Fallow Plain',
    district: 'Sonitpur',
    revenueCircle: 'Dhekiajuli',
    village: 'Batachipur',
    areaHectares: 54.0,
    landStatus: 'Culturable Waste',
    fertilityGrade: 'Grade B (Moderately Fertile)',
    fciScore: 74,
    slopeDegrees: 3.2,
    distanceToWaterMeters: 510,
    inundationFrequencyPercent: 6,
    coordinates: [26.6800, 92.4800],
    polygonCoordinates: [
      [26.6850, 92.4740],
      [26.6870, 92.4860],
      [26.6770, 92.4880],
      [26.6750, 92.4760],
      [26.6850, 92.4740]
    ],
    soil: {
      ph: 5.2,
      organicCarbon: 1.30,
      nitrogen: 'Medium',
      phosphorus: 'Low',
      potassium: 'High',
      soilType: 'Red Acidic Alluvial Sandy Loam'
    },
    recommendedCrops: [
      {
        cropName: 'Assam Green Tea / Specialty CTC Clones',
        season: 'Perennial',
        suitabilityScore: 91,
        estimatedYieldPerHa: '8 - 10 MT green leaf',
        expectedGrossMarginPerHa: '₹80,000 - ₹1,05,000',
        rationale: 'Mildly sloping acidic soil with good drainage matches small tea grower expansion criteria.'
      },
      {
        cropName: 'Pineapple (Kew / Queen)',
        season: 'Perennial',
        suitabilityScore: 87,
        estimatedYieldPerHa: '30 - 40 MT',
        expectedGrossMarginPerHa: '₹95,000 - ₹1,40,000',
        rationale: 'Excellent compatibility with rolling topography and acid soils.'
      }
    ],
    applicableSchemes: [
      'Tea Board Small Tea Growers Development Scheme',
      'Mission Organic Value Chain Development (MOVCDNER)'
    ],
    lastObservedSatelliteDate: '2026-11-14',
    ndviMean: 0.31,
    sarBackscatterDb: -15.8
  },

  // Jorhat
  {
    id: 'AS-JOR-2026-F108',
    name: 'Teok River Valley Alluvium',
    district: 'Jorhat',
    revenueCircle: 'Teok',
    village: 'Jogduar',
    areaHectares: 42.6,
    landStatus: 'Seasonal Fallow',
    fertilityGrade: 'Grade A (Prime Fertile)',
    fciScore: 88,
    slopeDegrees: 1.0,
    distanceToWaterMeters: 320,
    inundationFrequencyPercent: 10,
    coordinates: [26.7700, 94.3800],
    polygonCoordinates: [
      [26.7750, 94.3730],
      [26.7770, 94.3870],
      [26.7670, 94.3890],
      [26.7650, 94.3750],
      [26.7750, 94.3730]
    ],
    soil: {
      ph: 6.1,
      organicCarbon: 1.50,
      nitrogen: 'High',
      phosphorus: 'Medium',
      potassium: 'High',
      soilType: 'Rich Upper Brahmaputra Alluvium'
    },
    recommendedCrops: [
      {
        cropName: 'Joha Rice (Bhogali Joha / Kola Joha)',
        season: 'Kharif',
        suitabilityScore: 94,
        estimatedYieldPerHa: '3.0 - 3.5 MT',
        expectedGrossMarginPerHa: '₹80,000 - ₹1,10,000',
        rationale: 'GI-tagged indigenous aromatic rice fetches premium exports under FPO aggregation.'
      },
      {
        cropName: 'Mustard (TS-38)',
        season: 'Rabi',
        suitabilityScore: 90,
        estimatedYieldPerHa: '1.5 MT',
        expectedGrossMarginPerHa: '₹45,000 - ₹55,000',
        rationale: 'Standard double-cropping pattern after Joha harvest with optimal soil test ratios.'
      }
    ],
    applicableSchemes: [
      'APART Agri-Enterprise Development Grant',
      'PM-Formalisation of Micro food processing Enterprises (PMFME)'
    ],
    lastObservedSatelliteDate: '2026-11-21',
    ndviMean: 0.19,
    sarBackscatterDb: -13.9
  },

  // Cachar (Barak Valley)
  {
    id: 'AS-CAC-2026-F109',
    name: 'Sonai Barak Floodplain Depression',
    district: 'Cachar',
    revenueCircle: 'Sonai',
    village: 'Kabuganj',
    areaHectares: 51.2,
    landStatus: 'Seasonal Fallow',
    fertilityGrade: 'Grade B (Moderately Fertile)',
    fciScore: 82,
    slopeDegrees: 0.9,
    distanceToWaterMeters: 210,
    inundationFrequencyPercent: 16,
    coordinates: [24.7100, 92.8900],
    polygonCoordinates: [
      [24.7160, 92.8830],
      [24.7180, 92.8970],
      [24.7070, 92.8990],
      [24.7050, 92.8850],
      [24.7160, 92.8830]
    ],
    soil: {
      ph: 5.7,
      organicCarbon: 1.35,
      nitrogen: 'Medium',
      phosphorus: 'Medium',
      potassium: 'Medium',
      soilType: 'Heavy Silt Clay (Barak Alluvium)'
    },
    recommendedCrops: [
      {
        cropName: 'Boro Rice / Early Summer Paddy',
        season: 'Rabi',
        suitabilityScore: 91,
        estimatedYieldPerHa: '4.5 - 5.2 MT',
        expectedGrossMarginPerHa: '₹60,000 - ₹74,000',
        rationale: 'Utilizes high residual basin moisture; protects against sudden early flash floods.'
      },
      {
        cropName: 'Fish-Paddy Integrated Culture',
        season: 'Kharif',
        suitabilityScore: 88,
        estimatedYieldPerHa: '3.5 MT rice + 1.2 MT fish',
        expectedGrossMarginPerHa: '₹1,20,000 - ₹1,80,000',
        rationale: 'Naturally adapted to low-lying saucer depressions (Haors/Beels) in Barak valley.'
      }
    ],
    applicableSchemes: [
      'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
      'NFSM Rice Enhancement Scheme'
    ],
    lastObservedSatelliteDate: '2026-11-19',
    ndviMean: 0.20,
    sarBackscatterDb: -13.0
  }
];

export const MOCK_TASKS: GroundTruthTask[] = [
  {
    id: 'TSK-2026-081',
    parcelId: 'AS-KAM-2026-F101',
    district: 'Kamrup Rural',
    assignedOfficer: 'Bipul Sarma',
    officerDesignation: 'Agricultural Development Officer (Hajo Block)',
    status: 'Verified',
    priority: 'High',
    targetDate: '2026-11-25',
    notes: 'Ground soil tests corroborate Sentinel-2 high-fertility prediction. Local FPO interested in mustard cultivation.'
  },
  {
    id: 'TSK-2026-082',
    parcelId: 'AS-NAG-2026-F103',
    district: 'Nagaon',
    assignedOfficer: 'Manashjyoti Saikia',
    officerDesignation: 'ADO (Koliabor)',
    status: 'In Progress',
    priority: 'High',
    targetDate: '2026-11-27',
    notes: 'Checking flood silt depth and water extraction points near Brahmaputra channel.'
  },
  {
    id: 'TSK-2026-083',
    parcelId: 'AS-BAR-2026-F105',
    district: 'Barpeta',
    assignedOfficer: 'Rehman Ali',
    officerDesignation: 'ADO (Chenga)',
    status: 'Pending',
    priority: 'Medium',
    targetDate: '2026-11-30',
    notes: 'Char land demarcated by drone ground coordinates. Scheduling farmer group meeting.'
  }
];
