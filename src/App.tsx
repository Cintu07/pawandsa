import React, { useState } from 'react';
import { BookOpen, Code, Target, Trophy, ChevronRight, User, Menu, X, Moon, Sun, BarChart3, Home } from 'lucide-react';
import TopicCard from './components/TopicCard';
import ProblemView from './components/ProblemView';
import ProgressBar from './components/ProgressBar';
import Timer from './components/Timer';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ProgressProvider, useProgress } from './contexts/ProgressContext';
import { TimerProvider, useTimer } from './contexts/TimerContext';
import { topics } from './data/topics';

function AppContent() {
  const { isDark, toggleTheme } = useTheme();
  const { getTopicProgress, getOverallProgress } = useProgress();
  const { startTimer } = useTimer();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const totalProblems = topics.reduce((sum, topic) => sum + topic.problems.length, 0);
  const overallProgress = getOverallProgress(totalProblems);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSelectedProblem(null);
    setSidebarOpen(false);
    startTimer(); // Start timer when user begins working
  };

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    startTimer(); // Start timer when user opens a problem
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedProblem(null);
  };

  const handleBackToProblems = () => {
    setSelectedProblem(null);
  };

  const handleHomeClick = () => {
    setSelectedTopic(null);
    setSelectedProblem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-lg border-b-2 border-sky-100 dark:border-sky-800 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={handleHomeClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-2 rounded-lg">
                <img 
                  src="/download (15).jpg" 
                  alt="PawanDSA Logo" 
                  className="h-6 w-6 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <Code className="h-6 w-6 text-white hidden" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                  PawanDSA
                </h1>
                <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  {overallProgress}% Complete
                </div>
              </div>
            </button>
            
            <div className="hidden lg:flex items-center space-x-4">
              <Timer />
              
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Target className="h-5 w-5" />
                <span className="text-sm font-medium">Interview Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Trophy className="h-5 w-5" />
                <span className="text-sm font-medium">{totalProblems} Problems</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full">
                <BarChart3 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{overallProgress}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          {/* Overall Progress Bar */}
          <div className="pb-2">
            <ProgressBar 
              progress={overallProgress} 
              size="sm" 
              showPercentage={false}
              className="max-w-md"
            />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <div className="bg-white dark:bg-gray-900 w-80 max-w-[85vw] h-full shadow-xl transition-colors" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 pt-20">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">DSA Topics</h2>
              <div className="mt-2">
                <Timer />
              </div>
            </div>
            <div className="overflow-y-auto h-full pb-20">
              {topics.map((topic) => (
                <div key={topic.id}>
                <button
                  onClick={() => handleTopicSelect(topic)}
                    className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${topic.color}`}>
                        <topic.icon className="h-5 w-5 text-white" />
                      </div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{topic.title}</span>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {getTopicProgress(topic.id, topic.problems.length)}% Complete
                          </div>
                        </div>
                    </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>
                </button>
                  <div className="px-4 pb-2">
                    <ProgressBar 
                      progress={getTopicProgress(topic.id, topic.problems.length)} 
                      size="sm" 
                      showPercentage={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedTopic ? (
          // Home Page
          <div>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                <span className="dark:text-gray-100">
                  Master DSA for
                </span>
                <span className="bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
                  {" "}Interview Success
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                Comprehensive collection of curated DSA problems inspired by NeetCode, LeetCode, and Striver's sheet. 
                Perfect for placement preparation at top product and service companies.
              </p>
              
              {/* Overall Progress */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{overallProgress}%</span>
                </div>
                <ProgressBar progress={overallProgress} showPercentage={false} />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span className="text-green-800 font-medium text-sm sm:text-base">14 Core Topics</span>
                </div>
                <div className="flex items-center space-x-2 bg-sky-100 px-4 py-2 rounded-full">
                  <Target className="h-5 w-5 text-sky-600" />
                  <span className="text-sky-800 font-medium text-sm sm:text-base">30 Problems Each</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
                  <Trophy className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-800 font-medium text-sm sm:text-base">Interview Ready</span>
                </div>
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onSelect={handleTopicSelect}
                />
              ))}
            </div>
          </div>
        ) : !selectedProblem ? (
          // Topic Problems Page
          <div>
            <div className="mb-8">
              <button
                onClick={handleBackToTopics}
                className="flex items-center space-x-2 text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors mb-4"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                <span>Back to Topics</span>
              </button>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-xl ${selectedTopic.color}`}>
                  <selectedTopic.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{selectedTopic.title}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{selectedTopic.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {selectedTopic.problems.length} Problems
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {selectedTopic.problems.filter(p => p.difficulty === 'Easy').length} Easy
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  {selectedTopic.problems.filter(p => p.difficulty === 'Medium').length} Medium
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  {selectedTopic.problems.filter(p => p.difficulty === 'Hard').length} Hard
                </span>
              </div>
              
              {/* Topic Progress */}
              <div className="max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Topic Progress</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {getTopicProgress(selectedTopic.id, selectedTopic.problems.length)}%
                  </span>
                </div>
                <ProgressBar 
                  progress={getTopicProgress(selectedTopic.id, selectedTopic.problems.length)} 
                  showPercentage={false} 
                />
              </div>
            </div>

            <div className="grid gap-6">
              {selectedTopic.problems.map((problem, index) => (
                <div
                  key={problem.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700"
                  onClick={() => handleProblemSelect(problem)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {problem.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {problem.difficulty}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {problem.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>🧠 {problem.constraints}</span>
                      <span>📝 {problem.inputFormat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Problem Detail Page
          <ProblemView
            problem={selectedProblem}
            onBack={handleBackToProblems}
            topicTitle={selectedTopic.title}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-2 rounded-lg">
                <img 
                  src="/download (15).jpg" 
                  alt="PawanDSA Logo" 
                  className="h-6 w-6 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <Code className="h-6 w-6 text-white hidden" />
              </div>
              <h3 className="text-2xl font-bold">PawanDSA</h3>
            </div>
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              Master Data Structures & Algorithms for Interview Success
            </p>
            <p className="text-gray-500 dark:text-gray-600 text-sm">
              Inspired by NeetCode, LeetCode, and Striver's DSA Sheet
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <TimerProvider>
          <AppContent />
        </TimerProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;