
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users, Star, Calendar, Heart } from "lucide-react";
import { CandidatesList } from "@/components/candidates/CandidatesList";

const Candidates = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-2xl font-bold text-secondary-700">Candidates</h1>
      
      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Applications"
          value="143"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Shortlisted"
          value="28"
          icon={<Star className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Interviews Scheduled"
          value="12"
          icon={<Calendar className="h-5 w-5" />}
        />
        <StatsCard
          title="Saved Candidates"
          value="36"
          icon={<Heart className="h-5 w-5" />}
        />
      </div>
      
      {/* Candidates List */}
      <CandidatesList />
    </DashboardLayout>
  );
};

export default Candidates;
