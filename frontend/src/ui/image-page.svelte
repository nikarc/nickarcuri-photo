<script lang="ts">
  import { IMAGES_PER_ROW } from "$app/env/public";
  import type { HomePageImage } from "@/types/page";
  import Header from "./header.svelte";
  import { innerWidth } from "svelte/reactivity/window";
  import {
    GalleryImage,
    GalleryThumbnail,
    LightboxGallery,
  } from "svelte-lightbox";

  interface Props {
    title: string;
    subtitle?: string;
    images: HomePageImage[];
  }

  let { title, subtitle, images }: Props = $props();

  const PER_ROW = Number(IMAGES_PER_ROW ?? "4");

  // h = (W − 4 × gap) / (a₁ + a₂ + a₃ + a₄ + a₅)
  const rows = $derived.by(() => {
    const W = innerWidth.current ?? 0;
    const out = [];
    for (let i = 0; i < images.length; i += PER_ROW) {
      const row = images.slice(i, i + PER_ROW);
      const ratioSum = row.reduce(
        (s, img) => s + img.image_thumb.width / img.image_thumb.height,
        0,
      );
      const h = (W - (row.length - 1)) / ratioSum;
      out.push({ row, h });
    }
    return out;
  });
</script>

<Header {title} description={subtitle} />
<div class="flex flex-col">
  <LightboxGallery>
    <svelte:fragment slot="thumbnail">
      {#each rows as { row, h }, index (index)}
        <div class="flex flex-wrap">
          {#each row as image, index (image.id)}
            <GalleryThumbnail id={index}>
              <img
                src={image.image_thumb.url}
                alt={image.image.title}
                style="height: {h}px"
              />
            </GalleryThumbnail>
          {/each}
        </div>
      {/each}
    </svelte:fragment>
    {#each images as image (image.id)}
      <GalleryImage>
        <img src={image.image_full.url} alt={image.image.title} />
      </GalleryImage>
    {/each}
  </LightboxGallery>
</div>
