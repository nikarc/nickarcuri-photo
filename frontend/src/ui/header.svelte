<script lang="ts">
import type {Page} from '@/types/page';
    import RichText from './rich-text.svelte';
    import { cn } from '#lib/tw-utils.ts';

type Props = Pick<Page, 'title'> & {
  description?: string;
}
let {title, description}: Props = $props();

let scrollY = $state(0);
let isScrolled = $derived(scrollY > 0);
</script>

<svelte:window bind:scrollY />

<header class={cn("mb-12 sticky top-0 p-4 bg-app-bg transition-shadow", isScrolled ? 'shadow-sm' : '')}>
  <h1 class="text-5xl font-bold tracking-tight font-display">{title}</h1>
  {#if description}
  <RichText html={description} wrapperClass="font-mono" />
  {/if}
</header>
