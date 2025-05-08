
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PricingTable } from "@/components/dashboard/PricingTable";
import { JobPostingsList } from "@/components/dashboard/JobPostingsList";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { Users, Eye, Calendar, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-2xl font-bold text-secondary-700">Employer Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Job Posts"
          value="12"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Total Applicants"
          value="143"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Job Views"
          value="2,340"
          icon={<Eye className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Upcoming Interviews"
          value="8"
          icon={<Calendar className="h-5 w-5" />}
        />
      </div>
      
      {/* Recent Jobs and Activities */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <JobPostingsList />
        </div>
        <div>
          <RecentActivities />
        </div>
      </div>
      
      {/* Pricing Table */}
      <div className="mt-8">
        <PricingTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
