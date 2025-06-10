import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ExerciseSet {
  id: string;
  reps: string;
  weight: string;
}

interface ExerciseEntry {
  id: string;
  name: string;
  sets: ExerciseSet[];
}

export default function LogWorkoutPage() {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDate, setWorkoutDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [exercises, setExercises] = useState<ExerciseEntry[]>([]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        id: Date.now().toString(), // Simple unique ID
        name: "",
        sets: [{ id: Date.now().toString() + "_set", reps: "", weight: "" }],
      },
    ]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId));
  };

  const handleExerciseNameChange = (
    exerciseId: string,
    newName: string
  ) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, name: newName } : ex
      )
    );
  };

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                { id: Date.now().toString() + "_set", reps: "", weight: "" },
              ],
            }
          : ex
      )
    );
  };

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: ex.sets.filter((set) => set.id !== setId) }
          : ex
      )
    );
  };

  const handleSetChange = (
    exerciseId: string,
    setId: string,
    field: "reps" | "weight",
    value: string
  ) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set) =>
                set.id === setId ? { ...set, [field]: value } : set
              ),
            }
          : ex
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the data. We'll handle saving later.
    console.log({ workoutName, workoutDate, exercises });
    // Potentially clear form or navigate away
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>
      <h1 className="text-4xl font-display font-bold text-primary mb-8">
        Log New Workout
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="workoutName" className="text-lg font-semibold text-foreground">
              Workout Name
            </Label>
            <Input
              id="workoutName"
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="e.g., Morning Push Day"
              className="mt-2 bg-card border-border text-card-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <Label htmlFor="workoutDate" className="text-lg font-semibold text-foreground">
              Date
            </Label>
            <Input
              id="workoutDate"
              type="date"
              value={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
              className="mt-2 bg-card border-border text-card-foreground"
            />
          </div>
        </div>

        {/* Exercises Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-primary">
            Exercises
          </h2>
          {exercises.map((exercise, exIndex) => (
            <div key={exercise.id} className="bg-card p-6 rounded-lg shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <Input
                  type="text"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseNameChange(exercise.id, e.target.value)
                  }
                  placeholder={`Exercise ${exIndex + 1} Name (e.g., Bench Press)`}
                  className="text-xl font-semibold bg-transparent border-0 border-b-2 border-border focus:ring-0 focus:border-primary rounded-none p-1 flex-grow mr-4"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExercise(exercise.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Sets Section */}
              {exercise.sets.map((set, setIndex) => (
                <div key={set.id} className="grid grid-cols-12 gap-3 items-center">
                  <Label className="col-span-1 text-sm text-muted-foreground text-right">
                    Set {setIndex + 1}
                  </Label>
                  <div className="col-span-5">
                    <Input
                      type="number"
                      value={set.reps}
                      onChange={(e) => handleSetChange(exercise.id, set.id, "reps", e.target.value)}
                      placeholder="Reps"
                      className="bg-background border-border placeholder:text-muted-foreground/70"
                    />
                  </div>
                  <div className="col-span-5">
                    <Input
                      type="number"
                      value={set.weight}
                      onChange={(e) => handleSetChange(exercise.id, set.id, "weight", e.target.value)}
                      placeholder="Weight (kg/lbs)"
                      className="bg-background border-border placeholder:text-muted-foreground/70"
                    />
                  </div>
                  {exercise.sets.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSet(exercise.id, set.id)}
                      className="col-span-1 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addSet(exercise.id)}
                className="mt-2 border-dashed border-primary/50 text-primary/80 hover:text-primary hover:border-primary"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Set
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addExercise}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-base"
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Add Exercise
          </Button>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg">
            Save Workout
          </Button>
        </div>
      </form>
    </div>
  );
}