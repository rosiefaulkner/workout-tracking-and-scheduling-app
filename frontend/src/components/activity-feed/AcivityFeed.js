import React from "react";
import { Tooltip, Button } from "@heroui/react";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

const ActivityFeed = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Activity Feed</h3>
      <div className="space-y-4">
        <div className="bg-content1 p-4 rounded-lg shadow-md flex justify-between items-center">
          <div className="text-sm">John Doe lifted 450lbs today!</div>
          <Tooltip content="Like this">
            <Button auto flat color="error" size="xs">
              <HandThumbUpIcon />
            </Button>
          </Tooltip>
        </div>
        <div className="bg-content1 p-4 rounded-lg shadow-md flex justify-between items-center">
          <div className="text-sm">Germaine made a PR on bench press!</div>
          <Tooltip content="Like this">
            <Button auto flat color="error" size="xs">
              <HandThumbUpIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
