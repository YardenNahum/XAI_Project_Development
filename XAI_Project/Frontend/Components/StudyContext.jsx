import { createContext, useContext, useState, useEffect } from 'react';
import { Activity, Database, BrainCircuit } from 'lucide-react';
// manages the study state, including:
// - domain order randomization 
// - tracking which surveys have been completed
// - providing a function to mark surveys as complete
const StudyContext = createContext();
// Original domain list for shuffling
const ORIGINAL_DOMAINS = ['Diabities_System', 'HR_Report', 'LLM_Report'];
/**
 * 
 * This provider component initializes the study state and provides it to the rest of the app.
 * It randomizes the order of the domains on first load and persists both the order and completion status in localStorage.
 * @param {*} param0 
 * @returns 
 */
export function StudyProvider({ children }) {
  const [completedSurveys, setCompletedSurveys] = useState(() => {
    const saved = localStorage.getItem('completedSurveys');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  // Randomize domain order on first load and persist it
  const [domainOrder, setDomainOrder] = useState(() => {
    const savedOrder = localStorage.getItem('domainOrder');
    if (savedOrder) return JSON.parse(savedOrder);
    
    const shuffled = [...ORIGINAL_DOMAINS].sort(() => Math.random() - 0.5);
    localStorage.setItem('domainOrder', JSON.stringify(shuffled));
    return shuffled;
  });

// Map of domain IDs to their display titles and icons for easy access across the app
  const titlesAndIConsMap = {
  "Diabities_System": { title: "Diabetes", icon: Activity },
  "HR_Report": { title: "HR", icon: Database },
  "LLM_Report": { title: "LLM", icon: BrainCircuit },
};

  // Sync completion to localStorage
  useEffect(() => {
    localStorage.setItem('completedSurveys', JSON.stringify(Array.from(completedSurveys)));
  }, [completedSurveys]);
  // Function to mark a survey as complete
  const markAsComplete = (domainId) => {
    setCompletedSurveys(prev => new Set([...prev, domainId]));
  };
  // Check if all surveys are completed
  const allSurveysCompleted = completedSurveys.size === domainOrder.length;

  return (
    <StudyContext.Provider value={{ 
      domainOrder, 
      completedSurveys, 
      markAsComplete, 
      allSurveysCompleted,
        titlesAndIConsMap
    }}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);