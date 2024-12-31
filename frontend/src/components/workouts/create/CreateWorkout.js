import React, { useState } from "react";
import { Input, Checkbox, CheckboxGroup, ScrollShadow, Chip, cn } from "@nextui-org/react";
import { useInView } from "react-intersection-observer";
import movementsData from "./../../../api/movements/movements.json";

export const LazyCheckbox = ({ movement, value }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView && (
        <Checkbox
          aria-label={movement.name}
          classNames={{
            base: cn(
              "inline-flex max-w-full w-full bg-content1 m-0",
              "hover:bg-content2 items-center justify-start",
              "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            label: "w-full",
          }}
          value={value}
        >
          <div className="w-full flex justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold">{movement.name}</h3>
              <p className="text-sm text-default-500">Equipment: {movement.equipment || "N/A"}</p>
              <p className="text-sm text-default-500">Level: {movement.level || "N/A"}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              {movement.primaryMuscles && <Chip color="warning" size="md" variant="flat">
                {movement.primaryMuscles}
              </Chip>}
            </div>
          </div>
        </Checkbox>
      )}
    </div>
  );
};

function CreateWorkout() {
  const [groupSelected, setGroupSelected] = useState([]);

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-16">
        <Input classNames={{
              mainWrapper: "h-full pb-0",
              input:
                "pb-0 text-md border-transparent focus:border-transparent focus:ring-0",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            label="Workout Routine Title"
            type="text" />
      </div>
      <h3 className="text-lg font-semibold">Select exercises:</h3>
      <div className="flex flex-col gap-1 w-full">
        <ScrollShadow
          orientation="vertical"
          className="w-full max-w-full h-[400px] overflow-y-auto shadow-md"
        >
          <CheckboxGroup
            classNames={{
              base: "w-full mb-6",
            }}
            label=" "
            value={groupSelected}
            onChange={setGroupSelected}
          >
            {movementsData.movements.map((movement, index) => (
              <LazyCheckbox key={index} movement={movement} value={movement.name} />
            ))}
          </CheckboxGroup>
        </ScrollShadow>
        <p className="mt-4 ml-1 text-default-500">Selected: {groupSelected.join(", ")}</p>
      </div>
    </>
  );
}

export default CreateWorkout;
