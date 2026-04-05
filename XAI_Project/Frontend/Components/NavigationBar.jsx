import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrainCircuit, ArrowRight, CheckCircle2, Lock, Info } from 'lucide-react';

export default function Navbar({ 
  completedSurveys, 
  handleFinalSubmit, 
  allSurveysCompleted,
  domainOrder,
  mockData
}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current domain from the URL path, removing leading and trailing slashes
  let currentPath = location.pathname.replace(/^\/|\/$/g, '');
  
  // Map 'llm' alias to 'aiText' to match the domain ID (if 'llm' isn't explicitly in domainOrder)
  if (currentPath === 'llm' && !domainOrder.includes('llm')) {
    currentPath = 'aiText';
  }

  // Default to "about" if the path is empty, "/", or not a valid domain
  const activeTab = domainOrder.includes(currentPath) ? currentPath : 'about';

  const progressPercentage = (completedSurveys.size / domainOrder.length) * 100;

  return (
    <>
      {/* TOP HEADER (Shared Desktop & Mobile) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        
        {/* Top Row: Title, Progress Text/Bar & Submit Button */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-2 sm:gap-x-4 relative">
          
          {/* Logo (Left) */}
          <div className="flex items-center gap-2 text-indigo-700 shrink-0 md:w-1/4">
            <BrainCircuit className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />
            <h1 className="text-lg sm:text-xl font-bold tracking-tight hidden sm:block">XAI Evaluator</h1>
          </div>

          {/* Progress (Center) - Text + Bar visible on all devices */}
          <div className="flex-1 max-w-xl mx-auto flex items-center justify-center gap-4 px-2 order-3 w-full md:w-auto md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2">
            <div className="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">
              Progress: {completedSurveys.size} / 3
            </div>
            {/* Progress Bar (Restored for Mobile & Desktop) */}
            <div className="h-2.5 flex-1 w-full min-w-[150px] bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Desktop Bottom Row: Navigation Tabs (Hidden on Mobile) */}
        <div className="hidden md:block px-6 pb-4">
          <nav className="flex items-center gap-3 justify-center">
            
            {/* --- NEW: ABOUT TAB (Desktop) --- */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/about')}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 relative group
                  ${activeTab === 'about'
                    ? 'bg-indigo-50 border-indigo-200 border-2 text-indigo-800 shadow-sm' 
                    : 'bg-white border-2 border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200 cursor-pointer'
                  }`}
              >
                <div className={`p-2 rounded-lg transition-colors 
                  ${activeTab === 'about' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
                  <Info size={18} />
                </div>
                <div className="font-semibold text-sm mr-2">About</div>
              </button>
              
              {/* Connecting Line from About to first Domain */}
              <div className={`w-10 h-0.5 rounded-full transition-colors duration-300 ${completedSurveys.size > 0 || activeTab !== 'about' ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            </div>

            {/* DOMAIN TABS */}
            {domainOrder.map((domainId, index) => {
              const domain = mockData[domainId];
              const Icon = domain.icon;
              const isActive = activeTab === domainId;
              const isCompleted = completedSurveys.has(domainId);
              
              // Unlock logic: First is always unlocked. Others are unlocked if the PREVIOUS domain is completed.
              const isUnlocked = index === 0 || completedSurveys.has(domainOrder[index - 1]);

              return (
                <div key={domainId} className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (isUnlocked) navigate(`/${domainId}`);
                    }}
                    disabled={!isUnlocked}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 relative group
                      ${isActive 
                        ? 'bg-indigo-50 border-indigo-200 border-2 text-indigo-800 shadow-sm' 
                        : isUnlocked
                          ? 'bg-white border-2 border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200 cursor-pointer'
                          : 'bg-slate-50 border-2 border-transparent text-slate-400 cursor-not-allowed opacity-70'
                      }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors 
                      ${isActive ? 'bg-indigo-600 text-white shadow-sm' : 
                        isCompleted ? 'bg-emerald-100 text-emerald-700' :
                        !isUnlocked ? 'bg-slate-200 text-slate-400' :
                        'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
                      {isCompleted ? <CheckCircle2 size={18} /> : !isUnlocked ? <Lock size={18} /> : <Icon size={18} />}
                    </div>
                    <div className="font-semibold text-sm mr-2">{domain.title.split(': ')[0]}</div>
                  </button>
                  
                  {/* Connecting Line */}
                  {index < domainOrder.length - 1 && (
                    <div className={`w-10 h-0.5 rounded-full transition-colors duration-300 ${completedSurveys.has(domainId) ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION (Hidden on Desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around px-2 py-2">
          
          {/* --- NEW: ABOUT TAB (Mobile) --- */}
          <button
            onClick={() => navigate('/about')}
            className={`flex flex-col items-center justify-center w-full p-2 rounded-xl transition-all duration-200 relative
              ${activeTab === 'about' ? 'text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <div className={`p-1.5 mb-1 rounded-full transition-colors ${activeTab === 'about' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
              <Info size={20} />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold text-center leading-tight ${activeTab === 'about' ? 'text-indigo-700' : 'text-slate-600'}`}>
              About
            </span>
            {activeTab === 'about' && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-b-full"></div>
            )}
          </button>

          {/* DOMAIN TABS (Mobile) */}
          {domainOrder.map((domainId, index) => {
            const domain = mockData[domainId];
            const Icon = domain.icon;
            const isActive = activeTab === domainId;
            const isCompleted = completedSurveys.has(domainId);
            
            // Unlock logic
            const isUnlocked = index === 0 || completedSurveys.has(domainOrder[index - 1]);

            return (
              <button
                key={domainId}
                onClick={() => {
                  if (isUnlocked) navigate(`/${domainId}`);
                }}
                disabled={!isUnlocked}
                className={`flex flex-col items-center justify-center w-full p-2 rounded-xl transition-all duration-200 relative
                  ${isActive 
                    ? 'text-indigo-700' 
                    : isUnlocked
                      ? 'text-slate-500 hover:bg-slate-50'
                      : 'text-slate-300 cursor-not-allowed'
                  }`}
              >
                <div className={`p-1.5 mb-1 rounded-full transition-colors 
                  ${isActive ? 'bg-indigo-100' : 
                    isCompleted ? 'bg-emerald-50 text-emerald-600' :
                    !isUnlocked ? 'bg-slate-50 text-slate-300' :
                    'bg-slate-100'}`}>
                  {isCompleted ? <CheckCircle2 size={20} /> : !isUnlocked ? <Lock size={20} /> : <Icon size={20} />}
                </div>
                <span className={`text-[10px] sm:text-xs font-bold text-center leading-tight
                  ${isActive ? 'text-indigo-700' : isUnlocked ? 'text-slate-600' : 'text-slate-400'}`}>
                  {domain.title.split(': ')[0]}
                </span>
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-b-full"></div>
                )}
              </button>
            )
          })}
        </div>
      </nav>
      
      {/* Spacer div to ensure main content isn't hidden behind the fixed mobile bottom nav */}
      <div className="md:hidden h-20 w-full"></div>
    </>
  );
}