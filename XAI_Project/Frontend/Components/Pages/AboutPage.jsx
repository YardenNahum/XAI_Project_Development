import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BrainCircuit, 
  ArrowRight, 
  BarChart3, 
  SlidersHorizontal, 
  RefreshCw,
  MousePointer2,
  Lightbulb
} from 'lucide-react';

import ExplanationCard from '../UI/ExplanationCard';

export default function AboutPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/healthcare');
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-16 mt-6 md:mt-10 mb-24 lg:mb-12 border border-slate-50">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12 text-center md:text-left">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <BrainCircuit size={42} />
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            Explainable AI
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-16">
        
        {/* Project Explanation Text */}
        <section className="max-w-4xl space-y-8 text-slate-700 text-xl md:text-2xl leading-relaxed">
          <p>
            This system presents our final project about <strong>Explainable Artificial Intelligence (XAI)</strong>.
            The goal of the project is to show how AI models make predictions and how explanation methods can help users understand those predictions.
          </p>

          <p>
            Instead of showing only a final AI answer, the system displays the prediction together with explanations that describe which factors influenced the result.
            This makes the AI decision more transparent, understandable, and easier to trust.
          </p>
        </section>

        {/* Project Domains */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What does the project include?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Healthcare Analysis</h3>
              <p className="text-slate-600 text-lg">Evaluating patient health indicators to accurately detect diabetes.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-3 text-slate-900">HR Analysis</h3>
              <p className="text-slate-600 text-lg">Understanding the drivers behind employee turnover and retention.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Text Analysis</h3>
              <p className="text-slate-600 text-lg">Predicting if a text was human-authored or AI-generated.</p>
            </div>
          </div>
        </section>

        {/* How To Use */}
        <section>
          <h2 className="text-4xl font-bold text-slate-900 mb-10 flex items-center gap-3">
            How to use the system
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="relative p-10 bg-indigo-50/40 rounded-3xl border border-indigo-100">
              <span className="absolute -top-3 -left-3 w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">1</span>
              <div className="text-indigo-900 font-bold text-2xl mb-3 mt-1">Select Domain</div>
              <p className="text-slate-600 text-xl leading-relaxed">Choose a dataset and a specific case to analyze.</p>
            </div>

            <div className="relative p-10 bg-emerald-50/40 rounded-3xl border border-emerald-100">
              <span className="absolute -top-3 -left-3 w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">2</span>
              <div className="text-emerald-900 font-bold text-2xl mb-3 mt-1">View Prediction</div>
              <p className="text-slate-600 text-xl leading-relaxed">See the AI's final answer and the input variables.</p>
            </div>

            <div className="relative p-10 bg-blue-50/40 rounded-3xl border border-blue-100">
              <span className="absolute -top-3 -left-3 w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">3</span>
              <div className="text-blue-900 font-bold text-2xl mb-3 mt-1">Explore Logic</div>
              <p className="text-slate-600 text-xl leading-relaxed">Toggle between XAI methods to reveal the reasoning.</p>
            </div>
          </div>
        </section>

        {/* XAI Methods - With Bold First Paragraphs */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            Explanation Methods
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* SHAP */}
            <ExplanationCard 
              className="p-8 hover:shadow-2xl transition-all border border-slate-100"
              icon={BarChart3} 
              title={<span className="text-3xl font-bold">SHAP</span>}
              colorClass="text-indigo-600"
              description={
                <div className="text-lg mt-3 text-slate-600 space-y-3 text-left">
                  <p className="font-bold text-slate-800">The SHAP chart shows how much each specific employee feature contributes to the final prediction.</p>
                  <ul className="list-disc list-inside space-y-1 ml-1 leading-relaxed">
                    <li>Features are ranked by total impact.</li>
                    <li>The length of the bar shows the influence.</li>
                    <li>The value (+/-) shows the exact contribution.</li>
                  </ul>
                </div>
              }
            />
            
            {/* LIME */}
            <ExplanationCard 
              className="p-8 hover:shadow-2xl transition-all border border-slate-100"
              icon={SlidersHorizontal} 
              title={<span className="text-3xl font-bold">LIME</span>}
              colorClass="text-emerald-600"
              description={
                <div className="text-lg mt-3 text-slate-600 leading-relaxed text-left space-y-3">
                  <p className="font-bold text-slate-800">LIME shows exactly which feature of the information influenced this specific outcome the most.</p>
                  <p>Each feature is given a score, some add weight pushing toward the final decision, while others remove weight from it. This allows you to see exactly why the AI made this specific prediction.</p>
                </div>
              }
            />
            
            {/* DiCE */}
            <ExplanationCard 
              className="p-8 hover:shadow-2xl transition-all border border-slate-100"
              icon={RefreshCw} 
              title={<span className="text-3xl font-bold">DiCE</span>}
              colorClass="text-blue-600"
              description={
                <div className="text-lg mt-3 text-slate-600 leading-relaxed text-left space-y-3">
                  <p className="font-bold text-slate-800">The DiCE table explains the AI's decision by providing "what-if" scenarios.</p>
                  <p>Instead of showing what caused the current prediction, it shows exactly what minimum changes to the data that would be needed to flip the AI's decision to the opposite outcome.</p>
                </div>
              }
            />

          </div>
        </section>

      </div>

      {/* CTA Button */}
      <div className="mt-20 flex flex-col items-center gap-4">
        <button 
          onClick={handleStart}
          className="group w-full md:w-auto bg-slate-900 hover:bg-indigo-600 text-white text-2xl font-bold py-6 px-16 rounded-2xl flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl shadow-indigo-100 cursor-pointer"
        >
          Start Analysis <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}