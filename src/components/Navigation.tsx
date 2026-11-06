import React from 'react';
import { MessageSquare, Stethoscope, Calculator, FlaskConical, Layers } from 'lucide-react';

export type ActiveTab = 'chat' | 'cropDoctor' | 'fertilizer' | 'benchmark' | 'architecture';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'chat' as ActiveTab,
      label: 'Kisan Vani Chat',
      sublabel: 'Voice & RAG Advisory',
      icon: MessageSquare,
      badge: 'IndicTrans2'
    },
    {
      id: 'cropDoctor' as ActiveTab,
      label: 'Crop Doctor',
      sublabel: 'Leaf Disease Diagnosis',
      icon: Stethoscope,
      badge: 'Vision AI'
    },
    {
      id: 'fertilizer' as ActiveTab,
      label: 'NPK Calculator',
      sublabel: 'Urea, DAP & Water',
      icon: Calculator,
      badge: 'ICAR Norms'
    },
    {
      id: 'benchmark' as ActiveTab,
      label: 'Evaluation Suite',
      sublabel: '40 Test Cases & Rubric',
      icon: FlaskConical,
      badge: 'CS3235 Rubric'
    },
    {
      id: 'architecture' as ActiveTab,
      label: 'Architecture & Docs',
      sublabel: 'AI4Bharat Pipeline',
      icon: Layers,
      badge: 'Spec'
    }
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-[57px] z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-left whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <div>
                  <div className="text-xs sm:text-sm leading-tight flex items-center gap-1.5">
                    {tab.label}
                    {tab.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold uppercase tracking-wider ${
                        isActive
                          ? 'bg-emerald-800 text-emerald-100'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <div className={`text-[11px] hidden md:block leading-tight ${isActive ? 'text-emerald-100/90' : 'text-slate-400'}`}>
                    {tab.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
