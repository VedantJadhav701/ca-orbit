"use client";

import React, { useState } from "react";
import { BrutalistButton } from "@/components/BrutalistButton";
import { Calendar as CalendarIcon, Zap, ChevronRight, ChevronLeft } from "lucide-react";

export default function PlannerPage() {
  const [currentWeek] = useState([
    { day: "MON", date: "15", tasks: 4 },
    { day: "TUE", date: "16", tasks: 3 },
    { day: "WED", date: "17", tasks: 5 },
    { day: "THU", date: "18", tasks: 2 },
    { day: "FRI", date: "19", tasks: 6 },
    { day: "SAT", date: "20", tasks: 4 },
    { day: "SUN", date: "21", tasks: 1 },
  ]);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading text-primary">STUDY PLANNER</h1>
          <p className="text-2xl font-body">STRATEGIZE YOUR SUCCESS. DAY BY DAY.</p>
        </div>
        <BrutalistButton variant="secondary" className="px-8 py-4 flex items-center space-x-2">
          <Zap className="w-8 h-8 fill-white" />
          <span>RE-GENERATE PLAN</span>
        </BrutalistButton>
      </header>

      {/* Week Selector */}
      <div className="flex items-center justify-between bg-black p-6 border-brutalist shadow-brutalist text-white">
        <button className="hover:text-primary transition-colors"><ChevronLeft className="w-12 h-12" /></button>
        <h2 className="text-4xl font-heading uppercase tracking-tighter">OCTOBER 15 - OCTOBER 21, 2026</h2>
        <button className="hover:text-primary transition-colors"><ChevronRight className="w-12 h-12" /></button>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {currentWeek.map((day, idx) => (
          <div 
            key={day.day} 
            className={`neo-card flex flex-col items-center p-6 space-y-4 ${idx === 2 ? "bg-primary border-black" : "bg-white"}`}
          >
            <span className="text-2xl font-heading underline">{day.day}</span>
            <span className="text-6xl font-heading">{day.date}</span>
            <div className="bg-black text-white px-4 py-2 font-heading text-xl border-2 border-black shadow-[4px_4px_0px_#000]">
              {day.tasks} MISSIONS
            </div>
            <BrutalistButton variant="white" className="w-full text-lg py-2">VIEW</BrutalistButton>
          </div>
        ))}
      </div>

      {/* Today's Deep Dive */}
      <div className="neo-card bg-secondary text-white space-y-8">
        <div className="flex items-center space-x-4">
          <CalendarIcon className="w-12 h-12" />
          <h2 className="text-5xl font-heading underline">WEDNESDAY'S OBJECTIVES</h2>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white text-black p-6 border-brutalist shadow-[8px_8px_0px_#000] flex justify-between items-center">
            <div>
              <h3 className="text-3xl font-heading">CONSOLIDATED FINANCIAL STATEMENTS</h3>
              <p className="text-xl font-body opacity-70 uppercase">ACCOUNTS • 09:00 AM - 12:00 PM</p>
            </div>
            <div className="text-3xl font-heading text-secondary">3h</div>
          </div>
          
          <div className="bg-white text-black p-6 border-brutalist shadow-[8px_8px_0px_#000] flex justify-between items-center">
            <div>
              <h3 className="text-3xl font-heading">PROFESSIONAL ETHICS - CASE STUDIES</h3>
              <p className="text-xl font-body opacity-70 uppercase">AUDIT • 02:00 PM - 05:00 PM</p>
            </div>
            <div className="text-3xl font-heading text-secondary">3h</div>
          </div>
        </div>
      </div>
    </div>
  );
}
