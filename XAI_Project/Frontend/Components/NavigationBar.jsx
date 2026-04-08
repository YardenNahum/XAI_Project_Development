import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStudy } from './StudyContext.jsx';
import { Check, FlaskConical, Info } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    domainOrder, 
    completedSurveys, 
    allSurveysCompleted, 
    titlesAndIConsMap 
  } = useStudy();

  const handleFinalSubmit = () => {
    navigate('/thank-you');
  };

  const progressPercent = (completedSurveys.size / domainOrder.length) * 100;

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col gap-4">
        
        {/* ROW 1: BRANDING & PROGRESS */}
        <div className="flex items-center gap-6">
          
          {/* Branding */}
          <div 
            className="flex items-center gap-2 cursor-pointer shrink-0" 
            onClick={() => navigate('/about')}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <FlaskConical size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-slate-800 text-lg tracking-tight">
              XAI <span className="text-blue-600">Study</span>
            </span>
          </div>

          {/* Progress Section */}
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200 shadow-inner">
              <div 
                className="h-full bg-blue-500 transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="hidden sm:flex bg-slate-50 px-2 py-1 rounded border border-slate-200 text-[10px] font-black text-slate-500 uppercase">
              {completedSurveys.size} / {domainOrder.length} Complete
            </div>
          </div>

          {/* Submit Button */}
          {allSurveysCompleted && (
            <button
              onClick={handleFinalSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 shrink-0 animate-pulse"
            >
              Finish Study
            </button>
          )}
        </div>

        {/* ROW 2: ABOUT + DOMAIN NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-50">
          
          {/* About Button - Now on Row 2 */}
          <button
            onClick={() => navigate('/about')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border-2
              ${location.pathname === '/about' 
                ? 'bg-slate-800 border-slate-800 text-white shadow-md' 
                : 'border-transparent text-slate-500 hover:bg-slate-100'}
            `}
          >
            <Info size={16} />
            About
          </button>

          <div className="h-6 w-[1px] bg-slate-200 mx-1 shrink-0" />

          {/* Domain Links */}
          {domainOrder.map((id) => {
            const item = titlesAndIConsMap[id];
            const Icon = item.icon;
            const isCompleted = completedSurveys.has(id);
            const isActive = location.pathname.includes(id);

            return (
              <button
                key={id}
                onClick={() => navigate(`/${id}`)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap border-2
                  ${isActive 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold shadow-sm' 
                    : 'border-transparent text-slate-500 hover:bg-slate-50'}
                `}
              >
                <Icon size={16} className={isCompleted ? 'text-green-500' : ''} />
                <span className="text-xs font-bold uppercase tracking-wide">{item.title}</span>
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white shadow-sm">
                    <Check size={8} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;