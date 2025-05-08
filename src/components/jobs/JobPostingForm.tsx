
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Trash2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  // We'll handle screening questions separately since they're dynamic
});

type JobPostingFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export function JobPostingForm({ onCancel, onSuccess }: JobPostingFormProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [screeningQuestions, setScreeningQuestions] = useState<{ id: string; question: string; required: boolean }[]>([]);
  const { toast } = useToast();
  
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

  // Handle screening questions
  const addScreeningQuestion = () => {
    setScreeningQuestions([
      ...screeningQuestions,
      { id: Date.now().toString(), question: "", required: false }
    ]);
  };

  const updateQuestion = (id: string, questionText: string) => {
    setScreeningQuestions(
      screeningQuestions.map(q => 
        q.id === id ? { ...q, question: questionText } : q
      )
    );
  };

  const updateRequired = (id: string, required: boolean) => {
    setScreeningQuestions(
      screeningQuestions.map(q => 
        q.id === id ? { ...q, required } : q
      )
    );
  };

  const removeQuestion = (id: string) => {
    setScreeningQuestions(screeningQuestions.filter(q => q.id !== id));
  };

  // Submit handler
  function onSubmit(values: z.infer<typeof jobPostingSchema>) {
    // Validate screening questions
    const emptyQuestions = screeningQuestions.filter(q => !q.question.trim());
    if (emptyQuestions.length > 0) {
      toast({
        variant: "destructive",
        title: "Invalid screening questions",
        description: "Please fill in all screening questions or remove empty ones.",
      });
      return;
    }

    console.log("Form values:", { ...values, screeningQuestions });
    // In a real app, you'd submit this to your backend API
    toast({
      title: "Job posting created",
      description: `Your ${values.postingType} job posting has been created successfully.`,
    });
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
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="details">Job Details</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="questions">Screening Questions</TabsTrigger>
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
                    onClick={() => setActiveTab("questions")}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Screening Questions</h3>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addScreeningQuestion}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Question
                    </Button>
                  </div>

                  {screeningQuestions.length === 0 ? (
                    <div className="border border-dashed rounded-md p-6 text-center">
                      <p className="text-gray-500 mb-2">No screening questions added yet.</p>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={addScreeningQuestion}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Your First Question
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {screeningQuestions.map((q, index) => (
                        <div key={q.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Question {index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeQuestion(q.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <FormLabel htmlFor={`question-${q.id}`}>Question</FormLabel>
                              <Textarea
                                id={`question-${q.id}`}
                                placeholder="e.g. How many years of experience do you have with React?"
                                value={q.question}
                                onChange={(e) => updateQuestion(q.id, e.target.value)}
                                className="w-full"
                              />
                            </div>
                            
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`required-${q.id}`}
                                checked={q.required}
                                onChange={(e) => updateRequired(q.id, e.target.checked)}
                                className="mr-2 h-4 w-4 rounded border-gray-300"
                              />
                              <label htmlFor={`required-${q.id}`} className="text-sm">
                                Required question
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {screeningQuestions.length > 0 && (
                    <div className="mt-4 flex items-start p-4 bg-blue-50 rounded-md">
                      <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">Why add screening questions?</p>
                        <p>Screening questions help you quickly identify qualified candidates and streamline your hiring process.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("description")}
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
                    onClick={() => setActiveTab("questions")}
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
