export type SupportedLanguage = 
  | 'hi' // Hindi
  | 'ta' // Tamil
  | 'kn' // Kannada
  | 'te' // Telugu
  | 'mr' // Marathi
  | 'pa' // Punjabi
  | 'bn' // Bengali
  | 'en'; // English

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  indicTransCode: string;
  voiceLang: string;
}

export interface AgriKnowledgeChunk {
  id: string;
  crop: string;
  category: 'pest_disease' | 'fertilizer' | 'irrigation' | 'agronomy' | 'government_scheme' | 'weather';
  title: string;
  source: string; // e.g., 'ICAR-IARI Bulletin 2025', 'KVK Advisory', 'DAC&FW'
  content: string;
  keywords: string[];
  recommendedPractices: string[];
  safeChemicalControls?: {
    name: string;
    dosage: string;
    waitingPeriodDays: number;
    toxicityLevel: 'Green (Low)' | 'Blue (Moderate)' | 'Yellow (High)';
  }[];
  organicRemedies?: string[];
}

export interface PipelineStageResult {
  stage: 'input' | 'asr' | 'indicTrans_to_en' | 'rag_retrieval' | 'agriParam_reasoning' | 'indicTrans_to_target' | 'indic_parler_tts';
  title: string;
  model: string;
  latencyMs: number;
  output: string;
  metadata?: Record<string, any>;
}

export interface AdvisoryMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  language: SupportedLanguage;
  originalText: string;
  translatedEnglishText?: string;
  responseText?: string;
  responseTextInEnglish?: string;
  audioGenerated?: boolean;
  retrievedSources?: {
    id: string;
    title: string;
    source: string;
    crop: string;
    relevanceScore: number;
    snippet: string;
  }[];
  pipelineStages?: PipelineStageResult[];
  confidenceScore?: number;
  warnings?: string[];
  fertilizerBreakdown?: {
    crop: string;
    ureaKg: number;
    dapKg: number;
    mopKg: number;
  };
}

export interface DiseaseDiagnosis {
  id: string;
  crop: string;
  diseaseName: string;
  vernacularName: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Infestation' | 'Nutrient Deficiency';
  severity: 'Mild' | 'Moderate' | 'Severe';
  symptoms: string[];
  biologicalTreatment: string[];
  chemicalTreatment: {
    chemical: string;
    dosePerLiter: string;
    dosePerAcre: string;
    safetyPrecautions: string;
  }[];
  prevention: string[];
  sampleImage: string;
  confidence: number;
}

export interface FertilizerInput {
  crop: string;
  area: number;
  unit: 'acre' | 'hectare' | 'bigha';
  soilFertilityLevel: 'low' | 'medium' | 'high';
  organicManureApplied: boolean;
}

export interface FertilizerResult {
  crop: string;
  grossAreaAcres: number;
  recommendedN_kg: number;
  recommendedP_kg: number;
  recommendedK_kg: number;
  ureaBags50kg: number;
  dapBags50kg: number;
  mopBags50kg: number;
  applicationSchedule: {
    stage: string;
    timing: string;
    ureaPercent: number;
    dapPercent: number;
    mopPercent: number;
    instructions: string;
  }[];
  advisoryNotes: string[];
}

export interface TestCase {
  id: string;
  crop: string;
  category: 'Pest/Disease' | 'Fertilizer/NPK' | 'Irrigation' | 'Government Scheme' | 'Safety/Banned Agrochemical' | 'Vernacular/Edge Case';
  language: SupportedLanguage;
  query: string;
  expectedKeyFact: string;
  expectedRecommendation: string;
  groundTruthSource: string;
  complexity: 'Standard' | 'Challenging' | 'Adversarial/Safety';
  status?: 'passed' | 'failed' | 'marginal';
  actualAnswer?: string;
  groundednessScore?: number; // 0 - 100
  factualAccuracyScore?: number; // 0 - 100
  errorCategory?: string;
  evaluationNotes?: string;
}

export interface BenchmarkMetrics {
  totalTestCases: number;
  executedCount: number;
  passedCount: number;
  failedCount: number;
  averageGroundedness: number;
  averageFactualAccuracy: number;
  averageResponseTimeMs: number;
  categoryScores: Record<string, { total: number; passed: number; avgGroundedness: number }>;
  languageScores: Record<string, { total: number; passed: number }>;
  errorDistribution: Record<string, number>;
}
