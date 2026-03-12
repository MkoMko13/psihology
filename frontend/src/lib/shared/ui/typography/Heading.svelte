<script lang="ts">
  import type { Snippet } from 'svelte';

  type HeadingLevel = 1 | 2 | 3 | 4;
  // ─── Пропси через $props() ───
  let {
    level = 1 as HeadingLevel,
    className = '',
    children,
  }: {
    level?: 1 | 2 | 3 | 4;
    className?: string;
    children?: Snippet;
  } = $props();

  // ─── Мапи (звичайні const, бо вони статичні) ───
  const classesMap: Record<HeadingLevel, string> = {
    1: 'text-4xl font-bold mb-4',
    2: 'w-full text-h2 text-center font-semibold',
    3: 'text-2xl font-semibold mb-2',
    4: 'text-xl font-medium mb-2',
  } as const;

  const tagMap: Record<HeadingLevel, string> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
  } as const satisfies Record<HeadingLevel, string>;

  // ─── Реактивні значення через $derived ───
  // let tag = $derived(tagMap[level] ?? 'h1');

  // let classes = $derived(
  //   `${classesMap[level] ?? classesMap[1]} ${className}`.trim()
  // );

  // Захист: level повинен бути в межах 1–6
  // (можна додати $effect для логування помилок, якщо хочеш)
</script>

<svelte:element
  this={tagMap[level] ?? 'h1'}
  class={`${classesMap[level] ?? classesMap[1]} ${className}`.trim()}
>
  {@render children?.()}
</svelte:element>
