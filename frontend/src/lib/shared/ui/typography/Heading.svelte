<script lang="ts">
  export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  export let className: string = ''; // для додаткових класів
</script>

{#if level === 1}
  <h1 class={`text-4xl font-bold mb-4 ${className}`.trim()}>
    <slot />
  </h1>
{:else if level === 2}
  <h2 class={`w-full text-h2 text-center font-semibold text-accent-primary ${className}`.trim()}>
    <slot />
  </h2>
{:else if level === 3}
  <h3 class={`text-2xl font-semibold mb-2 ${className}`.trim()}>
    <slot />
  </h3>
{:else if level === 4}
  <h4 class={`text-xl font-medium mb-2 ${className}`.trim()}>
    <slot />
  </h4>
{:else if level === 5}
  <h5 class={`text-lg font-medium mb-1 ${className}`.trim()}>
    <slot />
  </h5>
{:else}
  <h6 class={`text-base font-medium mb-1 ${className}`.trim()}>
    <slot />
  </h6>
{/if}

<!-- ВИКОРИСТАННЯ -->

<!-- <script>
  import Heading from './Heading.svelte';
</script>

<Heading level={1}>Головний заголовок</Heading>

<Heading level={2} className="text-red-500">
  Розділ з рунами 
</Heading>

<Heading level={3}>
  Підзаголовок з <span class="italic">акцентом</span> і emoji 🎯
</Heading> -->