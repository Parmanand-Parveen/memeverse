"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, RefreshCw } from 'lucide-react'

const NotFound = () => {
  // Random meme selection logic
  const [selectedMeme, setSelectedMeme] = React.useState(0)
  
  // Meme content options
  const memes = [
    {
      title: "404: Reality Not Found",
      image: "/api/placeholder/500/300", // Replace with actual meme image
      caption: "Me looking for the page that was supposed to be here",
      altText: "Confused John Travolta meme looking around"
    },
    {
      title: "404: Brain.exe Stopped Working",
      image: "/api/placeholder/500/300", // Replace with actual meme image
      caption: "Server trying to find the page you requested",
      altText: "Confused math lady meme with calculations"
    },
    {
      title: "404: Page Has Left the Chat",
      image: "/api/placeholder/500/300", // Replace with actual meme image
      caption: "The page you're looking for is in another castle",
      altText: "Surprised Pikachu meme"
    },
    {
      title: "404: Not the Page You're Looking For",
      image: "/api/placeholder/500/300", // Replace with actual meme image
      caption: "These aren't the URLs you're looking for",
      altText: "Obi-Wan Kenobi mind trick meme"
    }
  ]

  // Random floating elements for background effect
  const floatingElements = [
    { icon: "🤔", delay: 0 },
    { icon: "❓", delay: 0.5 },
    { icon: "🔍", delay: 1 },
    { icon: "💻", delay: 1.5 },
    { icon: "🤷‍♂️", delay: 2 },
    { icon: "👾", delay: 2.5 },
    { icon: "404", delay: 3 },
    { icon: "🚫", delay: 3.5 },
  ]

  // Select a random meme on component mount
  useEffect(() => {
    setSelectedMeme(Math.floor(Math.random() * memes.length))
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  }

  const floatingVariants = {
    animate: (i:any) => ({
      y: [0, -15, 0],
      x: [0, i % 2 === 0 ? 10 : -10, 0],
      rotate: [0, i % 2 === 0 ? 10 : -10, 0],
      transition: {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.2
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden relative px-4 py-16">
      {/* Floating background elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={floatingVariants}
          animate="animate"
          className="absolute text-3xl md:text-4xl opacity-10 dark:opacity-20 select-none"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
        >
          {el.icon}
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="p-4 md:p-6 bg-blue-500 dark:bg-blue-600 text-white"
        >
          <h1 className="text-2xl md:text-3xl font-bold">{memes[selectedMeme].title}</h1>
        </motion.div>

        <div className="p-4 md:p-6">
          <motion.div 
            variants={itemVariants}
            className="mb-6 rounded-lg overflow-hidden border-4 border-gray-200 dark:border-gray-700"
          >
            <img 
              src={memes[selectedMeme].image} 
              alt={memes[selectedMeme].altText}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="text-center mb-6"
          >
            <p className="text-lg md:text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
              {memes[selectedMeme].caption}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              We've looked everywhere, but this page is playing hide and seek champion!
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-5 py-3 flex items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
              >
                <Home size={18} />
                <span>Go Home</span>
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMeme(Math.floor(Math.random() * memes.length))}
              className="w-full px-5 py-3 flex items-center justify-center gap-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium transition-colors"
            >
              <RefreshCw size={18} />
              <span>Different Meme</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound