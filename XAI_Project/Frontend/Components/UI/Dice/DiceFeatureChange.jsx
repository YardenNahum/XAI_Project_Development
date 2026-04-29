import React from 'react';
/**
 * DiceFeatureChange component that displays a single feature change in a counterfactual scenario, showing the feature label, old value, and new value. 
 * The old value is displayed with a strikethrough and in red to indicate the change, while the new value is highlighted in green to show the recommended adjustment. 
 * @param {*} param0 
 * @returns 
 */
export default function DiceFeatureChange({ label, oldValue, newValue }) {
  return (
    <div className="flex flex-col gap-2 py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-all">
      
      {/* TOP ROW: Label and Transition*/}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xl font-bold text-slate-800 capitalize tracking-tight">
          {label.replace(/_/g, ' ')}:
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-2 py-0.5 bg-rose-50 rounded border border-rose-100">
            <span className="text-xl font-bold text-rose-500 line-through decoration-rose-300">
              {oldValue}
            </span>
          </div>
          <span className="text-slate-300 font-bold text-4xl">→</span>
        </div>
      </div>

      {/* BOTTOM ROW: Recommendation  */}
      <div className="w-full">
        <div className="px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm">
          <span className="text-xl font-black text-emerald-700 leading-snug">
            {newValue}
          </span>
        </div>
      </div>
    </div>
  );
}