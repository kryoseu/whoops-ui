"use client";

import MetricChart from "@/components/metric-chart";

export function buildCharts(dataMap, chartConfigs) {
  const metricCharts = [];

  chartConfigs.forEach((config) => {
    const series = {};

    Object.keys(config.metrics).forEach((section) => {
      const data = dataMap[section];

      if (!data) return;

      const metrics = config.metrics[section];

      metrics.forEach((metric) => {
        data.records.forEach((record) => {
          const k = record.created_at.split("T")[0];

          if (!series[k]) {
            series[k] = { x: record.created_at };
          }

          const extracted = metric.extractor(record);

          series[k][metric.key] = metric.valuesTransform
            ? metric.valuesTransform(extracted)
            : extracted;
        });
      });
    });

    const sortedSeries = Object.values(series).sort(
      (a, b) => new Date(a.x) - new Date(b.x),
    );

    metricCharts.push(
      <MetricChart
        series={sortedSeries}
        chartConfig={config}
      />,
    );
  });

  return metricCharts;
}

