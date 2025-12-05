"use client";

import { intoChartConfigs } from "../config/dashboards";
import {
  deleteDashboard,
  getDashboard,
  listDashboards,
  renameDashboard,
} from "../services/dashboard";

export function createLeftDrawerHandlers(ctx) {
  const {
    setSelectedSection,
    setShowPlaceHolderChart,
    setUnsavedCustomCharts,
    setLoading,
    setOpen,
    setChartConfigs,
  } = ctx;

  return async function handleLeftDrawerClick(item) {
    if (item.text === "Home") {
      setLoading(true);
      window.location.href = "/";
      return;
    }

    if (item.text === "Sign out") {
      window.location.href = "/api/whoop/logout";
      return;
    }

    const dashboard = await getDashboard("default.yaml", item.id);
    const chartConfigs = intoChartConfigs(dashboard);

    setChartConfigs(chartConfigs.charts);
    setSelectedSection([item.text]);
    setShowPlaceHolderChart(false);
    setUnsavedCustomCharts([]);
    setOpen(false);
  };
}

export function createRightDrawerHandlers(ctx) {
  const {
    setSelectedSection,
    setSelectedCustomDashboard,
    setCustomDashboards,
    setShowPlaceHolderChart,
    setChartConfigs,
    setLoading,
    setOpen,
    setError,
  } = ctx;

  const click = async function handleRightDrawerClick(item) {
    setShowPlaceHolderChart(false);
    setLoading(true);

    const dashboard = await getDashboard("custom.yaml", item.id);
    const chartConfigs = intoChartConfigs(dashboard);

    setSelectedCustomDashboard(item.id);
    setChartConfigs(chartConfigs.charts);
    setSelectedSection(chartConfigs.sections);
    setLoading(false);
    setOpen(false);
  };

  const rename = async function handleRightDrawerRename(item, newName) {
    try {
      setLoading(true);
      await renameDashboard("custom.yaml", item.id, newName);
      setCustomDashboards(await listDashboards("custom.yaml"));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const del = async function handleRightDrawerDelete(item) {
    try {
      setLoading(true);
      await deleteDashboard("custom.yaml", item.id);
      setCustomDashboards(await listDashboards("custom.yaml"));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { click, rename, del };
}
