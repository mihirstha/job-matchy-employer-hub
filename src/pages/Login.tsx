import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Lock, User, Building2, Phone, MapPin, Briefcase } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [signupStep, setSignupStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company details
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    // Contact person details
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    designation: "",
    // Login details
    email: "",
    password: "",
    rememberMe: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    setSignupStep(2);
  };

  const handlePrevStep = () => {
    setSignupStep(1);
  };

  const handleSignupSubmit = () => {
    // Handle signup logic here
    console.log("Signup data:", formData);
  };

  const handleLoginSubmit = () => {
    // Handle login logic here
    console.log("Login data:", { email: formData.email, password: formData.password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8">
          <div className="flex items-center space-x-4 mb-8">
            <img 
              src="/lovable-uploads/logo-no-bg.png" 
              alt="Job Matchy Nepal" 
              className="h-12"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/120x48?text=Job+Matchy+Nepal";
              }}
            />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-primary border-b-4 border-primary">Swipe, Shortlist, Select</span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Hiring Made Easier
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              Experience the future of recruitment with Job Matchy Nepal
            </p>
            <p className="text-primary font-medium text-base">
              Video Resumes • Real Connections • Perfect Matches
            </p>
          </div>

          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/mascot-no-bg.png" 
              alt="Job Matchy Mascot" 
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>

        {/* Right Side - Forms */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-white shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4 lg:hidden">
                <img 
                  src="/lovable-uploads/logo-no-bg.png" 
                  alt="Job Matchy Nepal" 
                  className="h-10"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {isLogin ? "Employer Login" : "Employer Registration"}
              </h3>
              <p className="text-gray-600">
                {isLogin 
                  ? "Login with your registered Email & Password" 
                  : signupStep === 1 
                    ? "Enter your company details"
                    : "Enter contact person details"
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {isLogin ? (
                // Login Form
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="E-mail address"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm">Remember Me</Label>
                    </div>
                    <Button variant="link" className="text-sm text-primary p-0">
                      Forgot Password?
                    </Button>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={handleLoginSubmit}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Login
                  </Button>

                  <div className="relative">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-2 text-gray-500 text-sm">or</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Button 
                      variant="link" 
                      className="text-primary p-0 font-semibold"
                      onClick={() => setIsLogin(false)}
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              ) : (
                // Signup Form
                <div className="space-y-4">
                  {signupStep === 1 ? (
                    // Step 1: Company Details
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="companyName"
                            placeholder="Enter company name"
                            className="pl-10"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyEmail">Company Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="companyEmail"
                            type="email"
                            placeholder="company@example.com"
                            className="pl-10"
                            value={formData.companyEmail}
                            onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyPhone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="companyPhone"
                            placeholder="+977 XXXXXXXXXX"
                            className="pl-10"
                            value={formData.companyPhone}
                            onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyAddress">Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="companyAddress"
                            placeholder="Company address"
                            className="pl-10"
                            value={formData.companyAddress}
                            onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                          />
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        onClick={handleNextStep}
                      >
                        Next Step
                      </Button>
                    </div>
                  ) : (
                    // Step 2: Contact Person Details
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handlePrevStep}
                          className="mr-2 p-1"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-gray-600">Step 2 of 2</span>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Person Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="contactName"
                            placeholder="Full name"
                            className="pl-10"
                            value={formData.contactName}
                            onChange={(e) => handleInputChange("contactName", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="contactEmail"
                            type="email"
                            placeholder="contact@example.com"
                            className="pl-10"
                            value={formData.contactEmail}
                            onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="contactPhone"
                            placeholder="+977 XXXXXXXXXX"
                            className="pl-10"
                            value={formData.contactPhone}
                            onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="designation"
                            placeholder="e.g., HR Manager"
                            className="pl-10"
                            value={formData.designation}
                            onChange={(e) => handleInputChange("designation", e.target.value)}
                          />
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        onClick={handleSignupSubmit}
                      >
                        Create Account
                      </Button>
                    </div>
                  )}

                  <div className="relative">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-2 text-gray-500 text-sm">or</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <Button 
                      variant="link" 
                      className="text-primary p-0 font-semibold"
                      onClick={() => {
                        setIsLogin(true);
                        setSignupStep(1);
                      }}
                    >
                      Login Now
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;