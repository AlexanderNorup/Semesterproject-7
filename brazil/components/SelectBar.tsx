import React from "react";
import { SelectMonth } from "./SelectMonth";
import { SelectYear } from "./SelectYear";
import { Button } from "./ui/button";
import SelectState from "./SelectState";

const SelectBar = () => {
  return (
    <div className="grid grid-flow-col gap-2 items-center justify-center w-full mx-3">
      <h2 className="text-white text-lg">From</h2>
      <SelectMonth />
      <SelectYear />
      <h2 className="text-white text-lg ">To</h2>
      <SelectMonth />
      <SelectYear />
      <Button className="bg-sky-400 text-black text-md hover:bg-sky-600">
        Search
      </Button>
    </div>
  );
};

export default SelectBar;
