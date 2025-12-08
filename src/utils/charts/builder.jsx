"use client";

import MetricChart from "@/components/metric-chart";

export function buildCharts(dataMap, chartConfigs) {
  const metricCharts = [];

  const normalize = (dateStr) => {
    const d = new Date(dateStr);
    const localDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return localDate.toISOString();
  };

  chartConfigs.forEach((config) => {
    const rowMap = {};
    Object.keys(config.metrics).forEach((section) => {
      const data = dataMap[section];
      if (!data) return;

      const metricArray = config.metrics[section];

      metricArray.forEach((metric) => {
        data.records.forEach((record) => {
          const dateKey = normalize(record.created_at);

          if (!rowMap[dateKey]) {
            rowMap[dateKey] = { x: dateKey };
          }

          const extracted = metric.extractor(record);

          rowMap[dateKey][metric.key] = extracted;

          rowMap[dateKey][metric.key] = metric.valuesTransform
            ? metric.valuesTransform(extracted)
            : extracted;
        });
      });
    });

    const sortedArray = Object.values(rowMap).sort(
      (a, b) => new Date(a.x) - new Date(b.x),
    );

    metricCharts.push(
      <MetricChart
        key={config.id}
        chartSeries={sortedArray}
        chartConfig={{
          type: config.type,
          metrics: Object.values(config.metrics).flat(),
          settings: config.settings,
        }}
      />,
    );
  });

  return metricCharts;
}
