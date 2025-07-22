import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimerContextType {
  totalTime: number;
  sessionTime: number;
  targetTime: number;
  isActive: boolean;
  setTargetTime: (minutes: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  formatTime: (seconds: number) => string;
  getTimeRemaining: () => number;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalTime, setTotalTime] = useState(() => {
    const saved = localStorage.getItem('totalTime');
    return saved ? parseInt(saved) : 0;
  });
  
  const [sessionTime, setSessionTime] = useState(0);
  const [targetTime, setTargetTimeState] = useState(() => {
    const saved = localStorage.getItem('targetTime');
    return saved ? parseInt(saved) : 25 * 60; // Default 25 minutes
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(time => time + 1);
        setTotalTime(time => {
          const newTotal = time + 1;
          localStorage.setItem('totalTime', newTotal.toString());
          return newTotal;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setSessionTime(0);
    setIsActive(false);
  };

  const setTargetTime = (minutes: number) => {
    const seconds = minutes * 60;
    setTargetTimeState(seconds);
    localStorage.setItem('targetTime', seconds.toString());
  };

  const getTimeRemaining = () => {
    return Math.max(0, targetTime - sessionTime);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TimerContext.Provider value={{
      totalTime,
      sessionTime,
      targetTime,
      isActive,
      setTargetTime,
      startTimer,
      pauseTimer,
      resetTimer,
      formatTime,
      getTimeRemaining
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within TimerProvider');
  }
  return context;
};