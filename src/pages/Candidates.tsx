
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, Star, Calendar, Eye, Heart } from "lucide-react";
import { CandidatesList } from "@/components/candidates/CandidatesList";
import { CandidateProfile } from "@/components/candidates/CandidateProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Candidates = () => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "shortlisted" | "interview" | "liked" | null>(null);
  
  // Handle clicking on stats cards to filter candidates
  const handleFilterChange = (filter: "all" | "shortlisted" | "interview" | "liked") => {
    setActiveFilter(filter === activeFilter ? null : filter);
    setSelectedCandidateId(null); // Reset selected candidate when changing filters
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center mb-8">
        <img 
          src="/lovable-uploads/d27daf70-5626-4ac2-a85d-6bf52bf94ef3.png" 
          alt="Job Matchy Nepal" 
          className="h-10 mr-4"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/100x40?text=Job+Matchy+Nepal";
          }}
        />
        <h1 className="text-2xl font-bold text-secondary-700">Candidates</h1>
      </div>
      
      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div onClick={() => handleFilterChange("all")} className="cursor-pointer">
          <StatsCard
            title="Total Applications"
            value="143"
            icon={<Users className="h-5 w-5" />}
            isActive={activeFilter === "all"}
          />
        </div>
        <div onClick={() => handleFilterChange("shortlisted")} className="cursor-pointer">
          <StatsCard
            title="Shortlisted"
            value="28"
            icon={<Star className="h-5 w-5" />}
            isActive={activeFilter === "shortlisted"}
          />
        </div>
        <div onClick={() => handleFilterChange("interview")} className="cursor-pointer">
          <StatsCard
            title="Interviews Scheduled"
            value="12"
            icon={<Calendar className="h-5 w-5" />}
            isActive={activeFilter === "interview"}
          />
        </div>
        <div onClick={() => handleFilterChange("liked")} className="cursor-pointer">
          <StatsCard
            title="Liked Candidates"
            value="42"
            icon={<Heart className="h-5 w-5" />}
            isActive={activeFilter === "liked"}
          />
        </div>
      </div>
      
      {selectedCandidateId ? (
        <CandidateProfile 
          candidateId={selectedCandidateId} 
          onBack={() => setSelectedCandidateId(null)} 
        />
      ) : (
        /* Candidates Tabs */
        <Tabs defaultValue="all" value={activeFilter || "all"} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger 
              value="all" 
              onClick={() => handleFilterChange("all")}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="shortlisted"
              onClick={() => handleFilterChange("shortlisted")}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Shortlisted
            </TabsTrigger>
            <TabsTrigger 
              value="interview"
              onClick={() => handleFilterChange("interview")}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Interview
            </TabsTrigger>
            <TabsTrigger 
              value="liked"
              onClick={() => handleFilterChange("liked")}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Liked
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <CandidatesList onViewProfile={setSelectedCandidateId} filter="all" />
          </TabsContent>
          <TabsContent value="shortlisted">
            <CandidatesList onViewProfile={setSelectedCandidateId} filter="shortlisted" />
          </TabsContent>
          <TabsContent value="interview">
            <CandidatesList onViewProfile={setSelectedCandidateId} filter="interview" />
          </TabsContent>
          <TabsContent value="liked">
            <CandidatesList onViewProfile={setSelectedCandidateId} filter="liked" />
          </TabsContent>
        </Tabs>
      )}
    </DashboardLayout>
  );
};

export default Candidates;
