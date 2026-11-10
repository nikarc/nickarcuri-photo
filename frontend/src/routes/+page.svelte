<script lang="ts">
  import { defaultQueryFn } from "#lib/api-helper.ts";
  import { createQuery } from "@tanstack/svelte-query";
  import type { HomePage } from "@/types/page";
  import { cn } from "#lib/tw-utils.ts";
  import Header from "@/ui/header.svelte";

  const imagesQuery = createQuery(() => ({
    queryKey: ["pages", 4],
    queryFn: defaultQueryFn<HomePage>,
    enabled: true,
  }));
</script>

<Header />
{#if imagesQuery.isSuccess}
  <div class="flex flex-col gap-y-12">
    {#each imagesQuery.data.images as image, index (image.id)}
      <div
        class={cn("flex", index % 2 === 0 ? "flex-row-reverse" : "flex-row")}
      >
        <img
          src={image.image.meta.download_url}
          alt={image.image.title}
          class="max-w-[50vw]"
        />
      </div>
    {/each}
  </div>
{/if}
