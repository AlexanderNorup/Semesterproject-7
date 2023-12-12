import ChartDemo from "@/components/ChartDemo";
import { DataTableDemo } from "@/components/DataTableDemo";
import Field from "@/components/Field";
import Filter from "@/components/Filter";
import MyChart from "@/components/MyChart";
import Offer from "@/components/Offer";

export default function Home() {
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
          <Filter />
          <ChartDemo />
        </div>
      </div>
    </div>
  );
}
