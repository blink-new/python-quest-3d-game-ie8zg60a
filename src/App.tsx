import React, { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Trophy, Code, Map, User, Play } from 'lucide-react'
import './App.css'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  code: string
  expectedOutput: string
  hints: string[]
}

function App() {
  const [activeView, setActiveView] = useState<'world' | 'challenges' | 'progress'>('world')
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState(0)
  const [experience, setExperience] = useState(50)
  const [currentLevel, setCurrentLevel] = useState(1)

  const challenges: Challenge[] = [
    {
      id: 'hello-world',
      title: 'Hello Python World!',
      description: 'Write your first Python program to print "Hello, World!"',
      difficulty: 'beginner',
      code: '# Write your code here\\n',
      expectedOutput: 'Hello, World!',
      hints: [
        'Use the print() function to display text',
        'Put your text inside quotes: "Hello, World!"',
        'The complete line should be: print("Hello, World!")'
      ]
    },
    {
      id: 'variables',
      title: 'Variables and Data Types',
      description: 'Create variables and perform basic operations',
      difficulty: 'beginner',
      code: '# Create a variable called name with your name\\n# Create a variable called age with your age\\n# Print both variables\\n',
      expectedOutput: 'Name: Alice\\nAge: 25',
      hints: [
        'Create variables using the = operator',
        'Use print() to display variable values',
        'You can combine text and variables in print statements'
      ]
    },
    {
      id: 'loops',
      title: 'For Loops Adventure',
      description: 'Use a for loop to count from 1 to 5',
      difficulty: 'intermediate',
      code: '# Write a for loop that prints numbers 1 to 5\\n',
      expectedOutput: '1\\n2\\n3\\n4\\n5',
      hints: [
        'Use the range() function to create a sequence of numbers',
        'range(1, 6) creates numbers from 1 to 5',
        'Use a for loop: for i in range(1, 6):'
      ]
    }
  ]

  const handleChallengeSelect = (challenge: Challenge) => {
    setCurrentChallenge(challenge)
    setShowCodeEditor(true)
  }

  const handleChallengeComplete = (challenge: Challenge) => {
    setCompletedChallenges(prev => prev + 1)
    setExperience(prev => prev + 50)
    if (experience + 50 >= currentLevel * 100) {
      setCurrentLevel(prev => prev + 1)
    }
    setShowCodeEditor(false)
    setCurrentChallenge(null)
  }

  const handleCloseEditor = () => {
    setShowCodeEditor(false)
    setCurrentChallenge(null)
  }

  return (
    <div className="h-screen bg-slate-900 text-white overflow-hidden">
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Python Quest 3D
            </h1>
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
              Level {currentLevel}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">{experience} XP</span>
            </div>
            <Button
              variant={activeView === 'world' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('world')}
              className="text-white"
            >
              <Map className="w-4 h-4 mr-2" />
              World
            </Button>
            <Button
              variant={activeView === 'challenges' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('challenges')}
              className="text-white"
            >
              <Code className="w-4 h-4 mr-2" />
              Challenges
            </Button>
            <Button
              variant={activeView === 'progress' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('progress')}
              className="text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Progress
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 h-full">
        {activeView === 'world' && (
          <div className="h-full flex items-center justify-center">
            <Card className="bg-slate-800 border-slate-700 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-2xl bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Welcome to Python Quest 3D!
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-slate-300">
                  Embark on an interactive journey to master Python programming through gamified challenges.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {challenges.map((challenge, index) => (
                    <Card key={challenge.id} className="bg-slate-700 border-slate-600 hover:border-blue-500/50 transition-colors cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                          challenge.difficulty === 'beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                          challenge.difficulty === 'intermediate' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          <Code className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-white mb-2">{challenge.title}</h3>
                        <p className="text-sm text-slate-400 mb-3">{challenge.description}</p>
                        <Badge className={`${
                          challenge.difficulty === 'beginner' ? 'bg-emerald-500' :
                          challenge.difficulty === 'intermediate' ? 'bg-amber-500' :
                          'bg-red-500'
                        } text-white`}>
                          {challenge.difficulty}
                        </Badge>
                        <Button 
                          className="w-full mt-3 bg-blue-500 hover:bg-blue-600"
                          onClick={() => handleChallengeSelect(challenge)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Challenge
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Your Progress</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Level {currentLevel}</span>
                    <span className="text-slate-300">{experience} XP</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((experience % 100) / 100) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {completedChallenges}/{challenges.length} challenges completed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'challenges' && (
          <div className="h-full p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Python Challenges
              </h2>
              <div className="grid gap-4">
                {challenges.map((challenge, index) => (
                  <Card key={challenge.id} className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{challenge.title}</CardTitle>
                        <Badge className={`${
                          challenge.difficulty === 'beginner' ? 'bg-emerald-500' :
                          challenge.difficulty === 'intermediate' ? 'bg-amber-500' :
                          'bg-red-500'
                        } text-white`}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 mb-4">{challenge.description}</p>
                      <Button 
                        onClick={() => handleChallengeSelect(challenge)}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Challenge
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'progress' && (
          <div className="h-full p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Your Progress
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-white">{currentLevel}</h3>
                    <p className="text-slate-400">Current Level</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <Code className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-white">{experience}</h3>
                    <p className="text-slate-400">Total XP</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <User className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-white">{completedChallenges}</h3>
                    <p className="text-slate-400">Challenges Completed</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Progress to Level {currentLevel + 1}</span>
                      <span className="text-slate-300">{experience % 100}/100 XP</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${((experience % 100) / 100) * 100}%` }}
                      />
                    </div>
                    <p className="text-slate-400 text-sm">
                      {100 - (experience % 100)} XP needed for next level
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Code Editor Modal - Simplified for now */}
      {showCodeEditor && currentChallenge && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{currentChallenge.title}</CardTitle>
                <Button variant="ghost" onClick={handleCloseEditor}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">{currentChallenge.description}</p>
              <div className="bg-slate-900 rounded-lg p-4 mb-4">
                <pre className="text-emerald-400 font-mono text-sm">
                  {currentChallenge.code}
                </pre>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={() => handleChallengeComplete(currentChallenge)}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Complete Challenge
                </Button>
                <Button variant="outline" onClick={handleCloseEditor}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default App