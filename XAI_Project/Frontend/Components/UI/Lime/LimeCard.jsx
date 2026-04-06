import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

/**
 * LimeCard - Updated to match the font sizes of ShapCard and PredictionSummary.
 */
export default function LimeCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const defaultItemsCount = 3;
  
  const visibleRules = isExpanded ? data : data.slice(0, defaultItemsCount);
  const hasMoreItems = data.length > defaultItemsCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      
      {/* Header - Changed to text-lg and font-extrabold to match ShapCard */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <SlidersHorizontal size={18} />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
          LIME Local Rules
        </h3>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {visibleRules.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-emerald-50 transition-colors group"
          >
            {/* Percentage Badge - Smaller text (text-xs) to match UI feel */}
            <div className="py-1 px-2 bg-red-100 text-red-700 rounded-lg text-xs font-black min-w-[50px] text-center">
              {item.percentage}
            </div>
            
            {/* Rule Text - Matches text-sm font-bold of the ShapBar labels */}
            <span className="text-sm font-bold text-slate-700 font-mono tracking-tight">
              {item.rule}
            </span>
          </div>
        ))}
      </div>

      {/* View More / Less Button */}
      {hasMoreItems && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-5 py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all active:scale-[0.98]"
        >
          {isExpanded ? 'View Less' : `View All ${data.length} Rules`}
        </button>
      )}
    </div>
  );
}