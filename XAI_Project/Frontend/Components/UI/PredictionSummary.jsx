import React from 'react';

/**
 * PredictionSummary Component
 * Props:
 * - title: String - The title of the prediction
 * - description: String - A brief description of the prediction context
 * - predictionValue: String - The predicted outcome
 * - icon: An icon to visually represent the domain
 */
export default function PredictionSummary({ 
  title, 
  description, 
  predictionValue, 
  icon: Icon 
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
      
      {/* Left Side: Title & Description */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          {Icon && <Icon size={14} />}
          <span>{title}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
        <p className="text-slate-500 text-sm max-w-sm">
          {description}
        </p>
      </div>

      {/* Right Side: The Prediction Result */}
      <div className="w-full md:w-auto min-w-[200px] bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-inner relative overflow-hidden">
        <div className="flex flex-col items-end relative z-10">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Prediction
          </span>
          <span className="text-xl font-black text-slate-800 tracking-tight">
            {predictionValue}
          </span>
        </div>
        
        {/* Subtle background decoration */}
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-slate-900 z-0 pointer-events-none">
          {Icon && <Icon size={80} />}
        </div>
      </div>
    </div>
  );
}