
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Heart, X, Video } from "lucide-react";
import { CandidateFilters } from "@/components/candidates/CandidateFilters";
import { VideoResumeDialog } from "@/components/candidates/VideoResumeDialog";
import { useToast } from "@/hooks/use-toast";

interface TinderStyleProps {
  jobId: string;
  onReviewComplete?: () => void;
}

export function TinderStyle({ jobId, onReviewComplete }: TinderStyleProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVideoResumeOpen, setIsVideoResumeOpen] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState<any>(null);
  const { toast } = useToast();

  // Sample candidates data - in a real app, this would come from an API filtered by jobId
  const candidates = [
    {
      id: "1",
      name: "Rahul Patel",
      age: 28,
      gender: "Male",
      photo: "https://i.pravatar.cc/300?img=11",
      contactEmail: "rahul.patel@example.com",
      contactPhone: "+977 9801234567",
      jobTitle: "Frontend Developer",
      experience: "5 years",
      education: "Bachelor in Computer Science",
      institution: "Kathmandu University",
      bio: "Passionate about creating beautiful user interfaces with modern technologies.",
      skills: ["React", "JavaScript", "CSS", "HTML", "TypeScript"],
      expectedSalary: "Rs. 75,000",
      preferredIndustry: "Technology",
      isMatched: true,
    },
    {
      id: "2",
      name: "Priya Sharma",
      age: 25,
      gender: "Female",
      photo: "https://i.pravatar.cc/300?img=5",
      contactEmail: "priya.sharma@example.com",
      contactPhone: "+977 9802345678",
      jobTitle: "UI/UX Designer",
      experience: "3 years",
      education: "Master's in Design",
      institution: "Nepal Art Academy",
      bio: "Creative designer with a keen eye for aesthetics and user experience.",
      skills: ["Figma", "Adobe XD", "Sketch", "UI/UX", "Prototyping"],
      expectedSalary: "Rs. 65,000",
      preferredIndustry: "Creative & Design",
      isMatched: false,
    },
    {
      id: "3",
      name: "Ankit Gupta",
      age: 30,
      gender: "Male",
      photo: "https://i.pravatar.cc/300?img=12",
      contactEmail: "ankit.gupta@example.com",
      contactPhone: "+977 9803456789",
      jobTitle: "Full Stack Developer",
      experience: "4 years",
      education: "Bachelor in Information Technology",
      institution: "Tribhuvan University",
      bio: "Problem solver who enjoys building web applications with focus on scalability.",
      skills: ["Node.js", "MongoDB", "React", "Express", "Full Stack"],
      expectedSalary: "Rs. 80,000",
      preferredIndustry: "Software Development",
      isMatched: true,
    },
  ];

  const handleSwipe = (direction: string) => {
    if (currentCardIndex < candidates.length - 1) {
      if (direction === "right") {
        toast({
          title: "Candidate Liked!",
          description: `You've liked ${candidates[currentCardIndex].isMatched ? candidates[currentCardIndex].name : 'this candidate'}.`,
        });
      } else {
        toast({
          title: "Candidate Passed",
          description: "You've skipped this candidate.",
        });
      }
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      toast({
        title: "No more candidates",
        description: "You've reviewed all candidates for this job.",
      });
      if (onReviewComplete) {
        onReviewComplete();
      }
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

  return (
    <div className="relative min-h-[600px]">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">
          Reviewing applicants for this position
        </h2>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>
      
      <div className="relative w-full max-w-md mx-auto h-[600px]">
        <AnimatePresence>
          {currentCardIndex < candidates.length && (
            <motion.div
              key={candidates[currentCardIndex].id}
              className="absolute w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, x: 200 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden shadow-lg">
                {/* Card image */}
                <div className="relative h-[400px]">
                  <img
                    src={candidates[currentCardIndex].photo}
                    alt="Candidate"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Candidate info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className={`text-3xl font-bold ${!candidates[currentCardIndex].isMatched ? 'blur-sm select-none' : ''}`}>
                            {candidates[currentCardIndex].isMatched ? candidates[currentCardIndex].name : "Candidate"}
                          </h2>
                          <div className="flex items-center justify-center min-w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full px-2">
                            {candidates[currentCardIndex].age}
                          </div>
                        </div>
                        
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center gap-2 text-gray-200">
                            <span>{candidates[currentCardIndex].jobTitle}</span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 text-gray-200">
                            <span>{candidates[currentCardIndex].experience}</span>
                            <span className="text-lg">•</span>
                            <span>{candidates[currentCardIndex].gender}</span>
                          </div>
                          
                          <p className="text-sm text-gray-200">
                            {candidates[currentCardIndex].education} - {candidates[currentCardIndex].institution}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {candidates[currentCardIndex].bio}
                      </p>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Expected salary:</span> {candidates[currentCardIndex].expectedSalary}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Preferred industry:</span> {candidates[currentCardIndex].preferredIndustry}
                      </p>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {candidates[currentCardIndex].skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} className="bg-white/20 text-white border-0">
                          {skill}
                        </Badge>
                      ))}
                      {candidates[currentCardIndex].skills.length > 3 && (
                        <Badge className="bg-white/20 text-white border-0">
                          +{candidates[currentCardIndex].skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <CardContent className="flex justify-around p-4 bg-white">
                  <Button 
                    variant="outline" 
                    className="rounded-full h-16 w-16 border-2 border-red-500 text-red-500 hover:bg-red-50 p-0"
                    onClick={() => handleSwipe("left")}
                  >
                    <X className="h-8 w-8" />
                  </Button>
                  
                  <Button 
                    className="rounded-full h-16 w-16 bg-blue-500 hover:bg-blue-600 text-white p-0"
                    onClick={() => handleViewVideoResume(candidates[currentCardIndex])}
                  >
                    <Video className="h-8 w-8" />
                  </Button>
                  
                  <Button 
                    className="rounded-full h-16 w-16 bg-green-500 hover:bg-green-600 text-white p-0"
                    onClick={() => handleSwipe("right")}
                  >
                    <Heart className="h-8 w-8" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {currentCardIndex >= candidates.length && (
            <Card className="flex flex-col items-center justify-center h-[600px] p-8 text-center shadow-lg">
              <h3 className="text-xl font-bold mb-4">No more candidates!</h3>
              <p className="text-gray-600 mb-6">You've reviewed all candidates for this job.</p>
              <Button onClick={() => setCurrentCardIndex(0)}>Start Over</Button>
            </Card>
          )}
        </AnimatePresence>
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
