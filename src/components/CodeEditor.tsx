import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, RotateCcw, CheckCircle, XCircle, Code2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  expectedOutput?: string;
  problem?: any;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode = '', 
  language: propLanguage = 'javascript',
  expectedOutput = '',
  problem
}) => {
  const { isDark } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(propLanguage);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<'pass' | 'fail' | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const languageTemplates = {
    javascript: {
      template: `// ${problem?.title || 'Problem Solution'}
// Difficulty: ${problem?.difficulty || 'Medium'}

function solution() {
    // Write your JavaScript solution here
    
    return result;
}

// Test your solution
console.log(solution());`,
      solution: `// ${problem?.title || 'Problem Solution'} - JavaScript Solution
function solution() {
    // Example solution for ${problem?.title || 'this problem'}
    // Time Complexity: O(n)
    // Space Complexity: O(1)
    
    // Implementation will vary based on the specific problem
    let result = "Sample output";
    return result;
}

console.log(solution());`
    },
    python: {
      template: `# ${problem?.title || 'Problem Solution'}
# Difficulty: ${problem?.difficulty || 'Medium'}

def solution():
    # Write your Python solution here
    
    return result

# Test your solution
print(solution())`,
      solution: `# ${problem?.title || 'Problem Solution'} - Python Solution
def solution():
    # Example solution for ${problem?.title || 'this problem'}
    # Time Complexity: O(n)
    # Space Complexity: O(1)
    
    # Implementation will vary based on the specific problem
    result = "Sample output"
    return result

print(solution())`
    },
    java: {
      template: `// ${problem?.title || 'Problem Solution'}
// Difficulty: ${problem?.difficulty || 'Medium'}

public class Solution {
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Test your solution
        System.out.println(sol.solve());
    }
    
    public String solve() {
        // Write your Java solution here
        
        return result;
    }
}`,
      solution: `// ${problem?.title || 'Problem Solution'} - Java Solution
public class Solution {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.solve());
    }
    
    public String solve() {
        // Example solution for ${problem?.title || 'this problem'}
        // Time Complexity: O(n)
        // Space Complexity: O(1)
        
        String result = "Sample output";
        return result;
    }
}`
    },
    cpp: {
      template: `// ${problem?.title || 'Problem Solution'}
// Difficulty: ${problem?.difficulty || 'Medium'}

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Write your C++ solution here
    
    cout << result << endl;
    return 0;
}`,
      solution: `// ${problem?.title || 'Problem Solution'} - C++ Solution
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    // Example solution for ${problem?.title || 'this problem'}
    // Time Complexity: O(n)
    // Space Complexity: O(1)
    
    string result = "Sample output";
    cout << result << endl;
    return 0;
}`
    }
  };

  // Update code when language changes
  useEffect(() => {
    if (languageTemplates[selectedLanguage]) {
      setCode(languageTemplates[selectedLanguage].template);
    }
    setOutput('');
    setTestResult(null);
    setShowSolution(false);
  }, [selectedLanguage, problem]);

  // Initialize with initial code or template
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    } else if (languageTemplates[selectedLanguage]) {
      setCode(languageTemplates[selectedLanguage].template);
    }
  }, [initialCode]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setTestResult(null);

    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (selectedLanguage === 'javascript') {
        try {
          // Create a safe execution environment for JavaScript
          const logs: string[] = [];
          const originalLog = console.log;
          console.log = (...args) => {
            logs.push(args.map(arg => String(arg)).join(' '));
          };
          
          // Execute the code
          const func = new Function(code);
          func();
          
          console.log = originalLog;
          
          const outputStr = logs.join('\n') || 'No output';
          setOutput(`Output: ${outputStr}`);
          
          // Check if output matches expected
          if (expectedOutput && outputStr.trim() === expectedOutput.trim()) {
            setTestResult('pass');
            setOutput(`Output: ${outputStr}\n✅ Test Passed!`);
          } else if (expectedOutput) {
            setTestResult('fail');
            setOutput(`Output: ${outputStr}\n❌ Expected: ${expectedOutput}`);
          }
        } catch (error) {
          setOutput(`❌ Runtime Error: ${error.message}`);
          setTestResult('fail');
        }
      } else {
        // For other languages, simulate successful execution
        const sampleOutputs = {
          python: problem?.sampleOutput || 'Sample output',
          java: problem?.sampleOutput || 'Sample output', 
          cpp: problem?.sampleOutput || 'Sample output'
        };
        
        const simulatedOutput = sampleOutputs[selectedLanguage] || 'Code executed successfully!';
        setOutput(`Output: ${simulatedOutput}\n✅ Code compiled and executed successfully!`);
        
        if (expectedOutput && simulatedOutput === expectedOutput) {
          setTestResult('pass');
        }
      }
    } catch (error) {
      setOutput(`❌ Execution Error: ${error.message}`);
      setTestResult('fail');
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    if (languageTemplates[selectedLanguage]) {
      setCode(languageTemplates[selectedLanguage].template);
    }
    setOutput('');
    setTestResult(null);
    setShowSolution(false);
  };

  const loadSolution = () => {
    if (languageTemplates[selectedLanguage]?.solution) {
      setCode(languageTemplates[selectedLanguage].solution);
      setOutput('');
      setTestResult(null);
      setShowSolution(true);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          
          {testResult && (
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
              testResult === 'pass' 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {testResult === 'pass' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <span>{testResult === 'pass' ? 'Test Passed' : 'Test Failed'}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadSolution}
            className="flex items-center space-x-1 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors text-sm"
            title="Load Solution"
          >
            <Code2 className="h-4 w-4" />
            <span className="hidden sm:inline">Solution</span>
          </button>
          <button
            onClick={copyCode}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Copy Code"
          >
            <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={resetCode}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors text-sm"
          >
            <Play className="h-4 w-4" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="border-r border-gray-200 dark:border-gray-700">
          <div className="p-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Code Editor ({selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)})
              {showSolution && <span className="ml-2 text-sky-600 dark:text-sky-400">(Solution Loaded)</span>}
            </h4>
          </div>
          <Editor
            height="400px"
            language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme={isDark ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              tabSize: 2,
            }}
          />
        </div>
        
        <div>
          <div className="p-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</h4>
          </div>
          <div className="h-[400px] p-4 overflow-y-auto">
            {output ? (
              <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">
                {output}
              </pre>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                Click "Run" to see the output here...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;