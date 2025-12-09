"use client";

import BiaxialLineChart from "./charts/biaxial-line";
import CustomPieChart from "./charts/pie";
import SingleLineChart from "./charts/single-line";
import StackedBarChart from "./charts/stacked-bar";
import NoData from "./no-data";

export default function MetricChart({ data, chartConfig, chartSeries }) {
  const { metrics, type, settings } = chartConfig;
  let series = [];

  const ChartComponent =
    type === "single"
      ? SingleLineChart
      : type === "biaxial"
        ? BiaxialLineChart
        : type === "stacked_bar"
          ? StackedBarChart
          : type === "pie"
            ? CustomPieChart
            : NoData;

  if (chartSeries) {
    return <ChartComponent data={chartSeries} chartSettings={settings} />;
  }

  const records = data?.records ? [...data.records].reverse() : [];

  series = records
    ? records.map((record) => {
        const result = { x: record.created_at };

        metrics.forEach((metric) => {
          const extracted = metric?.extractor(record);
          result[metric?.key] = metric?.valuesTransform
            ? metric.valuesTransform(extracted)
            : extracted;
        });

        return result;
      })
    : [];

  return <ChartComponent data={series} chartSettings={settings} />;
}
