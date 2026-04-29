import React, { useState } from 'react';
import { HelpCircle, Brain, Zap, Target, X } from 'lucide-react';
/**
 * StudySteps component that provides an overview of the different explanation methods (SHAP, LIME, DiCE) 
 * used in the study, along with a help guide that explains how to interpret each type of explanation.
 * @returns 
 */
export default function StudySteps() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  // Mapping for the guide icons and colors
  const guides = [
    { id: 1, label: "Global Impact (SHAP)", icon: <Brain size={14} />, color: "text-indigo-700", bg: "bg-indigo-600" },
    { id: 2, label: "Local Reasoning (LIME)", icon: <Zap size={14} />, color: "text-orange-700", bg: "bg-orange-500" },
    { id: 3, label: "What-If Analysis (DiCE)", icon: <Target size={14} />, color: "text-emerald-700", bg: "bg-emerald-600" }
  ];

  return (
    <>
    {/* Header with Guide and Help Button */}
      <nav className="w-full bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] shadow-sm text-left">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-10">
            {guides.map((guide) => (
              <div key={guide.id} className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl shadow-sm ${guide.bg} text-white shrink-0`}>
                  {guide.icon}
                </div>
                <span className={`text-sm font-black uppercase tracking-wider ${guide.color}`}>
                  {guide.label}
                </span>
              </div>
            ))}
          </div>
          {/* Help Button */}
          <button 
            onClick={() => setIsHelpOpen(true)}
            className="group flex items-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-2xl cursor-pointer hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
          >
            <HelpCircle size={24} />
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-black uppercase tracking-[0.2em]">Open System</span>
              <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Help Guide</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Help Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-[450px] bg-white border-l-2 border-slate-200 shadow-2xl transition-transform duration-300 z-[100] p-12 overflow-y-auto ${isHelpOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter">System Guide</h2>
          <button onClick={() => setIsHelpOpen(false)} className="p-2 cursor-pointer hover:bg-slate-100 rounded-full transition-all">
            <X size={28} className="text-black" />
          </button>
        </div>

        <div className="space-y-12 text-left">
          {/* SHAP Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <Brain size={24} className="text-indigo-600 shrink-0" />
              <h3 className="font-black text-2xl uppercase tracking-tight text-black">SHAP (Global)</h3>
            </div>
            <div className="space-y-4 text-black text-[18px] leading-relaxed">
              <p className="font-bold">
                The SHAP chart shows how much each specific patient feature contributes to the final prediction.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-2.5 w-2 h-2 rounded-full bg-black shrink-0" />
                  <span>Features are ranked by total impact.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2.5 w-2 h-2 rounded-full bg-black shrink-0" />
                  <span>The length of the bar shows the feature's influence.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2.5 w-2 h-2 rounded-full bg-black shrink-0" />
                  <span>The value (+/-) next to each bar shows the exact contribution for this specific case.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* LIME Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <Zap size={24} className="text-orange-500 shrink-0" />
              <h3 className="font-black text-2xl uppercase tracking-tight text-black">LIME (Local)</h3>
            </div>
            <div className="space-y-4 text-black text-[18px] leading-relaxed">
              <p className="font-bold">
                LIME shows exactly which feature of the information influenced this specific outcome the most.
              </p>
              <p>
                Each feature is given a score: some add weight pushing toward the final decision, while others remove weight from it. This allows you to see exactly why the AI made this specific prediction.
              </p>
            </div>
          </section>

          {/* DiCE Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <Target size={24} className="text-emerald-600 shrink-0" />
              <h3 className="font-black text-2xl uppercase tracking-tight text-black">DiCE (What-If)</h3>
            </div>
            <div className="space-y-4 text-black text-[18px] leading-relaxed">
              <p className="font-bold">
                The DiCE table explains the AI's decision by providing "what-if" scenarios.
              </p>
              <p>
                Instead of showing what caused the current prediction, it shows exactly what minimum changes to the data that would be needed to flip the AI's decision to the opposite outcome.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-20 py-10 border-t border-slate-200 text-black text-[12px] uppercase tracking-[0.2em] font-black text-center">
          End of Guide
        </div>
      </div>
    </>
  );
}