import React from 'react';
import { ChevronRight, Eye, Search, ClipboardCheck } from 'lucide-react';

export default function StudySteps() {
  const steps = [
    { id: 1, label: "Review AI Prediction", icon: <Eye size={14} />, color: "text-indigo-700", bg: "bg-indigo-600" },
    { id: 2, label: "Analyze Explanations", icon: <Search size={14} />, color: "text-orange-700", bg: "bg-orange-500" },
    { id: 3, label: "Complete Evaluation", icon: <ClipboardCheck size={14} />, color: "text-emerald-700", bg: "bg-emerald-600" }
  ];

  return (
    <nav className="w-full bg-white border-b border-slate-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-start gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              {/* Icon Box */}
              <div className={`flex items-center justify-center w-7 h-7 rounded-lg shadow-sm ${step.bg} text-white shrink-0`}>
                {step.icon}
              </div>
              
              {/* Text Label */}
              <div className="flex flex-col">
                <span className={`text-[11px] font-bold tracking-tight whitespace-nowrap ${step.color}`}>
                  {step.label}
                </span>
              </div>
            </div>

            {/* Separator */}
            {index < steps.length - 1 && (
              <ChevronRight size={14} className="text-slate-300 mx-1 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}