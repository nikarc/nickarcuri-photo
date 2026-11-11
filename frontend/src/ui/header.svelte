<script lang="ts">
import type {Page} from '@/types/page';
    import RichText from './rich-text.svelte';

type Props = Pick<Page, 'title'> & {
  description?: string;
}
let {title, description}: Props = $props();
</script>

<h1 class="text-5xl font-bold tracking-tight font-display">{title}</h1>
{#if description}
  <RichText html={description} wrapperClass="font-mono" />
{/if}
