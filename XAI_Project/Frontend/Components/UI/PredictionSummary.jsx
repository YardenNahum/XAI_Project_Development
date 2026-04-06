import React from 'react';

/**
 * A reusable UI component that displays the AI's primary prediction.
 * Located in: Frontend/Components/UI/PredictionSummary.jsx
 * * Props:
 * - title: The name of the prediction (e.g., "Diabetes Risk")
 * - description: A short sentence about what is being predicted
 * - predictionValue: The text of the result (e.g., "High Risk")
 * - confidence: A number 0-100 for the percentage
 * - colorClass: Tailwind color for the prediction text (e.g., "text-red-600")
 * - icon: Lucide icon component for the domain
 */
export default function PredictionSummary({ 
  title, 
  description, 
  predictionValue, 
  confidence, 
  colorClass,
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
      <div className="w-full md:w-auto min-w-[200px] bg-white border-2 border-slate-50 rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Prediction
          </span>
          <span className={`text-xl font-black ${colorClass}`}>
            {predictionValue}
          </span>
          
          {/* Progress Bar Container */}
          <div className="w-full mt-3 space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
              <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden mr-3">
                <div 
                  className={`h-full transition-all duration-1000 ${colorClass.replace('text', 'bg')}`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span>{confidence}%</span>
            </div>
          </div>
        </div>
        
        {/* Subtle background decoration */}
        <div className={`absolute -right-4 -bottom-4 opacity-5 ${colorClass}`}>
          {Icon && <Icon size={80} />}
        </div>
      </div>
    </div>
  );
}