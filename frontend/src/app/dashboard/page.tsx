"use client";

import React, { useState, useEffect, Suspense } from "react";
import { StatsCard } from "@/components/StatsCard";
import { ProgressBar } from "@/components/ProgressBar";
import { TaskCard } from "@/components/TaskCard";
import { taskApi, progressApi, apiRequest } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const isSurveyCompleted = searchParams.get('survey') === 'completed';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskList, statsSummary, subProgress, lbData] = await Promise.all([
          taskApi.list(),
          progressApi.summary(),
          progressApi.get(),
          apiRequest("/community/leaderboard")
        ]);
        setTasks(taskList.slice(0, 3)); // Only show top 3 on dashboard
        setSummary(statsSummary);
        setSubjects(subProgress);
        setLeaderboard(lbData.slice(0, 5)); // Show top 5 on dashboard
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
      await taskApi.update(id, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-6xl font-heading animate-pulse">LOADING DATA...</h1>
    </div>
  );

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading text-primary">DASHBOARD</h1>
          <p className="text-2xl font-body uppercase">WELCOME BACK, CHAMPION. READY TO WORK?</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-heading text-secondary">STREAK: {summary?.current_streak || 0} DAYS</div>
        </div>
      </header>

      {isSurveyCompleted && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary text-white p-6 border-brutalist shadow-[8px_8px_0px_#FFD60A] mb-8"
        >
          <h2 className="text-3xl font-heading mb-2">⚡ AI STRATEGY DEPLOYED</h2>
          <p className="text-xl font-body">Based on your parameters, we've restructured your tasks. Prioritize Law revisions this week. Your 4h/day schedule is locked in.</p>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatsCard 
          title="TODAY'S TASKS" 
          value={`${summary?.tasks_completed_today || 0}/${summary?.total_tasks_today || 0}`} 
          variant="primary" 
        />
        <StatsCard 
          title="OVERALL PROGRESS" 
          value={`${summary?.overall_completion || 0}%`} 
          variant="white" 
        />
        <StatsCard 
          title="HOURS STUDIED" 
          value={summary?.total_hours_studied || 0} 
          variant="white" 
        />
        <StatsCard title="WEAK SUBJECT" value="LAW" variant="secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-4xl font-heading underline">TODAY'S MISSIONS</h2>
          <div className="space-y-4">
            {tasks.length > 0 ? tasks.map(task => (
              <TaskCard 
                key={task.id} 
                title={task.title}
                subject={task.subject}
                timeEstimate={`${task.estimated_time}h`}
                completed={task.completed}
                onToggle={() => toggleTask(task.id)} 
              />
            )) : (
              <div className="neo-card bg-white/10 border-dashed border-4 flex flex-col items-center justify-center py-12">
                <p className="text-2xl font-heading opacity-50">NO MISSIONS TODAY</p>
              </div>
            )}
          </div>
        </div>

        {/* Subject Progress & Leaderboard */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-heading underline">SUBJECT STATUS</h2>
            <div className="neo-card space-y-8 bg-white/5 border-white">
              {subjects.map((sub: any) => (
                <ProgressBar 
                  key={sub.subject} 
                  label={sub.subject} 
                  value={sub.percentage} 
                  color={sub.percentage < 30 ? "secondary" : "primary"} 
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <h2 className="text-4xl font-heading underline">TOP RANKS</h2>
              <a href="/community" className="text-primary hover:underline font-heading text-xl">VIEW ALL →</a>
            </div>
            <div className="neo-card bg-black p-0 overflow-hidden border-brutalist shadow-[8px_8px_0px_#FF3B30]">
              <table className="w-full text-left font-body">
                <tbody className="divide-y divide-gray-800">
                  {leaderboard.length === 0 ? (
                    <tr><td className="p-4 text-center text-gray-500">No ranks yet</td></tr>
                  ) : leaderboard.map((user) => (
                    <tr key={user.rank} className="hover:bg-white/5">
                      <td className="p-4 font-heading text-xl">
                        {user.rank <= 3 ? <span className="text-primary">#{user.rank}</span> : `#${user.rank}`}
                      </td>
                      <td className="p-4 font-bold truncate max-w-[100px]">{user.name}</td>
                      <td className="p-4 text-secondary text-right">{user.points} PTS</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full"><h1 className="text-6xl font-heading animate-pulse">LOADING DASHBOARD...</h1></div>}>
      <DashboardContent />
    </Suspense>
  );
}
