"use client"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Make sure the component is mounted before rendering theme-dependent parts
  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const imageVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100 } 
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
     
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 dark:text-white">
            Memes That Make Your Day
          </h1>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl text-gray-600 dark:text-gray-300">
            Your daily dose of humor, served fresh. Laugh until your stomach hurts!
          </p>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Button size="lg" className="text-lg px-8 py-6">
            Explore Memes
          </Button>
        </motion.div>
        <motion.div 
          className="mt-12"
          variants={imageVariant}
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <img
              src="https://placehold.co/400x400/EEE/31343C?text=Featured+Meme"
              alt="Featured meme"
              className="rounded-xl shadow-2xl w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Trending Section */}
      <motion.section 
        className="py-20 bg-gray-100 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Trending Memes
            </h2>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div 
                key={item}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className="relative h-48 md:h-64">
                  <img
                    src={`https://placehold.co/400x300/EEE/31343C?text=Meme+${item}`}
                    alt={`Trending meme ${item}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
                    Trending Meme #{item}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    This hilarious meme has been making everyone laugh!
                  </p>
                  <div className="mt-4 flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <span className="mr-4">👍 4.{item}k</span>
                    <span>💬 {item * 100}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="mt-12 text-center" variants={fadeInUp}>
            <Button variant="outline" size="lg">
              View All Trending
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Meme Categories
            </h2>
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {["Classic", "Dank", "Wholesome", "Gaming", "Movies", "Animals", "Sports", "Tech"].map((category) => (
              <motion.div 
                key={category}
                className="relative h-40 rounded-lg overflow-hidden group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src={`https://placehold.co/300x200/EEE/31343C?text=${category}`}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <h3 className="absolute bottom-4 left-4 z-20 text-white font-semibold text-xl">
                  {category}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Subscribe Section */}
      <motion.section 
        className="py-20 bg-gray-100 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 md:p-12 shadow-xl"
            variants={fadeInUp}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Get Fresh Memes Daily
                </h2>
                <p className="text-white/90 mb-6">
                  Subscribe to our newsletter and never miss the funniest memes on the internet!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-3 rounded-lg flex-grow text-gray-800"
                  />
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="relative h-48 md:h-64">
                <img
                  src="https://placehold.co/400x300/EEE/31343C?text=Newsletter"
                  alt="Newsletter illustration"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Community Section */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Join Our Meme Community
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
            variants={fadeInUp}
          >
            Connect with fellow meme enthusiasts, share your creations, and become part of our growing community.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
          >
            {[
              { title: "Share", description: "Upload your own memes and get feedback" },
              { title: "Interact", description: "Comment, like, and share your favorite memes" },
              { title: "Create", description: "Use our meme generator to make original content" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-700 p-8 rounded-xl text-center shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-purple-600 dark:text-purple-300">
                    {index === 0 ? "🚀" : index === 1 ? "💬" : "✨"}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div className="mt-16 text-center" variants={fadeInUp}>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Join Now
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">MemeWorld</h3>
              <p className="text-gray-400 max-w-md">
                Your favorite destination for the freshest and funniest memes on the internet.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Explore</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Trending</li>
                  <li>Categories</li>
                  <li>Top Charts</li>
                  <li>Create</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Twitter</li>
                  <li>Instagram</li>
                  <li>Facebook</li>
                  <li>Discord</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 MemeWorld. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}