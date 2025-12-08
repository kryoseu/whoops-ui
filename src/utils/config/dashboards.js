import { sections } from "../sections";

const validCharts = ["single", "biaxial", "stacked_bar", "pie"];

export function validateDashboardConfig(dashboardConfig) {
  if (!dashboardConfig.id || isValueEmptyString(dashboardConfig.id)) {
    dashboardConfig.id = crypto.randomUUID();
  }

  if (!dashboardConfig.name || isValueEmptyString(dashboardConfig.name)) {
    dashboardConfig.name = "Untitled Dashboard";
  }

  if (!Array.isArray(dashboardConfig.charts)) {
    console.error("Invalid chart configuration.");
    return false;
  }

  dashboardConfig.charts.forEach((chart) => {
    if (!chart.type || isValueEmptyString(chart.type)) {
      console.error("Chart type is required.");
      return false;
    } else if (!validCharts.includes(chart.type)) {
      console.error(`Invalid chart type: '${chart.type}'.`);
      return false;
    }

    if (!chart.metrics || chart.metrics.length === 0) {
      console.error("Chart must have at least one metric.");
      return false;
    }

    if (chart.type === "single" && Object.keys(chart.metrics).length !== 1) {
      console.error("Single charts must have exactly one metric.");
      return false;
    }

    if (chart.type === "biaxial") {
      const totalMetrics = Object.values(chart.metrics).reduce(
        (sum, metricArray) => sum + metricArray.length,
        0,
      );

      if (totalMetrics !== 2) {
        return false;
      }
    }
  });
  return true;
}

const isValueEmptyString = (str) => {
  return !str || str.trim() === "";
};

// Convert dashboard config into full chart config.
// Chart configs have all information needed to render charts.
// Dashboard configs only have metric keys.
// Chart configs include id, type, settings and full metric configurations.
// See sections.js for metric configurations.
// Metrics are grouped by section, which is the API needed to fetch the data.
export function intoChartConfigs(dashboard) {
  const sectionSet = new Set();

  if (!dashboard?.charts) return dashboard;

  const chartConfigs = dashboard.charts.map((chart) => {
    const metricMap = {};

    Object.entries(chart.metrics || {}).forEach(([sectionName, metricList]) => {
      sectionSet.add(sectionName);

      metricList.forEach((metric) => {
        const config = getMetricConfigByKey(sectionName, metric.key);
        if (config) {
          metricMap[sectionName] ??= [];
          metricMap[sectionName].push(config);
        }
      });
    });

    return {
      id: chart.id,
      type: chart.type,
      settings: chart.settings || {},
      metrics: metricMap,
    };
  });

  return { sections: Array.from(sectionSet), charts: chartConfigs };
}

function getMetricConfigByKey(sectionName, metricKey) {
  const section = sections[sectionName];
  return section?.metrics?.[metricKey] ?? null;
}
