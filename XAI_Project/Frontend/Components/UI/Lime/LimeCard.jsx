import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp } from 'lucide-react'; 
import TextualLimeView from './TextualLimeView.jsx';
import TabularLimeView from './TabularLimeView.jsx';

/**
 * LimeCard - Main container for LIME explanations with Expand/Collapse.
 */
export default function LimeCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || !data.Type) return null;

  // --- CONFIGURATION ---
  // Number of features/items to show before truncating
  const INITIAL_LIMIT = 5; 
  const featureList = data.features || [];
  const hasMore = featureList.length > INITIAL_LIMIT;

  // Slice the data if not expanded
  const displayFeatures = isExpanded 
    ? featureList 
    : featureList.slice(0, INITIAL_LIMIT);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm transition-all duration-300">
      
      {/* 1. Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
          <Target size={20} className="stroke-[2.5]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
            Local Explanation
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
            LIME Feature Impact
          </h3>
        </div>
      </div>

      {/* 2. Content Router */}
      <div className="space-y-6">
        {(() => {
          switch (data.Type) {
            case 'Textual':
              return (
                <TextualLimeView 
                  text={data.Original_Text} 
                  // If Textual view handles its own truncation, pass the full list.
                  // Otherwise, pass displayFeatures to truncate highlights.
                  highlights={isExpanded ? data.features : data.features.slice(0, 15)} 
                />
              );
            case 'Tabular':
              return (
                <TabularLimeView 
                  predictions={data.Prediction} 
                  features={displayFeatures} 
                />
              );
            default:
              return (
                <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-100 text-rose-500 font-bold">
                  Unknown LIME format: "{data.Type}"
                </div>
              );
          }
        })()}
      </div>

      {/* 3. Show More / Less Button */}
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-xs font-black text-indigo-600 bg-indigo-50/50 rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100/50 active:scale-[0.98]"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp size={14} />
            </>
          ) : (
            <>
              <span>View All {featureList.length} Contributions</span>
              <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
      
      {/* 4. Footer Polish */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2">
        <div className="h-1 w-1 bg-slate-300 rounded-full" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">
          LIME approximates the model locally for this specific instance.
        </span>
        <div className="h-1 w-1 bg-slate-300 rounded-full" />
      </div>
    </div>
  );
}