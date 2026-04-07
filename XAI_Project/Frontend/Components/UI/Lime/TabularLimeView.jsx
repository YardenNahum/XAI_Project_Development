import React from 'react';

/**
 * TabularLimeView - Reverted to Clean White/Text-Color Style
 * Focuses on high readability and ordered feature lists.
 */
export default function TabularLimeView({ features, predictions }) {
  
  const sortedPredictions = predictions 
    ? Object.entries(predictions)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
    : [];

  return (
    <div className="space-y-8">
      
      {/* --- PREDICTION HEADER --- */}
      {sortedPredictions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Model Prediction
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedPredictions.map((pred, idx) => (
              <div 
                key={pred.label} 
                className={`p-4 rounded-2xl border flex justify-between items-center transition-all bg-white shadow-sm
                  ${idx === 0 
                    ? 'border-orange-200 ring-1 ring-orange-100' 
                    : 'border-blue-100 opacity-80'}`}
              >
                <span className={`text-xs font-black uppercase tracking-tight
                  ${idx === 0 ? 'text-orange-500' : 'text-blue-500'}`}>
                  {pred.label}
                </span>
                <span className={`text-2xl font-mono font-black
                  ${idx === 0 ? 'text-orange-600' : 'text-blue-600'}`}>
                  {(pred.value * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- FEATURE IMPACTS LIST --- */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1 mb-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Evidence for Prediction
          </span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        {features.map((item, index) => {
          const isPositive = item.weight > 0;
          return (
            <div 
              key={index} 
              className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group"
            >
              {/* Feature Name - Large and Bold */}
              <div className="flex-1 min-w-0">
                <span className="text-base font-bold text-slate-700 text-xs capitalize break-words">
                  {item.feature.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Weight Value - Colored text on clean background */}
              <div className="flex items-center gap-3 shrink-0">
                <div className={`px-3 py-1.5 rounded-lg font-mono text-sm font-black border
                  ${isPositive 
                    ? 'bg-orange-50 border-orange-100 text-orange-600' 
                    : 'bg-blue-50 border-blue-100 text-blue-600'}`}
                >
                  {isPositive ? `+${item.weight.toFixed(3)}` : item.weight.toFixed(3)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}