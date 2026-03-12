<script lang="ts">
  import type { Snippet } from 'svelte';

  // const { children = () => null } = $props();
  let {
    className = '',
    id = '',
    children,
  }: { className?: string; id?: string; children?: Snippet } = $props();

</script>

<section
  {id}
  class={`flex flex-col items-center py-20 px-10 ${className.trim()}`}
>
  {@render children?.()}
</section>
