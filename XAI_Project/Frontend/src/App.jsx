import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../Components/NavigationBar.jsx' 
import AboutPage from '../Components/Pages/AboutPage.jsx';
import DomainPage from '../Components/Pages/SystemsPage.jsx';
import FinalPage from '../Components/Pages/FinalPage.jsx';
import { StudyProvider } from '../Components/StudyContext';

export default function App() {
  return (
    <StudyProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
          <Navbar /> 
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/thank-you" element={<FinalPage />} />
              <Route path="/:domainId" element={<DomainPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </StudyProvider>
  );
}