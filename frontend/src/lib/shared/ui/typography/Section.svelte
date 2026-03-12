<script lang="ts">
  import type { Snippet } from 'svelte';

  // const { children = () => null } = $props();
  let {
    className = '',
    children,
  }: { className?: string; children?: Snippet } = $props();

</script>

<section
  class={`flex flex-col items-center py-20 ${className.trim()}`}
>
  {@render children?.()}
</section>
