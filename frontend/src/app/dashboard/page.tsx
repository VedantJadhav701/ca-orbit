"use client";

import React, { useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { ProgressBar } from "@/components/ProgressBar";
import { TaskCard } from "@/components/TaskCard";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Standard Costing - Variances", subject: "COSTING", timeEstimate: "2h", completed: false },
    { id: 2, title: "Company Law - Audit & Auditors", subject: "LAW", timeEstimate: "1.5h", completed: true },
    { id: 3, title: "GST - Input Tax Credit", subject: "TAXATION", timeEstimate: "3h", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading text-primary">DASHBOARD</h1>
          <p className="text-2xl font-body">WELCOME BACK, CHAMPION. 45 DAYS TO ATTEMPT.</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-heading text-secondary">STREAK: 12 DAYS</div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatsCard title="TODAY'S TASKS" value="2/3" variant="primary" />
        <StatsCard title="OVERALL PROGRESS" value="42%" variant="white" />
        <StatsCard title="HOURS STUDIED" value="156" variant="white" />
        <StatsCard title="WEAK SUBJECT" value="LAW" variant="secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-4xl font-heading underline">TODAY'S MISSIONS</h2>
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                {...task} 
                onToggle={() => toggleTask(task.id)} 
              />
            ))}
          </div>
        </div>

        {/* Subject Progress */}
        <div className="space-y-6">
          <h2 className="text-4xl font-heading underline">SUBJECT STATUS</h2>
          <div className="neo-card space-y-8 bg-white/5 border-white">
            <ProgressBar label="ACCOUNTING" value={65} color="primary" />
            <ProgressBar label="LAW" value={28} color="secondary" />
            <ProgressBar label="COSTING" value={52} color="primary" />
            <ProgressBar label="TAXATION" value={45} color="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
