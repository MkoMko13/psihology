export type GalleryItem = {
  src: string;
  width: number;
  height: number;
  thumbSrc?: string;
  alt?: string;
  caption?: string;
};

export type ProductGalleryFeatures = {
  // Core controls
  showCounter: boolean;
  showArrows: boolean;
  keyboardNavigation: boolean;
  loop: boolean;

  // Fancybox modal features
  zoom: boolean;
  fullscreen: boolean;
  thumbsInModal: boolean;
  caption: boolean;

  // Main gallery layout
  pageNavigation: boolean;
  heroPreview: boolean;
  thumbnails: boolean;

  // Layout sizing controls
  galleryMaxWidthPx: number;
  galleryGapPx: number;
  heroAspectRatio: string;
  heroMaxHeightPx: number;
  thumbnailMinWidthPx: number;
  thumbnailGapPx: number;
  thumbnailAspectRatio: string;
  thumbnailsVisibleCount: number;

  // Main image interaction
  swipeThresholdPx: number;

  // Animation controls
  modernUi: boolean;
  smoothHeroTransition: boolean;
  heroTransitionDurationMs: number;
  modalAnimationType: 'fade' | 'zoom';
  modalShowAnimationDurationMs: number;
  modalHideAnimationDurationMs: number;
  modalBackgroundOpacity: number;
};

// Centralized feature toggles and sizes for product gallery behavior.
export const productGalleryFeatures: ProductGalleryFeatures =
  {
    showCounter: true,
    showArrows: true,
    keyboardNavigation: true,
    loop: true,

    zoom: false,
    fullscreen: true,
    thumbsInModal: true,
    caption: true,

    pageNavigation: true,
    heroPreview: true,
    thumbnails: true,

    galleryMaxWidthPx: 800,
    galleryGapPx: 14,
    heroAspectRatio: '16 / 9',
    heroMaxHeightPx: 560,
    thumbnailMinWidthPx: 80,
    thumbnailGapPx: 12,
    thumbnailAspectRatio: '1 / 1',
    thumbnailsVisibleCount: 3,

    swipeThresholdPx: 44,

    modernUi: true,
    smoothHeroTransition: true,
    heroTransitionDurationMs: 520,
    modalAnimationType: 'fade',
    modalShowAnimationDurationMs: 280,
    modalHideAnimationDurationMs: 240,
    modalBackgroundOpacity: 0.92,
  };

// Gallery data source. You can replace this with API data later.
export const productGalleryItems: GalleryItem[] = [
  {
    src: '/images/docs/doc1.jpg',
    thumbSrc: '/images/docs/doc1.jpg',
    width: 1600,
    height: 1100,
    alt: 'Документ 1',
    caption: 'Документ 1',
  },
  {
    src: '/images/docs/doc2.jpg',
    thumbSrc: '/images/docs/doc2.jpg',
    width: 1600,
    height: 1100,
    alt: 'Документ 2',
    caption: 'Документ 2',
  },
  {
    src: '/images/docs/doc3.jpg',
    thumbSrc: '/images/docs/doc3.jpg',
    width: 1600,
    height: 1100,
    alt: 'Документ 3',
    caption: 'Документ 3',
  },
  {
    src: '/images/docs/doc4.jpg',
    thumbSrc: '/images/docs/doc4.jpg',
    width: 1600,
    height: 1100,
    alt: 'Документ 4',
    caption: 'Документ 4',
  },
  {
    src: '/images/docs/doc5.jpg',
    thumbSrc: '/images/docs/doc5.jpg',
    width: 1600,
    height: 1100,
    alt: 'Документ 5',
    caption: 'Документ 5',
  },
];

// Backward-compatible aliases used by existing imports.
export const photoSwipeFeatures = productGalleryFeatures;
export const photoSwipeItems = productGalleryItems;
export type PhotoSwipeFeatures = ProductGalleryFeatures;
