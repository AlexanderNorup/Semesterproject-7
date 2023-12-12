import React from "react";
import SelectState from "./SelectState";
import SelectDataSet from "./SelectDataSet";
import { Button } from "./ui/button";

const FilterBar = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-7">
      <h2 className="text-2xl font-bold pb-4">Datasets</h2>
      <div className="flex flex-row items-center justify-center gap-3">
        <SelectDataSet />
        <SelectState />
        <Button className="bg-sky-400 text-black text-md hover:bg-sky-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </Button>
        <Button className="bg-sky-400 text-black text-md hover:bg-sky-600">
          Show data
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
