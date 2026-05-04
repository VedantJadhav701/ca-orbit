"use client";

import React, { useState, useEffect } from "react";
import { BrutalistButton } from "@/components/BrutalistButton";
import { Zap } from "lucide-react";
import { plannerApi, taskApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function PlannerPage() {
  const router = useRouter();
  const [strategy, setStrategy] = useState<string>("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stratData, taskData] = await Promise.all([
          plannerApi.strategy(),
          taskApi.list()
        ]);
        setStrategy(stratData.strategy);
        setTasks(taskData);
      } catch (err) {
        console.error("Failed to load planner data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <h1 className="text-6xl font-heading animate-pulse text-primary">DECODING AI STRATEGY...</h1>
      </div>
    );
  }

  // Filter only incomplete tasks for today/upcoming
  const upcomingTasks = tasks.filter(t => !t.completed).slice(0, 5);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading text-primary">AI STUDY PLANNER</h1>
          <p className="text-2xl font-body">STRATEGIZE YOUR SUCCESS. DAY BY DAY.</p>
        </div>
        <BrutalistButton 
          variant="secondary" 
          className="px-8 py-4 flex items-center space-x-2"
          onClick={() => router.push("/survey")}
        >
          <Zap className="w-8 h-8 fill-white" />
          <span>RE-GENERATE PLAN</span>
        </BrutalistButton>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Strategy Output (Markdown) */}
        <div className="lg:col-span-2 neo-card bg-black text-white space-y-6">
          <h2 className="text-4xl font-heading underline text-primary flex items-center gap-3">
            <Zap className="w-8 h-8 fill-primary" /> GEMINI AI STRATEGY
          </h2>
          <div className="prose prose-invert prose-lg font-body max-w-none">
            <ReactMarkdown>{strategy}</ReactMarkdown>
          </div>
        </div>

        {/* Generated Immediate Tasks */}
        <div className="neo-card bg-secondary text-white space-y-8 h-fit">
          <h2 className="text-4xl font-heading underline">UPCOMING MISSIONS</h2>
          <div className="space-y-4">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task, idx) => (
                <div key={task.id || idx} className="bg-white text-black p-4 border-brutalist shadow-[4px_4px_0px_#000]">
                  <h3 className="text-2xl font-heading line-clamp-1">{task.title}</h3>
                  <p className="text-lg font-body opacity-70 uppercase">{task.subject} • {task.estimated_time}H</p>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-black/20 border-2 border-dashed">
                <p className="text-2xl font-heading">NO ACTIVE TASKS</p>
                <p className="font-body opacity-70">You have completed your AI missions!</p>
              </div>
            )}
          </div>
          <BrutalistButton variant="white" className="w-full text-xl py-3" onClick={() => router.push("/tasks")}>
            VIEW ALL MISSIONS
          </BrutalistButton>
        </div>
      </div>
    </div>
  );
}
