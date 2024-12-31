import React, { useState } from "react";
import PageLayout from "./layout/PageLayout";
import Overview from "../components/workouts/overview/Overview";
import WorkoutRoutine from "../components/workouts/routine/WorkoutRoutine";
import { useAsyncList } from "@react-stately/data";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Chip,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Button,
  useDisclosure,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { workoutOverview, workoutSchedule } from "../helpers/dummyData";

function MyProgram() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  let list = useAsyncList({
    load({ signal, cursor }) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = cursor || workoutSchedule;
      if (!cursor) {
        setIsLoading(false);
      }

      return {
        items: res.dayOne.excercises,
        cursor: res.next,
      };
    },
  });

  const hasMore = page < 9;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            <Button onPress={onOpen}>Overview</Button>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
              <DrawerContent>
                {(onClose) => (
                  <>
                  <div className="w-full py-10">
                    <DrawerHeader className="flex flex-col gap-1">
                      {workoutOverview.title}
                    </DrawerHeader>

                    
                      <Tabs
                        aria-label="Login or Signup Options"
                        className="w-full block"
                      >
                        <Tab key="overview" title="Overview">
                          <Overview />
                        </Tab>
                        <Tab key="workout" title="Workout">
                          <WorkoutRoutine />
                        </Tab>
                      </Tabs>
                    </div>
                    <DrawerFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Add workout
                      </Button>
                    </DrawerFooter>
                  </>
                )}
              </DrawerContent>
            </Drawer>
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label={workoutOverview.title}
          subtitle={workoutOverview.type}
          title={workoutOverview.title}
          startContent={
            <Avatar
              isBordered
              color="success"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          }
          className="ml-4"
        >
          {workoutOverview.explanation}
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label={workoutOverview.title}
          subtitle={
            <p className="flex">
              {workoutOverview.type}{" "}
              <Chip color="primary" className="ml-2 font-bold" variant="flat">
                Current routine
              </Chip>
            </p>
          }
          title={workoutOverview.title}
          startContent={
            <Avatar
              isBordered
              color="warning"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
          }
          className="ml-4"
        >
          {workoutOverview.explanation}
        </AccordionItem>
      </Accordion>
    </PageLayout>
  );
}

export default MyProgram;
