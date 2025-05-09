
import { cn } from "@/lib/utils";

export interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  isActive?: boolean;
}

export function StatsCard({ title, value, icon, trend, isActive = false }: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-4 shadow-sm transition-all",
        isActive && "border-primary bg-primary/5"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="rounded-full bg-gray-100 p-2">{icon}</div>
      </div>
      <p className="mt-4 text-2xl font-bold">{value}</p>
      {trend && (
        <div className="mt-2 flex items-center">
          {trend.isPositive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span
            className={cn(
              "ml-1 text-xs",
              trend.isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {trend.value}%
          </span>
        </div>
      )}
    </div>
  );
}
