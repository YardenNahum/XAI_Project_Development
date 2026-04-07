import React from 'react';

/**
 * A single bar representing a specific feature's influence.
 */
export default function ShapBar({ label, impact, maxValue, colorClass }) {
  // Calculate visual width relative to the most impactful feature
  const visualWidthPercentage = maxValue > 0 ? (Math.abs(impact) / maxValue) * 100 : 0;
  
  // Format the impact string (e.g., +0.13 or -0.05)
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