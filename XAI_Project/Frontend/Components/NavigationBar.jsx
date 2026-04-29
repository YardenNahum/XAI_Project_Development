import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStudy } from './StudyContext.jsx';
import { Check, FlaskConical, Info } from 'lucide-react';
/**
 * Renders the navigation bar for the application.
 * The navigation bar includes the application logo, an "About" button, and buttons for each domain in the study.
 * @returns 
 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Access study state and functions from context
  const { 
    domainOrder, 
    titlesAndIConsMap 
  } = useStudy();


  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col gap-4">
        
        {/*logo*/}
        <div className="flex items-center gap-6">
          
          {/* logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer shrink-0" 
            onClick={() => navigate('/about')}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <FlaskConical size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-slate-800 text-2xl tracking-tight">
              XAI <span className="text-blue-600">Study</span>
            </span>
          </div>
        </div>

        {/* about and domain navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-50">
          
          {/* About Button  */}
          <button
            onClick={() => navigate('/about')}
            className={`flex items-center cursor-pointer gap-1.5 px-4 py-2 rounded-xl text-xl font-bold uppercase tracking-wider transition-all border-2
              ${location.pathname === '/about' 
                ? 'bg-slate-800 border-slate-800 text-white shadow-md' 
                : 'border-transparent text-slate-500 hover:bg-slate-100'}
            `}
          >
            <Info size={16} />
            About
          </button>

          <div className="h-6 w-[1px] bg-slate-200 mx-1 shrink-0" />

          {/* Domain buttons */}
          {domainOrder.map((id) => {
            const item = titlesAndIConsMap[id];
            const Icon = item.icon;
            const isActive = location.pathname.includes(id);
            return (
              <button
                key={id}
                onClick={() => navigate(`/${id}`)}
                className={`relative cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap border-2
                  ${isActive 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold shadow-sm' 
                    : 'border-transparent text-slate-500 hover:bg-slate-50'}
                `}
              >
                <Icon size={16}/>
                <span className="text-xl font-bold uppercase tracking-wide">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;