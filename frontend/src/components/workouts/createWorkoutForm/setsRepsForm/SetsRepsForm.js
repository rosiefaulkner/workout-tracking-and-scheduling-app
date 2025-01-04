import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";

const SetsRepsForm = ({
  movementsSetsReps = [],
  setSets = () => {},
  setReps = () => {},
}) => {
  const [exercises, setExercises] = useState([]);

  // Initialize exercises when movementsSetsReps changes
  useEffect(() => {
    const initialExercises = movementsSetsReps.length > 0 
      ? movementsSetsReps.map((movement, index) => ({
          id: index + 2, // Unique ID
          name: movement, // Name as a string
          sets: "", // Default empty value for sets
          reps: "", // Default empty value for reps
        }))
      : [];
    setExercises(initialExercises);
  }, [movementsSetsReps]);

  // Update aggregated sets and reps whenever exercises change
  useEffect(() => {
    const totalSets = exercises.reduce((acc, ex) => acc + (Number(ex.sets) || 0), 0);
    const totalReps = exercises.reduce((acc, ex) => acc + (Number(ex.reps) || 0), 0);
    setSets(totalSets);
    setReps(totalReps);
  }, [exercises, setSets, setReps]);

  // Handle input changes for sets and reps
  const handleInputChange = (id, field, value) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  return (
    <ul>
      {exercises.length > 0 && exercises.map((exercise) => (
        <li key={exercise.id}>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 p-4">
            <div>
              <span className="text-foreground-500 text-lg">
                {exercise.name}
              </span>
            </div>
            <div>
              <Input
                type="number"
                min={1}
                max={250}
                label="Sets"
                placeholder="3"
                value={exercise.sets}
                onChange={(e) =>
                  handleInputChange(exercise.id, "sets", e.target.value)
                }
                className="min-w-24"
              />
            </div>
            <div>
              <Input
                type="number"
                min={1}
                max={250}
                label="Reps"
                placeholder="8"
                value={exercise.reps}
                onChange={(e) =>
                  handleInputChange(exercise.id, "reps", e.target.value)
                }
                className="min-w-24"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SetsRepsForm;
