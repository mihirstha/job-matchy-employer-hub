
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, Heart, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Candidates = () => {
  const navigate = useNavigate();
  
  // Sample jobs data
  const jobs = [
    { id: "1", title: "Senior React Developer", location: "Kathmandu", applicants: 24 },
    { id: "2", title: "Product Manager", location: "Pokhara", applicants: 15 },
    { id: "3", title: "Marketing Specialist", location: "Kathmandu", applicants: 7 },
    { id: "4", title: "Financial Analyst", location: "Bhaktapur", applicants: 3 }
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
          value="89"
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
              <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleViewJobCandidates(job.id)}>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg">{job.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{job.location}</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/10 text-primary">
                      {job.applicants} Applicants
                    </Badge>
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewJobCandidates(job.id);
                      }}
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
