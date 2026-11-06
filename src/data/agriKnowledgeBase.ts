import { AgriKnowledgeChunk } from '../types/agri';

export const AGRI_KNOWLEDGE_BASE: AgriKnowledgeChunk[] = [
  {
    id: 'kb_wheat_yellow_rust',
    crop: 'Wheat',
    category: 'pest_disease',
    title: 'Yellow Rust (Stripe Rust - Puccinia striiformis) Management in Wheat',
    source: 'ICAR-Indian Institute of Wheat and Barley Research (IIWBR) Advisory 2025',
    content: 'Yellow rust appears as bright yellow pustules arranged in linear stripes on the leaf blade, primarily under cool (10-15°C) and humid conditions in NWPZ (Punjab, Haryana, Tarai). Spores powder off onto fingers. If left unmanaged during flag leaf emergence, yield loss can exceed 40-70%.',
    keywords: ['yellow rust', 'stripe rust', 'peela ratwa', 'wheat rust', 'puccinia', 'propiconazole', 'flag leaf', 'गेहूं', 'पीला', 'रतुआ', 'धारियां', 'पाउडर', 'gehu', 'कनक', 'ਕਣਕ', 'पत्तियां'],
    recommendedPractices: [
      'Grow resistant cultivars like DBW 187 (Karan Vandana), DBW 303, HD 3086, or PBW 725.',
      'Monitor fields starting December in foothill sub-mountainous tracts.',
      'Avoid excess nitrogen application which produces succulent leaves susceptible to rust.'
    ],
    safeChemicalControls: [
      {
        name: 'Propiconazole 25% EC (Tilt)',
        dosage: '1 ml per liter of water (200 ml in 200 liters water per acre)',
        waitingPeriodDays: 30,
        toxicityLevel: 'Blue (Moderate)'
      },
      {
        name: 'Tebuconazole 25.9% EC (Folicur)',
        dosage: '1 ml per liter of water (200 ml per acre)',
        waitingPeriodDays: 30,
        toxicityLevel: 'Blue (Moderate)'
      }
    ],
    organicRemedies: [
      'Foliar spray of 5% Neem Seed Kernel Extract (NSKE) at very initial appearance.',
      'Application of Trichoderma harzianum @ 5g/L.'
    ]
  },
  {
    id: 'kb_wheat_cri_irrigation',
    crop: 'Wheat',
    category: 'irrigation',
    title: 'Crown Root Initiation (CRI) Critical Irrigation in Wheat',
    source: 'ICAR Package of Practices for Rabi Crops',
    content: 'The first irrigation at Crown Root Initiation (CRI) stage (21 to 25 days after sowing) is the single most critical moisture requirement for dwarf wheat. Delayed irrigation at CRI reduces tiller count by up to 30%. Subsequent irrigations should occur at Late Tillering (40-45 DAS), Late Jointing (60-65 DAS), Flowering (80-85 DAS), and Milk/Dough stage (100-105 DAS).',
    keywords: ['wheat irrigation', 'cri stage', 'pehli sinchai', 'crown root', 'tillering', 'water schedule', 'गेहूं', 'सिंचाई', 'पहली सिंचाई', 'cri', 'दिन', 'पानी'],
    recommendedPractices: [
      'Provide light irrigation (5-6 cm depth) at 21-25 DAS.',
      'Broadcast 1/3rd dose of Nitrogen (Urea @ 30-35 kg/acre) immediately following CRI irrigation.',
      'Avoid water stagnation which causes leaf yellowing.'
    ]
  },
  {
    id: 'kb_paddy_bph',
    crop: 'Rice',
    category: 'pest_disease',
    title: 'Brown Planthopper (BPH - Nilaparvata lugens) and Hopper Burn in Rice',
    source: 'ICAR-National Rice Research Institute (NRRI) Pest Bulletin',
    content: 'Brown Planthoppers congregate at the base of rice tillers near water level. Nymphs and adults suck plant sap, leading to circular dead patches known as "Hopper Burn". BPH multiplication is accelerated by close planting, heavy nitrogen use, and indiscriminate synthetic pyrethroid sprays which kill natural spider predators.',
    keywords: ['bph', 'brown planthopper', 'hopper burn', 'bhura fudka', 'paddy pest', 'triflumezopyrim', 'pymetrozine', 'धान', 'भूरा फुदका', 'हॉपर बर्न', 'कीड़े', 'நெல்', 'பூச்சி'],
    recommendedPractices: [
      'Provide alleyways (30 cm gap every 2 meters) to allow sunlight and aeration.',
      'Drain water from the field for 3-4 days (Alternate Wetting and Drying) to break breeding.',
      'Avoid synthetic pyrethroids (Cypermethrin/Deltamethrin) which trigger pest resurgence.'
    ],
    safeChemicalControls: [
      {
        name: 'Triflumezopyrim 10% SC (Pexalon)',
        dosage: '94 ml per acre in 200 liters water, directed at base of plants',
        waitingPeriodDays: 21,
        toxicityLevel: 'Green (Low)'
      },
      {
        name: 'Pymetrozine 50% WG (Chess)',
        dosage: '120 g per acre in 200 liters water',
        waitingPeriodDays: 19,
        toxicityLevel: 'Blue (Moderate)'
      }
    ],
    organicRemedies: [
      'Spray Neem oil (10,000 ppm) @ 2 ml/L or NSKE 5% directed towards the base.',
      'Conserve mirid bugs and wolf spiders by minimizing broad-spectrum pesticides.'
    ]
  },
  {
    id: 'kb_paddy_bacterial_blight',
    crop: 'Rice',
    category: 'pest_disease',
    title: 'Bacterial Leaf Blight (Xanthomonas oryzae) Management in Rice',
    source: 'ICAR-Indian Institute of Rice Research (IIRR) Technical Guide',
    content: 'Bacterial blight causes water-soaked to yellowish-white wavy lesions starting from leaf tips and margins, progressing downward. Affected leaves dry up into a bleached straw-yellow color ("Kresek" wilt phase in seedlings). Bacteria enter through hydathodes or storm-induced mechanical wounds.',
    keywords: ['bacterial leaf blight', 'blb', 'xanthomonas', 'kresek', 'paddy disease', 'streptocycline', 'copper oxychloride', 'धान', 'पत्ती झुलसा', 'கருகல்', 'நெல் பயிர்'],
    recommendedPractices: [
      'Grow resistant varieties like Improved Samba Mahsuri (RP Bio-226) or Pusa 1592.',
      'Withhold nitrogen top-dressing immediately upon noticing initial lesions.',
      'Avoid clipping seedling tips during transplanting.'
    ],
    safeChemicalControls: [
      {
        name: 'Streptocycline + Copper Oxychloride 50% WP',
        dosage: 'Streptocycline 6g + Copper Oxychloride 500g in 200 liters water per acre',
        waitingPeriodDays: 15,
        toxicityLevel: 'Blue (Moderate)'
      }
    ],
    organicRemedies: [
      'Spray 20% fresh cow dung slurry supernatant (filtrate) on foliage to induce competitive microbial antagonism.'
    ]
  },
  {
    id: 'kb_cotton_pink_bollworm',
    crop: 'Cotton',
    category: 'pest_disease',
    title: 'Pink Bollworm (Pectinophora gossypiella) Control in Bt Cotton',
    source: 'ICAR-Central Institute for Cotton Research (CICR) Integrated Pest Management',
    content: 'Pink bollworm larvae enter developing bolls within 24-48 hours of hatching and feed internally on seeds and lint, creating "rosette flowers" and stained lint. External entrance holes heal quickly, hiding internal boll damage. The pest has developed field resistance to Cry1Ac and Cry2Ab Bt toxins in multiple states.',
    keywords: ['pink bollworm', 'cotton pest', 'gulabi sundi', 'rosette flower', 'pheromone trap', 'profenofos', 'emamectin', 'कपास', 'गुलाबी सुंडी', 'फूल', 'फेरोमोन ट्रैप', 'பருத்தி', 'ಹತ್ತಿ'],
    recommendedPractices: [
      'Install Gossyplure pheromone traps @ 2 traps/acre for monitoring and 8 traps/acre for mass trapping.',
      'Maintain ETL threshold: 8 moths/trap/night for 3 consecutive days or 10% rosette flowers.',
      'Avoid extending crop season into ratoon/summer to prevent pest carryover.'
    ],
    safeChemicalControls: [
      {
        name: 'Profenofos 50% EC',
        dosage: '2 ml per liter of water (400 ml in 200 liters water per acre)',
        waitingPeriodDays: 30,
        toxicityLevel: 'Yellow (High)'
      },
      {
        name: 'Emamectin Benzoate 5% SG',
        dosage: '0.4 g per liter of water (80-100 g per acre)',
        waitingPeriodDays: 14,
        toxicityLevel: 'Green (Low)'
      }
    ],
    organicRemedies: [
      'Release Trichogramma bactrae egg parasitoids @ 60,000/acre at weekly intervals from 45 DAS.',
      'Spray Beauveria bassiana 1.15% WP @ 5 g/L during evening hours.'
    ]
  },
  {
    id: 'kb_tomato_early_late_blight',
    crop: 'Tomato',
    category: 'pest_disease',
    title: 'Early Blight (Alternaria solani) and Late Blight (Phytophthora) in Tomato',
    source: 'ICAR-Indian Institute of Horticultural Research (IIHR) Disease Management',
    content: 'Early blight causes dark brown circular spots with concentric target-board rings on older foliage. Late blight causes water-soaked dark greenish-black oily patches with white cottony mildew on leaf undersides during cool, cloudy, misty conditions, leading to rapid foliage rot.',
    keywords: ['tomato blight', 'early blight', 'late blight', 'alternaria', 'mancozeb', 'metalaxyl', 'target spot', 'टमाटर', 'झुलसा', 'फल छेदक', 'पत्ती मुड़ना', 'தக்காளி', 'ಟೊಮೆಟೊ'],
    recommendedPractices: [
      'Stake plants to keep foliage off moist soil surfaces.',
      'Use drip irrigation instead of overhead sprinklers to minimize leaf wetness duration.',
      'Crop rotation with non-solanaceous crops (avoid potato or chili immediate succession).'
    ],
    safeChemicalControls: [
      {
        name: 'Mancozeb 75% WP (Indofil M-45)',
        dosage: '2.5 g per liter of water (protective preventive spray)',
        waitingPeriodDays: 7,
        toxicityLevel: 'Green (Low)'
      },
      {
        name: 'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ)',
        dosage: '2 g per liter of water (curative for Late Blight)',
        waitingPeriodDays: 10,
        toxicityLevel: 'Blue (Moderate)'
      }
    ],
    organicRemedies: [
      'Spray Trichoderma viride @ 5g/L or copper hydroxide / Bordeaux mixture 1% as preventative.'
    ]
  },
  {
    id: 'kb_mustard_aphid',
    crop: 'Mustard',
    category: 'pest_disease',
    title: 'Mustard Aphid (Lipaphis erysimi) Control and Thresholds',
    source: 'Directorate of Rapeseed-Mustard Research (DRMR) Advisory',
    content: 'Mustard aphid (Mahu/Chepa) infests terminal twigs, inflorescences, and pods, sucking sap and secreting honeydew that leads to black sooty mold. Economic Threshold Level (ETL) is 20-25% infested plants or 1.5-2 cm aphid colony length per central shoot.',
    keywords: ['mustard aphid', 'mahu', 'chepa', 'sarson', 'dimethoate', 'thiamethoxam', 'etl', 'सरसों', 'माहू', 'चेपा', 'कीड़े', 'रोग'],
    recommendedPractices: [
      'Complete sowing before October 20 to escape peak aphid flight.',
      'Conserve Coccinellid ladybird beetles (each grub consumes 50-60 aphids/day).',
      'Pluck and destroy early infested twig colonies.'
    ],
    safeChemicalControls: [
      {
        name: 'Dimethoate 30% EC (Rogor)',
        dosage: '1.5 ml per liter of water (300 ml/acre)',
        waitingPeriodDays: 20,
        toxicityLevel: 'Blue (Moderate)'
      },
      {
        name: 'Thiamethoxam 25% WG',
        dosage: '0.3 g per liter of water (50-60 g/acre)',
        waitingPeriodDays: 21,
        toxicityLevel: 'Green (Low)'
      }
    ],
    organicRemedies: [
      'Spray 5% NSKE or verticillium lecanii @ 5 g/L.',
      'Install yellow sticky traps @ 10-15 per acre.'
    ]
  },
  {
    id: 'kb_safety_banned_pesticides',
    crop: 'General',
    category: 'agronomy',
    title: 'Statutory Safety Advisory: Banned and Restricted Agrochemicals in India',
    source: 'Central Insecticides Board & Registration Committee (CIBRC) & Ministry of Agriculture',
    content: 'Certain chemical insecticides are strictly banned in India under the Insecticides Act 1968 and orders of the Hon’ble Supreme Court of India due to extreme human health and environmental hazards. Endosulfan is completely prohibited nationwide. Monocrotophos is banned for use on vegetables and fruits. Paraquat dichloride and Phorate 10G have extreme toxicity restrictions.',
    keywords: ['banned pesticide', 'endosulfan', 'monocrotophos', 'safety', 'cibrc', 'cancellation', 'pesticide ban', 'एंडोसल्फान', 'प्रतिबंधित', 'मोनोक्रोटोफॉस', 'दवा', 'खतरा'],
    recommendedPractices: [
      'NEVER recommend or purchase banned compounds like Endosulfan, Aldicarb, or Lindane.',
      'Observe Waiting Period (Pre-Harvest Interval - PHI) before picking produce for market.',
      'Wear protective gear (mask, rubber gloves, goggles) while preparing and spraying spray solutions.'
    ]
  },
  {
    id: 'kb_pm_kisan_scheme',
    crop: 'General',
    category: 'government_scheme',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) Guidelines & e-KYC',
    source: 'Department of Agriculture & Farmers Welfare (DA&FW), Govt of India',
    content: 'PM-KISAN provides direct income support of ₹6,000 per year to all landholding farmer families, payable in three equal installments of ₹2,000 every 4 months (April-July, August-November, December-March). Beneficiaries must complete Aadhaar-based e-KYC, land seeding on PM-KISAN portal, and Aadhaar bank account NPCI linking.',
    keywords: ['pm kisan', 'pm-kisan', 'installment', 'ekyc', 'kisan samman nidhi', '6000 rupees', 'aadhaar seeding', 'पीएम किसान', 'किस्त', 'ई-केवाईसी', 'योजना'],
    recommendedPractices: [
      'Complete biometric e-KYC at nearest CSC or OTP-based e-KYC on PM-KISAN mobile app with facial recognition.',
      'Verify Land Seeding status with the local Patwari/Tehsildar.',
      'Ensure DBT bank account is active and seeded with Aadhaar on NPCI mapper.'
    ]
  },
  {
    id: 'kb_soil_health_card',
    crop: 'General',
    category: 'fertilizer',
    title: 'Soil Health Card Scheme and Micronutrient Balancing (Zinc & Sulfur)',
    source: 'National Project on Soil Health and Fertility, ICAR',
    content: 'Soil Health Cards provide crop-wise fertilizer dosage based on 12 parameters: Macro-nutrients (N, P, K), Secondary nutrients (S), Micronutrients (Zn, Fe, Cu, Mn, Bo), and Physical parameters (pH, EC, Organic Carbon). Deficiencies in Zinc (<0.6 ppm) and Sulfur (<10 ppm) are widespread across Indian soils.',
    keywords: ['soil health card', 'zinc deficiency', 'khaira disease', 'sulfur', 'npk balance', 'soil testing', 'मृदा स्वास्थ्य कार्ड', 'जिंक', 'सल्फर', 'खाद', 'यूरिया', 'डीएपी'],
    recommendedPractices: [
      'In zinc-deficient soils, apply Zinc Sulfate (21% heptahydrate) @ 25 kg/ha or 33% monohydrate @ 15 kg/ha as basal.',
      'In standing crop showing zinc deficiency ("Khaira" in rice), spray 0.5% Zinc Sulfate + 0.25% lime solution.',
      'Incorporate organic manure / Dhaincha green manure every 2-3 years to restore organic carbon.'
    ]
  }
];
