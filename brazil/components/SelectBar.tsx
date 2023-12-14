"use client";

import React, { useState } from "react";
import { SelectMonth } from "./SelectMonth";
import { SelectYear } from "./SelectYear";
import { Button } from "./ui/button";

const SelectBar = () => {
  const [fromYear, setFromYear] = useState("2010");
  const [toYear, setToYear] = useState("2010");
  const [fromMonth, setFromMonth] = useState("01");
  const [toMonth, setToMonth] = useState("01");
  const [sentRequest, setSentRequest] = useState(false);

  const handleNewJob = async () => {
    const response = await fetch("/job", {
      method: "POST",
      body: JSON.stringify({
        from: fromYear + "-" + fromMonth + "-" + "01T00:00:00Z",
        to: toYear + "-" + toMonth + "-" + "01T00:00:00Z",
      }),
    });
    const status = await response.json();
    if (status.status == "success") {
      setSentRequest(true);
    } else {
      alert("It did not work :(");
    }
    console.log(status);
  };

  return (
    <div>
      {sentRequest ? (
        <p className="text-center text-white">Request has been sent!</p>
      ) : (
        <div className="grid grid-flow-col gap-2 items-center justify-center w-full mx-3">
          <h2 className="text-white text-lg">From</h2>
          <SelectMonth handlerMonthSelect={setFromMonth} />
          <SelectYear handleYearSelect={setFromYear} />
          <h2 className="text-white text-lg ">To</h2>
          <SelectMonth handlerMonthSelect={setToMonth} />
          <SelectYear handleYearSelect={setToYear} />
          <Button
            onClick={handleNewJob}
            className="bg-sky-400 text-black text-md hover:bg-sky-600"
          >
            Create Job
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectBar;
