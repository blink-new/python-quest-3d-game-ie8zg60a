import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Target, Zap, Code, Clock, Award, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'

interface GameState {
  currentLevel: number
  experience: number
  completedChallenges: number
  currentChallenge: any
  showCodeEditor: boolean
  playerPosition: [number, number, number]
}

interface ProgressHUDProps {
  gameState: GameState
}

function ProgressHUD({ gameState }: ProgressHUDProps) {
  const experienceToNextLevel = gameState.currentLevel * 100
  const currentLevelProgress = ((gameState.experience % 100) / 100) * 100
  
  const achievements = [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Complete your first Python challenge',
      icon: Star,
      unlocked: gameState.completedChallenges >= 1,
      progress: Math.min(gameState.completedChallenges, 1)
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Complete 3 challenges',
      icon: Target,
      unlocked: gameState.completedChallenges >= 3,
      progress: Math.min(gameState.completedChallenges / 3, 1)
    },
    {
      id: 'code-warrior',
      title: 'Code Warrior',
      description: 'Reach level 3',
      icon: Zap,
      unlocked: gameState.currentLevel >= 3,
      progress: Math.min(gameState.currentLevel / 3, 1)
    },
    {
      id: 'python-master',
      title: 'Python Master',
      description: 'Complete all beginner challenges',
      icon: Award,
      unlocked: gameState.completedChallenges >= 5,
      progress: Math.min(gameState.completedChallenges / 5, 1)
    }
  ]

  const stats = [
    {
      label: 'Current Level',
      value: gameState.currentLevel,
      icon: Trophy,
      color: 'text-yellow-400'
    },
    {
      label: 'Total XP',
      value: gameState.experience,
      icon: Star,
      color: 'text-blue-400'
    },
    {
      label: 'Challenges Completed',
      value: gameState.completedChallenges,
      icon: Target,
      color: 'text-emerald-400'
    },
    {
      label: 'Time Coding',
      value: '2h 15m',
      icon: Clock,
      color: 'text-purple-400'
    }
  ]

  const skillProgress = [
    { skill: 'Variables & Data Types', progress: 85, color: 'bg-emerald-500' },
    { skill: 'Control Flow', progress: 60, color: 'bg-blue-500' },
    { skill: 'Functions', progress: 30, color: 'bg-amber-500' },
    { skill: 'Object-Oriented Programming', progress: 10, color: 'bg-red-500' },
    { skill: 'Error Handling', progress: 5, color: 'bg-purple-500' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
          Your Progress
        </h1>
        <p className="text-slate-400">
          Track your Python learning journey
        </p>
      </div>

      {/* Level Progress */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            Level {gameState.currentLevel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Progress to Level {gameState.currentLevel + 1}</span>
              <span className="text-slate-300">{gameState.experience % 100}/100 XP</span>
            </div>
            <Progress value={currentLevelProgress} className="h-3" />
            <p className="text-slate-400 text-sm">
              {100 - (gameState.experience % 100)} XP needed for next level
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Skill Progress */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
            Skill Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillProgress.map((skill, index) => (
            <motion.div
              key={skill.skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{skill.skill}</span>
                <span className="text-slate-400">{skill.progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${skill.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Award className="w-5 h-5 mr-2 text-yellow-400" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 rounded-lg border transition-all duration-300
                  ${achievement.unlocked 
                    ? 'bg-emerald-500/20 border-emerald-500/30' 
                    : 'bg-slate-700/50 border-slate-600'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-2 rounded-full
                    ${achievement.unlocked 
                      ? 'bg-emerald-500/30 text-emerald-400' 
                      : 'bg-slate-600 text-slate-400'
                    }
                  `}>
                    <achievement.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      achievement.unlocked ? 'text-white' : 'text-slate-400'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-emerald-300' : 'text-slate-500'
                    }`}>
                      {achievement.description}
                    </p>
                    {!achievement.unlocked && achievement.progress < 1 && (
                      <div className="mt-2">
                        <Progress 
                          value={achievement.progress * 100} 
                          className="h-1" 
                        />
                      </div>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-emerald-500 text-white">
                      Unlocked
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Code className="w-5 h-5 mr-2 text-blue-400" />
            Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-white font-semibold">Python Basics</h4>
                <p className="text-emerald-400 text-sm">Completed</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="text-white font-semibold">Control Structures</h4>
                <p className="text-blue-400 text-sm">In Progress</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-slate-400 text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="text-slate-400 font-semibold">Functions & Modules</h4>
                <p className="text-slate-500 text-sm">Locked</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-slate-400 text-sm font-bold">
                4
              </div>
              <div>
                <h4 className="text-slate-400 font-semibold">Object-Oriented Programming</h4>
                <p className="text-slate-500 text-sm">Locked</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProgressHUD