
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Filter, Video } from "lucide-react";
import { TinderStyleCard } from "./TinderStyleCard";
import { CandidateFilters } from "./CandidateFilters";
import { VideoResumeDialog } from "./VideoResumeDialog";
import { useToast } from "@/hooks/use-toast";

export interface CandidatesListProps {
  onViewProfile: (id: string) => void;
  filter?: "all" | "shortlisted" | "liked" | null;
}

export function CandidatesList({ onViewProfile, filter = null }: CandidatesListProps) {
  const [showTinderView, setShowTinderView] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVideoResumeOpen, setIsVideoResumeOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeCandidate, setActiveCandidate] = useState<any>(null);
  const { toast } = useToast();
  
  // Sample candidates data - in a real app, this would come from an API
  const allCandidates = [
    {
      id: "1",
      name: "Rahul Patel",
      avatar: "https://i.pravatar.cc/150?img=11",
      photo: "https://i.pravatar.cc/300?img=11",
      position: "Frontend Developer",
      jobTitle: "Frontend Developer",
      location: "Kathmandu, Nepal",
      experience: "5 years",
      skills: ["React", "JavaScript", "CSS"],
      status: "shortlisted",
      isMatched: true,
      age: 28,
      gender: "Male",
      education: "Bachelor in Computer Science",
      bio: "Passionate about creating beautiful user interfaces.",
      views: 45,
      likes: 12,
      bookmarks: 8,
      jobSuccess: 95,
    },
    {
      id: "2",
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=5",
      photo: "https://i.pravatar.cc/300?img=5",
      position: "UI/UX Designer",
      jobTitle: "UI/UX Designer",
      location: "Pokhara, Nepal",
      experience: "3 years",
      skills: ["Figma", "Adobe XD", "Sketch"],
      status: "liked",
      isMatched: true,
      age: 25,
      gender: "Female",
      education: "Master's in Design",
      bio: "Creative designer with a keen eye for aesthetics.",
      views: 38,
      likes: 15,
      bookmarks: 5,
      jobSuccess: 90,
    },
    {
      id: "3",
      name: "Ankit Gupta",
      avatar: "https://i.pravatar.cc/150?img=12",
      photo: "https://i.pravatar.cc/300?img=12",
      position: "Full Stack Developer",
      jobTitle: "Full Stack Developer",
      location: "Birgunj, Nepal",
      experience: "4 years",
      skills: ["Node.js", "MongoDB", "React"],
      status: "new",
      isMatched: false,
      age: 30,
      gender: "Male",
      education: "Bachelor in Information Technology",
      bio: "Problem solver who enjoys building web applications.",
      views: 27,
      likes: 8,
      bookmarks: 3,
      jobSuccess: 88,
    },
    {
      id: "4",
      name: "Sunita KC",
      avatar: "https://i.pravatar.cc/150?img=6",
      photo: "https://i.pravatar.cc/300?img=6",
      position: "Backend Developer",
      jobTitle: "Backend Developer",
      location: "Kathmandu, Nepal",
      experience: "2 years",
      skills: ["Python", "Django", "PostgreSQL"],
      status: "shortlisted",
      isMatched: true,
      age: 27,
      gender: "Female",
      education: "Bachelor in Computer Engineering",
      bio: "Backend specialist focused on creating robust solutions.",
      views: 32,
      likes: 10,
      bookmarks: 4,
      jobSuccess: 85,
    },
    {
      id: "5",
      name: "Bijay Thapa",
      avatar: "https://i.pravatar.cc/150?img=13",
      photo: "https://i.pravatar.cc/300?img=13",
      position: "Mobile App Developer",
      jobTitle: "Mobile App Developer",
      location: "Lalitpur, Nepal",
      experience: "3 years",
      skills: ["Flutter", "Dart", "Firebase"],
      status: "liked",
      isMatched: true,
      age: 29,
      gender: "Male",
      education: "Bachelor in Electronics and Communication",
      bio: "Mobile application developer with cross-platform experience.",
      views: 41,
      likes: 14,
      bookmarks: 6,
      jobSuccess: 92,
    },
  ];
  
  // Sample jobs data
  const jobs = [
    { id: "job1", title: "Frontend Developer", location: "Kathmandu", applicants: 12 },
    { id: "job2", title: "UI/UX Designer", location: "Pokhara", applicants: 8 },
    { id: "job3", title: "Full Stack Developer", location: "Kathmandu", applicants: 15 },
  ];
  
  // Filter candidates based on the selected filter
  const filteredCandidates = filter 
    ? filter === 'all' 
      ? allCandidates
      : allCandidates.filter(candidate => candidate.status === filter)
    : allCandidates;
  
  const handleViewProfile = (id: string) => {
    onViewProfile(id);
  };
  
  const handleJobSelect = (jobId: string) => {
    setSelectedJobId(jobId);
    setShowTinderView(true);
    setCurrentCardIndex(0);
  };
  
  const handleSwipe = (direction: string) => {
    if (currentCardIndex < filteredCandidates.length - 1) {
      if (direction === "right") {
        toast({
          title: "Candidate Liked!",
          description: `You've liked ${filteredCandidates[currentCardIndex].isMatched ? filteredCandidates[currentCardIndex].name : 'this candidate'}.`,
        });
      }
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      toast({
        title: "No more candidates",
        description: "You've viewed all candidates for this job.",
      });
      setShowTinderView(false);
    }
  };
  
  const handleViewVideoResume = (candidate: any) => {
    setActiveCandidate(candidate);
    setIsVideoResumeOpen(true);
  };
  
  const handleApplyFilters = (filters: any) => {
    toast({
      title: "Filters Applied",
      description: "Candidates filtered based on your criteria.",
    });
    // In a real app, this would filter candidates based on the criteria
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'shortlisted':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shortlisted</Badge>;
      case 'liked':
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">Liked</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">New</Badge>;
    }
  };

  if (showTinderView) {
    return (
      <div className="relative h-[70vh]">
        <div className="mb-4 flex justify-between items-center">
          <Button variant="outline" onClick={() => setShowTinderView(false)}>
            Back to List View
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
        
        <div className="relative w-full max-w-md mx-auto h-[70vh]">
          {filteredCandidates.map((candidate, index) => (
            <TinderStyleCard
              key={candidate.id}
              candidate={candidate}
              onSwipe={handleSwipe}
              onViewVideoResume={() => handleViewVideoResume(candidate)}
              isActive={index === currentCardIndex}
            />
          ))}
          
          {currentCardIndex >= filteredCandidates.length && (
            <Card className="flex flex-col items-center justify-center h-[70vh] p-8 text-center shadow-lg">
              <h3 className="text-xl font-bold mb-4">No more candidates!</h3>
              <p className="text-gray-600 mb-6">You've gone through all available candidates.</p>
              <Button onClick={() => setCurrentCardIndex(0)}>Start Over</Button>
            </Card>
          )}
        </div>
        
        {/* Filters Dialog */}
        <CandidateFilters 
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
        
        {/* Video Resume Dialog */}
        {activeCandidate && (
          <VideoResumeDialog
            isOpen={isVideoResumeOpen}
            onClose={() => setIsVideoResumeOpen(false)}
            candidateName={activeCandidate.isMatched ? activeCandidate.name : "Candidate"}
          />
        )}
      </div>
    );
  }

  // Default list view with job selection option
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Select a Job to View Candidates</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map(job => (
              <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleJobSelect(job.id)}>
                <CardContent className="p-4">
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-gray-500">{job.location}</p>
                  <Badge className="mt-2 bg-primary/10 text-primary">
                    {job.applicants} Applicants
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
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
                      <div className="flex items-center gap-3">
                        <h3 className={`font-semibold text-lg ${!candidate.isMatched ? 'blur-sm select-none' : ''}`}>
                          {candidate.isMatched ? candidate.name : "Candidate"}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {candidate.age} years
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {candidate.gender}
                        </Badge>
                      </div>
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
                      
                      {/* Display stats for recruiters */}
                      <div className="flex flex-wrap gap-3 pt-2 text-xs text-gray-500">
                        <span>👁️ {candidate.views} Views</span>
                        <span>❤️ {candidate.likes} Likes</span>
                        <span>🔖 {candidate.bookmarks} Bookmarks</span>
                        <span>✅ {candidate.jobSuccess}% Success Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3 bg-gray-50 p-6 flex flex-col justify-between">
                  <div className="flex flex-col space-y-2 mt-4">
                    <Button 
                      onClick={() => handleViewProfile(candidate.id)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      View Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleViewVideoResume(candidate)}
                    >
                      <Video className="h-4 w-4" /> Video Resume
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        Like
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Shortlist
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      
      {/* Video Resume Dialog */}
      {activeCandidate && (
        <VideoResumeDialog
          isOpen={isVideoResumeOpen}
          onClose={() => setIsVideoResumeOpen(false)}
          candidateName={activeCandidate.isMatched ? activeCandidate.name : "Candidate"}
        />
      )}
    </div>
  );
}
