
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Messages = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; message: string; time: string }[]>([
    { 
      sender: "Priyanka Sharma", 
      message: "Hello! I'm interested in the Frontend Developer position. Is it still available?", 
      time: "09:30 AM" 
    },
    { 
      sender: "You", 
      message: "Yes, the position is still open. Could you tell me about your experience with React?", 
      time: "09:35 AM" 
    },
    { 
      sender: "Priyanka Sharma", 
      message: "I have 3 years of experience with React and have worked on several large-scale applications. I'm particularly skilled with hooks and context API.", 
      time: "09:38 AM" 
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  
  const handleSubscribe = () => {
    toast({
      title: "Subscription Success",
      description: "You now have premium access to messaging!",
    });
    setIsPremiumUser(true);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages, 
      { 
        sender: "You", 
        message: newMessage, 
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage("");
  };
  
  const recentChats = [
    { id: 1, name: "Priyanka Sharma", position: "Frontend Developer", avatar: "https://i.pravatar.cc/150?img=1", unread: 2 },
    { id: 2, name: "Rahul Patel", position: "Senior React Developer", avatar: "https://i.pravatar.cc/150?img=2", unread: 0 },
    { id: 3, name: "Anjali Desai", position: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?img=3", unread: 1 },
    { id: 4, name: "Vikram Singh", position: "Product Manager", avatar: "https://i.pravatar.cc/150?img=4", unread: 0 },
  ];
  
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-2xl font-bold text-secondary-700">Messages</h1>
      
      {!isPremiumUser ? (
        // Premium feature paywall
        <Card className="text-center max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Unlock Direct Messaging</CardTitle>
            <CardDescription>
              Connect directly with candidates through our secure messaging platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Lock className="mx-auto h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Feature</h3>
              <p className="text-gray-600 mb-6">
                Direct messaging allows you to communicate with candidates in real-time, 
                share job details, schedule interviews, and build relationships with potential hires.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-2xl font-bold text-primary">Rs. 499/month</h4>
                <p className="text-sm text-gray-500">Unlimited messaging with all candidates</p>
                
                <ul className="mt-4 mb-6 space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Real-time chat with candidates
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    File and document sharing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Interview scheduling
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Message history and search
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubscribe} className="w-full bg-primary hover:bg-primary/90">
              Subscribe Now - Rs. 499/month
            </Button>
          </CardFooter>
        </Card>
      ) : (
        // Chat interface
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Chat sidebar */}
          <div className="md:col-span-1 border rounded-lg bg-white overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Recent Conversations</h2>
            </div>
            
            <div className="divide-y">
              {recentChats.map((chat) => (
                <div 
                  key={chat.id} 
                  className={`p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${
                    chat.id === 1 ? "bg-primary-50" : ""
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <img src={chat.avatar} alt={chat.name} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{chat.name}</p>
                      {chat.unread > 0 && (
                        <Badge className="bg-primary text-white">{chat.unread}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat main */}
          <div className="md:col-span-3 border rounded-lg bg-white flex flex-col h-[600px]">
            <div className="p-4 border-b flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <img src="https://i.pravatar.cc/150?img=1" alt="Priyanka Sharma" />
              </Avatar>
              <div>
                <h2 className="font-semibold">Priyanka Sharma</h2>
                <p className="text-sm text-gray-500">Frontend Developer</p>
              </div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === "You" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100"
                    }`}
                  >
                    <p>{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "You" ? "text-primary-50" : "text-gray-500"
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Messages;
