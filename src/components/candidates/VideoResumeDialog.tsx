
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

interface VideoResumeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

export const VideoResumeDialog: React.FC<VideoResumeDialogProps> = ({ 
  isOpen, 
  onClose, 
  candidateName 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Video Resume</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <Video className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">
              {candidateName}'s video resume would play here
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">About this video resume</h3>
            <p className="text-sm text-gray-600">
              This video resume allows you to see the candidate's communication skills,
              personality, and professional presentation. Video resumes provide insights
              beyond what's possible through traditional resumes.
            </p>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
