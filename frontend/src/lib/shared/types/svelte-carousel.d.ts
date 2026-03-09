declare module 'svelte-carousel' {
  import type { SvelteComponentTyped } from 'svelte';

  export interface CarouselProps {
    autoplay?: boolean;
    autoplaySpeed?: number;
    infinite?: boolean;
    showArrows?: boolean;
    showIndicators?: boolean;
    swipeable?: boolean;
    transitionDuration?: number;
    loop?: boolean;
    interval?: number;
  }

  export default class Carousel extends SvelteComponentTyped<CarouselProps> {}
}
