import React from 'react';

/**
 * ShapBar
 * Component to display a single feature's SHAP value as a horizontal bar, showing the feature name, its impact on the prediction, and a visual representation of the impact relative to other features.
 * Props:
 * - label: The name of the feature 
 * - impact: The SHAP value for the feature.
 * - maxValue: The maximum absolute SHAP value among all features.
 * - colorClass: The CSS class for the bar's color.
 */
export default function ShapBar({ label, impact, maxValue, colorClass }) {
  // Calculate visual width relative to the most impactful feature
  const visualWidthPercentage = maxValue > 0 ? (Math.abs(impact) / maxValue) * 100 : 0;
  
  // Format the impact string
  const formattedImpact = impact > 0 ? `+${impact.toFixed(4)}` : impact.toFixed(4);
  
  // Dynamic text color based on positive/negative influence
  const textColor = impact > 0 ? 'text-orange-600' : 'text-blue-600';

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm font-bold">
        <span className="text-slate-700 capitalize">{label.replace(/_/g, ' ')}</span>
        <span className={`${textColor} font-mono text-xs`}>
          {formattedImpact}
        </span>
      </div>
      
      {/* Progress Track */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${visualWidthPercentage}%` }}
        />
      </div>
    </div>
  );
}