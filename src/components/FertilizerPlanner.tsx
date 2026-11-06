import React, { useState, useMemo } from 'react';
import { SupportedLanguage } from '../types/agri';
import { calculateFertilizerRequirements, CROP_NPK_DATABASE } from '../utils/fertilizerCalc';
import { 
  Calculator, 
  Package, 
  AlertCircle, 
  Clock, 
  Layers, 
  Check, 
  Wheat, 
  Droplet, 
  Sparkles,
  Info
} from 'lucide-react';

interface FertilizerPlannerProps {
  language: SupportedLanguage;
}

export const FertilizerPlanner: React.FC<FertilizerPlannerProps> = ({ language }) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('wheat');
  const [area, setArea] = useState<number>(1);
  const [unit, setUnit] = useState<'acre' | 'hectare' | 'bigha'>('acre');
  const [soilFertility, setSoilFertility] = useState<'low' | 'medium' | 'high'>('medium');
  const [organicApplied, setOrganicApplied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateFertilizerRequirements({
      crop: selectedCrop,
      area: Number(area) || 1,
      unit,
      soilFertilityLevel: soilFertility,
      organicManureApplied: organicApplied
    });
  }, [selectedCrop, area, unit, soilFertility, organicApplied]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-5 rounded-2xl border border-emerald-800/60 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              ICAR Smart Fertilizer & Irrigation Calculator
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40">
                NPK Equation Engine
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Calculate the precise number of 50kg bags of Urea, DAP, and MOP required for your farm based on soil fertility test results, farm size, and split application growth stages.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Input Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-emerald-400" />
            Farm Parameters
          </h3>

          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Crop (फसल चुनें)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(CROP_NPK_DATABASE).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedCrop(key)}
                  className={`p-2 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                    selectedCrop === key
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {item.cropName}
                </button>
              ))}
            </div>
          </div>

          {/* Area & Unit */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Land Area (खेत का क्षेत्रफल)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0.25"
                max="100"
                step="0.25"
                value={area}
                onChange={(e) => setArea(parseFloat(e.target.value) || 1)}
                className="w-1/2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold text-sm focus:border-emerald-500 focus:outline-none"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-1/2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold text-sm focus:border-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="acre">Acres (एकड़)</option>
                <option value="hectare">Hectares (हेक्टेयर)</option>
                <option value="bigha">Bigha (बीघा - 0.62 acre)</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Calculated for: <span className="text-emerald-400 font-semibold">{result.grossAreaAcres} acres</span>
            </span>
          </div>

          {/* Soil Fertility Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Soil Health Card Status (मृदा परीक्षण स्तर)
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['low', 'medium', 'high'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSoilFertility(lvl)}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-semibold capitalize transition-all cursor-pointer ${
                    soilFertility === lvl
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {lvl} ({lvl === 'low' ? '+25%' : lvl === 'high' ? '-25%' : 'Std'})
                </button>
              ))}
            </div>
          </div>

          {/* Organic Manure Toggle */}
          <div className="pt-2 border-t border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={organicApplied}
                onChange={(e) => setOrganicApplied(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
              />
              <span className="text-xs font-medium text-slate-300">
                Applied FYM / Compost (देसी गोबर खाद डाली है -10% chemical saving)
              </span>
            </label>
          </div>
        </div>

        {/* Right Column (2 cols): Results & Bag Counts */}
        <div className="lg:col-span-2 space-y-6">
          {/* 3 Core Fertilizer Bags Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* DAP Card */}
            <div className="bg-gradient-to-br from-amber-950/60 to-slate-900 border border-amber-700/60 rounded-2xl p-4 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Phosphorus & Nitrogen
                </span>
                <Package className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-300">DAP (18-46-0)</h4>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{result.dapBags50kg}</span>
                <span className="text-xs text-amber-300 font-semibold">Bags (50 kg)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Supplies 100% of required Phosphorus ({result.recommendedP_kg} kg P₂O₅) + starter Nitrogen.
              </p>
            </div>

            {/* Urea Card */}
            <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-700/60 rounded-2xl p-4 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Nitrogen (46% N)
                </span>
                <Package className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-300">Urea (यूरिया)</h4>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{result.ureaBags50kg}</span>
                <span className="text-xs text-emerald-300 font-semibold">Bags (50 kg)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Net remaining Nitrogen requirement ({result.recommendedN_kg} kg N) split across vegetative stages.
              </p>
            </div>

            {/* MOP Card */}
            <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-700/60 rounded-2xl p-4 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  Potash (60% K₂O)
                </span>
                <Package className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-300">MOP (पोटाश)</h4>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{result.mopBags50kg}</span>
                <span className="text-xs text-indigo-300 font-semibold">Bags (50 kg)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Strengthens stems, boosts disease resistance & enhances grain filling ({result.recommendedK_kg} kg K₂O).
              </p>
            </div>
          </div>

          {/* Split Application Schedule Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              Split Fertilizer Application & Irrigation Schedule (खाद डालने की अवस्थाएं)
            </h4>

            <div className="space-y-3">
              {result.applicationSchedule.map((stage, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-white text-sm">{stage.stage}</span>
                    </div>
                    <p className="text-emerald-300 font-medium text-[11px]">{stage.timing}</p>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{stage.instructions}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 block font-semibold">Urea</span>
                      <span className="font-bold text-emerald-400">{stage.ureaPercent}%</span>
                    </div>
                    <div className="text-center border-l border-slate-800 pl-2">
                      <span className="text-[10px] text-slate-400 block font-semibold">DAP</span>
                      <span className="font-bold text-amber-400">{stage.dapPercent}%</span>
                    </div>
                    <div className="text-center border-l border-slate-800 pl-2">
                      <span className="text-[10px] text-slate-400 block font-semibold">MOP</span>
                      <span className="font-bold text-indigo-400">{stage.mopPercent}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Compatibility & Micronutrient Advisories */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-400" />
              Agronomic Precautions & Micronutrient Guidelines (विशेष सावधानियां)
            </h4>
            <div className="space-y-2">
              {result.advisoryNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
