<script lang="ts">
  import { Accordion } from 'bits-ui';
  import { slide } from 'svelte/transition';
  import {sizes, variants} from '$shared/ui/buttons/constants'
  // Визначаємо інтерфейс для елемента акордеону
  interface AccordionItem {
    content: string;
  }

  // Використовуємо Svelte 5 Runes з правильною типізацією
  let {
    accordTitle = 'Default Title',
    items = [],
    className= '',
  } = $props<{
    accordTitle?: string;
    items: AccordionItem[];
    className?: string;
  }>();
</script>

<Accordion.Root
  type="single"
  class={`relative ${className}`}
>
  <Accordion.Item
    value="item-1"
    class="border-neutral-200"
  >
    <Accordion.Header class="flex justify-center">
      <Accordion.Trigger
        class="{variants.primary} {sizes.md}
          flex items-center justify-center gap-2 
          text-center
          [&[data-state=open]>span]:rotate-180"
      >
        {accordTitle}
        <span
          class="transition-transform duration-800"
          aria-hidden="true">▼</span
        >
      </Accordion.Trigger>
    </Accordion.Header>

    <Accordion.Content forceMount={true}>
      {#snippet child({ props, open })}
        {#if open}
          <div
            {...props}
            transition:slide={{ duration: 1200 }}
            class="z-1 space-y-3 px-6 pb-6 pt-2 text-center text-neutral-700 absolute w-[900px] min-w-[300px] bg-secondary
             right-1/2 translate-x-1/2 rounded-2xl text-white"
          >
            {#each items as item, i (i)}
              <p>{item.content}</p>
            {/each}
          </div>
        {/if}
      {/snippet}
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
