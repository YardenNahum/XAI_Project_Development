import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp } from 'lucide-react'; 
import TextualLimeView from './TextualLimeView.jsx';
import TabularLimeView from './TabularLimeView.jsx';

export default function LimeCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || !data.Type) return null;

  const sortedPredictions = data.Prediction 
    ? Object.entries(data.Prediction)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
    : [];

  const INITIAL_LIMIT = 5; 
  const featureList = data.features || [];
  const shouldShowTabularExpand = data.Type === 'Tabular' && featureList.length > INITIAL_LIMIT;

  const displayFeatures = isExpanded 
    ? featureList 
    : featureList.slice(0, INITIAL_LIMIT);

  return (
    <div className="bg-white rounded-[1.5rem] border-2 border-slate-200 p-6 md:p-8 shadow-md">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl">
          <Target size={24} className="stroke-[3]" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            LIME Feature Impact
          </h3>
        </div>
      </div>

      {/* Model Prediction - FIXED: BLUE FIRST, ORANGE SECOND */}
      {sortedPredictions.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
              Model Prediction Confidence
            </span>
            <div className="h-[2px] flex-1 bg-slate-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedPredictions.map((pred, idx) => {
              const isFirst = idx === 0;
              return (
                <div 
                  key={pred.label} 
                  className={`p-4 rounded-2xl border flex justify-between items-center bg-white shadow-sm
                    ${isFirst ? 'border-blue-200 ring-1 ring-blue-100' : 'border-orange-100 opacity-90'}`}
                >
                  <span className={`text-3xl font-black uppercase tracking-tight ${isFirst ? 'text-blue-600' : 'text-orange-500'}`}>
                    {pred.label}
                  </span>
                  <span className={`text-4xl font-mono font-black ${isFirst ? 'text-blue-700' : 'text-orange-600'}`}>
                    {(pred.value * 100).toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View Logic */}
      <div className="space-y-4">
        {(() => {
          switch (data.Type) {
            case 'Textual':
              return (
                <TextualLimeView 
                  text={data.Original_Text} 
                  features={data.features}
                  predictions={data.Prediction}
                />
              );
            case 'Tabular':
              return (
                <TabularLimeView 
                  features={displayFeatures} 
                />
              );
            default:
              return <div className="p-6 text-center text-rose-600 font-bold text-xl">Unknown Format</div>;
          }
        })()}
      </div>

      {/* Expand Button */}
      {shouldShowTabularExpand && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-5 py-4 flex items-center justify-center gap-3 text-xs font-black text-indigo-700 bg-indigo-50 rounded-xl border-2 border-indigo-100 hover:bg-indigo-100 transition-all"
        >
          {isExpanded ? (
            <><span className="uppercase tracking-[0.2em]">Show Less</span> <ChevronUp size={16} strokeWidth={3} /></>
          ) : (
            <><span className="uppercase tracking-[0.2em]">View All {featureList.length} Features</span> <ChevronDown size={16} strokeWidth={3} /></>
          )}
        </button>
      )}
      
      {/* Footer */}
      <div className="mt-8 pt-6 border-t-2 border-slate-100 flex items-center justify-center gap-3">
        <div className="h-1.5 w-1.5 bg-slate-300 rounded-full" />
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide text-center">
          LIME approximates the model locally for this specific instance
        </span>
        <div className="h-1.5 w-1.5 bg-slate-300 rounded-full" />
      </div>
    </div>
  );
}