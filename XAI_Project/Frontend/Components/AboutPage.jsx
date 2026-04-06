import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BrainCircuit, 
  ArrowRight, 
  BarChart3, 
  SlidersHorizontal, 
  RefreshCw 
} from 'lucide-react';
import ExplanationCard from './ExplanationCard';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-10 mt-8 mb-12">
      {/* Icon header */}
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-8">
        <BrainCircuit size={28} className="stroke-[2]" />
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Welcome to the XAI Evaluation Study
      </h1>

      <div className="space-y-6 text-slate-600 leading-relaxed text-[15px]">
        <p>
          Artificial Intelligence (AI) is everywhere today, helping us make decisions in healthcare, hiring, and more. 
          But sometimes, AI acts like a "black box", it gives an answer, but doesn't tell us <em>why</em>.
        </p>

        <p>
          We are trying to fix that! In this study, we want to know what <strong>you</strong> think about how AI explains its decisions. 
          You don't need any technical background to participate. Here is what you'll do:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li><strong>Step 1:</strong> You will review 3 different scenarios (Healthcare, HR, and AI Text Detection).</li>
          <li><strong>Step 2:</strong> In each scenario, you'll see an AI's decision along with an explanation of how it reached that conclusion.</li>
          <li><strong>Step 3:</strong> You will fill out a short survey for each scenario telling us if the explanation made sense and if you trust it.</li>
        </ul>

        <p>
          To help you make sense of the AI's decisions, you will see three simple types of explanations:
        </p>

        {/* Explanation Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <ExplanationCard 
            icon={BarChart3} 
            title="SHAP" 
            colorClass="text-indigo-600"
            description="Shows you exactly how each factor (like age or experience) contributed to the AI's final conclusion."
          />
          
          <ExplanationCard 
            icon={SlidersHorizontal} 
            title="LIME" 
            colorClass="text-emerald-600"
            description="Breaks down the AI's logic to show the main reasons behind a specific decision."
          />
          
          <ExplanationCard 
            icon={RefreshCw} 
            title="DiCE" 
            colorClass="text-blue-600"
            description="Shows what would need to change in the data to get a completely different result from the AI."
          />
        </div>
      </div>

      {/* Get Started Button - Aligned to the right */}
      <div className="mt-10 flex justify-end">
        <button 
          onClick={() => navigate('/diabetes')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          Get Started <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}