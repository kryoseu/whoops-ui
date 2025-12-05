import { getEnvVariables } from "../envs";

const endpoints = {
  whoop: "https://api.prod.whoop.com/developer/v2",
  whoops: `${stripTrailingSlash(process.env.WHOOPS_URL)}/api/v1/whoop`,
};

export function getApiEndpoint(dataSource) {
  getEnvVariables(dataSource);

  switch (dataSource) {
    case "whoop":
      return endpoints.whoop;
    case "whoops":
      return endpoints.whoops;
    default:
      throw new Error("Invalid data source");
  }
}

export async function testConnect(endpoint) {
  try {
    await fetch(endpoint);
    return true;
  } catch (error) {
    return false;
  }
}

function stripTrailingSlash(str) {
  return str?.endsWith("/") ? str.slice(0, -1) : str;
}
