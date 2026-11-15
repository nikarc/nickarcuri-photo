<script lang="ts">
    import type { HomePageImage } from "@/types/page";
    import Header from "./header.svelte";
    import { cn } from "#lib/tw-utils.ts";

interface Props {
  title: string;
  subtitle?: string;
  images: HomePageImage[];
}

let {
  title,
  subtitle,
  images,
}:Props = $props();
</script>


<Header title={title} description={subtitle} />
<div class="flex flex-col gap-y-12">
  {#each images as image, index (image.id)}
    <div
      class={cn(
        "flex px-4 w-full",
        index % 2 !== 0 ? "lg:flex-row-reverse" : "flex-row",
      )}
    >
      <img
        src={image.image_thumb.url}
        alt={image.image.title}
        class="lg:max-w-[50vw]"
      />
    </div>
  {/each}
</div>
