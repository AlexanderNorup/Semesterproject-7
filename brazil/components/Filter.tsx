import React from "react";
import { FilterBar } from "./FilterBar";

interface FilterProps {
  setId: (id: string) => void;
}

export function Filter({ setId }: FilterProps) {
  return (
    <div>
      <FilterBar setId={setId} />
    </div>
  );
}
