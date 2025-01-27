import React, { useEffect, useState } from "react";
import { Slider, Tooltip } from "@heroui/react";

export default function ProgramLength({setProgramLengthValue = () => {}}) {
  const [value, setValue] = useState(1);
  const [inputValue, setInputValue] = React.useState("1");

  const handleChange = (value) => {
    if (isNaN(Number(value))) return;

    setValue(value);
    setInputValue(value.toString());
  };

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setProgramLengthValue(inputValue);
  }, [inputValue]);

  return (
    <div className="flex flex-col gap-6 w-full mb-9">
      <Slider
        classNames={{
          base: "max-w-3xl",
          label: "text-lg",
        }}
        color="Primary"
        label="Select program length"
        maxValue={18}
        minValue={1}
        renderValue={({ children, ...props }) => (
          <output {...props}>
            <Tooltip
              className="text-tiny text-default-500 rounded-md"
              content="Enter # of weeks"
              placement="left"
            >
              <input
                aria-label="ProgramLength"
                className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                type="number"
                value={inputValue}
                onChange={(e) => {
                  const v = e.target.value;

                  setInputValue(v);
                }}
                max={18}
                min={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                    setValue(Number(inputValue));
                  }
                }}
              />
            </Tooltip>
          </output>
        )}
        size="lg"
        step={1}
        value={value}
        onChange={handleChange}
      />
      <h3 className="text-lg font-semibold mb-8">
        Program length:{" "}
        <span className="mt-4 ml-1 text-default-500">{value} weeks</span>
      </h3>
    </div>
  );
}
