
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PricingTable } from "@/components/dashboard/PricingTable";
import { JobPostingsList } from "@/components/dashboard/JobPostingsList";
import { Users, Eye, Bookmark, Briefcase, Heart, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnhancedJobPostingForm } from "@/components/jobs/EnhancedJobPostingForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const { toast } = useToast();
  
  const handleJobClick = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
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
      </div>
      
      {showNewJobForm ? (
        <EnhancedJobPostingForm 
          onCancel={() => setShowNewJobForm(false)}
          onSuccess={() => {
            setShowNewJobForm(false);
            toast({
              title: "Success!",
              description: "Job posting created successfully.",
            });
          }}
        />
      ) : (
        <>
          {/* Stats Section - Total jobs, views, applicants, and more */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            <StatsCard
              title="Total Job Posts"
              value="12"
              icon={<Briefcase className="h-5 w-5" />}
            />
            <StatsCard
              title="Total Job Views"
              value="2,340"
              icon={<Eye className="h-5 w-5" />}
            />
            <StatsCard
              title="Total Applicants"
              value="89"
              icon={<Users className="h-5 w-5" />}
            />
            <StatsCard
              title="Jobs Saved"
              value="156"
              icon={<Bookmark className="h-5 w-5" />}
            />
            <StatsCard
              title="Successful Hires"
              value="8"
              icon={<UserCheck className="h-5 w-5" />}
            />
          </div>
          
          {/* Recent Jobs List - With clickable titles and links to candidates */}
          <div className="mt-8">
            <JobPostingsList 
              onJobClick={handleJobClick} 
              onNewJobClick={() => setShowNewJobForm(true)}
            />
          </div>
          
          {/* Pricing Table */}
          <div className="mt-8">
            <PricingTable />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Index;
