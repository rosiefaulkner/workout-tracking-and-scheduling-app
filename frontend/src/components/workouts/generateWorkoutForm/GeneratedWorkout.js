import React from "react";
import GeminiRequest from "../../ai/GeminiRequest";

function GeneratedWorkout({ intensity, equipment, muscle, cat }) {
  return (
      <GeminiRequest intensity={intensity} equipment={equipment} muscle={muscle} cat={cat} />
  );
}

export default GeneratedWorkout;
