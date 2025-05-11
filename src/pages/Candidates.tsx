
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, Star, Calendar, Eye } from "lucide-react";
import { CandidatesList } from "@/components/candidates/CandidatesList";
import { CandidateProfile } from "@/components/candidates/CandidateProfile";

const Candidates = () => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "shortlisted" | "interview" | null>(null);
  
  // Handle clicking on stats cards to filter candidates
  const handleFilterChange = (filter: "all" | "shortlisted" | "interview") => {
    setActiveFilter(filter === activeFilter ? null : filter);
    setSelectedCandidateId(null); // Reset selected candidate when changing filters
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center mb-8">
        <img 
          src="/lovable-uploads/c3933293-e878-492e-bdd7-253daf53886d.png" 
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
        <StatsCard
          title="Total Job Views"
          value="2,567"
          icon={<Eye className="h-5 w-5" />}
        />
      </div>
      
      {selectedCandidateId ? (
        <CandidateProfile 
          candidateId={selectedCandidateId} 
          onBack={() => setSelectedCandidateId(null)} 
        />
      ) : (
        /* Candidates List */
        <CandidatesList 
          onViewProfile={setSelectedCandidateId} 
          filter={activeFilter}
        />
      )}
    </DashboardLayout>
  );
};

export default Candidates;
