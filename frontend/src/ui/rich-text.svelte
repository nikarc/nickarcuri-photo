<script lang="ts">
type Props = {
  html: string;
  wrapperClass: string;
}

let {html: _html, wrapperClass}: Props = $props();
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -- Wagtail rich text, editor-only and whitelisted on save -->
<div class={wrapperClass}>{@html _html}</div>
