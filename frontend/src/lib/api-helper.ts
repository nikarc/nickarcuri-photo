import type { QueryFunctionContext } from "@tanstack/svelte-query";
import { PUBLIC_WAGTAIL_URL } from "$app/env/public";
import type { HomePage, PageListResponse } from "@/types/page";

const API_VER = 'v2';

export const defaultQueryFn = async <T = unknown>({
  queryKey,
  signal,
}: QueryFunctionContext): Promise<T> => {
  const url = `${PUBLIC_WAGTAIL_URL}/api/${API_VER}/${queryKey.join("/")}`;
  console.log(`Fetching ${url}`);
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

export interface PageItem {
  id: number;
  title: string;
  meta: {
    slug: string;
    first_published_at: string;
  }
}
export interface PageResponse {
  meta: {
    total_count: number;
  }
  items: PageItem[];
}

export const pageQueryFn = async ({
  pageSlug,
  signal,
}: {
  pageSlug: string;
} & Pick<QueryFunctionContext, 'signal'>): Promise<HomePage | null> => {
  const url = `${PUBLIC_WAGTAIL_URL}/api/${API_VER}/pages/?slug=${pageSlug}&type=home.HomePage&fields=body,images`;
  console.log(`Fetching ${url}`)
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  const json: PageListResponse<HomePage> = await res.json();
  if (json.items.length === 0) return null;
  return json.items[0];
}
