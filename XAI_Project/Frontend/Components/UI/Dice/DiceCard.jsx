import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';
import DiceScenario from './DiceScenario.jsx';
import DiceFeatureChange from './DiceFeatureChange.jsx';

export default function DiceCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!data) return null;

  const currentProb = data.current_target_probability;

  const scenarioEntries = Object.entries(data)
    .filter(([key]) => key.startsWith('option_')) 
    .map(([key, value]) => ({
      id: key,
      displayName: key.replace('_', ' ').toUpperCase(),
      outcome: value.new_target,
      targetProb: value.target_probability,
      gain: value.potential_gain,
      changes: value.Changes ? value.Changes.map(c => ({ 
        label: c.feature, 
        oldValue: c.original_value, 
        newValue: c.new_value      
      })) : []
    }));

  const SCENARIO_LIMIT = 4;
  // Increased feature limit for the "image" view
  const FEATURE_LIMIT = 8; 

  const visibleScenarios = isExpanded 
    ? scenarioEntries 
    : scenarioEntries.slice(0, SCENARIO_LIMIT);

  const hasMoreScenarios = scenarioEntries.length > SCENARIO_LIMIT;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-50 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
        <Shuffle size={12} />
        <span>DiCE Explanations</span>
      </div>

      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
        Counterfactual Explanations (DiCE)
      </h3>
      <p className="text-sm text-slate-500 mb-4 font-medium italic">
        Feature adjustments to reach {scenarioEntries[0]?.outcome} result.
      </p>

      {/* Scenarios List */}
      <div className="space-y-4">
        {visibleScenarios.map((scenario) => {
          const displayChanges = isExpanded 
            ? scenario.changes 
            : scenario.changes.slice(0, FEATURE_LIMIT);
            
          return (
            <div key={scenario.id} className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 transition-all">
              <DiceScenario 
                outcome={scenario.outcome} 
                currentProb={currentProb}
                targetProb={scenario.targetProb} 
                gain={scenario.gain} 
              />
              
              {/* CHANGE: Added grid-cols-2 to show features side-by-side */}
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                {displayChanges.map((change, idx) => (
                  <DiceFeatureChange 
                    key={idx} 
                    label={change.label} 
                    oldValue={change.oldValue} 
                    newValue={change.newValue} 
                  />
                ))}
              </div>

              {!isExpanded && scenario.changes.length > FEATURE_LIMIT && (
                <div className="mt-2 px-2 py-1 text-[9px] font-bold text-slate-400 italic">
                  + {scenario.changes.length - FEATURE_LIMIT} more features...
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* View More Button */}
      {(hasMoreScenarios || scenarioEntries.some(s => s.changes.length > FEATURE_LIMIT)) && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 py-2 text-[10px] font-black text-indigo-700 bg-indigo-50/30 border border-indigo-50 rounded-xl hover:bg-indigo-100 transition-all shadow-sm"
        >
          {isExpanded ? 'Show Less' : 'View All Scenarios'}
        </button>
      )}
    </div>
  );
}