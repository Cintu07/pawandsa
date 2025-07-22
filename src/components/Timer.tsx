import React from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { useTimer } from '../contexts/TimerContext';

const Timer: React.FC = () => {
  const { 
    totalTime, 
    sessionTime, 
    targetTime, 
    isActive, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    formatTime, 
    getTimeRemaining,
    setTargetTime 
  } = useTimer();

  const timeRemaining = getTimeRemaining();
  const isTimeUp = timeRemaining === 0 && sessionTime > 0;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white dark:bg-slate-800 px-3 sm:px-4 py-3 rounded-lg shadow-md border border-sky-200 dark:border-sky-700">
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-sky-600 dark:text-sky-400" />
        <div className="text-sm">
          <div className={`font-medium ${isTimeUp ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>
            <span className="hidden sm:inline">Time: </span>{formatTime(timeRemaining)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Total: {formatTime(totalTime)}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <select
          value={targetTime / 60}
          onChange={(e) => setTargetTime(parseInt(e.target.value))}
          className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300"
          disabled={isActive}
        >
          <option value={15}>15m</option>
          <option value={25}>25m</option>
          <option value={45}>45m</option>
          <option value={60}>60m</option>
        </select>
        
        <button
          onClick={isActive ? pauseTimer : startTimer}
          className={`p-1.5 rounded-lg transition-colors ${
            isActive 
              ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800' 
              : 'bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-800'
          }`}
          title={isActive ? 'Pause Timer' : 'Start Timer'}
        >
          {isActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>
        
        <button
          onClick={resetTimer}
          className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          title="Reset Session Timer"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
      </div>
      
      {isTimeUp && (
        <div className="text-xs text-red-600 dark:text-red-400 font-medium animate-pulse">
          Time's up! 🔔
        </div>
      )}
    </div>
  );
};

export default Timer;