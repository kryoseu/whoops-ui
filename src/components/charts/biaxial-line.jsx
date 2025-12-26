import BaseLineChart from "./base-line";
import NoData from "../no-data";

export default function BiaxialLineChart({ data, chartSettings }) {
  if (!data?.length) return <NoData />;

  const keys = Object.keys(data[data.length - 1]).filter((k) => k !== "x");
  if (keys.length !== 2) {
    return <NoData message="Invalid chart config. Expected two data series." />;
  }

  console.log(data);

  const [leftKey, rightKey] = keys;

  return (
    <BaseLineChart
      data={data}
      chartSettings={chartSettings}
      series={[
        { key: leftKey, axisId: "left" },
        { key: rightKey, axisId: "right" },
      ]}
      axes={[
        {
          id: "left",
          position: "left",
          unit: chartSettings?.leftYAxisUnit,
          disabled: chartSettings?.leftYAxisDisabled,
          min: chartSettings?.leftYAxisMin,
          max: chartSettings?.leftYAxisMax,
        },
        {
          id: "right",
          position: "right",
          unit: chartSettings?.rightYAxisUnit,
          disabled: chartSettings?.rightYAxisDisabled,
          min: chartSettings?.rightYAxisMin,
          max: chartSettings?.rightYAxisMax,
        },
      ]}
    />
  );
}
