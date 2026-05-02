"use client";

import React, { useState } from "react";
import { TaskCard } from "@/components/TaskCard";
import { BrutalistButton } from "@/components/BrutalistButton";
import { BrutalistInput } from "@/components/BrutalistInput";
import { Plus, Search, Filter } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Standard Costing - Variances", subject: "COSTING", timeEstimate: "2h", completed: false },
    { id: 2, title: "Company Law - Audit & Auditors", subject: "LAW", timeEstimate: "1.5h", completed: true },
    { id: 3, title: "GST - Input Tax Credit", subject: "TAXATION", timeEstimate: "3h", completed: false },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", subject: "", time: "" });

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title && newTask.subject) {
      setTasks([...tasks, { id: Date.now(), ...newTask, timeEstimate: newTask.time, completed: false }]);
      setNewTask({ title: "", subject: "", time: "" });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading text-primary">TASK COMMAND CENTER</h1>
          <p className="text-2xl font-body">MANAGE YOUR MISSIONS. WIN THE DAY.</p>
        </div>
        <BrutalistButton onClick={() => setShowAddForm(true)} className="px-8 py-4 flex items-center space-x-2">
          <Plus className="w-8 h-8" />
          <span>NEW TASK</span>
        </BrutalistButton>
      </header>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <BrutalistInput placeholder="SEARCH TASKS..." className="pl-12" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black/40" />
        </div>
        <BrutalistButton variant="white" className="px-6 py-2 flex items-center space-x-2">
          <Filter className="w-6 h-6" />
          <span>FILTER</span>
        </BrutalistButton>
      </div>

      {/* Add Task Modal-like Form */}
      {showAddForm && (
        <div className="neo-card bg-primary space-y-6">
          <h2 className="text-4xl font-heading underline">ADD NEW MISSION</h2>
          <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
            <BrutalistInput 
              label="MISSION TITLE" 
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <BrutalistInput 
              label="SUBJECT" 
              value={newTask.subject}
              onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
              required
            />
            <BrutalistInput 
              label="ESTIMATED TIME" 
              placeholder="e.g. 2h"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            />
            <div className="md:col-span-3 flex justify-end space-x-4">
              <BrutalistButton variant="white" onClick={() => setShowAddForm(false)} type="button">CANCEL</BrutalistButton>
              <BrutalistButton type="submit">DEPLOY MISSION</BrutalistButton>
            </div>
          </form>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-6">
        <h2 className="text-4xl font-heading underline">ACTIVE MISSIONS</h2>
        <div className="grid grid-cols-1 gap-4">
          {tasks.filter(t => !t.completed).map(task => (
            <TaskCard key={task.id} {...task} onToggle={() => toggleTask(task.id)} />
          ))}
        </div>

        <h2 className="text-4xl font-heading underline mt-12 opacity-60">COMPLETED</h2>
        <div className="grid grid-cols-1 gap-4">
          {tasks.filter(t => t.completed).map(task => (
            <TaskCard key={task.id} {...task} onToggle={() => toggleTask(task.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
