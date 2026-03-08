<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'outline';
  type Size = 'sm' | 'md' | 'lg';

  type Props = {
    variant?: Variant;
    size?: Size;
    className?: string;
    children?: Snippet;
  };

  let { variant = 'primary', size = 'md', className = '', children }: Props = $props();

  const variants: Record<Variant, string> = {
    primary: `
		bg-secondary text-white
    py-1 px-8
    rounded-lg
`,
    outline: `
		bg-secondary text-white
		py-1 px-8
		rounded-lg
`,
  };

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = $derived(`${variants[variant]} ${sizes[size]} ${className}`.trim());
</script>

<button class={classes}>
  {@render children?.()}
</button>
