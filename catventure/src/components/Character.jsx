'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { characters } from '@/data/characters'

const Character = () => {
  const [currentItem, setCurrentItem] = useState(0)
  const directionRef = useRef(1)
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { 
    once: false,
    amount: 0.5,
    margin: "0px"
  })

  const particles = Array.from({ length: 50 }, (_, i) => ({
    left: (i * 7.3) % 100,
    top: (i * 11.7) % 100,
    duration: 2 + (i % 5) * 0.6,
    delay: (i % 10) * 0.2
  }))

  const nextItem = useCallback(() => {
    directionRef.current = 1
    setCurrentItem((prev) => (prev + 1) % characters.length)
  }, [characters.length])

  const prevItem = useCallback(() => {
    directionRef.current = -1
    setCurrentItem((prev) => (prev - 1 + characters.length) % characters.length)
  }, [characters.length])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevItem()
      if (e.key === 'ArrowRight') nextItem()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [prevItem, nextItem])

  return (
    <div id="characters" className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        {/* Particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 py-12 sm:py-16 lg:py-20 gap-5 lg:gap-4">
        {/* Left Section */}
        <motion.div
          className="flex-1 max-w-md text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            <span className='bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent'>ADVENTURER</span><br />
           OF DESTINY
          </h1>
          <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed px-4 lg:px-0">
            Forge your legend and answer the call to save the realm of Esontraland from eternal darkness
          </p>
        </motion.div>

        {/* Center - Character Display */}
        <div className="flex-1 flex items-center justify-center my-3 lg:my-0">
          <div className="relative">
            {/* Glow Effect - แยกออกมาไม่หายเมื่อเปลี่ยนตัวละคร */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#1488cc] to-[#2b32b2] blur-3xl rounded-full scale-105"
              animate={{
                scale: [1.5, 1.6, 1.5],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Character Image with Direction-based Animation */}
            <AnimatePresence mode="wait" custom={directionRef.current}>
              <motion.div
                key={currentItem}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
                custom={directionRef.current}
                variants={{
                  enter: (direction) => ({
                    opacity: 0,
                    x: direction === 1 ? 100 : -100,
                    scale: 0.8
                  }),
                  center: {
                    opacity: 1,
                    x: 0,
                    scale: 1
                  },
                  exit: (direction) => ({
                    opacity: 0,
                    x: direction === 1 ? -100 : 100,
                    scale: 0.8
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src={characters[currentItem].image}
                    alt={characters[currentItem].name}
                    width={400}
                    height={400}
                    className="object-cover drop-shadow-2xl aspect-square"
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Controls */}
        <motion.div 
          className="relative lg:absolute lg:bottom-10 lg:left-0 lg:right-0 z-20 w-full lg:w-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-6 sm:gap-12">
            {/* Left Arrow */}
           <motion.button
            onClick={prevItem}
            className="relative w-12 h-12 cursor-pointer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="20"
                fill="none"
                stroke="rgba(107, 114, 128, 0.3)"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30">
              <ChevronLeft size={20} className="text-cyan-400" />
            </div>
          </motion.button>

            {/* Circular Progress */}
            <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="rgba(107, 114, 128, 0.2)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={326}
                  initial={{ strokeDashoffset: 326 }}
                  animate={{ strokeDashoffset: 326 - (326 * (currentItem + 1)) / characters.length }}
                  transition={{ duration: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{currentItem + 1}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">of {characters.length}</p>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <motion.button
              onClick={nextItem}
              className="relative w-12 h-12 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="20"
                  fill="none"
                  stroke="rgba(107, 114, 128, 0.3)"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
                <ChevronRight size={20} className="text-blue-400" />
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Section - Character Details */}
        <motion.div
          className="flex-1 max-w-md w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem}
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* <p className="text-yellow-400 text-xs sm:text-sm font-semibold tracking-wider text-center lg:text-left">
                {characters[currentItem].id}
              </p> */}
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide text-center lg:text-left">
                {characters[currentItem].name}
              </h2>
              
              <p className="text-white text-sm sm:text-base leading-relaxed text-center lg:text-left">
                {characters[currentItem].description}
              </p>

              {/* Stats Section */}
              <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-2 border-amber-600/40 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <h3 className="text-xl sm:text-2xl font-medium text-amber-400 mb-3 sm:mb-4 text-center">
                  Stats
                </h3>
                
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-3">
                  {/* Left Side - Bar Stats */}
                  <div className="space-y-2 order-2 sm:order-1">
                    {Object.entries(characters[currentItem].stats).map(([stat, value]) => {
                      const statIcons = {
                        strength: '⚔️',
                        vitality: '❤️',
                        wisdom: '📖',
                        spirit: '✨',
                        agility: '⚡',
                        technique: '🎯',
                        luck: '🍀'
                      }
                      
                      return (
                        <div key={stat} className="flex items-center gap-2">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <span className="text-base">{statIcons[stat]}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-xs sm:text-sm text-gray-300 capitalize">{stat}:</span>
                              <span className="text-xs sm:text-sm text-white font-bold">{value}</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-amber-600 to-orange-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(value / 5) * 100}%` }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Right Side - Radar Chart (Heptagon - 7 sides) */}
                  <div className="flex items-center justify-center order-1 sm:order-2 pt-1">
                    <svg width="140" height="140" viewBox="0 0 150 150" className="w-full max-w-[150px]">
                      {/* Background heptagon grid */}
                      {[1, 2, 3, 4, 5].map((level) => {
                        const points = Array.from({ length: 7 }, (_, i) => {
                          const angle = (Math.PI * 2 * i) / 7 - Math.PI / 2
                          const radius = 60 * (level / 5)
                          return `${75 + radius * Math.cos(angle)},${75 + radius * Math.sin(angle)}`
                        }).join(' ')
                        
                        return (
                          <polygon
                            key={level}
                            points={points}
                            fill="none"
                            stroke="rgba(156, 163, 175, 0.2)"
                            strokeWidth="1"
                          />
                        )
                      })}
                      
                      {/* Axis lines */}
                      {Array.from({ length: 7 }, (_, i) => {
                        const angle = (Math.PI * 2 * i) / 7 - Math.PI / 2
                        const x = 75 + 60 * Math.cos(angle)
                        const y = 75 + 60 * Math.sin(angle)
                        return (
                          <line
                            key={i}
                            x1="75"
                            y1="75"
                            x2={x}
                            y2={y}
                            stroke="rgba(156, 163, 175, 0.3)"
                            strokeWidth="1"
                          />
                        )
                      })}

                      {/* Data polygon */}
                      <motion.polygon
                        points={
                          Object.values(characters[currentItem].stats).map((value, i) => {
                            const angle = (Math.PI * 2 * i) / 7 - Math.PI / 2
                            const radius = 60 * (value / 5)
                            return `${75 + radius * Math.cos(angle)},${75 + radius * Math.sin(angle)}`
                          }).join(' ')
                        }
                        fill="rgba(217, 119, 6, 0.3)"
                        stroke="rgb(217, 119, 6)"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />

                      {/* Labels */}
                      {['Str', 'Vit', 'Wis', 'Spr', 'Agl', 'Tec', 'Luk'].map((label, i) => {
                        const angle = (Math.PI * 2 * i) / 7 - Math.PI / 2
                        const x = 75 + 72 * Math.cos(angle)
                        const y = 75 + 72 * Math.sin(angle)
                        return (
                          <text
                            key={label}
                            x={x}
                            y={y + 3}
                            textAnchor="middle"
                            fill="white"
                            fontSize="10"
                            fontWeight="bold"
                          >
                            {label}
                          </text>
                        )
                      })}
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Character