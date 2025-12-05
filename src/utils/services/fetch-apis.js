"use client";

import { sections } from "../sections";

export async function fetchAPIs(apis, range) {
  if (!apis) return;

  const results = {};
  for (const api of apis) {
    const apiFn = sections[api].api;
    const apiData = await apiFn(range);

    results[api] = apiData;
  }
  return results;
}
