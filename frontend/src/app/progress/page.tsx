"use client";

import React, { useState, useEffect } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { TrendingUp, Award, Flame } from "lucide-react";
import { progressApi, taskApi } from "@/lib/api";

export default function ProgressPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subProgress, statsSummary] = await Promise.all([
          progressApi.get(),
          progressApi.summary(),
        ]);
        setSubjects(subProgress);
        setSummary(statsSummary);
      } catch (err) {
        console.error("Failed to fetch progress", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-6xl font-heading animate-pulse">ANALYZING DATA...</h1>
    </div>
  );

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
            <div className="text-5xl font-heading">{summary?.overall_completion || 0}%</div>
            <div className="text-xl font-body uppercase opacity-60">Syllabus Complete</div>
          </div>
        </div>
        <div className="neo-card bg-black text-white flex items-center space-x-6 p-8 border-secondary">
          <Flame className="w-16 h-16 text-secondary" />
          <div>
            <div className="text-5xl font-heading">{summary?.current_streak || 0} DAYS</div>
            <div className="text-xl font-body uppercase opacity-60">Current Streak</div>
          </div>
        </div>
        <div className="neo-card bg-black text-white flex items-center space-x-6 p-8 border-white">
          <Award className="w-16 h-16 text-white" />
          <div>
            <div className="text-5xl font-heading">{summary?.total_hours_studied || 0} HRS</div>
            <div className="text-xl font-body uppercase opacity-60">Total Study Time</div>
          </div>
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="space-y-8">
        <h2 className="text-4xl font-heading underline">SUBJECT BREAKDOWN</h2>
        {subjects.length > 0 ? (
          <div className="neo-card bg-white space-y-8">
            {subjects.map((sub: any) => (
              <ProgressBar 
                key={sub.subject} 
                label={sub.subject} 
                value={sub.percentage} 
                color={sub.percentage < 30 ? "secondary" : "primary"} 
              />
            ))}
          </div>
        ) : (
          <div className="neo-card bg-white/10 border-dashed border-4 flex flex-col items-center justify-center py-12">
            <p className="text-3xl font-heading opacity-50">NO PROGRESS DATA YET</p>
            <p className="text-xl font-body opacity-40 mt-2">Complete tasks to start tracking your progress!</p>
          </div>
        )}
      </div>
    </div>
  );
}
