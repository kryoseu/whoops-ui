import BaseLineChart from "./base-line";
import NoData from "../no-data";

export default function SingleLineChart({ data, chartSettings }) {
  if (!data?.length) return <NoData />;

  const keys = Object.keys(data[0]).filter((k) => k !== "x");
  if (keys.length !== 1) {
    return <NoData message="Invalid chart config. Expected a single data series." />;
  }

  return (
    <BaseLineChart
      data={data}
      series={[
        { key: keys[0], axisId: "left" },
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
      ]}
    />
  );
}
