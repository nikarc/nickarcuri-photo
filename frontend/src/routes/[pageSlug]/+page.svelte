<script lang="ts">
  import { pageQueryFn } from "#lib/api-helper.ts";
  import { createQuery } from "@tanstack/svelte-query";
  import ImagePage from "@/ui/image-page.svelte";

  interface PageProps {
    params: {
      pageSlug: string;
    };
  }
  let { params }: PageProps = $props();

  const pageQuery = createQuery(() => ({
    queryKey: ["pages", params.pageSlug],
    queryFn: ({ signal }) =>
      pageQueryFn({
        pageSlug: params.pageSlug,
        signal,
      }),
    enabled: !!params.pageSlug,
  }));
</script>

{#if pageQuery.isSuccess && pageQuery.data}
  <ImagePage
    title={pageQuery.data.title}
    subtitle={pageQuery.data.body}
    images={pageQuery.data.images}
  />
{/if}
