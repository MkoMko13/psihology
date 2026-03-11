<script lang="ts">
  import { Accordion } from 'bits-ui';
  import { slide } from 'svelte/transition';
  import {variants} from '$shared/ui/buttons/constants'
  // Визначаємо інтерфейс для елемента акордеону
  interface AccordionItem {
    content: string;
  }

  // Використовуємо Svelte 5 Runes з правильною типізацією
  let {
    accordTitle = 'Default Title',
    items = [],
    variant = '',
  } = $props<{
    accordTitle?: string;
    items: AccordionItem[];
    variant?: string;
  }>();
</script>

<Accordion.Root
  type="single"
>
  <Accordion.Item
    value="item-1"
    class="border-neutral-200 bg-white shadow-sm"
  >
    <Accordion.Header class="flex justify-center">
      <Accordion.Trigger
        class="{variants.primary}
        flex items-center justify-center gap-2 
        rounded-2xl 
        px-6 py-4 text-center text-lg font-medium 
        [&[data-state=open]>span]:rotate-180 "
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
            class="space-y-3 px-6 pb-6 pt-2 text-center text-neutral-700"
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
