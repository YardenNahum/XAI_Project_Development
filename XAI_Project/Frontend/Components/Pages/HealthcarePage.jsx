import React, { useState } from 'react'; // 1. Added useState
import { Activity, Beaker, Database } from 'lucide-react';
import PredictionSummary from '../UI/PredictionSummary.jsx';
import ShapCard from '../UI/Shap/ShapCard.jsx';
import FeatureCard from '../UI/FeatureCard.jsx';
import LimeCard from '../UI/Lime/LimeCard.jsx';
import DiceCard from '../UI/Dice/DiceCard.jsx';

/**
 * HealthcarePage - Diabetes Risk Prediction
 * Displays the AI's prediction, XAI breakdowns (SHAP, LIME, DiCE), and the Qualtrics survey.
 */
export default function HealthcarePage() {
  // 2. State for the Data Evaluated toggle
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const healthcareData = {
    title: "Diabetes Risk",
    description: "Predicting the likelihood of a patient developing Type 2 Diabetes based on electronic health records.",
    prediction: "High Risk",
    confidence: 78,
    colorClass: "text-red-600",
    features: [
      { label: 'Patient Age', value: '55 yrs' },
      { label: 'BMI', value: '32.4' },
      { label: 'Fasting Glucose', value: '160 mg/dL' },
      { label: 'Blood Pressure', value: '135/85' },
      { label: 'Insulin Level', value: '85 mIU/L' },
      { label: 'DPF', value: '0.627' },
      { label: 'Pregnancies', value: '2' },
      { label: 'Skin Thickness', value: '35 mm' }
    ],
    shapData: [
      { label: 'Fasting Glucose', impact: 0.38, colorClass: 'bg-red-500' },
      { label: 'BMI', impact: 0.25, colorClass: 'bg-red-400' },
      { label: 'Age', impact: 0.15, colorClass: 'bg-red-300' }, 
      
    ],
    limeData: [
      { percentage: '+32%', rule: 'Fasting Glucose > 125' },
      { percentage: '+18%', rule: 'BMI > 30.0' },
      { percentage: '+15%', rule: 'HbA1c > 6.5%' },
      { percentage: '+10%', rule: 'Age > 50' },
      { percentage: '+8%',  rule: 'Family History: Yes' }
    ],
    diceData: [
      {
        outcome: "Moderate Risk",
        probability: "45%",
        changes: [
          { label: "Fasting Glucose", oldValue: "160 mg/dL", newValue: "115 mg/dL" }
        ]
      },
      {
        outcome: "Low Risk",
        probability: "28%",
        changes: [
          { label: "Fasting Glucose", oldValue: "160", newValue: "110" },
          { label: "BMI", oldValue: "32.4", newValue: "28.0" }
        ]
      },
      {
        outcome: "Low Risk",
        probability: "15%",
        changes: [
          { label: "Fasting Glucose", oldValue: "160", newValue: "100" },
          { label: "BMI", oldValue: "32.4", newValue: "24.0" }
        ]
      }
    ]
  };

  // 3. Logic to slice the features list (Show 4 by default)
  const visibleFeatures = showAllFeatures 
    ? healthcareData.features 
    : healthcareData.features.slice(0, 4);

return (
    /* Removed global gap and replaced with responsive gap-6 only for desktop (lg:gap-6) */
    <div className="flex flex-col lg:flex-row lg:gap-6 p-4 lg:p-0">
      
      {/* LEFT COLUMN: AI Prediction & Explanations */}
      <div className="flex-1 space-y-6 pb-10">
        
        {/* 1. Prediction Summary */}
        <PredictionSummary 
          title={healthcareData.title}
          description={healthcareData.description}
          predictionValue={healthcareData.prediction}
          confidence={healthcareData.confidence}
          colorClass={healthcareData.colorClass}
          icon={Activity}
        />

        {/* 2. Data Evaluated Grid with Toggle */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider mb-4">
            <Database size={14} />
            <span>Data Evaluated</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {visibleFeatures.map((item, i) => (
              <FeatureCard key={i} label={item.label} value={item.value} />
            ))}
          </div>

          {healthcareData.features.length > 4 && (
            <button 
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="w-full mt-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all active:scale-95"
            >
              {showAllFeatures ? 'Show Less' : `View All ${healthcareData.features.length} Features`}
            </button>
          )}
        </div>

        {/* 3. SHAP Breakdown */}
        <ShapCard data={healthcareData.shapData} />

        {/* 4. LIME Local Rules */}
        <LimeCard data={healthcareData.limeData} />

        {/* 5. DiCE Counterfactuals */}
        <DiceCard scenarios={healthcareData.diceData} />
      </div>

      {/* RIGHT COLUMN: Qualtrics Survey */}
      {/* Removed the top gap by setting lg:top-0 and reducing mobile margin-top */}
      <div className="w-full lg:w-[420px] xl:w-[480px] lg:sticky lg:top-0 h-fit mt-4 lg:mt-0 pb-20 lg:pb-10">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
          
          <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-3">
            <Beaker size={18} className="text-indigo-400" />
            <span className="text-[10px] font-black text-white tracking-widest uppercase">
              Qualtrics Survey
            </span>
          </div>
          
          <div className="bg-white p-6 md:p-8">
            <div className="space-y-6 w-full">
              
              {/* Iframe Area: Slightly taller to ensure survey visibility */}
              <div className="h-[450px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center p-6">
                 <div className="text-slate-300 font-black text-lg uppercase tracking-widest opacity-40 text-center leading-tight">
                   [ Qualtrics Embed ]
                 </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-slate-400 font-bold text-center leading-relaxed uppercase tracking-tighter">
                  Review the AI data on the left before submitting.
                </p>
                
                <button className="w-full bg-indigo-600 text-white text-sm font-black py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95">
                  Simulate Submit
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}