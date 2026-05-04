"use client";

import React, { useState, useEffect } from "react";
import { TaskCard } from "@/components/TaskCard";
import { BrutalistButton } from "@/components/BrutalistButton";
import { BrutalistInput } from "@/components/BrutalistInput";
import { Plus, Search } from "lucide-react";
import { taskApi } from "@/lib/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", subject: "", estimated_time: "" });

  const fetchTasks = async () => {
    try {
      const data = await taskApi.list();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

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

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.subject) return;
    try {
      const created = await taskApi.create({
        title: newTask.title,
        subject: newTask.subject,
        estimated_time: parseFloat(newTask.estimated_time) || 1,
      });
      setTasks([...tasks, created]);
      setNewTask({ title: "", subject: "", estimated_time: "" });
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskApi.delete(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-6xl font-heading animate-pulse">LOADING MISSIONS...</h1>
    </div>
  );

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

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

      {/* Add Task Form */}
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
              label="ESTIMATED HOURS" 
              placeholder="e.g. 2"
              type="number"
              value={newTask.estimated_time}
              onChange={(e) => setNewTask({ ...newTask, estimated_time: e.target.value })}
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
        <h2 className="text-4xl font-heading underline">ACTIVE MISSIONS ({activeTasks.length})</h2>
        <div className="grid grid-cols-1 gap-4">
          {activeTasks.length > 0 ? activeTasks.map(task => (
            <TaskCard 
              key={task.id} 
              title={task.title}
              subject={task.subject}
              timeEstimate={`${task.estimated_time || 1}h`}
              completed={task.completed}
              onToggle={() => toggleTask(task.id)} 
            />
          )) : (
            <div className="neo-card bg-white/10 border-dashed border-4 flex flex-col items-center justify-center py-12">
              <p className="text-3xl font-heading opacity-50 mb-4">NO ACTIVE MISSIONS</p>
              <BrutalistButton onClick={() => setShowAddForm(true)}>CREATE YOUR FIRST TASK</BrutalistButton>
            </div>
          )}
        </div>

        {completedTasks.length > 0 && (
          <>
            <h2 className="text-4xl font-heading underline mt-12 opacity-60">COMPLETED ({completedTasks.length})</h2>
            <div className="grid grid-cols-1 gap-4">
              {completedTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  title={task.title}
                  subject={task.subject}
                  timeEstimate={`${task.estimated_time || 1}h`}
                  completed={task.completed}
                  onToggle={() => toggleTask(task.id)} 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
