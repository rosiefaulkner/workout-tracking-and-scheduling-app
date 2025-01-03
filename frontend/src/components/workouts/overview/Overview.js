import React from "react";
import { DrawerBody } from "@nextui-org/react";
import { workoutOverview } from "../../../helpers/dummyData"; // Remove after adding endpoint

function Overview() {

  return (
    <DrawerBody>
      <p className="font-bold">Focus areas:</p> <p>{workoutOverview.type}</p>
      <p className="font-bold">Level:</p> <p>{workoutOverview.level}</p>
      <p className="font-bold">Days per week:</p>{" "}
      <p>{workoutOverview.daysPerWeek}</p>
      <p className="font-bold">Equipment:</p> <p>{workoutOverview.equipment}</p>
      <p className="font-bold">Muscle groups:</p>{" "}
      <p>{workoutOverview.muscleGroups}</p>
      <p className="font-bold">Duration:</p> <p>{workoutOverview.duration}</p>
      <p className="font-bold">Program Duration</p>{" "}
      <p>{workoutOverview.programDuration}</p>
    </DrawerBody>
  );
}

export default Overview;
