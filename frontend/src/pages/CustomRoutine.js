import React, { useState } from "react";
import PageLayout from "./layout/PageLayout";
import GenerateWorkoutForm from "../components/workouts/generateWorkoutForm/GenerateWorkoutForm";
import GeneratedWorkout from "../components/workouts/generateWorkoutForm/GeneratedWorkout";

function CustomRoutine() {
      const [intensity, setIntensity] = useState("intermediate");
      const [equipment, setEquipment] = useState([]);
      const [muscle, setMuscle] = useState([]);
      const [cat, setCat] = useState("");
      const [submitted, setSubmitted] = useState(false);
  return (
    <PageLayout>
      <GenerateWorkoutForm equipment={equipment} setIntensity={setIntensity} setEquipment={setEquipment} setMuscle={setMuscle} setCat={setCat} setSubmitted={setSubmitted}/>
      { submitted &&  <GeneratedWorkout intensity={intensity} equipment={equipment} muscle={muscle} cat={cat} />}
    </PageLayout>
  );
}

export default CustomRoutine;
