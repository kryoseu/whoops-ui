"use client";

import React from "react";
import Cookies from "js-cookie";
import { useContext, useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { ChartSettingsProvider } from "@/utils/contexts/chart-settings";
import { DashboardSettingsContext } from "@/utils/contexts/dashboard-settings";
import ErrorAlert from "@/components/error-alert";
import ChartGrid from "@/components/chart-grid.jsx";
import ChartPlaceHolder from "@/components/chart-placeholder.jsx";
import ButtonWithLoad from "@/components/button-load.jsx";
import { listDashboards, saveDashboard } from "@/utils/services/dashboard.js";
import { useChartBuilder } from "@/utils/hooks/useChartBuilder.js";
import LeftDrawer from "@/components/drawers/left";
import RightDrawer from "@/components/drawers/right";
import DataSource from "@/components/data-source";

export default function Dashboard() {
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDiscard] = useState(false);

  useChartBuilder();

  const dashboardCtx = useContext(DashboardSettingsContext);

  useEffect(() => {
    const sessionDataSource = Cookies.get("data_source");
    if (sessionDataSource) {
      dashboardCtx.setDataSource(sessionDataSource);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load dashboards on mount
  useEffect(() => {
    const loadDashboards = async () => {
      try {
        dashboardCtx.setDefaultDashboards(await listDashboards("default.yaml"));
        dashboardCtx.setCustomDashboards(await listDashboards("custom.yaml"));
      } catch (err) {
        dashboardCtx.setError(err);
      }
    };
    loadDashboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveDashboard = async () => {
    if (dashboardCtx.unsavedCustomCharts.length === 0) return;

    try {
      const dashboard = {
        id: crypto.randomUUID(),
        name: "Untitled Dashboard",
        charts: [],
      };

      dashboard.charts = dashboardCtx.unsavedCustomCharts.map(
        ({ id, type, metrics, settings }) => ({
          id,
          type,
          metrics: Object.fromEntries(
            Object.entries(metrics).map(([section, metricArray]) => [
              section,
              metricArray.map((m) => ({ key: m.key })),
            ]),
          ),
          settings,
        }),
      );

      await saveDashboard("custom.yaml", dashboard);

      // reload custom dasboards
      dashboardCtx.setCustomDashboards(await listDashboards("custom.yaml"));
      dashboardCtx.setCurrentDashboard(dashboard.id);
      dashboardCtx.setUnsavedCustomCharts([]);
      dashboardCtx.setShowPlaceHolderChart(false);
    } catch (err) {
      dashboardCtx.setError(err);
    }
  };

  return (
    <Box>
      {dashboardCtx.error && (
        <ErrorAlert
          error={dashboardCtx.error}
          onClose={() => dashboardCtx.setError(null)}
        />
      )}
      <ChartSettingsProvider>
        <LeftDrawer />
        <RightDrawer />

        {dashboardCtx.loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <CircularProgress
              size={80}
              thickness={5}
              sx={{ color: deepPurple["A400"] }}
            />
          </Box>
        ) : (
          <React.Fragment>
            <ChartGrid
              charts={
                dashboardCtx.showPlaceHolderChart
                  ? [
                      ...dashboardCtx.charts,
                      <ChartPlaceHolder key="placeholder" />,
                    ]
                  : dashboardCtx.charts
              }
            />
            <DataSource />
            {dashboardCtx.unsavedCustomCharts.length > 0 && (
              <Box
                sx={{
                  position: "fixed",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 2,
                }}
              >
                <ButtonWithLoad
                  id="save"
                  label="Save"
                  onClick={async () => {
                    setLoadingSave(true);
                    await handleSaveDashboard();
                    setLoadingSave(false);
                  }}
                  loading={loadingSave}
                  disabled={loadingSave}
                  sxProps={{
                    position: "relative",
                    bgcolor: deepPurple["A400"],
                    color: "white",
                    border: "none",
                    borderRadius: 1,
                    px: 3,
                    py: 1,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: deepPurple["A700"],
                    },
                  }}
                />
                <ButtonWithLoad
                  id="discard"
                  label="Discard"
                  onClick={() => window.location.reload()}
                  loading={loadingDiscard}
                  disabled={loadingDiscard}
                  sxProps={{
                    position: "relative",
                    bgcolor: grey[700],
                    color: "white",
                    border: "none",
                    borderRadius: 1,
                    px: 3,
                    py: 1,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: grey[800],
                    },
                  }}
                />
              </Box>
            )}
          </React.Fragment>
        )}
      </ChartSettingsProvider>
    </Box>
  );
}
