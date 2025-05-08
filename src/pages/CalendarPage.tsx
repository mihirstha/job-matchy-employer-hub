
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Calendar as CalendarIcon, 
  MapPin, 
  User,
  Plus,
  X
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Event = {
  id: number;
  title: string;
  date: Date;
  type: "interview" | "meeting" | "deadline";
  location: string;
  candidateName?: string;
  jobTitle?: string;
  avatar?: string;
  attendees?: string[];
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showNewEventDialog, setShowNewEventDialog] = useState(false);
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Interview with Rahul Patel",
      date: new Date(2025, 4, 8, 10, 0), // May 8, 2025, 10:00 AM
      type: "interview",
      location: "Online (Zoom)",
      candidateName: "Rahul Patel",
      jobTitle: "Senior React Developer",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 2,
      title: "Interview with Priyanka Sharma",
      date: new Date(2025, 4, 8, 14, 30), // May 8, 2025, 2:30 PM
      type: "interview",
      location: "Office - Meeting Room 2",
      candidateName: "Priyanka Sharma",
      jobTitle: "Frontend Developer",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 3,
      title: "Team Meeting - Hiring Updates",
      date: new Date(2025, 4, 8, 16, 0), // May 8, 2025, 4:00 PM
      type: "meeting",
      location: "Office - Conference Room",
      attendees: ["HR Manager", "CTO", "Team Leads"]
    },
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: date || new Date(),
    time: "10:00",
    type: "meeting",
    location: "",
    candidateName: "",
    jobTitle: "",
  });
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => {
    if (!date) return false;
    
    return (
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Format time from Date object
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const handleAddEvent = () => {
    const eventDate = new Date(newEvent.date);
    const [hours, minutes] = newEvent.time.split(':').map(Number);
    eventDate.setHours(hours, minutes);
    
    const newEventObject: Event = {
      id: events.length + 1,
      title: newEvent.title,
      date: eventDate,
      type: newEvent.type as "interview" | "meeting" | "deadline",
      location: newEvent.location,
    };
    
    if (newEvent.type === "interview" && newEvent.candidateName) {
      newEventObject.candidateName = newEvent.candidateName;
      newEventObject.jobTitle = newEvent.jobTitle;
      newEventObject.avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10)}`;
    }
    
    if (newEvent.type === "meeting") {
      newEventObject.attendees = ["HR Manager", "Team Lead"];
    }
    
    setEvents([...events, newEventObject]);
    setShowNewEventDialog(false);
    toast({
      title: "Event Created",
      description: `${newEvent.title} was added to your calendar.`,
    });
    
    // Reset form
    setNewEvent({
      title: "",
      date: date || new Date(),
      time: "10:00",
      type: "meeting",
      location: "",
      candidateName: "",
      jobTitle: "",
    });
  };
  
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-2xl font-bold text-secondary-700">Calendar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border pointer-events-auto"
                initialFocus
              />
              
              <div className="mt-6 space-y-2">
                <h4 className="font-medium">Event Types</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-1" />
                    Interviews
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <div className="w-2 h-2 rounded-full bg-green-600 mr-1" />
                    Meetings
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mr-1" />
                    Deadlines
                  </Badge>
                </div>
              </div>
              
              <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-6">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Add New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Calendar Event</DialogTitle>
                    <DialogDescription>
                      Create a new event in your calendar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter event title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newEvent.date.toISOString().split('T')[0]}
                          onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Event Type</Label>
                      <Select 
                        value={newEvent.type} 
                        onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="deadline">Deadline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      />
                    </div>
                    
                    {newEvent.type === "interview" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="candidateName">Candidate Name</Label>
                          <Input
                            id="candidateName"
                            placeholder="Enter candidate name"
                            value={newEvent.candidateName}
                            onChange={(e) => setNewEvent({...newEvent, candidateName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Position</Label>
                          <Input
                            id="jobTitle"
                            placeholder="Enter job position"
                            value={newEvent.jobTitle}
                            onChange={(e) => setNewEvent({...newEvent, jobTitle: e.target.value})}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAddEvent} disabled={!newEvent.title || !newEvent.location}>
                      Add Event
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
        
        {/* Events for selected date */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {date ? date.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'No Date Selected'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <CalendarIcon className="mx-auto h-12 w-12 opacity-30 mb-4" />
                  <p>No events scheduled for this date.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setShowNewEventDialog(true)}>
                    Create New Event
                  </Button>
                </div>
              ) : (
                <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-border">
                  {selectedDateEvents.map((event, index) => (
                    <div 
                      key={event.id} 
                      className={`relative pb-8 ${index === selectedDateEvents.length - 1 ? '' : ''}`}
                    >
                      <div className={`absolute left-[-26px] rounded-full w-4 h-4 ${
                        event.type === 'interview' ? 'bg-blue-500' : 
                        event.type === 'meeting' ? 'bg-green-500' : 'bg-purple-500'
                      }`} />
                      <time className="text-sm font-medium text-gray-500 mb-2 block">
                        {formatTime(event.date)}
                      </time>
                      
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>
                            {formatTime(event.date)}
                          </span>
                          <span className="mx-2">•</span>
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>
                            {event.location}
                          </span>
                        </div>
                        
                        {event.type === "interview" && event.candidateName && (
                          <div className="flex items-center mt-4 space-x-4">
                            <Avatar className="h-10 w-10">
                              <img src={event.avatar} alt={event.candidateName} />
                            </Avatar>
                            <div>
                              <p className="font-medium">{event.candidateName}</p>
                              <p className="text-sm text-gray-500">{event.jobTitle}</p>
                            </div>
                          </div>
                        )}
                        
                        {event.type === "meeting" && event.attendees && (
                          <div className="mt-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="mr-1 h-4 w-4" />
                              <span>{event.attendees.length} Attendees</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" size="sm" className="mr-2">
                            Reschedule
                          </Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
