import React, { useEffect, useState } from "react";
import {
  Input,
  Checkbox,
  CheckboxGroup,
  ScrollShadow,
  Chip,
  cn,
} from "@nextui-org/react";
import { useInView } from "react-intersection-observer";
import movementsData from "../../../../api/movements/movements.json";
import { SearchIcon } from "../../../../assets/SearchIcon";

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
          <div className="w-full flex justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold">{movement.name}</h3>
              <Chip color="primary" variant="light">
                Equipment: {movement.equipment || "N/A"}
              </Chip>
              <Chip color="secondary" variant="light">
                Level: {movement.level || "N/A"}
              </Chip>
            </div>
            <div className="flex flex-col items-end gap-1">
              {movement.primaryMuscles && (
                <Chip color="warning" size="md" variant="flat">
                  {movement.primaryMuscles}
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
  let filteredItems = movementsData.movements;

  useEffect(() => {
    setMovementsChecked(groupSelected);
  }, [groupSelected]);

  filteredItems = movementsData.movements.filter((item) =>
    !!searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : movementsData.movements
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
