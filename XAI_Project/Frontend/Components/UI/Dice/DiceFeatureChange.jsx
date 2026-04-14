import React from 'react';

export default function DiceFeatureChange({ label, oldValue, newValue }) {
  return (
    <div className="flex flex-col py-3 px-2 group border-b border-slate-50 last:border-0">
      {/* Label*/}
      <span className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
        {label.replace(/_/g, ' ')}
      </span>
      
      <div className="flex items-center gap-3">
        {/* Old Value - Red & Strikethrough */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-rose-50 rounded-lg border border-rose-100">
          <span className="text-xs font-bold text-rose-500 line-through">
            {oldValue}
          </span>
        </div>

        {/* Arrow Spacer */}
        <span className="text-slate-300 font-bold text-lg">→</span>

        {/* New Value & Suggestion - Green */}
        <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
          <span className="text-xs font-black text-emerald-700">
            {newValue}
          </span>
        </div>
      </div>
    </div>
  );
}