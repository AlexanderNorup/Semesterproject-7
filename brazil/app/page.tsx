"use client";
import ChartDemo from "@/components/ChartDemo";
import { DataTableDemo } from "@/components/DataTableDemo";
import Field from "@/components/Field";
import { Filter } from "@/components/Filter";
import MyChart from "@/components/MyChart";
import Offer from "@/components/Offer";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedID, setSelectedID] = useState<string>("");

  useEffect(() => {
    console.log(selectedID);
  }, [selectedID]);

  const data = JSON.parse(
    '[{"Year":"2010","Month":"03","AvgPrecipitation":0.19698725376593273,"AvgHumidity":86.79374275782155,"MaxTemperature":33.2,"MinTemperature":22.6,"AvgTemperature":26.170451911935086,"AvgAirPressure":984.9557453416156,"MinAirPressure":978.9,"MaxAirPressure":989.9,"MedianWindDirection":182,"AvgSolarRadiation":1402.6709956709956,"AvgWindGust":3.0568445475638057,"AvgWindSpeed":1.1101969872537656,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"AC"},{"Year":"2010","Month":"02","AvgPrecipitation":0.36237077877325957,"AvgHumidity":87.63197794624396,"MaxTemperature":33.1,"MinTemperature":21.6,"AvgTemperature":25.857270847691257,"AvgAirPressure":985.756205357143,"MinAirPressure":978.7,"MaxAirPressure":994,"MedianWindDirection":162.5,"AvgSolarRadiation":1176.9136253041363,"AvgWindGust":3.04788341429563,"AvgWindSpeed":1.102620689655172,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"AC"},{"Year":"2010","Month":"03","AvgPrecipitation":0.18344501379582182,"AvgHumidity":82.19865983445014,"MaxTemperature":35.2,"MinTemperature":22.3,"AvgTemperature":27.77114702404417,"AvgAirPressure":1003.3074497437912,"MinAirPressure":984.3,"MaxAirPressure":1035.1,"MedianWindDirection":135,"AvgSolarRadiation":1537.0908424908425,"AvgWindGust":3.159006700827751,"AvgWindSpeed":0.9951517540402045,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"AM"},{"Year":"2010","Month":"02","AvgPrecipitation":0.2718216840946614,"AvgHumidity":83.4075399009356,"MaxTemperature":35.4,"MinTemperature":21.6,"AvgTemperature":27.27575674188217,"AvgAirPressure":1003.305077050082,"MinAirPressure":980.9,"MaxAirPressure":1038,"MedianWindDirection":121,"AvgSolarRadiation":1285.4708994708994,"AvgWindGust":3.361525750481961,"AvgWindSpeed":1.0642267473857976,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"AM"},{"Year":"2010","Month":"02","AvgPrecipitation":0.9618461538461539,"AvgHumidity":89.4676923076923,"MaxTemperature":32.4,"MinTemperature":20.3,"AvgTemperature":25.788307692307693,"AvgAirPressure":1009.3263076923079,"MinAirPressure":1006,"MaxAirPressure":1013.3,"MedianWindDirection":69,"AvgSolarRadiation":1048.867403314917,"AvgWindGust":3.6119999999999988,"AvgWindSpeed":1.1418461538461542,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"AP"},{"Year":"2010","Month":"03","AvgPrecipitation":0.5504587155963304,"AvgHumidity":89.1651376146789,"MaxTemperature":31.9,"MinTemperature":22.4,"AvgTemperature":25.863302752293578,"AvgAirPressure":1009.6061926605506,"MinAirPressure":1007,"MaxAirPressure":1012.6,"MedianWindDirection":76,"AvgSolarRadiation":1183.5299145299145,"AvgWindGust":3.5683486238532103,"AvgWindSpeed":1.1100917431192665,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"AP"},{"Year":"2010","Month":"03","AvgPrecipitation":0.13928278127566363,"AvgHumidity":79.41132801759692,"MaxTemperature":35.4,"MinTemperature":21,"AvgTemperature":27.57530796605529,"AvgAirPressure":994.6298111141522,"MinAirPressure":928.4,"MaxAirPressure":1012.2,"MedianWindDirection":75,"AvgSolarRadiation":1555.6386934673367,"AvgWindGust":4.169608111811452,"AvgWindSpeed":1.4718784227820367,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"PA"},{"Year":"2010","Month":"02","AvgPrecipitation":0.283985353632685,"AvgHumidity":81.11087461300309,"MaxTemperature":34.6,"MinTemperature":20.4,"AvgTemperature":27.096222778955525,"AvgAirPressure":994.4482741997684,"MinAirPressure":927.5,"MaxAirPressure":1012.1,"MedianWindDirection":79,"AvgSolarRadiation":1417.6771467207573,"AvgWindGust":4.568505303760844,"AvgWindSpeed":1.6159953748313778,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"PA"},{"Year":"2010","Month":"03","AvgPrecipitation":0.491470588235294,"AvgHumidity":83.04705882352941,"MaxTemperature":33.8,"MinTemperature":21.5,"AvgTemperature":26.748088235294112,"AvgAirPressure":985.3538970588229,"MinAirPressure":940.3,"MaxAirPressure":1003.1,"MedianWindDirection":179,"AvgSolarRadiation":1355.922305764411,"AvgWindGust":4.235022026431718,"AvgWindSpeed":1.2699134199134203,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"RO"},{"Year":"2010","Month":"02","AvgPrecipitation":0.4694444444444443,"AvgHumidity":83.87286324786325,"MaxTemperature":33.9,"MinTemperature":21.1,"AvgTemperature":26.28173076923076,"AvgAirPressure":988.6604166666668,"MinAirPressure":942,"MaxAirPressure":1005.1,"MedianWindDirection":122,"AvgSolarRadiation":1205.6961805555557,"AvgWindGust":4.956643356643356,"AvgWindSpeed":1.412807881773399,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"RO"},{"Year":"2010","Month":"03","AvgPrecipitation":0.24205052005943525,"AvgHumidity":80.8781575037147,"MaxTemperature":34.7,"MinTemperature":22.1,"AvgTemperature":26.651931649331374,"AvgAirPressure":981.9186383928572,"MinAirPressure":973.7,"MaxAirPressure":993.2,"MedianWindDirection":183.5,"AvgSolarRadiation":1501.1814516129032,"AvgWindGust":3.44865871833085,"AvgWindSpeed":1.1641901931649339,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"TO"},{"Year":"2010","Month":"02","AvgPrecipitation":0.22160520607375267,"AvgHumidity":78.75444685466377,"MaxTemperature":35.4,"MinTemperature":20.1,"AvgTemperature":26.42455531453362,"AvgAirPressure":978.2551215277776,"MinAirPressure":926.7,"MaxAirPressure":992.8,"MedianWindDirection":172,"AvgSolarRadiation":1534.490450725745,"AvgWindGust":3.797957409821812,"AvgWindSpeed":1.2941431670282,"FromDate":"2010-02-15T05:00:00Z","ToDate":"2010-03-10T02:00:00Z","State":"TO"}]'
  );

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
          <Filter setId={setSelectedID} />
          <ChartDemo data={data} />
        </div>
      </div>
    </div>
  );
}
