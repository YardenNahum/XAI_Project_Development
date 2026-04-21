import React from 'react';
import { Target } from 'lucide-react';

export default function DiceScenario({ outcome, currentProb, targetProb, gain }) {
  return (
    <div className="flex items-center justify-between w-full border-b-2 border-slate-100 pb-4">
      <div className="flex items-center gap-4">
        <Target size={24} className="text-slate-900 shrink-0" strokeWidth={3} />
        <span className="text-3xl font-black text-slate-900 uppercase tracking-tight">
          Target: {outcome}
        </span>
      </div>

      <div className="flex items-center gap-8 whitespace-nowrap">
        {/* Current */}
        <div className="flex flex-col items-end">
          <span className="text-xl font-black text-slate-400 uppercase tracking-widest">Current</span>
          <span className="text-3xl font-bold text-slate-400">{currentProb}</span>
        </div>

        {/* Arrow */}
        <span className="text-slate-200 font-bold text-2xl">→</span>

        {/* New */}
        <div className="flex flex-col items-end">
          <span className="text-xl font-black text-slate-400 uppercase tracking-widest">Expected</span>
          <span className="text-3xl font-black text-slate-900">{targetProb}</span>
        </div>

        {/* Gain */}
        <div className="flex flex-col items-end bg-emerald-50 px-4 py-1 rounded-lg border border-emerald-100">
          <span className="text-xl font-black text-emerald-600 uppercase tracking-widest text-right">Probability Gain</span>
          <span className="text-3xl font-black text-emerald-600">{gain}</span>
        </div>
      </div>
    </div>
  );
}