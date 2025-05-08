
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, User, Briefcase, MapPin, Trash2, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Saved = () => {
  // Mock data for saved candidates
  const savedCandidates = [
    {
      id: "1",
      name: "Priyanka Sharma",
      role: "Frontend Developer",
      location: "Kathmandu",
      experience: "3 years",
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX"],
      savedDate: "2025-05-01",
      avatar: "https://i.pravatar.cc/150?img=1",
      notes: "Excellent React skills, potential for senior role"
    },
    {
      id: "3",
      name: "Ankit Gurung",
      role: "Full Stack Developer",
      location: "Lalitpur",
      experience: "4 years",
      skills: ["React", "Node.js", "Express", "PostgreSQL"],
      savedDate: "2025-05-03",
      avatar: "https://i.pravatar.cc/150?img=3",
      notes: "Strong backend experience, good for full stack positions"
    },
    {
      id: "4",
      name: "Sita Thapa",
      role: "UI/UX Designer",
      location: "Bhaktapur",
      experience: "2 years",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      savedDate: "2025-05-04",
      avatar: "https://i.pravatar.cc/150?img=4",
      notes: "Great visual design skills"
    },
  ];
  
  // Mock data for saved jobs
  const savedJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "Tech Solutions Nepal",
      location: "Remote",
      type: "Full-time",
      savedDate: "2025-05-02",
      salary: "Rs. 80,000 - Rs. 120,000",
      logo: "https://picsum.photos/id/1/200"
    },
    {
      id: "2",
      title: "DevOps Engineer",
      company: "Cloud Systems Ltd",
      location: "Kathmandu",
      type: "Full-time",
      savedDate: "2025-05-03",
      salary: "Rs. 100,000 - Rs. 150,000",
      logo: "https://picsum.photos/id/2/200"
    }
  ];
  
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-2xl font-bold text-secondary-700">Saved Items</h1>
      
      <Tabs defaultValue="candidates" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="candidates">Saved Candidates</TabsTrigger>
          <TabsTrigger value="jobs">Saved Job Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="candidates">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Saved Candidates</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search saved candidates..."
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              {savedCandidates.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No saved candidates found.
                </div>
              ) : (
                <div className="space-y-4">
                  {savedCandidates.map((candidate) => (
                    <div key={candidate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                          <Avatar>
                            {candidate.avatar ? (
                              <img src={candidate.avatar} alt={candidate.name} />
                            ) : (
                              <User className="h-5 w-5" />
                            )}
                          </Avatar>
                          
                          <div>
                            <h4 className="font-medium">{candidate.name}</h4>
                            <p className="text-gray-600">{candidate.role}</p>
                            
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="mr-1 h-4 w-4" />
                              <span>{candidate.location}</span>
                              <span className="mx-2">•</span>
                              <Briefcase className="mr-1 h-4 w-4" />
                              <span>{candidate.experience}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:items-end">
                          <p className="text-xs text-gray-500">
                            Saved on {new Date(candidate.savedDate).toLocaleDateString()}
                          </p>
                          
                          <div className="mt-2 flex gap-2">
                            <Button size="sm" variant="outline">
                              <Calendar className="mr-1 h-4 w-4" /> Schedule
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {candidate.notes && (
                        <div className="mt-3 bg-secondary/20 text-secondary-700 p-2 rounded text-sm">
                          <p><span className="font-medium">Notes:</span> {candidate.notes}</p>
                        </div>
                      )}
                      
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="bg-secondary/20">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="jobs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Saved Job Templates</CardTitle>
              <Button>
                Create Job Template
              </Button>
            </CardHeader>
            <CardContent>
              {savedJobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No saved job templates found.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                          {job.logo ? (
                            <img src={job.logo} alt={job.company} className="h-full w-full object-cover" />
                          ) : (
                            <Briefcase className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-gray-600">{job.company}</p>
                          
                          <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>{job.location}</span>
                            <span className="mx-2">•</span>
                            <span>{job.type}</span>
                          </div>
                          
                          <p className="text-sm text-primary font-medium mt-2">{job.salary}</p>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <p className="text-xs text-gray-500">
                              Saved on {new Date(job.savedDate).toLocaleDateString()}
                            </p>
                            
                            <div className="flex gap-2">
                              <Button size="sm">Use Template</Button>
                              <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Saved;
