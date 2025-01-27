import React from "react";
import { Switch, cn } from "@heroui/react";

export default function VisibilitySwitch({ setVisibility = () => {} }) {
  return (
    <div className="flex flex-col gap-6 w-full mb-9">
      <Switch
        onValueChange={setVisibility}
        defaultSelected
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary"
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            //selected
            "group-data-[selected=true]:ms-6",
            // pressed
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ms-4"
          ),
        }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-lg">Public</p>
          <p className="text-default-500">
            Enable all users to view this workout.
          </p>
        </div>
      </Switch>
    </div>
  );
}
