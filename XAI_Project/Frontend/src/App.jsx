import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../Components/NavigationBar.jsx' // Make sure this path matches where you saved the file
import './App.css'

// 1. Define your mockData and domainOrder here or import them from another file
const mockData = {
  diabetes: { icon: () => "🩸", title: "Diabetes Risk Prediction" },
  hr: { icon: () => "👥", title: "Employee Attrition" },
  aiText: { icon: () => "📝", title: "AI Text Detection" }
};
const domainOrder = ['diabetes', 'hr', 'aiText'];

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
        
        {/* 5. Set up the rest of your app's routes here */}
        <main className="flex-1 p-4">
          <Routes>
            {/* CHANGED: Now redirects the empty path "/" to "/about" */}
            <Route path="/" element={<Navigate to="/about" replace />} />
            
            {/* Placeholder route for the About page */}
            <Route path="/about" element={<div>About Page Content Goes Here</div>} />

            {/* Example route placeholder for your domain content */}
            <Route path="/:domainId" element={<div>Domain Content Goes Here</div>} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App