
import React, { useState, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Check, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";

// Sample candidates data
const candidates = [
  {
    id: "1",
    name: "Rahul Patel",
    photo: "https://i.pravatar.cc/300?img=11",
    jobTitle: "Frontend Developer",
    location: "Kathmandu, Nepal",
    age: 28,
    gender: "Male",
    experience: "5 years",
    skills: ["React", "JavaScript", "CSS"],
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
    skills: ["Figma", "Adobe XD", "Sketch"],
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
    skills: ["Node.js", "MongoDB", "React"],
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
    skills: ["Python", "Django", "PostgreSQL"],
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
    skills: ["Flutter", "Dart", "Firebase"],
    bio: "Mobile application developer with experience in creating cross-platform solutions.",
  },
];

const SwipeCard = ({ candidate, onSwipe }: { candidate: any; onSwipe: (direction: string) => void }) => {
  const cardX = useMotionValue(0);
  const rotate = useTransform(cardX, [-200, 200], [-30, 30]);
  const cardOpacity = useTransform(cardX, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
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
      className="absolute w-full max-w-md"
      style={{ x: cardX, rotate, opacity: cardOpacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.05 }}
    >
      <Card className="overflow-hidden bg-white rounded-3xl shadow-xl border-0">
        <div className="relative">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          {/* Like indicator */}
          <motion.div 
            className="absolute top-5 right-5 bg-green-500 text-white font-bold py-2 px-4 rounded-lg border-2 border-white rotate-12"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </motion.div>
          
          {/* Nope indicator */}
          <motion.div 
            className="absolute top-5 left-5 bg-red-500 text-white font-bold py-2 px-4 rounded-lg border-2 border-white -rotate-12"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </motion.div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">{candidate.name}</h2>
              <span className="text-xl font-medium">{candidate.age}</span>
            </div>
            <p className="text-lg font-medium mb-1">{candidate.jobTitle}</p>
            <div className="flex items-center gap-1 text-gray-200">
              <span>{candidate.location}</span>
              <span className="mx-1">•</span>
              <span>{candidate.gender}</span>
              <span className="mx-1">•</span>
              <span>{candidate.experience}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 mb-4">{candidate.bio}</p>
          
          <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {candidate.skills.map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="bg-primary-50 text-primary border-primary">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button 
              variant="outline" 
              className="rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => onSwipe("left")}
            >
              <X className="h-5 w-5 mr-1" /> Reject
            </Button>
            <Button 
              className="rounded-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => onSwipe("right")}
            >
              <Check className="h-5 w-5 mr-1" /> Shortlist
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const SwipePage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swipedCandidates, setSwipedCandidates] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSwipe = (direction: string) => {
    if (currentCardIndex < candidates.length) {
      setSwipedCandidates({
        ...swipedCandidates,
        [candidates[currentCardIndex].id]: direction
      });
      
      if (direction === "right") {
        toast({
          title: "Candidate Shortlisted!",
          description: `You've shortlisted ${candidates[currentCardIndex].name}.`,
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
  
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center min-h-[80vh] pt-4 pb-20 max-w-lg mx-auto px-4">
        {/* Logo */}
        <div className="w-full text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Job Matchy" 
              className="h-8"
              onError={(e) => {
                // Fallback if logo doesn't exist
                e.currentTarget.src = "https://via.placeholder.com/80x30?text=Job+Matchy";
              }}
            />
            <span className="font-bold text-xl text-primary">Job Matchy</span>
          </div>
        </div>

        {/* Swipe Area */}
        <div className="relative w-full h-[60vh] flex items-center justify-center">
          {currentCardIndex < candidates.length ? (
            <SwipeCard 
              candidate={candidates[currentCardIndex]} 
              onSwipe={handleSwipe} 
            />
          ) : (
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white">
              <h3 className="text-xl font-semibold mb-2">No more candidates!</h3>
              <p className="text-gray-600 mb-4">You've gone through all available candidates.</p>
              <Button onClick={() => setCurrentCardIndex(0)}>
                Start Over
              </Button>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="fixed bottom-20 left-0 right-0 flex justify-center gap-4 z-10 md:relative md:bottom-0 md:mt-10">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-16 w-16 border-2 border-red-500 text-red-500 hover:bg-red-50 flex items-center justify-center p-0"
            onClick={() => handleSwipe("left")}
            disabled={currentCardIndex >= candidates.length}
          >
            <X className="h-8 w-8" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-16 w-16 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 flex items-center justify-center p-0"
            onClick={handleSendMessage}
            disabled={currentCardIndex >= candidates.length}
          >
            <MessageSquare className="h-8 w-8" />
          </Button>
          
          <Button
            size="lg"
            className="rounded-full h-16 w-16 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center p-0"
            onClick={() => handleSwipe("right")}
            disabled={currentCardIndex >= candidates.length}
          >
            <Heart className="h-8 w-8" />
          </Button>
        </div>
        
        {/* Match Counter */}
        <div className="mt-4 text-sm text-gray-500">
          {Object.values(swipedCandidates).filter(dir => dir === "right").length} Matches
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SwipePage;
