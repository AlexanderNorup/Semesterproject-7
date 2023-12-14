import React from "react";
import { FilterBar } from "./FilterBar";

interface FilterProps {
  setId: (id: string) => void;
  setState: (id: string) => void;
  setSH2: (id: string) => void;
}

export function Filter({ setState, setId, setSH2 }: FilterProps) {
  return (
    <div>
      <FilterBar setState={setState} setId={setId} setSH2={setSH2} />
    </div>
  );
}
