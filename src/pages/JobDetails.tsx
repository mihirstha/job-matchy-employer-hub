
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TinderStyle } from "@/components/jobs/TinderStyle";
import { JobDetail } from "@/components/jobs/JobDetail";
import { ArrowLeft, Users, Eye, Heart, Bookmark, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatsCard } from "@/components/dashboard/StatsCard";

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [showCandidates, setShowCandidates] = useState(false);
  const [jobComplete, setJobComplete] = useState(false);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [hireFeedback, setHireFeedback] = useState<'yes' | 'no' | null>(null);
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
    views: 245,
    saved: 18,
    likes: 32
  };
  
  const handleReviewComplete = () => {
    toast({
      title: "Review Complete",
      description: "You've finished reviewing all candidates for this job."
    });
  };

  const completeJob = () => {
    setJobComplete(true);
    setFeedbackDialog(true);
  };

  const submitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback."
    });
    setFeedbackDialog(false);
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
        <h1 className="text-2xl font-bold text-secondary-700">{job.title}</h1>
        
        {/* Job completion button */}
        {!jobComplete && (
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto"
            onClick={completeJob}
          >
            Mark as Complete
          </Button>
        )}
        {jobComplete && (
          <span className="ml-auto px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
            Completed
          </span>
        )}
      </div>
      
      {/* Job Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Job Views" 
          value={job.views.toString()} 
          icon={<Eye className="h-5 w-5" />}
        />
        <StatsCard 
          title="Applications" 
          value={job.applicants.toString()} 
          icon={<Users className="h-5 w-5" />} 
        />
        <StatsCard 
          title="Saved by" 
          value={job.saved.toString()} 
          icon={<Bookmark className="h-5 w-5" />}
        />
        <StatsCard 
          title="Liked by" 
          value={job.likes.toString()} 
          icon={<Heart className="h-5 w-5" />}
        />
      </div>
      
      {!showCandidates ? (
        <div className="space-y-6">
          {/* Applicants section at the top */}
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
          
          {/* Job details section moved to the bottom */}
          <JobDetail job={job} />
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

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialog} onOpenChange={setFeedbackDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Job Feedback</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Were you successful in finding a job seeker?</h3>
              <RadioGroup value={hireFeedback || ''} onValueChange={(value) => setHireFeedback(value as 'yes' | 'no')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="hire-yes" />
                  <Label htmlFor="hire-yes">Yes, I found someone great!</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hire-no" />
                  <Label htmlFor="hire-no">No, I couldn't find the right fit</Label>
                </div>
              </RadioGroup>
            </div>
            
            {hireFeedback === 'yes' && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium">What helped you make the final decision?</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="reason-video" className="h-4 w-4 rounded" />
                    <Label htmlFor="reason-video">Video Resume</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="reason-skills" className="h-4 w-4 rounded" />
                    <Label htmlFor="reason-skills">Matching Skills</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="reason-experience" className="h-4 w-4 rounded" />
                    <Label htmlFor="reason-experience">Work Experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="reason-interview" className="h-4 w-4 rounded" />
                    <Label htmlFor="reason-interview">Personal Interview</Label>
                  </div>
                </div>
              </div>
            )}
            
            {hireFeedback === 'no' && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium">What was missing from the candidates?</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="missing-skills" className="h-4 w-4 rounded" />
                    <Label htmlFor="missing-skills">Required Skills</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="missing-experience" className="h-4 w-4 rounded" />
                    <Label htmlFor="missing-experience">Sufficient Experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="missing-fit" className="h-4 w-4 rounded" />
                    <Label htmlFor="missing-fit">Cultural Fit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="missing-salary" className="h-4 w-4 rounded" />
                    <Label htmlFor="missing-salary">Salary Expectations</Label>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <Label htmlFor="feedback-comments">Additional Comments</Label>
              <Textarea id="feedback-comments" placeholder="Share any additional feedback about your experience" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackDialog(false)}>Cancel</Button>
            <Button onClick={submitFeedback} className="bg-primary">Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default JobDetails;
