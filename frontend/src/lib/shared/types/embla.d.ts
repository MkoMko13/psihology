import type { EmblaCarouselType } from 'embla-carousel';

declare module 'svelte/elements' {
  interface HTMLAttributes<T extends EventTarget> {
    onemblainit?: (
      event: CustomEvent<EmblaCarouselType>
    ) => void;

    'on:emblainit'?: (
      event: CustomEvent<EmblaCarouselType>
    ) => void;

    onemblaInit?: (
      event: CustomEvent<EmblaCarouselType>
    ) => void;

    'on:emblaInit'?: (
      event: CustomEvent<EmblaCarouselType>
    ) => void;
  }
}
