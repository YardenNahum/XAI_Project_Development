import React from 'react';

export default function TabularLimeView({ features }) {
  return (
    <div className="space-y-2">
      {/* HEADER */}
      <div className="flex items-center gap-2 px-1 mb-3">
        <span className="text-2xl font-black text-slate-400 uppercase tracking-[0.2em]">
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
              <span className="text-4xl font-bold text-slate-800 capitalize break-words leading-tight">
                {item.feature.replace(/_/g, ' ')}
              </span>
            </div>
            
            {/* Weight Pill - Increased to text-2xl */}
            <div className={`px-4 py-1.5 rounded-lg font-mono text-5xl font-black border ${
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