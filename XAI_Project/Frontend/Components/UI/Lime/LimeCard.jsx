import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp } from 'lucide-react'; 
import TextualLimeView from './TextualLimeView.jsx';
import TabularLimeView from './TabularLimeView.jsx';
/**
 * LimeCard component for displaying LIME explanations
 * Handles both textual and tabular data formats, with responsive design considerations for mobile devices.
 * Displays model prediction confidence and allows toggling between a summary view and a full view of features for tabular data.
 * @param {*} param0 
 * @returns 
 */
export default function LimeCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || !data.Type) return null;
  // Sort predictions by confidence and convert to array for easier rendering
  const sortedPredictions = data.Prediction 
    ? Object.entries(data.Prediction)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
    : [];

  const INITIAL_LIMIT = 5; 
  const featureList = data.features || [];
  const shouldShowTabularExpand = data.Type === 'Tabular' && featureList.length > INITIAL_LIMIT;
  const displayFeatures = isExpanded ? featureList : featureList.slice(0, INITIAL_LIMIT);

  return (
    <div className="bg-white rounded-[1.25rem] md:rounded-[1.5rem] border-2 border-slate-200 p-4 md:p-8 shadow-md overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 md:p-2.5 bg-indigo-50 text-indigo-700 rounded-xl shrink-0">
          <Target size={20} className="md:w-6 md:h-6 stroke-[3]" />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">
          LIME Feature Impact
        </h3>
      </div>

      {/* Model Prediction */}
      {sortedPredictions.length > 0 && (
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
              Model Prediction Confidence
            </span>
            <div className="h-[1px] md:h-[2px] flex-1 bg-slate-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            {sortedPredictions.map((pred, idx) => {
              const isFirst = idx === 0;
              return (
                <div 
                  key={pred.label} 
                  // Reverted logic: First is blue, others are orange
                  className={`p-3 md:p-4 rounded-xl md:rounded-2xl border flex justify-between items-center bg-white shadow-sm
                    ${isFirst ? 'border-blue-200 ring-1 ring-blue-50' : 'border-orange-100'}`}
                >
                  <span className={`text-base md:text-xl font-black uppercase tracking-tight truncate mr-2 ${isFirst ? 'text-blue-600' : 'text-orange-500'}`}>
                    {pred.label}
                  </span>
                  <span className={`text-base md:text-xl font-mono font-black shrink-0 ${isFirst ? 'text-blue-700' : 'text-orange-600'}`}>
                    {(pred.value * 100).toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View Logic */}
      <div className="overflow-x-auto no-scrollbar">
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
              return <div className="p-4 text-center text-rose-600 font-bold">Unknown Format</div>;
          }
        })()}
      </div>

      {/* Expand Button */}
      {shouldShowTabularExpand && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full cursor-pointer mt-4 py-3 md:py-4 flex items-center justify-center gap-2 text-[10px] md:text-xs font-black text-indigo-700 bg-indigo-50 rounded-xl border-2 border-indigo-100 hover:bg-indigo-100 transition-all"
        >
          {isExpanded ? (
            <><span className="uppercase tracking-widest">Show Less</span> <ChevronUp size={14} strokeWidth={3} /></>
          ) : (
            <><span className="uppercase tracking-widest">View All {featureList.length} Features</span> <ChevronDown size={14} strokeWidth={3} /></>
          )}
        </button>
      )}
      
      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex items-start sm:items-center justify-center gap-2">
        <div className="h-1 w-1 bg-slate-300 rounded-full mt-1.5 sm:mt-0" />
        <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-relaxed">
          LIME approximates the model locally for this specific instance
        </span>
        <div className="h-1 w-1 bg-slate-300 rounded-full mt-1.5 sm:mt-0" />
      </div>
    </div>
  );
}