"use client";
import ChartDemo from "@/components/ChartDemo";
import Field from "@/components/Field";
import { Filter } from "@/components/Filter";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedID, setSelectedID] = useState<string>("");
  const [data, setData] = useState<any>();
  const [mongoData, setMongoData] = useState<any>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [stateData, setStateData] = useState<string>("AC");
  const [sh2Data, setsh2Data] = useState<string>("-1");

  const fetchMongo = async () => {
    setShowSpinner(true);
    const params = new URLSearchParams();
    const fromDate = new Date(Number.parseInt(selectedID.split("-")[0]));
    const toDate = new Date(Number.parseInt(selectedID.split("-")[1]));
    params.set("fromYear", fromDate.getFullYear().toString());
    params.set("fromMonth", (fromDate.getMonth() + 1).toString());
    params.set("toYear", toDate.getFullYear().toString());
    params.set("toMonth", (toDate.getMonth() + 1).toString());
    params.set("state", stateData);
    params.set("sh2code", sh2Data);
    const response = await fetch("/mongodb?" + params.toString());

    const jsonResult = await response.json();
    setMongoData(jsonResult.data);
    setShowSpinner(false);
  };

  useEffect(() => {
    if (!selectedID) return;
    const fetchData = async () => {
      const response = await fetch("/processed/" + selectedID);

      const jsonResult = await response.json();
      setData(jsonResult.data);
    };

    fetchData();
    fetchMongo();
  }, [selectedID]);

  useEffect(() => {
    fetchMongo();
  }, [stateData]);

  useEffect(() => {
    fetchMongo();
  }, [sh2Data]);

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
          <Filter
            setState={setStateData}
            setId={setSelectedID}
            setSH2={setsh2Data}
          />
          {data && mongoData ? (
            <div>
              {showSpinner ? (
                <div className="flex justify-center items-center mb-4">
                  <div className="spinnerContainer">
                    <span className="loader"></span>
                    <p className="m-0">Loading exports</p>
                  </div>
                </div>
              ) : (
                <span className="d-none"></span>
              )}

              <ChartDemo
                selectId={selectedID}
                data={data}
                mongoData={mongoData}
                stateData={stateData}
              />
            </div>
          ) : (
            <div>
              {!selectedID ? (
                <div className="text-center">
                  <p>Please select a dataset to visualize above!</p>
                </div>
              ) : (
                <div className="flex justify-center items-center mb-4">
                  <div className="spinnerContainer">
                    <span className="loader"></span>
                    <p className="m-0">Loading data</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
