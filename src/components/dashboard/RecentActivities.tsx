
import { CalendarIcon } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  time: string;
  description: string;
}

export function RecentActivities() {
  const activities: Activity[] = [
    {
      id: "1",
      title: "New Applicant",
      time: "10 minutes ago",
      description: "Sanjay Sharma has applied to Senior React Developer position.",
    },
    {
      id: "2",
      title: "Interview Scheduled",
      time: "2 hours ago",
      description: "Interview scheduled with Priya Thapa for Product Manager role.",
    },
    {
      id: "3",
      title: "Job Post Expired",
      time: "Yesterday",
      description: "Your job post for UX/UI Designer has expired.",
    },
    {
      id: "4",
      title: "Premium Plan Activated",
      time: "3 days ago",
      description: "You've successfully activated premium plan for Marketing Specialist job.",
    },
  ];

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-secondary-700">Recent Activities</h3>
      
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
              <CalendarIcon className="h-4 w-4 text-primary-700" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-secondary-700">{activity.title}</h4>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 text-sm font-medium text-primary hover:text-primary-700">
        View all activities
      </button>
    </div>
  );
}
