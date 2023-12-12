import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectDataSet = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue placeholder="Choose a dataset" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Datasets</SelectLabel>
          <SelectItem value="Dataset">Dataset</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDataSet;
