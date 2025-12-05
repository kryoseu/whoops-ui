"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import { useContext, useMemo } from "react";
import NoData from "../no-data";
import { ChartSettingsContext } from "@/utils/contexts/chart-settings";
import { getRandomColor } from "@/utils/colors";

export default function BiaxialLineChart({ data, chartSettings }) {
  const { tickDensity, showMark } = useContext(ChartSettingsContext);
  const leftDataColor = useMemo(() => getRandomColor(), []);
  const rightDataColor = useMemo(() => getRandomColor(), []);

  if (!data || data.length === 0) {
    return <NoData />;
  }

  const keys = Object.keys(data[data.length - 1]).filter((k) => k !== "x");

  if (keys.length !== 2) {
    return <NoData message="Invalid chart config. Expected two data series." />;
  }

  const [leftKey, rightKey] = keys;
  const xLabels = data.map((d) => new Date(d.x));
  const leftData = data.map((d) => d[leftKey]);
  const rightData = data.map((d) => d[rightKey]);

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
      : { fill: leftDataColor },
    disableTicks: chartSettings?.leftYAxisDisabled || false,
  };

  const rightYAxisConfig = {
    min: chartSettings?.rightYAxisMin || 0,
    max: chartSettings?.rightYAxisMax || null,
    width: chartSettings?.rightYAxisDisabled ? 30 : 55,
    tickLabelStyle: chartSettings?.rightYAxisDisabled
      ? { display: "none" }
      : { fill: rightDataColor },
    disableTicks: chartSettings?.rightYAxisDisabled || false,
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
          data: leftData,
          label: leftKey,
          yAxisId: "leftAxisId",
          color: leftDataColor,
          showMark,
        },
        {
          data: rightData,
          label: rightKey,
          yAxisId: "rightAxisId",
          color: rightDataColor,
          showMark,
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
    />
  );
}
