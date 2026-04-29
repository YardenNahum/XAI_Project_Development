import React from 'react';

/**
 * DiceFeatureChange component that displays a single feature change in a counterfactual scenario.
 * Updated to be fully responsive for mobile views.
 */
export default function DiceFeatureChange({ label, oldValue, newValue }) {
  return (
    <div className="flex flex-col gap-2 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-all">
      
      {/* TOP ROW: Label and Transition  */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
        <span className="text-lg sm:text-xl font-bold text-slate-800 capitalize tracking-tight">
          {label.replace(/_/g, ' ')}:
        </span>

        {/* The "Old Value ->" container */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="px-2 py-0.5 bg-rose-50 rounded border border-rose-100">
            <span className="text-lg sm:text-xl font-bold text-rose-500 line-through decoration-rose-300">
              {oldValue}
            </span>
          </div>
          <span className="text-slate-300 font-bold text-2xl sm:text-4xl">→</span>
        </div>
      </div>

      {/* BOTTOM ROW: Recommendation */}
      <div className="w-full">
        <div className="px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm">
          <span className="text-lg sm:text-xl font-black text-emerald-700 leading-snug break-words">
            {newValue}
          </span>
        </div>
      </div>
    </div>
  );
}