
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, HelpCircle, MessageCircle, Send } from "lucide-react";

const Support = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support request submitted",
      description: "We'll get back to you within 24 hours.",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Support Center</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FAQs Section */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">How do I create a job posting?</h3>
                    <p className="text-sm text-gray-600">
                      Navigate to the Jobs section and click on "Create New Job Posting". 
                      Fill out the required details and click "Post Job".
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">How does the candidate matching system work?</h3>
                    <p className="text-sm text-gray-600">
                      Our advanced AI algorithm matches candidates based on skills, experience, and 
                      job requirements. Use the Swipe feature to easily review potential candidates.
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
                    <p className="text-sm text-gray-600">
                      We accept multiple payment methods including credit/debit cards, eSewa, 
                      Khalti, and IME Pay for the convenience of our Nepalese users.
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">How do I message candidates?</h3>
                    <p className="text-sm text-gray-600">
                      After shortlisting candidates, you can message them for Rs. 499 per chat. 
                      This ensures quality connections and serious inquiries.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Can I get a refund?</h3>
                    <p className="text-sm text-gray-600">
                      Refund requests are handled on a case-by-case basis. Please contact our 
                      support team with your request and order details.
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-6 w-full">
                  View all FAQs <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Live Chat Support
                </CardTitle>
                <CardDescription>
                  Chat with our support team for immediate assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto border mb-4">
                  <div className="text-center text-gray-500 py-20">
                    Start a new conversation with our support team
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email address" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Brief description of your issue" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe your issue in detail" 
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> support@jobmatchy.com</p>
                <p><span className="font-medium">Phone:</span> +977-01-4123456</p>
                <p><span className="font-medium">Hours:</span> 9:00 AM - 6:00 PM NPT, Sunday - Friday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
