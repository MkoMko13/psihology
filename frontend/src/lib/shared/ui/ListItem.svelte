<script lang="ts">
  type IconPosition = 'top' | 'right' | 'bottom' | 'left';

  let {
    children = [],
    icons = [],
    direction = 'top' as IconPosition,
    gap = 8,
    className = '',
  }: {
    children?: string[];
    icons?: string[];
    direction?: IconPosition;
    gap?: number;
    className?: string;
  } = $props();

  const classesMap: Record<IconPosition, string> = {
    top: 'flex flex-col items-center',
    right: 'flex flex-row-reverse items-center',
    bottom: 'flex flex-col-reverse items-center',
    left: 'flex items-center',
  };
</script>

{#each children as paragraph, i}
  {#if icons}
    <li
      class={`${classesMap[direction] ?? classesMap['top']} ${className}`.trim()}
      style="gap: {gap ?? 8}px;"
    >
      <span>{icons[i]}</span>

      <p class="before:content-['☘︎'] before:mr-1">
        {paragraph}
      </p>
    </li>
  {/if}
{/each}
