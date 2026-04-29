import React from 'react';

/**
 * TabularLimeView is a React component that displays the feature importance for tabular data in a LIME explanation.
 * It takes in a list of features with their corresponding weights and renders them in a responsive card format. Positive weights are highlighted in orange, while negative weights are highlighted in blue. The component also includes a header and ensures that the layout is mobile-friendly with appropriate text scaling and spacing.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.features - An array of feature objects, each containing a 'feature' name and a 'weight' value.
 * @returns {JSX.Element} A JSX element representing the tabular view of LIME explanations.
 */
export default function TabularLimeView({ features }) {
  return (
    <div className="space-y-2 w-full">
      {/* HEADER */}
      <div className="flex items-center gap-2 px-1 mb-4">
        <span className="text-xs md:text-lg font-black text-slate-400 uppercase tracking-[0.15em] md:tracking-[0.2em] whitespace-nowrap">
          Evidence for Prediction
        </span>
        <div className="h-[1px] flex-1 bg-slate-100" />
      </div>

      {/* FEATURE ROWS */}
      <div className="space-y-2">
        {features.map((item, index) => {
          const isPositive = item.weight > 0;
          return (
            <div 
              key={index} 
              className="flex items-center justify-between gap-3 p-3 md:p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
            >
              <div className="flex-1 min-w-0 pr-2">
                {/* Feature Text */}
                <span className="text-base md:text-xl font-bold text-slate-800 capitalize break-words leading-tight block">
                  {item.feature.replace(/_/g, ' ')}
                </span>
              </div>
              
              {/* Feature Weights */}
              <div className={`shrink-0 px-3 py-1 md:px-4 md:py-1.5 rounded-lg font-mono text-lg md:text-3xl font-black border tabular-nums ${
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
    </div>
  );
}