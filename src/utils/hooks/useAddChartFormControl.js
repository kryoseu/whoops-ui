"use client";

import { useState, useMemo, useContext } from "react";
import { sections } from "../sections.js";
import { DashboardSettingsContext } from "../contexts/dashboard-settings";

export function useAddChartFormControl(onSave) {
  const [error, setError] = useState(null);
  const [userChartType, setUserChartType] = useState("single");
  const [pieChartAggType, setPieChartAggType] = useState("sum");
  const [checkedMetrics, setCheckedMetrics] = useState([]);
  const [disabledMetrics, setDisabledMetrics] = useState([]);

  const [settings, setSettings] = useState({
    includeNaps: false,

    leftYAxisMax: "",
    leftYAxisUnit: "",
    leftYAxisDisabled: false,

    rightYAxisMax: "",
    rightYAxisUnit: "",
    rightYAxisDisabled: false,
  });

  const { setUnsavedCustomCharts, setChartConfigs } = useContext(
    DashboardSettingsContext,
  );

  // Flatten all metrics for selection
  const allMetrics = useMemo(() => {
    return Object.entries(sections).flatMap(([section, values]) =>
      Object.values(values.metrics).map((metricConfig) => ({
        section,
        ...metricConfig,
      })),
    );
  }, []);

  const metricAPISet = useMemo(
    () => new Set(checkedMetrics.map((m) => m.section)),
    [checkedMetrics],
  );

  // Handle chart type selection
  const handleChartTypeChange = (e) => {
    setUserChartType(e.target.value);
    setCheckedMetrics([]);
    setDisabledMetrics([]);
  };

  // Handle metric selection
  const handleMetricsChange = (values) => {
    const napSelected = values.some(
      (metric) => metric.key === "nap"
    );

    setSettings((prev) => ({
      ...prev,
      includeNaps: napSelected,
    }));

    const limit =
      userChartType === "single"
        ? 1
        : userChartType === "biaxial"
          ? 2
          : values.length;

    const selected = values.slice(0, limit);

    let disabled = [];
    if (userChartType === "single" && selected.length === 1) {
      disabled = allMetrics
        .filter((m) => m.key !== selected[0].key)
        .map((m) => m.key);
    } else if (userChartType === "biaxial" && selected.length === 2) {
      disabled = allMetrics
        .filter((m) => !selected.some((s) => s.key === m.key))
        .map((m) => m.key);
    }

    setCheckedMetrics(selected);
    setDisabledMetrics(disabled);
  };

  // Settings handlers
  const handleSettingsChange = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  // Save handler
  const handleSave = () => {
    const validationError = formValidate(userChartType, checkedMetrics);
    if (validationError) {
      setError(new Error(validationError));
      return;
    }

    const metricMap = checkedMetrics.reduce((acc, metric) => {
      acc[metric.section] ||= [];
      acc[metric.section].push(metric);
      return acc;
    }, {});

    const chartConfig = buildChartConfig(
      userChartType,
      metricMap,
      settings,
      userChartType === "pie" ? pieChartAggType : null,
    );

    setUnsavedCustomCharts((prev) => {
      const updated = [...prev, chartConfig];
      setChartConfigs(updated);
      return updated;
    });

    onSave?.();
  };

  return {
    error,
    setError,
    userChartType,
    setUserChartType,
    pieChartAggType,
    setPieChartAggType,
    checkedMetrics,
    disabledMetrics,
    settings,

    allMetrics,
    metricAPISet,

    handleChartTypeChange,
    handleMetricsChange,
    handleSettingsChange,

    handleSave,
  };
}

// Validation helper
function formValidate(type, metrics) {
  if (metrics.length === 0) return "At least one metric must be selected.";
  if (type === "biaxial" && metrics.length !== 2)
    return "Exactly two metrics must be selected for biaxial charts.";
  return null;
}

// Build chart config helper
function buildChartConfig(type, metrics, settings, aggregation) {
  return {
    id: crypto.randomUUID(),
    type,
    metrics,
    settings: {
      ...Object.fromEntries(
        Object.entries(settings).filter(
          ([_, value]) => value !== "" && value !== false
        )
      ),
      ...(type === "pie" && aggregation && { aggregation }),
    },
  };
}
