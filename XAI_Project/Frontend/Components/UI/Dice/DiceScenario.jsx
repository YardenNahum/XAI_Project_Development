import React from 'react';
import { Target } from 'lucide-react';

/**
 * DiceScenario component updated for full mobile responsiveness.
 * Stacks vertically on small screens and horizontally on larger ones.
 */
export default function DiceScenario({ outcome, currentProb, targetProb, gain }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between w-full border-b-2 border-slate-100 pb-6 md:pb-4 gap-6">
      
      {/* Title Section */}
      <div className="flex items-center gap-3 md:gap-4">
        <Target size={24} className="text-slate-900 shrink-0" strokeWidth={3} />
        <span className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight break-words">
          Target: {outcome}
        </span>
      </div>

      {/* Stats Section  */}
      <div className="flex flex-wrap items-start md:items-center gap-4 md:gap-8 whitespace-nowrap">
        
        {/* Current */}
        <div className="flex flex-col items-start md:items-end min-w-[80px]">
          <span className="text-xs md:text-lg font-black text-slate-400 uppercase tracking-widest">Current</span>
          <span className="text-lg md:text-xl font-bold text-slate-400">{currentProb}</span>
        </div>

        {/* Arrow  */}
        <span className="hidden sm:block text-slate-200 font-bold text-xl md:text-2xl">→</span>

        {/* Expected */}
        <div className="flex flex-col items-start md:items-end min-w-[80px]">
          <span className="text-xs md:text-lg font-black text-slate-400 uppercase tracking-widest">Expected</span>
          <span className="text-lg md:text-xl font-bold text-slate-900">{targetProb}</span>
        </div>

        {/* Gain Box */}
        <div className="flex flex-col items-start md:items-end bg-emerald-50 px-4 py-2 md:py-1 rounded-xl border border-emerald-100 w-full sm:w-auto">
          <span className="text-xs md:text-lg font-black text-emerald-600 uppercase tracking-widest">Probability Gain</span>
          <span className="text-lg md:text-xl font-black text-emerald-600">{gain}</span>
        </div>
      </div>
    </div>
  );
}