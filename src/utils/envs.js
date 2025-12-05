export function getEnvVariables(dataSource) {
  if (dataSource === "whoop") {
    const client_id = process.env.WHOOP_CLIENT_ID || null;
    const client_secret = process.env.WHOOP_CLIENT_SECRET || null;
    const redirect_uri = process.env.WHOOP_REDIRECT_URI || null;

    if (!client_id || !client_secret || !redirect_uri) {
      throw new Error("Missing WHOOP env variables");
    }

    return { client_id, client_secret, redirect_uri };
  }

  if (dataSource === "whoops") {
    const whoops_url = process.env.WHOOPS_URL || null;
    if (!whoops_url) {
      throw new Error("Missing WHOOPS env variable");
    }
    return { whoops_url };
  }
}
