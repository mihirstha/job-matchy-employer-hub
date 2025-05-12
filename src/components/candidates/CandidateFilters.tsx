
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface FilterOptions {
  gender?: string;
  ageRange?: [number, number];
  occupation?: string;
  language?: string[];
  experience?: number;
  education?: string;
  availabilityDate?: string;
}

interface CandidateFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export const CandidateFilters: React.FC<CandidateFiltersProps> = ({ 
  isOpen, 
  onClose, 
  onApplyFilters 
}) => {
  const [gender, setGender] = useState<string>("");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [occupation, setOccupation] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [experience, setExperience] = useState<number>(0);
  const [education, setEducation] = useState<string>("");
  const [availabilityDate, setAvailabilityDate] = useState<string>("");
  
  const languageOptions = ["Nepali", "English", "Hindi", "Newari", "Tamang", "Maithili", "Bhojpuri", "Tharu"];
  
  const toggleLanguage = (language: string) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter(l => l !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };
  
  const handleApply = () => {
    onApplyFilters({
      gender,
      ageRange,
      occupation,
      language: languages,
      experience,
      education,
      availabilityDate
    });
    onClose();
  };
  
  const handleReset = () => {
    setGender("");
    setAgeRange([18, 65]);
    setOccupation("");
    setLanguages([]);
    setExperience(0);
    setEducation("");
    setAvailabilityDate("");
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Candidates</SheetTitle>
          <SheetDescription>
            Find the perfect match for your job position
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-6 max-h-[75vh] overflow-y-auto pr-2">
          {/* Gender Filter */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Any gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Age Range Filter */}
          <div className="space-y-2">
            <Label>Age Range</Label>
            <div className="flex items-center justify-between">
              <span className="text-sm">{ageRange[0]}</span>
              <span className="text-sm">to</span>
              <span className="text-sm">{ageRange[1]}</span>
            </div>
            <Slider
              defaultValue={[18, 65]}
              min={18}
              max={65}
              step={1}
              value={ageRange}
              onValueChange={(value) => setAgeRange(value as [number, number])}
              className="py-4"
            />
          </div>
          
          {/* Occupation Filter */}
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation/Position</Label>
            <Input 
              id="occupation" 
              placeholder="e.g. Frontend Developer" 
              value={occupation} 
              onChange={(e) => setOccupation(e.target.value)} 
            />
          </div>
          
          {/* Language Filter */}
          <div className="space-y-2">
            <Label>Languages</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {languageOptions.map(language => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`language-${language}`} 
                    checked={languages.includes(language)} 
                    onCheckedChange={() => toggleLanguage(language)}
                  />
                  <label htmlFor={`language-${language}`} className="text-sm">{language}</label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Experience Filter */}
          <div className="space-y-2">
            <Label htmlFor="experience">Minimum Experience (Years)</Label>
            <Select value={experience.toString()} onValueChange={(value) => setExperience(parseInt(value))}>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Any experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any</SelectItem>
                <SelectItem value="1">1+ year</SelectItem>
                <SelectItem value="2">2+ years</SelectItem>
                <SelectItem value="3">3+ years</SelectItem>
                <SelectItem value="5">5+ years</SelectItem>
                <SelectItem value="7">7+ years</SelectItem>
                <SelectItem value="10">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Education Level */}
          <div className="space-y-2">
            <Label htmlFor="education">Education Level</Label>
            <Select value={education} onValueChange={setEducation}>
              <SelectTrigger id="education">
                <SelectValue placeholder="Any education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="High School">High School</SelectItem>
                <SelectItem value="Associate">Associate Degree</SelectItem>
                <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="Master">Master's Degree</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Availability Date */}
          <div className="space-y-2">
            <Label htmlFor="availability">Available From</Label>
            <Input 
              id="availability" 
              type="date" 
              value={availabilityDate} 
              onChange={(e) => setAvailabilityDate(e.target.value)} 
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4 border-t">
            <Button onClick={handleApply} className="w-full bg-primary hover:bg-primary/90">
              Apply Filters
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Reset Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
