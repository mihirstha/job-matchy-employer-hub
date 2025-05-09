import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Define an event type
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "interview" | "meeting" | "task";
  notes?: string;
}

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Interview with Rahul Patel",
      date: new Date(2025, 4, 10, 10, 0),
      type: "interview",
      notes: "Frontend Developer position"
    },
    {
      id: "2",
      title: "Team Meeting",
      date: new Date(2025, 4, 12, 14, 0),
      type: "meeting",
      notes: "Discuss recruitment strategy"
    },
    {
      id: "3",
      title: "Review Applications",
      date: new Date(2025, 4, 15, 11, 0),
      type: "task",
      notes: "Review new applications for the UI/UX Designer role"
    }
  ]);
  
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    date: new Date(),
    type: "interview",
    notes: ""
  });
  
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const filteredEvents = events.filter(event => {
    if (!date) return false;
    return event.date.getDate() === date.getDate() &&
           event.date.getMonth() === date.getMonth() &&
           event.date.getFullYear() === date.getFullYear();
  });
  
  const handleAddEvent = () => {
    if (!newEvent.title) {
      toast({
        title: "Error",
        description: "Please enter an event title",
        variant: "destructive"
      });
      return;
    }
    
    const eventToAdd: CalendarEvent = {
      id: String(events.length + 1),
      title: newEvent.title || "",
      date: newEvent.date || new Date(),
      type: newEvent.type as "interview" | "meeting" | "task",
      notes: newEvent.notes
    };
    
    setEvents([...events, eventToAdd]);
    setNewEvent({ title: "", type: "interview", notes: "", date: date });
    setIsAddingEvent(false);
    
    toast({
      title: "Event Added",
      description: "Your event has been added to the calendar."
    });
  };
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-secondary-700">Calendar</h1>
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event for your calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newEvent.title} 
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} 
                  placeholder="Event title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Event Type</Label>
                <select 
                  id="type" 
                  className="w-full p-2 border rounded-md"
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value as any})}
                >
                  <option value="interview">Interview</option>
                  <option value="meeting">Meeting</option>
                  <option value="task">Task</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({...newEvent, notes: e.target.value})}
                  placeholder="Add any additional notes"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingEvent(false)}>Cancel</Button>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className={`${isMobile ? 'col-span-1' : 'md:col-span-8'}`}>
          <CardHeader>
            <CardTitle>May 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className={`${isMobile ? 'col-span-1' : 'md:col-span-4'}`}>
          <CardHeader>
            <CardTitle>
              {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No Date Selected'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map(event => (
                  <div key={event.id} className="border-l-4 border-primary pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {event.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                        </p>
                        {event.notes && (
                          <p className="text-sm text-gray-600 mt-1">{event.notes}</p>
                        )}
                      </div>
                      <Badge 
                        className={
                          event.type === 'interview' ? 'bg-blue-100 text-blue-800' : 
                          event.type === 'meeting' ? 'bg-purple-100 text-purple-800' : 
                          'bg-green-100 text-green-800'
                        }
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No events for this date</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    setNewEvent({...newEvent, date: date});
                    setIsAddingEvent(true);
                  }}
                >
                  Add Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
