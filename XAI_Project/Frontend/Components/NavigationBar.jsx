import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStudy } from './StudyContext.jsx';
import { FlaskConical, Info } from 'lucide-react';
import StudySteps from './UI/StudySteps.jsx';
/**
 * navigation bar component that provides links to the about page and the different domain pages. It also includes a help button that opens the StudySteps component.
 * The navigation bar is responsive, showing a top header with the logo and links on desktop, and a fixed bottom navigation on mobile.
 * @returns 
 */
const Navbar = () => {
  // React Router hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();
  // Access the study context to get the randomized domain order and the mapping of domain identifiers to display titles and icons
  const { domainOrder, titlesAndIConsMap } = useStudy();

  return (
    <>
      {/* TOP HEADER */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
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

          {/* On Desktop, StudyHelper in the top row opposite the logo */}
          <div className="hidden md:block">
            <StudySteps />
          </div>
        </div>
      </header>

      {/* DESKTOP SUB-NAVBAR (Hidden on Mobile) */}
      <nav className="hidden md:block bg-slate-50 border-b border-slate-200 sticky top-[73px] z-40">
        <div className="max-w-[1600px] mx-auto px-6 py-2 flex items-center gap-2">
          <button
            onClick={() => navigate('/about')}
            className={`flex items-center cursor-pointer gap-1.5 px-4 py-2 rounded-xl text-lg font-bold uppercase tracking-wider transition-all border-2
              ${location.pathname === '/about' 
                ? 'bg-slate-800 border-slate-800 text-white shadow-md' 
                : 'border-transparent text-slate-500 hover:bg-slate-200/50'}
            `}
          >
            <Info size={16} />
            About
          </button>

          <div className="h-6 w-[1px] bg-slate-200 mx-1 shrink-0" />

          {domainOrder.map((id) => {
            const item = titlesAndIConsMap[id];
            if (!item) return null;
            const Icon = item.icon;
            const isActive = location.pathname.includes(id);
            return (
              <button
                key={id}
                onClick={() => navigate(`/${id}`)}
                className={`relative cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap border-2
                  ${isActive 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold shadow-sm' 
                    : 'border-transparent text-slate-500 hover:bg-slate-200/50'}
                `}
              >
                <Icon size={16}/>
                <span className="text-lg font-bold uppercase tracking-wide">{item.title}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION (Hidden on Desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 px-4 pb-6 pt-3">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          
          {/* Navigation Links Group */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/about')}
              className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl text-sm font-black uppercase transition-all
                ${location.pathname === '/about' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}
              `}
            >
              About
            </button>

            {domainOrder.map((id) => {
              const item = titlesAndIConsMap[id];
              const isActive = location.pathname.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => navigate(`/${id}`)}
                  className={`px-4 py-3 rounded-2xl text-sm font-black uppercase transition-all whitespace-nowrap
                    ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}
                  `}
                >
                  {item?.title}
                </button>
              );
            })}
          </div>

          {/* Help Button on the right */}
          <div className="shrink-0 ml-4 border-l border-slate-200 pl-4">
             <StudySteps />
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;