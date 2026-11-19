<script lang="ts">
  import { defaultQueryFn } from "#lib/api-helper.ts";
  import { createQuery } from "@tanstack/svelte-query";
  import type { HomePage } from "@/types/page";
    import ImagePage from "@/ui/image-page.svelte";

  const pageQuery = createQuery(() => ({
    queryKey: ["pages", 4],
    queryFn: defaultQueryFn<HomePage>,
    enabled: true,
  }));
</script>

{#if pageQuery.isSuccess}
  <ImagePage
    title={pageQuery.data.title}
    subtitle={pageQuery.data.body}
    images={pageQuery.data.images}
  />
{/if}
