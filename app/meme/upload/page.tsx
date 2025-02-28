"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Moon, Sun, Download, Upload as UploadIcon, Type, Image as ImageIcon, Smile } from 'lucide-react'

const Upload = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [memeText, setMemeText] = useState({ top: '', bottom: '' })
  const [textColor, setTextColor] = useState('#ffffff')
  const [fontSize, setFontSize] = useState(32)
  const [textStroke, setTextStroke] = useState(true)
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
    
    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e:any) => setDarkMode(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      
      return () => URL.revokeObjectURL(url)
    }
  }, [file])
  
  useEffect(() => {
    if (previewUrl) {
      drawMemeCanvas()
    }
  }, [previewUrl, memeText, textColor, fontSize, textStroke])
  
  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setError('')
      setSuccess(false)
    } else {
      setError('Please select an image file')
    }
  }
  
  const drawMemeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate aspect ratio to fit within canvas
      const ratio = Math.min(canvas.width / img.width, canvas.height / img.height)
      const centerX = (canvas.width - img.width * ratio) / 2
      const centerY = (canvas.height - img.height * ratio) / 2
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw image
      ctx.drawImage(img, centerX, centerY, img.width * ratio, img.height * ratio)
      
      // Configure text
      ctx.textAlign = 'center'
      ctx.font = `bold ${fontSize}px Impact, sans-serif`
      ctx.fillStyle = textColor
      
      // Draw top text
      if (memeText.top) {
        if (textStroke) {
          ctx.strokeStyle = '#000'
          ctx.lineWidth = fontSize / 8
          ctx.strokeText(memeText.top, canvas.width / 2, 50)
        }
        ctx.fillText(memeText.top, canvas.width / 2, 50)
      }
      
      // Draw bottom text
      if (memeText.bottom) {
        if (textStroke) {
          ctx.strokeText(memeText.bottom, canvas.width / 2, canvas.height - 20)
        }
        ctx.fillText(memeText.bottom, canvas.width / 2, canvas.height - 20)
      }
    }
    
    img.src = previewUrl
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file) {
      setError('Please select a file first')
      return
    }
    
    setUploading(true)
    setProgress(0)
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10
          if (newProgress >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return newProgress
        })
      }, 500)
      
      // Here you would normally upload the file to your server or cloud storage
      // For example using fetch or axios with FormData
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      clearInterval(progressInterval)
      setProgress(100)
      setSuccess(true)
    } catch (err) {
      setError('Upload failed. Please try again.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }
  
  const downloadMeme = () => {
    if (!canvasRef.current) return
    
    const link = document.createElement('a')
    link.download = 'my-meme.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }
  
  return (
    <div className={`transition-colors duration-300 mt-15 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center flex-1">Meme Creator</h2>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Upload and Preview */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-lg transition-colors duration-300`}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ImageIcon className="mr-2" size={20} />
              Upload Image
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                    darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:bg-gray-50'
                  }`} 
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <input 
                    type="file" 
                    id="file-input" 
                    className="hidden" 
                    onChange={handleFileChange}
                    disabled={uploading}
                    accept="image/*"
                  />
                  {previewUrl ? (
                    <div className="overflow-hidden rounded">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-h-40 mx-auto object-contain animate-fade-in"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <UploadIcon className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Drag and drop an image or click to browse</p>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>Maximum file size: 5MB</p>
                    </div>
                  )}
                </div>
              </div>
              
              {error && <p className="text-red-500 mb-4 animate-bounce">{error}</p>}
              {success && <p className="text-green-500 mb-4">File uploaded successfully!</p>}
              
              {uploading && (
                <div className="mb-4">
                  <div className={`h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-2">{progress}% uploaded</p>
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                disabled={uploading || !file}
              >
                {uploading ? 'Uploading...' : 'Upload Meme'}
              </button>
            </form>
          </div>
          
          {/* Right column - Meme Editor */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-lg transition-colors duration-300`}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Type className="mr-2" size={20} />
              Edit Meme
            </h3>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Top Text</label>
              <input
                type="text"
                className={`w-full p-2 rounded border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
                placeholder="Top text"
                value={memeText.top}
                onChange={(e) => setMemeText({...memeText, top: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Bottom Text</label>
              <input
                type="text"
                className={`w-full p-2 rounded border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
                placeholder="Bottom text"
                value={memeText.bottom}
                onChange={(e) => setMemeText({...memeText, bottom: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Text Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-8 w-8 border-0 rounded cursor-pointer"
                  />
                  <span className="ml-2 text-sm">{textColor}</span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Font Size</label>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm">{fontSize}px</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={textStroke}
                  onChange={(e) => setTextStroke(e.target.checked)}
                  className="mr-2 h-4 w-4"
                />
                <span className="text-sm font-medium">Add text outline</span>
              </label>
            </div>
            
            <button 
              onClick={downloadMeme}
              disabled={!previewUrl}
              className={`w-full py-2 px-4 mb-4 ${
                darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
              } text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center`}
            >
              <Download size={18} className="mr-2" />
              Download Meme
            </button>
          </div>
        </div>
        
        {/* Meme Preview Canvas */}
        <div className={`mt-6 flex justify-center rounded-lg overflow-hidden border ${
          darkMode ? 'bg-black border-gray-700' : 'bg-gray-50 border-gray-200'
        } transition-colors duration-300`}>
          <canvas 
            ref={canvasRef} 
            width={600} 
            height={400} 
            className={`max-w-full h-auto ${!previewUrl ? 'hidden' : ''}`}
          />
          {!previewUrl && (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Smile size={48} className={`mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className="text-lg mb-2">Upload an image to create your meme</p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Add top and bottom text, customize colors, and share your creation
              </p>
            </div>
          )}
        </div>
        
        {/* Add some animation to show interaction possibilities */}
        <div className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>Try different images and text combinations to create the perfect meme!</p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  )
}

export default Upload