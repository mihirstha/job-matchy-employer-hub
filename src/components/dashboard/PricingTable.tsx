
import { useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface PricingFeature {
  name: string;
  premium: React.ReactNode;
  normal: React.ReactNode;
  tooltip?: string;
}

interface ExtraService {
  name: string;
  description: string;
  detailedDescription: string;
  contactPerson: {
    name: string;
    title: string;
    email: string;
    phone: string;
    photo: string;
  };
}

export function PricingTable() {
  const [selectedPlan, setSelectedPlan] = useState<"premium" | "normal" | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ExtraService | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const features: PricingFeature[] = [
    {
      name: "Price",
      premium: "Starting from Rs 5000 per Job Post",
      normal: "Starting from Rs 3000 per Job Post",
    },
    {
      name: "Listing Duration",
      premium: "30 Days",
      normal: "15 Days",
      tooltip: "How long your job posting will be visible to candidates"
    },
    {
      name: "Position on App",
      premium: (
        <div className="flex flex-col">
          <span>"Urgent Hiring" tag</span>
          <span className="text-xs text-gray-500">Shown on the card</span>
        </div>
      ),
      normal: (
        <div className="flex flex-col">
          <span>No "Urgent Hiring" tag</span>
          <span className="text-xs text-gray-500">Shown after "Urgent Hiring" Section</span>
        </div>
      ),
      tooltip: "Premium jobs appear at the top of search results with an 'Urgent Hiring' tag"
    },
    {
      name: "Boost Listing",
      premium: <CheckIcon className="h-5 w-5 text-green-500" />,
      normal: <XIcon className="h-5 w-5 text-red-500" />,
      tooltip: "Your job gets periodically boosted to the top of search results"
    },
    {
      name: "Video Resume",
      premium: <CheckIcon className="h-5 w-5 text-green-500" />,
      normal: <CheckIcon className="h-5 w-5 text-green-500" />,
      tooltip: "Access to video resumes from candidates"
    },
  ];

  const extraServices: ExtraService[] = [
    {
      name: "Manual Human Resource Introduction",
      description: "Contact one of our representatives",
      detailedDescription: "With Manual HR Introduction, JOB MATCHY Nepal handpicks and connects you with potential candidates based on your specific job requirements. Once introduced, you can take over—conduct interviews, discuss terms, and make hiring decisions using your preferred communication tools.",
      contactPerson: {
        name: "Mihir Shrestha",
        title: "HR Recruitment Specialist",
        email: "mihir@jobmatchynepal.site",
        phone: "+977 9802345678",
        photo: "https://i.pravatar.cc/300?img=11"
      }
    },
    {
      name: "Consulting Service",
      description: "Contact one of our representatives",
      detailedDescription: "Our HR Consulting Services help you optimize your recruitment strategy, job descriptions, and candidate screening process. JOB MATCHY Nepal provides expert guidance tailored to your industry needs—ensuring you hire smarter and build a stronger workforce.",
      contactPerson: {
        name: "Priya Sharma",
        title: "HR Consulting Manager",
        email: "priya@jobmatchynepal.site",
        phone: "+977 9801234567",
        photo: "https://i.pravatar.cc/300?img=5"
      }
    },
    {
      name: "Advertisement",
      description: "Contact one of our representatives",
      detailedDescription: "Boost your employer brand visibility with our Advertisement services. JOB MATCHY Nepal offers targeted advertising solutions to showcase your company culture and job opportunities to a wider audience of qualified candidates, helping you stand out in a competitive job market and attract top talent faster.",
      contactPerson: {
        name: "Ankit Gupta",
        title: "Marketing Specialist",
        email: "ankit@jobmatchynepal.site",
        phone: "+977 9803456789",
        photo: "https://i.pravatar.cc/300?img=12"
      }
    },
  ];

  const handleSelectPlan = (plan: "premium" | "normal") => {
    setSelectedPlan(plan);
    toast({
      title: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Selected`,
      description: `You have selected the ${plan} plan. Continue to checkout to complete your purchase.`,
    });
  };
  
  const handleContinueToCheckout = () => {
    navigate("/payment");
    toast({
      title: "Redirecting to Payment",
      description: "You're being redirected to complete your payment.",
    });
  };
  
  const handleContactService = (service: ExtraService) => {
    setSelectedService(service);
    setContactDialogOpen(true);
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-secondary-700">Pricing Plans</h3>
      
      {/* Plan Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Premium Plan */}
        <div 
          className={cn(
            "rounded-lg border p-6 transition-all",
            selectedPlan === "premium" 
              ? "border-primary bg-primary/5 shadow-lg" 
              : "border-gray-200 hover:border-primary/50"
          )}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-bold">Premium</h4>
              <p className="text-2xl font-bold mt-2 text-primary">Rs 5,000</p>
              <p className="text-sm text-gray-500">per job post</p>
            </div>
            <Badge className="bg-primary text-white">Recommended</Badge>
          </div>
          
          <ul className="mt-6 space-y-3">
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">30-day listing</span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">"Urgent Hiring" tag</span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Boost listing</span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Video resume access</span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Premium support</span>
            </li>
          </ul>
          
          <Button
            className={cn(
              "w-full mt-6",
              selectedPlan === "premium" ? "bg-primary hover:bg-primary/90" : "bg-primary/80 hover:bg-primary"
            )}
            onClick={() => handleSelectPlan("premium")}
          >
            {selectedPlan === "premium" ? "Selected" : "Choose Premium"}
          </Button>
        </div>
        
        {/* Normal Plan */}
        <div 
          className={cn(
            "rounded-lg border p-6 transition-all",
            selectedPlan === "normal" 
              ? "border-primary bg-primary/5 shadow-lg" 
              : "border-gray-200 hover:border-primary/50"
          )}
        >
          <div>
            <h4 className="text-lg font-bold">Normal</h4>
            <p className="text-2xl font-bold mt-2 text-secondary-700">Rs 3,000</p>
            <p className="text-sm text-gray-500">per job post</p>
          </div>
          
          <ul className="mt-6 space-y-3">
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">15-day listing</span>
            </li>
            <li className="flex items-center">
              <XIcon className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-gray-500">No "Urgent Hiring" tag</span>
            </li>
            <li className="flex items-center">
              <XIcon className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-gray-500">No boost listing</span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Video resume access</span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Standard support</span>
            </li>
          </ul>
          
          <Button 
            variant={selectedPlan === "normal" ? "default" : "outline"}
            className={cn(
              "w-full mt-6",
              selectedPlan === "normal" ? "bg-primary hover:bg-primary/90" : "border-primary text-primary hover:bg-primary/5"
            )}
            onClick={() => handleSelectPlan("normal")}
          >
            {selectedPlan === "normal" ? "Selected" : "Choose Normal"}
          </Button>
        </div>
      </div>
      
      {selectedPlan && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-green-800">Ready to proceed with your {selectedPlan} plan?</p>
              <p className="text-sm text-green-700">Click continue to proceed with your selected plan.</p>
            </div>
            <div>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                onClick={handleContinueToCheckout}
              >
                Continue to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Detailed Features Table */}
      <div className="mt-8 overflow-hidden rounded-lg border">
        <div className="bg-gray-50 py-3 px-4">
          <h4 className="font-medium text-secondary-700">Detailed Plan Comparison</h4>
        </div>
        
        <div className="divide-y">
          {features.map((feature, i) => (
            <div key={i} className="py-3 px-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">{feature.name}</p>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="bg-primary/5 rounded p-2">
                  <p className="text-xs font-medium text-primary mb-1">Premium</p>
                  <div className="text-sm">{feature.premium}</div>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-xs font-medium text-gray-600 mb-1">Normal</p>
                  <div className="text-sm">{feature.normal}</div>
                </div>
              </div>
              {feature.tooltip && (
                <p className="mt-2 text-xs text-gray-500 italic">{feature.tooltip}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Extra Services */}
      <div className="mt-8 border-t pt-6">
        <h4 className="text-lg font-bold text-secondary-700 mb-4">Extra Services</h4>
        
        <Accordion type="single" collapsible className="w-full">
          {extraServices.map((service, i) => (
            <AccordionItem key={i} value={`service-${i}`}>
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium">{service.name}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 mb-4">{service.detailedDescription}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => handleContactService(service)}
                  >
                    Contact Us for Details
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {/* Contact Dialog */}
      {selectedService && (
        <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedService.name}</DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col items-center text-center p-4">
              <Avatar className="h-24 w-24 mb-4">
                <img src={selectedService.contactPerson.photo} alt={selectedService.contactPerson.name} />
              </Avatar>
              
              <h3 className="text-xl font-bold">{selectedService.contactPerson.name}</h3>
              <p className="text-gray-500">{selectedService.contactPerson.title}</p>
              
              <div className="mt-6 space-y-2 w-full">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-medium">{selectedService.contactPerson.email}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="font-medium">{selectedService.contactPerson.phone}</p>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button className="flex-1" onClick={() => setContactDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => {
                    toast({
                      title: "Email Copied",
                      description: `${selectedService.contactPerson.email} copied to clipboard.`,
                    });
                    navigator.clipboard.writeText(selectedService.contactPerson.email);
                  }}
                >
                  Copy Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
