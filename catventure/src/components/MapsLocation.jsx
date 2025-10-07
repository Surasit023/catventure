'use client'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Swords, MapPin, BarChart, Maximize2, X } from 'lucide-react'
import Image from 'next/image'
import { maps } from '@/data/maps'

const MapsLocation = () => {
  const [currentMap, setCurrentMap] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

  const nextMap = () => {
    setCurrentMap((prev) => (prev + 1) % maps.length)
    setCurrentImage(0)
  }

  const prevMap = () => {
    setCurrentMap((prev) => (prev - 1 + maps.length) % maps.length)
    setCurrentImage(0)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % 5)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + 5) % 5)
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'text-green-400 border-green-400/50',
      'Easy': 'text-blue-400 border-blue-400/50',
      'Medium': 'text-yellow-400 border-yellow-400/50',
      'Hard': 'text-orange-400 border-orange-400/50',
      'Legendary': 'text-purple-400 border-purple-400/50'
    }
    return colors[difficulty] || 'text-gray-400 border-gray-400/50'
  }

  return (
    <div id="maps" className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden pt-10 sm:pt-20 pb-8 sm:pb-10">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => ( 
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${particle.left}%`,  
              top: `${particle.top}%`,    
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,  
              repeat: Infinity,
              delay: particle.delay,        
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-10 sm:mb-12 lg:mb-16 relative z-10 pt-3 sm:pt-5 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
          EXPLORE THE <br/>
          <span className="inline-block bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">
            REALM
          </span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
          Journey through 5 legendary maps and conquer the darkness
        </p>
      </motion.div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMap}
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center"
          >
            {/* Left Side - Images */}
            <div className="relative w-full max-w-full min-w-0">
              {/* Main Image Display */}
              <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute top-2 right-2 z-30 p-1.5 sm:p-2 bg-black/70 cursor-pointer backdrop-blur-sm rounded-lg border border-white/20 hover:bg-black/90 hover:scale-110 transition-all"
                >
                  <Maximize2 size={18} className="text-white sm:w-5 sm:h-5" />
                </button>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={maps[currentMap].images[currentImage]}
                      alt={maps[currentMap].name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Image Navigation */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4">
                  <button
                    onClick={prevImage}
                    className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition cursor-pointer"
                  >
                    <ChevronLeft size={16} className="text-white sm:w-5 sm:h-5" />
                  </button>
                  
                  <div className="flex gap-1.5 sm:gap-2 items-center">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                          currentImage === index
                            ? 'bg-blue-400 w-6 sm:w-8'
                            : 'bg-white/50 hover:bg-white/70 cursor-pointer'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextImage}
                    className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition cursor-pointer"
                  >
                    <ChevronRight size={16} className="text-white sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Preview */}
              <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4 overflow-x-auto pb-2">
                {maps[currentMap].images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition ${
                      currentImage === index
                        ? 'border-blue-400'
                        : 'border-white/20 hover:border-white/50 cursor-pointer'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${maps[currentMap].name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Information */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <MapPin className="text-blue-400" size={20} />
                  <span className="text-blue-400 text-xs sm:text-sm font-semibold">
                    MAP {maps[currentMap].id} OF {maps.length}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {maps[currentMap].name}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 italic">
                  {maps[currentMap].subtitle}
                </p>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                {maps[currentMap].description}
              </p>

              {/* Stats */}
              <div className="flex flex-row gap-3 sm:gap-4">
                <div className={`px-3 sm:px-4 py-2 rounded-lg border-2 ${getDifficultyColor(maps[currentMap].difficulty)} bg-black/30 backdrop-blur-sm`}>
                  <div className="flex items-center gap-2">
                    <Swords size={18} className="sm:w-5 sm:h-5" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-300">Difficulty</p>
                      <p className="text-sm sm:text-base font-bold">{maps[currentMap].difficulty}</p>
                    </div>
                  </div>
                </div>

                <div className="px-3 sm:px-4 py-2 rounded-lg border-2 border-cyan-400/50 text-cyan-400 bg-black/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <BarChart size={18} className="sm:w-5 sm:h-5" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-300">Level Range</p>
                      <p className="text-sm sm:text-base font-bold">{maps[currentMap].level}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-amber-400 font-semibold mb-2 sm:mb-3 text-base sm:text-lg">
                  Key Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {maps[currentMap].features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-600/40 rounded-full text-amber-300 text-xs sm:text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Map Navigation */}
        <motion.div
          className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-5 pb-10 sm:mt-12 lg:mt-16 lg:pb-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Left Arrow */}
          <motion.button
            onClick={prevMap}
            className="relative w-10 h-10 sm:w-12 sm:h-12 cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.1 }}
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
              <ChevronLeft size={18} className="text-cyan-400 sm:w-5 sm:h-5" />
            </div>
          </motion.button>

          {/* Map Indicators */}
          <div className="flex gap-2 sm:gap-3">
            {/* Mobile version - แสดงเฉพาะบางปุ่ม */}
            <div className="flex gap-2 sm:hidden">
              {/* แสดง current - 1 ถ้ามี */}
              {currentMap > 0 && (
                <button
                  onClick={() => {
                    setCurrentMap(currentMap - 1)
                    setCurrentImage(0)
                  }}
                  className="relative group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg border-2 border-gray-600 bg-gray-800/30 hover:border-gray-400 transition-all">
                    <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                      {currentMap}
                    </span>
                  </div>
                </button>
              )}
              
              {/* Current map */}
              <button className="relative group cursor-pointer">
                <div className="w-8 h-8 rounded-lg border-2 border-blue-400 bg-blue-500/30 scale-110 transition-all">
                  <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                    {currentMap + 1}
                  </span>
                </div>
              </button>
              
              {/* แสดง current + 1 ถ้ามี */}
              {currentMap < maps.length - 1 && (
                <button
                  onClick={() => {
                    setCurrentMap(currentMap + 1)
                    setCurrentImage(0)
                  }}
                  className="relative group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg border-2 border-gray-600 bg-gray-800/30 hover:border-gray-400 transition-all">
                    <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                      {currentMap + 2}
                    </span>
                  </div>
                </button>
              )}
              
              {/* Dots indicator ถ้ามีอีกหลายตัว */}
              {currentMap < maps.length - 2 && (
                <div className="flex items-center justify-center px-2">
                  <span className="text-gray-400 font-bold">...</span>
                </div>
              )}
            </div>

            {/* Desktop version - แสดงทั้งหมด */}
            <div className="hidden sm:flex gap-3">
              {maps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentMap(index)
                    setCurrentImage(0)
                  }}
                  className="relative group cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      currentMap === index
                        ? 'border-blue-400 bg-blue-500/30 scale-110'
                        : 'border-gray-600 bg-gray-800/30 hover:border-gray-400'
                    }`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-white text-base font-bold">
                      {index + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={nextMap}
            className="relative w-10 h-10 sm:w-12 sm:h-12 cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.1 }}
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
              <ChevronRight size={18} className="text-blue-400 sm:w-5 sm:h-5" />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            >
              <X size={24} className="text-white sm:w-7 sm:h-7" />
            </button>

            {/* Image Navigation in Fullscreen */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-2 sm:left-4 lg:left-6 z-[110] p-2 sm:p-3 lg:p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            >
              <ChevronLeft size={24} className="text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-2 sm:right-4 lg:right-6 z-[110] p-2 sm:p-3 lg:p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            >
              <ChevronRight size={24} className="text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </button>

            {/* Fullscreen Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full rounded-lg overflow-hidden"
                >
                  <Image
                    src={maps[currentMap].images[currentImage]}
                    alt={maps[currentMap].name}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-16 sm:bottom-5 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/70 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-white text-sm sm:text-base font-semibold">
                {currentImage + 1} / 5
              </span>
            </div>

            {/* Image Dots */}
            <div className="absolute bottom-30 sm:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImage(index)
                  }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                    currentImage === index
                      ? 'bg-blue-400 w-6 sm:w-8'
                      : 'bg-white/50 hover:bg-white/70 cursor-pointer'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MapsLocation