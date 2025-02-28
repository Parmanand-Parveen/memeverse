"use client"

import { fetchMeme } from '@/Store/slices/MemeSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Explore = () => {
  const dispatch = useDispatch()
  const { memes } = useSelector((state: any) => state.memes)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMemes, setFilteredMemes] = useState([])
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const memesPerPage = 10

  useEffect(() => {
    dispatch(fetchMeme())
  }, [dispatch])

  useEffect(() => {
    if (memes) {
      setFilteredMemes(
        memes.filter((meme: any) => 
          meme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (meme.description && meme.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      )
      setCurrentPage(1) // Reset to first page on new search
    }
  }, [searchTerm, memes])

  // Get current memes for the page
  const indexOfLastMeme = currentPage * memesPerPage
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage
  const currentMemes = filteredMemes.slice(indexOfFirstMeme, indexOfLastMeme)
  const totalPages = Math.ceil(filteredMemes.length / memesPerPage)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  }
  
  const router = useRouter() 
 

  // Page change handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen mt-10 bg-gray-50 dark:bg-gray-950 px-4 py-8">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8 sticky top-4 z-10">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search memes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Memes Grid */}
      <motion.div 
        key={currentPage} // Re-animate when page changes
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {currentMemes.length > 0 ? (
          currentMemes.map((meme: any) => (
            <motion.div
            onClick={()=> router.push(`/meme/details/${meme.id}`)}
              key={meme.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800"
            >
              <div className="relative h-64 w-full bg-gray-200 dark:bg-gray-800">
                {meme.example?.url && (
                  <img
                    src={meme.example.url}
                    alt={meme.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{meme.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {meme.description ? meme.description : "No description"}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {memes.length > 0 ? "No memes found matching your search." : "Loading memes..."}
            </p>
          </div>
        )}
      </motion.div>

      {/* Pagination Controls */}
      {filteredMemes.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center mt-12 space-x-2"
        >
          <button 
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-md flex items-center justify-center ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => {
              // Show current page, first, last, and one page on either side of current
              if (
                number === 1 || 
                number === totalPages || 
                (number >= currentPage - 1 && number <= currentPage + 1)
              ) {
                return (
                  <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      number === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {number}
                  </button>
                )
              } else if (
                (number === 2 && currentPage > 3) || 
                (number === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return <span key={number} className="w-8 h-8 flex items-center justify-center">...</span>
              }
              return null
            })}
          </div>
          
          <button 
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md flex items-center justify-center ${
              currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      )}
      
      {/* Page indicator */}
      {filteredMemes.length > 0 && (
        <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages} ({filteredMemes.length} total memes)
        </div>
      )}
    </div>
  )
}

export default Explore