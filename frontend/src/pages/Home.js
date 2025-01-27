import React from "react";
import PageLayout from "./layout/PageLayout";
import ActivityFeed from "../components/activity-feed/AcivityFeed";
import {
  Card,
  Button,
  Calendar,
} from "@heroui/react";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import StatsTable from "../components/stats-table/StatesTable";
import SubscribedWorkouts from "../components/subscribed-workouts/SubscribedWorkouts";
import WeeklyReport from "../components/weekly-report/WeeklyReport";

const Home = () => {
  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  let { locale } = useLocale();

  let isDateUnavailable = (date) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );
  return (
    <PageLayout>
      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <SubscribedWorkouts />
          <WeeklyReport />
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold">History</h3>
            <Calendar
              classNames={{
                calendarContent: "min-w-[400px]",
              }}
              visibleMonths={1}
              isReadOnly
              aria-label="Date (Unavailable)"
              isDateUnavailable={isDateUnavailable}
            />
          </Card>
        </div>

        {/* Stats Table */}
        <StatsTable />

        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </PageLayout>
  );
};

export default Home;
