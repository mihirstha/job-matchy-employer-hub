
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Video, X } from "lucide-react";

interface TinderStyleCardProps {
  candidate: {
    id: string;
    name: string;
    photo: string;
    age: number;
    gender: string;
    jobTitle: string;
    location: string;
    experience: string;
    education: string;
    skills: string[];
    bio: string;
    views?: number;
    likes?: number;
    bookmarks?: number;
    jobSuccess?: number;
    isMatched: boolean;
  };
  onSwipe: (direction: string) => void;
  onViewVideoResume: () => void;
  isActive: boolean;
}

export const TinderStyleCard: React.FC<TinderStyleCardProps> = ({ 
  candidate, 
  onSwipe, 
  onViewVideoResume,
  isActive 
}) => {
  if (!isActive) return null;
  
  return (
    <motion.div
      className="absolute w-full"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden rounded-2xl shadow-lg border-0">
        {/* Card image */}
        <div className="relative h-[65vh]">
          <img
            src={candidate.photo}
            alt={candidate.jobTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Stats Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {candidate.views !== undefined && (
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white">
                <Eye className="h-3 w-3 mr-1" /> {candidate.views}
              </Badge>
            )}
            {candidate.likes !== undefined && (
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white">
                <Heart className="h-3 w-3 mr-1" /> {candidate.likes}
              </Badge>
            )}
          </div>
          
          {/* Candidate info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className={`text-3xl font-bold ${!candidate.isMatched ? 'blur-sm select-none' : ''}`}>
                    {candidate.isMatched ? candidate.name : "Candidate"}
                  </h2>
                  <div className="flex items-center justify-center min-w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full px-2">
                    {candidate.age}
                  </div>
                </div>
                <p className="text-xl">{candidate.jobTitle}</p>
                <div className="flex items-center gap-2 text-gray-200 mt-1">
                  <span>{candidate.location}</span>
                  <span className="text-lg">•</span>
                  <span>{candidate.experience}</span>
                  <span className="text-lg">•</span>
                  <span>{candidate.gender}</span>
                </div>
                <p className="text-sm text-gray-200 mt-2">{candidate.education}</p>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.skills.slice(0, 3).map((skill, index) => (
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
            className="rounded-full h-16 w-16 bg-blue-500 hover:bg-blue-600 text-white p-0"
            onClick={() => onViewVideoResume()}
          >
            <Video className="h-8 w-8" />
          </Button>
          
          <Button 
            className="rounded-full h-16 w-16 bg-green-500 hover:bg-green-600 text-white p-0"
            onClick={() => onSwipe("right")}
          >
            <Heart className="h-8 w-8" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
