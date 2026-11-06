import { DiseaseDiagnosis } from '../types/agri';

export const SAMPLE_CROP_DISEASES: DiseaseDiagnosis[] = [
  {
    id: 'sample_wheat_yellow_rust',
    crop: 'Wheat',
    diseaseName: 'Yellow Rust (Stripe Rust)',
    vernacularName: 'पीला रतुआ (गेहूं)',
    pathogenType: 'Fungal',
    severity: 'Severe',
    symptoms: [
      'Bright yellow powdery pustules arranged in parallel linear stripes along leaf veins',
      'Yellow dust easily rubs off onto fingers or clothing',
      'Premature chlorosis and drying of flag leaf leading to shriveled grains'
    ],
    biologicalTreatment: [
      'Foliar spray of 5% Neem Seed Kernel Extract (NSKE) at initial stage',
      'Spray Trichoderma harzianum @ 5g per liter of water'
    ],
    chemicalTreatment: [
      {
        chemical: 'Propiconazole 25% EC (Tilt / Bumper)',
        dosePerLiter: '1.0 ml / liter of water',
        dosePerAcre: '200 ml in 200 liters water per acre',
        safetyPrecautions: 'Spray thoroughly on flag leaves; avoid spraying during windy afternoon hours. 30-day PHI.'
      },
      {
        chemical: 'Tebuconazole 25.9% EC',
        dosePerLiter: '1.0 ml / liter of water',
        dosePerAcre: '200 ml per acre',
        safetyPrecautions: 'Use hollow cone nozzle for fine droplet coverage.'
      }
    ],
    prevention: [
      'Sow certified rust-resistant varieties like DBW 187, DBW 303, or HD 3086',
      'Avoid high-density seeding and excess nitrogen fertilizers',
      'Conduct regular surveillance in foothill sub-mountainous zones from December'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
    confidence: 96
  },
  {
    id: 'sample_tomato_early_blight',
    crop: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    vernacularName: 'अगेती झुलसा (टमाटर)',
    pathogenType: 'Fungal',
    severity: 'Moderate',
    symptoms: [
      'Dark brown to black circular spots with distinctive concentric rings (target-board pattern)',
      'Spots primarily initiate on older bottom leaves and move upward',
      'Yellow chlorotic halo surrounding necrotic leaf spots'
    ],
    biologicalTreatment: [
      'Spray Bacillus subtilis @ 5g/L or fermented butter-milk (chaas) @ 50 ml/L',
      'Incorporate Trichoderma viride into soil at transplanting'
    ],
    chemicalTreatment: [
      {
        chemical: 'Mancozeb 75% WP (Indofil M-45)',
        dosePerLiter: '2.5 g / liter of water',
        dosePerAcre: '500 g in 200 liters water per acre',
        safetyPrecautions: 'Preventive protective spray. Repeat at 7-10 day intervals if weather is humid.'
      },
      {
        chemical: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
        dosePerLiter: '1.0 ml / liter of water',
        dosePerAcre: '200 ml per acre',
        safetyPrecautions: 'Curative translaminar action. Observe 5-day pre-harvest interval.'
      }
    ],
    prevention: [
      'Stake tomato plants to elevate lower canopy away from damp soil',
      'Adopt drip irrigation instead of overhead flooding to prevent leaf wetness',
      'Maintain 2-year crop rotation with non-solanaceous crops'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    confidence: 94
  },
  {
    id: 'sample_paddy_bph',
    crop: 'Rice',
    diseaseName: 'Brown Planthopper (BPH) & Hopper Burn',
    vernacularName: 'भूरा फुदका / हॉपर बर्न (धान)',
    pathogenType: 'Pest Infestation',
    severity: 'Severe',
    symptoms: [
      'Brown insects clustered in massive colonies at the base of tillers near water level',
      'Sap depletion causing circular patches of crop to turn yellow, dry up, and collapse ("Hopper Burn")',
      'Sooty mold fungus growing on sticky honeydew secretions'
    ],
    biologicalTreatment: [
      'Spray 5% Neem Seed Kernel Extract (NSKE) or Neem oil (10,000 ppm) @ 2 ml/L directed to base',
      'Conserve natural predators: wolf spiders, mirid bugs, and damselflies'
    ],
    chemicalTreatment: [
      {
        chemical: 'Triflumezopyrim 10% SC (Pexalon)',
        dosePerLiter: '0.47 ml / liter of water',
        dosePerAcre: '94 ml in 200 liters water per acre',
        safetyPrecautions: 'Apply single targeted spray directed at plant bases when hopper counts exceed 5-10/hill.'
      },
      {
        chemical: 'Pymetrozine 50% WG (Chess)',
        dosePerLiter: '0.6 g / liter of water',
        dosePerAcre: '120 g in 200 liters water per acre',
        safetyPrecautions: 'Stops feeding immediately. 19-day waiting period.'
      }
    ],
    prevention: [
      'Form alleyways (passage lines of 30 cm) every 2 meters for aeration',
      'Practice Alternate Wetting and Drying (AWD) — drain water for 3-4 days',
      'Strictly avoid synthetic pyrethroids (Cypermethrin) which kill beneficial spiders'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    confidence: 97
  },
  {
    id: 'sample_cotton_pink_bollworm',
    crop: 'Cotton',
    diseaseName: 'Pink Bollworm (Pectinophora gossypiella)',
    vernacularName: 'गुलाबी सुंडी (कपास)',
    pathogenType: 'Pest Infestation',
    severity: 'Severe',
    symptoms: [
      'Petals twisted together into characteristic "Rosette Flowers"',
      'Immature bolls dropped prematurely',
      'Burrowing larvae feeding on seeds inside bolls, staining lint and destroying fiber quality'
    ],
    biologicalTreatment: [
      'Install Gossyplure pheromone traps @ 2/acre for monitoring, 8/acre for mating disruption',
      'Release Trichogramma bactrae egg parasitoids @ 60,000 wasps/acre weekly'
    ],
    chemicalTreatment: [
      {
        chemical: 'Profenofos 50% EC',
        dosePerLiter: '2.0 ml / liter of water',
        dosePerAcre: '400 ml in 200 liters water per acre',
        safetyPrecautions: 'Ovicidal and larvicidal action. Do not spray within 30 days of picking.'
      },
      {
        chemical: 'Emamectin Benzoate 5% SG',
        dosePerLiter: '0.4 g / liter of water',
        dosePerAcre: '80-100 g per acre',
        safetyPrecautions: 'Safe for beneficial insects; green-triangle formulation.'
      }
    ],
    prevention: [
      'Grow non-Bt refuge rows around Bt cotton field',
      'Avoid extending crop season beyond December to starve diapausing larvae',
      'Deep summer plowing to expose pupae to predatory birds'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
    confidence: 93
  },
  {
    id: 'sample_okra_yvmv',
    crop: 'Okra',
    diseaseName: 'Yellow Vein Mosaic Virus (YVMV)',
    vernacularName: 'पीली नस मोज़ेक रोग (भिंडी)',
    pathogenType: 'Viral',
    severity: 'Moderate',
    symptoms: [
      'Pronounced yellow network of veins against green interveinal leaf tissue',
      'Newly formed leaves completely pale yellow or whitish',
      'Stunted plant growth and small, yellowish-white, hard unmarketable fruits'
    ],
    biologicalTreatment: [
      'Install yellow sticky traps @ 15-20 per acre to catch whitefly vectors',
      'Spray 5% Neem Seed Kernel Extract (NSKE) at 7-day intervals'
    ],
    chemicalTreatment: [
      {
        chemical: 'Acetamiprid 20% SP',
        dosePerLiter: '0.2 g / liter of water',
        dosePerAcre: '40 g in 200 liters water per acre',
        safetyPrecautions: 'Target whitefly vector. Observe 3-day waiting period on vegetable harvests.'
      },
      {
        chemical: 'Diafenthiuron 50% WP',
        dosePerLiter: '1.25 g / liter of water',
        dosePerAcre: '250 g per acre',
        safetyPrecautions: 'Do not spray during peak bee foraging hours.'
      }
    ],
    prevention: [
      'Sow tolerant varieties like Kashi Kranti, Arka Anamika, or Parbhani Kranti',
      'Rogue out and bury early infected viral plants immediately',
      'Do not grow alternate malvaceous host weeds around field boundaries'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80',
    confidence: 95
  }
];
