
import React from "react";
import { Search, Bell, User } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex md:hidden">
        <h2 className="text-xl font-bold text-secondary-600">Job Matchy Nepal</h2>
      </div>
      
      <div className="hidden md:flex md:flex-1 md:items-center md:gap-4 md:px-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 rounded-md border border-gray-300 bg-transparent pl-8 pr-3 text-sm outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="rounded-full bg-gray-100 p-2">
          <Bell className="h-4 w-4 text-gray-600" />
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full bg-gray-100 p-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="sr-only md:not-sr-only md:text-sm md:font-medium">
                Admin
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
