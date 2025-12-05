import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getApiEndpoint, testConnect } from "@/utils/api/endpoint";
import { getEnvVariables } from "@/utils/envs";

export async function GET(req) {
  const hdrs = await headers();
  const base_url = hdrs.get("x-base-url");

  try {
    getEnvVariables("whoops");
  } catch (e) {
    return NextResponse.redirect(
      `${base_url}/?error=${encodeURIComponent(e.message)}`,
    );
  }

  const endpoint = getApiEndpoint("whoops");

  if (!(await testConnect(endpoint))) {
    return NextResponse.redirect(
      `${base_url}/?error=${encodeURIComponent(`Cannot connect to ${endpoint}`)}`,
    );
  }

  const response = NextResponse.redirect(`${base_url}/dashboard`);

  response.cookies.set("data_source", "whoops", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}
