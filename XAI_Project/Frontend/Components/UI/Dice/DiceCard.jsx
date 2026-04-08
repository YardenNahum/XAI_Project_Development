import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';
import DiceScenario from './DiceScenario.jsx';
import DiceFeatureChange from './DiceFeatureChange.jsx';

export default function DiceCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!data) return null;
  // 1. Transform Data
  const scenarioEntries = Object.entries(data).map(([key, value]) => ({
    id: key,
    displayName: key.replace('_', ' ').toUpperCase(),
    outcome: value.new_target,
    changes: value.Changes ? value.Changes.map(c => ({ 
      label: c.feature, 
      newValue: c.change 
    })) : []
  }));

  // 2. LIMIT LOGIC
  const SCENARIO_LIMIT = 4; // Show max 4 scenarios
  const FEATURE_LIMIT = 3;  // Show max 3 features per scenario before expanding

  // Determine which scenarios to show
  const visibleScenarios = isExpanded 
    ? scenarioEntries 
    : scenarioEntries.slice(0, SCENARIO_LIMIT);

  const hasMoreScenarios = scenarioEntries.length > SCENARIO_LIMIT;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
        <Shuffle size={14} />
        <span>Counterfactual Explanations (DiCE)</span>
      </div>

      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-2">
        DiCE
      </h3>
      <p className="text-sm text-slate-500 mb-6 font-medium">
        Review the following adjustments to reach a different target outcome:
      </p>

      {/* Scenarios List */}
      <div className="space-y-6">
        {visibleScenarios.map((scenario) => {
          // Limit internal features unless expanded
          const displayChanges = isExpanded 
            ? scenario.changes 
            : scenario.changes.slice(0, FEATURE_LIMIT);
            
          return (
            <div key={scenario.id} className="p-5 bg-slate-50/30 rounded-2xl border border-slate-100 transition-all">
              <DiceScenario outcome={scenario.outcome} />
              
              <div className="mt-4 flex flex-col">
                {displayChanges.map((change, idx) => (
                  <DiceFeatureChange 
                    key={idx} 
                    label={change.label} 
                    newValue={change.newValue} 
                  />
                ))}
                
                {/* Visual indicator if features are hidden inside a scenario */}
                {!isExpanded && scenario.changes.length > FEATURE_LIMIT && (
                  <div className="px-8 py-2 text-[10px] font-bold text-slate-400 italic">
                    + {scenario.changes.length - FEATURE_LIMIT} more changes in this scenario...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Global View More Button */}
      {(hasMoreScenarios || scenarioEntries.some(s => s.changes.length > FEATURE_LIMIT)) && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-6 py-4 text-xs font-black text-indigo-700 bg-indigo-50/50 border border-indigo-100 rounded-2xl hover:bg-indigo-100 transition-all active:scale-[0.98] shadow-sm cursor-pointer"
        >
          {isExpanded ? (
            'Show Less'
          ) : (
            `View All Scenarios & Detailed Changes`
          )}
        </button>
      )}
    </div>
  );
}