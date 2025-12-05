import { cookies } from "next/headers";
import { getSession, sessions } from "@/utils/auth";

export async function GET() {
  const cookieStore = await cookies();

  const userJwt = cookieStore.get("jwt")?.value;
  const session = getSession(userJwt);

  if (session) {
    sessions.delete(session.id);
  }

  cookieStore.set({
    name: "jwt",
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(0),
  });

  return new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });
}
