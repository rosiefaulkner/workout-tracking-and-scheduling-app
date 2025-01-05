import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";

export default function WorkoutName({ setWorkoutTitle = () => {} }) {
  const [titleValue, setTitleValue] = useState("");

  useEffect(() => {
    setWorkoutTitle(titleValue);
  }, [titleValue]);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-9 mb-9 items-start">
      <Input
        isRequired
        classNames={{
          mainWrapper: "h-full pb-0",
          input:
            "pb-0 text-md border-transparent focus:border-transparent focus:ring-0 outline-none",
          inputWrapper:
            "h-full font-normal text-default-500",
        }}
        label="Workout Title "
        type="text"
        value={titleValue}
        onValueChange={setTitleValue}
      />
    </div>
  );
}
