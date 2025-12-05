import * as crypto from "crypto";
import jwt from "jsonwebtoken";

export const oauthStates = new Map();
export const sessions = new Map();
export const jwt_secret = crypto.randomBytes(64).toString("hex");

function validateJwt(userJwt) {
  if (!userJwt) return null;

  try {
    const payload = jwt.verify(userJwt, jwt_secret);
    return payload;
  } catch (err) {
    console.error("JWT validation failed:", err.message);
    return null;
  }
}

export function getSession(userJwt) {
  const payload = validateJwt(userJwt);

  if (!payload) return null;

  const session = sessions.get(payload.sessionId);
  return session || null;
}
