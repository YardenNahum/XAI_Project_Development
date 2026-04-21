import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function TextualLimeView({ text, features }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic to cut the text exactly like in the DomainPage formatValue helper
  const getDisplayText = (val, forceFull) => {
    if (typeof val !== 'string') return String(val);
    if (!forceFull) {
      const index = val.indexOf('.', 180); // Look for first period after 180 chars
      return index !== -1 ? val.substring(0, index + 1) : val.substring(0, 220) + "...";
    }
    return val;
  };

  const displayText = getDisplayText(text, isExpanded);
  const words = displayText.split(' ');
  const isLongText = text.length > 220;

  return (
    <div className="space-y-4">
      {/* HEADER LABEL */}
      <div className="flex items-center gap-3 px-1 mb-2">
        <span className="text-3xl font-black text-slate-400 uppercase tracking-[0.2em]">
          Text Analysis
        </span>
        <div className="h-[2px] flex-1 bg-slate-100" />
      </div>

      {/* ANALYSIS CONTENT */}
      <div className="p-8 bg-slate-50 rounded-2xl border-2 border-slate-100 leading-[1.6] text-slate-800 text-3xl font-medium">
        {words.map((word, index) => {
          const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
          const impact = features.find(f => f.feature.toLowerCase() === cleanWord);

          if (impact) {
            const isPositive = impact.weight > 0;
            return (
              <span 
                key={index} 
                className={`inline-block px-1.5 rounded-md mx-0.5 font-black transition-colors border-b-2
                  ${isPositive 
                    ? 'bg-orange-200 text-orange-900 border-orange-400' 
                    : 'bg-blue-200 text-blue-900 border-blue-400'}`}
              >
                {word}
              </span>
            );
          }
          return <span key={index}>{word} </span>;
        })}

        {/* EXPAND BUTTON - Integrated for screenshot workflow */}
        {isLongText && (
          <div className="mt-6">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-500 uppercase tracking-widest hover:text-black hover:border-slate-400 transition-all shadow-sm"
            >
              {isExpanded ? (
                <><span>Show Less</span> <ChevronUp size={14} strokeWidth={3} /></>
              ) : (
                <><span>Read Full Analysis</span> <ChevronDown size={14} strokeWidth={3} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}