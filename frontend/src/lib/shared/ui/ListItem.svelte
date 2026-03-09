<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = {
    children?: Snippet;
  };

  let { children }: Props = $props();
</script>

<div
  class="relative
    flex justify-center items-center
    max-w-full p-8
    rounded-xl bg-muted-bg"
>
  <p class="before:content-['☘︎'] before:mr-1">
    {@render children?.()}
  </p>
</div>
