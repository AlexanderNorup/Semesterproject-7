"use client";
import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export function ChartDemo(props: any) {
  const data = props.data;
  let stateToShow = props.state;

  if (stateToShow == undefined) {
    stateToShow = data[0].State;
  }

  const sortedData = data
    .sort((a: any, b: any) => {
      let year_a = Number.parseInt(a.Year);
      let year_b = Number.parseInt(b.Year);
      let month_a = Number.parseInt(a.Month);
      let month_b = Number.parseInt(b.Month);

      if (year_a == year_b) {
        return month_a - month_b;
      }
      return year_a - year_b;
    })
    .filter((x: any) => x.State == stateToShow);

  // Gets labels from JSON, removes duplicates and sorts in order.
  const labels = Array.from(
    new Set<string>(sortedData.map((x: any) => x.Year + "-" + x.Month))
  );

  const colors = [
    "rgb(255, 99, 132)",
    "rgb(255,255,191)",
    "rgb(253,174,97)",
    "rgb(215,25,28)",
    "rgb(26,150,65)",
    "rgb()",
    "rgb()",
    "orange",
    "pink",
    "cyan",
    "skyblue",
    "yellow",
  ];
  let requestedDatasets = [
    "AvgTemperature",
    "MinTemperature",
    "MaxTemperature",
  ];

  let datasets = [];

  let i = 0;
  for (let requested of requestedDatasets) {
    datasets.push({
      type: "line" as const,
      label: requested + " -> right axis",
      borderColor: colors[i++ % colors.length],
      borderWidth: 2,
      fill: false,
      data: sortedData.map((x: any) => x[requested]),
      yAxisID: "y1",
    });
  }

  const extraDatasets = [
    {
      type: "bar" as const,
      label: "Income -> left axis",
      backgroundColor: "rgb(75, 192, 192)",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "white",
      borderWidth: 2,
      yAxisID: "y",
    },
    {
      type: "bar" as const,
      label: "Product -> left axis",
      backgroundColor: "rgb(53, 162, 235)",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      yAxisID: "y",
    },
  ];

  datasets.push(...extraDatasets);

  const data2 = {
    labels,
    datasets: datasets,
  };

  return <Chart options={options} type="bar" data={data2} />;
}

export default ChartDemo;
