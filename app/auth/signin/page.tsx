"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-8 bg-white/90 dark:bg-gray-900/80 shadow-2xl rounded-2xl backdrop-blur-lg w-full max-w-md text-center border border-gray-200 dark:border-gray-800"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Sign In
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Choose a sign-in method:
        </p>

        {/* Sign In with Google */}
        <motion.div
        onClick={async ()=> await signIn("google")}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <HoverBorderGradient
            containerClassName="w-full rounded-lg"
            className="flex items-center justify-center w-full px-5 py-3 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all"
          >
            <FaGoogle className="w-5 h-5 mr-2" />
            Sign in with Google
          </HoverBorderGradient>
        </motion.div>

        {/* Sign In with GitHub */}
        <motion.div
         onClick={async () =>await signIn("github")}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="my-3">
          <HoverBorderGradient
        
            containerClassName="w-full rounded-lg"
            className="flex items-center justify-center w-full px-5 py-3 text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition-all"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            Sign in with GitHub
          </HoverBorderGradient>
        </motion.div>
        Don't have an account?{" "} <Link href="/auth/signup" className="text-blue-500 hover:underline transition">Sign Up</Link>
      </motion.div>
    </div>
  );
};

export default SignIn;
