import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Activity, Database, Loader2, ArrowRight } from 'lucide-react';
import { useStudy } from '../StudyContext.jsx'; 
import PredictionSummary from '../UI/PredictionSummary.jsx';
import ShapCard from '../UI/Shap/ShapCard.jsx';
import FeatureCard from '../UI/FeatureCard.jsx';
import LimeCard from '../UI/Lime/LimeCard.jsx';
import DiceCard from '../UI/Dice/DiceCard.jsx';
import SurveyFrame from '../UI/SurveyFrame.jsx'; 
import { fetchReport } from '../../Services/Reports_Service.jsx'; 

// Map of domain IDs to their corresponding survey URLs
const SURVEY_MAP = {
  'Diabities_System': 'https://qualtricsxmbfqlkh8c3.qualtrics.com/jfe/form/SV_4UiCFgzpWp5HvGm',
  'HR_Report': 'https://qualtricsxmbfqlkh8c3.qualtrics.com/jfe/form/SV_cUw1SGokPthpwb4',
  'LLM_Report': 'https://qualtricsxmbfqlkh8c3.qualtrics.com/jfe/form/SV_6LoneqSZ6Vm0gFE'
};

export default function DomainPage() {
  // Get the domain ID from the URL parameters.
  const { domainId } = useParams();
  const navigate = useNavigate();
  // Access study context for domain order and survey completion tracking
  const { domainOrder, markAsComplete, completedSurveys } = useStudy();
  // state for report data
  const [processedReport, setProcessedReport] = useState(null);
  // state for loading and UI controls
  const [isLoading, setIsLoading] = useState(true);
  // state to control showing all features 
  const [isShowingAllFeatures, setIsShowingAllFeatures] = useState(false);
  // state to control the timed lock on the navigation button
  const [isUnlocked, setIsUnlocked] = useState(false);

  const currentSurveyUrl = SURVEY_MAP[domainId] || SURVEY_MAP['Diabities_System'];

  // 20-second move on Lock
  useEffect(() => {
    setIsUnlocked(false);
    const lockTimer = setTimeout(() => setIsUnlocked(true), 20000);
    return () => clearTimeout(lockTimer);
  }, [domainId]);

  // Data Fetching
  useEffect(() => {
    let isMounted = true;
    // Fetch the report data for the current domain and process it for UI display
    const loadDomainData = async () => {
      setIsLoading(true);
      const predictionId = (domainId === 'LLM_Report') ? '50' : '2';
      try {
        const firebaseRawData = await fetchReport(domainId, predictionId);
        const finalUiData = {
          displayTitle: `${domainId.split('_')[0].toUpperCase()} System`,
          displayDescription: (
            <span>
              {firebaseRawData.Prediction.description || "System Analysis Report."}<br/><br/>
              <strong className="text-slate-900 text-sm">Review the explanations and complete the survey.</strong>
            </span>
          ),
          predictionText: firebaseRawData.Prediction.prediction,
          inputFeatures: firebaseRawData.Original_Data.map(item => ({ label: item.feature, value: String(item.value) })),
          shap: firebaseRawData.explanations.shap,
          lime: firebaseRawData.explanations.lime, 
          dice: firebaseRawData.explanations.dice
        };
        // Only update state if the component is still mounted 
        if (isMounted) setProcessedReport(finalUiData);
      } catch (err) { console.error(err); } 
      finally { if (isMounted) setIsLoading(false); }
    };
    // Load the domain data when the component mounts or when the domainId changes
    loadDomainData();
    return () => { isMounted = false; };
  }, [domainId]);
  // Handler for when the user clicks the navigation button to proceed to the next step
  const handleNextStep = () => {
    markAsComplete(domainId);
    const updatedCompleted = new Set(completedSurveys);
    updatedCompleted.add(domainId);
    const nextUnfinished = domainOrder.find(id => !updatedCompleted.has(id));
    // Navigate to the next unfinished domain or to the final page if all are completed
    if (nextUnfinished) {
      navigate(`/${nextUnfinished}`);
      window.scrollTo(0, 0);
    } else {
      navigate('/thank-you');
    }
  };
// Show loading spinner while fetching data
  if (isLoading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-500 w-10 h-10" /></div>;
//checking if its the last survey to adjust the button text and style 
  const isLastTaskOverall = (completedSurveys.size + (completedSurveys.has(domainId) ? 0 : 1)) === domainOrder.length;
  
  // Compact Navigation Button
  const NavigationButton = (
    <button 
      onClick={handleNextStep}
      disabled={!isUnlocked}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
        !isUnlocked 
          ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300' 
          : isLastTaskOverall 
            ? 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 cursor-pointer shadow-sm' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 cursor-pointer shadow-sm'
      }`}
    >
      {!isUnlocked ? (
        "Complete The Survey"
      ) : isLastTaskOverall ? (
        <>Finished Study <ArrowRight size={14} /></>
      ) : (
        <>Completed Survey <ArrowRight size={14} /></>
      )}
    </button>
  );

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 p-4 lg:p-10 bg-slate-50 min-h-screen">
      <div className="flex-1 space-y-6 min-w-0 pb-10">
        <PredictionSummary title={processedReport.displayTitle} description={processedReport.displayDescription} predictionValue={processedReport.predictionText} icon={Activity} />
        
        {/* Profile Data Evaluated */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">
            <Database size={14} />
            <span>Prediction Data Evaluted By AI</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {(isShowingAllFeatures ? processedReport.inputFeatures : processedReport.inputFeatures.slice(0, 4)).map((item, i) => (
              <div key={i} className="flex-1 min-w-[280px] max-w-full">
                <FeatureCard label={item.label} value={item.value} />
              </div>
            ))}
          </div>
          {processedReport.inputFeatures.length > 4 && (
            <button 
              onClick={() => setIsShowingAllFeatures(!isShowingAllFeatures)} 
              className="w-full mt-6 py-3 text-xs font-black text-indigo-600 bg-indigo-50/50 rounded-xl border border-dashed border-indigo-200 cursor-pointer hover:bg-indigo-50 transition-colors"
            >
              {isShowingAllFeatures ? 'Collapse List' : `View All ${processedReport.inputFeatures.length} Data Points`}
            </button>
          )}
        </div>

        <ShapCard data={processedReport.shap} />
        <LimeCard data={processedReport.lime} />
        <DiceCard data={processedReport.dice} />
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block w-[450px] xl:w-[500px] shrink-0 sticky top-10 h-[calc(100vh-80px)]">
        <SurveyFrame url={currentSurveyUrl} domainId={domainId} isMobile={false} navButton={NavigationButton} />
      </div>

      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <SurveyFrame url={currentSurveyUrl} domainId={domainId} isMobile={true} navButton={NavigationButton} />
      </div>
    </div>
  );
}