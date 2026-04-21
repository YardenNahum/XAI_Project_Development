import React from 'react';

export default function DiceFeatureChange({ label, oldValue, newValue }) {
  return (
    <div className="flex flex-col gap-2 py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-all">
      
      {/* TOP ROW: Label and Transition - Keeps things aligned */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-2xl font-bold text-slate-800 capitalize tracking-tight">
          {label.replace(/_/g, ' ')}:
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-2 py-0.5 bg-rose-50 rounded border border-rose-100">
            <span className="text-3xl font-bold text-rose-500 line-through decoration-rose-300">
              {oldValue}
            </span>
          </div>
          <span className="text-slate-300 font-bold text-4xl">→</span>
        </div>
      </div>

      {/* BOTTOM ROW: Recommendation - Full width to prevent overlap */}
      <div className="w-full">
        <div className="px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm">
          <span className="text-4xl font-black text-emerald-700 leading-snug">
            {newValue}
          </span>
        </div>
      </div>
    </div>
  );
}