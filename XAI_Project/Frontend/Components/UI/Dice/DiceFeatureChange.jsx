import React from 'react';

/**
 * DiceFeatureChange 
 * Component to display a single feature change in a DiCE scenario, showing the feature name and its new value after the change.
 */
export default function DiceFeatureChange({ label, newValue }) {
  return (
    <div className="flex items-center py-2 px-2 group">
      <div className="w-1 h-1 rounded-full bg-slate-300 mr-3 shrink-0" />
      <span className="text-sm font-bold text-slate-600 capitalize">
        {label.replace(/_/g, ' ')}:
      </span>
      <span className="ml-2 text-sm font-mono font-black text-emerald-600 bg-emerald-50/50 px-1.5 py-0.5 rounded">
        {newValue}
      </span>
    </div>
  );
}