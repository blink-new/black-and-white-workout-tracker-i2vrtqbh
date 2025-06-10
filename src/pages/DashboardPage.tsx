import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-display font-bold text-primary">Dashboard</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="mr-2 h-5 w-5" />
          Log New Workout
        </Button>
      </div>

      {/* Placeholder for recent workouts */}
      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-display font-semibold text-card-foreground mb-4">Recent Workouts</h2>
        <div className="text-center text-muted-foreground py-8">
          <p className="text-lg">No workouts logged yet.</p>
          <p>Start tracking to see your progress!</p>
        </div>
      </div>
    </div>
  );
}
