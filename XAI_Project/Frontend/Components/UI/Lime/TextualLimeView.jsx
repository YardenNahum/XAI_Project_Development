import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * TextualLimeView component for displaying LIME feature impacts in a textual format.
 * This component takes in a block of text and a list of features with their corresponding weights, and highlights the words in the text based on their impact on the model's prediction. Positive impacts are highlighted in orange, while negative impacts are highlighted in blue. The component also includes a header and a button to toggle between a truncated view and the full text for better readability on mobile devices.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.text - The block of text to analyze and display.
 * @param {Array} props.features - An array of feature objects, each containing a 'feature' name and a 'weight' value.
 * @returns {JSX.Element} A JSX element representing the textual view of LIME explanations.
 */
export default function TextualLimeView({ text, features }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to determine how much of the text to display based on the isExpanded state. It truncates the text at a certain point for better readability on mobile devices, while allowing users to expand and see the full text if desired.
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
    <div className="space-y-4 md:space-y-6 text-left">
      {/* HEADER LABEL */}
      <div className="flex items-center gap-3 px-1 mb-2">
        <span className="text-sm md:text-xl font-black text-slate-400 uppercase tracking-[0.15em] md:tracking-[0.2em]">
          Text Analysis
        </span>
        <div className="h-[1px] md:h-[2px] flex-1 bg-slate-100" />
      </div>

      {/* ANALYSIS CONTENT */}
      <div className="w-full p-5 md:p-10 bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
        <div className="leading-relaxed md:leading-[2.2] text-slate-900 text-lg md:text-2xl font-medium tracking-tight">
          {words.map((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
            const impact = features.find(f => f.feature.toLowerCase() === cleanWord);

            if (impact) {
              const isPositive = impact.weight > 0;
              return (
                <span 
                  key={index} 
                  className={`inline px-1 rounded md:px-1.5 md:rounded-md mx-0.5 font-black transition-colors border-b md:border-b-2
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

        {/* EXPAND BUTTON */}
        {isLongText && (
          <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-slate-200">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex w-full md:w-auto cursor-pointer items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest hover:text-black hover:border-black transition-all shadow-sm active:scale-95"
            >
              {isExpanded ? (
                <><span>Show Less</span> <ChevronUp size={14} md:size={16} strokeWidth={3} /></>
              ) : (
                <><span>Read Full Analysis</span> <ChevronDown size={14} md:size={16} strokeWidth={3} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}