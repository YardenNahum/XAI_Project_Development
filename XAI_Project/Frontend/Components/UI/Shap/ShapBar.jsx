import React from 'react';

/**
 * A single bar for the SHAP list.
 */

export default function ShapBar({ label, impact, maxValue, colorClass }) {
  // Calculate width relative to the maximum impact in the dataset
  const widthPercentage = Math.abs((impact / maxValue) * 100);
  const displayImpact = impact > 0 ? `+${impact}` : impact;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm font-bold text-slate-700">
        <span>{label}</span>
        <span className={impact > 0 ? 'text-red-500' : 'text-blue-500'}>
          {displayImpact}
        </span>
      </div>
      
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${widthPercentage}%` }}
        />
      </div>
    </div>
  );
}