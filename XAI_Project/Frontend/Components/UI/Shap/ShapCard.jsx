import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import ShapBar from './ShapBar.jsx';

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
    <div className="bg-white rounded-[2rem] border-2 border-slate-200 p-8 lg:p-10 shadow-md">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 text-slate-500 font-black text-sm uppercase tracking-[0.2em]">
          <BarChart3 size={20} strokeWidth={3} />
          <span>Feature Importance</span>
        </div>
        
        {/* Technical Stats - Increased font sizes */}
        <div className="flex gap-6">
          <div className="text-right">
            <p className="text-2xl text-slate-400 font-black uppercase tracking-widest">Base</p>
            <p className="text-2xl font-mono font-black text-slate-700">
              {data.base_value?.toFixed(4)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl text-slate-400 font-black uppercase tracking-widest">Prob.</p>
            <p className="text-2xl font-mono font-black text-indigo-700">
              {(data.prediction_probability * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-8">
        SHAP Breakdown
      </h3>

      <div className="space-y-8">
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
          className="w-full cursor-pointer mt-10 py-4 text-sm font-black text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 border-2 border-indigo-100 transition-all active:scale-[0.98] uppercase tracking-widest"
        >
          {isExpanded 
            ? 'Show Less' 
            : `View All ${processedImpacts.length} Feature Impacts`
          }
        </button>
      )}
    </div>
  );
}