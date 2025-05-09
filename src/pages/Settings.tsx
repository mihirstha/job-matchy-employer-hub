import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Settings as SettingsIcon,
  User,
  CreditCard,
  Bell,
  Shield,
  KeyRound
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your profile settings have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-2xl font-bold text-secondary-700">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden md:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal account information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Prakash Sharma" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="prakash@example.com" />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+977-9812345678" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" defaultValue="HR Manager" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                    defaultValue="HR Manager at DigitalTech with 5+ years of experience in recruitment and talent acquisition."
                  ></textarea>
                </div>
              </div>
              
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Company Tab */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>
                Manage your company profile and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="DigitalTech Solutions" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" defaultValue="Information Technology" />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Input id="companySize" defaultValue="50-200 employees" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://digitaltech.com.np" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <textarea
                    id="companyDescription"
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                    defaultValue="DigitalTech Solutions is a leading IT company in Nepal specializing in web development, mobile app development, and digital marketing services."
                  ></textarea>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyLogo">Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <img
                      src="/lovable-uploads/7878653a-ce16-48ca-bb79-dcf11aba104a.png"
                      alt="Company Logo"
                      className="h-16 w-auto"
                    />
                    <Button variant="outline">Change Logo</Button>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>
                Manage your subscription and payment information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Current Plan</h3>
                    <div className="flex items-center mt-1">
                      <span className="font-medium">Premium Plan</span>
                      <Badge className="ml-2 bg-primary text-white">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Your subscription renews on May 15, 2025
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">Rs. 5,000/month</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
                <div className="flex items-center border p-4 rounded-lg">
                  <div className="p-2 bg-gray-100 rounded">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                  <Button variant="ghost" className="ml-auto">
                    Edit
                  </Button>
                </div>
                <Button variant="outline" className="mt-4">
                  Add Payment Method
                </Button>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Billing History</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Apr 15, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Rs. 2,999
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <a href="#" className="text-primary hover:underline">
                            Download
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Mar 15, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Rs. 2,999
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <a href="#" className="text-primary hover:underline">
                            Download
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Applications</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications when new candidates apply
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Interview Reminders</p>
                      <p className="text-sm text-gray-500">
                        Get reminded about upcoming interviews
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Messages</p>
                      <p className="text-sm text-gray-500">
                        Notify when you receive new messages
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Updates</p>
                      <p className="text-sm text-gray-500">
                        Receive news, announcements, and product updates
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Mobile Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">
                        Enable push notifications on your mobile device
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button>Update Password</Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-3">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-3">Session Management</h3>
                <p className="text-sm text-gray-500 mb-2">
                  You're currently signed in on these devices:
                </p>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Chrome on Windows</p>
                        <p className="text-xs text-gray-500">
                          Kathmandu, Nepal • Current session
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Active
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Safari on iPhone</p>
                        <p className="text-xs text-gray-500">
                          Kathmandu, Nepal • Last active: 2 hours ago
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 text-red-600">
                  Sign Out From All Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
