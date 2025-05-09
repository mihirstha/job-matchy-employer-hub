
import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg md:hidden">
            <Menu className="h-5 w-5 text-white" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      {!isMobile && <DashboardSidebar />}

      {/* Main Content */}
      <div className={`pb-16 ${isMobile ? '' : 'md:pl-64'}`}>
        <DashboardHeader />
        <main className="container mx-auto p-4 md:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
