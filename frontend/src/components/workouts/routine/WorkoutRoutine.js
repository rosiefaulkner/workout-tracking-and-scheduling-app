import React from "react";
import { useAsyncList } from "@react-stately/data";
import {
  DrawerBody,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import { workoutSchedule } from "../../../helpers/dummyData"; // Remove after adding endpoint

function WorkoutRoutine() {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

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

  return (
    <DrawerBody>
      <p className="font-bold">Day One:</p>
      <Table
        isHeaderSticky
        aria-label="Workout schedule"
        bottomContent={
          hasMore && !isLoading ? (
            <div className="flex w-full justify-center">
              <Button
                isDisabled={list.isLoading}
                variant="flat"
                onPress={list.loadMore}
              >
                {list.isLoading && <Spinner color="white" size="sm" />}
                Load More
              </Button>
            </div>
          ) : null
        }
        classNames={{
          base: "overflow-scroll",
          table: "min-h-[420px]",
        }}
      >
        <TableHeader>
          <TableColumn key="title">Excercise</TableColumn>
          <TableColumn key="sets">Sets</TableColumn>
          <TableColumn key="reps">Reps</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            console.log("item: ", item),
            (
              <TableRow key={Math.floor(Math.random() * 300)}>
                {(columnKey) => (
                  console.log("columnKey: ", columnKey),
                  (<TableCell>{getKeyValue(item, columnKey)}</TableCell>)
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <p className="font-bold">Day Two:</p>
      <Table
        isHeaderSticky
        aria-label="Workout schedule"
        bottomContent={
          hasMore && !isLoading ? (
            <div className="flex w-full justify-center">
              <Button
                isDisabled={list.isLoading}
                variant="flat"
                onPress={list.loadMore}
              >
                {list.isLoading && <Spinner color="white" size="sm" />}
                Load More
              </Button>
            </div>
          ) : null
        }
        classNames={{
          base: "overflow-scroll",
          table: "min-h-[420px]",
        }}
      >
        <TableHeader>
          <TableColumn key="title">Excercise</TableColumn>
          <TableColumn key="sets">Sets</TableColumn>
          <TableColumn key="reps">Reps</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            console.log("item: ", item),
            (
              <TableRow key={Math.floor(Math.random() * 300)}>
                {(columnKey) => (
                  console.log("columnKey: ", columnKey),
                  (<TableCell>{getKeyValue(item, columnKey)}</TableCell>)
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <p className="font-bold">Day Three:</p>
      <Table
        isHeaderSticky
        aria-label="Workout schedule"
        bottomContent={
          hasMore && !isLoading ? (
            <div className="flex w-full justify-center">
              <Button
                isDisabled={list.isLoading}
                variant="flat"
                onPress={list.loadMore}
              >
                {list.isLoading && <Spinner color="white" size="sm" />}
                Load More
              </Button>
            </div>
          ) : null
        }
        classNames={{
          base: "overflow-scroll",
          table: "min-h-[420px]",
        }}
      >
        <TableHeader>
          <TableColumn key="title">Excercise</TableColumn>
          <TableColumn key="sets">Sets</TableColumn>
          <TableColumn key="reps">Reps</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            console.log("item: ", item),
            (
              <TableRow key={Math.floor(Math.random() * 300)}>
                {(columnKey) => (
                  console.log("columnKey: ", columnKey),
                  (<TableCell>{getKeyValue(item, columnKey)}</TableCell>)
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </DrawerBody>
  );
}

export default WorkoutRoutine;
