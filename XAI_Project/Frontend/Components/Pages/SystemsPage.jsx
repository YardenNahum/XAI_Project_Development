import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Activity, Database, Loader2, ArrowRight } from 'lucide-react';
import { useStudy } from '../StudyContext.jsx'; 
import ShapCard from '../UI/Shap/ShapCard.jsx';
import LimeCard from '../UI/Lime/LimeCard.jsx';
import DiceCard from '../UI/Dice/DiceCard.jsx';
import SurveyFrame from '../UI/SurveyFrame.jsx'; 
import { fetchReport } from '../../Services/Reports_Service.jsx'; 
import StudySteps from '../UI/StudySteps.jsx';

const SURVEY_MAP = {
  'Diabities_System': 'https://qualtricsxmbfqlkh8c3.qualtrics.com/jfe/form/SV_4UiCFgzpWp5HvGm',
  'HR_Report': 'https://qualtricsxmbfqlkh8c3.qualtrics.com/jfe/form/SV_cUw1SGokPthpwb4',
  'LLM_Report': 'https://qualtricsxmbfqlkh8c3.qualtrics.com/jfe/form/SV_6LoneqSZ6Vm0gFE'
};

const predictionMap = { 'Diabities_System': 1, 'HR_Report': 4, 'LLM_Report': 1000 };

export default function DomainPage() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const { domainOrder, markAsComplete, completedSurveys } = useStudy();
  const [processedReport, setProcessedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const currentSurveyUrl = SURVEY_MAP[domainId] || SURVEY_MAP['Diabities_System'];

  useEffect(() => {
    setIsUnlocked(false);
    const lockTimer = setTimeout(() => setIsUnlocked(true), 20000);
    return () => clearTimeout(lockTimer);
  }, [domainId]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchReport(domainId, predictionMap[domainId] || 0);
        if (isMounted && data) {
          const isHigh = String(data.Prediction.prediction).includes("1") || 
                         ["diabetic", "leave", "high", "ai"].some(w => String(data.Prediction.prediction).toLowerCase().includes(w));
          
          let evidence = data.Original_Data;
          const priorityMap = {
            'Diabities_System': ['age', 'bmi', 'glucose fasting', 'glucose postprandial', 'hba1c'],
            'HR_Report': ['overtime', 'monthlyincome', 'joblevel', 'department','educationfield']
          };

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

  const handleNextStep = () => {
    markAsComplete(domainId);
    const updatedCompleted = new Set(completedSurveys);
    updatedCompleted.add(domainId);
    const nextUnfinished = domainOrder.find(id => !updatedCompleted.has(id));
    if (nextUnfinished) {
      navigate(`/${nextUnfinished}`);
      window.scrollTo(0, 0);
    } else { navigate('/thank-you'); }
  };

  const formatValue = (val, forceFull = false) => {
    if (typeof val !== 'string') return String(val);
    if (domainId === 'LLM_Report' && !forceFull) {
      const index = val.indexOf('.', 180);
      return index !== -1 ? val.substring(0, index + 1) : val.substring(0, 220) + "...";
    }
    return val;
  };

  if (isLoading || !processedReport) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-500 w-10 h-10" /></div>;

  const isLastTaskOverall = (completedSurveys.size + (completedSurveys.has(domainId) ? 0 : 1)) === domainOrder.length;
  
  const NavigationButton = (
    <button 
      onClick={handleNextStep}
      disabled={!isUnlocked}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
        !isUnlocked ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed' : isLastTaskOverall ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'
      }`}
    >
      {!isUnlocked ? "Complete The Survey" : isLastTaskOverall ? <>Finished Study <ArrowRight size={14} /></> : <>Completed Survey <ArrowRight size={14} /></>}
    </button>
  );

  // Helper to determine the profile type
  const getProfileSubject = () => {
    if (domainId === 'Diabities_System') return "the patient";
    if (domainId === 'HR_Report') return "the employee";
    return "the document";
  };

  const visibleData = showAll ? processedReport.evidence : processedReport.evidence.slice(0, 6);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 p-4 lg:p-10 bg-slate-50 min-h-screen">
      <div className="flex-1 space-y-6 min-w-0 pb-10">
        <StudySteps />
        
        <div className="bg-white border-2 border-slate-200 rounded-[3rem] p-12 lg:p-16 shadow-md space-y-12">
          
          <div className="flex items-center gap-8 border-b-2 border-slate-50 pb-8">
            <span className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">Prediction:</span>
            <span className={`px-12 py-4 rounded-[2rem] border-[4px] font-black text-4xl md:text-6xl uppercase tracking-tighter shadow-xl ${
              processedReport.isHigh ? 'bg-rose-50 border-rose-300 text-rose-600' : 'bg-emerald-50 border-emerald-300 text-emerald-600'
            }`}>
              {processedReport.Prediction.prediction}
            </span>
          </div>

          <div className="space-y-6">
            <span className="font-bold text-slate-600 uppercase tracking-[0.3em] text-2xl block">Input Data:</span>
            
            <div className="text-3xl md:text-4xl text-slate-900 leading-[1.6] font-medium p-10 bg-slate-50 rounded-[2.5rem] border-2 border-slate-200">
              <span className="font-bold">The data of {getProfileSubject()}: </span>
              {visibleData.map((item, i, arr) => (
                <span key={i}>
                  {i === 0 ? "" : i === arr.length - 1 ? ", and " : ", "}
                  <span className="text-slate-800">{item.feature.replace(/_/g, ' ')}</span>
                  <span> is </span>
                  <strong className="font-black text-black underline decoration-slate-400 underline-offset-[8px]">
                    {formatValue(String(item.value), showAll)}
                  </strong>
                </span>
              ))}
              <span>.</span>
            </div>
          </div>

          <div className="flex justify-start">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 bg-white border-2 border-slate-200 rounded-2xl text-sm font-black text-slate-600 uppercase tracking-widest hover:border-black transition-all shadow-md active:scale-95"
            >
              {showAll ? "↑ Hide Profile Details" : `↓ View Full Data Profile`}
            </button>
          </div>
        </div>

        <ShapCard data={processedReport.explanations.shap} />
        <LimeCard data={processedReport.explanations.lime} />
        <DiceCard data={processedReport.explanations.dice} />
      </div>

      <div className="hidden lg:block w-[450px] xl:w-[500px] shrink-0 sticky top-10 h-[calc(100vh-80px)]">
        <SurveyFrame url={currentSurveyUrl} domainId={domainId} navButton={NavigationButton} />
      </div>
    </div>
  );
}