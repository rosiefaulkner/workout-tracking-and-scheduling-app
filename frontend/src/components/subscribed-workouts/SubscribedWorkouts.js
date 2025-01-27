import React from "react";
import {
  usePagination,
  cn,
  Button,
  Card,
  PaginationItemType,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";

export const ChevronIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default function SubscribedWorkouts() {
  const workouts = [
    {
      name: "Workout 1",
      movements: {
        "Bench Press": 4,
        "Push Press": 2,
        "Front Squat": 2,
        "Closed Grip Bench Press": 2,
        "Bench Press": 4,
        "Push Press": 2,
        "Front Squat": 2,
        "Pull Ups": 2,
        "Bench Press": 4,
        "Push Press": 2,
        "Front Squat": 2,
        "Decline Bench Press": 2,
      },
      progress: "Week 5, Day 1",
    },
    {
      name: "Workout 2",
      movements: {
        "Sumo Deadlift": 4,
        "Pull Ups": 2,
        "Front Squat": 2,
        Deadlift: 2,
      },
      progress: "Week 3, Day 2",
    },
    {
      name: "Workout 3",
      movements: {
        "Incline Bench Press": 4,
        Lunges: 2,
        "Front Squat": 2,
        "Back Squat": 2,
      },
      progress: "Week 1, Day 4",
    },
    {
      name: "Workout 4",
      movements: {
        "Closed Grip Bench Press": 4,
        "Push Press": 2,
        "Front Squat": 2,
        Deadlift: 2,
      },
      progress: "Week 2, Day 5",
    },
  ];

  const { activePage, range, setPage, onNext, onPrevious } = usePagination({
    total: workouts?.length, // Updated to match the number of workouts
    showControls: true,
    siblings: 1,
    boundaries: 1,
  });

  // Get the workout corresponding to the active page
  const activeWorkout = workouts[activePage - 1];

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-6">
        <Card className="p-6 shadow-lg">
          <h3 className="text-xl font-semibold">Continue Training</h3>
          <h3 className="text-m font-semibold mt-2 mb-4">{activeWorkout.name}</h3>
          <div className="overflow-y-auto max-h-40 mb-4">
            <Table>
              <TableHeader>
                <TableColumn>Movement</TableColumn>
                <TableColumn>Sets</TableColumn>
              </TableHeader>
              <TableBody className="mb-4 p-0">
                {Object.entries(activeWorkout.movements).map(
                  ([movement, sets]) => (
                    <TableRow key={movement}>
                      <TableCell>{movement}</TableCell>
                      <TableCell>{sets}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
          <Button flat color="success" className="mt-6">
            Start {activeWorkout.progress}
          </Button>

          <ul className="mt-6 mb-6 flex gap-2 w-full justify-center items-center">
            {range.map((page, index) => {
              if (page === PaginationItemType.NEXT) {
                return (
                  <li key={index} aria-label="next page" className="w-4 h-4">
                    <button
                      className="w-full h-full bg-default-200 rounded-full"
                      onClick={onNext}
                    >
                      <ChevronIcon className="rotate-180" />
                    </button>
                  </li>
                );
              }

              if (page === PaginationItemType.PREV) {
                return (
                  <li
                    key={index}
                    aria-label="previous page"
                    className="w-4 h-4"
                  >
                    <button
                      className="w-full h-full bg-default-200 rounded-full"
                      onClick={onPrevious}
                    >
                      <ChevronIcon />
                    </button>
                  </li>
                );
              }

              if (page === PaginationItemType.DOTS) {
                return (
                  <li key={index} className="w-4 h-4">
                    ...
                  </li>
                );
              }

              return (
                <li key={index} aria-label={`page ${page}`} className="w-4 h-4">
                  <button
                    className={cn(
                      "w-full h-full bg-default-300 rounded-full",
                      activePage === page && "bg-primary"
                    )}
                    onClick={() => setPage(page)}
                  />
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
