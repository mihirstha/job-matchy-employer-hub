
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MouseEvent } from "react";

export interface CandidatesListProps {
  onViewProfile: (id: string) => void;
  filter?: "all" | "shortlisted" | "interview" | null;
}

export function CandidatesList({ onViewProfile, filter = null }: CandidatesListProps) {
  // Sample candidates data - in a real app, this would come from an API
  const allCandidates = [
    {
      id: "1",
      name: "Rahul Patel",
      avatar: "https://i.pravatar.cc/150?img=11",
      position: "Frontend Developer",
      location: "Kathmandu, Nepal",
      experience: "5 years",
      skills: ["React", "JavaScript", "CSS"],
      status: "shortlisted",
    },
    {
      id: "2",
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=5",
      position: "UI/UX Designer",
      location: "Pokhara, Nepal",
      experience: "3 years",
      skills: ["Figma", "Adobe XD", "Sketch"],
      status: "interview",
    },
    {
      id: "3",
      name: "Ankit Gupta",
      avatar: "https://i.pravatar.cc/150?img=12",
      position: "Full Stack Developer",
      location: "Birgunj, Nepal",
      experience: "4 years",
      skills: ["Node.js", "MongoDB", "React"],
      status: "new",
    },
    {
      id: "4",
      name: "Sunita KC",
      avatar: "https://i.pravatar.cc/150?img=6",
      position: "Backend Developer",
      location: "Kathmandu, Nepal",
      experience: "2 years",
      skills: ["Python", "Django", "PostgreSQL"],
      status: "shortlisted",
    },
    {
      id: "5",
      name: "Bijay Thapa",
      avatar: "https://i.pravatar.cc/150?img=13",
      position: "Mobile App Developer",
      location: "Lalitpur, Nepal",
      experience: "3 years",
      skills: ["Flutter", "Dart", "Firebase"],
      status: "interview",
    },
    {
      id: "6",
      name: "Nisha Adhikari",
      avatar: "https://i.pravatar.cc/150?img=7",
      position: "Product Manager",
      location: "Kathmandu, Nepal",
      experience: "6 years",
      skills: ["Agile", "Scrum", "Product Development"],
      status: "new",
    },
  ];
  
  // Filter candidates based on the selected filter
  const filteredCandidates = filter 
    ? filter === 'all' 
      ? allCandidates
      : allCandidates.filter(candidate => candidate.status === filter)
    : allCandidates;
  
  const handleViewProfile = (e: MouseEvent, id: string) => {
    e.preventDefault();
    onViewProfile(id);
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'shortlisted':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shortlisted</Badge>;
      case 'interview':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Interview</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">New</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {filteredCandidates.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No candidates match your filters.</p>
          </CardContent>
        </Card>
      ) : (
        filteredCandidates.map(candidate => (
          <Card key={candidate.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-9 p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <img src={candidate.avatar} alt={candidate.position} />
                    </Avatar>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg blur-sm select-none">Candidate</h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
                        <p className="text-gray-700">{candidate.position}</p>
                        <span className="hidden md:inline text-gray-400">•</span>
                        <p className="text-gray-500">{candidate.location}</p>
                        <span className="hidden md:inline text-gray-400">•</span>
                        <p className="text-gray-500">{candidate.experience}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 pt-1">
                        {candidate.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center pt-2">
                        {getStatusBadge(candidate.status)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3 bg-gray-50 p-6 flex flex-col justify-between">
                  <div className="flex flex-col space-y-2 mt-4">
                    <Button 
                      onClick={(e) => handleViewProfile(e, candidate.id)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      View Profile
                    </Button>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        Select
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Shortlist
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-primary"
                    >
                      Save for later
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
