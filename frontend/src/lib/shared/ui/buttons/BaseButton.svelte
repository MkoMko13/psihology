<script lang="ts">
  import type { Variant } from './constants.ts';
  import type { Snippet } from 'svelte';
  import { variants } from '$shared/ui/buttons/constants';

  type Size = 'sm' | 'md' | 'lg';

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

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = $derived(
    `${variants[variant]} ${sizes[size]} ${className}`.trim()
  );
</script>

<button class={classes}>
  {@render children?.()}
</button>
