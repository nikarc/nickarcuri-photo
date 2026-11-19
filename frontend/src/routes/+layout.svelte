<script lang="ts">
  import "./layout.css";
  import favicon from "#lib/assets/favicon.svg";
  import type { LayoutProps } from "./$types";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

  let { children }: LayoutProps = $props();

  const queryClient = new QueryClient({
    defaultOptions: {
      // baseURL??
    },
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
  {@render children()}
</QueryClientProvider>
