import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Video, Save, Search, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedJobPostingFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  templateId?: string | null;
}

export function EnhancedJobPostingForm({ onCancel, onSuccess, templateId = null }: EnhancedJobPostingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [requireVideoResume, setRequireVideoResume] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(templateId);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const { toast } = useToast();
  const totalSteps = 4;
  
  // Sample job templates
  const templates = [
    { id: "template1", title: "Frontend Developer", description: "Template for hiring React developers" },
    { id: "template2", title: "UI/UX Designer", description: "Template for hiring design professionals" },
    { id: "template3", title: "Backend Engineer", description: "Template for hiring Node.js developers" },
  ];
  
  // Sample available skills
  const availableSkills = [
    // Tech skills
    "React", "JavaScript", "TypeScript", "HTML", "CSS", "Node.js", "Python", "Java", "C#", "PHP",
    "SQL", "MongoDB", "PostgreSQL", "MySQL", "GraphQL", "REST API", "AWS", "Azure", "Docker", "Kubernetes",
    "Git", "CI/CD", "Redux", "Vue.js", "Angular", "Next.js", "Express", "Django", "Flask", "Spring Boot",
    "Mobile Development", "iOS", "Android", "React Native", "Flutter", "Swift", "Kotlin",
    
    // Design skills
    "UI Design", "UX Design", "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InDesign", 
    "Prototyping", "Wireframing", "User Research", "Usability Testing", "Design Systems", "Design Thinking",
    
    // General skills
    "Project Management", "Agile", "Scrum", "Communication", "Leadership", "Problem Solving", 
    "Critical Thinking", "Teamwork", "Time Management", "Organization", "Adaptability", "Creativity",
    
    // Business skills
    "Marketing", "Sales", "Customer Service", "Business Analysis", "Data Analysis", "SEO", "SEM", 
    "Social Media", "Content Creation", "Copywriting", "Public Relations", "Market Research"
  ];
  
  // Skill categories for better organization
  const skillCategories = [
    { name: "Technical", skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Node.js", "Python", "Java"] },
    { name: "Design", skills: ["UI Design", "UX Design", "Figma", "Adobe XD", "Sketch", "Photoshop"] },
    { name: "Soft Skills", skills: ["Communication", "Leadership", "Problem Solving", "Teamwork"] },
    { name: "Business", skills: ["Marketing", "Sales", "Customer Service", "Business Analysis"] },
  ];
  
  // Filter skills based on search query
  const filteredSkills = skillSearchQuery 
    ? availableSkills.filter(skill => 
        skill.toLowerCase().includes(skillSearchQuery.toLowerCase()) && 
        !selectedSkills.includes(skill)
      )
    : availableSkills.filter(skill => !selectedSkills.includes(skill));
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    // If template1 is selected, pre-populate with some relevant skills
    if (templateId === "template1") {
      setSelectedSkills(["React", "JavaScript", "CSS", "HTML", "TypeScript"]);
    } else if (templateId === "template2") {
      setSelectedSkills(["UI Design", "UX Design", "Figma", "Prototyping", "Wireframing"]);
    } else if (templateId === "template3") {
      setSelectedSkills(["Node.js", "Express", "MongoDB", "REST API", "JavaScript"]);
    }
    
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
  
  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };
  
  const handleAddCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills([...selectedSkills, customSkill]);
      setCustomSkill("");
    }
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
          
          {/* Selected skills display */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-12 p-3 border rounded-md bg-gray-50">
            {selectedSkills.length > 0 ? (
              selectedSkills.map((skill) => (
                <Badge 
                  key={skill} 
                  className="bg-primary text-white flex items-center gap-1 pl-3 pr-2 py-1.5"
                >
                  {skill}
                  <button 
                    className="ml-1 rounded-full hover:bg-primary-600 p-0.5"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No skills selected yet. Please select skills below.</span>
            )}
          </div>
          
          {/* Search and add custom skill */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search for skills" 
                className="pl-8"
                value={skillSearchQuery}
                onChange={(e) => setSkillSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Add custom skill" 
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="max-w-[200px]"
              />
              <Button size="sm" onClick={handleAddCustomSkill}>Add</Button>
            </div>
          </div>
          
          {/* Skills by categories - Tinder-style UI */}
          <div className="space-y-4">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="bg-white border rounded-md p-3">
                <h4 className="font-medium mb-2 text-secondary-600">{category.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedSkills.includes(skill) 
                          ? "bg-primary text-white" 
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => selectedSkills.includes(skill) 
                        ? handleRemoveSkill(skill) 
                        : handleAddSkill(skill)
                      }
                    >
                      {skill}
                      {selectedSkills.includes(skill) && <Check className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Popular skills or searched skills */}
          {skillSearchQuery && filteredSkills.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-secondary-600">Search Results</h4>
              <div className="flex flex-wrap gap-2">
                {filteredSkills.slice(0, 15).map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => handleAddSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
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
