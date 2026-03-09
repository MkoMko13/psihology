<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type PhotoSwipeLightbox from 'photoswipe/lightbox';
  import 'photoswipe/style.css';

  import {
    type ProductGalleryFeatures,
    productGalleryFeatures,
    productGalleryItems,
    type GalleryItem,
  } from '$shared/config';

  let {
    items = productGalleryItems,
    features = {},
  }: {
    items?: GalleryItem[];
    features?: Partial<ProductGalleryFeatures>;
  } = $props();

  const galleryFeatures = $derived({
    ...productGalleryFeatures,
    ...features,
  });

  let activeIndex = $state(0);
  let thumbsTrack = $state<HTMLDivElement | null>(null);
  let lightbox = $state<PhotoSwipeLightbox | null>(null);
  let isMainScrollSpringPatched = false;

  let pointerStartX = 0;
  let pointerDeltaX = 0;
  let draggingHero = false;
  let suppressClickOpen = false;

  const galleryCssVars = $derived(
    `--gallery-max-width: ${galleryFeatures.galleryMaxWidthPx}px; ` +
      `--gallery-gap: ${galleryFeatures.galleryGapPx}px; ` +
      `--hero-aspect-ratio: ${galleryFeatures.heroAspectRatio}; ` +
      `--hero-max-height: ${galleryFeatures.heroMaxHeightPx}px; ` +
      `--thumb-min-width: ${galleryFeatures.thumbnailMinWidthPx}px; ` +
      `--thumb-gap: ${galleryFeatures.thumbnailGapPx}px; ` +
      `--thumb-aspect-ratio: ${galleryFeatures.thumbnailAspectRatio}; ` +
      `--thumb-visible-count: ${Math.max(1, galleryFeatures.thumbnailsVisibleCount)};`
  );

  function captionText(item: GalleryItem) {
    return item.caption || item.alt || '';
  }

  function escapeHtml(value: string) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function safeImageSrc(src?: string) {
    const value = src?.trim() ?? '';
    return /^(\/|https?:\/\/)/i.test(value) ? value : '';
  }

  const safeGalleryItems = $derived(
    items.map((item) => ({
      ...item,
      src: safeImageSrc(item.src),
      thumbSrc: safeImageSrc(item.thumbSrc || item.src),
    }))
  );

  const hasItems = $derived(safeGalleryItems.length > 0);

  function buildLightboxOptions(
    features: ProductGalleryFeatures
  ) {
    const zoomDisabledOverrides = features.zoom
      ? {}
      : {
          initialZoomLevel: 'fit' as const,
          secondaryZoomLevel: 1,
          maxZoomLevel: 1,
          imageClickAction: 'next' as const,
          doubleTapAction: 'next' as const,
        };

    return {
      close: true,
      zoom: features.zoom,
      counter: features.showCounter,
      arrowPrev: features.showArrows,
      arrowNext: features.showArrows,
      escKey: features.keyboardNavigation,
      arrowKeys: features.keyboardNavigation,
      wheelToZoom: features.zoom,
      pinchToClose: true,
      loop: features.loop,
      bgOpacity: features.modalBackgroundOpacity,
      showHideAnimationType: features.modalAnimationType,
      showAnimationDuration:
        features.modalShowAnimationDurationMs,
      hideAnimationDuration:
        features.modalHideAnimationDurationMs,
      dataSource: safeGalleryItems.map((item) => ({
        src: item.src,
        width: item.width,
        height: item.height,
        alt: item.alt,
      })),
      pswpModule: () => import('photoswipe'),
      ...zoomDisabledOverrides,
    };
  }

  const currentItem = $derived(
    safeGalleryItems[activeIndex] ?? safeGalleryItems[0]
  );

  function showPrevOnPage() {
    if (!hasItems) return;
    const itemsCount = safeGalleryItems.length;
    activeIndex =
      (activeIndex - 1 + itemsCount) % itemsCount;
  }

  function showNextOnPage() {
    if (!hasItems) return;
    activeIndex =
      (activeIndex + 1) % safeGalleryItems.length;
  }

  function scrollThumbIntoView(
    index: number,
    smooth = true
  ) {
    const el = thumbsTrack?.querySelector<HTMLElement>(
      `[data-thumb-index="${index}"]`
    );
    if (!el) return;

    el.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      inline: 'center',
      block: 'nearest',
    });
  }

  function openModal(index: number) {
    if (!lightbox || !hasItems) return;

    const targetIndex = Math.max(
      0,
      Math.min(index, safeGalleryItems.length - 1)
    );
    activeIndex = targetIndex;
    lightbox.loadAndOpen(targetIndex);
  }

  function onHeroPointerDown(event: PointerEvent) {
    pointerStartX = event.clientX;
    pointerDeltaX = 0;
    draggingHero = true;
  }

  function onHeroPointerMove(event: PointerEvent) {
    if (!draggingHero) return;
    pointerDeltaX = event.clientX - pointerStartX;
  }

  function onHeroPointerUp() {
    if (!draggingHero) return;
    draggingHero = false;

    if (
      Math.abs(pointerDeltaX) >=
      galleryFeatures.swipeThresholdPx
    ) {
      if (pointerDeltaX < 0) showNextOnPage();
      else showPrevOnPage();

      suppressClickOpen = true;
      setTimeout(() => {
        suppressClickOpen = false;
      }, 140);
    }

    pointerDeltaX = 0;
  }

  function onHeroClick() {
    if (suppressClickOpen) return;
    openModal(activeIndex);
  }

  function animateModalSlideTransition() {
    const slideImage = lightbox?.pswp?.currSlide?.content
      ?.element as HTMLElement | undefined;
    if (
      !slideImage ||
      galleryFeatures.modalSlideTransitionDurationMs <= 0
    ) {
      return;
    }

    slideImage.classList.remove(
      'pswp-modal-slide-transition'
    );
    // Force reflow to restart CSS animation on each slide change.
    void slideImage.getBoundingClientRect();
    slideImage.classList.add('pswp-modal-slide-transition');
  }

  function patchModalMainScrollSpring() {
    if (isMainScrollSpringPatched) return;

    const pswp = lightbox?.pswp as
      | {
          animations?: {
            startSpring?: (props: {
              isMainScroll?: boolean;
              naturalFrequency?: number;
              [key: string]: unknown;
            }) => unknown;
          };
        }
      | undefined;

    const animations = pswp?.animations;
    const startSpring = animations?.startSpring;
    if (!animations || !startSpring) return;

    const originalStartSpring =
      startSpring.bind(animations);

    animations.startSpring = (props) => {
      if (props?.isMainScroll) {
        const durationMs = Math.max(
          1,
          galleryFeatures.modalSlideTransitionDurationMs
        );
        const naturalFrequency = Math.max(
          4,
          Math.min(30, 10000 / durationMs)
        );

        return originalStartSpring({
          ...props,
          naturalFrequency,
        });
      }

      return originalStartSpring(props);
    };

    isMainScrollSpringPatched = true;
  }

  $effect(() => {
    if (!galleryFeatures.thumbnails) return;
    scrollThumbIntoView(activeIndex);
  });

  $effect(() => {
    document.documentElement.style.setProperty(
      '--pswp-modal-slide-transition-duration',
      `${galleryFeatures.modalSlideTransitionDurationMs}ms`
    );

    return () => {
      document.documentElement.style.removeProperty(
        '--pswp-modal-slide-transition-duration'
      );
    };
  });

  onMount(() => {
    let disposed = false;

    (async () => {
      const { default: PhotoSwipeLightboxCtor } =
        await import('photoswipe/lightbox');

      if (disposed) return;

      lightbox = new PhotoSwipeLightboxCtor(
        buildLightboxOptions(galleryFeatures)
      );

      lightbox.on('afterInit', () => {
        patchModalMainScrollSpring();
      });

      lightbox.on('change', () => {
        const index = lightbox?.pswp?.currIndex;
        if (typeof index === 'number') activeIndex = index;
        animateModalSlideTransition();
      });

      if (galleryFeatures.caption) {
        lightbox.on('uiRegister', () => {
          lightbox?.pswp?.ui?.registerElement({
            name: 'custom-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            html: '<div class="pswp-caption"></div>',
            onInit: (el, pswp) => {
              const render = () => {
                const item =
                  safeGalleryItems[pswp.currIndex];
                el.textContent = item
                  ? captionText(item)
                  : '';
              };
              render();
              pswp.on('change', render);
            },
          });
        });
      }

      if (galleryFeatures.fullscreen) {
        lightbox.on('uiRegister', () => {
          lightbox?.pswp?.ui?.registerElement({
            name: 'fullscreen-toggle',
            order: 8,
            isButton: true,
            tagName: 'button',
            className: 'pswp__button pswp__button--fs',
            title: 'Fullscreen',
            html: '⛶',
            onClick: () => {
              if (document.fullscreenElement) {
                void document.exitFullscreen();
              } else {
                void lightbox?.pswp?.element?.requestFullscreen();
              }
            },
          });
        });
      }

      if (galleryFeatures.thumbsInModal) {
        lightbox.on('uiRegister', () => {
          lightbox?.pswp?.ui?.registerElement({
            name: 'modal-thumbs',
            order: 20,
            isButton: false,
            appendTo: 'root',
            html: '<div class="pswp-thumbs"></div>',
            onInit: (el, pswp) => {
              const thumbs = safeGalleryItems
                .map(
                  (item, idx) =>
                    `<button class="pswp-thumb ${idx === pswp.currIndex ? 'is-active' : ''}" data-idx="${idx}" aria-label="Slide ${idx + 1}"><img src="${escapeHtml(item.thumbSrc || item.src)}" alt="${escapeHtml(item.alt || `Slide ${idx + 1}`)}"></button>`
                )
                .join('');

              el.innerHTML = `<div class="pswp-thumb-track">${thumbs}</div>`;

              el.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                const btn =
                  target.closest<HTMLElement>('[data-idx]');
                if (!btn) return;
                const index = Number(btn.dataset.idx);
                if (!Number.isNaN(index)) pswp.goTo(index);
              });

              const update = () => {
                el.querySelectorAll('.pswp-thumb').forEach(
                  (node, i) => {
                    node.classList.toggle(
                      'is-active',
                      i === pswp.currIndex
                    );
                  }
                );

                const active =
                  el.querySelector<HTMLElement>(
                    `.pswp-thumb[data-idx="${pswp.currIndex}"]`
                  );
                active?.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              };

              update();
              pswp.on('change', update);
            },
          });
        });
      }

      lightbox.init();
    })();

    return () => {
      disposed = true;
      lightbox?.destroy();
      lightbox = null;
    };
  });
</script>

<section
  class="gallery-shell"
  aria-label="Галерея товару"
  style={galleryCssVars}
>
  {#if galleryFeatures.heroPreview && hasItems}
    <div class="hero-wrap">
      {#if galleryFeatures.pageNavigation}
        <button
          type="button"
          class="page-nav prev"
          onclick={showPrevOnPage}
          aria-label="Попереднє зображення"
        >
          ←
        </button>
      {/if}

      <button
        type="button"
        class="hero-image"
        onclick={onHeroClick}
        onpointerdown={onHeroPointerDown}
        onpointermove={onHeroPointerMove}
        onpointerup={onHeroPointerUp}
        onpointercancel={onHeroPointerUp}
        aria-label="Відкрити галерею в модальному вікні"
      >
        {#if galleryFeatures.smoothHeroTransition}
          {#key activeIndex}
            <img
              transition:fade={{
                duration:
                  galleryFeatures.heroTransitionDurationMs,
              }}
              src={currentItem?.src}
              alt={currentItem?.alt ||
                `Зображення ${activeIndex + 1}`}
            />
          {/key}
        {:else}
          <img
            src={currentItem?.src}
            alt={currentItem?.alt ||
              `Зображення ${activeIndex + 1}`}
          />
        {/if}
      </button>

      {#if galleryFeatures.pageNavigation}
        <button
          type="button"
          class="page-nav next"
          onclick={showNextOnPage}
          aria-label="Наступне зображення"
        >
          →
        </button>
      {/if}
    </div>
  {/if}

  {#if galleryFeatures.thumbnails && hasItems}
    <div class="thumb-strip-shell">
      <div class="thumb-track" bind:this={thumbsTrack}>
        {#each safeGalleryItems as item, index}
          <button
            type="button"
            class={`thumb-card ${index === activeIndex ? 'is-active' : ''}`}
            data-thumb-index={index}
            aria-label={`Показати ${item.alt || `зображення ${index + 1}`}`}
            onclick={() => {
              activeIndex = index;
              scrollThumbIntoView(index);
            }}
          >
            <img
              src={item.thumbSrc || item.src}
              alt={item.alt || `Зображення ${index + 1}`}
              loading="lazy"
            />
          </button>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style lang="scss">
  .pswp__modal-thumbs {
    width: fit-content;
  }
  .gallery-shell {
    width: min(var(--gallery-max-width), 100%);
    margin: 0 auto;
    display: grid;
    gap: var(--gallery-gap);
  }

  .hero-wrap {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    align-items: center;
  }

  .hero-image {
    position: relative;
    width: 100%;
    aspect-ratio: var(--hero-aspect-ratio);
    max-height: var(--hero-max-height);
    border: 1px solid rgba(18, 26, 42, 0.1);
    border-radius: 18px;
    overflow: hidden;
    padding: 0;
    background: #fff;
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.16);
    cursor: zoom-in;
    touch-action: pan-y;

    img {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      will-change: opacity;
    }
  }

  .page-nav {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 1px solid rgba(18, 26, 42, 0.14);
    background: linear-gradient(180deg, #ffffff, #edf3ff);
    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.16);
    font-size: 20px;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 24px rgba(15, 23, 42, 0.2);
      background: linear-gradient(180deg, #ffffff, #e6edff);
    }

    &:focus-visible {
      outline: 2px solid #2f6fed;
      outline-offset: 2px;
    }
  }

  .thumb-strip-shell {
    display: block;
  }

  .thumb-track {
    display: flex;
    align-items: center;
    gap: var(--thumb-gap);
    overflow-x: hidden;
    overflow-y: hidden;
    scroll-snap-type: x proximity;
    scroll-behavior: smooth;
    width: min(
      100%,
      calc(
        (
            var(--thumb-min-width) *
              var(--thumb-visible-count)
          ) +
          (
            var(--thumb-gap) *
              (var(--thumb-visible-count) - 1)
          ) +
          16px
      )
    );
    margin: 0 auto;
    padding: 8px;
    border-radius: 14px;
    background: linear-gradient(180deg, #f8faff, #eef3ff);
    border: 1px solid rgba(18, 26, 42, 0.09);

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(33, 63, 125, 0.34);
      border-radius: 999px;
    }
  }

  .thumb-card {
    display: block;
    padding: 0;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(18, 26, 42, 0.12);
    flex: 0 0 var(--thumb-min-width);
    scroll-snap-align: center;
    cursor: pointer;
    background: #fff;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease,
      border-color 0.18s ease;

    img {
      display: block;
      width: 100%;
      aspect-ratio: var(--thumb-aspect-ratio);
      object-fit: cover;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 22px rgba(15, 23, 42, 0.16);
    }

    &.is-active {
      border-color: rgba(47, 111, 237, 0.88);
      box-shadow: 0 0 0 2px rgba(47, 111, 237, 0.24);
    }

    &:focus-visible {
      outline: 2px solid #2f6fed;
      outline-offset: 2px;
    }
  }

  .hero-image:focus-visible {
    outline: 2px solid #2f6fed;
    outline-offset: 2px;
  }

  @media (max-width: 1024px) {
    .thumb-card {
      flex-basis: calc(var(--thumb-min-width) - 12px);
    }
  }

  @media (max-width: 760px) {
    .hero-wrap {
      grid-template-columns: 1fr;
    }

    .page-nav {
      display: none;
    }

    .thumb-track {
      width: 100%;
    }

    .thumb-card {
      flex-basis: calc(var(--thumb-min-width) - 18px);
    }
  }

  :global(.pswp__button) {
    border-radius: 999px;
    backdrop-filter: blur(6px);
  }

  :global(.pswp__bg) {
    backdrop-filter: blur(4px);
  }

  :global(.pswp-caption) {
    position: absolute;
    left: 50%;
    bottom: 84px;
    transform: translateX(-50%);
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(16, 24, 40, 0.62);
    color: #fff;
    font-size: 13px;
    line-height: 1;
    backdrop-filter: blur(5px);
  }

  :global(.pswp-thumbs) {
    position: absolute;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    width: min(90vw, 640px);
    pointer-events: auto;
  }

  :global(.pswp-thumb-track) {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 6px;
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.52);
    backdrop-filter: blur(8px);
  }

  :global(.pswp-thumb) {
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 8px;
    background: transparent;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    flex: 0 0 62px;
  }

  :global(.pswp-thumb img) {
    width: 100%;
    height: 62px;
    object-fit: cover;
    display: block;
  }

  :global(.pswp-thumb.is-active) {
    border-color: rgba(96, 165, 250, 0.95);
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.35);
  }

  :global(.pswp__img.pswp-modal-slide-transition) {
    animation: pswp-modal-slide-fade
      var(--pswp-modal-slide-transition-duration, 320ms)
      cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes pswp-modal-slide-fade {
    from {
      opacity: 0.12;
    }

    to {
      opacity: 1;
    }
  }
</style>
