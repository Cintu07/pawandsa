import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import ProgressBar from './ProgressBar';

interface TopicCardProps {
  topic: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    problems: any[];
  };
  onSelect: (topic: any) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect }) => {
  const { getTopicProgress } = useProgress();
  
  const problemCounts = {
    easy: topic.problems.filter(p => p.difficulty === 'Easy').length,
    medium: topic.problems.filter(p => p.difficulty === 'Medium').length,
    hard: topic.problems.filter(p => p.difficulty === 'Hard').length,
  };
  
  const progress = getTopicProgress(topic.id, topic.problems.length);

  return (
    <div
      onClick={() => onSelect(topic)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 group"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${topic.color} group-hover:scale-110 transition-transform`}>
            <topic.icon className="h-8 w-8 text-white" />
          </div>
          <div className="flex items-center space-x-2">
            {progress === 100 && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {topic.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {topic.description}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">{progress}%</span>
          </div>
          <ProgressBar progress={progress} size="sm" showPercentage={false} />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {topic.problems.length} Problems
          </span>
          <div className="flex items-center space-x-2">
            {problemCounts.easy > 0 && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
            {problemCounts.medium > 0 && (
              <span className="w-2 h-2 bg-yellow-500 rounded-full" title="Medium problems"></span>
            )}
            {problemCounts.hard > 0 && (
              <span className="w-2 h-2 bg-red-500 rounded-full" title="Hard problems"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;