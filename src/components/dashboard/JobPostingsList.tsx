
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface JobPosting {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  applicants: number;
  views: number;
  premium: boolean;
  status: "Active" | "Paused" | "Expired" | "Draft";
  postedDate: string;
  expiryDate: string;
}

interface JobPostingsListProps {
  onNewJobClick?: () => void;
  onJobClick?: (jobId: string) => void;
}

export function JobPostingsList({ onNewJobClick, onJobClick }: JobPostingsListProps) {
  const jobs: JobPosting[] = [
    {
      id: "1",
      title: "Senior React Developer",
      location: "Kathmandu",
      department: "Engineering",
      type: "Full-time",
      applicants: 24,
      views: 352,
      premium: true,
      status: "Active",
      postedDate: "2025-04-15",
      expiryDate: "2025-05-15"
    },
    {
      id: "2",
      title: "Product Manager",
      location: "Pokhara",
      department: "Product",
      type: "Full-time",
      applicants: 15,
      views: 287,
      premium: false,
      status: "Active",
      postedDate: "2025-04-20",
      expiryDate: "2025-05-05"
    },
    {
      id: "3",
      title: "Marketing Specialist",
      location: "Kathmandu",
      department: "Marketing",
      type: "Part-time",
      applicants: 7,
      views: 122,
      premium: true,
      status: "Active",
      postedDate: "2025-05-01",
      expiryDate: "2025-05-31"
    },
    {
      id: "4",
      title: "Financial Analyst",
      location: "Bhaktapur",
      department: "Finance",
      type: "Contract",
      applicants: 3,
      views: 54,
      premium: false,
      status: "Paused",
      postedDate: "2025-04-10",
      expiryDate: "2025-04-25"
    }
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Paused":
        return "bg-yellow-100 text-yellow-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-lg font-semibold">Your Job Postings</h3>
        <Button className="bg-primary hover:bg-primary-700" onClick={onNewJobClick}>
          New Job Post
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-4 text-left">Job Title</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Applicants</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Expires</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex flex-col">
                    <button 
                      className="font-medium text-secondary-700 text-left hover:underline cursor-pointer"
                      onClick={() => onJobClick && onJobClick(job.id)}
                    >
                      {job.title}
                    </button>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                      {job.premium && (
                        <Badge className="bg-primary text-white">
                          Urgent Hiring
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm">{job.location}</td>
                <td className="p-4 text-sm">
                  <div className="flex flex-col">
                    <button 
                      className="hover:underline cursor-pointer"
                      onClick={() => onJobClick && onJobClick(job.id)}
                    >
                      {job.applicants} Applicants
                    </button>
                    <span className="text-xs text-gray-500">{job.views} Views</span>
                  </div>
                </td>
                <td className="p-4 text-sm">
                  <span className={`inline-block rounded-full px-2 py-1 text-xs ${statusColor(job.status)}`}>
                    {job.status}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  {new Date(job.expiryDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          ></path>
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="flex cursor-pointer items-center"
                        onClick={() => onJobClick && onJobClick(job.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex cursor-pointer items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Job
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex cursor-pointer items-center text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between border-t p-4">
        <p className="text-sm text-gray-500">Showing 4 out of 4 job postings</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
