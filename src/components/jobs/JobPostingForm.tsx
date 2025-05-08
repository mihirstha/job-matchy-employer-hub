
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define form schema
const jobPostingSchema = z.object({
  title: z.string().min(5, {
    message: "Job title must be at least 5 characters.",
  }),
  department: z.string().min(2, {
    message: "Department is required.",
  }),
  location: z.string().min(2, {
    message: "Location is required."
  }),
  type: z.string({
    required_error: "Please select a job type.",
  }),
  salaryMin: z.string().min(1, {
    message: "Minimum salary is required.",
  }),
  salaryMax: z.string().min(1, {
    message: "Maximum salary is required.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  requirements: z.string().min(20, {
    message: "Requirements must be at least 20 characters.",
  }),
  postingType: z.enum(["premium", "normal"], {
    required_error: "Please select a posting type.",
  }),
});

type JobPostingFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export function JobPostingForm({ onCancel, onSuccess }: JobPostingFormProps) {
  const [activeTab, setActiveTab] = useState("details");
  
  // Form definition
  const form = useForm<z.infer<typeof jobPostingSchema>>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "",
      type: "full-time",
      salaryMin: "",
      salaryMax: "",
      description: "",
      requirements: "",
      postingType: "normal",
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof jobPostingSchema>) {
    console.log("Form values:", values);
    // In a real app, you'd submit this to your backend API
    onSuccess();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Job Posting</CardTitle>
        <CardDescription>
          Fill in the details for your new job posting. Required fields are marked with an asterisk (*).
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="details">Job Details</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="posting">Posting Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Senior React Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Engineering" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Kathmandu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="salaryMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Salary (NPR) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 50000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="salaryMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Salary (NPR) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 100000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mr-2"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setActiveTab("description")}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="description" className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter full job description here..." 
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Requirements *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the key requirements for this position..." 
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("details")}
                  >
                    Previous
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setActiveTab("posting")}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="posting" className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Select Posting Type</h3>
                  
                  <FormField
                    control={form.control}
                    name="postingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            <div className={`border rounded-lg p-4 ${field.value === 'premium' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="premium" id="premium" className="mt-1" />
                                <div>
                                  <label htmlFor="premium" className="text-base font-medium block">
                                    Premium Posting
                                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">
                                      Recommended
                                    </span>
                                  </label>
                                  <div className="mt-2 space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm">Price</span>
                                      <span className="text-sm font-medium">₹5,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Duration</span>
                                      <span className="text-sm font-medium">30 Days</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Position</span>
                                      <span className="text-sm font-medium">"Urgent Hiring" Tag</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Boost Listing</span>
                                      <span className="text-sm font-medium text-green-600">Yes</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Swipe Cards/Day</span>
                                      <span className="text-sm font-medium">30</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className={`border rounded-lg p-4 ${field.value === 'normal' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="normal" id="normal" className="mt-1" />
                                <div>
                                  <label htmlFor="normal" className="text-base font-medium block">
                                    Normal Posting
                                  </label>
                                  <div className="mt-2 space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm">Price</span>
                                      <span className="text-sm font-medium">₹3,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Duration</span>
                                      <span className="text-sm font-medium">15 Days</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Position</span>
                                      <span className="text-sm font-medium">Standard</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Boost Listing</span>
                                      <span className="text-sm font-medium text-red-600">No</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Swipe Cards/Day</span>
                                      <span className="text-sm font-medium">10</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("description")}
                  >
                    Previous
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Publish Job
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
