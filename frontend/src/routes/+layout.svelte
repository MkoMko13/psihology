<script lang="ts">
  import '$styles/global.css';
  import favicon from '$lib/assets/favicon.svg';
  import Header from '$shared/ui/layout/Header.svelte';

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Header />

{@render children()}
