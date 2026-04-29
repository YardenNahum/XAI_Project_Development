import React, { useState } from 'react';
import { HelpCircle, Brain, Zap, Target, X } from 'lucide-react';

export default function StudySteps() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      {/* Resized Bluish Help Button */}
      <div className="flex justify-start">
        <button 
          onClick={() => setIsHelpOpen(true)}
          className="group flex items-center gap-3 px-7 py-4 bg-blue-50 border-2 border-blue-200 text-blue-700 rounded-2xl cursor-pointer hover:bg-blue-100 transition-all shadow-md active:scale-95"
        >
          <HelpCircle size={22} />
          <div className="flex flex-col items-start text-left">
            <span className="text-[13px] font-black uppercase tracking-widest leading-tight">User Help</span>
            <span className="text-[11px] font-bold opacity-70 uppercase tracking-tight">System Guide</span>
          </div>
        </button>
      </div>

      {/* Help Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-[450px] bg-white border-l-2 border-slate-200 shadow-2xl transition-transform duration-300 z-[100] p-12 overflow-y-auto ${isHelpOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter text-left">System Guide</h2>
          <button onClick={() => setIsHelpOpen(false)} className="p-2 cursor-pointer hover:bg-slate-100 rounded-full transition-all">
            <X size={28} className="text-black" />
          </button>
        </div>

        <div className="space-y-12 text-left">
          {/* SHAP Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3">
              <Brain size={24} className="text-indigo-600 shrink-0" />
              <h3 className="font-black text-2xl uppercase tracking-tight text-black text-left">SHAP (Global)</h3>
            </div>
            <div className="space-y-4 text-black text-[18px] leading-relaxed text-left">
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
            <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3">
              <Zap size={24} className="text-orange-500 shrink-0" />
              <h3 className="font-black text-2xl uppercase tracking-tight text-black text-left">LIME (Local)</h3>
            </div>
            <div className="space-y-4 text-black text-[18px] leading-relaxed text-left">
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
            <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3">
              <Target size={24} className="text-emerald-600 shrink-0" />
              <h3 className="font-black text-2xl uppercase tracking-tight text-black text-left">DiCE (What-If)</h3>
            </div>
            <div className="space-y-4 text-black text-[18px] leading-relaxed text-left">
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