
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, ArrowLeft, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Check if we're coming from the chat/message feature
  const isMessagePayment = location.pathname.includes("message") || 
                          location.search.includes("type=message");
  
  // Set the payment amount based on the payment type
  const paymentAmount = isMessagePayment ? 499 : 5000; // 499 for chat message, 5000 for job posting
  const paymentDescription = isMessagePayment ? "Message Credit" : "Job Posting";
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment Successful",
        description: "Your payment was processed successfully.",
      });
      navigate(-1); // Go back to previous page
    }, 2000);
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          className="mr-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-secondary-700">Payment</h1>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Payment</CardTitle>
            <CardDescription>
              Enter your payment details to complete the transaction for {paymentDescription}
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
            <div className="px-6">
              <TabsList className="grid grid-cols-4 w-full mb-4">
                <TabsTrigger value="card">Card</TabsTrigger>
                <TabsTrigger value="esewa">eSewa</TabsTrigger>
                <TabsTrigger value="khalti">Khalti</TabsTrigger>
                <TabsTrigger value="imepay">IME Pay</TabsTrigger>
              </TabsList>
            </div>
            
            <form onSubmit={handlePayment}>
              <TabsContent value="card">
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input id="cardholderName" placeholder="John Smith" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          required 
                          className="pl-10" 
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required maxLength={4} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="esewa">
                <CardContent className="space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-md inline-flex items-center">
                      <span className="font-bold text-xl">e</span>
                      <span className="font-medium">Sewa</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="esewaId">eSewa ID</Label>
                      <Input id="esewaId" placeholder="98XXXXXXXX" required />
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2">How to pay with eSewa:</p>
                      <ol className="text-sm text-gray-600 list-decimal pl-4 space-y-1">
                        <li>Click "Pay with eSewa" below</li>
                        <li>You will be redirected to eSewa login</li>
                        <li>Login and confirm payment</li>
                        <li>You'll be redirected back after payment</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="khalti">
                <CardContent className="space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-purple-700 text-white px-4 py-2 rounded-md">
                      <span className="font-bold">Khalti</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="khaltiId">Khalti Mobile Number</Label>
                      <Input id="khaltiId" placeholder="98XXXXXXXX" required />
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2">How to pay with Khalti:</p>
                      <ol className="text-sm text-gray-600 list-decimal pl-4 space-y-1">
                        <li>Click "Pay with Khalti" below</li>
                        <li>Enter your Khalti PIN on the next screen</li>
                        <li>Confirm your payment</li>
                        <li>You'll be redirected back after payment</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="imepay">
                <CardContent className="space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-md">
                      <span className="font-bold">IME Pay</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="imepayId">IME Pay Mobile Number</Label>
                      <Input id="imepayId" placeholder="98XXXXXXXX" required />
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2">How to pay with IME Pay:</p>
                      <ol className="text-sm text-gray-600 list-decimal pl-4 space-y-1">
                        <li>Click "Pay with IME Pay" below</li>
                        <li>You'll receive an OTP on your registered mobile</li>
                        <li>Enter OTP to confirm payment</li>
                        <li>You'll be redirected back after payment</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <div className="border-t pt-4 px-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span>Rs. {paymentAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500">Tax</span>
                  <span>Rs. 0.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rs. {paymentAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <CardFooter className="flex-col gap-2">
                <Button 
                  className="w-full" 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      Pay Rs. {paymentAmount.toFixed(2)} with {
                        paymentMethod === "card" ? "Card" : 
                        paymentMethod === "esewa" ? "eSewa" :
                        paymentMethod === "khalti" ? "Khalti" : "IME Pay"
                      }
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Your payment information is processed securely. We do not store payment details.
                </p>
              </CardFooter>
            </form>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payment;
