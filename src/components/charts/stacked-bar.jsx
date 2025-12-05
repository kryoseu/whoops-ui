"use client";

import { ChartSettingsContext } from "@/utils/contexts/chart-settings";
import { BarChart } from "@mui/x-charts";
import { useContext } from "react";
import NoData from "../no-data";

export default function StackedBarChart({ data, chartSettings }) {
  const { tickDensity } = useContext(ChartSettingsContext);

  if (!data || data.length === 0) {
    return <NoData />;
  }

  const keys = Object.keys(data[0]).filter((k) => k !== "x");

  let series = [];
  for (let i = 0; i < keys.length; i++) {
    series.push({
      data: data.map((d) => d[keys[i]]),
      label: keys[i],
      stack: "total",
    });
  }

  const xLabels = data.map((d) => new Date(d.x));

  const tickInterval =
    tickDensity === "dense"
      ? 1
      : tickDensity === "normal"
        ? 4
        : tickDensity === "sparse"
          ? 15
          : 30;

  const leftYAxisConfig = {
    min: chartSettings?.leftYAxisMin || 0,
    max: chartSettings?.leftYAxisMax || null,
    width: chartSettings?.leftYAxisDisabled ? 30 : 60,
    tickLabelStyle: chartSettings?.leftYAxisDisabled && { display: "none" },
    disableTicks: chartSettings?.leftYAxisDisabled || false,
  };

  const rightYAxisConfig = {
    min: chartSettings?.rightYAxisMin || 0,
    max: chartSettings?.rightYAxisMax || null,
    width: chartSettings?.rightYAxisDisabled ? 30 : 60,
    tickLabelStyle: chartSettings?.rightYAxisDisabled && { display: "none" },
    disableTicks: chartSettings?.rightYAxisDisabled || false,
  };

  return (
    <BarChart
      series={series}
      xAxis={[
        {
          data: xLabels,
          valueFormatter: (value) =>
            value.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
          tickInterval: (_, index) => {
            return (
              index === 0 ||
              index === xLabels.length - 1 ||
              index % tickInterval === 0
            );
          },
          tickLabelStyle: { textAnchor: "middle", fontSize: 8 },
        },
      ]}
      yAxis={[
        {
          id: "leftAxisId",
          position: "left",
          valueFormatter: (value) =>
            `${(value ?? 0).toFixed(0)}${chartSettings?.leftYAxisUnit || ""}`,
          ...leftYAxisConfig,
        },
        {
          id: "rightAxisId",
          position: "right",
          valueFormatter: (value) =>
            `${(value ?? 0).toFixed(0)}${chartSettings?.rightYAxisUnit || ""}`,
          ...rightYAxisConfig,
        },
      ]}
      grid={{ vertical: true, horizontal: true }}
      height={200}
      margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
      slotProps={slotProps}
    />
  );
}

const slotProps = {
  legend: {
    direction: "horizontal",
    position: {
      vertical: "middle",
    },
  },
};
