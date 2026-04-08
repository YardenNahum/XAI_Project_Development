import React, { useState, useEffect } from 'react';
import { Beaker, Minus, Maximize2, X, Loader2, ChevronUp } from 'lucide-react';

export default function SurveyFrame({ url, domainId, isMobile = false, navButton }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [surveyMode, setSurveyMode] = useState('default');

  useEffect(() => {
    setIsLoaded(false);
  }, [url]);

  const getContainerStyles = () => {
    if (isMobile) {
      return `fixed bottom-0 left-0 right-0 z-[110] bg-slate-900 flex flex-col transition-all duration-500 ease-in-out shadow-[0_-10px_40px_rgba(0,0,0,0.4)] ${
        surveyMode === 'maximized' ? 'h-[100dvh]' : 'h-20 rounded-t-3xl'
      }`;
    }
    return "h-full w-full bg-slate-900 rounded-3xl flex flex-col overflow-hidden border border-slate-700 shadow-xl";
  };

  return (
    <div className={getContainerStyles()}>
      {/* ACTION BAR */}
      <div 
        className={`${isMobile ? 'h-20 px-6' : 'h-14 px-4'} bg-slate-800 flex items-center justify-between border-b border-slate-700 shrink-0 cursor-pointer`}
        onClick={() => isMobile && setSurveyMode(surveyMode === 'maximized' ? 'default' : 'maximized')}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg shrink-0">
            <Beaker size={isMobile ? 20 : 16} className="text-indigo-400" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Feedback Form
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-tighter truncate">
              {isMobile ? (surveyMode === 'maximized' ? 'Close Form' : 'View Form') : 'Researcher Survey'}
            </span>
          </div>
        </div>

        {/* NAVIGATION BUTTON SLOT */}
        <div className="flex items-center gap-3 shrink-0">
          <div onClick={(e) => e.stopPropagation()}>
            {navButton}
          </div>
          
          {isMobile && (
             <div className="text-slate-500 ml-1">
               {surveyMode === 'maximized' ? <X size={20} /> : <ChevronUp size={20} className="animate-bounce" />}
             </div>
          )}
        </div>
      </div>

      {/* SURVEY CONTENT */}
      {(surveyMode === 'maximized' || !isMobile) && (
        <div className="flex-1 relative bg-white min-h-0">
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          )}
          <iframe
            src={url}
            title={`Survey-${domainId}`}
            onLoad={() => setIsLoaded(true)}
            className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      )}
    </div>
  );
}