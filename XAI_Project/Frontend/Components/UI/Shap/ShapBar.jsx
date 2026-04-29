import React from 'react';
/**
 * shap bar component that takes in the feature label, impact value, maximum impact value, and color class to display a horizontal bar
 *  representing the feature's impact on the model's prediction. 
 * The bar's width is proportional to the absolute value of the impact compared to the maximum impact value.
 *  The impact value is also displayed as text next to the bar, with a plus sign for positive impacts and a minus sign for negative impacts. 
 * The text color changes based on whether the impact is positive (orange) or negative (blue).
 * @param {*} param0 
 * @returns 
 */

export default function ShapBar({ label, impact, maxValue, colorClass }) {
  // Calculate the width of the bar as a percentage of the maximum impact value  
  const visualWidthPercentage = maxValue > 0 ? (Math.abs(impact) / maxValue) * 100 : 0;
  // Format the impact value with a plus sign for positive impacts and a minus sign for negative impacts
  const formattedImpact = impact > 0 ? `+${impact.toFixed(4)}` : impact.toFixed(4);
  // Determine the text color based on whether the impact is positive or negative
  const textColor = impact > 0 ? 'text-orange-600' : 'text-blue-600';

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        {/* feature label */}
        <span className="text-xl font-bold text-slate-800 capitalize leading-none">
          {label.replace(/_/g, ' ')}
        </span>
        {/*  impact value  */}
        <span className={`${textColor} font-mono text-2xl font-black`}>
          {formattedImpact}
        </span>
      </div>
      
      {/* impact bar */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${visualWidthPercentage}%` }}
        />
      </div>
    </div>
  );
}