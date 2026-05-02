"use client";

import React from "react";
import { StatsCard } from "@/components/StatsCard";
import { ProgressBar } from "@/components/ProgressBar";
import { TrendingUp, Award, Flame, Calendar } from "lucide-react";

export default function ProgressPage() {
  const subjects = [
    { name: "ADVANCED ACCOUNTING", progress: 65, color: "primary" },
    { name: "CORPORATE & OTHER LAWS", progress: 28, color: "secondary" },
    { name: "TAXATION", progress: 45, color: "primary" },
    { name: "COST & MANAGEMENT ACCT", progress: 52, color: "primary" },
    { name: "AUDITING & ASSURANCE", progress: 35, color: "primary" },
    { name: "EIS & STRATEGIC MGMT", progress: 12, color: "secondary" },
    { name: "FINANCIAL MANAGEMENT", progress: 58, color: "primary" },
  ];

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading text-primary">PROGRESS ANALYTICS</h1>
          <p className="text-2xl font-body">DATA DOESN'T LIE. KEEP PUSHING.</p>
        </div>
      </header>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="neo-card bg-black text-white flex items-center space-x-6 p-8 border-primary">
          <TrendingUp className="w-16 h-16 text-primary" />
          <div>
            <div className="text-5xl font-heading">42.5%</div>
            <div className="text-xl font-body uppercase opacity-60">Syllabus Complete</div>
          </div>
        </div>
        <div className="neo-card bg-black text-white flex items-center space-x-6 p-8 border-secondary">
          <Flame className="w-16 h-16 text-secondary" />
          <div>
            <div className="text-5xl font-heading">12 DAYS</div>
            <div className="text-xl font-body uppercase opacity-60">Highest Streak</div>
          </div>
        </div>
        <div className="neo-card bg-black text-white flex items-center space-x-6 p-8 border-white">
          <Award className="w-16 h-16 text-white" />
          <div>
            <div className="text-5xl font-heading">156 HRS</div>
            <div className="text-xl font-body uppercase opacity-60">Total Study Time</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Subject Breakdown */}
        <div className="space-y-8">
          <h2 className="text-4xl font-heading underline flex items-center space-x-2">
            <span>SUBJECT BREAKDOWN</span>
          </h2>
          <div className="neo-card bg-white space-y-8">
            {subjects.map((sub) => (
              <ProgressBar 
                key={sub.name} 
                label={sub.name} 
                value={sub.progress} 
                color={sub.color as "primary" | "secondary"} 
              />
            ))}
          </div>
        </div>

        {/* History & Goals */}
        <div className="space-y-8">
          <h2 className="text-4xl font-heading underline">RECENT MILESTONES</h2>
          <div className="space-y-6">
            <div className="neo-card bg-primary transform -rotate-1">
              <h3 className="text-2xl font-heading">COMPLETED: GST - CHAPTER 4</h3>
              <p className="text-lg font-body">OCTOBER 14, 2026 • 3.5 HOURS STUDIED</p>
            </div>
            <div className="neo-card bg-white rotate-1">
              <h3 className="text-2xl font-heading">STREAK ALERT: 10 DAYS!</h3>
              <p className="text-lg font-body">OCTOBER 12, 2026 • KEEP IT UP, CHAMP!</p>
            </div>
            <div className="neo-card bg-secondary text-white -rotate-1">
              <h3 className="text-2xl font-heading">MOCK TEST: AUDIT</h3>
              <p className="text-lg font-body">OCTOBER 10, 2026 • SCORE: 68/100</p>
            </div>
          </div>

          <div className="neo-card bg-black text-white space-y-4">
            <h2 className="text-3xl font-heading underline">NEXT GOAL</h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 border-4 border-primary flex items-center justify-center text-3xl font-heading">
                50%
              </div>
              <div>
                <p className="text-2xl font-heading text-primary">REACH 50% OVERALL COMPLETION</p>
                <p className="text-lg font-body opacity-60">BY OCTOBER 25, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
