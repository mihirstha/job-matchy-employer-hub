import React, { useState, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Check, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample candidates data
const allCandidates = [
  {
    id: "1",
    name: "Rahul Patel",
    photo: "https://i.pravatar.cc/300?img=11",
    jobTitle: "Frontend Developer",
    location: "Kathmandu, Nepal",
    age: 28,
    gender: "Male",
    experience: "5 years",
    education: "Bachelor in Computer Science, Tribhuvan University",
    preferredIndustry: "Technology",
    salary: "Rs. 80,000 - 120,000",
    skills: ["React", "JavaScript", "CSS", "TypeScript", "Redux"],
    bio: "Passionate about creating beautiful user interfaces and delivering exceptional user experiences.",
  },
  {
    id: "2",
    name: "Priya Sharma",
    photo: "https://i.pravatar.cc/300?img=5",
    jobTitle: "UI/UX Designer",
    location: "Pokhara, Nepal",
    age: 25,
    gender: "Female",
    experience: "3 years",
    education: "Master's in Design, Kathmandu University",
    preferredIndustry: "Creative Agency",
    salary: "Rs. 70,000 - 100,000",
    skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping"],
    bio: "Creative designer with a keen eye for aesthetics and user-centered approach to design.",
  },
  {
    id: "3",
    name: "Ankit Gupta",
    photo: "https://i.pravatar.cc/300?img=12",
    jobTitle: "Full Stack Developer",
    location: "Birgunj, Nepal",
    age: 30,
    gender: "Male",
    experience: "4 years",
    education: "Bachelor in Information Technology, Purwanchal University",
    preferredIndustry: "Fintech",
    salary: "Rs. 90,000 - 130,000",
    skills: ["Node.js", "MongoDB", "React", "Express", "AWS"],
    bio: "Problem solver who enjoys building complete web applications from frontend to backend.",
  },
  {
    id: "4",
    name: "Sunita KC",
    photo: "https://i.pravatar.cc/300?img=6",
    jobTitle: "Backend Developer",
    location: "Kathmandu, Nepal",
    age: 27,
    gender: "Female",
    experience: "2 years",
    education: "Bachelor in Computer Engineering, Pulchowk Engineering Campus",
    preferredIndustry: "E-commerce",
    salary: "Rs. 75,000 - 95,000",
    skills: ["Python", "Django", "PostgreSQL", "Docker", "Git"],
    bio: "Backend specialist focused on creating robust and scalable server solutions.",
  },
  {
    id: "5",
    name: "Bijay Thapa",
    photo: "https://i.pravatar.cc/300?img=13",
    jobTitle: "Mobile App Developer",
    location: "Lalitpur, Nepal",
    age: 29,
    gender: "Male",
    experience: "3 years",
    education: "Bachelor in Electronics and Communication, IOE",
    preferredIndustry: "Mobile Technology",
    salary: "Rs. 85,000 - 115,000",
    skills: ["Flutter", "Dart", "Firebase", "iOS", "Android"],
    bio: "Mobile application developer with experience in creating cross-platform solutions.",
  },
];

const FilterDialog = ({ isOpen, onClose, onApplyFilters }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([]);
  
  const handleApply = () => {
    onApplyFilters({
      jobTitle,
      location,
      minExperience: minExperience ? parseInt(minExperience) : 0,
      gender,
      skills
    });
    onClose();
  };
  
  const skillOptions = ["React", "JavaScript", "Python", "Flutter", "UI/UX", "Node.js", "MongoDB", "Firebase"];
  
  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Candidates</SheetTitle>
          <SheetDescription>
            Customize your candidate search with these filters
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input 
              id="jobTitle" 
              placeholder="e.g. Frontend Developer" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="e.g. Kathmandu" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Minimum Experience (Years)</Label>
            <Input 
              id="experience" 
              type="number" 
              placeholder="e.g. 2" 
              value={minExperience} 
              onChange={(e) => setMinExperience(e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {skillOptions.map(skill => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`skill-${skill}`} 
                    checked={skills.includes(skill)} 
                    onCheckedChange={() => toggleSkill(skill)}
                  />
                  <label htmlFor={`skill-${skill}`} className="text-sm">{skill}</label>
                </div>
              ))}
            </div>
          </div>
          
          <Button onClick={handleApply} className="w-full mt-4">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const CandidateDetailDialog = ({ candidate, isOpen, onClose, isMatched }) => {
  if (!candidate) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Candidate Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex flex-col items-center">
            <img 
              src={candidate.photo} 
              alt={candidate.name} 
              className="w-28 h-28 rounded-full object-cover border-4 border-primary" 
            />
            <h2 className={`text-2xl font-bold mt-3 ${!isMatched ? 'blur-sm select-none' : ''}`}>
              {isMatched ? candidate.name : "Candidate Name"}
            </h2>
            <p className="text-primary font-medium">{candidate.jobTitle}</p>
          </div>
          
          <div className="grid gap-4 bg-slate-50 p-4 rounded-lg">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Location</h3>
              <p className="text-gray-800">{candidate.location}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Experience</h3>
              <p className="text-gray-800">{candidate.experience}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Preferred Industry</h3>
              <p className="text-gray-800">{candidate.preferredIndustry}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Education</h3>
              <p className="text-gray-800">{candidate.education}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Expected Salary</h3>
              <p className="text-gray-800">{candidate.salary}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Bio</h3>
              <p className="text-sm text-gray-800">{candidate.bio}</p>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={onClose} variant="outline" className="flex-1">Close</Button>
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
              <MessageSquare className="h-4 w-4 mr-2" /> Message (Rs. 499)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TinderCard = ({ 
  candidate, 
  onSwipe, 
  onViewDetails, 
  isMatched 
}: { 
  candidate: any; 
  onSwipe: (direction: string) => void; 
  onViewDetails: () => void; 
  isMatched: boolean;
}) => {
  const cardX = useMotionValue(0);
  const rotate = useTransform(cardX, [-200, 200], [-25, 25]);
  const cardOpacity = useTransform(cardX, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Visual indicators that appear based on swipe direction
  const likeOpacity = useTransform(cardX, [0, 100, 200], [0, 0.5, 1]);
  const nopeOpacity = useTransform(cardX, [-200, -100, 0], [1, 0.5, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe("right");
    } else if (info.offset.x < -100) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="absolute w-full"
      style={{ x: cardX, rotate, opacity: cardOpacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
    >
      <Card className="overflow-hidden rounded-2xl shadow-lg border-0">
        {/* Card image */}
        <div 
          className="relative h-[65vh] cursor-pointer"
          onClick={onViewDetails}
        >
          <img
            src={candidate.photo}
            alt={candidate.jobTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Swipe indicators */}
          <motion.div 
            className="absolute top-8 left-8 bg-red-500 text-white text-2xl font-bold px-6 py-2 rounded-lg border-4 border-white transform -rotate-12"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </motion.div>
          
          <motion.div 
            className="absolute top-8 right-8 bg-green-500 text-white text-2xl font-bold px-6 py-2 rounded-lg border-4 border-white transform rotate-12"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </motion.div>
          
          {/* Candidate info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h2 className={`text-3xl font-bold ${!isMatched ? 'blur-sm select-none' : ''}`}>
                  {isMatched ? candidate.name : "Candidate"}
                </h2>
                <p className="text-xl">{candidate.jobTitle}</p>
                <div className="flex items-center gap-2 text-gray-200 mt-1">
                  <span>{candidate.location}</span>
                  <span className="text-lg">•</span>
                  <span>{candidate.experience}</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-200/30 backdrop-blur-sm rounded-full">
                {candidate.age}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.skills.slice(0, 3).map((skill: string, index: number) => (
                <Badge key={index} className="bg-white/20 text-white border-0">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 3 && (
                <Badge className="bg-white/20 text-white border-0">
                  +{candidate.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-around p-4 bg-white">
          <Button 
            variant="outline" 
            className="rounded-full h-16 w-16 border-2 border-red-500 text-red-500 hover:bg-red-50 p-0"
            onClick={() => onSwipe("left")}
          >
            <X className="h-8 w-8" />
          </Button>
          
          <Button 
            className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 text-white p-0"
            onClick={() => onViewDetails()}
          >
            <MessageSquare className="h-8 w-8" />
          </Button>
          
          <Button 
            className="rounded-full h-16 w-16 bg-green-500 hover:bg-green-600 text-white p-0"
            onClick={() => onSwipe("right")}
          >
            <Check className="h-8 w-8" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

const SwipePage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swipedCandidates, setSwipedCandidates] = useState<Record<string, string>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [candidates, setCandidates] = useState(allCandidates);
  const [filters, setFilters] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Apply filters function
  const applyFilters = (filterOptions) => {
    setFilters(filterOptions);
    
    // Filter candidates based on the selected filters
    const filteredCandidates = allCandidates.filter(candidate => {
      // Job Title filter
      if (filterOptions.jobTitle && !candidate.jobTitle.toLowerCase().includes(filterOptions.jobTitle.toLowerCase())) {
        return false;
      }
      
      // Location filter
      if (filterOptions.location && !candidate.location.toLowerCase().includes(filterOptions.location.toLowerCase())) {
        return false;
      }
      
      // Experience filter - parse the years from the experience string
      if (filterOptions.minExperience > 0) {
        const candidateYears = parseInt(candidate.experience.split(' ')[0]);
        if (candidateYears < filterOptions.minExperience) {
          return false;
        }
      }
      
      // Gender filter
      if (filterOptions.gender && candidate.gender !== filterOptions.gender) {
        return false;
      }
      
      // Skills filter - check if candidate has any of the selected skills
      if (filterOptions.skills.length > 0) {
        const hasMatchingSkill = candidate.skills.some(skill => 
          filterOptions.skills.includes(skill)
        );
        if (!hasMatchingSkill) {
          return false;
        }
      }
      
      return true;
    });
    
    setCandidates(filteredCandidates);
    setCurrentCardIndex(0);
    
    toast({
      title: "Filters Applied",
      description: `Found ${filteredCandidates.length} candidates matching your criteria.`,
    });
  };
  
  // Check if candidate is matched (shortlisted)
  const isMatched = (candidateId) => {
    return swipedCandidates[candidateId] === "right";
  };
  
  const handleSwipe = (direction: string) => {
    if (currentCardIndex < candidates.length) {
      const candidateId = candidates[currentCardIndex].id;
      
      setSwipedCandidates({
        ...swipedCandidates,
        [candidateId]: direction
      });
      
      if (direction === "right") {
        toast({
          title: "Candidate Shortlisted!",
          description: `You've shortlisted ${isMatched(candidateId) ? candidates[currentCardIndex].name : 'a candidate'}.`,
        });
      }
      
      // Move to next card
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
      }, 300);
    }
  };
  
  const handleSendMessage = () => {
    navigate("/payment");
  };
  
  const resetFilters = () => {
    setCandidates(allCandidates);
    setFilters(null);
    setCurrentCardIndex(0);
    
    toast({
      title: "Filters Reset",
      description: "Showing all available candidates.",
    });
  };
  
  const currentCandidate = candidates[currentCardIndex];
  
  return (
    <DashboardLayout>
      {/* Header with Logo and Filter */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-white shadow-sm px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/c3933293-e878-492e-bdd7-253daf53886d.png" 
            alt="Job Matchy Nepal" 
            className="h-10"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/100x40?text=Job+Matchy+Nepal";
            }}
          />
        </div>
        
        <Button 
          onClick={() => setIsFilterOpen(true)}
          variant="outline" 
          className="flex items-center gap-1 border-primary text-primary"
        >
          <Filter className="h-4 w-4" />
          {filters ? "Filters Applied" : "Filter"}
        </Button>
      </div>
      
      {/* Active filters display */}
      {filters && (
        <div className="fixed top-28 left-0 right-0 z-20 px-4 md:px-6 pb-2">
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active Filters</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={resetFilters}
              >
                Reset All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.jobTitle && (
                <Badge variant="secondary" className="text-xs">
                  Position: {filters.jobTitle}
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="text-xs">
                  Location: {filters.location}
                </Badge>
              )}
              {filters.minExperience > 0 && (
                <Badge variant="secondary" className="text-xs">
                  Experience: ≥{filters.minExperience} years
                </Badge>
              )}
              {filters.gender && (
                <Badge variant="secondary" className="text-xs">
                  Gender: {filters.gender}
                </Badge>
              )}
              {filters.skills.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  Skills: {filters.skills.length} selected
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main swipe area */}
      <div className={`flex flex-col items-center justify-center min-h-[calc(100vh-170px)] pt-20 pb-6 px-4 ${filters ? 'mt-12' : 'mt-0'}`}>
        <div className="relative w-full max-w-md h-[70vh]">
          {candidates.map((candidate, index) => (
            index >= currentCardIndex && index < currentCardIndex + 3 && (
              <div
                key={candidate.id}
                className="absolute w-full"
                style={{ zIndex: candidates.length - index }}
              >
                <TinderCard
                  candidate={candidate}
                  onSwipe={handleSwipe}
                  onViewDetails={() => setIsDetailOpen(true)}
                  isMatched={isMatched(candidate.id)}
                />
              </div>
            )
          ))}
          
          {currentCardIndex >= candidates.length && (
            <Card className="flex flex-col items-center justify-center h-[70vh] p-8 text-center shadow-lg">
              <h3 className="text-xl font-bold mb-4">No more candidates!</h3>
              <p className="text-gray-600 mb-6">You've gone through all available candidates.</p>
              <Button onClick={() => setCurrentCardIndex(0)}>Start Over</Button>
            </Card>
          )}
        </div>
        
        {/* Match Counter */}
        <div className="mt-6 flex items-center gap-1.5 bg-green-50 px-4 py-2 rounded-full">
          <span className="text-green-600 font-bold text-xl">{Object.values(swipedCandidates).filter(dir => dir === "right").length}</span> 
          <span className="text-green-800">Candidates Shortlisted</span>
        </div>
      </div>
      
      {/* Filter Dialog */}
      <FilterDialog 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApplyFilters={applyFilters} 
      />
      
      {/* Candidate Detail Dialog */}
      {currentCandidate && (
        <CandidateDetailDialog 
          candidate={currentCandidate} 
          isOpen={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)}
          isMatched={isMatched(currentCandidate.id)}
        />
      )}
    </DashboardLayout>
  );
};

export default SwipePage;
