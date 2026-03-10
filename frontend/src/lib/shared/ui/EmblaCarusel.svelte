<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import type {
    EmblaCarouselType,
    EmblaOptionsType,
  } from 'embla-carousel';
  import useEmblaCarousel from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';

  let emblaApi = $state<EmblaCarouselType | null>(null);
  let prevDisabled = $state(true);
  let nextDisabled = $state(true);

  let options = $state<EmblaOptionsType>({
    loop: true,
    align: 'center',
    dragFree: false,
    containScroll: 'trimSnaps',
    skipSnaps: false,
  });

  let plugins = $state([
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  function scrollPrev() {
    emblaApi?.scrollPrev();
  }

  function scrollNext() {
    emblaApi?.scrollNext();
  }

  function updateButtonStates() {
    if (!emblaApi) return;
    prevDisabled = !emblaApi.canScrollPrev();
    nextDisabled = !emblaApi.canScrollNext();
  }

  function onEmblaInit(e: CustomEvent<EmblaCarouselType>) {
    emblaApi = e.detail;
    updateButtonStates();

    emblaApi.on('select', updateButtonStates);
    emblaApi.on('reInit', updateButtonStates);

    emblaApi.plugins().autoplay?.play();
  }

  onMount(() => {
    return () => {
      emblaApi?.plugins().autoplay?.stop?.();
    };
  });
</script>

<div class="embla">
  <div
    class="embla__viewport"
    use:useEmblaCarousel={{ options, plugins }}
    onemblaInit={onEmblaInit}
  >
    <div class="embla__container">
      <div class="embla__slide" transition:fade|local>
        <img
          src="https://picsum.photos/800/450?random=1"
          alt="Slide 1"
        />
      </div>
      <div class="embla__slide" transition:fade|local>
        <img
          src="https://picsum.photos/800/450?random=2"
          alt="Slide 2"
        />
      </div>
      <div class="embla__slide" transition:fade|local>
        <img
          src="https://picsum.photos/800/450?random=3"
          alt="Slide 3"
        />
      </div>
      <div class="embla__slide" transition:fade|local>
        <img
          src="https://picsum.photos/800/450?random=4"
          alt="Slide 4"
        />
      </div>
    </div>
  </div>

  <button
    class="embla__prev embla__button"
    disabled={prevDisabled ?? true}
    onclick={scrollPrev}
    aria-label="Попередній слайд"
    type="button"
  >
    ←
  </button>

  <button
    class="embla__next embla__button"
    disabled={nextDisabled ?? true}
    onclick={scrollNext}
    aria-label="Наступний слайд"
    type="button"
  >
    →
  </button>
</div>

<style>
  .embla {
    position: relative;
    max-width: 100%;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
  }

  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
    position: relative;
  }

  .embla__slide img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: 16 / 9;
  }

  .embla__button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 24px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    z-index: 10;
    pointer-events: auto;
  }

  .embla__button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .embla__prev {
    left: 1rem;
  }
  .embla__next {
    right: 1rem;
  }

  .embla__button:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.8);
  }

  .embla__button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 24px;
    cursor: pointer; /* явно вказуємо нормальний курсор */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    z-index: 10;
    pointer-events: auto; /* гарантуємо, що кліки проходять */
    user-select: none; /* опціонально, щоб не виділявся текст */
  }

  .embla__button:disabled {
    opacity: 0.4;
    cursor: not-allowed !important; /* явно перевизначаємо */
    pointer-events: auto; /* навіть disabled кнопка повинна реагувати на hover */
  }

  .embla__button:not(:disabled) {
    cursor: pointer !important; /* примусово нормальний курсор, коли активна */
  }
</style>
