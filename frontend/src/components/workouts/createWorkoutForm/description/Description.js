import React, { useState, useEffect, useRef } from "react";

import { Textarea } from "@nextui-org/react";

export default function Description({ setDescriptionhValue = () => {} }) {
  const [descriptionValue, setDescriptionValue] = useState("");

  useEffect(() => {
    if (!descriptionValue) {
        return;
    }
    setDescriptionhValue(descriptionValue);
  }, [descriptionValue]);

  return (
    <div className="flex flex-col gap-6 w-full mb-9">
      <Textarea
        classNames={{
          mainWrapper: "h-full pb-0",
          input:
            "pb-0 text-md border-transparent focus:border-transparent focus:ring-0",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        value={descriptionValue}
        label="Description"
        minRows={2}
        maxRows={5}
        onValueChange={setDescriptionValue}
        isRequired
        description="Enter a description for your workout."
      />
    </div>
  );
}
