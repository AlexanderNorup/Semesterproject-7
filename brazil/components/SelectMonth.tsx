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

interface SelectMonthProps {
  handlerMonthSelect: (selectedMonth: string) => void;
}

export function SelectMonth({ handlerMonthSelect }: SelectMonthProps) {
  return (
    <Select onValueChange={(choice) => handlerMonthSelect(choice)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose a month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Month</SelectLabel>
          <SelectItem value="01">January</SelectItem>
          <SelectItem value="02">February</SelectItem>
          <SelectItem value="03">March</SelectItem>
          <SelectItem value="04">April</SelectItem>
          <SelectItem value="05">May</SelectItem>
          <SelectItem value="06">June</SelectItem>
          <SelectItem value="07">July</SelectItem>
          <SelectItem value="08">August</SelectItem>
          <SelectItem value="09">September</SelectItem>
          <SelectItem value="10">October</SelectItem>
          <SelectItem value="11">November</SelectItem>
          <SelectItem value="12">December</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
