"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import { useContext, useMemo } from "react";
import NoData from "../no-data";
import { getRandomColor } from "@/utils/colors";
import { ChartSettingsContext } from "@/utils/contexts/chart-settings";

export default function SingleLineChart({ data, chartSettings }) {
  const { tickDensity, showMark } = useContext(ChartSettingsContext);
  const xDataColor = useMemo(() => getRandomColor(), []);

  if (!data || data.length === 0) {
    return <NoData />;
  }

  const key = Object.keys(data[0]).filter((k) => k !== "x");

  if (key.length > 1) {
    return (
      <NoData message="Invalid chart config. Expected a single data series." />
    );
  }

  const xLabels = data.map((d) => new Date(d.x));
  const xData = data.map((d) => d[key]);

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
    width: chartSettings?.leftYAxisDisabled ? 30 : 55,
    tickLabelStyle: chartSettings?.leftYAxisDisabled
      ? { display: "none" }
      : { fill: xDataColor },
    disableTicks: chartSettings?.leftYAxisDisabled || false,
  };

  return (
    <LineChart
      xAxis={[
        {
          scaleType: "point",
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
      series={[
        {
          data: xData,
          label: key,
          yAxisId: "leftAxisId",
          color: xDataColor,
          showMark,
        },
      ]}
      yAxis={[
        {
          id: "leftAxisId",
          position: "left",
          tickLabelStyle: { fill: xDataColor },
          valueFormatter: (value) =>
            `${(value ?? 0).toFixed(0)}${chartSettings?.leftYAxisUnit || ""}`,
          ...leftYAxisConfig,
        },
        {
          position: "right",
          width: 30,
          tickLabelStyle: { display: "none" },
        },
      ]}
      grid={{ vertical: true, horizontal: true }}
      height={200}
      margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
    />
  );
}
