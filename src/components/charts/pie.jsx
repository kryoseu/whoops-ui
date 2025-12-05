"use client";

import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import NoData from "../no-data";

const getArcLabel = (value, total) => {
  const percent = value / total;
  return `${(percent * 100).toFixed(0)}%`;
};

const getSeries = (data, keys, settings) => {
  if (settings?.aggregation === "count") {
    if (keys.length !== 1) {
      return [];
    }

    const counts = {};

    for (const row of data) {
      const key = row[keys[0]];
      counts[key] = (counts[key] || 0) + 1;
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return Object.entries(counts).map(([label, count]) => ({
      label,
      value: count,
      arcLabel: getArcLabel(count, total),
    }));
  }

  // Sum aggregation (default)
  const sums = keys.map((k) => data.reduce((sum, row) => sum + row[k], 0));

  const total = sums.reduce((a, b) => a + b, 0);

  return keys.map((key, i) => ({
    label: key,
    value: sums[i],
    arcLabel: getArcLabel(sums[i], total),
  }));
};

export default function CustomPieChart({ data, chartSettings }) {
  if (!data || data.length === 0) {
    return <NoData />;
  }

  const keys = Object.keys(data[0]).filter((k) => k !== "x");
  const series = getSeries(data, keys, chartSettings);

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.arcLabel}`,
          arcLabelMinAngle: 35,
          arcLabelRadius: "60%",
          data: series,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
        },
      }}
      height={200}
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
