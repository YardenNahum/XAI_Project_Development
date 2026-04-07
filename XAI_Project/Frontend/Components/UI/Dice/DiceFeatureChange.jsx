import React from 'react';

/**
 * DiceFeatureChange - Ultra-clean version.
 * No "change" or "to" words. Just Feature: New Value.
 */
export default function DiceFeatureChange({ label, newValue }) {
  return (
    <div className="flex items-center py-2 px-2 group">
      {/* 1. Subtle Dot */}
      <div className="w-1 h-1 rounded-full bg-slate-300 mr-3 shrink-0" />

      {/* 2. Feature Name */}
      <span className="text-sm font-bold text-slate-600 capitalize">
        {label.replace(/_/g, ' ')}:
      </span>

      {/* 3. New Value (The only colored element) */}
      <span className="ml-2 text-sm font-mono font-black text-emerald-600 bg-emerald-50/50 px-1.5 py-0.5 rounded">
        {newValue}
      </span>
    </div>
  );
}