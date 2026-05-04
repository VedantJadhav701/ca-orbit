"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Vedant Jadhav", level: "CA Inter", hours: 42, points: 1250, streak: 14 },
  { rank: 2, name: "Riya Sharma", level: "CA Final", hours: 38, points: 1100, streak: 8 },
  { rank: 3, name: "Aryan Patel", level: "CA Foundation", hours: 35, points: 950, streak: 5 },
  { rank: 4, name: "Neha Gupta", level: "CA Inter", hours: 32, points: 840, streak: 12 },
  { rank: 5, name: "Karan Singh", level: "CA Final", hours: 28, points: 720, streak: 3 },
  { rank: 6, name: "Sneha Reddy", level: "CA Foundation", hours: 25, points: 610, streak: 7 },
  { rank: 7, name: "Rahul Verma", level: "CA Inter", hours: 22, points: 530, streak: 2 },
];

function Podium({ user, height, color, emoji }: { user: any, height: string, color: string, emoji: string }) {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: user.rank * 0.2 }}
      className="flex flex-col items-center justify-end w-full max-w-[200px]"
    >
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{emoji}</div>
        <h3 className="font-heading text-xl text-white truncate max-w-[150px]">{user.name}</h3>
        <p className="font-body text-gray-400">{user.points} PTS</p>
      </div>
      <div className={`w-full ${height} ${color} border-brutalist flex items-start justify-center pt-4`}>
        <span className="font-heading text-5xl text-black mix-blend-overlay">#{user.rank}</span>
      </div>
    </motion.div>
  );
}

function CommunityContent() {
  const top3 = LEADERBOARD_DATA.slice(0, 3);
  const rest = LEADERBOARD_DATA.slice(3);

  return (
    <div className="min-h-screen mesh-bg p-4 md:p-10 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-16">
        <Link href="/" className="text-3xl font-heading text-primary text-glow">
          CA ORBIT
        </Link>
        <Link href="/dashboard" className="neo-btn px-6 py-2 font-heading text-xl">
          MY DASHBOARD
        </Link>
      </div>

      <div className="w-full max-w-6xl space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block bg-white text-black font-heading text-2xl px-6 py-2 border-brutalist transform -rotate-2"
          >
            WEEK 42 COMPETITION
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-heading text-white text-glow">
            THE <span className="text-secondary">ELITE</span> RANKS
          </h1>
          <p className="text-2xl font-body text-gray-300 max-w-2xl mx-auto">
            Log your study hours, complete missions, and dominate the leaderboard. Only the top 3 will be immortalized.
          </p>
        </div>

        {/* Podium for Top 3 */}
        <div className="flex justify-center items-end h-[400px] gap-2 md:gap-6 w-full max-w-4xl mx-auto border-b-4 border-white pb-0 px-4">
          <Podium user={top3[1]} height="h-[200px]" color="bg-gray-300" emoji="🥈" />
          <Podium user={top3[0]} height="h-[280px]" color="bg-primary" emoji="👑" />
          <Podium user={top3[2]} height="h-[150px]" color="bg-[#CD7F32]" emoji="🥉" />
        </div>

        {/* Leaderboard Table */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-4xl mx-auto bg-black border-brutalist shadow-[16px_16px_0px_#FF3B30] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body">
              <thead className="bg-white text-black font-heading text-xl">
                <tr>
                  <th className="p-6">RANK</th>
                  <th className="p-6">STUDENT</th>
                  <th className="p-6 hidden sm:table-cell">LEVEL</th>
                  <th className="p-6">HOURS</th>
                  <th className="p-6 hidden sm:table-cell">STREAK</th>
                  <th className="p-6 text-right">POINTS</th>
                </tr>
              </thead>
              <tbody className="text-white text-xl divide-y divide-gray-800">
                {LEADERBOARD_DATA.map((user) => (
                  <tr key={user.rank} className="hover:bg-white/5 transition-colors group">
                    <td className="p-6 font-heading text-2xl">
                      {user.rank <= 3 ? <span className="text-primary">#{user.rank}</span> : `#${user.rank}`}
                    </td>
                    <td className="p-6 font-bold">{user.name}</td>
                    <td className="p-6 text-gray-400 hidden sm:table-cell">{user.level}</td>
                    <td className="p-6 text-secondary">{user.hours}h</td>
                    <td className="p-6 hidden sm:table-cell">
                      <span className="bg-white/10 px-3 py-1 rounded-full text-sm">🔥 {user.streak}</span>
                    </td>
                    <td className="p-6 font-heading text-2xl text-right group-hover:text-primary transition-colors">
                      {user.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Call to Action */}
        <div className="text-center pb-20">
          <Link href="/dashboard" className="neo-btn bg-secondary text-white border-brutalist shadow-[8px_8px_0px_white] px-12 py-6 text-3xl font-heading hover:scale-105 transition-transform inline-block">
            LOG YOUR HOURS
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><h1 className="text-6xl font-heading animate-pulse text-white">LOADING RANKS...</h1></div>}>
      <CommunityContent />
    </Suspense>
  );
}
