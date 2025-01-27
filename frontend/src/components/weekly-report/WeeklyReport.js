import React from 'react';
import {Card, CardBody, Button, Divider, Link, Tooltip} from "@heroui/react";
import { TrophyIcon } from "@heroicons/react/24/outline";

export default function WeeklyReport() {
  return (
    <div className="flex flex-col gap-4">
          <div className="mb-6">
            <Card className="p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Weekly Report</h3>
      <Divider />
      <CardBody className='flex gap-3'>
        <p>Squat (Barbell) Max Weight: 80lbs</p>
        <Tooltip content="Percentage of individuals with your weight, age and gender who have achieved this max">
        <Link>Compared to 65%</Link>
          </Tooltip>
        <Divider />
        <p>Bench Press (Barbell) Max Weight: 85lbs</p>
        <Tooltip content="Percentage of individuals with your weight, age and gender who have achieved this max">
        <Link>Compared to 45%</Link>
          </Tooltip>
        <Divider />
        <p>Bench Press (Barbell) Max Weight: 85lbs</p>
        <Tooltip content="Percentage of individuals with your weight, age and gender who have achieved this max">
        <Link>Compared to 95%</Link>
          </Tooltip>
      </CardBody>
      <Button flat color="success" className="mt-6">
            Read Your Weekly Report
          </Button>
    </Card>
    </div>
    </div>
  );
}
