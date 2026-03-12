<script lang="ts">
  import type { Snippet } from "svelte";

  const { id = "", children }: {
    id?: string;
    children?: Snippet;
  } = $props();
</script>

<main {id} class="pt-[136px]">
  {@render children?.()}
</main>
