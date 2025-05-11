
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PricingTable } from "@/components/dashboard/PricingTable";
import { JobPostingsList } from "@/components/dashboard/JobPostingsList";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { Users, Eye, Calendar } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center mb-8">
        <img 
          src="/lovable-uploads/d27daf70-5626-4ac2-a85d-6bf52bf94ef3.png" 
          alt="Job Matchy Nepal" 
          className="h-12 mr-4"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/120x48?text=Job+Matchy+Nepal";
          }}
        />
        <h1 className="text-2xl font-bold text-secondary-700">Employer Dashboard</h1>
      </div>
      
      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Job Posts"
          value="12"
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Total Applicants"
          value="143"
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Total Job Views"
          value="2,340"
          icon={<Eye className="h-5 w-5" />}
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
