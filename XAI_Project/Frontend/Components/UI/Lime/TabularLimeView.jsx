import React from 'react';

export default function TabularLimeView({ features }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1 mb-4">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Evidence for Prediction
        </span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      {features.map((item, index) => {
        const isPositive = item.weight > 0;
        return (
          <div key={index} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-slate-200 transition-all">
            <div className="flex-1 min-w-0">
              <span className="text-sm font-bold text-slate-700 capitalize break-words">
                {item.feature.replace(/_/g, ' ')}
              </span>
            </div>
            <div className={`px-3 py-1.5 rounded-lg font-mono text-sm font-black border ${
              isPositive ? 'bg-orange-50 border-orange-100 text-orange-600' : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              {isPositive ? `+${item.weight.toFixed(3)}` : item.weight.toFixed(3)}
            </div>
          </div>
        );
      })}
    </div>
  );
}