
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar, Eye } from "lucide-react";
import { format } from "date-fns";

interface JobDetailProps {
  job: {
    id: string;
    title: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    postedDate: string;
    applicants: number;
    views: number;
  };
}

export function JobDetail({ job }: JobDetailProps) {
  const formattedDate = format(new Date(job.postedDate), "MMMM d, yyyy");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{job.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>Posted on {formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            <span>{job.views} views</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Salary Range</h3>
          <p className="text-primary font-medium">{job.salary}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Job Description</h3>
          <p className="text-gray-600">{job.description}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Requirements</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-800 hover:bg-green-50">
            React
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-50">
            JavaScript
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-800 hover:bg-purple-50">
            Frontend
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
