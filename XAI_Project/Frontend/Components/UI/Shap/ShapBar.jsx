import React from 'react';

/**
 * ShapBar is a React component that visualizes the impact of a feature on a model's prediction using a horizontal bar.
 *  The length of the bar represents the magnitude of the impact, while the color indicates whether the impact is positive (orange) or negative (blue). 
 * The component also displays the feature label and its corresponding impact value, formatted to three decimal places for clarity.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.label - The name of the feature being visualized.
 * @param {number} props.impact - The impact value of the feature on the model's prediction.
 * @param {number} props.maxValue - The maximum absolute impact value among all features, used to calculate the relative width of the bar.
 * @param {string} props.colorClass - The CSS class that determines the color of the bar based on whether the impact is positive or negative.
 * @returns {JSX.Element} A JSX element representing a single feature's impact as a horizontal bar with its label and value.
 */
export default function ShapBar({ label, impact, maxValue, colorClass }) {
  // Calculate the width of the bar as a percentage of the maximum impact value   
  const visualWidthPercentage = maxValue > 0 ? (Math.abs(impact) / maxValue) * 100 : 0;
  
  // Reduced decimals for mobile clarity and text-fit
  const formattedImpact = impact > 0 ? `+${impact.toFixed(3)}` : impact.toFixed(3);
  
  // Determine the text color based on whether the impact is positive or negative
  const textColor = impact > 0 ? 'text-orange-600' : 'text-blue-600';

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-end gap-2">
        {/* feature label: Scales from text-base to text-xl */}
        <span className="text-base md:text-xl font-bold text-slate-800 capitalize leading-none truncate">
          {label.replace(/_/g, ' ')}
        </span>
        
        {/* impact value: Scales from text-lg to text-2xl */}
        <span className={`${textColor} font-mono text-lg md:text-2xl font-black shrink-0 tabular-nums`}>
          {formattedImpact}
        </span>
      </div>
      
      {/* impact bar: Slightly thinner on mobile for a sleeker look */}
      <div className="h-2 md:h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${visualWidthPercentage}%` }}
        />
      </div>
    </div>
  );
}