"use client";

import { createContext, useState } from "react";

export const ChartSettingsContext = createContext(null);

export function ChartSettingsProvider({ children }) {
  const [tickDensity, setTickDensity] = useState("normal");
  const [showMark, setShowMark] = useState(false);
  const [chartGridSize, setChartGridSize] = useState(5);

  return (
    <ChartSettingsContext.Provider
      value={{
        tickDensity,
        setTickDensity,
        showMark,
        setShowMark,
        chartGridSize,
        setChartGridSize,
      }}
    >
      {children}
    </ChartSettingsContext.Provider>
  );
}
