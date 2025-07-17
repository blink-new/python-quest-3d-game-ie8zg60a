import React from 'react'
import { motion } from 'framer-motion'
import { Play, CheckCircle, Lock, Star, Clock, Code } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  code: string
  expectedOutput: string
  hints: string[]
}

interface ChallengePanelProps {
  challenges: Challenge[]
  completedChallenges: number
  onStartChallenge: (challenge: Challenge) => void
}

function ChallengePanel({ challenges, completedChallenges, onStartChallenge }: ChallengePanelProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-500'
      case 'intermediate': return 'bg-amber-500'
      case 'advanced': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }

  const getDifficultyStars = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 1
      case 'intermediate': return 2
      case 'advanced': return 3
      default: return 1
    }
  }

  const isUnlocked = (index: number) => {
    return index <= completedChallenges
  }

  const isCompleted = (index: number) => {
    return index < completedChallenges
  }

  const progressPercentage = (completedChallenges / challenges.length) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
          Python Challenges
        </h1>
        <p className="text-slate-400 mb-4">
          Master Python programming through interactive challenges
        </p>
        
        {/* Progress Overview */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold">Overall Progress</span>
              <span className="text-slate-400">{completedChallenges}/{challenges.length} completed</span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-2" />
            <div className="flex justify-between text-sm text-slate-400">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Challenge Grid */}
      <div className="grid gap-4">
        {challenges.map((challenge, index) => {
          const unlocked = isUnlocked(index)
          const completed = isCompleted(index)
          const stars = getDifficultyStars(challenge.difficulty)

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`
                transition-all duration-300 hover:scale-[1.02] cursor-pointer
                ${unlocked ? 'bg-slate-800 border-slate-700 hover:border-blue-500/50' : 'bg-slate-900 border-slate-800'}
                ${completed ? 'ring-2 ring-emerald-500/30' : ''}
              `}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className={`text-lg ${unlocked ? 'text-white' : 'text-slate-500'}`}>
                          {challenge.title}
                        </CardTitle>
                        {completed && (
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        )}
                        {!unlocked && (
                          <Lock className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
                          {challenge.difficulty}
                        </Badge>
                        
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < stars ? 'text-yellow-400 fill-current' : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        
                        <div className="flex items-center text-slate-400 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {challenge.difficulty === 'beginner' ? '5-10 min' : 
                           challenge.difficulty === 'intermediate' ? '10-15 min' : '15-20 min'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className={`text-sm mb-4 ${unlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                    {challenge.description}
                  </p>
                  
                  {/* Challenge Preview */}
                  {unlocked && (
                    <div className="bg-slate-900 rounded-lg p-3 mb-4">
                      <div className="flex items-center text-slate-400 text-xs mb-2">
                        <Code className="w-3 h-3 mr-1" />
                        Preview
                      </div>
                      <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
                        {challenge.code.split('\n').slice(0, 3).join('\n')}
                        {challenge.code.split('\n').length > 3 && '\n...'}
                      </pre>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <span>{challenge.hints.length} hints available</span>
                    </div>
                    
                    <Button
                      onClick={() => unlocked && onStartChallenge(challenge)}
                      disabled={!unlocked}
                      className={`
                        ${completed ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600'}
                        ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}
                        text-white
                      `}
                      size="sm"
                    >
                      {!unlocked ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </>
                      ) : completed ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Review
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Unlock Message */}
      {completedChallenges < challenges.length && (
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <div className="text-blue-400 mb-2">
              <Lock className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">More Challenges Await!</h3>
            </div>
            <p className="text-blue-300 text-sm">
              Complete the current challenge to unlock the next one. 
              Each challenge builds upon the previous concepts.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Completion Celebration */}
      {completedChallenges === challenges.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-emerald-500/30">
            <CardContent className="p-6 text-center">
              <div className="text-emerald-400 mb-4">
                <div className="flex justify-center space-x-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="text-xl font-bold">Congratulations!</h3>
              </div>
              <p className="text-emerald-300 mb-4">
                You've completed all available Python challenges! 
                You're well on your way to becoming a Python master.
              </p>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                View Certificate
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default ChallengePanel