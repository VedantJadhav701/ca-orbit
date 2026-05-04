"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden mesh-bg">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center glass-panel m-4 rounded-xl relative z-50">
        <div className="text-4xl font-heading text-primary text-glow tracking-widest flex items-center gap-2">
          <span>🪐</span> CA ORBIT
        </div>
        <div className="flex gap-4 sm:gap-6 items-center">
          <Link href="/community" className="font-heading text-xl text-white hover:text-secondary transition-colors hidden sm:block">
            COMMUNITY
          </Link>
          <Link href="/login" className="font-heading text-xl px-6 py-2 border-brutalist bg-white text-black hover:bg-gray-200 transition-colors">
            LOG IN
          </Link>
          <Link href="/register" className="font-heading text-xl px-6 py-2 neo-btn hidden sm:block">
            JOIN NOW
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-12 relative z-10 mt-10">
        
        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-10 left-10 md:left-32 bg-secondary text-white font-heading text-3xl px-8 py-4 border-brutalist shadow-brutalist transform -rotate-12 hidden lg:block z-0"
        >
          STUDY OS
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-64 right-10 md:right-32 bg-primary text-black font-heading text-3xl px-8 py-4 border-brutalist shadow-brutalist transform rotate-12 hidden lg:block z-0"
        >
          AI POWERED
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="relative group z-10"
        >
          <h1 className="text-7xl md:text-[11rem] leading-none font-heading text-primary border-brutalist-lg bg-black px-12 py-8 shadow-[24px_24px_0px_#FF3B30] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
            CA ORBIT
          </h1>
          <div className="absolute -bottom-8 -right-8 bg-white text-black font-heading text-2xl px-4 py-2 border-brutalist shadow-brutalist rotate-6">
            v2.0 LIVE
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl text-2xl md:text-5xl font-body text-white bg-black/80 p-10 border-brutalist shadow-brutalist backdrop-blur-xl z-10 mt-16 leading-relaxed"
        >
          The ultimate productivity system for <span className="text-primary font-bold underline text-glow">Chartered Accountant</span> students. Rule your prep. Dominate the ranks.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-8 z-10 mt-12"
        >
          <Link href="/register" className="neo-btn px-16 py-8 text-4xl md:text-5xl font-heading text-glow hover:scale-105 transition-transform">
            INITIATE MISSION
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-32 w-full max-w-[90rem] z-10 pb-20 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="neo-card glass-panel text-white transform hover:-translate-y-6 transition-all duration-300"
          >
            <div className="text-6xl mb-6">🤖</div>
            <h3 className="text-4xl font-heading mb-4 text-primary">AI STRATEGY</h3>
            <p className="text-xl font-body text-gray-300">Personalized study plans generated from your unique strengths, weaknesses, and timeline by Gemini 3.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="neo-card bg-primary text-black transform hover:-translate-y-6 transition-all duration-300 scale-105 z-20 shadow-[16px_16px_0px_rgba(255,255,255,0.2)]"
          >
            <div className="text-6xl mb-6">🏆</div>
            <h3 className="text-4xl font-heading mb-4">GLOBAL RANKS</h3>
            <p className="text-xl font-body font-bold text-gray-900">Compete with thousands of CA students weekly. Prove your dedication on the community leaderboard.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="neo-card glass-panel text-white transform hover:-translate-y-6 transition-all duration-300"
          >
            <div className="text-6xl mb-6">🎯</div>
            <h3 className="text-4xl font-heading mb-4 text-secondary">MISSION COMMAND</h3>
            <p className="text-xl font-body text-gray-300">Your entire syllabus broken down into actionable, bite-sized tasks. No more overwhelm.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="neo-card glass-panel text-white transform hover:-translate-y-6 transition-all duration-300 border-dashed border-gray-500"
          >
            <div className="text-6xl mb-6">🔥</div>
            <h3 className="text-4xl font-heading mb-4 text-white">GAMIFIED STUDY</h3>
            <p className="text-xl font-body text-gray-300">Earn streaks, unlock achievements, and visualize your progress. Turn grueling prep into a game.</p>
          </motion.div>
        </div>

        {/* Community Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-[90rem] bg-secondary border-brutalist-lg p-16 mt-10 mb-20 relative overflow-hidden group cursor-pointer"
        >
          <Link href="/community" className="absolute inset-0 z-20" />
          <div className="absolute -right-20 -top-20 text-[20rem] opacity-20 group-hover:scale-110 transition-transform duration-700">👑</div>
          <div className="relative z-10 text-left">
            <h2 className="text-6xl md:text-8xl font-heading text-white mb-6">THE CA COMMUNITY</h2>
            <p className="text-3xl font-body text-white/90 max-w-4xl mb-10">
              Join the elite ranks. Study hard, log your hours, and climb the weekly leaderboard. Only the most dedicated claim the top spot.
            </p>
            <span className="bg-black text-white px-8 py-4 font-heading text-3xl border-brutalist group-hover:bg-primary group-hover:text-black transition-colors">
              VIEW LEADERBOARD →
            </span>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
