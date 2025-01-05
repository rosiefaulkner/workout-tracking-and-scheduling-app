import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";

const SetsRepsForm = ({
  movementsSetsReps = [],
  setMovementsSetsReps = () => {},
}) => {
  const [exercises, setExercises] = useState([]);

  /**
   * Initialize exercises when movementsSetsReps changes
   */
  useEffect(() => {
    const initialExercises =
      movementsSetsReps.length > 0
        ? movementsSetsReps.map((movement, index) => ({
            id: index + 1,
            name: movement,
            sets: "3",
            reps: "8",
          }))
        : [];
    setExercises(initialExercises);
  }, [movementsSetsReps]);

  /**
   * Handle input changes for sets and reps
   */
  const handleInputChange = (id, field, value) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  useEffect(() => {
    setMovementsSetsReps(exercises);
  }, [exercises]);

  return (
    <ul>
      {exercises.length > 0 &&
        exercises.map((exercise) => (
          <li key={exercise.id}>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 p-4">
              <div>
                <span className="text-foreground-500 text-lg">
                  {exercise.name}
                </span>
              </div>
              <Input
                type="number"
                color="primary"
                min={1}
                max={250}
                label="Sets"
                placeholder="3"
                value={exercise.sets}
                onChange={(e) =>
                  handleInputChange(exercise.id, "sets", e.target.value)
                }
                variant="underlined"
                className="outline-none focus:shadow-none focus:ring-0 max-w-8"
                onFocus={(e) => e.target.select()}
              />
              <div className="max-w-8">
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
                  variant={"underlined"}
                  className="outline-none focus:[box-shadow:none!important] max-w-8"
                  onFocus={(e) => e.target.select()}
                />
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default SetsRepsForm;
