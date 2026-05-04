"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-black z-40 p-4 border-b-4 border-primary flex justify-between items-center shadow-brutalist">
        <h1 className="text-3xl font-heading text-primary">CA ORBIT</h1>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="neo-btn bg-white text-black p-2"
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      <main className="flex-1 p-4 lg:p-8 pt-28 lg:pt-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
