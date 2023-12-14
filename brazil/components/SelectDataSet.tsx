"use client";
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

interface SelectDataSetProps {
  ids: string[];
  setId: (id: string) => void;
}

export function SelectDataSet({ ids, setId }: SelectDataSetProps) {
  return (
    <Select onValueChange={(choice) => setId(choice)}>
      <SelectTrigger className="w-[15rem] text-black">
        <SelectValue placeholder="Choose a dataset" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Datasets</SelectLabel>
          {ids.map((x: string) => (
            <SelectItem value={x} key={x}>
              {idToDate(x)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function idToDate(unix: string) {
  const [fromUnix, toUnix] = unix.split("-");
  const fromDate = new Date(Number.parseInt(fromUnix));
  const toDate = new Date(Number.parseInt(toUnix));

  return (
    fromDate.toISOString().split("T")[0] +
    " -> " +
    toDate.toISOString().split("T")[0]
  );
}
