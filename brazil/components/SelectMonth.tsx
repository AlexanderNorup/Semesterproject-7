import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectMonth = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose a month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Month</SelectLabel>
          <SelectItem value="January">January</SelectItem>
          <SelectItem value="February">February</SelectItem>
          <SelectItem value="March">March</SelectItem>
          <SelectItem value="April">April</SelectItem>
          <SelectItem value="May">May</SelectItem>
          <SelectItem value="June">June</SelectItem>
          <SelectItem value="July">July</SelectItem>
          <SelectItem value="August">August</SelectItem>
          <SelectItem value="September">September</SelectItem>
          <SelectItem value="October">October</SelectItem>
          <SelectItem value="November">November</SelectItem>
          <SelectItem value="December">December</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMonth;
