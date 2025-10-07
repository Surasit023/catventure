'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const HeroSection = () => {
  const videoRefs = useRef([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { 
    once: false,      // ไม่ trigger ครั้งเดียว จะ trigger ทุกครั้งที่เข้า-ออก viewport
    amount: 0.5,       // trigger เมื่อ 50% ของ element อยู่ใน viewport
    margin: "0px"
  });
  
  const videos = [
    '/video/bg1.mp4',
    '/video/bg2.mp4',
    '/video/bg3.mp4',
    '/video/bg4.mp4',
    '/video/bg5.mp4',
    '/video/bg6.mp4',
    '/video/bg7.mp4'
  ];

  useEffect(() => {
    const currentVideoElement = videoRefs.current[currentVideo];
    if (!currentVideoElement) return;

    const handleEnded = () => {
      currentVideoElement.style.opacity = '0';
      
      const nextVideo = (currentVideo + 1) % videos.length;
      setCurrentVideo(nextVideo);
      
      setTimeout(() => {
        const nextVideoElement = videoRefs.current[nextVideo];
        if (nextVideoElement) {
          nextVideoElement.style.opacity = '1';
          nextVideoElement.currentTime = 0;
          nextVideoElement.play().catch(err => console.log('Video play error:', err));
        }
      }, 500);
    };

    currentVideoElement.addEventListener('ended', handleEnded);

    return () => {
      currentVideoElement.removeEventListener('ended', handleEnded);
    };
  }, [currentVideo, videos.length]);

  return (
    <div id="gameplay" ref={contentRef} className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {videos.map((video, index) => (
          <video
            key={video}
            ref={(el) => (videoRefs.current[index] = el)}
            autoPlay={index === 0}
            muted
            playsInline
            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-4xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.2 
            }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6,
                delay: 0.4,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="inline-block"
            >
              FORGE YOUR LEGEND
            </motion.span>
            <br/>
            
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.7,
                ease: "easeOut"
              }}
              className=""
            >
              IN <span className='bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent ml-0.5'>CATVENTURE</span>
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-200 mb-4 md:mb-8 md:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.6, 
              delay: 1,
              ease: "easeOut" 
            }}
          >
            Summon mystical companions, conquer legendary dungeons,<br/>
            and forge your destiny in the realm of Esontraland
          </motion.p>

          <motion.button 
            className="group relative px-5 md:px-8 py-3 md:py-4 bg-gradient-to-r from-transparent via-blue-600/40 to-transparent text-white font-bold text-sm md:text-lg rounded-full shadow-2xl overflow-visible cursor-pointer transition-all duration-500 backdrop-blur-sm border-2 border-cyan-400/30 hover:border-cyan-400/50 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.6, 
              delay: 1,
              ease: "easeOut" 
            }}
            style={{
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.3), 0 0 60px rgba(147, 51, 234, 0.2), inset 0 0 30px rgba(59, 130, 246, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.4), inset 0 0 0 3px rgba(168, 85, 247, 0.4)'
            }}
          >
            <span className="relative z-10 drop-shadow-[0_2px_8px_rgba(6,182,212,0.8)]">
              START YOUR JOURNEY
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection