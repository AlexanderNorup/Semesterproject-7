import React from "react";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import { MenubarDemo } from "./MenubarDemo";
import { InputWithButton } from "./InputWithButton";
import SelectBar from "./SelectBar";

const Field = () => {
  return (
    <div className="grid grid-flow-col auto-cols-max gap-2 items-center justify-center w-full">
      <SelectBar />
      {/* <DatePickerWithRange /> */}
      {/* <InputWithButton /> */}
    </div>
  );
};

export default Field;
