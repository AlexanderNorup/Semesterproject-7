import React from "react";
import { SelectMonth } from "./SelectMonth";
import { SelectYear } from "./SelectYear";

const SelectBar = () => {
  return (
    <div className="grid grid-flow-col gap-2 items-center justify-center w-full">
      <h2 className="text-white text-lg">From</h2>
      <SelectMonth />
      <SelectYear />
      <h2 className="text-white text-lg">To</h2>
      <SelectMonth />
      <SelectYear />
    </div>
  );
};

export default SelectBar;
