"use client";

import { createContext, useState } from "react";

export const DashboardSettingsContext = createContext(null);

export function DashboardSettingsProvider({ children }) {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState("Unknown");
  const [showPlaceHolderChart, setShowPlaceHolderChart] = useState(false);
  const [unsavedCustomCharts, setUnsavedCustomCharts] = useState([]);
  const [defaultDashboards, setDefaultDashboards] = useState({});
  const [customDashboards, setCustomDashboards] = useState({});
  const [chartConfigs, setChartConfigs] = useState([]);

  return (
    <DashboardSettingsContext.Provider
      value={{
        charts,
        setCharts,
        loading,
        setLoading,
        error,
        setError,
        dataSource,
        setDataSource,
        showPlaceHolderChart,
        setShowPlaceHolderChart,
        unsavedCustomCharts,
        setUnsavedCustomCharts,
        customDashboards,
        setCustomDashboards,
        defaultDashboards,
        setDefaultDashboards,
        chartConfigs,
        setChartConfigs,
      }}
    >
      {children}
    </DashboardSettingsContext.Provider>
  );
}
