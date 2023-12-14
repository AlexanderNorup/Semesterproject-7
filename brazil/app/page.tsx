"use client";
import ChartDemo from "@/components/ChartDemo";
import Field from "@/components/Field";
import { Filter } from "@/components/Filter";
import ReduxProvider from "@/lib/reduxprovider";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedID, setSelectedID] = useState<string>("");
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!selectedID) return;
    const fetchData = async () => {
      const response = await fetch("/processed/" + selectedID);

      const jsonResult = await response.json();
      setData(jsonResult.data);
    };

    fetchData();
  }, [selectedID]);

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-primary pt-10">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="text-sky-400 text-2xl text-center ">Search</h1>
        <Field />
      </div>
      <div>
        <h1 className="text-sky-400 text-2xl text-center m-4">
          Brazil Weather data
        </h1>
        <div className="text-slate-200 m-4">
          {/* <DataTableDemo /> */}
          <ReduxProvider>
            <Filter setId={setSelectedID} />
            {data ? <ChartDemo data={data} /> : <p>Loading</p>}
          </ReduxProvider>
        </div>
      </div>
    </div>
  );
}
