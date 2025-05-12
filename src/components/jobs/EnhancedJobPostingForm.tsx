
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Video, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedJobPostingFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function EnhancedJobPostingForm({ onCancel, onSuccess }: EnhancedJobPostingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [requireVideoResume, setRequireVideoResume] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { toast } = useToast();
  const totalSteps = 4;
  
  // Sample job templates
  const templates = [
    { id: "template1", title: "Frontend Developer", description: "Template for hiring React developers" },
    { id: "template2", title: "UI/UX Designer", description: "Template for hiring design professionals" },
    { id: "template3", title: "Backend Engineer", description: "Template for hiring Node.js developers" },
  ];
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Template Selected",
      description: "Job template has been loaded.",
    });
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = () => {
    toast({
      title: "Success!",
      description: "Your job has been posted successfully.",
    });
    onSuccess();
  };
  
  const handleSaveTemplate = () => {
    toast({
      title: "Template Saved",
      description: "This job has been saved as a template for future use.",
    });
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between items-center mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index + 1 === currentStep
                  ? "border-primary bg-primary text-white"
                  : index + 1 < currentStep
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {index + 1 < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-16 mt-5 ${
                  index + 1 < currentStep ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderTemplateSelection = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Select a template or start from scratch</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={() => setCurrentStep(2)}
          >
            Skip
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className={`cursor-pointer hover:shadow-md transition-shadow ${
            selectedTemplate === null ? "ring-2 ring-primary" : ""
          }`} onClick={() => setSelectedTemplate(null)}>
            <CardContent className="p-4 flex flex-col items-center justify-center min-h-[120px]">
              <Plus className="h-10 w-10 text-gray-400 mb-2" />
              <p className="font-medium">Start from Scratch</p>
            </CardContent>
          </Card>
          
          {templates.map(template => (
            <Card 
              key={template.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                selectedTemplate === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <CardContent className="p-4">
                <h4 className="font-medium">{template.title}</h4>
                <p className="text-sm text-gray-500">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  const renderBasicDetails = () => {
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="job-title">Job Title</Label>
          <Input id="job-title" placeholder="e.g. Frontend Developer" defaultValue={selectedTemplate === "template1" ? "Frontend Developer" : ""} />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="job-type">Job Type</Label>
            <Select defaultValue="full-time">
              <SelectTrigger id="job-type">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="job-location">Location</Label>
            <Input id="job-location" placeholder="e.g. Kathmandu, Nepal" />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="salary-min">Minimum Salary (NPR)</Label>
            <Input id="salary-min" type="number" placeholder="e.g. 50000" />
          </div>
          
          <div>
            <Label htmlFor="salary-max">Maximum Salary (NPR)</Label>
            <Input id="salary-max" type="number" placeholder="e.g. 80000" />
          </div>
        </div>
      </div>
    );
  };
  
  const renderDetailsAndRequirements = () => {
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea 
            id="job-description" 
            placeholder="Describe the role and responsibilities" 
            rows={5} 
            defaultValue={selectedTemplate === "template1" ? "We are looking for an experienced Frontend Developer with strong React skills to join our team." : ""}
          />
        </div>
        
        <div>
          <Label htmlFor="job-requirements">Requirements</Label>
          <Textarea 
            id="job-requirements" 
            placeholder="List the skills and qualifications required" 
            rows={5}
            defaultValue={selectedTemplate === "template1" ? "- 3+ years of experience with React\n- Proficiency in JavaScript, HTML and CSS\n- Experience with responsive design" : ""}
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Skills Required</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedTemplate === "template1" ? (
              <>
                <Badge className="bg-gray-100 text-gray-800">React</Badge>
                <Badge className="bg-gray-100 text-gray-800">JavaScript</Badge>
                <Badge className="bg-gray-100 text-gray-800">CSS</Badge>
              </>
            ) : (
              <span className="text-gray-500 text-sm">No skills added yet</span>
            )}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add a skill" className="max-w-[200px]" />
            <Button size="sm" variant="outline">Add</Button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderApplicationSettings = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="require-video" className="block mb-1">Require Video Resume</Label>
            <p className="text-sm text-gray-500">Candidates will be asked to submit a video resume</p>
          </div>
          <Switch 
            id="require-video"
            checked={requireVideoResume}
            onCheckedChange={setRequireVideoResume}
          />
        </div>
        
        {requireVideoResume && (
          <div className="bg-gray-50 p-4 rounded-lg border flex items-start gap-3">
            <Video className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Video Resume Requirements</p>
              <p className="text-sm text-gray-600">
                Candidates will be asked to submit a 1-2 minute video answering:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside mt-2">
                <li>Briefly introduce yourself and your background</li>
                <li>Why are you interested in this position?</li>
                <li>What makes you a good fit for this role?</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="save-template" className="block mb-1">Save as Template</Label>
            <p className="text-sm text-gray-500">Save this job for future use</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={handleSaveTemplate}
          >
            <Save className="h-4 w-4" /> Save as Template
          </Button>
        </div>
        
        <div>
          <Label htmlFor="deadline">Application Deadline</Label>
          <Input type="date" id="deadline" />
        </div>
      </div>
    );
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderTemplateSelection();
      case 2:
        return renderBasicDetails();
      case 3:
        return renderDetailsAndRequirements();
      case 4:
        return renderApplicationSettings();
      default:
        return null;
    }
  };
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
        <CardDescription>
          Step {currentStep} of {totalSteps}: {
            currentStep === 1 ? "Choose Template" : 
            currentStep === 2 ? "Basic Details" : 
            currentStep === 3 ? "Job Description & Requirements" : 
            "Application Settings"
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {renderStepIndicator()}
        {renderCurrentStep()}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-6">
        <Button 
          variant="outline" 
          onClick={currentStep === 1 ? onCancel : handleBack}
        >
          {currentStep === 1 ? "Cancel" : "Back"}
        </Button>
        
        <Button onClick={handleNext}>
          {currentStep === totalSteps ? "Post Job" : "Continue"}
        </Button>
      </CardFooter>
    </Card>
  );
}
