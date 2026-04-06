import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import DiceScenario from './DiceScenario.jsx';
import DiceFeatureChange from './DiceFeatureChange.jsx';

/**
 * DiceCard - Main container for DiCE counterfactuals.
 */
export default function DiceCard({ scenarios }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const defaultItemsCount = 2;
  const visibleScenarios = isExpanded ? scenarios : scenarios.slice(0, defaultItemsCount);
  const hasMoreItems = scenarios.length > defaultItemsCount;

  if (!scenarios || scenarios.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      
      {/* Header - Matches SHAP/LIME style */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <RotateCcw size={18} />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
          DiCE Counterfactuals
        </h3>
      </div>

      {/* Scenarios List */}
      <div className="space-y-4">
        {visibleScenarios.map((scenario, idx) => (
          <div 
            key={idx} 
            className="border border-slate-100 rounded-2xl flex flex-col md:flex-row overflow-hidden hover:border-indigo-50 transition-colors"
          >
            {/* Left Side: Scenario Number and Outcome */}
            <div className="p-4 md:w-1/3 flex flex-col justify-center bg-slate-50/30 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">
                Scenario {idx + 1}
              </div>
              <DiceScenario outcome={scenario.outcome} probability={scenario.probability} />
            </div>

            {/* Right Side: Feature Changes */}
            <div className="p-3 flex-1 bg-slate-50/50 space-y-2">
              {scenario.changes.map((change, cIdx) => (
                <DiceFeatureChange 
                  key={cIdx}
                  label={change.label}
                  oldValue={change.oldValue}
                  newValue={change.newValue}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button - Matches SHAP/LIME size */}
      {hasMoreItems && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-6 py-2.5 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all active:scale-[0.98]"
        >
          {isExpanded ? 'View Less' : `View All ${scenarios.length} Scenarios`}
        </button>
      )}
    </div>
  );
}