import React from 'react';
import { CheckCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinalPage = () => {
  const navigate = useNavigate();
  clearLocalStorage(); // Clear all stored data at the end of the study

  function clearLocalStorage() {
    localStorage.removeItem('completedSurveys');
    localStorage.removeItem('domainOrder');
  }
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center transition-all animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Thank You!
        </h1>
        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
          Your participation is invaluable. The data collected will help us greatly in our research on <strong>Explainable AI</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/about')}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          You can now safely close this window.
        </p>
      </div>
    </div>
  );
};

export default FinalPage;