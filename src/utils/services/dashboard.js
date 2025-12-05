"use client";

export async function listDashboards(config) {
  const response = await fetch(`/api/dashboards?config=${config}`);

  if (!response.ok) throw new Error("Failed to list dashboards");

  return await response.json();
}

export async function saveDashboard(config, dashboard) {
  const response = await fetch(`/api/dashboards?config=${config}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dashboard),
  });

  if (!response.ok) throw new Error("Failed to save dashboard");

  return await response.json();
}

export async function getDashboard(config, dashboardId) {
  const response = await fetch(
    `/api/dashboard/${dashboardId}?config=${config}`,
  );
  if (!response.ok) throw new Error("Failed to get dashboard");

  return await response.json();
}

export async function renameDashboard(config, dashboardId, newName) {
  const response = await fetch(
    `/api/dashboard/${dashboardId}?config=${config}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    },
  );

  if (!response.ok) throw new Error("Failed to rename dashboard");

  return await response.json();
}

export async function deleteDashboard(config, dashboardId) {
  const response = await fetch(
    `/api/dashboard/${dashboardId}?config=${config}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) throw new Error("Failed to delete dashboard");

  return await response.json();
}
