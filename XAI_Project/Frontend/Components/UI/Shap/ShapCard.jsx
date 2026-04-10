import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import ShapBar from './ShapBar.jsx';

/**
 * A container card for SHAP (Feature Importance) explanations.
 * Handles internal sorting and probability display.
 */
export default function ShapCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || !data.feature_impacts) return null;

  // Map and Sort by impact
  const processedImpacts = data.feature_impacts
    .map(item => ({
      label: item.feature,
      impact: item.weight, // Raw weight preserved for sign display
      colorClass: item.weight > 0 ? 'bg-orange-500' : 'bg-blue-500'
    }))
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  // Max absolute value for bar width calculation
  const maxImpactValue = Math.max(...processedImpacts.map(item => Math.abs(item.impact)));

  // Determine which features to show if not expnaded view
  const displayedImpacts = isExpanded ? processedImpacts : processedImpacts.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      
      {/* Header with Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
          <BarChart3 size={14} />
          <span>Feature Importance (SHAP)</span>
        </div>
        
        {/* Technical Stats: Base Value vs Final Prediction Probability */}
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Base</p>
            <p className="text-xs font-mono font-bold text-slate-600">
              {data.base_value?.toFixed(4)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Prob.</p>
            <p className="text-xs font-mono font-bold text-indigo-600">
              {(data.prediction_probability * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-4">
        SHAP Breakdown
      </h3>

      {/* Sorted Bars List */}
      <div className="space-y-5">
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

      {/* Toggle View More Button */}
      {processedImpacts.length > 4 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full cursor-pointer mt-6 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all active:scale-95"
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