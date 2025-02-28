"use client"

import { fetchMeme } from '@/Store/slices/MemeSlice'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, BookmarkPlus, ThumbsUp, Download, Check } from 'lucide-react'

const Details = () => {
    const { id } = useParams()
    const router = useRouter()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [isDownloading, setIsDownloading] = useState(false)
    const [downloadSuccess, setDownloadSuccess] = useState(false)
    
    const { memes } = useSelector((state: any) => state.memes)
    
    useEffect(() => {
        dispatch(fetchMeme())
        // Add a small delay to ensure loading animation is visible
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [dispatch])
    
    // Find the meme with matching id
    const meme = memes.find((meme: any) => meme.id === id)
    
    // Reset download success message after 3 seconds
    useEffect(() => {
        if (downloadSuccess) {
            const timer = setTimeout(() => {
                setDownloadSuccess(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [downloadSuccess])
    
    // Variants for animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    }
    
    const handleGoBack = () => {
        router.back()
    }
    
    const handleDownload = async () => {
        if (!meme?.example?.url) return
        
        try {
            setIsDownloading(true)
            
            // Fetch the image
            const response = await fetch(meme.example.url)
            const blob = await response.blob()
            
            // Create a URL for the blob
            const blobUrl = URL.createObjectURL(blob)
            
            // Create a temporary link element
            const link = document.createElement('a')
            link.href = blobUrl
            
            // Set the filename - use meme name or fallback to 'meme'
            const fileExtension = meme.example.url.split('.').pop()?.split('?')[0] || 'jpg'
            const fileName = `${meme.name || 'meme'}.${fileExtension}`
            link.download = fileName
            
            // Append to the document, click it, and clean up
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            
            // Clean up the blob URL
            URL.revokeObjectURL(blobUrl)
            
            // Show success message
            setDownloadSuccess(true)
        } catch (error) {
            console.error('Download failed:', error)
        } finally {
            setIsDownloading(false)
        }
    }
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }
    
    if (!meme) {
        return (
            <div className="flex flex-col mt-10 items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md"
                >
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Meme Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">The meme you're looking for doesn't exist or may have been removed.</p>
                    <button 
                        onClick={handleGoBack}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Explore
                    </button>
                </motion.div>
            </div>
        )
    }
    
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-gray-50 mt-10 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8"
        >
            {/* Back button */}
            <motion.button
                variants={itemVariants}
                onClick={handleGoBack}
                className="mb-6 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center text-gray-700 dark:text-gray-200"
            >
                <ArrowLeft size={18} className="mr-2" />
                Back to Explore
            </motion.button>
            
            {/* Download success message */}
            {downloadSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center"
                >
                    <Check size={18} className="mr-2" />
                    Meme downloaded successfully!
                </motion.div>
            )}
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Meme image section */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
                >
                    <div className="relative w-full h-auto min-h-96 bg-gray-200 dark:bg-gray-700">
                        {meme.example?.url ? (
                            <img 
                                src={meme.example.url} 
                                alt={meme.name} 
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-96">
                                <p className="text-gray-500 dark:text-gray-400">No image available</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Download button overlay */}
                    {meme.example?.url && (
                        <div className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className={`w-full py-2 rounded-md flex items-center justify-center transition-colors ${
                                    isDownloading 
                                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                            >
                                {isDownloading ? (
                                    <>
                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                        Downloading...
                                    </>
                                ) : (
                                    <>
                                        <Download size={18} className="mr-2" />
                                        Download Meme
                                    </>
                                )}
                            </motion.button>
                        </div>
                    )}
                </motion.div>
                
                {/* Meme info section */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{meme.name}</h1>
                    
                    {meme.description && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Description</h2>
                            <p className="text-gray-600 dark:text-gray-300">{meme.description}</p>
                        </div>
                    )}
                    
                    {/* Additional meme details */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                                <span className="text-sm text-gray-500 dark:text-gray-400">ID</span>
                                <p className="text-gray-800 dark:text-gray-200 font-medium truncate">{meme.id}</p>
                            </div>
                            {meme.year && (
                                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Year</span>
                                    <p className="text-gray-800 dark:text-gray-200 font-medium">{meme.year}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <ThumbsUp size={18} className="mr-2" />
                            Like
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            <Share2 size={18} className="mr-2" />
                            Share
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            <BookmarkPlus size={18} className="mr-2" />
                            Save
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Details