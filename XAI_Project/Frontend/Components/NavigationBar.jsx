import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrainCircuit, CheckCircle2, Lock, Info } from 'lucide-react';

export default function Navbar({ 
  completedSurveys, 
  domainOrder,
  mockData
}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  let currentPath = location.pathname.replace(/^\/|\/$/g, '');
  const activeTab = domainOrder.includes(currentPath) ? currentPath : 'about';

  const progressPercentage = (completedSurveys.size / domainOrder.length) * 100;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      
      {/* TOP ROW: Logo and Progress Bar */}
      <div className="px-4 py-3 sm:px-6 flex items-center justify-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-indigo-700 shrink-0">
          <BrainCircuit className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />
          <h1 className="text-lg font-bold tracking-tight hidden sm:block">XAI Evaluator</h1>
        </div>

        {/* Center Progress - Visible on Mobile & Desktop */}
        <div className="flex-1 max-w-md flex items-center justify-center gap-3">
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 whitespace-nowrap">
            {completedSurveys.size} / 3
          </div>
          <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.4)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Navigation Tabs (Horizontal Scroll on Mobile) */}
      <div className="px-2 pb-2 sm:px-6 sm:pb-4 overflow-x-auto no-scrollbar">
        <nav className="flex items-center gap-1 sm:gap-3 justify-start md:justify-center min-w-max pb-1">
          
          {/* --- ABOUT TAB --- */}
          <button
            onClick={() => navigate('/about')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 relative
              ${activeTab === 'about'
                ? 'bg-indigo-50 text-indigo-800' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
          >
            <div className={`p-1.5 rounded-lg transition-colors ${activeTab === 'about' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'}`}>
              <Info size={16} />
            </div>
            <div className="font-bold text-xs sm:text-sm">About</div>
            {activeTab === 'about' && (
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>

          {/* Desktop Connecting Line */}
          <div className="hidden md:block w-6 h-0.5 bg-slate-100" />

          {/* DOMAIN TABS */}
          {domainOrder.map((domainId, index) => {
            const domain = mockData[domainId];
            const Icon = domain.icon;
            const isActive = activeTab === domainId;
            const isCompleted = completedSurveys.has(domainId);
            const isUnlocked = index === 0 || completedSurveys.has(domainOrder[index - 1]);

            return (
              <React.Fragment key={domainId}>
                <button
                  onClick={() => { if (isUnlocked) navigate(`/${domainId}`); }}
                  disabled={!isUnlocked}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 relative
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-800' 
                      : isUnlocked
                        ? 'text-slate-600 hover:bg-slate-50'
                        : 'text-slate-300 cursor-not-allowed opacity-60'
                    }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors 
                    ${isActive ? 'bg-indigo-600 text-white shadow-sm' : 
                      isCompleted ? 'bg-emerald-100 text-emerald-700' :
                      !isUnlocked ? 'bg-slate-200 text-slate-400' :
                      'bg-slate-100 text-slate-500'}`}>
                    {isCompleted ? <CheckCircle2 size={16} /> : !isUnlocked ? <Lock size={16} /> : <Icon size={16} />}
                  </div>
                  <div className="font-bold text-xs sm:text-sm whitespace-nowrap">
                    {domain.title.split(': ')[0]}
                  </div>
                  
                  {isActive && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
                
                {/* Desktop Connecting Line */}
                {index < domainOrder.length - 1 && (
                  <div className="hidden md:block w-6 h-0.5 bg-slate-100" />
                )}
              </React.Fragment>
            )
          })}
        </nav>
      </div>
    </header>
  );
}