import { createContext, useContext, useState } from 'react';
import { Activity, Database, BrainCircuit } from 'lucide-react';

const StudyContext = createContext();

const ORIGINAL_DOMAINS = ['Diabities_System', 'HR_Report', 'LLM_Report'];

export function StudyProvider({ children }) {
  // Randomize domain order on first load and persist it
  const [domainOrder] = useState(() => {
    const savedOrder = localStorage.getItem('domainOrder');
    if (savedOrder) return JSON.parse(savedOrder);
    
    // If no saved order, randomize and save it
    const shuffled = [...ORIGINAL_DOMAINS].sort(() => Math.random() - 0.5);
    localStorage.setItem('domainOrder', JSON.stringify(shuffled));
    return shuffled;
  });

  // UI mapping for display titles and icons
  const titlesAndIConsMap = {
    "Diabities_System": { title: "Diabetes", icon: Activity },
    "HR_Report": { title: "HR", icon: Database },
    "LLM_Report": { title: "LLM", icon: BrainCircuit },
  };

  return (
    <StudyContext.Provider value={{ 
      domainOrder, 
      titlesAndIConsMap 
    }}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);