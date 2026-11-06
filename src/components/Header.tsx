import React from 'react';
import { SupportedLanguage } from '../types/agri';
import { Sprout, Volume2, Globe, Cpu, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
  onOpenTopicModal: () => void;
}

export const LANGUAGES: { code: SupportedLanguage; name: string; native: string }[] = [
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'en', name: 'English', native: 'English' },
];

export const Header: React.FC<HeaderProps> = ({
  selectedLanguage,
  onLanguageChange,
  voiceEnabled,
  onVoiceToggle,
  onOpenTopicModal
}) => {
  return (
    <header className="bg-emerald-950 text-white border-b border-emerald-800/80 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Project Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center shadow-md shadow-emerald-900/50">
            <Sprout className="w-6 h-6 text-emerald-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                Kisan Mitra <span className="text-emerald-400 font-semibold text-sm">किसान मित्र</span>
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-800/80 text-emerald-200 border border-emerald-700/60">
                CS3235 Topic 2
              </span>
            </div>
            <p className="text-xs text-emerald-300/80 hidden sm:block">
              AI4Bharat IndicTrans2 & BharatGen AgriParam • Multilingual Agritech Advisory
            </p>
          </div>
        </div>

        {/* Action Controls: Models badge, Language Selector, Voice Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Topic Switcher / PDF reference button */}
          <button
            onClick={onOpenTopicModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-850 text-emerald-200 text-xs font-medium border border-emerald-700/60 transition-colors cursor-pointer"
            title="View CS3235 Topics from Assignment PDF"
          >
            <Cpu className="w-3.5 h-3.5 text-lime-400" />
            <span className="hidden lg:inline">CS3235 Topic 2:</span> Agri Advisory
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center bg-emerald-900/90 rounded-lg border border-emerald-700/80 px-2.5 py-1">
            <Globe className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
            <select
              aria-label="Select farmer language"
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer pr-1"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-emerald-950 text-white">
                  {l.native} ({l.name})
                </option>
              ))}
            </select>
          </div>

          {/* Voice Auto-readout Toggle */}
          <button
            onClick={onVoiceToggle}
            aria-label={voiceEnabled ? 'Disable voice readout' : 'Enable voice readout'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              voiceEnabled
                ? 'bg-lime-500/20 text-lime-300 border-lime-500/40 hover:bg-lime-500/30'
                : 'bg-emerald-900/60 text-emerald-400 border-emerald-800 hover:bg-emerald-800/80'
            }`}
            title={voiceEnabled ? 'Voice output: ON (Indic Parler-TTS)' : 'Voice output: OFF'}
          >
            <Volume2 className={`w-3.5 h-3.5 ${voiceEnabled ? 'text-lime-400 animate-pulse' : 'text-emerald-500'}`} />
            <span className="hidden sm:inline">{voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
