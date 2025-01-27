import React, { useState } from "react";
import {
  Card,
  Button,
  Checkbox,
  Select,
  SelectItem,
  useCheckbox,
  CheckboxGroup,
  Chip,
  VisuallyHidden,
  tv,
} from "@heroui/react";

export const CustomCheckbox = (props) => {
  const checkbox = tv({
    slots: {
      base: "border-default hover:bg-default-200",
      content: "text-default-500",
    },
    variants: {
      isSelected: {
        true: {
          base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
          content: "text-primary-foreground pl-1",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });

  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};

export const CheckIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

const GenerateWorkoutForm = () => {
  const [intensity, setIntensity] = useState("intermediate");
  const [equipment, setEquipment] = useState([]);
  const [muscle, setMuscle] = useState([]);
  const [cat, setCat] = useState("");

  const equipmentOptions = [
    "body only",
    "machine",
    "other",
    "foam roll",
    "kettlebell",
    "dumbbell",
    "cable",
    "barbell",
    "bands",
    "medicine ball",
    "exercise ball",
    "e-z curl bar",
  ];

  const muscleGroup = [
    "abdominals",
    "hamstrings",
    "adductors",
    "quadriceps",
    "biceps",
    "shoulders",
    "chest",
    "middle back",
    "calves",
    "glutes",
    "lower back",
    "lats",
    "triceps",
    "traps",
    "forearms",
    "neck",
    "abductors",
  ];

  const category = [
    "strength",
    "stretching",
    "plyometrics",
    "strongman",
    "powerlifting",
    "cardio",
    "olympic weightlifting",
  ];

  const handleSubmit = () => {
    const workoutData = {
      intensity,
      muscle,
      cat,
      equipment,
    };
    console.log("Workout Data:", workoutData);
    alert("Workout Created!");
  };
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <Card className="p-6 shadow-lg min-w-screen-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Get a Tailored Routine</h2>

          {/* Intensity Level */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Intensity Level
            </label>
            <Select onChange={(e) => setIntensity(e.target.value)}>
              <SelectItem key="beginner">Beginner</SelectItem>
              <SelectItem key="intermediate">Intermediate</SelectItem>
              <SelectItem key="advanced">Advanced</SelectItem>
            </Select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Workout Focus
            </label>
            <Select onChange={(e) => setCat(e.target.value)}>
              {category.map((cat) => (
                <SelectItem key={cat}>{cat}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Muscle */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Muscle Focus (Select all that apply)
            </label>
            <Select onChange={(e) => setMuscle(e.target.value)} selectionMode="multiple">
              {muscleGroup.map((muscle) => (
                <SelectItem key={muscle}>{muscle}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Equipment */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Available Equipment
            </label>
            <div className="grid grid-cols-2 gap-2">
              <CheckboxGroup
                className="gap-1"
                label=""
                orientation="horizontal"
                value={equipment}
                onChange={setEquipment}
              >
                <div className="grid grid-cols-2 gap-2">
                  {equipmentOptions.map((item) => (
                    <CustomCheckbox key={item} value={item}>{item}</CustomCheckbox>
                  ))}
                </div>
              </CheckboxGroup>
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full" color="success" onPress={handleSubmit}>
            Generate Workout
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default GenerateWorkoutForm;
