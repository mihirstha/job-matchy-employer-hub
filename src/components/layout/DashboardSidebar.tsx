
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Briefcase,
  Users,
  Calendar,
  MessageSquare,
  Bookmark,
  Settings,
  Heart
} from "lucide-react";

export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Overview", path: "/", icon: Home },
    { label: "Jobs", path: "/jobs", icon: Briefcase },
    { label: "Candidates", path: "/candidates", icon: Users },
    { label: "Swipe Candidates", path: "/swipe", icon: Heart },
    { label: "Calendar", path: "/calendar", icon: Calendar },
    { label: "Messages", path: "/messages", icon: MessageSquare },
    { label: "Saved", path: "/saved", icon: Bookmark },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-white px-4 py-8 shadow-sm md:flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900">JOB MATCHY</span>
        </div>
        <div className="mt-1 text-center text-xs text-gray-500">
          Recruitment Simplified
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              location.pathname === item.path
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            )}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 text-sm font-medium">Need help?</div>
          <p className="mb-3 text-xs text-gray-500">
            Contact our support team for assistance with your recruitment needs.
          </p>
          <Button
            variant="outline"
            className="w-full text-xs"
            onClick={() => navigate("/support")}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
