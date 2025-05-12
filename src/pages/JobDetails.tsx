
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TinderStyle } from "@/components/jobs/TinderStyle";
import { JobDetail } from "@/components/jobs/JobDetail";
import { ArrowLeft, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [showCandidates, setShowCandidates] = useState(false);
  const { toast } = useToast();
  
  // Sample job data - in a real app, you would fetch this based on the jobId
  const job = {
    id: jobId || "job1",
    title: "Frontend Developer",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    salary: "Rs. 60,000 - Rs. 80,000",
    description: "We are looking for an experienced Frontend Developer with strong React skills to join our team.",
    requirements: [
      "3+ years of experience with React",
      "Proficiency in JavaScript, HTML and CSS",
      "Experience with responsive design",
      "Good communication skills"
    ],
    postedDate: "2025-05-01",
    applicants: 12,
    views: 245
  };
  
  const handleReviewComplete = () => {
    toast({
      title: "Review Complete",
      description: "You've finished reviewing all candidates for this job."
    });
  };

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-secondary-700">Job Details</h1>
      </div>
      
      {!showCandidates ? (
        <div className="space-y-6">
          <JobDetail job={job} />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Applicants ({job.applicants})
                </span>
                <Button 
                  onClick={() => setShowCandidates(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Review Candidates
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {job.applicants} candidates have applied for this position. Click on "Review Candidates" to start reviewing them.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{job.title} - Reviewing Candidates</h2>
            <Button variant="outline" onClick={() => setShowCandidates(false)}>
              Back to Job Details
            </Button>
          </div>
          
          <TinderStyle jobId={job.id} onReviewComplete={handleReviewComplete} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default JobDetails;
