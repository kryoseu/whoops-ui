import { getApiEndpoint } from "@/utils/api/endpoint";
import { getSession } from "@/utils/auth";
import { parseRangeToDays } from "@/utils/range";
import { NextResponse } from "next/server";

async function fetchWhoopData(req, url, session) {
  const rangeParam = req.nextUrl.searchParams.get("range") || "7d";
  const days = parseRangeToDays(rangeParam);

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  let range_data = { records: [] };

  const accessToken = session?.tokenData.accessToken;
  try {
    while (url) {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error(`Error response from ${url}:`, response.status);
        const errorData = await response.json().catch(() => null);
        return NextResponse.json(
          { error: errorData || "Unknown error" },
          { status: response.status },
        );
      }

      const data = await response.json();
      range_data.records = [...range_data.records, ...data.records];

      const oldestRecord = data.records.reduce((oldest, r) => {
        const recordDate = new Date(r.created_at);
        return recordDate < oldest ? recordDate : oldest;
      }, new Date());

      if (oldestRecord < cutoffDate) break;
      if (!data.next_token) break;

      url.searchParams.set("nextToken", data.next_token);
    }

    return NextResponse.json(range_data);
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function fetchWhoopsData(_req, url) {
  try {
    const response = await fetch(new URL(url));
    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Handler
export async function GET(req, { params }) {
  const { api } = await params;

  const source = req.cookies.get("data_source").value;

  const endpoint = getApiEndpoint(source);

  let session = null;
  if (source === "whoop") {
    session = getSession(req.cookies.get("jwt")?.value);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const handler = source === "whoop" ? fetchWhoopData : fetchWhoopsData;

  const pathMap = {
    cycles: "cycle",
    recovery: "recovery",
    sleep: "activity/sleep",
    workouts: "activity/workout",
  };

  const path = pathMap[api];
  if (!path) {
    return NextResponse.json({ error: "Unknown API" }, { status: 400 });
  }

  const url =
    source === "whoop"
      ? new URL(`${endpoint}/${path}`)
      : new URL(`${endpoint}/${path}${req.nextUrl.search}`);

  return handler(req, url, session);
}
