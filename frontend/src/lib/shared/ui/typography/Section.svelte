<script lang="ts">
  import type { Snippet } from 'svelte';

  // const { children = () => null } = $props();
  let {
    className = '',
    id = '',
    style = '',
    children,
    ...rest
  }: {
    className?: string;
    id?: string;
    style?: string;
    children?: Snippet;
    [key: string]: unknown;
  } = $props();

</script>

<section
  {id}
  style={style}
  class={`flex flex-col items-center py-20 px-10 ${className.trim()}`}
  {...rest}
>
  {@render children?.()}
</section>
