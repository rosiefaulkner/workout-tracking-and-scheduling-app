import React, { useState } from "react";
import PageLayout from "./layout/PageLayout";
import GenerateWorkoutForm from "../components/workouts/generateWorkoutForm/GenerateWorkoutForm";

function CustomRoutine({ children }) {
  return (
    <PageLayout>
      <GenerateWorkoutForm />
    </PageLayout>
  );
}

export default CustomRoutine;
