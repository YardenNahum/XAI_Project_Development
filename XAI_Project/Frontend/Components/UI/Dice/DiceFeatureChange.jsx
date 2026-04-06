import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * DiceFeatureChange - Individual feature row for the DiCE card.
 */
export default function DiceFeatureChange({ label, oldValue, newValue }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-slate-100 group hover:border-indigo-100 transition-all">
      <span className="text-xs font-bold text-slate-700 font-mono tracking-tight flex-1">
        {label}
      </span>
      
      <div className="flex items-center gap-2 py-1 px-2 bg-slate-50 rounded-lg border border-slate-100">
        <span className="text-[10px] font-bold text-red-400 line-through">
          {oldValue}
        </span>
        <ArrowRight size={12} className="text-slate-300" />
        <span className="text-[10px] font-black text-emerald-600">
          {newValue}
        </span>
      </div>
    </div>
  );
}