import React from 'react';

/**
 * A small card to display individual data features used in the AI prediction.
 */
export default function FeatureCard({ label, value }) {
  return (
    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-sm group">
      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 group-hover:text-indigo-400 transition-colors">
        {label}
      </div>
      <div className="text-sm font-bold text-slate-800">
        {value}
      </div>
    </div>
  );
}