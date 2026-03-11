<!-- <script>
  import { typography } from '@tailwindcss/typography';
</script> -->

<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import Header from '$shared/ui/layout/Header.svelte';
  import Footer from '$shared/ui/layout/Footer.svelte';

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head
>

<Header />

{@render children()}

<!-- <Footer /> -->

<style global lang="scss">
  @import '$styles/global.scss';
  /* @import '$styles/typography.scss';*/
</style>
