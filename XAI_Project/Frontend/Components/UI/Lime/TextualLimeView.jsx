import React, { useState } from 'react';

export default function TextualLimeView({ text, features, predictions }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Configuration for truncation
  const WORD_LIMIT = 45; 
  const words = text.split(' ');
  const isLongText = words.length > WORD_LIMIT;
  
  // Slice words if not expanded
  const displayWords = isExpanded || !isLongText 
    ? words 
    : words.slice(0, WORD_LIMIT);

  // Sort predictions for the header
  const sortedPredictions = predictions 
    ? Object.entries(predictions)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
    : [];

  return (
    <div className="space-y-6">
      
      {/* 1. PREDICTION HEADER (Matches Tabular Style) */}
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

      {/* 2. HIGHLIGHTED TEXT BLOCK */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1 mb-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Text Analysis
          </span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 leading-relaxed text-slate-800 font-medium">
          {displayWords.map((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
            const impact = features.find(f => f.feature.toLowerCase() === cleanWord);

            if (impact) {
              const isPositive = impact.weight > 0;
              return (
                <span 
                  key={index} 
                  className={`inline-block px-1 rounded-md mx-0.5 font-bold transition-colors
                    ${isPositive 
                      ? 'bg-orange-200 text-orange-900 border-b-2 border-orange-400' 
                      : 'bg-blue-200 text-blue-900 border-b-2 border-blue-400'}`}
                  title={`Weight: ${impact.weight.toFixed(3)}`}
                >
                  {word}
                </span>
              );
            }
            return <span key={index}>{word} </span>;
          })}

          {!isExpanded && isLongText && (
            <span className="text-slate-400 font-bold ml-1">...</span>
          )}

          {isLongText && (
            <div className="mt-4">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[10px] cursor-pointer font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm active:scale-95"
              >
                {isExpanded ? 'Minimize Text' : 'Read Full Text & Analysis'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}