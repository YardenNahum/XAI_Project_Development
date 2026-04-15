import React from 'react';

export default function DiceFeatureChange({ label, oldValue, newValue }) {
  return (
    <div className="flex items-center justify-between py-1.5 px-2 group border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
      {/* Label - Now on the left side, taking less vertical space */}
      <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight shrink-0 mr-4">
        {label.replace(/_/g, ' ')}:
      </span>
      
      <div className="flex items-center gap-2 shrink-0">
        {/* Old Value - Stripped down padding */}
        <div className="flex items-center px-1.5 bg-rose-50 rounded border border-rose-100">
          <span className="text-[10px] font-bold text-rose-500 line-through">
            {oldValue}
          </span>
        </div>

        {/* Small Arrow */}
        <span className="text-slate-300 font-bold text-xs">→</span>

        {/* New Value - Stripped down padding */}
        <div className="flex items-center px-1.5 bg-emerald-50 rounded border border-emerald-100">
          <span className="text-[10px] font-black text-emerald-700">
            {newValue}
          </span>
        </div>
      </div>
    </div>
  );
}