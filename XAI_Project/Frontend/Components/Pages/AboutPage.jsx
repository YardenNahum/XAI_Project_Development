import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BrainCircuit, 
  ArrowRight, 
  BarChart3, 
  SlidersHorizontal, 
  RefreshCw 
} from 'lucide-react';

import ExplanationCard from '../UI/ExplanationCard';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    /* Changed: Reduced top margin on mobile (mt-4 vs mt-8) and added more bottom clearance (pb-24) */
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-6 md:p-10 mt-4 md:mt-8 mb-24 lg:mb-12">
      
      {/* Icon header */}
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 md:mb-8">
        <BrainCircuit size={28} className="stroke-[2]" />
      </div>

      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
        Welcome to the XAI Evaluation Study
      </h1>

      <div className="space-y-6 text-slate-600 leading-relaxed text-[15px]">
        <p>
          Artificial Intelligence (AI) is everywhere today, helping us make decisions in healthcare, hiring, and more. 
          But sometimes, AI acts like a "black box"—it gives an answer, but doesn't tell us <em>why</em>.
        </p>

        <p>
          We are trying to fix that! In this study, we want to know what <strong>you</strong> think about how AI explains its decisions. 
          Here is what you'll do:
        </p>

        <ul className="list-disc pl-5 space-y-3 text-slate-700">
          <li><strong>Step 1:</strong> Review 3 different scenarios (Healthcare, HR, and AI Text Detection).</li>
          <li><strong>Step 2:</strong> See the AI's decision along with an explanation.</li>
          <li><strong>Step 3:</strong> Fill out a short survey for each scenario.</li>
        </ul>

        <p className="pt-2 font-medium text-slate-900">
          To help you, you will see three types of explanations:
        </p>

        {/* Explanation Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-2">
          <ExplanationCard 
            icon={BarChart3} 
            title="SHAP" 
            colorClass="text-indigo-600"
            description="Shows exactly how each factor contributed to the final conclusion."
          />
          
          <ExplanationCard 
            icon={SlidersHorizontal} 
            title="LIME" 
            colorClass="text-emerald-600"
            description="Breaks down the main reasons behind a specific decision."
          />
          
          <ExplanationCard 
            icon={RefreshCw} 
            title="DiCE" 
            colorClass="text-blue-600"
            description="Shows what would need to change to get a different result."
          />
        </div>
      </div>

      {/* Get Started Button - Changed: Full width on mobile for easier tapping */}
      <div className="mt-10 flex justify-end">
        <button 
          onClick={() => navigate('/diabetes')}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-100"
        >
          Get Started <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}