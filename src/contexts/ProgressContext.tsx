import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedProblems: Set<string>;
  toggleProblemCompletion: (problemId: string) => void;
  getTopicProgress: (topicId: string, totalProblems: number) => number;
  getOverallProgress: (totalProblems: number) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedProblems');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('completedProblems', JSON.stringify([...completedProblems]));
  }, [completedProblems]);

  const toggleProblemCompletion = (problemId: string) => {
    setCompletedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
      }
      return newSet;
    });
  };

  const getTopicProgress = (topicId: string, totalProblems: number) => {
    const topicCompleted = [...completedProblems].filter(id => id.startsWith(topicId)).length;
    return Math.round((topicCompleted / totalProblems) * 100);
  };

  const getOverallProgress = (totalProblems: number) => {
    return Math.round((completedProblems.size / totalProblems) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      completedProblems,
      toggleProblemCompletion,
      getTopicProgress,
      getOverallProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};