import React from "react";
import GeminiRequest from "../../ai/GeminiRequest";
import { Button } from "@heroui/button";

function GeneratedWorkout({ intensity, equipment, muscle, cat }) {
  return (
    <>
      <GeminiRequest
        intensity={intensity}
        equipment={equipment}
        muscle={muscle}
        cat={cat}
      />
      <div className="flex flex-wrap gap-4 items-center mt-9">
        <Button color="primary">Generate new</Button>
        <Button color="success">Schedule it!</Button>
      </div>
    </>
  );
}

export default GeneratedWorkout;
