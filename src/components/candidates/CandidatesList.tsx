
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Calendar, Video, ThumbsUp, ThumbsDown, Star, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Candidate = {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  appliedFor: string;
  appliedDate: string;
  status: "new" | "shortlisted" | "interviewed" | "offered" | "rejected";
  avatar?: string;
  hasVideo?: boolean;
};

interface CandidatesListProps {
  onViewProfile: (id: string) => void;
}

export function CandidatesList({ onViewProfile }: CandidatesListProps) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  
  // Mock data for candidates
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "Priyanka Sharma",
      role: "Frontend Developer",
      location: "Kathmandu",
      experience: "3 years",
      education: "B.E. in Computer Engineering",
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX"],
      appliedFor: "Senior React Developer",
      appliedDate: "2025-05-01",
      status: "shortlisted",
      avatar: "https://i.pravatar.cc/150?img=1",
      hasVideo: true,
    },
    {
      id: "2",
      name: "Rahul Patel",
      role: "Backend Developer",
      location: "Pokhara",
      experience: "5 years",
      education: "M.Tech in Information Technology",
      skills: ["Node.js", "Python", "MongoDB", "AWS"],
      appliedFor: "Senior React Developer",
      appliedDate: "2025-05-02",
      status: "new",
      avatar: "https://i.pravatar.cc/150?img=2",
      hasVideo: false,
    },
    {
      id: "3",
      name: "Ankit Gurung",
      role: "Full Stack Developer",
      location: "Lalitpur",
      experience: "4 years",
      education: "B.Sc. in Computer Science",
      skills: ["React", "Node.js", "Express", "PostgreSQL"],
      appliedFor: "Marketing Specialist",
      appliedDate: "2025-05-03",
      status: "interviewed",
      avatar: "https://i.pravatar.cc/150?img=3",
      hasVideo: true,
    },
    {
      id: "4",
      name: "Sita Thapa",
      role: "UI/UX Designer",
      location: "Bhaktapur",
      experience: "2 years",
      education: "B.A. in Visual Design",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      appliedFor: "Product Manager",
      appliedDate: "2025-05-04",
      status: "new",
      avatar: "https://i.pravatar.cc/150?img=4",
      hasVideo: true,
    },
    {
      id: "5",
      name: "Ravi Bhandari",
      role: "DevOps Engineer",
      location: "Butwal",
      experience: "6 years",
      education: "M.Sc. in Cloud Computing",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
      appliedFor: "Financial Analyst",
      appliedDate: "2025-05-01",
      status: "rejected",
      avatar: "https://i.pravatar.cc/150?img=5",
      hasVideo: false,
    }
  ];
  
  // Filter and search candidates
  const filteredCandidates = candidates.filter(candidate => {
    const matchesFilter = filter === "all" || candidate.status === filter;
    const matchesSearch = candidate.name.toLowerCase().includes(search.toLowerCase()) || 
                         candidate.role.toLowerCase().includes(search.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });
  
  // Status badge styling
  const getStatusBadge = (status: Candidate["status"]) => {
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

  // Handle candidate actions
  const handleCandidateAction = (id: string, action: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (!candidate) return;

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
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Candidate Applications</CardTitle>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search candidates, skills..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Candidates</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="interviewed">Interviewed</SelectItem>
              <SelectItem value="offered">Offered</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredCandidates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No candidates found matching your filters.
            </div>
          ) : (
            filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <Avatar>
                      {candidate.avatar ? (
                        <img src={candidate.avatar} alt={candidate.name} />
                      ) : (
                        <div className="bg-primary/20 w-full h-full flex items-center justify-center text-primary font-medium">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </Avatar>
                    
                    <div>
                      <h4 className="text-lg font-medium">{candidate.name}</h4>
                      <p className="text-gray-600">{candidate.role}</p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>{candidate.location}</span>
                        <span className="mx-2">•</span>
                        <span>{candidate.experience}</span>
                        {candidate.hasVideo && (
                          <>
                            <span className="mx-2">•</span>
                            <Video className="h-3 w-3 text-primary" />
                            <span className="ml-1 text-primary">Video Resume</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end">
                    <div className="mb-2">
                      {getStatusBadge(candidate.status)}
                    </div>
                    <p className="text-sm text-gray-500">Applied for: {candidate.appliedFor}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(candidate.appliedDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">{candidate.education}</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="bg-secondary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-end mt-4 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCandidateAction(candidate.id, "save")}
                  >
                    <Heart className="mr-1 h-4 w-4" /> Save
                  </Button>
                  
                  {candidate.hasVideo && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-primary border-primary hover:bg-primary/10"
                      onClick={() => handleCandidateAction(candidate.id, "video")}
                    >
                      <Video className="mr-1 h-4 w-4" /> View Video
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCandidateAction(candidate.id, "schedule")}
                  >
                    <Calendar className="mr-1 h-4 w-4" /> Schedule
                  </Button>
                  
                  <Button
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleCandidateAction(candidate.id, "shortlist")}
                  >
                    <Star className="mr-1 h-4 w-4" /> Shortlist
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCandidateAction(candidate.id, "reject")}
                  >
                    <ThumbsDown className="mr-1 h-4 w-4" /> Reject
                  </Button>
                  
                  <Button 
                    size="sm"
                    onClick={() => onViewProfile(candidate.id)}
                  >
                    <Eye className="mr-1 h-4 w-4" /> View Profile
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
