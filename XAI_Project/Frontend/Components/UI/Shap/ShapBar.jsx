import React from 'react';

export default function ShapBar({ label, impact, maxValue, colorClass }) {
  const visualWidthPercentage = maxValue > 0 ? (Math.abs(impact) / maxValue) * 100 : 0;
  const formattedImpact = impact > 0 ? `+${impact.toFixed(4)}` : impact.toFixed(4);
  const textColor = impact > 0 ? 'text-orange-600' : 'text-blue-600';

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        {/* Increased feature label size */}
        <span className="text-4xl font-bold text-slate-800 capitalize leading-none">
          {label.replace(/_/g, ' ')}
        </span>
        {/* Increased impact value size */}
        <span className={`${textColor} font-mono text-4xl font-black`}>
          {formattedImpact}
        </span>
      </div>
      
      {/* Slightly thicker bar for visibility */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${visualWidthPercentage}%` }}
        />
      </div>
    </div>
  );
}