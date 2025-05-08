
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Heart, Calendar, Video, ThumbsUp, ThumbsDown, Star, FileText, Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CandidateProfileProps {
  candidateId: string;
  onBack: () => void;
}

export function CandidateProfile({ candidateId, onBack }: CandidateProfileProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  // Mock candidate data (in a real app, you would fetch this based on candidateId)
  const candidate = {
    id: candidateId,
    name: candidateId === "1" ? "Priyanka Sharma" : 
          candidateId === "2" ? "Rahul Patel" : 
          candidateId === "3" ? "Ankit Gurung" : 
          candidateId === "4" ? "Sita Thapa" : "Ravi Bhandari",
    role: candidateId === "1" ? "Frontend Developer" :
          candidateId === "2" ? "Backend Developer" :
          candidateId === "3" ? "Full Stack Developer" :
          candidateId === "4" ? "UI/UX Designer" : "DevOps Engineer",
    location: candidateId === "1" || candidateId === "3" ? "Kathmandu" : 
              candidateId === "2" ? "Pokhara" : 
              candidateId === "4" ? "Bhaktapur" : "Butwal",
    email: `candidate${candidateId}@example.com`,
    phone: "+977 98XXXXXXXX",
    experience: candidateId === "1" ? "3 years" :
                candidateId === "2" ? "5 years" :
                candidateId === "3" ? "4 years" :
                candidateId === "4" ? "2 years" : "6 years",
    education: candidateId === "1" ? "B.E. in Computer Engineering" :
               candidateId === "2" ? "M.Tech in Information Technology" :
               candidateId === "3" ? "B.Sc. in Computer Science" :
               candidateId === "4" ? "B.A. in Visual Design" : "M.Sc. in Cloud Computing",
    skills: candidateId === "1" ? ["React", "JavaScript", "HTML/CSS", "UI/UX"] :
            candidateId === "2" ? ["Node.js", "Python", "MongoDB", "AWS"] :
            candidateId === "3" ? ["React", "Node.js", "Express", "PostgreSQL"] :
            candidateId === "4" ? ["Figma", "Adobe XD", "Sketch", "Prototyping"] : 
            ["Docker", "Kubernetes", "CI/CD", "AWS"],
    appliedFor: candidateId === "1" || candidateId === "2" ? "Senior React Developer" :
                candidateId === "3" ? "Marketing Specialist" :
                candidateId === "4" ? "Product Manager" : "Financial Analyst",
    appliedDate: candidateId === "1" || candidateId === "5" ? "2025-05-01" :
                 candidateId === "2" ? "2025-05-02" :
                 candidateId === "3" ? "2025-05-03" : "2025-05-04",
    status: candidateId === "1" ? "shortlisted" :
            candidateId === "2" || candidateId === "4" ? "new" :
            candidateId === "3" ? "interviewed" : "rejected",
    avatar: `https://i.pravatar.cc/150?img=${candidateId}`,
    hasVideo: candidateId === "1" || candidateId === "3" || candidateId === "4",
    about: "Passionate and dedicated professional with a strong background in software development. Excellent problem-solving skills and a team player with a keen eye for detail.",
    workHistory: [
      { 
        id: 1, 
        title: "Software Engineer", 
        company: "Tech Solutions Nepal", 
        duration: "2020-2023", 
        description: "Developed and maintained web applications using React, Node.js and MongoDB. Collaborated with cross-functional teams to deliver high-quality software products."
      },
      { 
        id: 2, 
        title: "Junior Developer", 
        company: "Global IT Services", 
        duration: "2018-2020", 
        description: "Worked on frontend development using HTML, CSS, and JavaScript. Assisted in the development of responsive and user-friendly web applications."
      }
    ],
    certifications: [
      { id: 1, name: "Full Stack Web Development", issuer: "Udemy", year: "2021" },
      { id: 2, name: "Advanced JavaScript", issuer: "Coursera", year: "2020" }
    ],
    videoResume: candidateId === "1" || candidateId === "3" || candidateId === "4" ? 
      "https://example.com/video-resume.mp4" : null
  };

  // Handle candidate actions
  const handleAction = (action: string) => {
    switch (action) {
      case "shortlist":
        toast({
          title: "Candidate Shortlisted",
          description: `${candidate.name} has been added to your shortlist.`,
        });
        break;
      case "reject":
        toast({
          title: "Candidate Rejected",
          description: `${candidate.name} has been marked as rejected.`,
        });
        break;
      case "save":
        toast({
          title: "Candidate Saved",
          description: `${candidate.name} has been saved to your favorites.`,
        });
        break;
      case "schedule":
        toast({
          title: "Interview Scheduling",
          description: `You can now schedule an interview with ${candidate.name}.`,
        });
        break;
      case "video":
        toast({
          title: "Video Resume",
          description: `Now playing ${candidate.name}'s video resume.`,
        });
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="secondary">New</Badge>;
      case "shortlisted":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shortlisted</Badge>;
      case "interviewed":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Interviewed</Badge>;
      case "offered":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Offered</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Candidates
        </Button>
      </div>

      {/* Candidate Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <img src={candidate.avatar} alt={candidate.name} />
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{candidate.name}</h2>
                  {getStatusBadge(candidate.status)}
                </div>
                <p className="text-lg text-gray-600">{candidate.role}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{candidate.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    <span>{candidate.education}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleAction("save")}
              >
                <Heart className="mr-1 h-4 w-4" /> Save
              </Button>
              {candidate.hasVideo && (
                <Button 
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/10"
                  onClick={() => handleAction("video")}
                >
                  <Video className="mr-1 h-4 w-4" /> Video Resume
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={() => handleAction("schedule")}
              >
                <Calendar className="mr-1 h-4 w-4" /> Schedule Interview
              </Button>
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => handleAction("shortlist")}
              >
                <Star className="mr-1 h-4 w-4" /> Shortlist
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handleAction("reject")}
              >
                <ThumbsDown className="mr-1 h-4 w-4" /> Reject
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Details */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
              {candidate.hasVideo && (
                <TabsTrigger value="video">Video Resume</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="profile">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{candidate.about}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="bg-secondary/20 text-secondary-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{candidate.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                  <div className="space-y-2">
                    {candidate.certifications.map((cert) => (
                      <div key={cert.id} className="border p-3 rounded-md">
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-gray-500">
                          {cert.issuer} • {cert.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="experience">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Work History</h3>
                  <div className="space-y-4">
                    {candidate.workHistory.map((job) => (
                      <div key={job.id} className="border p-4 rounded-md">
                        <div className="font-semibold">{job.title}</div>
                        <div className="text-gray-700">{job.company}</div>
                        <div className="text-sm text-gray-500 mb-2">{job.duration}</div>
                        <p className="text-gray-700">{job.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <div className="border p-4 rounded-md">
                    <div className="font-semibold">{candidate.education}</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="application">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Application Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-4 rounded-md">
                      <div className="text-sm text-gray-500">Applied For</div>
                      <div className="font-medium">{candidate.appliedFor}</div>
                    </div>
                    
                    <div className="border p-4 rounded-md">
                      <div className="text-sm text-gray-500">Application Date</div>
                      <div className="font-medium">
                        {new Date(candidate.appliedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-md">
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="font-medium">{candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Resume & Documents</h3>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Resume (PDF)
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {candidate.hasVideo && (
              <TabsContent value="video">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Video Resume</h3>
                    <div className="bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center">
                      <Video className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-4">Video preview available</p>
                      <Button onClick={() => handleAction("video")}>
                        <Video className="mr-1 h-4 w-4" /> Play Video Resume
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
