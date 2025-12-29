"use client";

import MetricChart from "@/components/metric-chart";

export function buildCharts(dataMap, chartConfigs) {
  const metricCharts = [];

  chartConfigs.forEach((config) => {
    const series = {};
    const dayCounts = {};

    Object.keys(config.metrics).forEach((section) => {
      const data = dataMap[section];

      if (!data) return;

      const metrics = config.metrics[section];

      data.records.forEach((record) => {
        if (!config.settings.includeNaps && record.nap === true) return;

        let day = record.created_at.split("T")[0];

        if (!dayCounts[day]) {
          dayCounts[day] = { nap: 0, main: 0 };
        }

        const type = record.nap ? "nap" : "main";
        const index = dayCounts[day][type]++;

        const key =
          config.settings.includeNaps && record.nap
            ? `${day}:${type}:${index}`
            : day;

        if (!series[key]) {
          series[key] = { x: record.created_at };
        }

        metrics.forEach((metric) => {
          const extracted = metric.extractor(record);
          series[key][metric.key] = metric.valuesTransform
            ? metric.valuesTransform(extracted)
            : extracted;
        });
      });
    });

    const sortedSeries = Object.values(series).sort(
      (a, b) => new Date(a.x) - new Date(b.x)
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

