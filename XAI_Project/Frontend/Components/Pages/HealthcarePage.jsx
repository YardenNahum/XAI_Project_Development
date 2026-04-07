import React, { useState } from 'react';
import { Activity, Beaker, Database, Maximize2, Minimize2, Minus, Square } from 'lucide-react';
import PredictionSummary from '../UI/PredictionSummary.jsx';
import ShapCard from '../UI/Shap/ShapCard.jsx';
import FeatureCard from '../UI/FeatureCard.jsx';
import LimeCard from '../UI/Lime/LimeCard.jsx';
import DiceCard from '../UI/Dice/DiceCard.jsx';
import { fetchReport } from '../../Services/Reports_Service.jsx';

/**
 * HealthcarePage - Diabetes Risk Prediction
 */
export default function HealthcarePage() {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  
  // State for the Qualtrics Panel size: 'default' | 'maximized' | 'minimized'
  const [surveyMode, setSurveyMode] = useState('default');

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
        changes: [{ label: "Fasting Glucose", oldValue: "160 mg/dL", newValue: "115 mg/dL" }]
      },
      {
        outcome: "Low Risk",
        probability: "28%",
        changes: [
          { label: "Fasting Glucose", oldValue: "160", newValue: "110" },
          { label: "BMI", oldValue: "32.4", newValue: "28.0" }
        ]
      }
    ]
  };

  const visibleFeatures = showAllFeatures 
    ? healthcareData.features 
    : healthcareData.features.slice(0, 4);

  // Clean, predictable classes for each state
  const getPanelStyles = () => {
    if (surveyMode === 'maximized') {
      return "fixed inset-2 md:inset-8 z-[60] shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-300 rounded-2xl flex flex-col bg-slate-900";
    }
    if (surveyMode === 'minimized') {
      // Hides the iframe and just shows the header bar at the bottom right
      return "fixed bottom-0 right-4 md:right-8 w-72 h-[48px] overflow-hidden z-[60] shadow-2xl transition-all duration-300 rounded-t-xl flex flex-col bg-slate-900";
    }
    // Default Sticky Sidebar
    return "w-full lg:w-[450px] xl:w-[500px] h-[600px] lg:h-[85vh] lg:sticky lg:top-6 mt-6 lg:mt-0 shadow-xl transition-all duration-300 rounded-3xl flex flex-col bg-slate-900 z-10 shrink-0";
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 p-4 lg:p-6 relative">
      
      {/* Dark background overlay for maximized mode */}
      {surveyMode === 'maximized' && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity" 
          onClick={() => setSurveyMode('default')}
        />
      )}

      {/* LEFT COLUMN: AI Prediction & Explanations */}
      <div className="flex-1 space-y-6 pb-10 min-w-0">
        
        <PredictionSummary 
          title={healthcareData.title}
          description={healthcareData.description}
          predictionValue={healthcareData.prediction}
          confidence={healthcareData.confidence}
          colorClass={healthcareData.colorClass}
          icon={Activity}
        />

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
              className="w-full mt-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              {showAllFeatures ? 'Show Less' : `View All ${healthcareData.features.length} Features`}
            </button>
          )}
        </div>

        <ShapCard data={healthcareData.shapData} />
        <LimeCard data={healthcareData.limeData} />
        <DiceCard scenarios={healthcareData.diceData} />
      </div>

      {/* RIGHT COLUMN: Qualtrics Panel */}
      <div className={getPanelStyles()}>
        <div className="flex-1 flex flex-col overflow-hidden h-full border border-slate-700 rounded-inherit">
          
          {/* Header & Controls */}
          <div 
            className={`h-[48px] p-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between shrink-0 ${surveyMode === 'minimized' ? 'cursor-pointer hover:bg-slate-700' : ''}`}
            onClick={() => surveyMode === 'minimized' && setSurveyMode('default')}
          >
            <div className="flex items-center gap-2 px-1">
              <Beaker size={16} className="text-indigo-400" />
              <span className="text-xs font-black text-white tracking-wider uppercase truncate">
                Qualtrics Survey
              </span>
            </div>
            
            {/* Window Controls */}
            <div className="flex items-center gap-1">
              {surveyMode !== 'minimized' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setSurveyMode('minimized'); }}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-600 rounded transition-colors"
                  title="Minimize"
                >
                  <Minus size={16} />
                </button>
              )}
              {surveyMode !== 'maximized' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setSurveyMode('maximized'); }}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-600 rounded transition-colors hidden md:block"
                  title="Maximize"
                >
                  <Square size={14} />
                </button>
              )}
              {surveyMode !== 'default' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setSurveyMode('default'); }}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-600 rounded transition-colors"
                  title="Restore Default"
                >
                  <Minimize2 size={16} />
                </button>
              )}
            </div>
          </div>
          
          {/* Iframe Body */}
          <div className="bg-slate-50 flex-1 flex flex-col p-4 overflow-hidden relative">
            
            <div className="flex-1 rounded-xl border border-slate-200 overflow-hidden relative bg-white shadow-inner">
              
              {/* REMINDER: Paste your real link here. Leaving it as about:blank prevents the 404 error */}
              <iframe 
                src="about:blank" 
                title="Qualtrics Questionnaire"
                className="absolute inset-0 w-full h-full border-0 z-10 bg-white"
                allowFullScreen
              />
              
              {/* Placeholder text visible when iframe is empty */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
                <Beaker size={32} className="text-slate-300 mb-2" />
                <span className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-1">Waiting for URL</span>
                <span className="text-slate-400 text-xs">Update the iframe 'src' to your Qualtrics link.</span>
              </div>

            </div>

            {/* Bottom Section */}
            <div className="shrink-0 pt-4 pb-1">
              <button className="w-full bg-indigo-600 text-white text-sm font-black py-3.5 rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-[0.98]">
                Simulate Submit
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}