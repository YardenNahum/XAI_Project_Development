import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, Brain, Zap, Target, X } from 'lucide-react';
/**
 * StudySteps is a React component that provides a user guide for the XAI methodology used in the study. 
 * It features a button that, when clicked, opens a sidebar containing explanations of the three XAI methods: SHAP (Global), LIME (Local), and DiCE (What-If). 
 * The sidebar includes a background overlay to focus attention on the content and can be closed by clicking outside the sidebar or on the close button.
 * @returns 
 */
export default function StudySteps() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const sidebarContent = (
    <>
      {/* Background Overlay*/}
      <div 
        className={`fixed inset-0 bg-slate-900/40 z-[9998] transition-opacity duration-300 ${
          isHelpOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsHelpOpen(false)}
      />

      {/* The Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white z-[9999] shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto
        w-full sm:w-[450px] 
        ${isHelpOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 md:p-12 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex flex-col text-left">
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tighter">System Guide</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">XAI Methodology</p>
          </div>
          <button 
            onClick={() => setIsHelpOpen(false)} 
            className="p-4 bg-slate-100 rounded-full active:bg-rose-500 active:text-white transition-all shadow-sm"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="p-6 md:p-12 space-y-12 text-left pb-32">
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-indigo-50 pb-2">
              <Brain size={24} className="text-indigo-600 shrink-0" />
              <h3 className="font-black text-xl uppercase tracking-tight text-black">SHAP (Global)</h3>
            </div>
            <p className="text-slate-800 text-[17px] leading-relaxed">
              Shows how much each specific feature contributes to the final prediction.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-orange-50 pb-2">
              <Zap size={24} className="text-orange-500 shrink-0" />
              <h3 className="font-black text-xl uppercase tracking-tight text-black">LIME (Local)</h3>
            </div>
            <p className="text-slate-800 text-[17px] leading-relaxed">
              Shows factors adding or removing weight toward the specific prediction.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-emerald-50 pb-2">
              <Target size={24} className="text-emerald-600 shrink-0" />
              <h3 className="font-black text-xl uppercase tracking-tight text-black">DiCE (What-If)</h3>
            </div>
            <p className="text-slate-800 text-[17px] leading-relaxed">
              Minimum changes needed to flip the AI's decision to the opposite result.
            </p>
          </section>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="flex justify-start">
        <button 
          onClick={() => setIsHelpOpen(true)}
          className="group flex items-center gap-2 px-5 py-3 bg-blue-50 border-2 border-blue-200 text-blue-700 rounded-xl cursor-pointer hover:bg-blue-100 transition-all active:scale-95 shadow-sm"
        >
          <HelpCircle size={18} />
          <div className="flex flex-col items-start text-left">
            <span className="text-[11px] font-black uppercase tracking-widest leading-tight">User Help</span>
            <span className="text-[9px] font-bold opacity-60 uppercase tracking-tight">Guide</span>
          </div>
        </button>
      </div>
      {/* Sidebar rendering with react portal to make it full screen in mobile*/}
      {createPortal(sidebarContent, document.body)}
    </>
  );
}