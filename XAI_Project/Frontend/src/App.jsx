import { Outlet } from 'react-router-dom'
import Navbar from '../Components/NavigationBar.jsx' 
import AboutPage from '../Components/Pages/AboutPage.jsx';
import DomainPage from '../Components/Pages/SystemsPage.jsx';
import FinalPage from '../Components/Pages/FinalPage.jsx';
import { StudyProvider } from '../Components/StudyContext';

export default function App() {
  return (
    <StudyProvider>
        <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
          <Navbar /> 
          <main className="flex-1 p-4">
             <Outlet />
          </main>
        </div>
    </StudyProvider>
  );
}