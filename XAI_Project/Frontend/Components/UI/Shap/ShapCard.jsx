import React from 'react';
import { BarChart3 } from 'lucide-react';
import ShapBar from './ShapBar.jsx';

/**
 * A container card for SHAP (Feature Importance) explanations.
 */
export default function ShapCard({ data }) {
  // Find the maximum absolute impact to scale the bars correctly
  const maxImpact = Math.max(...data.map(item => Math.abs(item.impact)));

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <BarChart3 size={18} />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
          SHAP Breakdown
        </h3>
      </div>

      {/* Bars List */}
      <div className="space-y-5">
        {data.map((item, index) => (
          <ShapBar 
            key={index}
            label={item.label}
            impact={item.impact}
            maxValue={maxImpact}
            colorClass={item.colorClass || 'bg-red-500'}
          />
        ))}
      </div>

      
     {/* Toggle Button */}
          {data.length > 3 && (
            <button 
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="w-full mt-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all active:scale-95"
            >
              {showAllFeatures ? 'Show Less' : `View All ${data.length} Features`}
            </button>
          )}
    </div>
  );
}