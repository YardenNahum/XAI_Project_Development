import React from 'react';
import { Target } from 'lucide-react';

export default function DiceScenario({ outcome, currentProb, targetProb, gain }) {
  return (
    <div className="flex items-center gap-4 w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl">
      {/* Icon  */}
      <Target size={20} className="text-slate-900 shrink-0" />
      
      <div className="flex items-center gap-6">
        {/* Outcome */}
        <span className="text-base font-black text-slate-900 uppercase tracking-tight">
          {outcome}
        </span>

        <div className="flex items-center gap-5 text-sm whitespace-nowrap">
          {/* Current */}
          <div className="flex gap-2">
            <span className="text-slate-500 font-semibold">Current:</span>
            <span className="text-slate-500 font-medium">{currentProb}</span>
          </div>

          {/* New */}
          <div className="flex gap-2 text-base">
            <span className="text-slate-600 font-bold">New:</span>
            <span className="font-black text-black">{targetProb}</span>
          </div>

          {/* Gain */}
          <div className="flex gap-2 text-base">
            <span className="text-slate-600 font-bold">Gain:</span>
            <span className="font-black text-emerald-600">{gain}</span>
          </div>
        </div>
      </div>
    </div>
  );
}