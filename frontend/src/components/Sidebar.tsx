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
  LogOut,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "DASHBOARD", href: "/dashboard" },
  { icon: Calendar, label: "PLANNER", href: "/planner" },
  { icon: CheckSquare, label: "TASKS", href: "/tasks" },
  { icon: BarChart2, label: "PROGRESS", href: "/progress" },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("orbit_token");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-black border-r-4 border-primary p-6 flex flex-col space-y-12 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex justify-between items-center lg:block">
          <Link href="/dashboard" onClick={closeSidebar} className="bg-primary text-black font-heading text-4xl p-4 border-brutalist shadow-brutalist -rotate-2 block text-center flex-1">
            CA ORBIT
          </Link>
          <button onClick={closeSidebar} className="lg:hidden text-white ml-4 neo-btn bg-red-500 p-2">
            <X className="w-8 h-8" />
          </button>
        </div>

        <nav className="flex-1 space-y-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label}
                href={item.href}
                onClick={closeSidebar}
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
    </>
  );
};
