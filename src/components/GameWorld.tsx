import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box, Sphere } from '@react-three/drei'
import { Mesh } from 'three'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  code: string
  expectedOutput: string
  hints: string[]
}

interface GameWorldProps {
  challenges: Challenge[]
  onChallengeSelect: (challenge: Challenge) => void
  playerPosition: [number, number, number]
}

function ChallengeOrb({ 
  challenge, 
  position, 
  onClick 
}: { 
  challenge: Challenge
  position: [number, number, number]
  onClick: () => void 
}) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  const getOrbColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10B981'
      case 'intermediate': return '#F59E0B'
      case 'advanced': return '#EF4444'
      default: return '#3B82F6'
    }
  }

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.5, 16, 16]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <meshStandardMaterial 
          color={getOrbColor(challenge.difficulty)}
          emissive={getOrbColor(challenge.difficulty)}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      <Text
        position={[0, 1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {challenge.title}
      </Text>
      
      <Text
        position={[0, -1, 0]}
        fontSize={0.2}
        color={getOrbColor(challenge.difficulty)}
        anchorX="center"
        anchorY="middle"
      >
        {challenge.difficulty.toUpperCase()}
      </Text>
    </group>
  )
}

function GameWorld({ challenges, onChallengeSelect }: GameWorldProps) {
  return (
    <>
      {/* Ground plane */}
      <Box args={[20, 0.1, 20]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#1e293b" />
      </Box>

      {/* Simple grid pattern */}
      {Array.from({ length: 11 }).map((_, i) => (
        <group key={`grid-${i}`}>
          <Box args={[0.02, 0.02, 20]} position={[-10 + i * 2, -0.95, 0]}>
            <meshBasicMaterial color="#334155" transparent opacity={0.3} />
          </Box>
          <Box args={[20, 0.02, 0.02]} position={[0, -0.95, -10 + i * 2]}>
            <meshBasicMaterial color="#334155" transparent opacity={0.3} />
          </Box>
        </group>
      ))}

      {/* Central Python logo - simplified */}
      <group position={[0, 1, 0]}>
        <Box args={[1, 1, 0.2]} position={[-0.3, 0.3, 0]}>
          <meshStandardMaterial color="#3776ab" />
        </Box>
        <Box args={[1, 1, 0.2]} position={[0.3, -0.3, 0]}>
          <meshStandardMaterial color="#ffd43b" />
        </Box>
      </group>

      {/* Challenge orbs positioned around the world */}
      {challenges.map((challenge, index) => {
        const angle = (index / challenges.length) * Math.PI * 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <ChallengeOrb
            key={challenge.id}
            challenge={challenge}
            position={[x, 1, z]}
            onClick={() => onChallengeSelect(challenge)}
          />
        )
      })}

      {/* Welcome text */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.8}
        color="#3B82F6"
        anchorX="center"
        anchorY="middle"
      >
        Welcome to Python Quest!
      </Text>

      <Text
        position={[0, 3.2, 0]}
        fontSize={0.3}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
      >
        Click on the glowing orbs to start coding challenges
      </Text>
    </>
  )
}

export default GameWorld