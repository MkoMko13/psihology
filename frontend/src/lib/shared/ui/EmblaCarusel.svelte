<script lang="ts">
  import { onMount } from 'svelte';

  import type {
    EmblaCarouselType,
    EmblaOptionsType,
    EmblaPluginType,
  } from 'embla-carousel';
  import useEmblaCarousel from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import Accessibility, {
    type AccessibilityOptionsType,
  } from 'embla-carousel-accessibility';

  export type EmblaSlide = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    lowRes?: string;
    mobileSrc?: string;
    tabletSrc?: string;
    srcSet?: string;
    sizes?: string;
  };

  export type EmblaAnimationEffect =
    | 'none'
    | 'fade'
    | 'zoom'
    | 'lift';

  export type EmblaControlPlacement = 'inside' | 'outside';

  export type EmblaControlPosition =
    | 'top'
    | 'middle'
    | 'bottom';

  export type EmblaControls = {
    showPrevButton?: boolean;
    showNextButton?: boolean;
    showPlayButton?: boolean;
    showDots?: boolean;
    showStatus?: boolean;
    spreadSideButtons?: boolean;
  };

  export type EmblaControlLayout = {
    placement?: EmblaControlPlacement;
    position?: EmblaControlPosition;
  };

  export type EmblaFeatures = {
    loop?: boolean;
    dragFree?: boolean;
    containScroll?: boolean;
    autoplay?: boolean;
    autoplayDelayMs?: number;
    announceChanges?: boolean;
  };

  export type EmblaClassNames = {
    root?: string;
    stage?: string;
    viewport?: string;
    container?: string;
    slide?: string;
    slideSelected?: string;
    image?: string;
    controls?: string;
    prevButton?: string;
    nextButton?: string;
    playButton?: string;
    dots?: string;
    dot?: string;
    dotActive?: string;
    status?: string;
    liveRegion?: string;
  };

  type Props = {
    slides: EmblaSlide[];
    title?: string;
    controls?: EmblaControls;
    features?: EmblaFeatures;
    animationEffect?: EmblaAnimationEffect;
    controlLayout?: EmblaControlLayout;
    classNames?: EmblaClassNames;
  };

  let {
    slides,
    title = 'Галерея',
    controls,
    features,
    animationEffect = 'none',
    controlLayout,
    classNames,
  }: Props = $props();

  let emblaApi = $state<EmblaCarouselType | null>(null);
  let prevDisabled = $state(true);
  let nextDisabled = $state(true);
  let selectedSnap = $state(0);
  let snapCount = $state(0);
  let isAutoplayRunning = $state(true);

  let prevButtonEl = $state<HTMLButtonElement | null>(null);
  let nextButtonEl = $state<HTMLButtonElement | null>(null);
  let dotsWrapperEl = $state<HTMLDivElement | null>(null);
  let liveRegionEl = $state<HTMLDivElement | null>(null);

  function cx(
    ...parts: Array<string | null | undefined | false>
  ) {
    return parts.filter(Boolean).join(' ');
  }

  const controlSettings = $derived<Required<EmblaControls>>(
    {
      showPrevButton: true,
      showNextButton: true,
      showPlayButton: true,
      showDots: true,
      showStatus: true,
      spreadSideButtons: true,
      ...controls,
    }
  );

  const layoutSettings = $derived<
    Required<EmblaControlLayout>
  >({
    placement: 'inside',
    position: 'middle',
    ...controlLayout,
  });

  const classNameSettings = $derived<
    Required<EmblaClassNames>
  >({
    root: '',
    stage: '',
    viewport: '',
    container: '',
    slide: '',
    slideSelected: '',
    image: '',
    controls: '',
    prevButton: '',
    nextButton: '',
    playButton: '',
    dots: '',
    dot: '',
    dotActive: '',
    status: '',
    liveRegion: '',
    ...classNames,
  });

  const hasControlButtons = $derived(
    controlSettings.showPrevButton ||
      controlSettings.showPlayButton ||
      controlSettings.showNextButton
  );

  const controlsPlacementClass = $derived(
    layoutSettings.placement === 'inside'
      ? 'embla__controls--inside'
      : 'embla__controls--outside'
  );

  const controlsPositionClass = $derived(
    layoutSettings.position === 'top'
      ? 'embla__controls--top'
      : layoutSettings.position === 'bottom'
        ? 'embla__controls--bottom'
        : 'embla__controls--middle'
  );

  const featureSettings = $derived<Required<EmblaFeatures>>(
    {
      loop: true,
      dragFree: false,
      containScroll: true,
      autoplay: true,
      autoplayDelayMs: 4000,
      announceChanges: true,
      ...features,
    }
  );

  const options = $derived<EmblaOptionsType>({
    loop: featureSettings.loop,
    align: 'center',
    dragFree: featureSettings.dragFree,
    containScroll: featureSettings.containScroll
      ? 'trimSnaps'
      : false,
    draggable: true,
    focus: true,
    resize: true,
    slideChanges: true,
    skipSnaps: false,
  });

  const accessibilityOptions =
    $derived<AccessibilityOptionsType>({
      active: true,
      announceChanges: featureSettings.announceChanges,
      carouselAriaLabel: title,
      carouselAriaRoleDescription: 'carousel',
      carouselRole: 'region',
      previousButtonAriaLabel: 'Попередній слайд',
      nextButtonAriaLabel: 'Наступний слайд',
      slideAriaRoleDescription: 'slide',
      slideRole: 'group',
      slideAriaLabel: (
        _hasGrouped,
        first,
        last,
        total,
        snap,
        snaps
      ) =>
        first === last
          ? `Слайд ${first + 1} з ${total} (група ${snap + 1} з ${snaps})`
          : `Слайди ${first + 1}-${last + 1} з ${total} (група ${snap + 1} з ${snaps})`,
      dotButtonAriaLabel: (
        _hasGrouped,
        first,
        last,
        total,
        snap,
        snaps
      ) =>
        first === last
          ? `Перейти до слайду ${first + 1} з ${total} (група ${snap + 1} з ${snaps})`
          : `Перейти до слайдів ${first + 1}-${last + 1} з ${total} (група ${snap + 1} з ${snaps})`,
      liveRegionContent: (
        _hasGrouped,
        first,
        last,
        total,
        snap,
        snaps
      ) =>
        first === last
          ? `Показано слайд ${first + 1} з ${total} (група ${snap + 1} з ${snaps})`
          : `Показано слайди ${first + 1}-${last + 1} з ${total} (група ${snap + 1} з ${snaps})`,
    });

  const plugins = $derived<EmblaPluginType[]>([
    Autoplay({
      delay: featureSettings.autoplayDelayMs,
      defaultInteraction: false,
      stopOnLastSnap: false,
    }),
    Accessibility(accessibilityOptions),
  ]);

  function scrollPrev() {
    emblaApi?.goToPrev();
  }

  function scrollNext() {
    emblaApi?.goToNext();
  }

  function scrollTo(index: number) {
    emblaApi?.goTo(index);
  }

  function toggleAutoplay() {
    if (!featureSettings.autoplay) return;
    isAutoplayRunning = !isAutoplayRunning;
    syncAutoplayState();
  }

  function updateButtonStates() {
    if (!emblaApi) return;
    prevDisabled = !emblaApi.canGoToPrev();
    nextDisabled = !emblaApi.canGoToNext();
  }

  function updateSlidesState() {
    if (!emblaApi) return;
    selectedSnap = emblaApi.selectedSnap();
    snapCount = emblaApi.snapList().length;
  }

  function getAspectRatio(slide: EmblaSlide) {
    const width = slide.width ?? 1200;
    const height = slide.height ?? 675;
    return width / height;
  }

  function getImageSizes(slide: EmblaSlide) {
    return (
      slide.sizes ??
      '(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 920px'
    );
  }

  function syncAutoplayState() {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins().autoplay;
    const accessibility = emblaApi.plugins().accessibility;

    if (!autoplay) return;

    if (!featureSettings.autoplay) {
      autoplay.stop();
      isAutoplayRunning = false;
      accessibility?.setUpdateLiveRegion(true);
      accessibility?.updateLiveRegion();
      return;
    }

    if (isAutoplayRunning) {
      autoplay.play();
      accessibility?.setUpdateLiveRegion(false);
      return;
    }

    autoplay.stop();
    accessibility?.setUpdateLiveRegion(true);
    accessibility?.updateLiveRegion();
  }

  function onEmblaInit(e: CustomEvent<EmblaCarouselType>) {
    emblaApi = e.detail;

    updateButtonStates();
    updateSlidesState();

    emblaApi.on('select', updateButtonStates);
    emblaApi.on('select', updateSlidesState);
    emblaApi.on('reinit', updateButtonStates);
    emblaApi.on('reinit', updateSlidesState);

    if (
      controlSettings.showPrevButton &&
      controlSettings.showNextButton &&
      prevButtonEl &&
      nextButtonEl
    ) {
      emblaApi
        .plugins()
        .accessibility?.setupPrevAndNextButtons(
          prevButtonEl,
          nextButtonEl
        );
    }

    if (controlSettings.showDots && dotsWrapperEl) {
      emblaApi
        .plugins()
        .accessibility?.setupDotButtons(dotsWrapperEl);
    }

    if (liveRegionEl) {
      emblaApi
        .plugins()
        .accessibility?.setupLiveRegion(liveRegionEl);
    }

    isAutoplayRunning = featureSettings.autoplay;
    syncAutoplayState();
  }

  $effect(() => {
    if (!emblaApi) return;
    emblaApi.reInit(options, plugins);
    updateButtonStates();
    updateSlidesState();
    syncAutoplayState();
  });

  onMount(() => {
    return () => {
      emblaApi?.plugins().autoplay?.stop?.();
      emblaApi?.off('select', updateButtonStates);
      emblaApi?.off('select', updateSlidesState);
      emblaApi?.off('reinit', updateButtonStates);
      emblaApi?.off('reinit', updateSlidesState);
    };
  });
</script>

<section
  class={cx(
    'embla',
    `embla--effect-${animationEffect}`,
    classNameSettings.root
  )}
  aria-label={title}
>
  {#snippet ControlsBlock()}
    <div
      class={cx(
        'embla__controls',
        controlsPlacementClass,
        controlsPositionClass,
        controlSettings.spreadSideButtons &&
          'embla__controls--spread',
        classNameSettings.controls
      )}
    >
      <div
        class="embla__controls-side embla__controls-side--left"
      >
        {#if controlSettings.showPrevButton}
          <button
            bind:this={prevButtonEl}
            class={cx(
              'embla__prev embla__button',
              classNameSettings.prevButton
            )}
            disabled={prevDisabled}
            onclick={scrollPrev}
            aria-label="Попередній слайд"
            type="button"
          >
            ←
          </button>
        {/if}
      </div>

      <div class="embla__controls-center">
        {#if controlSettings.showPlayButton}
          <button
            class={cx(
              'embla__toggle embla__button embla__button--secondary',
              classNameSettings.playButton
            )}
            onclick={toggleAutoplay}
            aria-label={isAutoplayRunning
              ? 'Зупинити автопрокрутку'
              : 'Увімкнути автопрокрутку'}
            type="button"
            disabled={!featureSettings.autoplay}
          >
            {isAutoplayRunning ? 'Pause' : 'Play'}
          </button>
        {/if}
      </div>

      <div
        class="embla__controls-side embla__controls-side--right"
      >
        {#if controlSettings.showNextButton}
          <button
            bind:this={nextButtonEl}
            class={cx(
              'embla__next embla__button',
              classNameSettings.nextButton
            )}
            disabled={nextDisabled}
            onclick={scrollNext}
            aria-label="Наступний слайд"
            type="button"
          >
            →
          </button>
        {/if}
      </div>
    </div>
  {/snippet}

  {#if hasControlButtons && layoutSettings.placement === 'outside' && layoutSettings.position === 'top'}
    {@render ControlsBlock()}
  {/if}

  <div class={cx('embla__stage', classNameSettings.stage)}>
    <div
      class={cx(
        'embla__viewport',
        classNameSettings.viewport
      )}
      use:useEmblaCarousel={{ options, plugins }}
      onemblainit={onEmblaInit}
    >
      <div
        class={cx(
          'embla__container',
          classNameSettings.container
        )}
      >
        {#each slides as slide, index}
          <div
            style={`aspect-ratio: ${getAspectRatio(slide)};`}
            class={cx(
              'embla__slide',
              classNameSettings.slide,
              selectedSnap === index &&
                'embla__slide--selected',
              selectedSnap === index &&
                classNameSettings.slideSelected
            )}
          >
            {#if slide.lowRes}
              <img
                class="embla__blur-placeholder"
                src={slide.lowRes}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            {/if}

            <picture>
              {#if slide.mobileSrc}
                <source
                  media="(max-width: 640px)"
                  srcset={slide.mobileSrc}
                />
              {/if}

              {#if slide.tabletSrc}
                <source
                  media="(max-width: 1024px)"
                  srcset={slide.tabletSrc}
                />
              {/if}

              <img
                class={cx(
                  'embla__image',
                  classNameSettings.image
                )}
                src={slide.src}
                srcset={slide.srcSet}
                sizes={getImageSizes(slide)}
                alt={slide.alt}
                width={slide.width ?? 1200}
                height={slide.height ?? 675}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchpriority={index === 0 ? 'high' : 'low'}
                decoding="async"
              />
            </picture>
          </div>
        {/each}
      </div>
    </div>

    {#if hasControlButtons && layoutSettings.placement === 'inside'}
      {@render ControlsBlock()}
    {/if}
  </div>

  {#if hasControlButtons && layoutSettings.placement === 'outside' && layoutSettings.position === 'middle'}
    {@render ControlsBlock()}
  {/if}

  {#if hasControlButtons && layoutSettings.placement === 'outside' && layoutSettings.position === 'bottom'}
    {@render ControlsBlock()}
  {/if}

  {#if controlSettings.showDots}
    <div
      bind:this={dotsWrapperEl}
      class={cx('embla__dots', classNameSettings.dots)}
      aria-label="Навігація по слайдах"
    >
      {#each Array(snapCount) as _, index}
        <button
          class={cx(
            'embla__dot',
            selectedSnap === index && 'is-active',
            classNameSettings.dot,
            selectedSnap === index &&
              classNameSettings.dotActive
          )}
          type="button"
          aria-label={`Перейти до слайду ${index + 1}`}
          onclick={() => scrollTo(index)}
        >
          <span class="sr-only">Слайд {index + 1}</span>
        </button>
      {/each}
    </div>
  {/if}

  {#if controlSettings.showStatus}
    <p
      class={cx('embla__status', classNameSettings.status)}
      aria-live="polite"
    >
      Слайд {selectedSnap + 1} з {Math.max(snapCount, 1)}
    </p>
  {/if}

  <div
    bind:this={liveRegionEl}
    class={cx(
      'embla__live-region',
      classNameSettings.liveRegion
    )}
    aria-live="polite"
    aria-atomic="true"
  ></div>
</section>

<style>
  .embla__blur-placeholder {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(20px);
    transform: scale(1.05);
    opacity: 0.5;
    pointer-events: none;
  }

  .embla {
    --surface: #0f172a;
    --surface-soft: #1e293b;
    --text: #f8fafc;
    --accent: #22c55e;
    --accent-soft: #4ade80;
    --dot: #94a3b8;
    position: relative;
    width: min(100%, 920px);
    margin-inline: auto;
    border-radius: 1.25rem;
    padding: 1rem;
    color: var(--text);
    background:
      radial-gradient(
        circle at top right,
        #14532d 0%,
        transparent 36%
      ),
      linear-gradient(
        145deg,
        var(--surface) 0%,
        var(--surface-soft) 100%
      );
    box-shadow: 0 14px 44px rgba(2, 6, 23, 0.35);
  }

  .embla__stage {
    position: relative;
  }

  .embla__viewport {
    overflow: hidden;
    border-radius: 0.9rem;
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

  .embla__slide--selected {
    z-index: 1;
  }

  .embla__image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    aspect-ratio: 16 / 9;
    background: #0b1120;
    transition:
      opacity 0.35s ease,
      transform 0.35s ease,
      filter 0.35s ease;
  }

  .embla__slide--selected .embla__image {
    animation-duration: 0.4s;
    animation-timing-function: ease;
  }

  .embla--effect-none .embla__image {
    opacity: 1;
    transform: none;
    filter: none;
  }

  .embla--effect-fade .embla__image {
    opacity: 0.55;
  }

  .embla--effect-fade
    .embla__slide--selected
    .embla__image {
    opacity: 1;
    animation-name: emblaFadeIn;
  }

  .embla--effect-zoom .embla__image {
    opacity: 0.7;
    transform: scale(0.96);
  }

  .embla--effect-zoom
    .embla__slide--selected
    .embla__image {
    opacity: 1;
    transform: scale(1);
    animation-name: emblaZoomIn;
  }

  .embla--effect-lift .embla__image {
    opacity: 0.72;
    transform: translateY(8px);
    filter: saturate(0.82);
  }

  .embla--effect-lift
    .embla__slide--selected
    .embla__image {
    opacity: 1;
    transform: translateY(0);
    filter: saturate(1);
    animation-name: emblaLiftIn;
  }

  @keyframes emblaFadeIn {
    from {
      opacity: 0.35;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes emblaZoomIn {
    from {
      opacity: 0.7;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes emblaLiftIn {
    from {
      opacity: 0.65;
      transform: translateY(12px);
      filter: saturate(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: saturate(1);
    }
  }

  .embla__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
  }

  .embla__controls-side,
  .embla__controls-center {
    display: flex;
    align-items: center;
  }

  .embla__controls--spread {
    justify-content: space-between;
  }

  .embla__controls--spread .embla__controls-side {
    flex: 1 1 0;
  }

  .embla__controls--spread .embla__controls-side--left {
    justify-content: flex-start;
  }

  .embla__controls--spread .embla__controls-side--right {
    justify-content: flex-end;
  }

  .embla__controls--spread .embla__controls-center {
    justify-content: center;
    flex: 0 0 auto;
  }

  .embla__controls--outside {
    margin-top: 0.95rem;
  }

  .embla__controls--outside.embla__controls--top {
    margin-top: 0;
    margin-bottom: 0.95rem;
  }

  .embla__controls--outside.embla__controls--middle {
    position: absolute;
    inset-inline: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    pointer-events: none;
    padding-inline: 0.75rem;
  }

  .embla__controls--outside.embla__controls--middle
    .embla__button {
    pointer-events: auto;
  }

  .embla__controls--inside {
    position: absolute;
    inset-inline: 0;
    z-index: 4;
    pointer-events: none;
    padding-inline: 0.75rem;
  }

  .embla__controls--inside .embla__button {
    pointer-events: auto;
  }

  .embla__controls--inside.embla__controls--top {
    top: 0.65rem;
  }

  .embla__controls--inside.embla__controls--middle {
    top: 50%;
    transform: translateY(-50%);
  }

  .embla__controls--inside.embla__controls--bottom {
    bottom: 0.65rem;
  }

  .embla__button {
    min-width: 2.75rem;
    height: 2.75rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(15, 23, 42, 0.72);
    color: var(--text);
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 999px;
    padding-inline: 0.85rem;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      opacity 0.2s ease;
    cursor: pointer;
  }

  .embla__button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .embla__button:hover:not(:disabled) {
    background: rgba(34, 197, 94, 0.25);
    transform: translateY(-1px);
  }

  .embla__button:focus-visible,
  .embla__dot:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.45);
  }

  .embla__button--secondary {
    min-width: 5.5rem;
    font-size: 0.9rem;
    letter-spacing: 0.02em;
  }

  .embla__dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.85rem;
  }

  .embla__dot {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 999px;
    border: none;
    background: var(--dot);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      background 0.2s ease;
  }

  .embla__dot:hover {
    transform: scale(1.05);
  }

  .embla__dot.is-active {
    background: var(--accent-soft);
    transform: scale(1.15);
  }

  .embla__status {
    margin: 0.75rem 0 0;
    text-align: center;
    font-size: 0.9rem;
    color: #cbd5e1;
  }

  .embla__live-region,
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .embla {
      border-radius: 1rem;
      padding: 0.75rem;
    }

    .embla__button {
      min-width: 2.45rem;
      height: 2.45rem;
    }

    .embla__button--secondary {
      min-width: 4.75rem;
      font-size: 0.82rem;
    }
  }
</style>
