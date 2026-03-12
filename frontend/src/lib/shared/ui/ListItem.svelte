<script lang="ts">
  import type { Component } from 'svelte';

  type IconPosition = 'top' | 'right' | 'bottom' | 'left';
  type IconType = string | Component<Record<string, any>>;

  let {
    children = [],
    icons = [],
    direction = 'top' as IconPosition,
    gap = 8,
    className = '',
    iconSize = 20,
  }: {
    children?: string[];
    icons?: IconType[];
    direction?: IconPosition;
    gap?: number;
    className?: string;
    iconSize?: Number;
  } = $props();

  const classesMap: Record<IconPosition, string> = {
    top: 'flex flex-col items-center',
    right: 'flex flex-row-reverse items-center',
    bottom: 'flex flex-col-reverse items-center',
    left: 'flex items-center',
  };
</script>

{#each children as paragraph, i}
  <li
    class={`${classesMap[direction] ?? classesMap.top} ${className}`.trim()}
    style="gap: {gap ?? 8}px;"
  >
    {#if icons?.[i]}
      <span>
        {#if typeof icons[i] === 'string'}
          {icons[i]}
        {:else}
          {@const Icon = icons[i]}
          <Icon size={iconSize} aria-hidden="true" />
        {/if}
      </span>
    {/if}

    <p class="before:content-['☘︎'] before:mr-1">
      {paragraph}
    </p>
  </li>
{/each}
