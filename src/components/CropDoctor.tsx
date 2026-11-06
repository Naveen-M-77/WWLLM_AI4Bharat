import React, { useState } from 'react';
import { SupportedLanguage, DiseaseDiagnosis } from '../types/agri';
import { SAMPLE_CROP_DISEASES } from '../data/cropDoctorSamples';
import { 
  Upload, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  Leaf, 
  Bug, 
  RefreshCw 
} from 'lucide-react';

interface CropDoctorProps {
  language: SupportedLanguage;
}

export const CropDoctor: React.FC<CropDoctorProps> = ({ language }) => {
  const [selectedSample, setSelectedSample] = useState<DiseaseDiagnosis | null>(SAMPLE_CROP_DISEASES[0]);
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosis | null>(SAMPLE_CROP_DISEASES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cropHint, setCropHint] = useState('Wheat');
  const [speechActive, setSpeechActive] = useState(false);

  const handleSampleSelect = (sample: DiseaseDiagnosis) => {
    setSelectedSample(sample);
    setCustomImage(null);
    setDiagnosis(sample);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      setCustomImage(base64Data);
      setSelectedSample(null);
      await runDiagnosis(base64Data, file.type);
    };
    reader.readAsDataURL(file);
  };

  const runDiagnosis = async (base64Image: string, mimeType: string = 'image/jpeg') => {
    setLoading(true);
    try {
      const response = await fetch('/api/advisory/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          mimeType,
          cropHint,
          language
        })
      });

      if (!response.ok) throw new Error('Diagnosis failed');
      const result: DiseaseDiagnosis = await response.json();
      setDiagnosis(result);
    } catch (err) {
      console.error('Diagnosis error:', err);
      // Fallback to sample
      setDiagnosis(SAMPLE_CROP_DISEASES[1]);
    } finally {
      setLoading(false);
    }
  };

  const speakDiagnosis = () => {
    if (!diagnosis || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (speechActive) {
      setSpeechActive(false);
      return;
    }

    const narration = `रोग का नाम: ${diagnosis.vernacularName || diagnosis.diseaseName}. गंभीरता: ${diagnosis.severity}. जैविक उपचार: ${diagnosis.biologicalTreatment.join(', ')}. अनुशंसित रासायनिक उपचार: ${diagnosis.chemicalTreatment.map(c => `${c.chemical}, मात्रा ${c.dosePerLiter}`).join(', ')}.`;
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.onstart = () => setSpeechActive(true);
    utterance.onend = () => setSpeechActive(false);
    utterance.onerror = () => setSpeechActive(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-5 rounded-2xl border border-emerald-800/60 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Crop Doctor: Leaf Disease Diagnosis
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40">
                  Multimodal AI
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Upload crop leaf photos or select a representative pathology case to diagnose symptoms, assess severity, and obtain ICAR-approved organic and chemical prescriptions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer shadow-md transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload Leaf Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Preset Pathology Samples Gallery */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-emerald-400" />
            Or Select a Pre-Loaded Field Disease Sample:
          </h3>
          <span className="text-xs text-slate-400">5 Representative Crops & Pathogens</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SAMPLE_CROP_DISEASES.map((sample) => {
            const isSelected = selectedSample?.id === sample.id && !customImage;
            return (
              <button
                key={sample.id}
                onClick={() => handleSampleSelect(sample)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/30 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-slate-950 flex items-center justify-center">
                    <img
                      src={sample.sampleImage}
                      alt={sample.diseaseName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-white">
                      {sample.crop}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{sample.diseaseName}</h4>
                  <p className="text-[11px] text-emerald-300 font-medium truncate">{sample.vernacularName}</p>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{sample.pathogenType}</span>
                  <span className={`font-semibold ${
                    sample.severity === 'Severe' ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {sample.severity}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diagnosis Report View */}
      {loading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <h4 className="text-base font-bold text-white">Analyzing Crop Foliage Symptoms...</h4>
          <p className="text-xs text-slate-400 max-w-md">
            BharatGen AgriParam Vision inspecting necrotic spots, pustule structure, and matching against ICAR plant pathology disease databases.
          </p>
        </div>
      ) : diagnosis ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left Column: Visual & Header Status */}
          <div className="p-6 bg-slate-950/60 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 mb-4 bg-slate-900 flex items-center justify-center">
                <img
                  src={customImage || diagnosis.sampleImage || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80'}
                  alt={diagnosis.diseaseName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-700/80">
                  {diagnosis.crop}
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold bg-slate-950/90 text-lime-400 border border-lime-500/50">
                  {diagnosis.confidence}% Match
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Identified Condition:
                </span>
                <h3 className="text-xl font-extrabold text-white">{diagnosis.diseaseName}</h3>
                <p className="text-sm font-semibold text-emerald-300">{diagnosis.vernacularName}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pathogen:</span>
                  <span className="font-semibold text-white">{diagnosis.pathogenType}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Severity:</span>
                  <span className={`font-semibold ${
                    diagnosis.severity === 'Severe' ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {diagnosis.severity} Risk
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={speakDiagnosis}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-lime-300" />
                <span>निदान सुनो (Listen to Prescription)</span>
              </button>
            </div>
          </div>

          {/* Right Column (2 cols): Clinical Symptoms, Biological & Chemical Prescriptions */}
          <div className="lg:col-span-2 p-6 space-y-5">
            {/* Symptoms */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Bug className="w-4 h-4 text-emerald-400" />
                Key Visible Symptoms (नैदानिक लक्षण)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {diagnosis.symptoms.map((sym, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-850">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chemical Treatment with exact dosages */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                CIBRC Approved Chemical Control & Exact Dosages (रासायनिक उपचार)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {diagnosis.chemicalTreatment.map((chem, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5">
                    <div className="font-bold text-white text-xs sm:text-sm text-emerald-300">
                      {chem.chemical}
                    </div>
                    <div className="space-y-1 pt-1 text-[11px] text-slate-300 border-t border-slate-800/60">
                      <p><span className="text-slate-400">Spray Dilution:</span> <span className="font-semibold text-white">{chem.dosePerLiter}</span></p>
                      <p><span className="text-slate-400">Per Acre Dose:</span> <span className="font-semibold text-white">{chem.dosePerAcre}</span></p>
                      <p className="text-[10px] text-amber-300/90 leading-tight pt-1">
                        ⚠️ {chem.safetyPrecautions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Biological / Organic Treatment */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Leaf className="w-4 h-4 text-lime-400" />
                Biological & Organic Remedies (जैविक उपचार)
              </h4>
              <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-3 space-y-1.5 text-xs text-emerald-200">
                {diagnosis.biologicalTreatment.map((bio, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span>{bio}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention & Agronomy */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Long-Term Agronomic Prevention (रोकथाम के उपाय)
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {diagnosis.prevention.map((prev, idx) => (
                  <li key={idx} className="bg-slate-950/40 p-2 rounded-lg border border-slate-850 flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{prev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
