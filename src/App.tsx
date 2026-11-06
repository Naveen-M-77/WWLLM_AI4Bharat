import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, ActiveTab } from './components/Navigation';
import { AdvisoryChat } from './components/AdvisoryChat';
import { CropDoctor } from './components/CropDoctor';
import { FertilizerPlanner } from './components/FertilizerPlanner';
import { EvaluationBenchmarkView } from './components/EvaluationBenchmarkView';
import { ArchitectureAndRubric } from './components/ArchitectureAndRubric';
import { TopicModal } from './components/TopicModal';
import { SupportedLanguage } from './types/agri';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('hi');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState<boolean>(false);

  // Check URL query parameters (e.g. ?tab=cropDoctor, ?lang=ta)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as ActiveTab | null;
    const langParam = params.get('lang') as SupportedLanguage | null;

    if (tabParam && ['chat', 'cropDoctor', 'fertilizer', 'benchmark', 'architecture'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    if (langParam && ['hi', 'ta', 'kn', 'te', 'mr', 'pa', 'bn', 'en'].includes(langParam)) {
      setSelectedLanguage(langParam);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Persistent Application Header */}
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        voiceEnabled={voiceEnabled}
        onVoiceToggle={() => setVoiceEnabled(!voiceEnabled)}
        onOpenTopicModal={() => setIsTopicModalOpen(true)}
      />

      {/* Module Navigation Tabs */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'chat' && (
          <AdvisoryChat
            language={selectedLanguage}
            voiceEnabled={voiceEnabled}
          />
        )}

        {activeTab === 'cropDoctor' && (
          <CropDoctor
            language={selectedLanguage}
          />
        )}

        {activeTab === 'fertilizer' && (
          <FertilizerPlanner
            language={selectedLanguage}
          />
        )}

        {activeTab === 'benchmark' && (
          <EvaluationBenchmarkView />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureAndRubric />
        )}
      </main>

      {/* CS3235 Topic Reference Modal */}
      <TopicModal
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
      />
    </div>
  );
}
