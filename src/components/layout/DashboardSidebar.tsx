
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare,
  Heart,
  Settings,
  LogOut
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
};

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary-100",
        active ? "bg-primary-100 text-primary-700" : "text-gray-600"
      )}
    >
      <span className="flex h-6 w-6 items-center justify-center">
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export function DashboardSidebar() {
  const path = window.location.pathname;
  
  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-white h-screen fixed top-0 left-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-secondary-600">Job Matchy Nepal</h2>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        <SidebarItem 
          icon={<Home className="h-5 w-5" />} 
          label="Dashboard" 
          href="/" 
          active={path === "/"}
        />
        <SidebarItem 
          icon={<Users className="h-5 w-5" />} 
          label="Job Postings" 
          href="/jobs" 
          active={path.includes("/jobs")}
        />
        <SidebarItem 
          icon={<Users className="h-5 w-5" />} 
          label="Candidates" 
          href="/candidates" 
          active={path.includes("/candidates")}
        />
        <SidebarItem 
          icon={<Calendar className="h-5 w-5" />} 
          label="Calendar" 
          href="/calendar" 
          active={path.includes("/calendar")}
        />
        <SidebarItem 
          icon={<MessageSquare className="h-5 w-5" />} 
          label="Messages" 
          href="/messages" 
          active={path.includes("/messages")}
        />
        <SidebarItem 
          icon={<Heart className="h-5 w-5" />} 
          label="Saved" 
          href="/saved" 
          active={path.includes("/saved")}
        />
      </nav>
      <div className="px-3 py-4 mt-auto border-t">
        <SidebarItem 
          icon={<Settings className="h-5 w-5" />} 
          label="Settings" 
          href="/settings" 
          active={path.includes("/settings")}
        />
        <SidebarItem 
          icon={<LogOut className="h-5 w-5" />} 
          label="Logout" 
          href="/logout"
        />
      </div>
    </aside>
  );
}
