import { NextResponse } from "next/server";
import { readConfig, writeConfig, isValidConfig } from "@/utils/config/config";

export async function GET(req, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

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

  const dashboard = dashboards.find((dashboard) => dashboard.id === id);

  if (!dashboard) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(dashboard);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const { name } = await req.json();

  if (!id || !name) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

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

  const dashboardIndex = dashboards.findIndex((d) => d.id === id);

  if (dashboardIndex === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  dashboards[dashboardIndex].name = name;

  if (!writeConfig(config, dashboards)) {
    return NextResponse.json(
      { message: "Failed to rename dashboard" },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Renamed successfully" });
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  const config = req.nextUrl.searchParams.get("config");

  if (!config || !isValidConfig(config)) {
    return NextResponse.json({ message: "Invalid config" }, { status: 400 });
  }

  let dashboards = readConfig(config);

  if (!dashboards) {
    return NextResponse.json(
      { message: "Failed to read config" },
      { status: 500 },
    );
  }

  const dashboardIndex = dashboards.findIndex((d) => d.id === id);

  if (dashboardIndex === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  dashboards.splice(dashboardIndex, 1);

  if (!writeConfig(config, dashboards)) {
    return NextResponse.json(
      { message: "Failed to delete dashboard" },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
