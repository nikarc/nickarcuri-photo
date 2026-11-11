<script lang="ts">
  import { defaultQueryFn } from "#lib/api-helper.ts";
  import { createQuery } from "@tanstack/svelte-query";
  import type { HomePage } from "@/types/page";
  import { cn } from "#lib/tw-utils.ts";
  import Header from "@/ui/header.svelte";

  const pageQuery = createQuery(() => ({
    queryKey: ["pages", 4],
    queryFn: defaultQueryFn<HomePage>,
    enabled: true,
  }));
</script>

{#if pageQuery.isSuccess}
  <Header title={pageQuery.data.title} description={pageQuery.data.body} />
  <div class="flex flex-col gap-y-12">
    {#each pageQuery.data.images as image, index (image.id)}
      <div
        class={cn("flex", index % 2 === 0 ? "flex-row-reverse" : "flex-row")}
      >
        <img
          src={image.image_thumb.url}
          alt={image.image.title}
          class="max-w-[50vw]"
        />
      </div>
    {/each}
  </div>
{/if}
