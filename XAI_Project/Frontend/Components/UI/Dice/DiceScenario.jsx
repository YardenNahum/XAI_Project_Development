import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

/**
 * DiceScenario 
 * Component to display a single DiCE scenario, showing the target outcome and an icon.
 */
export default function DiceScenario({ outcome }) {
  console.log("Rendering DiceScenario with outcome:", outcome);
  return (
    <div className="flex items-center gap-3 w-full bg-indigo-50/50 border border-indigo-100/50 px-4 py-3 rounded-xl">
      {/* Icon */}
      <div className="p-2 bg-white rounded-lg shadow-sm border border-indigo-100 shrink-0">
        <Target size={16} className="text-indigo-600" />
      </div>
      
      {/* Outcome Text */}
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">
          Target Result
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-indigo-900">
            {outcome}
          </span>
        </div>
      </div>
    </div>
  );
}