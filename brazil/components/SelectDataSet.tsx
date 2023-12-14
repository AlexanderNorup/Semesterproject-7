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
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue placeholder="Choose a dataset" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Datasets</SelectLabel>
          {ids.map((x: any) => (
            <SelectItem value={x} key={x}>
              {x}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
