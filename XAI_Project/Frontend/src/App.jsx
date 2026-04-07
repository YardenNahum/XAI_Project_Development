import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../Components/NavigationBar.jsx' 
import AboutPage from '../Components/Pages/AboutPage.jsx';
import DomainPage from '../Components/Pages/SystemsPage.jsx';
import { Activity,Database,BrainCircuit } from 'lucide-react';
import './App.css'


const mockData = {
  "Diabities_System": { title: "Diabetes", icon: Activity },
  "HR_Report": { title: "HR", icon: Database },
  "LLM_Report": { title: "LLM", icon: BrainCircuit }, // Must match the navigation string!
};
const domainOrder = ['Diabities_System', 'HR_Report', 'LLM_Report']; 

function App() {
  // 2. Set up the state required by the Navbar
  const [completedSurveys, setCompletedSurveys] = useState(new Set());
  
  const allSurveysCompleted = completedSurveys.size === domainOrder.length;

  const handleFinalSubmit = () => {
    alert("All surveys complete! Submitting study...");
  };

  return (
    // 3. Wrap your app in a BrowserRouter because Navbar uses useNavigate and useLocation
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        
        {/* 4. Call your Navbar and pass in the necessary props */}
        <Navbar 
          completedSurveys={completedSurveys} 
          handleFinalSubmit={handleFinalSubmit}
          allSurveysCompleted={allSurveysCompleted}
          domainOrder={domainOrder}
          mockData={mockData}
        />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/:domainId" element={<DomainPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App