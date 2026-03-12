<script lang="ts">
  import type { Snippet } from 'svelte';

  // const { children = () => null } = $props();
  let {
    className = '',
    children,
  }: { className?: string; children?: Snippet } = $props();
</script>

<div
  class={`max-w-screen-xl ${className.trim()}`}
>
  {@render children?.()}
</div>
