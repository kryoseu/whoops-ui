import crypto from "crypto";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getEnvVariables } from "@/utils/envs";
import { oauthStates } from "@/utils/auth";

export async function GET(req) {
  const hdrs = await headers();
  const base_url = hdrs.get("x-base-url");

  let client_id, redirect_uri;
  try {
    ({ client_id, redirect_uri } = getEnvVariables("whoop"));
  } catch (e) {
    return NextResponse.redirect(
      `${base_url}/?error=${encodeURIComponent(e.message)}`,
    );
  }

  const state = crypto.randomUUID();
  oauthStates.set(state, { createdAt: Date.now() });

  const params = new URLSearchParams({
    response_type: "code",
    client_id,
    redirect_uri,
    scope: "offline read:workout read:recovery read:sleep read:cycles",
    state,
  });

  const authUrl = `https://api.prod.whoop.com/oauth/oauth2/auth?${params}`;

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("data_source", "whoops", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}
