"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { ModeToggle } from './Themetoggle'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { signOut, useSession } from 'next-auth/react'
import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ImExit } from "react-icons/im"

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const {data:session} = useSession()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const routes = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    {
      id: 2,
      title: "Explore",
      link: "/meme/explore",
    },
    {
      id: 3,
      title: "Leaderboard",
      link: "/meme/leaderboard",
    },
    {
      id: 4,
      title: "Upload",
      link: "/meme/upload",
    }
  ]

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.25
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`dark:bg-slate-900 dark:text-white fixed w-full top-0 z-50 px-4 md:px-8 py-3 transition-all duration-300 ${
        scrolled ? "bg-white dark:bg-slate-800 shadow-md" : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex-shrink-0"
        >
          <svg width="150" height="40" viewBox="0 0 390 108" className="looka-1j8o68f">
            <defs id="SvgjsDefs1178"></defs>
            <g id="SvgjsG1179" featurekey="rootContainer" transform="matrix(1,0,0,1,0,0)" fill="#111111">
              <rect xmlns="http://www.w3.org/2000/svg" width="390" height="108" rx="10" ry="10"></rect>
            </g>
            <g id="SvgjsG1180" featurekey="q4o0QG-0" transform="matrix(4.459735640661685,0,0,4.459735640661685,18.305304730949576,-2.477067458809479)" fill="#ffffff">
              <path d="M3.84 5.039999999999999 l0.54 0.22 l0.74 6 l0.26 -0.04 l1.04 -6.18 l3.56 0.42 c0.02 0.64 0.12 2.48 0.18 4.14 c0.02 0.98 0.04 2.06 0.04 3.2 l0.12 5.08 l0 1.66 l-0.1 0.46 l0 0.12 c-0.26 0.02 -0.52 0.02 -0.8 0.02 c-0.42 0 -0.96 0.04 -1.38 -0.02 l-0.5 -7.98 l-0.38 0.2 l-1.02 7.62 l-1.76 0.06 l-1.1 -7.58 l-0.84 -0.28 l-0.22 7.92 l-1.84 0 l0.24 -14.8 z M11.46 19.92 l-0.04 -6.94 l0.08 -0.74 l-0.04 -0.74 l0.1 -4.42 l0.18 -1.72 l6.5 0.12 l0.1 3.9 l-4.26 0 l-0.08 2.5 l3.26 -0.06 l0 0.22 l0.1 1.7 l-3.04 0.06 l0.1 2.96 l4.06 0.2 l0 3.08 z M19.28 20 l0.24 -14.5 l2.38 -0.18 l1.08 0.12 l1.02 6.94 l0.6 -7.16 l4.1 0.5 c0.02 0.76 0.04 1.54 0.04 2.36 c0.08 1.38 0.18 3.18 0.18 4.84 c0.06 2.68 -0.02 4.6 0.16 7.12 l-1.76 -0.04 l-0.14 -8.98 l-0.38 -0.08 l-1 7.96 l-0.34 0.98 l-2.12 0.12 l-1.02 -8.4 l-0.6 0.14 l0.22 8.38 z M30.340000000000003 19.92 l-0.04 -6.94 l0.08 -0.74 l-0.04 -0.74 l0.1 -4.42 l0.18 -1.72 l6.5 0.12 l0.1 3.9 l-4.26 0 l-0.08 2.5 l3.26 -0.06 l0 0.22 l0.1 1.7 l-3.04 0.06 l0.1 2.96 l4.06 0.2 l0 3.08 z M40.24 19.34 l-2.58 -13.92 l1.24 -0.18 l2.02 0.08 l1.26 11.94 l0.36 0.9 l0.82 -12.9 l2.68 -0.04 l0.78 0.06 l-2.14 12.92 l-0.48 1.8 l-3.76 0.2 z M47.64 19.92 l-0.04 -6.94 l0.08 -0.74 l-0.04 -0.74 l0.1 -4.42 l0.18 -1.72 l6.5 0.12 l0.1 3.9 l-4.26 0 l-0.08 2.5 l3.26 -0.06 l0 0.22 l0.1 1.7 l-3.04 0.06 l0.1 2.96 l4.06 0.2 l0 3.08 z M57.46000000000001 7.699999999999999 l0.06 1.58 l0 2.06 l0.72 0 l0.7 -0.06 l0.46 -0.44 l0 -0.2 l0.08 -1.36 l-0.16 -1.22 l0 -0.04 l-0.22 -0.8 l-0.54 -0.24 l-1.04 0 z M57.34 5.24 l2.62 0.04 l1.24 0.14 l1.02 0.58 l0.8 1.32 l-0.26 3.86 l-0.32 0.6 l-1.18 0.38 l1.34 1 l0.36 0.98 l0 1.6 l-0.18 4.24 l-0.52 0.12 l-2.06 -0.1 l-0.1 -3.9 l-0.14 -2.06 l-0.48 -0.52 l-0.92 -0.3 l0 1.48 l0 3.72 l0.06 1.56 l-1.94 -0.02 l-0.92 0.06 l-0.32 -0.06 l0 -2.88 l0 -2.1 l0.12 -2.72 l-0.08 -4.68 l-0.04 -2.32 z M70.2 5.52 l0.52 0.86 l0 2.44 l-0.06 1.24 l-2.68 -0.14 l0 -0.78 l0 -1.06 l-1.32 0.02 l-0.22 0.56 l0.22 2.72 l2.06 0.12 l2 0.24 l0.06 2.54 l0 1.8 l-0.26 3.14 l-1.8 0.88 l-2.64 -0.12 l-1.2 -0.48 l-0.6 -0.46 l-0.28 -1.46 l0.1 -2.48 l0.1 -0.8 l0.68 0.04 l1.56 0.18 l0 0.6 l0 0.66 l0 0.34 l0 0.54 l1.88 0.22 l0.06 -3.6 l-3.98 -0.22 l-0.16 -4.4 l-0.04 -2.88 l0.66 -0.48 c0.46 -0.02 0.86 -0.06 1.24 -0.1 c0.64 -0.06 1.28 -0.1 1.42 -0.1 c0.1 0 0.46 0.02 0.8 0.04 l0.64 0.04 z M71.84000000000002 19.92 l-0.04 -6.94 l0.08 -0.74 l-0.04 -0.74 l0.1 -4.42 l0.18 -1.72 l6.5 0.12 l0.1 3.9 l-4.26 0 l-0.08 2.5 l3.26 -0.06 l0 0.22 l0.1 1.7 l-3.04 0.06 l0.1 2.96 l4.06 0.2 l0 3.08 z"></path>
            </g>
          </svg>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <motion.ul 
            variants={navVariants}
            className="flex items-center gap-6"
          >
            {routes.map((route) => (
              <motion.li key={route.id} variants={itemVariants}>
                <Link
                  href={route.link}
                  className="text-sm font-medium transition-colors hover:text-primary relative group"
                >
                  {route.title}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Actions Container */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ModeToggle />
          </motion.div>

          {/* User Authentication */}
          <div className="hidden md:block">
            {session ? (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
               <DropdownMenu>
                   <DropdownMenuTrigger><Avatar>
                   <AvatarImage src={session.user.image}></AvatarImage>
                    <AvatarFallback>"PP"</AvatarFallback>
               </Avatar></DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuItem>
                      <Link href={"/meme/user/profile"}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={async () =>await signOut()}>
                      Sign Out  <ImExit className="w-4 h-4 ml-2" />
                  </DropdownMenuItem>
              </DropdownMenuContent>
               </DropdownMenu>
              </motion.button>
            ) : (
              <div className="flex gap-2">
                <Link href={"/auth/signin"}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Sign In
                </motion.button>
                </Link>
                <Link href={"/auth/signup"}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9  }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 px-2">
              <ul className="flex flex-col space-y-4">
                {routes.map((route) => (
                  <motion.li
                    key={route.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={route.link}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-base font-medium transition-colors hover:text-primary"
                    >
                      {route.title}
                    </Link>
                  </motion.li>
                ))}
                 {session &&  <Link
                      href={"/meme/user/profile"}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-base font-medium transition-colors hover:text-primary"
                    >
                       Profile
                    </Link>}
                
                {/* Mobile Authentication Buttons */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  {session ? (
                    <motion.button 
                    onClick={async () => await signOut()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Sign Out
                    </motion.button>
                  ) : (
                    <div className="flex flex-col gap-2">
                     <Link href={"/auth/signin"}> <motion.button 
               
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="w-full py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
             >
               Sign In
             </motion.button>
             </Link>
                    <Link href={"/auth/signup"}>  
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        Sign Up
                      </motion.button>
                      </Link>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar