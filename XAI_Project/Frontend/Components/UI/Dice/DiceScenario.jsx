import React from 'react';

/**
 * DiceScenario - Outcome badge for the DiCE card.
 */
export default function DiceScenario({ outcome, probability }) {
  return (
    <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl text-center w-full">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
        Target
      </div>
      <div className="text-sm font-black text-indigo-800">
        {outcome}
      </div>
      <div className="text-[10px] font-bold text-indigo-600">
        ({probability})
      </div>
    </div>
  );
}