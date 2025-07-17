import React, { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { motion } from 'framer-motion'
import { Play, X, Lightbulb, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  code: string
  expectedOutput: string
  hints: string[]
}

interface CodeEditorProps {
  challenge: Challenge
  onComplete: (challenge: Challenge) => void
  onClose: () => void
}

function CodeEditor({ challenge, onComplete, onClose }: CodeEditorProps) {
  const [code, setCode] = useState(challenge.code)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
    editor.focus()
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput('')
    
    // Simulate code execution (in a real app, you'd send this to a Python interpreter)
    setTimeout(() => {
      try {
        // Simple Python code simulation
        let result = ''
        
        if (code.includes('print("Hello, World!")') || code.includes("print('Hello, World!')")) {
          result = 'Hello, World!'
        } else if (code.includes('print(') && challenge.id === 'hello-world') {
          // Extract what's being printed
          const printMatch = code.match(/print\(["'](.+?)["']\)/)
          if (printMatch) {
            result = printMatch[1]
          }
        } else if (challenge.id === 'variables') {
          // Simulate variable handling
          if (code.includes('name') && code.includes('age')) {
            result = 'Name: Alice\nAge: 25'
          }
        } else if (challenge.id === 'loops') {
          // Simulate loop output
          if (code.includes('for') && code.includes('range')) {
            result = '1\n2\n3\n4\n5'
          }
        } else {
          result = 'Code executed successfully!'
        }
        
        setOutput(result)
        
        // Check if output matches expected
        const correct = result.trim() === challenge.expectedOutput.trim()
        setIsCorrect(correct)
        
        if (correct) {
          setTimeout(() => {
            onComplete(challenge)
          }, 1500)
        }
        
      } catch (error) {
        setOutput(`Error: ${error}`)
        setIsCorrect(false)
      }
      
      setIsRunning(false)
    }, 1000)
  }

  const resetCode = () => {
    setCode(challenge.code)
    setOutput('')
    setIsCorrect(null)
  }

  const nextHint = () => {
    if (currentHint < challenge.hints.length - 1) {
      setCurrentHint(currentHint + 1)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-500'
      case 'intermediate': return 'bg-amber-500'
      case 'advanced': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-white">{challenge.title}</h2>
          <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
            {challenge.difficulty}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Challenge Description */}
      <Card className="m-4 bg-slate-700 border-slate-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-slate-300">Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white text-sm">{challenge.description}</p>
          <div className="mt-3 flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="text-amber-400 border-amber-400 hover:bg-amber-400/10"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetCode}
              className="text-slate-400 border-slate-400 hover:bg-slate-400/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hints Panel */}
      {showHints && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mx-4 mb-4"
        >
          <Card className="bg-amber-500/10 border-amber-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-amber-400 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Hint {currentHint + 1} of {challenge.hints.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-100 text-sm">{challenge.hints[currentHint]}</p>
              {currentHint < challenge.hints.length - 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextHint}
                  className="mt-3 text-amber-400 border-amber-400 hover:bg-amber-400/10"
                >
                  Next Hint
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Code Editor */}
      <div className="flex-1 mx-4 mb-4">
        <Card className="h-full bg-slate-900 border-slate-600">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-300">Python Code</CardTitle>
              <Button
                onClick={runCode}
                disabled={isRunning}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-80px)]">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                insertSpaces: true,
                wordWrap: 'on',
                fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace'
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Output Panel */}
      <div className="mx-4 mb-4">
        <Card className="bg-slate-900 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-300 flex items-center">
              Output
              {isCorrect === true && (
                <CheckCircle className="w-4 h-4 ml-2 text-emerald-400" />
              )}
              {isCorrect === false && (
                <XCircle className="w-4 h-4 ml-2 text-red-400" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-24">
              <pre className={`text-sm font-mono ${
                isCorrect === true ? 'text-emerald-400' : 
                isCorrect === false ? 'text-red-400' : 
                'text-slate-300'
              }`}>
                {output || 'Click "Run Code" to see output...'}
              </pre>
            </ScrollArea>
            
            {isCorrect === true && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg"
              >
                <div className="flex items-center text-emerald-400">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Challenge Complete!</span>
                </div>
                <p className="text-emerald-300 text-sm mt-1">
                  Great job! You've earned 50 XP. Moving to next challenge...
                </p>
              </motion.div>
            )}
            
            {isCorrect === false && output && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
              >
                <div className="flex items-center text-red-400">
                  <XCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Not quite right</span>
                </div>
                <p className="text-red-300 text-sm mt-1">
                  Expected: <code className="bg-slate-800 px-1 rounded">{challenge.expectedOutput}</code>
                </p>
                <p className="text-red-300 text-sm">
                  Got: <code className="bg-slate-800 px-1 rounded">{output}</code>
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CodeEditor