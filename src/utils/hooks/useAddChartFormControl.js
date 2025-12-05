"use client";

import { useState, useMemo, useContext } from "react";
import { sections } from "../sections.js";
import { DashboardSettingsContext } from "../contexts/dashboard-settings";
import { MenuSettingsContext } from "../contexts/menu-settings";

export function useAddChartFormControl(onSave) {
  const [error, setError] = useState(null);
  const [userChartType, setUserChartType] = useState("single");
  const [pieChartAggType, setPieChartAggType] = useState("sum");
  const [checkedMetrics, setCheckedMetrics] = useState([]);
  const [disabledMetrics, setDisabledMetrics] = useState([]);
  const [yAxis, setYAxis] = useState({
    left: { max: "", unit: "", disabled: false },
    right: { max: "", unit: "", disabled: false },
  });

  const { setSelectedSection } = useContext(MenuSettingsContext);
  const { setUnsavedCustomCharts, setChartConfigs } = useContext(DashboardSettingsContext,);

  // Flatten all metrics for selection
  const allMetrics = useMemo(() => {
    return Object.entries(sections).flatMap(([section, values]) =>
      Object.values(values.metrics).map((metricConfig) => ({
        section,
        metricConfig,
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
    let selected = values;

    const limit =
      userChartType === "single"
        ? 1
        : userChartType === "biaxial"
          ? 2
          : values.length;

    selected = values.slice(0, limit);

    let disabled = [];
    if (userChartType === "single" && selected.length === 1) {
      disabled = allMetrics
        .filter((m) => m.metricConfig.key !== selected[0].metricConfig.key)
        .map((m) => m.metricConfig.key);
    } else if (userChartType === "biaxial" && selected.length === 2) {
      disabled = allMetrics
        .filter(
          (m) =>
            !selected.some((s) => s.metricConfig.key === m.metricConfig.key),
        )
        .map((m) => m.metricConfig.key);
    }

    setCheckedMetrics(selected);
    setDisabledMetrics(disabled);
  };

  // Y-axis handlers
  const handleYAxisChange = (axis, field) => (e) => {
    setYAxis((prev) => ({
      ...prev,
      [axis]: { ...prev[axis], [field]: e.target.value },
    }));
  };

  const handleYAxisToggle = (axis) => (e) => {
    setYAxis((prev) => ({
      ...prev,
      [axis]: { ...prev[axis], disabled: e.target.checked },
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
      yAxis,
      userChartType === "pie" ? pieChartAggType : null,
    );

    // Update unsaved charts and set chart builder to custom
    setUnsavedCustomCharts((prev) => {
      const updated = [...prev, chartConfig];
      setChartConfigs(updated);
      return updated;
    });

    // Trigger required API sections to fetch
    setSelectedSection((prev) => {
      if (prev === null) return metricAPISet;
      return Array.from(new Set([...prev, ...metricAPISet]));
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
    yAxis,

    allMetrics,
    metricAPISet,

    handleChartTypeChange,
    handleMetricsChange,
    handleYAxisChange,
    handleYAxisToggle,

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
      ...(settings.left.max !== "" && { leftYAxisMax: settings.left.max }),
      ...(settings.left.unit !== "" && { leftYAxisUnit: settings.left.unit }),
      ...(settings.right.max !== "" && { rightYAxisMax: settings.right.max }),
      ...(settings.right.unit !== "" && {
        rightYAxisUnit: settings.right.unit,
      }),
      ...(settings.left.disabled && {
        leftYAxisDisabled: settings.left.disabled,
      }),
      ...(settings.right.disabled && {
        rightYAxisDisabled: settings.right.disabled,
      }),
      ...(type === "pie" && aggregation && { aggregation }),
    },
  };
}
