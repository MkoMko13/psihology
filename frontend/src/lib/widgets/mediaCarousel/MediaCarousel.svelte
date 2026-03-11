<script lang="ts">
  import { onMount } from 'svelte';
  import './mediaCarusel.scss';

  import type {
    EmblaCarouselType,
    EmblaOptionsType,
    EmblaPluginType,
  } from 'embla-carousel';
  import useEmblaCarousel from 'embla-carousel-svelte';

  type EmblaLightboxUiClassNames = {
    overlay?: string;
    container?: string;
    title?: string;
    description?: string;
    descriptionWrap?: string;
    descriptionInner?: string;
  };

  type AccessibilityOptionsType = {
    active: boolean;
    announceChanges: boolean;
    carouselAriaLabel: string;
    carouselAriaRoleDescription: string;
    carouselRole: 'region';
    previousButtonAriaLabel: string;
    nextButtonAriaLabel: string;
    slideAriaRoleDescription: string;
    slideRole: 'group';
  };

  type AccessibilityPluginApi = {
    setupPrevAndNextButtons?: (
      prevButton: HTMLButtonElement,
      nextButton: HTMLButtonElement
    ) => void;
    setupDotButtons?: (dotsWrapper: HTMLDivElement) => void;
    setupLiveRegion?: (liveRegion: HTMLDivElement) => void;
    setUpdateLiveRegion?: (value: boolean) => void;
    updateLiveRegion?: () => void;
  };

  type AutoplayPluginApi = {
    play?: () => void;
    stop?: () => void;
  };

  type EmblaPluginRegistry = {
    autoplay?: AutoplayPluginApi;
    accessibility?: AccessibilityPluginApi;
  };

  type EmblaAutoplayFactory = (options: {
    delay: number;
    defaultInteraction: boolean;
    stopOnLastSnap: boolean;
  }) => EmblaPluginType;

  type EmblaAccessibilityFactory = (
    options: AccessibilityOptionsType
  ) => EmblaPluginType;

  export type EmblaSlide = {
    src: string;
    alt: string;
    dimensions?: {
      width: number;
      height: number;
    };
    // Backward compatibility for old usage.
    width?: number;
    height?: number;
    lowRes?: string;
    mobileSrc?: string;
    tabletSrc?: string;
    srcSet?: string;
    sizes?: string;
    lightboxType?: 'image' | 'video' | 'iframe' | 'inline';
    lightboxHref?: string;
    lightboxWidth?: string;
    lightboxContent?: {
      title?: string;
      description?: string;
      descriptionPosition?:
        | 'top'
        | 'bottom'
        | 'left'
        | 'right';
      classNames?: EmblaLightboxUiClassNames;
      /**
       * Hide title/description when viewport width is below this value (px).
       * Omit to always show meta regardless of screen size.
       */
      hideMetaBelowPx?: number;
    };
    // Backward compatibility for old usage.
    lightboxTitle?: string;
    lightboxDescription?: string;
    lightboxDescriptionPosition?:
      | 'top'
      | 'bottom'
      | 'left'
      | 'right';
  };

  export type EmblaControlPlacement = 'inside' | 'outside';
  export type EmblaControlPosition =
    | 'top'
    | 'middle'
    | 'bottom';
  export type EmblaThumbsPosition =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right';
  export type EmblaThumbsAlign = 'start' | 'center' | 'end';

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

  export type EmblaThumbnails = {
    enabled?: boolean;
    position?: EmblaThumbsPosition;
    visibleCount?: number;
    align?: EmblaThumbsAlign;
    heightPx?: number;
    sizePx?: number;
    gapPx?: number;
    spacingPx?: number;
    hideBelowPx?: number;
  };

  export type EmblaLightbox = {
    breakpoint?: {
      hideBelowPx?: number;
    };
    effects?: {
      open?: 'none' | 'zoom' | 'fade' | 'slide';
      close?: 'none' | 'zoom' | 'fade' | 'slide';
      slide?: 'none' | 'zoom' | 'fade' | 'slide';
    };
    interaction?: {
      touchNavigation?: boolean;
      keyboardNavigation?: boolean;
      draggable?: boolean;
      zoomable?: boolean;
    };
    ui?: {
      showCounter?: boolean;
      descriptionPosition?:
        | 'top'
        | 'bottom'
        | 'left'
        | 'right';
      /** Custom CSS classes injected into GLightbox DOM elements. */
      classNames?: EmblaLightboxUiClassNames;
    };
    media?: {
      autoplayVideos?: boolean;
    };
    // Backward compatibility for old flat usage.
    hideBelowPx?: number;
    openEffect?: 'none' | 'zoom' | 'fade' | 'slide';
    closeEffect?: 'none' | 'zoom' | 'fade' | 'slide';
    slideEffect?: 'none' | 'zoom' | 'fade' | 'slide';
    touchNavigation?: boolean;
    keyboardNavigation?: boolean;
    draggable?: boolean;
    zoomable?: boolean;
    showCounter?: boolean;
    descriptionPosition?:
      | 'top'
      | 'bottom'
      | 'left'
      | 'right';
    autoplayVideos?: boolean;
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
    thumbsRoot?: string;
    thumbsViewport?: string;
    thumbsContainer?: string;
    thumbButton?: string;
    thumbActive?: string;
  };

  type Props = {
    slides: EmblaSlide[];
    title?: string;
    controls?: EmblaControls;
    features?: EmblaFeatures;
    controlLayout?: EmblaControlLayout;
    thumbnails?: EmblaThumbnails;
    lightbox?: EmblaLightbox;
    classNames?: EmblaClassNames;
    insideEdgeOffset?: number;
    transitionDurationMs?: number;
  };

  let {
    slides,
    title = 'Галерея',
    controls,
    features,
    controlLayout,
    thumbnails,
    lightbox,
    classNames,
    insideEdgeOffset = 10,
    transitionDurationMs = 1000,
  }: Props = $props();

  let emblaApi = $state<EmblaCarouselType | null>(null);
  let thumbsApi = $state<EmblaCarouselType | null>(null);
  let prevDisabled = $state(true);
  let nextDisabled = $state(true);
  let selectedSnap = $state(0);
  let snapCount = $state(0);
  let isAutoplayRunning = $state(true);
  let syncingThumbsFromMain = false;
  let viewportWidth = $state(1440);
  let carouselRootEl = $state<HTMLElement | null>(null);
  let lightboxInstance = $state<any>(null);
  let glightboxLoaded = false;
  let glightboxCssLoaded = false;
  let domPurify = $state<
    (typeof import('dompurify'))['default'] | null
  >(null);
  let autoplayFactory = $state<EmblaAutoplayFactory | null>(
    null
  );
  let accessibilityFactory =
    $state<EmblaAccessibilityFactory | null>(null);
  let glightboxFactory:
    | ((options: Record<string, unknown>) => any)
    | null = null;
  let resizeTimer = 0;
  let lightboxSyncFrame1 = 0;
  let lightboxSyncFrame2 = 0;
  const preloadedSlideSrcs = new Set<string>();
  let visibilityObserver: IntersectionObserver | null =
    null;
  let isCarouselInViewport = $state(true);
  let lastLightboxTrigger =
    $state<HTMLButtonElement | null>(null);

  let prevButtonEl = $state<HTMLButtonElement | null>(null);
  let nextButtonEl = $state<HTMLButtonElement | null>(null);
  let dotsWrapperEl = $state<HTMLDivElement | null>(null);
  let liveRegionEl = $state<HTMLDivElement | null>(null);
  let mainThumbsViewportEl = $state<HTMLDivElement | null>(
    null
  );
  /** False until requestIdleCallback fires after LCP — keeps carousel JS off the critical path */
  let carouselReady = $state(false);

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

  const thumbsSettings = $derived<
    Required<EmblaThumbnails>
  >({
    enabled: false,
    position: 'bottom',
    visibleCount: 5,
    align: 'center',
    heightPx:
      thumbnails?.heightPx ?? thumbnails?.sizePx ?? 88,
    sizePx: thumbnails?.sizePx ?? 88,
    gapPx: 8,
    spacingPx: 8,
    hideBelowPx: 0,
    ...thumbnails,
  });

  const lightboxSettings = $derived({
    breakpoint: {
      hideBelowPx:
        lightbox?.breakpoint?.hideBelowPx ??
        lightbox?.hideBelowPx ??
        0,
    },
    effects: {
      open:
        lightbox?.effects?.open ??
        lightbox?.openEffect ??
        'fade',
      close:
        lightbox?.effects?.close ??
        lightbox?.closeEffect ??
        'fade',
      slide:
        lightbox?.effects?.slide ??
        lightbox?.slideEffect ??
        'fade',
    },
    interaction: {
      touchNavigation:
        lightbox?.interaction?.touchNavigation ??
        lightbox?.touchNavigation ??
        true,
      keyboardNavigation:
        lightbox?.interaction?.keyboardNavigation ??
        lightbox?.keyboardNavigation ??
        true,
      draggable:
        lightbox?.interaction?.draggable ??
        lightbox?.draggable ??
        true,
      zoomable:
        lightbox?.interaction?.zoomable ??
        lightbox?.zoomable ??
        true,
    },
    ui: {
      showCounter:
        lightbox?.ui?.showCounter ??
        lightbox?.showCounter ??
        true,
      descriptionPosition:
        lightbox?.ui?.descriptionPosition ??
        lightbox?.descriptionPosition ??
        'bottom',
      classNames: lightbox?.ui?.classNames ?? {},
    },
    media: {
      autoplayVideos:
        lightbox?.media?.autoplayVideos ??
        lightbox?.autoplayVideos ??
        true,
    },
  });

  const showMainThumbs = $derived(
    thumbsSettings.enabled &&
      (thumbsSettings.hideBelowPx <= 0 ||
        viewportWidth >= thumbsSettings.hideBelowPx) &&
      !(
        (thumbsSettings.position === 'left' ||
          thumbsSettings.position === 'right') &&
        viewportWidth < 768
      )
  );

  const lightboxHideBelowPx = $derived(
    lightboxSettings.breakpoint.hideBelowPx ?? 0
  );

  const showLightbox = $derived(
    lightboxHideBelowPx <= 0 ||
      viewportWidth >= lightboxHideBelowPx
  );

  const safeThumbsVisibleCount = $derived(
    Math.max(1, Math.round(thumbsSettings.visibleCount))
  );

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
    thumbsRoot: '',
    thumbsViewport: '',
    thumbsContainer: '',
    thumbButton: '',
    thumbActive: '',
    ...classNames,
  });

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

  const shouldUseAccessibility = $derived(
    featureSettings.announceChanges ||
      controlSettings.showPrevButton ||
      controlSettings.showNextButton ||
      controlSettings.showDots ||
      controlSettings.showStatus
  );

  const hasControlButtons = $derived(
    controlSettings.showPrevButton ||
      controlSettings.showPlayButton ||
      controlSettings.showNextButton
  );

  const mainOptions = $derived<EmblaOptionsType>({
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
    duration: 54,
  });

  const thumbsOptions = $derived<EmblaOptionsType>({
    loop: false,
    axis:
      thumbsSettings.position === 'left' ||
      thumbsSettings.position === 'right'
        ? 'y'
        : 'x',
    dragFree: false,
    containScroll: 'trimSnaps',
    draggable: true,
    focus: true,
    skipSnaps: false,
    duration: 34,
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
    });

  const plugins = $derived.by(() => {
    const result: EmblaPluginType[] = [];

    if (featureSettings.autoplay && autoplayFactory) {
      result.push(
        autoplayFactory({
          delay: featureSettings.autoplayDelayMs,
          defaultInteraction: false,
          stopOnLastSnap: false,
        })
      );
    }

    if (shouldUseAccessibility && accessibilityFactory) {
      result.push(
        accessibilityFactory(accessibilityOptions)
      );
    }

    return result;
  });

  const insideEdgeOffsetPx = $derived(
    Math.max(0, Math.round(insideEdgeOffset))
  );

  const transitionDurationSafe = $derived(
    Math.max(120, Math.round(transitionDurationMs))
  );

  const firstSlide = $derived(slides[0]);

  const firstSlideSrc = $derived(firstSlide?.src);

  const firstSlideSrcSet = $derived(firstSlide?.srcSet);

  const firstSlideSizes = $derived(
    firstSlide ? getImageSizes(firstSlide) : undefined
  );

  function clamp(index: number) {
    if (slides.length === 0) return 0;
    return Math.max(0, Math.min(index, slides.length - 1));
  }

  function getExternalOrigin(src?: string) {
    if (!src || !/^https?:\/\//i.test(src))
      return undefined;

    try {
      return new URL(src).origin;
    } catch {
      return undefined;
    }
  }

  function getSlideDimensions(slide: EmblaSlide) {
    return {
      width: slide.dimensions?.width ?? slide.width ?? 1200,
      height:
        slide.dimensions?.height ?? slide.height ?? 675,
    };
  }

  const frameAspectRatio = $derived.by(() => {
    const first = slides[0];
    if (!first) return 16 / 9;
    const d = getSlideDimensions(first);
    return d.width / d.height;
  });

  function getImageSizes(slide: EmblaSlide) {
    return (
      slide.sizes ??
      '(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 920px'
    );
  }

  function sanitizeText(value?: string) {
    if (!value) return undefined;
    const text = value.replace(/\s+/g, ' ').trim();
    return text.length > 0 ? text.slice(0, 180) : undefined;
  }

  function sanitizeLightboxWidth(value?: string) {
    if (!value) return undefined;
    const width = value.trim();
    const isAllowed =
      /^(\d+(?:\.\d+)?)(px|%|vw|vh|rem|em)?$/.test(width);
    return isAllowed ? width : undefined;
  }

  function sanitizeDescriptionHtml(value?: string) {
    if (!value) return undefined;

    if (typeof window === 'undefined') {
      const stripped = value
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return stripped.length > 0 ? stripped : undefined;
    }

    if (!domPurify) {
      const stripped = value
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return stripped.length > 0 ? stripped : undefined;
    }

    const template = document.createElement('template');
    template.innerHTML = domPurify.sanitize(value, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'b',
        'i',
        'u',
        'ul',
        'ol',
        'li',
        'a',
        'span',
        'code',
      ],
      ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
      ALLOW_UNKNOWN_PROTOCOLS: false,
      FORBID_TAGS: ['style', 'script'],
    });

    template.content
      .querySelectorAll<HTMLAnchorElement>('a')
      .forEach((anchor) => {
        const href = anchor.getAttribute('href') ?? '';
        const safeHref = getSafeHref(href, 'iframe');
        if (!safeHref) {
          anchor.removeAttribute('href');
        } else {
          anchor.setAttribute('href', safeHref);
        }

        if (anchor.getAttribute('target') === '_blank') {
          anchor.setAttribute(
            'rel',
            'noopener noreferrer nofollow'
          );
        }
      });

    const html = template.innerHTML
      .replace(/\s+/g, ' ')
      .trim();
    return html.length > 0 ? html : undefined;
  }

  function getClassTokens(value?: string) {
    return value?.split(/\s+/).filter(Boolean) ?? [];
  }

  function syncElementClasses(
    node: HTMLElement,
    storageKey: string,
    classNames?: string
  ) {
    const datasetKey = `embla${storageKey}`;
    const prevTokens = getClassTokens(
      node.dataset[datasetKey]
    );
    if (prevTokens.length > 0) {
      node.classList.remove(...prevTokens);
    }

    const nextTokens = getClassTokens(classNames);
    if (nextTokens.length > 0) {
      node.classList.add(...nextTokens);
      node.dataset[datasetKey] = nextTokens.join(' ');
      return;
    }

    delete node.dataset[datasetKey];
  }

  function getLightboxClassNames(slide?: EmblaSlide) {
    const g = lightboxSettings.ui.classNames ?? {};
    const s = slide?.lightboxContent?.classNames ?? {};
    return {
      overlay: cx(g.overlay, s.overlay),
      container: cx(g.container, s.container),
      title: cx(g.title, s.title),
      description: cx(g.description, s.description),
      descriptionWrap: cx(
        g.descriptionWrap,
        s.descriptionWrap
      ),
      descriptionInner: cx(
        g.descriptionInner,
        s.descriptionInner
      ),
    } satisfies EmblaLightboxUiClassNames;
  }

  function getSafeHref(
    href: string | undefined,
    type: 'image' | 'video' | 'iframe' | 'inline'
  ) {
    const raw = href?.trim();
    if (!raw) return undefined;

    if (type === 'inline') {
      const validIdRef = /^#[A-Za-z][\w:-]*$/.test(raw);
      if (!validIdRef) return undefined;
      if (typeof document !== 'undefined') {
        const exists = Boolean(document.querySelector(raw));
        return exists ? raw : undefined;
      }
      return raw;
    }

    const lower = raw.toLowerCase();
    if (
      lower.startsWith('javascript:') ||
      lower.startsWith('data:') ||
      lower.startsWith('vbscript:') ||
      lower.startsWith('file:')
    ) {
      return undefined;
    }

    try {
      const base =
        typeof window !== 'undefined'
          ? window.location.origin
          : 'https://example.local';
      const parsed = new URL(raw, base);
      const allowedProtocols = new Set([
        'http:',
        'https:',
        'blob:',
      ]);
      if (!allowedProtocols.has(parsed.protocol)) {
        return undefined;
      }
      return parsed.href;
    } catch {
      return undefined;
    }
  }

  function updateLightboxCounter(activeIndex = 0) {
    if (typeof document === 'undefined') return;

    const overlay =
      document.querySelector<HTMLElement>('.goverlay');
    if (!overlay) return;

    let counterEl = overlay.querySelector<HTMLElement>(
      '.embla-glb-counter'
    );

    if (!counterEl && lightboxSettings.ui.showCounter) {
      counterEl = document.createElement('div');
      counterEl.className = 'embla-glb-counter';
      overlay.appendChild(counterEl);
    }

    if (!counterEl) return;

    if (!lightboxSettings.ui.showCounter) {
      counterEl.style.display = 'none';
      counterEl.textContent = '';
      return;
    }

    counterEl.style.display = '';
    counterEl.textContent = `${Math.max(1, activeIndex + 1)} / ${Math.max(1, slides.length)}`;
  }

  function getAutoplayPlugin() {
    return (
      emblaApi?.plugins() as EmblaPluginRegistry | undefined
    )?.autoplay;
  }

  function getAccessibilityPlugin() {
    return (
      emblaApi?.plugins() as EmblaPluginRegistry | undefined
    )?.accessibility;
  }

  function setupAccessibilityUi() {
    const accessibility = getAccessibilityPlugin();
    if (!emblaApi || !accessibility) return;

    if (
      controlSettings.showPrevButton &&
      controlSettings.showNextButton &&
      prevButtonEl &&
      nextButtonEl
    ) {
      accessibility.setupPrevAndNextButtons?.(
        prevButtonEl,
        nextButtonEl
      );
    }

    if (controlSettings.showDots && dotsWrapperEl) {
      accessibility.setupDotButtons?.(dotsWrapperEl);
    }

    if (liveRegionEl) {
      accessibility.setupLiveRegion?.(liveRegionEl);
    }
  }

  function syncLightboxMetaVisibility(
    activeIndex?: number
  ) {
    if (typeof document === 'undefined') return;

    const currentIndex =
      activeIndex ?? Number(lightboxInstance?.index ?? 0);
    const currentSlide = slides[currentIndex];

    // No hideMetaBelowPx on the item → always show meta.
    const hideBelow =
      currentSlide?.lightboxContent?.hideMetaBelowPx;
    const canShowMeta =
      hideBelow == null ? true : viewportWidth >= hideBelow;

    const cn = getLightboxClassNames(currentSlide);

    const overlayNode =
      document.querySelector<HTMLElement>('.goverlay');
    if (overlayNode) {
      syncElementClasses(
        overlayNode,
        'OverlayClasses',
        cn.overlay
      );
    }

    const containerNode =
      document.querySelector<HTMLElement>('.gcontainer');
    if (containerNode) {
      syncElementClasses(
        containerNode,
        'ContainerClasses',
        cn.container
      );
    }

    const activeSlide = document.querySelector<HTMLElement>(
      '.goverlay .gslide.current, .goverlay .gslide.loaded.current'
    );
    const scope: ParentNode =
      activeSlide ??
      document.querySelector<HTMLElement>('.goverlay') ??
      document;

    const titleNodes =
      scope.querySelectorAll<HTMLElement>('.gslide-title');
    const descNodes =
      scope.querySelectorAll<HTMLElement>('.gslide-desc');

    titleNodes.forEach((node) => {
      const hasText = node.textContent?.trim().length !== 0;
      node.style.display =
        hasText && canShowMeta ? '' : 'none';
      syncElementClasses(node, 'TitleClasses', cn.title);
    });

    descNodes.forEach((node) => {
      const hasText = node.textContent?.trim().length !== 0;
      node.style.display =
        hasText && canShowMeta ? '' : 'none';
      syncElementClasses(
        node,
        'DescriptionClasses',
        cn.description
      );
    });

    document
      .querySelectorAll<HTMLElement>(
        activeSlide
          ? '.goverlay .gslide.current .gslide-description, .goverlay .gslide.loaded.current .gslide-description'
          : '.goverlay .gslide-description'
      )
      .forEach((node) => {
        const hasVisibleTitle = Boolean(
          node
            .querySelector<HTMLElement>('.gslide-title')
            ?.textContent?.trim()
        );
        const hasVisibleDesc = Boolean(
          node
            .querySelector<HTMLElement>('.gslide-desc')
            ?.textContent?.trim()
        );
        node.style.display =
          canShowMeta && (hasVisibleTitle || hasVisibleDesc)
            ? ''
            : 'none';
        syncElementClasses(
          node,
          'DescriptionWrapClasses',
          cn.descriptionWrap
        );

        const inner =
          node.querySelector<HTMLElement>('.gdesc-inner');
        if (inner) {
          syncElementClasses(
            inner,
            'DescriptionInnerClasses',
            cx(cn.descriptionWrap, cn.descriptionInner)
          );
        }
      });
  }

  function scheduleLightboxSync(activeIndex?: number) {
    if (lightboxSyncFrame1) {
      cancelAnimationFrame(lightboxSyncFrame1);
    }
    if (lightboxSyncFrame2) {
      cancelAnimationFrame(lightboxSyncFrame2);
    }

    lightboxSyncFrame1 = requestAnimationFrame(() => {
      lightboxSyncFrame1 = 0;
      lightboxSyncFrame2 = requestAnimationFrame(() => {
        lightboxSyncFrame2 = 0;
        syncLightboxMetaVisibility(activeIndex);
      });
    });
  }

  function preloadSlide(index: number) {
    const slide = slides[clamp(index)];
    const src = slide?.src;
    if (!src || preloadedSlideSrcs.has(src)) return;

    const image = new Image();
    if (slide.srcSet) image.srcset = slide.srcSet;
    image.sizes = getImageSizes(slide);
    image.src = src;
    preloadedSlideSrcs.add(src);
  }

  function preloadNearbySlides(index: number) {
    preloadSlide(index + 1);
    preloadSlide(index - 1);
  }

  function getLightboxElements() {
    return slides.map((slide) => {
      const lightboxTitle =
        slide.lightboxContent?.title ?? slide.lightboxTitle;
      const lightboxDescription =
        slide.lightboxContent?.description ??
        slide.lightboxDescription;
      const lightboxDescriptionPosition =
        slide.lightboxContent?.descriptionPosition ??
        slide.lightboxDescriptionPosition;

      const requestedType = slide.lightboxType ?? 'image';
      const requestedHref = slide.lightboxHref ?? slide.src;
      const safeRequestedHref = getSafeHref(
        requestedHref,
        requestedType
      );

      const fallbackImageHref = getSafeHref(
        slide.src,
        'image'
      );

      const resolvedHref =
        safeRequestedHref ?? fallbackImageHref;
      const resolvedType =
        safeRequestedHref != null ? requestedType : 'image';

      const element: Record<string, unknown> = {
        href: resolvedHref,
        type: resolvedType,
        title: sanitizeText(lightboxTitle),
        description: sanitizeDescriptionHtml(
          lightboxDescription
        ),
        descPosition:
          lightboxDescriptionPosition ??
          lightboxSettings.ui.descriptionPosition,
        width: sanitizeLightboxWidth(slide.lightboxWidth),
      };

      if (!element.title) delete element.title;
      if (!element.description) {
        delete element.description;
        delete element.descPosition;
      }
      if (element.width == null) delete element.width;

      if (!resolvedHref) {
        // Last-resort safe fallback keeps the slide index stable.
        element.href = '#';
        element.type = 'inline';
      }

      return element;
    });
  }

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

  function syncThumbsToMain() {
    if (!showMainThumbs || !thumbsApi || !emblaApi) return;
    syncingThumbsFromMain = true;
    const selected = emblaApi.selectedSnap();
    const maxSnap = Math.max(
      0,
      thumbsApi.snapList().length - 1
    );
    const isHorizontalThumbs =
      thumbsSettings.position === 'top' ||
      thumbsSettings.position === 'bottom';
    const centeredSnap = Math.max(
      0,
      Math.min(
        selected - Math.floor(safeThumbsVisibleCount / 2),
        maxSnap
      )
    );

    thumbsApi.goTo(
      isHorizontalThumbs ? centeredSnap : selected
    );
    queueMicrotask(() => {
      syncingThumbsFromMain = false;
      syncMainThumbToActive();
    });
  }

  function syncMainThumbToActive() {
    if (!showMainThumbs || !mainThumbsViewportEl) return;
    const active =
      mainThumbsViewportEl.querySelector<HTMLButtonElement>(
        '.embla__thumb.is-active'
      );
    const inlineMode =
      thumbsSettings.position === 'bottom' ||
      thumbsSettings.position === 'top'
        ? 'center'
        : 'nearest';
    active?.scrollIntoView({
      block: 'nearest',
      inline: inlineMode,
      behavior: 'smooth',
    });
  }

  function updateSlidesState() {
    if (!emblaApi) return;
    selectedSnap = emblaApi.selectedSnap();
    snapCount = emblaApi.snapList().length;

    const activeElement =
      typeof document !== 'undefined'
        ? document.activeElement
        : null;
    if (
      activeElement instanceof HTMLButtonElement &&
      activeElement.classList.contains(
        'embla__slide-hit'
      ) &&
      Number(activeElement.dataset.index ?? -1) !==
        selectedSnap
    ) {
      activeElement.blur();
    }

    syncThumbsToMain();
    queueMicrotask(syncMainThumbToActive);
  }

  function syncAutoplayState() {
    if (!emblaApi) return;

    const autoplay = getAutoplayPlugin();
    const accessibility = getAccessibilityPlugin();

    if (!autoplay) return;

    if (!isCarouselInViewport) {
      autoplay.stop?.();
      accessibility?.setUpdateLiveRegion?.(true);
      return;
    }

    if (!featureSettings.autoplay) {
      autoplay.stop?.();
      isAutoplayRunning = false;
      accessibility?.setUpdateLiveRegion?.(true);
      accessibility?.updateLiveRegion?.();
      return;
    }

    if (isAutoplayRunning) {
      autoplay.play?.();
      accessibility?.setUpdateLiveRegion?.(false);
      return;
    }

    autoplay.stop?.();
    accessibility?.setUpdateLiveRegion?.(true);
    accessibility?.updateLiveRegion?.();
  }

  function onEmblaInit(e: CustomEvent<EmblaCarouselType>) {
    emblaApi = e.detail;

    updateButtonStates();
    updateSlidesState();

    emblaApi.on('select', updateButtonStates);
    emblaApi.on('select', updateSlidesState);
    emblaApi.on('reinit', updateButtonStates);
    emblaApi.on('reinit', updateSlidesState);

    setupAccessibilityUi();
    isAutoplayRunning = featureSettings.autoplay;
    syncAutoplayState();
  }

  function onThumbsInit(e: CustomEvent<EmblaCarouselType>) {
    thumbsApi = e.detail;

    thumbsApi.on('select', () => {
      if (!emblaApi || syncingThumbsFromMain) return;
      const idx = thumbsApi?.selectedSnap() ?? 0;
      if (idx !== emblaApi.selectedSnap()) {
        emblaApi.goTo(idx);
      }
    });

    thumbsApi.on('reinit', syncThumbsToMain);
    syncThumbsToMain();

    // Ensure active thumb is visible on initial paint.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        syncThumbsToMain();
        syncMainThumbToActive();
      });
    });
  }

  async function ensureGlightbox() {
    if (typeof window === 'undefined' || !showLightbox)
      return null;

    if (!glightboxLoaded) {
      if (!glightboxCssLoaded) {
        await import('glightbox/dist/css/glightbox.css');
        glightboxCssLoaded = true;
      }
      const mod = await import('glightbox');
      glightboxFactory = mod.default;
      glightboxLoaded = true;
    }

    if (!lightboxInstance) {
      lightboxInstance = glightboxFactory?.({
        loop: featureSettings.loop,
        touchNavigation:
          lightboxSettings.interaction.touchNavigation,
        keyboardNavigation:
          lightboxSettings.interaction.keyboardNavigation,
        openEffect: lightboxSettings.effects.open,
        closeEffect: lightboxSettings.effects.close,
        slideEffect: lightboxSettings.effects.slide,
        draggable: lightboxSettings.interaction.draggable,
        zoomable: lightboxSettings.interaction.zoomable,
        counter: lightboxSettings.ui.showCounter,
        autoplayVideos:
          lightboxSettings.media.autoplayVideos,
        descPosition:
          lightboxSettings.ui.descriptionPosition,
      });

      lightboxInstance.on?.('open', () => {
        const idx = Number(lightboxInstance?.index ?? 0);
        const safeIdx = Number.isFinite(idx) ? idx : 0;
        updateLightboxCounter(safeIdx);
        // defer until GLightbox has rendered and settled active slide DOM nodes
        scheduleLightboxSync(safeIdx);
      });

      lightboxInstance.on?.(
        'slide_changed',
        (payload: { current?: { index?: number } }) => {
          const eventIndex = payload?.current?.index;
          const instanceIndex = Number(
            lightboxInstance?.index ?? 0
          );
          const idx = Number.isFinite(eventIndex)
            ? Number(eventIndex)
            : Number.isFinite(instanceIndex)
              ? instanceIndex
              : 0;
          updateLightboxCounter(idx);
          // defer until new slide DOM is rendered and marked current
          scheduleLightboxSync(idx);
        }
      );

      lightboxInstance.on?.('close', () => {
        if (typeof document === 'undefined') return;
        const counterEl = document.querySelector(
          '.goverlay .embla-glb-counter'
        );
        counterEl?.remove();
        queueMicrotask(() => {
          if (lastLightboxTrigger?.isConnected) {
            lastLightboxTrigger.focus();
          }
        });
      });
    }

    lightboxInstance.setElements(getLightboxElements());

    return lightboxInstance;
  }

  async function openLightbox(
    index: number,
    trigger?: HTMLButtonElement
  ) {
    trigger?.blur();
    lastLightboxTrigger = trigger ?? null;
    const instance = await ensureGlightbox();
    if (!instance) return;
    instance.openAt(clamp(index));
  }

  $effect(() => {
    if (typeof window === 'undefined') return;

    let cancelled = false;
    let idleTimer = 0;

    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const loadPlugins = async () => {
      if (featureSettings.autoplay && !autoplayFactory) {
        const mod = await import('embla-carousel-autoplay');
        if (cancelled) return;
        autoplayFactory = mod.default;
      }

      if (shouldUseAccessibility && !accessibilityFactory) {
        const mod =
          await import('embla-carousel-accessibility');
        if (cancelled) return;
        accessibilityFactory = mod.default;
      }
    };

    if (
      typeof idleWindow.requestIdleCallback === 'function'
    ) {
      idleTimer = idleWindow.requestIdleCallback(
        () => {
          void loadPlugins();
        },
        { timeout: 400 }
      );
    } else {
      idleTimer = window.setTimeout(() => {
        void loadPlugins();
      }, 200);
    }

    return () => {
      cancelled = true;
      if (
        typeof idleWindow.cancelIdleCallback === 'function'
      ) {
        idleWindow.cancelIdleCallback(idleTimer);
      } else {
        window.clearTimeout(idleTimer);
      }
    };
  });

  $effect(() => {
    if (!emblaApi) return;
    emblaApi.reInit(mainOptions, plugins);
    setupAccessibilityUi();
    updateButtonStates();
    updateSlidesState();
    syncAutoplayState();
  });

  $effect(() => {
    if (!thumbsApi) return;
    thumbsApi.reInit(thumbsOptions);
    syncThumbsToMain();
    queueMicrotask(syncMainThumbToActive);
  });

  $effect(() => {
    if (typeof window === 'undefined') return;

    const commitViewportWidth = () => {
      viewportWidth = Math.round(window.innerWidth);
    };

    const update = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(
        commitViewportWidth,
        120
      );
    };

    commitViewportWidth();
    window.addEventListener('resize', update);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', update);
    };
  });

  $effect(() => {
    if (slides.length < 2) return;
    preloadNearbySlides(selectedSnap);
  });

  $effect(() => {
    if (
      typeof window === 'undefined' ||
      !carouselRootEl ||
      !featureSettings.autoplay
    ) {
      return;
    }

    visibilityObserver?.disconnect();
    visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isCarouselInViewport =
          entry?.isIntersecting ?? true;
        syncAutoplayState();
      },
      { threshold: 0.2 }
    );

    visibilityObserver.observe(carouselRootEl);

    return () => {
      visibilityObserver?.disconnect();
      visibilityObserver = null;
    };
  });

  $effect(() => {
    if (!lightboxInstance) return;
    const idx = Number(
      lightboxInstance?.index ?? selectedSnap ?? 0
    );
    lightboxInstance.setElements(getLightboxElements());
    updateLightboxCounter(idx);
    scheduleLightboxSync(idx);
  });

  $effect(() => {
    if (showLightbox) return;
    lightboxInstance?.close?.();
  });

  onMount(() => {
    void import('dompurify').then((mod) => {
      domPurify = mod.default;
      if (lightboxInstance) {
        lightboxInstance.setElements(getLightboxElements());
      }
    });

    // ── Defer carousel activation until after LCP ───────────────────────────
    // The section renders a static first-slide image immediately (good for LCP);
    // the full Embla carousel initialises only once the browser is idle /
    // 200 ms have elapsed — whichever comes first.
    const idleWin = window as Window & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let lcpIdleHandle = 0;
    const activateCarousel = () => {
      carouselReady = true;
    };
    if (typeof idleWin.requestIdleCallback === 'function') {
      lcpIdleHandle = idleWin.requestIdleCallback(
        activateCarousel,
        {
          timeout: 500,
        }
      );
    } else {
      lcpIdleHandle = window.setTimeout(
        activateCarousel,
        200
      );
    }

    return () => {
      window.clearTimeout(resizeTimer);
      if (lightboxSyncFrame1) {
        cancelAnimationFrame(lightboxSyncFrame1);
      }
      if (lightboxSyncFrame2) {
        cancelAnimationFrame(lightboxSyncFrame2);
      }
      visibilityObserver?.disconnect();
      visibilityObserver = null;
      getAutoplayPlugin()?.stop?.();
      emblaApi?.off('select', updateButtonStates);
      emblaApi?.off('select', updateSlidesState);
      emblaApi?.off('reinit', updateButtonStates);
      emblaApi?.off('reinit', updateSlidesState);
      thumbsApi?.off('reinit', syncThumbsToMain);
      lightboxInstance?.destroy?.();
      lightboxInstance = null;
      if (
        typeof idleWin.cancelIdleCallback === 'function'
      ) {
        idleWin.cancelIdleCallback(lcpIdleHandle);
      } else {
        window.clearTimeout(lcpIdleHandle);
      }
    };
  });
</script>

<svelte:head>
  {#if firstSlideSrc}
    <link
      rel="preload"
      as="image"
      href={firstSlideSrc}
      imagesrcset={firstSlideSrcSet}
      imagesizes={firstSlideSizes}
    />
  {/if}

  {#if getExternalOrigin(firstSlideSrc)}
    <link
      rel="preconnect"
      href={getExternalOrigin(firstSlideSrc)}
    />
  {/if}
</svelte:head>

<div
  bind:this={carouselRootEl}
  class={cx('embla', classNameSettings.root)}
  style={`--embla-inside-edge: ${insideEdgeOffsetPx}px; --embla-thumbs-visible: ${safeThumbsVisibleCount}; --embla-thumb-size: ${thumbsSettings.sizePx}px; --embla-thumb-height: ${thumbsSettings.heightPx}px; --embla-thumb-gap: ${thumbsSettings.gapPx}px; --embla-thumb-spacing: ${thumbsSettings.spacingPx}px; --embla-frame-ratio: ${frameAspectRatio}; --embla-transition-ms: ${transitionDurationSafe};`}
  aria-label={title}
>
  {#snippet ControlsBlock()}
    <div
      class={cx(
        'embla__controls',
        layoutSettings.placement === 'inside'
          ? 'embla__controls--inside'
          : 'embla__controls--outside',
        layoutSettings.position === 'top'
          ? 'embla__controls--top'
          : layoutSettings.position === 'bottom'
            ? 'embla__controls--bottom'
            : 'embla__controls--middle',
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
              'embla__button',
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
              'embla__button embla__button--secondary',
              classNameSettings.playButton
            )}
            onclick={toggleAutoplay}
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
              'embla__button',
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

  {#snippet ThumbsBlock()}
    <div
      class={cx(
        'embla__thumbs',
        `embla__thumbs--${thumbsSettings.position}`,
        `embla__thumbs--align-${thumbsSettings.align}`,
        classNameSettings.thumbsRoot
      )}
    >
      <div
        class={cx(
          'embla__thumbs-viewport',
          classNameSettings.thumbsViewport
        )}
        bind:this={mainThumbsViewportEl}
        use:useEmblaCarousel={{ options: thumbsOptions }}
        onemblainit={onThumbsInit}
      >
        <div
          class={cx(
            'embla__thumbs-container',
            classNameSettings.thumbsContainer
          )}
        >
          {#each slides as slide, index}
            <button
              class={cx(
                'embla__thumb',
                selectedSnap === index && 'is-active',
                classNameSettings.thumbButton,
                selectedSnap === index &&
                  classNameSettings.thumbActive
              )}
              type="button"
              onclick={() => scrollTo(index)}
              aria-label={`Мініатюра ${index + 1}`}
            >
              <img
                src={slide.lowRes ?? slide.src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                tabindex="-1"
              />
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet CarouselViewport()}
    <div
      class={cx(
        'embla__viewport',
        classNameSettings.viewport
      )}
      use:useEmblaCarousel={{
        options: mainOptions,
        plugins,
      }}
      onemblainit={onEmblaInit}
    >
      <div
        class={cx(
          'embla__container',
          classNameSettings.container
        )}
      >
        {#each slides as slide, index}
          {@const slideDimensions =
            getSlideDimensions(slide)}
          {@const imageSizes = getImageSizes(slide)}
          <div
            style={`aspect-ratio: var(--embla-frame-ratio);`}
            class={cx(
              'embla__slide',
              selectedSnap === index &&
                'embla__slide--selected',
              classNameSettings.slide,
              selectedSnap === index &&
                classNameSettings.slideSelected
            )}
          >
            {#if showLightbox}
              <button
                class="embla__slide-hit"
                type="button"
                tabindex={selectedSnap === index ? 0 : -1}
                aria-label={`Відкрити слайд ${index + 1} у лайтбоксі`}
                data-index={index}
                onclick={(event) =>
                  openLightbox(
                    index,
                    event.currentTarget as HTMLButtonElement
                  )}
              >
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
                    sizes={imageSizes}
                    alt={slide.alt}
                    width={slideDimensions.width}
                    height={slideDimensions.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchpriority={index === 0
                      ? 'high'
                      : 'low'}
                    decoding="async"
                  />
                </picture>
              </button>
            {:else}
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
                  sizes={imageSizes}
                  alt={slide.alt}
                  width={slideDimensions.width}
                  height={slideDimensions.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchpriority={index === 0
                    ? 'high'
                    : 'low'}
                  decoding="async"
                />
              </picture>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    {#if hasControlButtons && layoutSettings.placement === 'inside'}
      {@render ControlsBlock()}
    {/if}

    {#if hasControlButtons && layoutSettings.placement === 'outside' && layoutSettings.position === 'middle'}
      {@render ControlsBlock()}
    {/if}
  {/snippet}

  {#if carouselReady && hasControlButtons && layoutSettings.placement === 'outside' && layoutSettings.position === 'top'}
    {@render ControlsBlock()}
  {/if}

  {#if carouselReady && showMainThumbs && thumbsSettings.position === 'top'}
    {@render ThumbsBlock()}
  {/if}

  <div
    class={cx(
      'embla__layout',
      `embla__layout--thumbs-${thumbsSettings.position}`
    )}
  >
    {#if carouselReady && showMainThumbs && thumbsSettings.position === 'left'}
      {@render ThumbsBlock()}
    {/if}

    <div
      class={cx('embla__stage', classNameSettings.stage)}
    >
      {#if !carouselReady}
        {#if firstSlide}
          {@const fd = getSlideDimensions(firstSlide)}
          <div
            class={cx(
              'embla__viewport',
              classNameSettings.viewport
            )}
          >
            <div class={cx('embla__container')}>
              <div
                style="aspect-ratio: var(--embla-frame-ratio);"
                class={cx(
                  'embla__slide',
                  'embla__slide--selected',
                  classNameSettings.slide,
                  classNameSettings.slideSelected
                )}
              >
                <picture>
                  {#if firstSlide.mobileSrc}
                    <source
                      media="(max-width: 640px)"
                      srcset={firstSlide.mobileSrc}
                    />
                  {/if}
                  {#if firstSlide.tabletSrc}
                    <source
                      media="(max-width: 1024px)"
                      srcset={firstSlide.tabletSrc}
                    />
                  {/if}
                  <img
                    class={cx(
                      'embla__image',
                      classNameSettings.image
                    )}
                    src={firstSlide.src}
                    srcset={firstSlide.srcSet}
                    sizes={firstSlideSizes}
                    alt={firstSlide.alt}
                    width={fd.width}
                    height={fd.height}
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          </div>
        {/if}
      {:else}
        {@render CarouselViewport()}
      {/if}
    </div>

    {#if carouselReady && showMainThumbs && thumbsSettings.position === 'right'}
      {@render ThumbsBlock()}
    {/if}
  </div>

  {#if carouselReady && showMainThumbs && thumbsSettings.position === 'bottom'}
    {@render ThumbsBlock()}
  {/if}

  {#if carouselReady && hasControlButtons && layoutSettings.placement === 'outside' && layoutSettings.position === 'bottom'}
    {@render ControlsBlock()}
  {/if}

  {#if carouselReady && controlSettings.showDots}
    <div
      bind:this={dotsWrapperEl}
      class={cx('embla__dots', classNameSettings.dots)}
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
          onclick={() => scrollTo(index)}
          aria-label={`Перейти до слайду ${index + 1}`}
        ></button>
      {/each}
    </div>
  {/if}

  {#if carouselReady && controlSettings.showStatus}
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
</div>
