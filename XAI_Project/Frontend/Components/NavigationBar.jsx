import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStudy } from './StudyContext.jsx';
import { FlaskConical } from 'lucide-react';
import StudySteps from './UI/StudySteps.jsx';
/**
 *  NavigationBar is a React component that renders the navigation bar for the XAI Study application.
 *  It includes a header with the project title and a navigation menu that allows users to switch between the "About" page and the different domain pages (Diabetes, HR, LLM) in a randomized order.
 *  The component uses React Router's useNavigate and useLocation hooks for navigation and active link styling, and it accesses the study context to retrieve the domain order and display information.
 * @returns 
 * 
 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Accessing the study context to get the randomized domain order and display mapping
  const { domainOrder, titlesAndIConsMap } = useStudy();

  return (
    <>
      {/* DESKTOP NAV */}
      <div className="hidden md:flex flex-col sticky top-0 z-50 shadow-sm">
        <header className="bg-white border-b border-slate-100 px-6 py-4">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => navigate('/about')}>
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
                <FlaskConical size={18} className="text-white" />
              </div>
              <span className="font-extrabold text-slate-800 text-2xl tracking-tight">
                XAI <span className="text-blue-600">Study</span>
              </span>
            </div>
            <div className="shrink-0">
              <StudySteps />
            </div>
          </div>
        </header>

        <nav className="bg-slate-50 border-b border-slate-200 px-6 py-2">
          <div className="max-w-[1600px] mx-auto flex items-center gap-4 overflow-x-auto no-scrollbar">
            {/* About Button */}
            <button
              onClick={() => navigate('/about')}
              className={`cursor-pointer px-4 py-2 rounded-xl text-lg font-bold uppercase transition-all shrink-0 ${
                location.pathname === '/about' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200/50'
              }`}
            >
              About
            </button>
            <div className="h-6 w-[1px] bg-slate-200 mx-1 shrink-0" />
            {domainOrder.map((id) => (
              <button
                key={id}
                onClick={() => navigate(`/${id}`)}
                className={`px-4 py-2 cursor-pointer rounded-xl text-lg font-bold uppercase transition-all shrink-0 ${
                  location.pathname.includes(id) ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' : 'text-slate-500 hover:bg-slate-200/50'
                }`}
              >
                {titlesAndIConsMap[id]?.title}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* MOBILE HEADER */}
      <header className="md:hidden bg-white border-b border-slate-200 px-5 py-3 sticky top-0 z-50 overflow-visible">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer items-center gap-2" onClick={() => navigate('/about')}>
            <div className="bg-blue-600 p-1 rounded-md">
              <FlaskConical size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-slate-800 text-xl tracking-tight leading-none">
              XAI <span className="text-blue-600">Study</span>
            </span>
          </div>
          <div className="shrink-0 scale-90 origin-right">
            <StudySteps />
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-[100] px-4 pb-8 pt-4">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-nowrap items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => navigate('/about')}
              className={`px-5 py-3 cursor-pointer rounded-2xl text-[13px] font-black uppercase transition-all shrink-0 ${
                location.pathname === '/about' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-500'
              }`}
            >
              About
            </button>
            {domainOrder.map((id) => (
              <button
                key={id}
                onClick={() => navigate(`/${id}`)}
                className={`px-5 py-3 cursor-pointer rounded-2xl text-[13px] font-black uppercase transition-all shrink-0 ${
                  location.pathname.includes(id) ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {titlesAndIConsMap[id]?.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;