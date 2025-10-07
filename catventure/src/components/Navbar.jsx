'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ปิด mobile menu เมื่อกดลิงก์
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  // ป้องกันการ scroll เมื่อเปิด mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { href: '#gameplay', label: 'GAMEPLAY' },
    { href: '#characters', label: 'CHARACTERS' },
    { href: '#maps', label: 'MAPS' },
    { href: '#items', label: 'ITEMS' }
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false); // ปิด mobile menu
    
    const target = document.querySelector(href);
    if (target) {
      const offset = 0; // ความสูง navbar
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-51 py-2 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/50 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img 
              src="/image/logo/logo.png" 
              alt="Catventure Logo" 
              className='w-28 h-10 md:w-48 md:h-14 object-cover' 
            />
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.div 
            className="hidden md:flex items-center gap-6 lg:gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navLinks.map((link, index) => (
              <a 
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white hover:text-blue-400 transition-colors duration-300 text-sm font-medium tracking-wide relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </motion.div>

          {/* Mobile Hamburger Button */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            aria-label="Toggle menu"
          >
            <motion.span 
              className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-100"
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-100"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-white transition-all duration-100"
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-64 bg-gradient-to-b from-black to-slate-900 shadow-2xl z-50 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col px-6 pt-20">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white hover:text-blue-400 transition-colors duration-300 text-base font-medium tracking-wide py-4 border-b border-slate-700/50"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Call to Action Button for Mobile */}
                <motion.a
                  href="#start"
                  onClick={handleLinkClick}
                  className="mt-8 bg-gradient-to-r from-[#1488CC] to-[#2B32B2] text-white px-6 py-3 rounded-full font-bold text-sm text-center hover:from-[#0F6BA8] hover:to-[#1A1F8C] transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  START YOUR JOURNEY
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar