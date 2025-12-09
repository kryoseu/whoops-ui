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
    setCurrentDashboard,
    setShowPlaceHolderChart,
    setUnsavedCustomCharts,
    setLoading,
    setMode,
    setOpen,
  } = ctx;

  return async function handleLeftDrawerClick(item) {
    setMode("default");
    setShowPlaceHolderChart(false);
    setLoading(true);

    if (item.text === "Home") {
      window.location.href = "/";
      return;
    }

    if (item.text === "Sign out") {
      window.location.href = "/api/whoop/logout";
      return;
    }

    setCurrentDashboard(item.id);
    setUnsavedCustomCharts([]);
    setLoading(false);
    setOpen(false);
  };
}

export function createRightDrawerHandlers(ctx) {
  const {
    setMode,
    setCurrentDashboard,
    setCustomDashboards,
    setShowPlaceHolderChart,
    setLoading,
    setOpen,
    setError,
  } = ctx;

  const click = async function handleRightDrawerClick(item) {
    setMode("custom");
    setShowPlaceHolderChart(false);
    setLoading(true);
    setCurrentDashboard(item.id);
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
