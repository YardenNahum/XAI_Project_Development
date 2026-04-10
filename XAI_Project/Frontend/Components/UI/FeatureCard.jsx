import React, { useState } from 'react';

export default function FeatureCard({ label, value }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // limit the text size to prevent overflow in the card, with option to expand and show full text
  const CHAR_LIMIT = 400;
  const isLongText = value?.length > CHAR_LIMIT;
// Slice the value if not expanded
  const displayValue = isExpanded || !isLongText 
    ? value 
    : value.substring(0, CHAR_LIMIT) + "...";

  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-md group h-full flex flex-col">
      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2 group-hover:text-indigo-500 transition-colors">
        {label}
      </div>
      
      <div className="text-sm font-medium text-slate-700 break-words leading-relaxed">
        {displayValue}
      </div>

      {isLongText && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 cursor-pointer text-[10px] font-black text-indigo-600 uppercase tracking-tighter hover:text-indigo-800 transition-colors w-fit"
        >
          {isExpanded ? 'Show Less' : 'Read Full Text'}
        </button>
      )}
    </div>
  );
}