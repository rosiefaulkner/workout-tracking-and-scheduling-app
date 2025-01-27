import React, { useEffect, useState } from "react";
import {
  Input,
  Checkbox,
  CheckboxGroup,
  ScrollShadow,
  Chip,
  cn,
} from "@heroui/react";
import { useInView } from "react-intersection-observer";
import { SearchIcon } from "../../../../assets/SearchIcon";
import axiosInstance from "../../../../helpers/axiosInstance";

export const getMovements = async() => {
  try {
    const response = await axiosInstance.get("/account/get-movements");
    if (
      !response ||
      response?.status !== 200
    ) {
      console.error({ message: "Unable to fetch movements" });
    } else {
      return response?.data?.exercises;
    }
  } catch (error) {
    console.error({ message: "Failed to fetch movements", error });
  }
}

export const LazyCheckbox = ({ movement, value }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView && (
        <Checkbox
          aria-label={movement.name}
          classNames={{
            base: cn(
              "inline-flex max-w-full w-full bg-content1 m-0",
              "hover:bg-content2 items-center justify-start",
              "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            label: "w-full",
          }}
          value={value}
        >
          <div className="w-full flex justify-between gap-2 overflow-x-scroll">
            <div>
              <h3 className="text-lg font-semibold">{movement.name}</h3>
              <Chip color="primary" variant="light">
                Equipment: {movement.equipment || "N/A"}
              </Chip>
              <Chip color="danger" variant="light">
                Level: {movement.level || "N/A"}
              </Chip>
              <Chip color="success" variant="light">
                Category: {movement.category || "N/A"}
              </Chip>
              {movement.secondary_muscles?.length > 0 && <Chip color="secondary" variant="light">
                Muscles: {movement.primary_muscles + ", " + movement.secondary_muscles}
              </Chip>}
            </div>
            <div className="flex flex-col items-end gap-1">
              {movement.primary_muscles && (
                <Chip color="warning" size="md" variant="flat">
                  {movement.primary_muscles}
                </Chip>
              )}
            </div>
          </div>
        </Checkbox>
      )}
    </div>
  );
};

function MovementsCheckboxes({ setMovementsChecked = () => {} }) {
  const [groupSelected, setGroupSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allMovements, setAllMovements] = useState([]);

  useEffect(() => {
    setMovementsChecked(groupSelected);
  }, [groupSelected]);

  useEffect(() => {
    const getAllMovementsData = async () => {
      await getMovements().then((resp) => {
        setAllMovements(resp);
      })
    }
    getAllMovementsData();
  }, []);

  let filteredItems = allMovements;
  filteredItems = allMovements.filter((item) =>
    !!searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : allMovements
  );

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-9 mb-9 items-start">
        <Input
          classNames={{
            mainWrapper: "h-full pb-0",
            input:
              "pb-0 text-md border-transparent focus:border-transparent focus:ring-0",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          label="Search..."
          type="text"
          isClearable
          onClear={() => setSearchTerm(null)}
          onChange={(e) => setSearchTerm(e.target.value)}
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        <ScrollShadow
          orientation="vertical"
          className="w-full max-w-full h-[400px] overflow-y-auto shadow-md"
        >
          {filteredItems.length > 0 ? (
            <CheckboxGroup
              classNames={{
                base: "w-full mb-6",
                label: "text-lg",
              }}
              label="Select exercises"
              value={groupSelected}
              onChange={setGroupSelected}
            >
              {filteredItems.map((movement, index) => (
                <LazyCheckbox
                  key={index}
                  movement={movement}
                  value={movement.name}
                />
              ))}
            </CheckboxGroup>
          ) : (
            <h1>Nothing found for you, dawg</h1>
          )}
        </ScrollShadow>
      </div>
    </>
  );
}

export default MovementsCheckboxes;
