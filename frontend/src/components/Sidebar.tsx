import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  BarChart2, 
  Settings,
  LogOut
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "DASHBOARD", href: "/dashboard" },
  { icon: Calendar, label: "PLANNER", href: "/planner" },
  { icon: CheckSquare, label: "TASKS", href: "/tasks" },
  { icon: BarChart2, label: "PROGRESS", href: "/progress" },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-80 min-h-screen bg-black border-r-4 border-primary p-6 flex flex-col space-y-12">
      <div className="bg-primary text-black font-heading text-4xl p-4 border-brutalist shadow-brutalist -rotate-2">
        CA ORBIT
      </div>

      <nav className="flex-1 space-y-4">
        {navItems.map((item) => (
          <Link 
            key={item.label}
            href={item.href}
            className="flex items-center space-x-4 p-4 font-heading text-2xl text-white border-4 border-transparent hover:border-white hover:bg-white/10 transition-all group"
          >
            <item.icon className="w-8 h-8 group-hover:text-primary transition-colors" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="space-y-4">
        <Link 
          href="/settings"
          className="flex items-center space-x-4 p-4 font-heading text-2xl text-white border-4 border-transparent hover:border-white transition-all"
        >
          <Settings className="w-8 h-8" />
          <span>SETTINGS</span>
        </Link>
        <button 
          className="w-full flex items-center space-x-4 p-4 font-heading text-2xl text-secondary border-4 border-transparent hover:border-secondary transition-all"
        >
          <LogOut className="w-8 h-8" />
          <span>LOGOUT</span>
        </button>
      </div>
    </aside>
  );
};
