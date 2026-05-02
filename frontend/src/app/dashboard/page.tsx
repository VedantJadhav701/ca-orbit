"use client";

import React, { useState, useEffect } from "react";
import { StatsCard } from "@/components/StatsCard";
import { ProgressBar } from "@/components/ProgressBar";
import { TaskCard } from "@/components/TaskCard";
import { taskApi, progressApi } from "@/lib/api";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskList, statsSummary, subProgress] = await Promise.all([
          taskApi.list(),
          progressApi.summary(),
          progressApi.get()
        ]);
        setTasks(taskList.slice(0, 3)); // Only show top 3 on dashboard
        setSummary(statsSummary);
        setSubjects(subProgress);
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

        {/* Subject Progress */}
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
      </div>
    </div>
  );
}
