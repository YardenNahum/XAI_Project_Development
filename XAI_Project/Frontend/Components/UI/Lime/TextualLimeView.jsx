import React from 'react';
import TextualLimeView from './TextualLimeView.jsx';
import TabularLimeView from './TabularLimeView.jsx';
export default function TextualLime({ rawText, features }) {
  // Split text into words/tokens
  const words = rawText.split(' ');

  return (
    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 leading-relaxed text-slate-800 font-medium">
      {words.map((word, index) => {
        // Clean word of punctuation for matching
        const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        
        // Find if this word is a "feature" in the LIME data
        const impact = features.find(f => f.feature.toLowerCase() === cleanWord);

        if (impact) {
          const isPositive = impact.weight > 0;
          return (
            <span 
              key={index} 
              className={`inline-block px-1 rounded-md mx-0.5 font-bold transition-colors
                ${isPositive ? 'bg-orange-200 text-orange-900 border-b-2 border-orange-400' : 'bg-blue-200 text-blue-900 border-b-2 border-blue-400'}`}
              title={`Weight: ${impact.weight}`}
            >
              {word}
            </span>
          );
        }

        return <span key={index}>{word} </span>;
      })}
    </div>
  );
}