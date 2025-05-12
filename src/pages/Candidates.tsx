
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, Heart, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Candidates = () => {
  const navigate = useNavigate();
  
  // Sample jobs data
  const jobs = [
    { id: "job1", title: "Frontend Developer", location: "Kathmandu", applicants: 12 },
    { id: "job2", title: "UI/UX Designer", location: "Pokhara", applicants: 8 },
    { id: "job3", title: "Full Stack Developer", location: "Kathmandu", applicants: 15 },
  ];
  
  const handleViewJobCandidates = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center mb-8">
        <img 
          src="/lovable-uploads/d27daf70-5626-4ac2-a85d-6bf52bf94ef3.png" 
          alt="Job Matchy Nepal" 
          className="h-10 mr-4"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/100x40?text=Job+Matchy+Nepal";
          }}
        />
        <h1 className="text-2xl font-bold text-secondary-700">Candidates</h1>
      </div>
      
      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <StatsCard
          title="Total Applications"
          value="143"
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Liked Candidates"
          value="42"
          icon={<Heart className="h-5 w-5" />}
        />
        <StatsCard
          title="Shortlisted"
          value="28"
          icon={<Star className="h-5 w-5" />}
        />
      </div>
      
      {/* Jobs list to view candidates */}
      <Card>
        <CardHeader>
          <CardTitle>Select a job to view candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map(job => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.location}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-blue-600 font-medium">{job.applicants} Applicants</span>
                    <Button 
                      size="sm"
                      onClick={() => handleViewJobCandidates(job.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      View Candidates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Candidates;
