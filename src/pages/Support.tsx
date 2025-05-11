
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Query Submitted",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <DashboardLayout>
      <div className="flex items-center mb-8">
        <img 
          src="/lovable-uploads/d27daf70-5626-4ac2-a85d-6bf52bf94ef3.png" 
          alt="Job Matchy Nepal" 
          className="h-12 mr-4"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/120x48?text=Job+Matchy+Nepal";
          }}
        />
        <h1 className="text-2xl font-bold text-secondary-700">Contact Support</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Subject of your message" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    rows={5}
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">info@jobmatchynepal.site</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600">9844342428</p>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t">
                <h4 className="font-medium mb-3">Office Hours</h4>
                <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-sm text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                <p className="text-sm text-gray-600">Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
