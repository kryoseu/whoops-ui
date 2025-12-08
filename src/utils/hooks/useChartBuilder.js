"use client";

import React, { useEffect } from "react";
import { fetchAPIs } from "../services/fetch-apis.js";
import { MenuSettingsContext } from "../contexts/menu-settings.jsx";
import { DashboardSettingsContext } from "../contexts/dashboard-settings.jsx";
import { buildCharts } from "../charts/builder.jsx";
import { getDashboard } from "../services/dashboard.js";
import { intoChartConfigs } from "../config/dashboards.js";

export function useChartBuilder() {
  const { selectedSection, range } = React.useContext(MenuSettingsContext);

  const dashboardCtx = React.useContext(DashboardSettingsContext);

  // render Cycles dashboard on mount
  useEffect(() => {
    const initDashboard = async () => {
      const dashboard = await getDashboard("default.yaml", "001");
      const chartConfigs = intoChartConfigs(dashboard);
      dashboardCtx.setChartConfigs(chartConfigs.charts);
    };
    initDashboard();
  }, []);

  useEffect(() => {
    if (!selectedSection) return;

    const fetchDataAndBuildCharts = async () => {
      dashboardCtx.setLoading(true);

      try {
        const dataMap = await fetchAPIs(selectedSection, range);

        const nextCharts = buildCharts(dataMap, dashboardCtx.chartConfigs);

        dashboardCtx.setCharts(nextCharts);
      } catch (err) {
        if (err?.status === 401) {
          window.location.href = "/api/whoop/login";
        }
        dashboardCtx.setError(err);
      } finally {
        dashboardCtx.setLoading(false);
      }
    };

    fetchDataAndBuildCharts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSection, dashboardCtx.chartConfigs, range]);
}
