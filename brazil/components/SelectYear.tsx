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

interface SelectYearProps {
  handleYearSelect: (selectedYear: string) => void;
}

export function SelectYear({ handleYearSelect }: SelectYearProps) {
  return (
    <Select onValueChange={(choice) => handleYearSelect(choice)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose a year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          <SelectItem value="2010">2010</SelectItem>
          <SelectItem value="2011">2011</SelectItem>
          <SelectItem value="2012">2012</SelectItem>
          <SelectItem value="2013">2013</SelectItem>
          <SelectItem value="2014">2014</SelectItem>
          <SelectItem value="2015">2015</SelectItem>
          <SelectItem value="2016">2016</SelectItem>
          <SelectItem value="2017">2017</SelectItem>
          <SelectItem value="2018">2018</SelectItem>
          <SelectItem value="2019">2019</SelectItem>
          <SelectItem value="2020">2020</SelectItem>
          <SelectItem value="2021">2021</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
