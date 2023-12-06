import { DataTableDemo } from "@/components/DataTableDemo";
import Field from "@/components/Field";
import Offer from "@/components/Offer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-primary pt-10">
      <div>
        <h1 className="text-sky-400 text-2xl text-center">Search</h1>
        <Field />
      </div>
      <div>
        <h1 className="text-sky-400 text-2xl text-center m-4">
          Brazil Weather data
        </h1>
        <div className="text-slate-500 m-4">
          <DataTableDemo />
        </div>
      </div>
    </div>
  );
}
