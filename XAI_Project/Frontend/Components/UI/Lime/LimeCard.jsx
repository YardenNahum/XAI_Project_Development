import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp } from 'lucide-react'; 
import TextualLimeView from './TextualLimeView.jsx';
import TabularLimeView from './TabularLimeView.jsx';

export default function LimeCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || !data.Type) return null;

  // --- 1. SHARED PREDICTION LOGIC ---
  // We extract this here so both Textual and Tabular benefit from the same header style
  const sortedPredictions = data.Prediction 
    ? Object.entries(data.Prediction)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
    : [];

  // --- 2. TABULAR TRUNCATION LOGIC ---
  const INITIAL_LIMIT = 5; 
  const featureList = data.features || [];
  // Only show the "View All" button if it's Tabular and has more than 5 features
  const shouldShowTabularExpand = data.Type === 'Tabular' && featureList.length > INITIAL_LIMIT;

  const displayFeatures = isExpanded 
    ? featureList 
    : featureList.slice(0, INITIAL_LIMIT);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm transition-all duration-300">
      
      {/* HEADER SECTION */}
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

      {/* SHARED PREDICTION HEADER (The % boxes) */}
      {sortedPredictions.length > 0 && (
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Model Prediction Confidence
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedPredictions.map((pred, idx) => (
              <div 
                key={pred.label} 
                className={`p-4 rounded-2xl border flex justify-between items-center bg-white shadow-sm transition-all
                  ${idx === 0 ? 'border-orange-200 ring-1 ring-orange-100' : 'border-blue-100 opacity-80'}`}
              >
                <span className={`text-xs font-black uppercase tracking-tight ${idx === 0 ? 'text-orange-500' : 'text-blue-500'}`}>
                  {pred.label}
                </span>
                <span className={`text-2xl font-mono font-black ${idx === 0 ? 'text-orange-600' : 'text-blue-600'}`}>
                  {(pred.value * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT ROUTER */}
      <div className="space-y-6">
        {(() => {
          switch (data.Type) {
            case 'Textual':
              return (
                <TextualLimeView 
                  text={data.Original_Text} 
                  features={data.features}
                />
              );
            case 'Tabular':
              return (
                <TabularLimeView 
                  features={displayFeatures} 
                />
              );
            default:
              return <div className="p-6 text-center text-rose-500">Unknown Format</div>;
          }
        })()}
      </div>

      {/* SHOW MORE/LESS BUTTON (Tabular Only) */}
      {shouldShowTabularExpand && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full cursor-pointer mt-6 py-3 flex items-center justify-center gap-2 text-xs font-black text-indigo-600 bg-indigo-50/50 rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100/50 active:scale-[0.98]"
        >
          {isExpanded ? (
            <><span className="uppercase tracking-widest">Show Less</span> <ChevronUp size={14} /></>
          ) : (
            <><span className="uppercase tracking-widest">View All {featureList.length} Features</span> <ChevronDown size={14} /></>
          )}
        </button>
      )}
      
      {/* FOOTER POLISH */}
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