import { 
  Database, 
  GitBranch, 
  Link, 
  Layers, 
  TreePine, 
  Search, 
  Repeat, 
  ArrowUpDown, 
  TrendingUp, 
  Zap, 
  Network, 
  Hash, 
  Binary,
  BarChart3
} from 'lucide-react';

export const topics = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Master array manipulation, searching, and optimization techniques essential for coding interviews.',
    icon: Database,
    color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    problems: [
      {
        id: 'arrays-1',
        title: 'Two Sum',
        description: 'Given an array of integers and a target sum, find two numbers that add up to the target.',
        difficulty: 'Easy',
        constraints: '2 ≤ nums.length ≤ 10^4, -10^9 ≤ nums[i] ≤ 10^9',
        inputFormat: 'Array of integers and target integer',
        outputFormat: 'Array of two indices',
        sampleInput: '[2,7,11,15], target = 9',
        sampleOutput: '[0,1]',
        explanation: 'Use a hash map to store complements and their indices for O(n) solution.',
        solution: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
        hints: ['Use a hash map to store seen numbers', 'Calculate complement for each number']
      },
      {
        id: 'arrays-2',
        title: 'Best Time to Buy and Sell Stock',
        description: 'Find the maximum profit from buying and selling stock once.',
        difficulty: 'Easy',
        constraints: '1 ≤ prices.length ≤ 10^5, 0 ≤ prices[i] ≤ 10^4',
        inputFormat: 'Array of stock prices',
        outputFormat: 'Maximum profit integer',
        sampleInput: '[7,1,5,3,6,4]',
        sampleOutput: '5',
        explanation: 'Track minimum price seen so far and calculate profit at each step.',
        solution: `function maxProfit(prices) {
    let minPrice = prices[0];
    let maxProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
    }
    return maxProfit;
}`,
        hints: ['Keep track of minimum price seen so far', 'Calculate profit at each step']
      },
      {
        id: 'arrays-3',
        title: 'Contains Duplicate',
        description: 'Determine if array contains any duplicate values.',
        difficulty: 'Easy',
        constraints: '1 ≤ nums.length ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9',
        inputFormat: 'Array of integers',
        outputFormat: 'Boolean',
        sampleInput: '[1,2,3,1]',
        sampleOutput: 'true',
        explanation: 'Use a Set to track seen elements or sort and check adjacent elements.',
        solution: `function containsDuplicate(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    return false;
}`,
        hints: ['Use a Set data structure', 'Check if element exists before adding']
      }
      // Add 27 more problems here following the same pattern
      ,
      {
        id: 'arrays-4',
        title: 'Product of Array Except Self',
        description: 'Return array where each element is product of all elements except itself.',
        difficulty: 'Medium',
        constraints: '2 ≤ nums.length ≤ 10^5, -30 ≤ nums[i] ≤ 30',
        inputFormat: 'Array of integers',
        outputFormat: 'Array of products',
        sampleInput: '[1,2,3,4]',
        sampleOutput: '[24,12,8,6]',
        explanation: 'Use left and right pass to calculate products without division.',
        solution: `function productExceptSelf(nums) {
    const result = new Array(nums.length);
    
    // Left pass
    result[0] = 1;
    for (let i = 1; i < nums.length; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right pass
    let right = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= right;
        right *= nums[i];
    }
    
    return result;
}`,
        hints: ['Use two passes: left and right', 'Avoid using division']
      },
      {
        id: 'arrays-5',
        title: 'Maximum Subarray',
        description: 'Find the contiguous subarray with the largest sum.',
        difficulty: 'Medium',
        constraints: '1 ≤ nums.length ≤ 10^5, -10^4 ≤ nums[i] ≤ 10^4',
        inputFormat: 'Array of integers',
        outputFormat: 'Maximum sum',
        sampleInput: '[-2,1,-3,4,-1,2,1,-5,4]',
        sampleOutput: '6',
        explanation: 'Use Kadane\'s algorithm to track maximum sum ending at each position.',
        solution: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
        hints: ['Use Kadane\'s algorithm', 'Track current and maximum sum']
      },
      {
        id: 'arrays-6',
        title: '3Sum',
        description: 'Find all unique triplets that sum to zero.',
        difficulty: 'Medium',
        constraints: '3 ≤ nums.length ≤ 3000, -10^5 ≤ nums[i] ≤ 10^5',
        inputFormat: 'Array of integers',
        outputFormat: 'Array of triplets',
        sampleInput: '[-1,0,1,2,-1,-4]',
        sampleOutput: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'Sort array and use two pointers for each element.',
        solution: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}`,
        hints: ['Sort the array first', 'Use two pointers technique', 'Skip duplicates']
      },
      {
        id: 'arrays-7',
        title: 'Container With Most Water',
        description: 'Find two lines that together with x-axis forms container holding most water.',
        difficulty: 'Medium',
        constraints: 'n == height.length, 2 ≤ n ≤ 10^5, 0 ≤ height[i] ≤ 10^4',
        inputFormat: 'Array of heights',
        outputFormat: 'Maximum area',
        sampleInput: '[1,8,6,2,5,4,8,3,7]',
        sampleOutput: '49',
        explanation: 'Use two pointers from both ends, move pointer with smaller height.',
        solution: `function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const area = width * currentHeight;
        maxWater = Math.max(maxWater, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}`,
        hints: ['Use two pointers from ends', 'Move pointer with smaller height']
      },
      {
        id: 'arrays-8',
        title: 'Search in Rotated Sorted Array',
        description: 'Search target in rotated sorted array in O(log n) time.',
        difficulty: 'Medium',
        constraints: '1 ≤ nums.length ≤ 5000, -10^4 ≤ nums[i] ≤ 10^4, all values unique',
        inputFormat: 'Rotated sorted array and target',
        outputFormat: 'Index of target or -1',
        sampleInput: 'nums = [4,5,6,7,0,1,2], target = 0',
        sampleOutput: '4',
        explanation: 'Modified binary search considering rotation point.',
        solution: `function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}`,
        hints: ['Modified binary search', 'Check which half is sorted']
      },
      {
        id: 'arrays-9',
        title: 'Find Minimum in Rotated Sorted Array',
        description: 'Find minimum element in rotated sorted array.',
        difficulty: 'Medium',
        constraints: '1 ≤ nums.length ≤ 5000, -5000 ≤ nums[i] ≤ 5000, all values unique',
        inputFormat: 'Rotated sorted array',
        outputFormat: 'Minimum element',
        sampleInput: '[3,4,5,1,2]',
        sampleOutput: '1',
        explanation: 'Use binary search to find rotation point.',
        solution: `function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
}`,
        hints: ['Use binary search', 'Compare middle with right element']
      },
      {
        id: 'arrays-10',
        title: 'Merge Intervals',
        description: 'Merge all overlapping intervals.',
        difficulty: 'Medium',
        constraints: '1 ≤ intervals.length ≤ 10^4, intervals[i].length == 2',
        inputFormat: 'Array of intervals',
        outputFormat: 'Array of merged intervals',
        sampleInput: '[[1,3],[2,6],[8,10],[15,18]]',
        sampleOutput: '[[1,6],[8,10],[15,18]]',
        explanation: 'Sort intervals by start time, then merge overlapping ones.',
        solution: `function merge(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = result[result.length - 1];
        
        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            result.push(current);
        }
    }
    
    return result;
}`,
        hints: ['Sort intervals by start time', 'Merge overlapping intervals']
      }
    ]
  },
  {
    id: 'strings',
    title: 'Strings',
    description: 'String manipulation, pattern matching, and text processing algorithms.',
    icon: Hash,
    color: 'bg-gradient-to-r from-green-500 to-green-600',
    problems: [
      {
        id: 'strings-1',
        title: 'Valid Anagram',
        description: 'Check if two strings are anagrams of each other.',
        difficulty: 'Easy',
        constraints: '1 ≤ s.length, t.length ≤ 5 * 10^4',
        inputFormat: 'Two strings s and t',
        outputFormat: 'Boolean',
        sampleInput: 's = "anagram", t = "nagaram"',
        sampleOutput: 'true',
        explanation: 'Count character frequencies or sort both strings and compare.',
        solution: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const count = {};
    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    
    for (const char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    
    return true;
}`,
        hints: ['Count character frequencies', 'Compare lengths first']
      }
      // Add 29 more string problems
      ,
      {
        id: 'strings-2',
        title: 'Longest Substring Without Repeating Characters',
        description: 'Find length of longest substring without repeating characters.',
        difficulty: 'Medium',
        constraints: '0 ≤ s.length ≤ 5 * 10^4',
        inputFormat: 'String s',
        outputFormat: 'Length of longest substring',
        sampleInput: 's = "abcabcbb"',
        sampleOutput: '3',
        explanation: 'Use sliding window with hash set to track characters.',
        solution: `function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
        hints: ['Use sliding window technique', 'Track characters with Set']
      }
    ]
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Pointer manipulation, list traversal, and node operations.',
    icon: Link,
    color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    problems: [
      {
        id: 'linked-lists-1',
        title: 'Reverse Linked List',
        description: 'Reverse a singly linked list iteratively or recursively.',
        difficulty: 'Easy',
        constraints: '0 ≤ number of nodes ≤ 5000, -5000 ≤ Node.val ≤ 5000',
        inputFormat: 'Head of linked list',
        outputFormat: 'Head of reversed list',
        sampleInput: '[1,2,3,4,5]',
        sampleOutput: '[5,4,3,2,1]',
        explanation: 'Use three pointers: prev, current, and next to reverse links.',
        solution: `function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}`,
        hints: ['Use three pointers: prev, current, next', 'Update links step by step']
      }
      // Add 29 more linked list problems
    ]
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'LIFO and FIFO data structures with practical applications.',
    icon: Layers,
    color: 'bg-gradient-to-r from-red-500 to-red-600',
    problems: [
      {
        id: 'stacks-queues-1',
        title: 'Valid Parentheses',
        description: 'Check if string has valid parentheses, brackets, and braces.',
        difficulty: 'Easy',
        constraints: '1 ≤ s.length ≤ 10^4',
        inputFormat: 'String containing parentheses',
        outputFormat: 'Boolean',
        sampleInput: '"()[]{}"',
        sampleOutput: 'true',
        explanation: 'Use stack to match opening and closing brackets.',
        solution: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };
    
    for (const char of s) {
        if (char in pairs) {
            if (stack.pop() !== pairs[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
        hints: ['Use a stack data structure', 'Map closing brackets to opening ones']
      }
      // Add 29 more stack/queue problems
    ]
  },
  {
    id: 'trees',
    title: 'Trees & Binary Trees',
    description: 'Tree traversal, manipulation, and binary tree algorithms.',
    icon: TreePine,
    color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    problems: [
      {
        id: 'trees-1',
        title: 'Maximum Depth of Binary Tree',
        description: 'Find the maximum depth of a binary tree.',
        difficulty: 'Easy',
        constraints: '0 ≤ number of nodes ≤ 10^4, -100 ≤ Node.val ≤ 100',
        inputFormat: 'Root of binary tree',
        outputFormat: 'Integer depth',
        sampleInput: '[3,9,20,null,null,15,7]',
        sampleOutput: '3',
        explanation: 'Use recursion: depth = 1 + max(left_depth, right_depth).',
        solution: `function maxDepth(root) {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return 1 + Math.max(leftDepth, rightDepth);
}`,
        hints: ['Use recursion', 'Base case: null node has depth 0']
      }
      // Add 29 more tree problems
    ]
  },
  {
    id: 'bst',
    title: 'Binary Search Trees',
    description: 'BST properties, search, insertion, and deletion operations.',
    icon: Search,
    color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    problems: [
      {
        id: 'bst-1',
        title: 'Validate Binary Search Tree',
        description: 'Check if a binary tree is a valid BST.',
        difficulty: 'Medium',
        constraints: '1 ≤ number of nodes ≤ 10^4, -2^31 ≤ Node.val ≤ 2^31 - 1',
        inputFormat: 'Root of binary tree',
        outputFormat: 'Boolean',
        sampleInput: '[2,1,3]',
        sampleOutput: 'true',
        explanation: 'Use inorder traversal or validate with min/max bounds.',
        solution: `function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}`,
        hints: ['Use min/max bounds for validation', 'Inorder traversal should be sorted']
      }
      // Add 29 more BST problems
    ]
  },
  {
    id: 'recursion',
    title: 'Recursion & Backtracking',
    description: 'Recursive algorithms and backtracking problem-solving techniques.',
    icon: Repeat,
    color: 'bg-gradient-to-r from-pink-500 to-pink-600',
    problems: [
      {
        id: 'recursion-1',
        title: 'Generate Parentheses',
        description: 'Generate all combinations of well-formed parentheses.',
        difficulty: 'Medium',
        constraints: '1 ≤ n ≤ 8',
        inputFormat: 'Integer n (number of pairs)',
        outputFormat: 'Array of valid combinations',
        sampleInput: 'n = 3',
        sampleOutput: '["((()))","(()())","(())()","()(())","()()()"]',
        explanation: 'Use backtracking with open/close parentheses count.',
        solution: `function generateParenthesis(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}`,
        hints: ['Track open and close parentheses count', 'Use backtracking']
      }
      // Add 29 more recursion problems
    ]
  },
  {
    id: 'sorting',
    title: 'Sorting & Searching',
    description: 'Sorting algorithms and binary search variations.',
    icon: ArrowUpDown,
    color: 'bg-gradient-to-r from-teal-500 to-teal-600',
    problems: [
      {
        id: 'sorting-1',
        title: 'Binary Search',
        description: 'Implement binary search in a sorted array.',
        difficulty: 'Easy',
        constraints: '1 ≤ nums.length ≤ 10^4, -10^4 ≤ nums[i], target ≤ 10^4',
        inputFormat: 'Sorted array and target value',
        outputFormat: 'Index of target or -1',
        sampleInput: 'nums = [-1,0,3,5,9,12], target = 9',
        sampleOutput: '4',
        explanation: 'Use two pointers to divide search space in half each iteration.',
        solution: `function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
        hints: ['Use two pointers: left and right', 'Compare middle element with target']
      }
      // Add 29 more sorting/searching problems
    ]
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    description: 'Optimization problems solved with greedy choice strategy.',
    icon: TrendingUp,
    color: 'bg-gradient-to-r from-orange-500 to-orange-600',
    problems: [
      {
        id: 'greedy-1',
        title: 'Jump Game',
        description: 'Determine if you can reach the last index of array.',
        difficulty: 'Medium',
        constraints: '1 ≤ nums.length ≤ 10^4, 0 ≤ nums[i] ≤ 10^5',
        inputFormat: 'Array of non-negative integers',
        outputFormat: 'Boolean',
        sampleInput: '[2,3,1,1,4]',
        sampleOutput: 'true',
        explanation: 'Track the farthest reachable position greedily.',
        solution: `function canJump(nums) {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            return false;
        }
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    
    return true;
}`,
        hints: ['Track maximum reachable position', 'Check if current position is reachable']
      }
      // Add 29 more greedy problems
    ]
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Optimization problems using memoization and tabulation.',
    icon: Zap,
    color: 'bg-gradient-to-r from-violet-500 to-violet-600',
    problems: [
      {
        id: 'dp-1',
        title: 'Climbing Stairs',
        description: 'Count distinct ways to climb n stairs (1 or 2 steps at a time).',
        difficulty: 'Easy',
        constraints: '1 ≤ n ≤ 45',
        inputFormat: 'Integer n',
        outputFormat: 'Number of ways',
        sampleInput: 'n = 3',
        sampleOutput: '3',
        explanation: 'Use Fibonacci sequence: ways(n) = ways(n-1) + ways(n-2).',
        solution: `function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1;
    let prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}`,
        hints: ['Similar to Fibonacci sequence', 'Use bottom-up approach']
      }
      // Add 29 more DP problems
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Graph traversal, shortest paths, and connectivity algorithms.',
    icon: Network,
    color: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
    problems: [
      {
        id: 'graphs-1',
        title: 'Number of Islands',
        description: 'Count the number of islands in a 2D grid.',
        difficulty: 'Medium',
        constraints: '1 ≤ grid.length, grid[i].length ≤ 300',
        inputFormat: '2D grid of 1s and 0s',
        outputFormat: 'Number of islands',
        sampleInput: '[["1","1","0"],["1","1","0"],["0","0","1"]]',
        sampleOutput: '2',
        explanation: 'Use DFS or BFS to mark connected components.',
        solution: `function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    let count = 0;
    
    function dfs(i, j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
            return;
        }
        
        grid[i][j] = '0'; // Mark as visited
        
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    
    return count;
}`,
        hints: ['Use DFS to explore connected components', 'Mark visited cells']
      }
      // Add 29 more graph problems
    ]
  },
  {
    id: 'tries',
    title: 'Tries',
    description: 'Prefix trees for efficient string operations and searches.',
    icon: GitBranch,
    color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    problems: [
      {
        id: 'tries-1',
        title: 'Implement Trie',
        description: 'Implement a trie (prefix tree) with insert, search, and startsWith.',
        difficulty: 'Medium',
        constraints: '1 ≤ word.length, prefix.length ≤ 2000',
        inputFormat: 'Trie operations',
        outputFormat: 'Boolean for search/startsWith',
        sampleInput: 'insert("apple"), search("app")',
        sampleOutput: 'false',
        explanation: 'Use nested objects or arrays to represent trie nodes.',
        solution: `class Trie {
    constructor() {
        this.root = {};
    }
    
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node[char]) {
                node[char] = {};
            }
            node = node[char];
        }
        node.isEnd = true;
    }
    
    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node[char]) {
                return false;
            }
            node = node[char];
        }
        return !!node.isEnd;
    }
    
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node[char]) {
                return false;
            }
            node = node[char];
        }
        return true;
    }
}`,
        hints: ['Use nested objects for trie nodes', 'Mark end of words with flag']
      }
      // Add 29 more trie problems
    ]
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    description: 'Bitwise operations and bit-level problem solving.',
    icon: Binary,
    color: 'bg-gradient-to-r from-slate-500 to-slate-600',
    problems: [
      {
        id: 'bit-1',
        title: 'Single Number',
        description: 'Find the single number in array where every other number appears twice.',
        difficulty: 'Easy',
        constraints: '1 ≤ nums.length ≤ 3 * 10^4, -3 * 10^4 ≤ nums[i] ≤ 3 * 10^4',
        inputFormat: 'Array of integers',
        outputFormat: 'Single number',
        sampleInput: '[2,2,1]',
        sampleOutput: '1',
        explanation: 'Use XOR operation: a ^ a = 0, a ^ 0 = a.',
        solution: `function singleNumber(nums) {
    let result = 0;
    for (const num of nums) {
        result ^= num;
    }
    return result;
}`,
        hints: ['Use XOR operation', 'XOR of same numbers is 0']
      }
      // Add 29 more bit manipulation problems
    ]
  },
  {
    id: 'heaps',
    title: 'Heaps & Hashing',
    description: 'Priority queues, heap operations, and hash table applications.',
    icon: BarChart3,
    color: 'bg-gradient-to-r from-rose-500 to-rose-600',
    problems: [
      {
        id: 'heaps-1',
        title: 'Top K Frequent Elements',
        description: 'Find k most frequent elements in an array.',
        difficulty: 'Medium',
        constraints: '1 ≤ nums.length ≤ 10^5, k is in range [1, number of unique elements]',
        inputFormat: 'Array of integers and integer k',
        outputFormat: 'Array of k most frequent elements',
        sampleInput: 'nums = [1,1,1,2,2,3], k = 2',
        sampleOutput: '[1,2]',
        explanation: 'Use hash map for frequency and heap/bucket sort for top k.',
        solution: `function topKFrequent(nums, k) {
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    const buckets = Array(nums.length + 1).fill().map(() => []);
    for (const [num, freq] of freqMap) {
        buckets[freq].push(num);
    }
    
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }
    
    return result.slice(0, k);
}`,
        hints: ['Count frequencies with hash map', 'Use bucket sort for O(n) solution']
      }
      // Add 29 more heap/hashing problems
    ]
  }
];