"use client";

export default function NoData({ message }) {
  return (
    <div
      style={{
        textAlign: "center",
        alignContent: "center",
        padding: "20px",
        color: "#888",
        height: "225px",
      }}
    >
      {message || "No data available."}
    </div>
  );
}
