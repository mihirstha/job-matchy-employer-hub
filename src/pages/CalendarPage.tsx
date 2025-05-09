
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type EventType = {
  id: string;
  title: string;
  date: Date;
  type: "interview" | "meeting" | "task" | "other";
  description?: string;
  time?: string;
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<EventType[]>([
    {
      id: "1",
      title: "Interview with Priyanka Sharma",
      date: new Date(2025, 4, 12),
      type: "interview",
      description: "Frontend Developer position",
      time: "10:00 AM"
    },
    {
      id: "2",
      title: "Team Meeting",
      date: new Date(2025, 4, 15),
      type: "meeting",
      description: "Weekly sync up",
      time: "2:00 PM"
    },
    {
      id: "3",
      title: "Review Applications",
      date: new Date(2025, 4, 18),
      type: "task",
      description: "Review 10 new applications for the Product Manager role",
      time: "All day"
    }
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState<"interview" | "meeting" | "task" | "other">("meeting");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTime, setEventTime] = useState("");
  const { toast } = useToast();
  
  const isMobile = useIsMobile();
  
  // Filter events for the selected date
  const selectedDateEvents = date 
    ? events.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      )
    : [];
  
  // Function to add a new event
  const handleAddEvent = () => {
    if (!date || !eventTitle.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newEvent: EventType = {
      id: `event-${Date.now()}`,
      title: eventTitle,
      date: date,
      type: eventType,
      description: eventDescription,
      time: eventTime
    };
    
    setEvents([...events, newEvent]);
    
    // Reset form and close dialog
    setEventTitle("");
    setEventType("meeting");
    setEventDescription("");
    setEventTime("");
    setOpenDialog(false);
    
    toast({
      title: "Event Added",
      description: `"${eventTitle}" has been added to your calendar.`,
    });
  };
  
  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };
  
  // Get badge color based on event type
  const getEventBadge = (type: string) => {
    switch(type) {
      case 'interview':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Interview</Badge>;
      case 'meeting':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Meeting</Badge>;
      case 'task':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Task</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Other</Badge>;
    }
  };
  
  // Get time badge based on time string
  const getTimeBadge = (time: string | undefined) => {
    if (!time) return null;
    
    return <Badge variant="outline" className="ml-2">{time}</Badge>;
  };
  
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-2xl font-bold text-secondary-700">Calendar</h1>
      
      <div className={`grid gap-6 ${isMobile ? '' : 'md:grid-cols-[350px_1fr]'}`}>
        {/* Calendar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center">
                  <span>Calendar</span>
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" /> Add Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                        <DialogDescription>
                          Create a new event on {date ? format(date, 'PPP') : 'your calendar'}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="event-title">Event Title</Label>
                          <Input 
                            id="event-title" 
                            placeholder="Enter event title" 
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="event-type">Event Type</Label>
                            <Select 
                              value={eventType} 
                              onValueChange={(value) => setEventType(value as any)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="interview">Interview</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                <SelectItem value="task">Task</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="event-time">Time</Label>
                            <Input 
                              id="event-time" 
                              placeholder="e.g. 10:00 AM" 
                              value={eventTime}
                              onChange={(e) => setEventTime(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="event-description">Description (Optional)</Label>
                          <Textarea 
                            id="event-description" 
                            placeholder="Add details about this event" 
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleAddEvent}>Add Event</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                components={{
                  DayContent: (props) => {
                    const date = props.date;
                    const hasEvent = isDayWithEvent(date);
                    
                    return (
                      <div className={`relative h-9 w-9 p-0 flex items-center justify-center  ${
                        hasEvent ? "font-bold" : ""
                      }`}>
                        <span>{props.date.getDate()}</span>
                        {hasEvent && (
                          <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary"></span>
                        )}
                      </div>
                    );
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Events List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Events for {date ? format(date, 'MMMM d, yyyy') : 'Selected Date'}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''} scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <p className="text-gray-500">No events scheduled for this date.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setOpenDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (
                    <Card key={event.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-lg">{event.title}</h3>
                            <div className="flex items-center mt-1">
                              {getEventBadge(event.type)}
                              {getTimeBadge(event.time)}
                            </div>
                            {event.description && (
                              <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
