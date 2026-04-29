import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
/**
 * TextualLimeView component for displaying LIME feature impacts in a textual format.
 * This component takes in the original text and the list of features with their impacts, and highlights the words in the text based on their impact on the model's prediction.
 * Positive impacts are highlighted in orange, while negative impacts are highlighted in blue. 
 * If the text is too long, it shows a truncated version with an option to expand and read the full analysis.
 * @param {*} param0 
 * @returns 
 */
export default function TextualLimeView({ text, features }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic to cut the text
  const getDisplayText = (val, forceFull) => {
    if (typeof val !== 'string') return String(val);
    if (!forceFull) {
      const index = val.indexOf('.', 180); 
      return index !== -1 ? val.substring(0, index + 1) : val.substring(0, 220) + "...";
    }
    return val;
  };

  const displayText = getDisplayText(text, isExpanded);
  const words = displayText.split(' ');
  const isLongText = text.length > 220;

  return (
    <div className="space-y-6 text-left">
      {/* HEADER LABEL */}
      <div className="flex items-center gap-3 px-1 mb-2">
        <span className="text-xl font-black text-slate-400 uppercase tracking-[0.2em]">
          Text Analysis
        </span>
        <div className="h-[2px] flex-1 bg-slate-100" />
      </div>

      {/* ANALYSIS CONTENT */}
      <div className="w-full p-10 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
        <div className="leading-[2.2] text-slate-900 text-2xl font-medium tracking-tight">
          {words.map((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
            const impact = features.find(f => f.feature.toLowerCase() === cleanWord);

            if (impact) {
              const isPositive = impact.weight > 0;
              return (
                <span 
                  key={index} 
                  className={`inline px-1.5 rounded-md mx-0.5 font-black transition-colors border-b-2
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
        </div>

        {/* EXPAND BUTTON*/}
        {isLongText && (
          <div className="mt-10 pt-6 border-t border-slate-200">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest hover:text-black hover:border-black transition-all shadow-sm active:scale-95"
            >
              {isExpanded ? (
                <><span>Show Less</span> <ChevronUp size={16} strokeWidth={3} /></>
              ) : (
                <><span>Read Full Analysis</span> <ChevronDown size={16} strokeWidth={3} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}