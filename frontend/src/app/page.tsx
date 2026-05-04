"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden mesh-bg">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center glass-panel m-4 rounded-xl relative z-10">
        <div className="text-3xl font-heading text-primary text-glow tracking-widest">
          CA ORBIT
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="font-heading text-xl px-6 py-2 border-brutalist bg-white text-black hover:bg-gray-200 transition-colors">
            LOG IN
          </Link>
          <Link href="/login" className="font-heading text-xl px-6 py-2 neo-btn">
            JOIN NOW
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-12 relative">
        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-20 left-10 md:left-40 bg-secondary text-white font-heading text-2xl px-6 py-3 border-brutalist shadow-brutalist transform -rotate-12 hidden md:block"
        >
          STUDY OS
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-10 md:right-40 bg-primary text-black font-heading text-2xl px-6 py-3 border-brutalist shadow-brutalist transform rotate-12 hidden md:block"
        >
          AI POWERED
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group z-10 mt-16"
        >
          <h1 className="text-7xl md:text-[9rem] leading-none font-heading text-primary border-brutalist-lg bg-black px-10 py-6 shadow-[16px_16px_0px_#FF3B30] transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
            CA ORBIT
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl text-2xl md:text-4xl font-body text-white bg-black/70 p-8 border-brutalist shadow-brutalist backdrop-blur-md z-10"
        >
          The ultimate productivity system for <span className="text-primary font-bold underline text-glow">Chartered Accountant</span> students. Rule your prep.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-8 z-10 mt-8"
        >
          <Link href="/login" className="neo-btn px-16 py-8 text-4xl font-heading text-glow hover:scale-105 transition-transform">
            INITIATE MISSION
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-7xl z-10 pb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="neo-card glass-panel text-white transform hover:-translate-y-4 transition-transform duration-300"
          >
            <h3 className="text-4xl font-heading mb-4 text-primary">AI STRATEGY</h3>
            <p className="text-xl font-body">Personalized study plans generated from your unique strengths, weaknesses, and timeline.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="neo-card bg-primary text-black transform hover:-translate-y-4 transition-transform duration-300 scale-105 z-20"
          >
            <h3 className="text-4xl font-heading mb-4">GAMIFIED TRACKING</h3>
            <p className="text-xl font-body">Earn streaks, track daily missions, and visualize your progress. Stay locked in.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="neo-card glass-panel text-white transform hover:-translate-y-4 transition-transform duration-300"
          >
            <h3 className="text-4xl font-heading mb-4 text-secondary">MISSION COMMAND</h3>
            <p className="text-xl font-body">Your entire syllabus broken down into actionable, bite-sized tasks. No more overwhelm.</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
