"use client";

import BiaxialLineChart from "./charts/biaxial-line";
import CustomPieChart from "./charts/pie";
import SingleLineChart from "./charts/single-line";
import StackedBarChart from "./charts/stacked-bar";
import NoData from "./no-data";

export default function MetricChart({ series, chartConfig }) {

  const ChartComponent =
    chartConfig.type === "single"
      ? SingleLineChart
      : chartConfig.type === "biaxial"
        ? BiaxialLineChart
        : chartConfig.type === "stacked_bar"
          ? StackedBarChart
          : chartConfig.type === "pie"
            ? CustomPieChart
            : NoData;

  return <ChartComponent data={series} chartSettings={chartConfig.settings} />;
}
