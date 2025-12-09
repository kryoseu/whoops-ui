"use client";

import React from "react";
import { fetchAPIs } from "../services/fetch-apis.js";
import { MenuSettingsContext } from "../contexts/menu-settings.jsx";
import { DashboardSettingsContext } from "../contexts/dashboard-settings.jsx";
import { buildCharts } from "../charts/builder.jsx";
import { getDashboard } from "../services/dashboard.js";
import {
  getAPIsNeededForChartConfigs,
  intoChartConfigs,
} from "../config/dashboards.js";

export function useChartBuilder() {
  const menuCtx = React.useContext(MenuSettingsContext);
  const dashboardCtx = React.useContext(DashboardSettingsContext);

  const redirectIfUnauthorized = (err) => {
    if (err?.status === 401) {
      window.location.href = "/api/whoop/login";
    }
  };

  // Build charts when chartConfigs or range changes
  React.useEffect(() => {
    if (!dashboardCtx.chartConfigs.length) return;

    const renderCharts = async () => {
      dashboardCtx.setLoading(true);

      try {
        const apis = getAPIsNeededForChartConfigs(dashboardCtx.chartConfigs);
        const data = await fetchAPIs(apis, menuCtx.range);
        const charts = buildCharts(data, dashboardCtx.chartConfigs);

        dashboardCtx.setCharts(charts);
      } catch (err) {
        redirectIfUnauthorized(err);
        dashboardCtx.setError(err);
      } finally {
        dashboardCtx.setLoading(false);
      }
    };

    renderCharts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardCtx.chartConfigs, menuCtx.range]);

  // Process dashboards into chart configs when mode or currentDashboard changes
  React.useEffect(() => {
    const loadDashboardConfigs = async () => {
      dashboardCtx.setLoading(true);

      const config =
        dashboardCtx.mode === "default" ? "default.yaml" : "custom.yaml";

      try {
        const dashboard = await getDashboard(
          config,
          dashboardCtx.currentDashboard,
        );
        const chartConfigs = intoChartConfigs(dashboard).charts;

        dashboardCtx.setChartConfigs(chartConfigs);
      } catch (err) {
        redirectIfUnauthorized(err);
        dashboardCtx.setError(err);
      } finally {
        dashboardCtx.setLoading(false);
      }
    };

    loadDashboardConfigs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardCtx.mode, dashboardCtx.currentDashboard]);
}
