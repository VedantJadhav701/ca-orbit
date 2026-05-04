"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  BarChart2,
  LogOut
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "DASHBOARD", href: "/dashboard" },
  { icon: Calendar, label: "PLANNER", href: "/planner" },
  { icon: CheckSquare, label: "TASKS", href: "/tasks" },
  { icon: BarChart2, label: "PROGRESS", href: "/progress" },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("orbit_token");
    router.push("/login");
  };

  return (
    <aside className="w-80 min-h-screen bg-black border-r-4 border-primary p-6 flex flex-col space-y-12">
      <Link href="/dashboard" className="bg-primary text-black font-heading text-4xl p-4 border-brutalist shadow-brutalist -rotate-2 block text-center">
        CA ORBIT
      </Link>

      <nav className="flex-1 space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-4 p-4 font-heading text-2xl border-4 transition-all group ${
                isActive 
                  ? "border-primary bg-primary/20 text-primary" 
                  : "border-transparent text-white hover:border-white hover:bg-white/10"
              }`}
            >
              <item.icon className={`w-8 h-8 transition-colors ${isActive ? "text-primary" : "group-hover:text-primary"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-4 p-4 font-heading text-2xl text-secondary border-4 border-transparent hover:border-secondary transition-all"
        >
          <LogOut className="w-8 h-8" />
          <span>LOGOUT</span>
        </button>
      </div>
    </aside>
  );
};
