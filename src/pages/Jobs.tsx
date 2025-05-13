
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { JobPostingsList } from "@/components/dashboard/JobPostingsList";
import { Users, Eye, Briefcase } from "lucide-react";
import { EnhancedJobPostingForm } from "@/components/jobs/EnhancedJobPostingForm";
import { useToast } from "@/hooks/use-toast";

const Jobs = () => {
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNewJobClick = () => {
    setShowNewJobForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
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
            className="h-10 mr-4"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/100x40?text=Job+Matchy+Nepal";
            }}
          />
          <h1 className="text-2xl font-bold text-secondary-700">Job Postings</h1>
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
          {/* Stats Section */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
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
          </div>
          
          {/* Job Listings with clickable jobs */}
          <JobPostingsList onNewJobClick={handleNewJobClick} onJobClick={handleJobClick} />
        </>
      )}
    </DashboardLayout>
  );
};

export default Jobs;
