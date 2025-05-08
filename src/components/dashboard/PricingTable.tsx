
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingFeature {
  name: string;
  premium: React.ReactNode;
  normal: React.ReactNode;
}

interface ExtraService {
  name: string;
  description: string;
}

export function PricingTable() {
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
    },
    {
      name: "Boost Listing",
      premium: <CheckIcon className="h-5 w-5 text-green-500" />,
      normal: <XIcon className="h-5 w-5 text-red-500" />,
    },
    {
      name: "Candidate Swipe Card Per Day",
      premium: "30",
      normal: "10",
    },
    {
      name: "Video Resume",
      premium: <CheckIcon className="h-5 w-5 text-green-500" />,
      normal: <CheckIcon className="h-5 w-5 text-green-500" />,
    },
  ];

  const extraServices: ExtraService[] = [
    {
      name: "Manual Human Resource Introduction",
      description: "Contact one of our representatives",
    },
    {
      name: "Consulting Service",
      description: "Contact one of our representatives",
    },
    {
      name: "Advertisement",
      description: "Contact one of our representatives",
    },
  ];

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-secondary-700">Pricing Plans</h3>
      
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-b py-4 px-4 text-left font-medium text-gray-500">Features</th>
              <th className="border-b py-4 px-4 text-left font-medium text-primary">
                <div className="inline-block rounded-full bg-primary-100 px-3 py-1 text-primary-700">
                  Premium Posting
                </div>
              </th>
              <th className="border-b py-4 px-4 text-left font-medium text-secondary-600">
                <div className="inline-block rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                  Normal Posting
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr key={i} className={cn(i % 2 === 0 ? "bg-gray-50" : "")}>
                <td className="py-4 px-4 align-top font-medium">{feature.name}</td>
                <td className="py-4 px-4 align-top">{feature.premium}</td>
                <td className="py-4 px-4 align-top">{feature.normal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex gap-4">
        <Button className="bg-primary hover:bg-primary-700">Choose Premium</Button>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary-100">Choose Normal</Button>
      </div>

      <div className="mt-12 border-t pt-6">
        <h4 className="text-lg font-bold text-secondary-700">Extra Source Income</h4>
        
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {extraServices.map((service, i) => (
            <div key={i} className="rounded-lg border p-4 hover:shadow-md transition-shadow">
              <h5 className="font-medium">{service.name}</h5>
              <p className="mt-2 text-sm text-gray-500">{service.description}</p>
              <Button variant="link" className="mt-2 p-0 text-primary">
                Contact Us
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
