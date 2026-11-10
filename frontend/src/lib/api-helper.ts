import type { QueryFunctionContext } from "@tanstack/svelte-query";
import { PUBLIC_WAGTAIL_URL } from "$app/env/public";

export const defaultQueryFn = async <T = unknown>({
  queryKey,
  signal,
}: QueryFunctionContext): Promise<T> => {
  const url = `${PUBLIC_WAGTAIL_URL}/api/v2/${queryKey.join("/")}`;
  console.log(`Fetching ${url}`);
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};
