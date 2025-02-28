"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, ArrowUp, ArrowDown, Minus } from 'lucide-react'

const LeaderBoard = () => {
  // Sample leaderboard data with 10 members
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: "Alex Johnson", score: 9850, rank: 1, avatar: "https://randomuser.me/api/portraits/men/1.jpg", change: 2 },
    { id: 2, name: "Morgan Smith", score: 9320, rank: 2, avatar: "https://randomuser.me/api/portraits/women/2.jpg", change: 0 },
    { id: 3, name: "Taylor Wilson", score: 8740, rank: 3, avatar: "https://randomuser.me/api/portraits/men/3.jpg", change: 1 },
    { id: 4, name: "Jordan Lee", score: 7930, rank: 4, avatar: "https://randomuser.me/api/portraits/women/4.jpg", change: -2 },
    { id: 5, name: "Casey Brown", score: 7210, rank: 5, avatar: "https://randomuser.me/api/portraits/men/5.jpg", change: 4 },
    { id: 6, name: "Riley Garcia", score: 6890, rank: 6, avatar: "https://randomuser.me/api/portraits/women/6.jpg", change: -1 },
    { id: 7, name: "Quinn Martinez", score: 6250, rank: 7, avatar: "https://randomuser.me/api/portraits/men/7.jpg", change: 0 },
    { id: 8, name: "Jamie Rodriguez", score: 5840, rank: 8, avatar: "https://randomuser.me/api/portraits/women/8.jpg", change: 3 },
    { id: 9, name: "Drew Anderson", score: 5120, rank: 9, avatar: "https://randomuser.me/api/portraits/men/9.jpg", change: -3 },
    { id: 10, name: "Avery Thompson", score: 4750, rank: 10, avatar: "https://randomuser.me/api/portraits/women/10.jpg", change: -1 }
  ]);

  // Filter states
  const [timeFilter, setTimeFilter] = useState("week")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Handle time filter change - simulate data refresh
  const handleTimeFilterChange = (filter:any) => {
    setIsLoading(true)
    setTimeFilter(filter)
    
    // Shuffle scores slightly to simulate different time periods
    setTimeout(() => {
      setLeaderboardData(prev => {
        const newData = [...prev].map(member => {
          // Adjust score by random amount
          const scoreDelta = Math.floor(Math.random() * 1000) - 400
          return {
            ...member,
            score: Math.max(3000, member.score + scoreDelta)
          }
        })
        
        // Sort by score and update ranks
        return newData
          .sort((a, b) => b.score - a.score)
          .map((member, index) => ({
            ...member,
            rank: index + 1,
            change: member.rank - (index + 1)
          }))
      })
      setIsLoading(false)
    }, 800)
  }

  // Get rank icon based on position
  const getRankIcon = (rank:any) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />
      default:
        return <span className="h-5 w-5 flex items-center justify-center font-mono text-sm">{rank}</span>
    }
  }

  // Get change icon and style based on position change
  const getChangeElement = (change:any) => {
    if (change > 0) {
      return (
        <span className="flex items-center text-green-500 text-xs">
          <ArrowUp size={14} />
          {change}
        </span>
      )
    } else if (change < 0) {
      return (
        <span className="flex items-center text-red-500 text-xs">
          <ArrowDown size={14} />
          {Math.abs(change)}
        </span>
      )
    } else {
      return (
        <span className="flex items-center text-gray-500 text-xs">
          <Minus size={14} />
        </span>
      )
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <div className="min-h-screen mt-10 py-12 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            Meme Masters Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Top meme creators ranked by popularity and engagement
          </p>

          {/* Time period filter */}
          <div className="inline-flex bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
            {["day", "week", "month", "all time"].map((period) => (
              <button
                key={period}
                onClick={() => handleTimeFilterChange(period)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  timeFilter === period
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-2 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850">
            <div className="col-span-1 font-medium text-gray-500 dark:text-gray-400 text-center">#</div>
            <div className="col-span-6 sm:col-span-5 font-medium text-gray-500 dark:text-gray-400">Member</div>
            <div className="col-span-3 sm:col-span-4 font-medium text-gray-500 dark:text-gray-400 text-right">Score</div>
            <div className="col-span-2 font-medium text-gray-500 dark:text-gray-400 text-center">Change</div>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div className="py-32 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {leaderboardData.map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className={`grid grid-cols-12 gap-2 p-4 ${
                    member.rank <= 3 ? "bg-blue-50/50 dark:bg-blue-900/20" : ""
                  } hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex justify-center items-center">
                    {getRankIcon(member.rank)}
                  </div>

                  {/* Member info */}
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                      <img src={member.avatar} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{member.name}</p>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-3 sm:col-span-4 flex items-center justify-end">
                    <div className="font-mono font-medium text-gray-900 dark:text-white">
                      {member.score.toLocaleString()}
                    </div>
                  </div>

                  {/* Change */}
                  <div className="col-span-2 flex items-center justify-center">
                    {getChangeElement(member.change)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          Last updated: February 28, 2025 • Scores update hourly
        </motion.div>
      </div>
    </div>
  )
}

export default LeaderBoard