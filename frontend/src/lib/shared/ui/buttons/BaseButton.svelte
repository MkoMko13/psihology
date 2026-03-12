<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Variant, Size } from './constants.ts';
  import {
    variants,
    sizes,
  } from '$shared/ui/buttons/constants';
  type Props = {
    variant?: Variant;
    size?: Size;
    className?: string;
    children?: Snippet;
  };

  let {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
  }: Props = $props();
  
  const classes = $derived(
    `${variants[variant]} ${sizes[size]} ${className}`.trim()
  );
</script>

<button class={classes}>
  {@render children?.()}
</button>
