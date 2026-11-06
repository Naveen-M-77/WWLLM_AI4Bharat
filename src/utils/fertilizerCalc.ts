import { FertilizerInput, FertilizerResult } from '../types/agri';

export interface CropNPKStandard {
  cropName: string;
  recommendedN_kgPerAcre: number;
  recommendedP_kgPerAcre: number;
  recommendedK_kgPerAcre: number;
  stages: {
    stage: string;
    timing: string;
    ureaPercent: number;
    dapPercent: number;
    mopPercent: number;
    instructions: string;
  }[];
  criticalAdvisory: string[];
}

export const CROP_NPK_DATABASE: Record<string, CropNPKStandard> = {
  wheat: {
    cropName: 'Wheat (गेहूं)',
    recommendedN_kgPerAcre: 50,
    recommendedP_kgPerAcre: 24,
    recommendedK_kgPerAcre: 16,
    stages: [
      {
        stage: 'Basal (बुवाई के समय)',
        timing: 'At sowing',
        ureaPercent: 33.3,
        dapPercent: 100,
        mopPercent: 100,
        instructions: 'Apply full DAP and MOP with 1/3rd Urea in furrows below seed.'
      },
      {
        stage: 'First Top Dressing (पहली सिंचाई - CRI)',
        timing: '21-25 days after sowing (CRI stage)',
        ureaPercent: 33.3,
        dapPercent: 0,
        mopPercent: 0,
        instructions: 'Broadcast 1/3rd Urea immediately after crown root initiation irrigation.'
      },
      {
        stage: 'Second Top Dressing (कल्ले फूटते समय / Tillering)',
        timing: '40-45 days after sowing',
        ureaPercent: 33.4,
        dapPercent: 0,
        mopPercent: 0,
        instructions: 'Broadcast remaining Urea before jointing stage.'
      }
    ],
    criticalAdvisory: [
      'Do not apply top dressing of nitrogen after flag leaf stage to prevent lodging.',
      'Zinc sulfate (21%) @ 10 kg/acre should be added if not applied in previous paddy crop.',
      'Always ensure soil has optimal moisture before applying top-dressed Urea.'
    ]
  },
  rice: {
    cropName: 'Paddy / Rice (धान)',
    recommendedN_kgPerAcre: 48,
    recommendedP_kgPerAcre: 20,
    recommendedK_kgPerAcre: 20,
    stages: [
      {
        stage: 'Basal (रोपाई के समय)',
        timing: 'At transplanting / final puddling',
        ureaPercent: 33,
        dapPercent: 100,
        mopPercent: 50,
        instructions: 'Incorporate entire DAP and half MOP into puddle soil.'
      },
      {
        stage: 'Active Tillering (कल्ले निकलते समय)',
        timing: '20-25 days after transplanting',
        ureaPercent: 33,
        dapPercent: 0,
        mopPercent: 0,
        instructions: 'Broadcast Urea after draining excess standing water for 24h.'
      },
      {
        stage: 'Panicle Initiation (बालियां बनते समय)',
        timing: '45-50 days after transplanting',
        ureaPercent: 34,
        dapPercent: 0,
        mopPercent: 50,
        instructions: 'Apply remaining Urea with balance 50% MOP to boost grain weight.'
      }
    ],
    criticalAdvisory: [
      'Split application of Potash (MOP) increases resistance to stem borer and lodging.',
      'Never mix Zinc fertilizer directly with Phosphatic fertilizer (DAP) as it precipitates into insoluble zinc phosphate.'
    ]
  },
  cotton: {
    cropName: 'Cotton (कपास)',
    recommendedN_kgPerAcre: 45,
    recommendedP_kgPerAcre: 22,
    recommendedK_kgPerAcre: 22,
    stages: [
      {
        stage: 'Basal (बुवाई के समय)',
        timing: 'At sowing / field preparation',
        ureaPercent: 20,
        dapPercent: 100,
        mopPercent: 50,
        instructions: 'Apply full DAP, 50% MOP, and 20% Urea in lines.'
      },
      {
        stage: 'Vegetative Square Stage (फूल-कलियां)',
        timing: '35-40 days after sowing',
        ureaPercent: 40,
        dapPercent: 0,
        mopPercent: 0,
        instructions: 'Side dress Urea 5-7 cm away from plant rows.'
      },
      {
        stage: 'Peak Flowering & Boll Development',
        timing: '60-70 days after sowing',
        ureaPercent: 40,
        dapPercent: 0,
        mopPercent: 50,
        instructions: 'Apply remaining Urea and MOP, followed by earthing up.'
      }
    ],
    criticalAdvisory: [
      'Magnesium deficiency (red leaf disorder) can be cured with 1% MgSO4 foliar spray.',
      'Avoid high doses of nitrogen during flowering to minimize shedding of squares.'
    ]
  },
  sugarcane: {
    cropName: 'Sugarcane (गन्ना)',
    recommendedN_kgPerAcre: 100,
    recommendedP_kgPerAcre: 35,
    recommendedK_kgPerAcre: 40,
    stages: [
      {
        stage: 'Basal (रोपण के समय)',
        timing: 'At planting in furrows',
        ureaPercent: 25,
        dapPercent: 100,
        mopPercent: 50,
        instructions: 'Place fertilizer below sets in furrows.'
      },
      {
        stage: 'First Earthing Up / Tillering',
        timing: '45-60 days after planting',
        ureaPercent: 35,
        dapPercent: 0,
        mopPercent: 0,
        instructions: 'Side dress along rows followed by irrigation.'
      },
      {
        stage: 'Final Earthing Up (कंसाई)',
        timing: '90-110 days after planting',
        ureaPercent: 40,
        dapPercent: 0,
        mopPercent: 50,
        instructions: 'Apply remaining Urea and Potash before monsoon onset.'
      }
    ],
    criticalAdvisory: [
      'Complete all nitrogen application before 120 days of crop age for maximum sucrose content.',
      'Biofertilizer Azotobacter and PSB @ 4 kg/acre saves up to 20% chemical nitrogen.'
    ]
  },
  mustard: {
    cropName: 'Mustard / Rapeseed (सरसों)',
    recommendedN_kgPerAcre: 32,
    recommendedP_kgPerAcre: 16,
    recommendedK_kgPerAcre: 16,
    stages: [
      {
        stage: 'Basal (बुवाई)',
        timing: 'At sowing',
        ureaPercent: 50,
        dapPercent: 100,
        mopPercent: 100,
        instructions: 'Apply entire DAP, MOP, and half Urea before sowing.'
      },
      {
        stage: 'Top Dressing (फूल आने से पहले)',
        timing: '30-35 days after sowing (first irrigation)',
        ureaPercent: 50,
        dapPercent: 0,
        mopPercent: 0,
        instructions: 'Top dress remaining Urea after first irrigation.'
      }
    ],
    criticalAdvisory: [
      'Mustard has a very high requirement for Sulfur. Apply Bentonite Sulfur @ 10 kg/acre to boost oil yield.',
      'Stop irrigation during peak flowering to prevent Sclerotinia rot.'
    ]
  },
  tomato: {
    cropName: 'Tomato (टमाटर)',
    recommendedN_kgPerAcre: 60,
    recommendedP_kgPerAcre: 40,
    recommendedK_kgPerAcre: 50,
    stages: [
      {
        stage: 'Basal (रोपाई पूर्व)',
        timing: 'Before transplanting in beds',
        ureaPercent: 25,
        dapPercent: 100,
        mopPercent: 40,
        instructions: 'Mix into raised beds along with well-rotted FYM.'
      },
      {
        stage: 'Vegetative Growth',
        timing: '25-30 days after transplanting',
        ureaPercent: 40,
        dapPercent: 0,
        mopPercent: 30,
        instructions: 'Ring method 10 cm away from stems or through fertigation.'
      },
      {
        stage: 'Fruiting & Harvest Stage',
        timing: '50-60 days after transplanting',
        ureaPercent: 35,
        dapPercent: 0,
        mopPercent: 30,
        instructions: 'Apply to sustain heavy fruit load and prevent blossom end rot.'
      }
    ],
    criticalAdvisory: [
      'Calcium nitrate spray @ 5g/L prevents blossom end rot in acidic or sandy soils.',
      'Boron spray @ 1g/L during flowering enhances fruit set.'
    ]
  }
};

/**
 * Converts area in different units to acres.
 */
export function convertToAcres(area: number, unit: 'acre' | 'hectare' | 'bigha'): number {
  if (area <= 0) return 1;
  switch (unit) {
    case 'acre':
      return area;
    case 'hectare':
      return area * 2.47105;
    case 'bigha':
      // Standard North-Indian Pucca Bigha is approx 0.62 acres (5/8 acre)
      return area * 0.625;
    default:
      return area;
  }
}

/**
 * Calculates chemical fertilizer requirements (Urea, DAP, MOP) based on standard ICAR equations.
 */
export function calculateFertilizerRequirements(input: FertilizerInput): FertilizerResult {
  const cropKey = input.crop.toLowerCase().trim();
  const cropData = CROP_NPK_DATABASE[cropKey] || CROP_NPK_DATABASE.wheat;

  const grossAreaAcres = convertToAcres(input.area, input.unit);

  // Multiplier adjustment for soil test level
  let fertilityMultiplier = 1.0;
  if (input.soilFertilityLevel === 'low') {
    fertilityMultiplier = 1.25; // Increase by 25% if soil is deficient
  } else if (input.soilFertilityLevel === 'high') {
    fertilityMultiplier = 0.75; // Decrease by 25% if soil is rich
  }

  // Organic manure reduction (FYM/compost provides ~10% chemical nutrient saving)
  const organicFactor = input.organicManureApplied ? 0.9 : 1.0;

  const netN_perAcre = cropData.recommendedN_kgPerAcre * fertilityMultiplier * organicFactor;
  const netP_perAcre = cropData.recommendedP_kgPerAcre * fertilityMultiplier * organicFactor;
  const netK_perAcre = cropData.recommendedK_kgPerAcre * fertilityMultiplier * organicFactor;

  const totalN = netN_perAcre * grossAreaAcres;
  const totalP = netP_perAcre * grossAreaAcres;
  const totalK = netK_perAcre * grossAreaAcres;

  // DAP calculation (contains 46% P2O5 and 18% N)
  const dapKg = totalP / 0.46;
  const nitrogenFromDap = dapKg * 0.18;

  // Remaining Nitrogen to be supplied from Urea (contains 46% N)
  const remainingN = Math.max(0, totalN - nitrogenFromDap);
  const ureaKg = remainingN / 0.46;

  // MOP calculation (contains 60% K2O)
  const mopKg = totalK / 0.60;

  // 50kg bag conversions (rounded to 1 decimal place)
  const ureaBags50kg = Number((ureaKg / 50).toFixed(1));
  const dapBags50kg = Number((dapKg / 50).toFixed(1));
  const mopBags50kg = Number((mopKg / 50).toFixed(1));

  return {
    crop: cropData.cropName,
    grossAreaAcres: Number(grossAreaAcres.toFixed(2)),
    recommendedN_kg: Math.round(totalN),
    recommendedP_kg: Math.round(totalP),
    recommendedK_kg: Math.round(totalK),
    ureaBags50kg,
    dapBags50kg,
    mopBags50kg,
    applicationSchedule: cropData.stages,
    advisoryNotes: cropData.criticalAdvisory
  };
}
