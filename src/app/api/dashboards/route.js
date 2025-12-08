import { validateDashboardConfig } from "@/utils/config/dashboards";
import { readConfig, appendConfig, isValidConfig } from "@/utils/config/config";
import { NextResponse } from "next/server";

export function GET(req) {
  const config = req.nextUrl.searchParams.get("config");

  if (!config || !isValidConfig(config)) {
    return NextResponse.json({ message: "Invalid config" }, { status: 400 });
  }

  const dashboards = readConfig(config);

  if (!dashboards) {
    return NextResponse.json(
      { message: "Failed to read config" },
      { status: 500 },
    );
  }

  return NextResponse.json(dashboards);
}

export async function POST(req) {
  const config = req.nextUrl.searchParams.get("config");

  if (!config || !isValidConfig(config)) {
    return NextResponse.json({ message: "Invalid config" }, { status: 400 });
  }

  let dashboard;
  try {
    dashboard = await req.json();
  } catch (err) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!validateDashboardConfig(dashboard)) {
    return NextResponse.json(
      { message: "Invalid dashboard configuration" },
      { status: 400 },
    );
  }

  if (!appendConfig(config, dashboard)) {
    return NextResponse.json(
      { message: "Failed to save dashboard configuration" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Dashboard configuration saved successfully" },
    { status: 200 },
  );
}
