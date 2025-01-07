import React, { useState } from "react";
import PageLayout from "./layout/PageLayout";
import Overview from "../components/workouts/overview/Overview";
import WorkoutRoutine from "../components/workouts/routine/WorkoutRoutine";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { workoutOverview, workoutSchedule } from "../helpers/dummyData";

function Home() {
  return (
    <PageLayout>
      <Accordion
        className="p-2 flex flex-col gap-1 w-full"
        showDivider={true}
        variant="shadow"
      >
        <AccordionItem
          key="1"
          aria-label={workoutOverview.title}
          subtitle={workoutOverview.type}
          title={workoutOverview.title}
          startContent={
            <Avatar
              isBordered
              color="primary"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          }
          className="ml-4"
        >
          {workoutOverview.explanation}
          <div className="mt-4">
            <Button>Overview</Button>
          </div>
        </AccordionItem>
      </Accordion>
    </PageLayout>
  );
}

export default Home;
