import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';
import DiceScenario from './DiceScenario.jsx';
import DiceFeatureChange from './DiceFeatureChange.jsx';
/**
 * DiceCard component displays counterfactual scenarios for a given data set.
 * It takes in the DiCE explanation data, processes it to extract relevant information about each scenario, and renders a card with a header, a description of the scenarios, and a list of scenarios with their respective feature changes.
 * Each scenario shows the potential outcome, the current probability, the target probability, and the potential gain. 
 * The feature changes for each scenario are displayed in a grid format, showing the old and new values for each changed feature.
 * If there are more scenarios or feature changes than the defined limits, a "View All" button allows users to expand the view to see all details.
 * @param {*} param0 
 * @returns 
 */
export default function DiceCard({ data }) {
  // Control the expand/collapse state for scenarios and feature changes
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!data) return null;
// Extract current probability for the original scenario
  const currentProb = data.current_target_probability;
// Process the DiCE explanation data to extract scenario information
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

  const SCENARIO_LIMIT = 3; 
  const FEATURE_LIMIT = 8; 
  // Determine which scenarios to display based on the expand/collapse state
  const visibleScenarios = isExpanded 
    ? scenarioEntries 
    : scenarioEntries.slice(0, SCENARIO_LIMIT);

  const hasMoreScenarios = scenarioEntries.length > SCENARIO_LIMIT;

  return (
    <div className="bg-white rounded-[2rem] border-2 border-slate-200 p-8 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 text-slate-400 font-black text-xs uppercase tracking-[0.2em]">
        <Shuffle size={18} strokeWidth={3} />
        <span>DiCE Explanations</span>
      </div>

      <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
        Counterfactual Scenarios
      </h3>
      <p className="text-2xl text-slate-500 mb-8 font-medium italic leading-relaxed">
        Adjusting these specific factors would lead to a <span className="text-slate-900 font-bold">"{scenarioEntries[0]?.outcome}"</span> outcome.
      </p>

      {/* Scenarios List */}
      <div className="space-y-10">
        {visibleScenarios.map((scenario) => {
          const displayChanges = isExpanded 
            ? scenario.changes 
            : scenario.changes.slice(0, FEATURE_LIMIT);
            
          return (
            <div key={scenario.id} className="space-y-6">
              <DiceScenario 
                outcome={scenario.outcome} 
                currentProb={currentProb}
                targetProb={scenario.targetProb} 
                gain={scenario.gain} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 px-2">
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
                <div className="px-2 text-sm font-black text-slate-400 uppercase tracking-widest italic">
                  + {scenario.changes.length - FEATURE_LIMIT} additional parameters changed
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
          className=" cursor-pointer w-full mt-10 py-5 text-sm font-black text-indigo-700 bg-indigo-50 border-2 border-indigo-100 rounded-2xl hover:bg-indigo-100 transition-all uppercase tracking-widest"
        >
          {isExpanded ? 'Minimize Scenarios' : `View All ${scenarioEntries.length} Counterfactuals`}
        </button>
      )}
    </div>
  );
}