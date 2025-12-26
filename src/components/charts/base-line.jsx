"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import { useContext, useMemo } from "react";
import NoData from "../no-data";
import { ChartSettingsContext } from "@/utils/contexts/chart-settings";
import { getRandomColor } from "@/utils/colors";

export default function BaseLineChart({
  data,
  axes,   // [{ id, position, unit, disabled, min, max }]
  series  // [{ key, axisId }]
}) {
  const { tickDensity, showMark } = useContext(ChartSettingsContext);

  if (!data || data.length === 0) {
    return <NoData />;
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

  const colors = useMemo(
    () => series.map(() => getRandomColor()),
    [series.length]
  );

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
          tickInterval: (_, index) =>
            index === 0 ||
            index === xLabels.length - 1 ||
            index % tickInterval === 0,
          tickLabelStyle: { textAnchor: "middle", fontSize: 8 },
        },
      ]}
      series={series.map((s, i) => ({
        data: data.map((d) => d[s.key]),
        label: s.key,
        yAxisId: s.axisId,
        color: colors[i],
        showMark,
      }))}
      yAxis={axes.map((axis, i) => ({
        id: axis.id,
        position: axis.position,
        min: axis.min ?? 0,
        max: axis.max ?? null,
        width: axis.disabled ? 30 : 55,
        disableTicks: axis.disabled,
        tickLabelStyle: axis.disabled
          ? { display: "none" }
          : { fill: colors[i] },
        valueFormatter: (value) =>
          `${(value ?? 0).toFixed(0)}${axis.unit || ""}`,
      }))}
      grid={{ vertical: true, horizontal: true }}
      height={200}
      margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
    />
  );
}
