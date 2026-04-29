import React from 'react';
/**
 * TabularLimeView is a React component that displays the feature importance for tabular data in a LIME explanation.
 * It takes in a list of features, where each feature has a name and a weight indicating its impact on the model's prediction.
 * The component renders a header and a list of feature rows. Each row shows the feature name and its corresponding weight, 
 * with positive weights highlighted in orange and negative weights highlighted in blue.
 * @param {*} param0 
 * @returns 
 */
export default function TabularLimeView({ features }) {
  return (
    <div className="space-y-2">
      {/* HEADER */}
      <div className="flex items-center gap-2 px-1 mb-3">
        <span className="text-lg font-black text-slate-400 uppercase tracking-[0.2em]">
          Evidence for Prediction
        </span>
        <div className="h-[1px] flex-1 bg-slate-100" />
      </div>

      {/* FEATURE ROWS */}
      {features.map((item, index) => {
        const isPositive = item.weight > 0;
        return (
          <div key={index} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
            <div className="flex-1 min-w-0">
              {/* Feature Text - Increased to text-xl */}
              <span className="text-xl font-bold text-slate-800 capitalize break-words leading-tight">
                {item.feature.replace(/_/g, ' ')}
              </span>
            </div>
            
            {/* Feature Weight */}
            <div className={`px-4 py-1.5 rounded-lg font-mono text-3xl font-black border ${
              isPositive 
                ? 'bg-orange-50 border-orange-100 text-orange-600' 
                : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              {isPositive ? `+${item.weight.toFixed(3)}` : item.weight.toFixed(3)}
            </div>
          </div>
        );
      })}
    </div>
  );
}