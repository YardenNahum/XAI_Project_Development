import React, { useState } from 'react';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import ShapBar from './ShapBar.jsx';

/**
 * ShapCard is a React component that displays SHAP feature importance explanations in a card format.
 * It takes in SHAP explanation data, processes the feature impacts to determine their relative importance and color coding, 
 * and renders a card with a header, base value, prediction probability, and a list of feature impacts visualized as horizontal bars.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.data - The SHAP explanation data, which includes the base value, prediction probability, and an array of feature impacts with their corresponding weights.
 * @return {JSX.Element} A JSX element representing the SHAP explanation card with feature importance visualizations.
 */
export default function ShapCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || !data.feature_impacts) return null;

  const processedImpacts = data.feature_impacts
    .map(item => ({
      label: item.feature,
      impact: item.weight,
      colorClass: item.weight > 0 ? 'bg-orange-500' : 'bg-blue-500'
    }))
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  const maxImpactValue = Math.max(...processedImpacts.map(item => Math.abs(item.impact)));
  const displayedImpacts = isExpanded ? processedImpacts : processedImpacts.slice(0, 4);

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-200 p-5 md:p-8 lg:p-10 shadow-md overflow-hidden">
      
      {/*  Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-2 text-slate-500 font-black text-[10px] md:text-sm uppercase tracking-[0.2em]">
          <BarChart3 size={18} md:size={20} strokeWidth={3} className="shrink-0" />
          <span>Feature Importance</span>
        </div>
        
        {/* Technical Stats */}
        <div className="flex gap-4 md:gap-6 justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-50">
          <div className="text-left sm:text-right">
            <p className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-widest">Base</p>
            <p className="text-lg md:text-xl font-mono font-black text-slate-700 leading-none mt-1">
              {data.base_value?.toFixed(3)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-widest">Prob.</p>
            <p className="text-lg md:text-xl font-mono font-black text-indigo-700 leading-none mt-1">
              {(data.prediction_probability * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-6 md:mb-8 text-left">
        SHAP Breakdown
      </h3>

      {/* Bar Container */}
      <div className="space-y-6 md:space-y-8">
        {displayedImpacts.map((feature, index) => (
          <ShapBar 
            key={index}
            label={feature.label}
            impact={feature.impact}
            maxValue={maxImpactValue}
            colorClass={feature.colorClass}
          />
        ))}
      </div>

      {processedImpacts.length > 4 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full cursor-pointer mt-8 md:mt-10 py-3 md:py-4 flex items-center justify-center gap-2 text-[10px] md:text-sm font-black text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 border-2 border-indigo-100 transition-all active:scale-[0.98] uppercase tracking-widest"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp size={14} /></>
          ) : (
            <>View All {processedImpacts.length} Feature Impacts <ChevronDown size={14} /></>
          )}
        </button>
      )}
    </div>
  );
}