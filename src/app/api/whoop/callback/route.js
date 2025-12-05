import crypto from "crypto";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getEnvVariables } from "@/utils/envs";
import { jwt_secret, oauthStates, sessions } from "@/utils/auth";

export async function GET(req) {
  const hdrs = await headers();
  const base_url = hdrs.get("x-base-url");

  const { client_id, client_secret, redirect_uri } = getEnvVariables("whoop");

  const searchParams = req.nextUrl.searchParams;

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json(
      { error: "Missing code or state" },
      { status: 400 },
    );
  }

  const session = oauthStates.get(state);
  if (!session) {
    return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 });
  }

  oauthStates.delete(state);

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri,
    client_id,
    client_secret,
  });

  try {
    const tokenResponse = await fetch(
      "https://api.prod.whoop.com/oauth/oauth2/token",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: params,
      },
    );

    const data = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", data);
      return NextResponse.redirect(
        `${base_url}/?error=${encodeURIComponent(data.error_description || "OAuth failed")}`,
      );
    }

    const tokenData = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, { tokenData });

    const userJwt = jwt.sign({ sessionId }, jwt_secret, {
      expiresIn: "1d",
    });

    const res = NextResponse.redirect(`${base_url}/dashboard`);
    res.cookies.set("jwt", userJwt, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.redirect(
      `${base_url}/?error=${encodeURIComponent("Internal server error")}`,
    );
  }
}
