/**
 * Build-time image processing for the docs/certificates gallery.
 *
 * Uses vite-imagetools to generate optimised WebP + AVIF variants at build
 * time instead of serving raw originals from static/.
 *
 * `as=picture` → { sources: Record<format, srcset>, img: { src, w, h } }
 * `as=url`     → URL string for a single size/format variant
 *
 * NOTE: images referenced here live in static/images/docs/ for now.  Moving
 * them to src/lib/assets/docs/ (and removing from static/) is the next step
 * so that only the processed outputs land in the build — no duplicates.
 */

import type { EmblaSlide } from '$widgets/mediaCarousel';

// ─── Full-quality images — 3 responsive widths, WebP + AVIF ──────────────────
// TS bundler mode may fail to resolve query-based asset imports in plain .ts
// files even though Vite handles them correctly during dev/build.
// @ts-expect-error Vite imagetools query import
import doc1 from './raw/doc1.jpg?w=640;1024;1200&format=webp;avif&as=picture';
// @ts-expect-error Vite imagetools query import
import doc2 from './raw/doc2.jpg?w=640;1024;1200&format=webp;avif&as=picture';
// @ts-expect-error Vite imagetools query import
import doc3 from './raw/doc3.jpg?w=640;1024;1200&format=webp;avif&as=picture';
// @ts-expect-error Vite imagetools query import
import doc4 from './raw/doc4.jpg?w=640;1024;1200&format=webp;avif&as=picture';
// @ts-expect-error Vite imagetools query import
import doc5 from './raw/doc5.jpg?w=640;1024;1200&format=webp;avif&as=picture';

// ─── Thumbnails — 200 px WebP (used by the thumb strip / lowRes field) ────────
// @ts-expect-error Vite imagetools query import
import doc1Thumb from './raw/doc1.jpg?w=200&format=webp&as=url';
// @ts-expect-error Vite imagetools query import
import doc2Thumb from './raw/doc2.jpg?w=200&format=webp&as=url';
// @ts-expect-error Vite imagetools query import
import doc3Thumb from './raw/doc3.jpg?w=200&format=webp&as=url';
// @ts-expect-error Vite imagetools query import
import doc4Thumb from './raw/doc4.jpg?w=200&format=webp&as=url';
// @ts-expect-error Vite imagetools query import
import doc5Thumb from './raw/doc5.jpg?w=200&format=webp&as=url';

// ─── Types ────────────────────────────────────────────────────────────────────

type Picture = typeof doc1;

// ─── Helper ───────────────────────────────────────────────────────────────────

function buildSlide(
  picture: Picture,
  lowRes: string,
  alt: string,
  lightboxContent?: EmblaSlide['lightboxContent']
): EmblaSlide {
  // picture.sources keys are format names e.g. 'webp', 'avif'
  // Each value is a responsive srcset string: "url 640w, url 1024w, url 1200w"
  const srcSet =
    picture.sources['webp'] ?? picture.sources['avif'];

  return {
    src: picture.img.src,
    alt,
    dimensions: {
      width: picture.img.w,
      height: picture.img.h,
    },
    srcSet,
    sizes:
      '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px',
    lowRes,
    ...(lightboxContent ? { lightboxContent } : {}),
  };
}

// ─── Exported slide data ──────────────────────────────────────────────────────

export const docsSlides: EmblaSlide[] = [
  buildSlide(doc1, doc1Thumb, 'Сертифікат 1', {
    title: 'Сертифікат 1',
  }),
  buildSlide(doc2, doc2Thumb, 'Сертифікат 2', {
    title: 'Сертифікат 2: Основний документ',
    description:
      '<p>Короткий</p> <p>опис<p/> із HTML-розміткою.',
    descriptionPosition: 'right',
  }),
  buildSlide(doc3, doc3Thumb, 'Сертифікат 3'),
  buildSlide(doc4, doc4Thumb, 'Сертифікат 4', {
    title: 'Сертифікат 4: Додатковий документ',
    description:
      'Опис слайду можна ввімкнути/вимкнути глобально в lightbox settings.',
    classNames: {
      title: '!font-bold !text-white',
      description: '!font-bold !text-white',
      descriptionWrap: 'rounded-xl bg-black/60 p-4',
    },
  }),
  buildSlide(doc5, doc5Thumb, 'Сертифікат 5', {
    description: 'Приклад слайду 5.',
  }),
];
