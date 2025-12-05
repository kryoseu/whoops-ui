import { NextResponse } from "next/server";

export function proxy(req) {
  const host = req.headers.get("host");
  const protocol = req.nextUrl.protocol;
  const base_url = `${protocol}//${host}`;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-base-url", base_url);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/api/:path*"],
};
