import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";

const StatsTable = () => {
  const movements = [
    {
      name: "Deadlift",
      maxWeight: "130",
      maxSetVolume: "950",
      bestEstimated1RM: "137",
    },
    {
      name: "Front Squat (Barbell)",
      maxWeight: "65",
      maxSetVolume: "780",
      bestEstimated1RM: "93.6",
    },
    {
      name: "Overhead Press (Barbell)",
      maxWeight: "75",
      maxSetVolume: "450",
      bestEstimated1RM: "75",
    },
    {
      name: "Incline Bench Press (Barbell)",
      maxWeight: "55",
      maxSetVolume: "500",
      bestEstimated1RM: "68.3",
    },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-4">Stats</h3>
      <Table aria-label="Acheivments table">
        <TableHeader>
          <TableColumn>Movement</TableColumn>
          <TableColumn>Max Weight</TableColumn>
          <TableColumn>Max Set Volume</TableColumn>
          <TableColumn>Best Estimated 1RM</TableColumn>
        </TableHeader>
        <TableBody>
          {movements.map((movement) => (
            <TableRow key={movement.name}>
              <TableCell>{movement.name}</TableCell>
              <TableCell>{movement.maxWeight} lbs</TableCell>
              <TableCell>{movement.maxSetVolume} lbs</TableCell>
              <TableCell>{movement.bestEstimated1RM} lbs</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatsTable;
