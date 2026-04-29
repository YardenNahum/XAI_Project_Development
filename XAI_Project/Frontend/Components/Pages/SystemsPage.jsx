import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, X, Brain, Zap, Target } from 'lucide-react';
import ShapCard from '../UI/Shap/ShapCard.jsx';
import LimeCard from '../UI/Lime/LimeCard.jsx';
import DiceCard from '../UI/Dice/DiceCard.jsx';
import { fetchReport } from '../../Services/Reports_Service.jsx'; 
import StudySteps from '../UI/StudySteps.jsx';
// Mapping for initial predictions based on domain
const predictionMap = { 'Diabities_System': 1, 'HR_Report': 4, 'LLM_Report': 1000 };

/**
 * 
 * Renders the domain-specific page showing the AI prediction, input data, and explanations (SHAP, LIME, DiCE).
 * Fetches the report data on mount and processes it for display. Also includes a help sidebar that can be toggled.
 * @returns 
 */
export default function DomainPage() {
  // Get the domain ID from the URL parameters
  const { domainId } = useParams();
  // State for the processed report data, loading state, and help sidebar visibility
  const [processedReport, setProcessedReport] = useState(null);
  // State to track if the report data is still loading
  const [isLoading, setIsLoading] = useState(true);
  // State to control whether to show all input data or just a subset
  const [showAll, setShowAll] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Fetch and process the report data when the component mounts or when the domainId changes
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch the report data for the given domain ID and initial prediction
        const data = await fetchReport(domainId, predictionMap[domainId] || 0);
        if (isMounted && data) {
          const isHigh = String(data.Prediction.prediction).includes("1") || 
                        ["diabetic", "leave", "high", "ai"].some(w => String(data.Prediction.prediction).toLowerCase().includes(w));
          // Prioritize certain features for display based on the domain
          let evidence = data.Original_Data;
          const priorityMap = {
            'Diabities_System': ['age', 'bmi', 'glucose fasting', 'glucose postprandial', 'hba1c'],
            'HR_Report': ['overtime', 'monthlyincome', 'joblevel', 'department','educationfield']
          };

          // Sort evidence based on priority list, placing prioritized features first
          const priority = priorityMap[domainId] || [];
          evidence = [...data.Original_Data].sort((a, b) => {
            const aIndex = priority.indexOf(a.feature.toLowerCase());
            const bIndex = priority.indexOf(b.feature.toLowerCase());
            return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
          });
          
          setProcessedReport({ ...data, isHigh, evidence });
        }
      } catch (err) { console.error(err); } 
      finally { if (isMounted) setIsLoading(false); }
    };
    loadData();
    return () => { isMounted = false; };
  }, [domainId]);
 // Helper function to format values
  const formatValue = (val, forceFull = false) => {
    if (typeof val !== 'string') return String(val);
    if (domainId === 'LLM_Report' && !forceFull) {
      const index = val.indexOf('.', 180);
      return index !== -1 ? val.substring(0, index + 1) : val.substring(0, 220) + "...";
    }
    return val;
  };
  // Show loading spinner while data is being fetched
  if (isLoading || !processedReport) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-500 w-10 h-10" /></div>;
  // Determine which input data to show based on the showAll state
  const visibleData = showAll ? processedReport.evidence : processedReport.evidence.slice(0, 6);

  return (
    <div className="relative bg-slate-50 min-h-screen overflow-x-hidden">
      
      {/* Main Content*/}
      <div className={`transition-all duration-300 p-6 lg:p-12 ${isHelpOpen ? 'mr-[400px]' : 'mr-0'}`}>
          <div className="max-w-none mx-0 space-y-8 flex flex-col items-start">
          
          {/* Help Center Bar */}
          <div className="w-full">
            <StudySteps onHelpClick={() => setIsHelpOpen(!isHelpOpen)} />
          </div>
          
          {/* AI Prediction Card */}
          <div className="w-full bg-white border-2 border-slate-200 rounded-[3rem] p-10 lg:p-14 shadow-md space-y-10">
            <div className="flex items-center gap-8 border-b-2 border-slate-50 pb-8">
              <span className="text-3xl font-semibold text-slate-900 tracking-tight">AI Prediction:</span>
              <span className={`px-10 py-3 rounded-[1.5rem] border-[4px] font-black text-3xl uppercase tracking-tighter shadow-xl ${
                processedReport.isHigh ? 'bg-rose-50 border-rose-300 text-rose-600' : 'bg-emerald-50 border-emerald-300 text-emerald-600'
              }`}>
                {processedReport.Prediction.prediction}
              </span>
            </div>

            <div className="space-y-6">
              <span className="font-bold text-slate-600 uppercase tracking-[0.3em] text-xl block text-left">Input Data:</span>
              <div className="text-2xl md:text-2xl text-slate-900 leading-[1.6] font-medium p-10 bg-slate-50 rounded-[2.5rem] border-2 border-slate-200 text-left">
                {visibleData.map((item, i, arr) => (
                  <span key={i}>
                    {i === 0 ? "" : i === arr.length - 1 ? ", and " : ", "}
                    <span className="text-slate-800">{item.feature.replace(/_/g, ' ')}</span>
                    <span> is </span>
                    <strong className="font-black text-black underline underline-offset-8 decoration-slate-300">
                      {formatValue(String(item.value), showAll)}
                    </strong>
                  </span>
                ))}
                <span>.</span>
              </div>
              <div className="flex justify-start">
                <button onClick={() => setShowAll(!showAll)} className="text-sm cursor-pointer font-bold text-indigo-600 uppercase tracking-widest hover:underline">
                  {showAll ? "↑ Hide Data" : "↓ View All Data"}
                </button>
              </div>
            </div>
          </div>

          {/* Explanation Cards */}
          <div className="w-full space-y-8 pb-20">
            <ShapCard data={processedReport.explanations.shap} />
            <LimeCard data={processedReport.explanations.lime} />
            <DiceCard data={processedReport.explanations.dice} />
          </div>
        </div>
      </div>     
    </div>
  );
}