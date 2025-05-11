
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { JobPostingsList } from "@/components/dashboard/JobPostingsList";
import { Button } from "@/components/ui/button";
import { Users, Eye, Plus } from "lucide-react";
import { JobPostingForm } from "@/components/jobs/JobPostingForm";
import { useToast } from "@/hooks/use-toast";

const Jobs = () => {
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const { toast } = useToast();

  const handleNewJobClick = () => {
    setShowNewJobForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <Button 
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={() => setShowNewJobForm(!showNewJobForm)}
        >
          {showNewJobForm ? "Cancel" : <>
            <Plus className="mr-1 h-4 w-4" /> New Job Post
          </>}
        </Button>
      </div>
      
      {showNewJobForm ? (
        <JobPostingForm 
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
          </div>
          
          {/* Job Listings */}
          <JobPostingsList onNewJobClick={handleNewJobClick} />
        </>
      )}
    </DashboardLayout>
  );
};

export default Jobs;
