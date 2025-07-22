import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Lightbulb, Code, Play, Copy, Check } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import CodeEditor from './CodeEditor';

interface ProblemViewProps {
  problem: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    constraints: string;
    inputFormat: string;
    outputFormat: string;
    sampleInput: string;
    sampleOutput: string;
    explanation: string;
    solution: string;
    hints?: string[];
  };
  onBack: () => void;
  topicTitle: string;
}

const ProblemView: React.FC<ProblemViewProps> = ({ problem, onBack, topicTitle }) => {
  const { completedProblems, toggleProblemCompletion } = useProgress();
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  
  const isCompleted = completedProblems.has(problem.id);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors mb-4"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span>Back to {topicTitle}</span>
        </button>
        
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{problem.title}</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleProblemCompletion(problem.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isCompleted 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Editor Toggle */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setShowEditor(!showEditor)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showEditor 
                ? 'bg-sky-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <Code className="h-4 w-4 inline mr-2" />
            Code Editor
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
            Toggle the integrated code editor to test your solutions
          </span>
        </div>
      </div>

      {/* Code Editor */}
      {showEditor && (
        <div className="mb-8">
          <CodeEditor 
            problem={problem}
            expectedOutput={problem.sampleOutput}
          />
        </div>
      )}

      <div className="space-y-6">
        {/* Problem Description */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-sky-600 mr-2" />
            Problem Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{problem.description}</p>
        </div>

        {/* Constraints and Format */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">🧠 Constraints</h3>
            <p className="text-gray-700 dark:text-gray-300">{problem.constraints}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">📝 Input/Output Format</h3>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300"><strong>Input:</strong> {problem.inputFormat}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Output:</strong> {problem.outputFormat}</p>
            </div>
          </div>
        </div>

        {/* Sample Input/Output */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Play className="h-5 w-5 text-green-600 mr-2" />
            🧪 Sample Input/Output
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Sample Input:</h4>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 relative">
                <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono">{problem.sampleInput}</pre>
                <button
                  onClick={() => copyToClipboard(problem.sampleInput)}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Sample Output:</h4>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 relative">
                <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono">{problem.sampleOutput}</pre>
                <button
                  onClick={() => copyToClipboard(problem.sampleOutput)}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hints */}
        {problem.hints && problem.hints.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors mb-4"
            >
              <Lightbulb className="h-5 w-5" />
              <span className="font-semibold">💡 Hints ({problem.hints.length})</span>
              <ChevronRight className={`h-4 w-4 transition-transform ${showHints ? 'rotate-90' : ''}`} />
            </button>
            
            {showHints && (
              <div className="space-y-3">
                {problem.hints.map((hint, index) => (
                  <div key={index} className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 p-4 rounded-r-lg">
                    <p className="text-orange-800 dark:text-orange-200"><strong>Hint {index + 1}:</strong> {hint}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Solution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="w-full flex items-center justify-between text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors mb-4 p-4 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 border border-sky-200 dark:border-sky-700"
          >
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span className="font-semibold text-lg">✅ Solution & Explanation</span>
            </div>
            <ChevronRight className={`h-4 w-4 transition-transform ${showSolution ? 'rotate-90' : ''}`} />
          </button>
          
          {showSolution && (
            <div className="space-y-4">
              <div className="bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-400 p-4 rounded-r-lg">
                <h4 className="font-semibold text-sky-800 dark:text-sky-200 mb-2">🔍 Logic Explanation:</h4>
                <p className="text-sky-700 dark:text-sky-300">{problem.explanation}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💻 Code Solution:</h4>
                <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 relative">
                  <pre className="text-sm text-gray-100 font-mono overflow-x-auto whitespace-pre-wrap">
                    <code>{problem.solution}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(problem.solution)}
                    className="absolute top-3 right-3 p-2 hover:bg-slate-700 rounded text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemView;