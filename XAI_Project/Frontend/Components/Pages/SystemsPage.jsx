import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Activity, Database, Loader2, ArrowRight, CheckCircle } from 'lucide-react';

import PredictionSummary from '../UI/PredictionSummary.jsx';
import ShapCard from '../UI/Shap/ShapCard.jsx';
import FeatureCard from '../UI/FeatureCard.jsx';
import LimeCard from '../UI/Lime/LimeCard.jsx';
import DiceCard from '../UI/Dice/DiceCard.jsx';
import SurveyFrame from '../UI/SurveyFrame.jsx'; 
import { fetchReport } from '../../Services/Reports_Service.jsx'; 

const SURVEY_MAP = {
  'Diabities_System': 'https://qualtricsxmbfqlkh8c3.qualtrics.com/jfe/form/SV_4UiCFgzpWp5HvGm',
  'HR_Report': 'https://qualtricsxmbfqlkh8c3.qualtrics.com/jfe/form/SV_cUw1SGokPthpwb4',
  'LLM_Report': 'https://qualtricsxmbfqlkh8c3.qualtrics.com/jfe/form/SV_6LoneqSZ6Vm0gFE'
};

export default function DomainPage({ domainOrder = ['Diabities_System', 'HR_Report', 'LLM_Report'], handleFinalSubmit }) {
  const { domainId } = useParams();
  const navigate = useNavigate();
  
  const [processedReport, setProcessedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingAllFeatures, setIsShowingAllFeatures] = useState(false);

  const currentIndex = domainOrder.indexOf(domainId);
  const nextDomain = domainOrder[currentIndex + 1];
  const isLastDomain = currentIndex === domainOrder.length - 1;
  const currentSurveyUrl = SURVEY_MAP[domainId] || SURVEY_MAP['Diabities_System'];

  useEffect(() => {
    let isMounted = true;
    const loadDomainData = async () => {
      setIsLoading(true);
      setIsShowingAllFeatures(false);
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
        if (isMounted) setProcessedReport(finalUiData);
      } catch (err) { console.error(err); } 
      finally { if (isMounted) setIsLoading(false); }
    };
    loadDomainData();
    return () => { isMounted = false; };
  }, [domainId]);

  const handleNextStep = () => {
    if (isLastDomain) {
      handleFinalSubmit();
    } else {
      navigate(`/${nextDomain}`);
      window.scrollTo(0, 0);
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-500 w-10 h-10" /></div>;

  // COMPACT BUTTON COMPONENT
  const NavigationButton = (
    <button 
      onClick={handleNextStep}
      className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black text-white uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-95 hover:brightness-110 ${
        isLastDomain ? 'bg-emerald-500' : 'bg-indigo-600'
      }`}
    >
      {isLastDomain ? "Finish" : "Next System"} 
      <ArrowRight size={14} />
    </button>
  );

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 p-4 lg:p-10 bg-slate-50 min-h-screen">
      
      <div className="flex-1 space-y-6 min-w-0 pb-10">
        <PredictionSummary title={processedReport.displayTitle} description={processedReport.displayDescription} predictionValue={processedReport.predictionText} icon={Activity} />
        
        {/* Profile Data Evaluated SECTION WITH VIEW MORE BUTTON */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">
            <Database size={14} />
            <span>Profile Data Evaluated</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(isShowingAllFeatures ? processedReport.inputFeatures : processedReport.inputFeatures.slice(0, 4)).map((item, i) => (
              <FeatureCard key={i} label={item.label} value={item.value} />
            ))}
          </div>
          {processedReport.inputFeatures.length > 4 && (
            <button 
              onClick={() => setIsShowingAllFeatures(!isShowingAllFeatures)} 
              className="w-full mt-4 py-3 text-xs font-black text-indigo-600 bg-indigo-50/50 rounded-xl hover:bg-indigo-100 transition-all active:scale-95"
            >
              {isShowingAllFeatures ? 'Collapse' : `View All ${processedReport.inputFeatures.length} Data Points`}
            </button>
          )}
        </div>

        <ShapCard data={processedReport.shap} />
        <LimeCard data={processedReport.lime} />
        <DiceCard data={processedReport.dice} />
      </div>

      {/* Desktop Sticky Survey */}
      <div className="hidden lg:block w-[450px] xl:w-[500px] shrink-0 sticky top-10 h-[calc(100vh-80px)]">
        <SurveyFrame url={currentSurveyUrl} domainId={domainId} isMobile={false} navButton={NavigationButton} />
      </div>

      {/* Mobile Survey Drawer */}
      <div className="lg:hidden">
        <SurveyFrame url={currentSurveyUrl} domainId={domainId} isMobile={true} navButton={NavigationButton} />
      </div>
    </div>
  );
}