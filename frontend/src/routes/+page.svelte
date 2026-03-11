<script lang="ts">
  import { text } from '@sveltejs/kit';
  import { base } from '$app/paths';
  import BaseButton from '$shared/ui/buttons/BaseButton.svelte';
  import type {
    GalleryItem,
    ProductGalleryFeatures,
  } from '$shared/config';
  import Main from '$shared/ui/typography/Main.svelte';
  import Heading from '$shared/ui/typography/Heading.svelte';
  import ListItem from '$shared/ui/ListItem.svelte';
  import PhotoSwipe from '$shared/ui/PhotoSwipe.svelte';
  import { EmblaCarusel } from '$widgets/mediaCarousel';
  import type { EmblaSlide } from '$widgets/mediaCarousel';

  const educationGalleryItems: GalleryItem[] = [
    {
      src: `${base}/images/docs/doc1.jpg`,
      thumbSrc: `${base}/images/docs/doc1.jpg`,
      width: 1600,
      height: 1100,
      alt: 'Документ 1',
      caption: 'Документ 1',
    },
    {
      src: `${base}/images/docs/doc2.jpg`,
      thumbSrc: `${base}/images/docs/doc2.jpg`,
      width: 1600,
      height: 1100,
      alt: 'Документ 2',
      caption: 'Документ 2',
    },
    {
      src: `${base}/images/docs/doc3.jpg`,
      thumbSrc: `${base}/images/docs/doc3.jpg`,
      width: 1600,
      height: 1100,
      alt: 'Документ 3',
      caption: 'Документ 3',
    },
    {
      src: `${base}/images/docs/doc4.jpg`,
      thumbSrc: `${base}/images/docs/doc4.jpg`,
      width: 1600,
      height: 1100,
      alt: 'Документ 4',
      caption: 'Документ 4',
    },
    {
      src: `${base}/images/docs/doc5.jpg`,
      thumbSrc: `${base}/images/docs/doc5.jpg`,
      width: 1600,
      height: 1100,
      alt: 'Документ 5',
      caption: 'Документ 5',
    },
    {
      src: `${base}/images/docs/doc5.jpg`,
      thumbSrc: `${base}/images/docs/doc5.jpg`,
      width: 1600,
      height: 1100,
      alt: 'Документ 5',
      caption: 'Документ 5',
    },
  ];
  const educationGalleryFeatures: Partial<ProductGalleryFeatures> =
    {
      heroTransitionDurationMs: 1120,
      modalSlideTransitionDurationMs: 1100,
    };

  // const educationSlides: EmblaSlide[] =
  //   educationGalleryItems.map((item) => ({
  //     src: item.src,
  //     alt: item.alt ?? 'Зображення',
  //     dimensions:
  //       item.width && item.height
  //         ? { width: item.width, height: item.height }
  //         : undefined,
  //   }));

  const docDimensions = {
    width: 1600,
    height: 1100,
  } as const;

  const docsSlides: EmblaSlide[] = [
    {
      src: `${base}/images/docs/doc2.jpg`,
      alt: 'Сертифікат 2',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc2.jpg`,
      tabletSrc: `${base}/images/docs/doc2.jpg`,
      lowRes: `${base}/images/docs/doc2.jpg`,
      sizes:
        '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 600px',
      lightboxContent: {
        title: 'Сертифікат 2: Основний документ',
        description:
          '<p>Короткий</p> <p>опис<p/> із HTML-розміткою.',
        descriptionPosition: 'right',
      },
    },
    {
      src: `${base}/images/docs/doc4.jpg`,
      alt: 'Сертифікат 4',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc4.jpg`,
      tabletSrc: `${base}/images/docs/doc4.jpg`,
      lowRes: `${base}/images/docs/doc4.jpg`,
      lightboxContent: {
        title: 'Сертифікат 4: Додатковий документ',
        description:
          'Опис слайду можна ввімкнути/вимкнути глобально в lightbox settings.',
        classNames: {
          // optional: item-level класи тільки для цього слайду
          // overlay: 'bg-white!',                               // optional: .goverlay
          // container: 'flex justify-center max-w-[70%]', // optional: .gcontainer
          title: '!font-bold !text-white', // optional: .gslide-title
          description: '!font-bold !text-white', // optional: .gslide-desc
          descriptionWrap: 'rounded-xl bg-black/60 p-4', // optional: .gslide-description + .gdesc-inner
          // descriptionInner: 'border border-white/20', // optional: .gdesc-inner
        },
      },
    },
    {
      src: `${base}/images/docs/doc5.jpg`,
      alt: 'Сертифікат 5',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc5.jpg`,
      tabletSrc: `${base}/images/docs/doc5.jpg`,
      lowRes: `${base}/images/docs/doc5.jpg`,
      lightboxType: 'video',
      lightboxHref:
        'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      lightboxContent: {
        description:
          'Приклад video slide (YouTube) у GLightbox.',
      },
    },
    {
      src: `${base}/images/docs/doc2.jpg`,
      alt: 'Сертифікат 2',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc2.jpg`,
      tabletSrc: `${base}/images/docs/doc2.jpg`,
      lowRes: `${base}/images/docs/doc2.jpg`,
      sizes:
        '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 600px',
    },
    {
      src: `${base}/images/docs/doc4.jpg`,
      alt: 'Сертифікат 4',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc4.jpg`,
      tabletSrc: `${base}/images/docs/doc4.jpg`,
      lowRes: `${base}/images/docs/doc4.jpg`,
    },
    {
      src: `${base}/images/docs/doc5.jpg`,
      alt: 'Сертифікат 5',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc5.jpg`,
      tabletSrc: `${base}/images/docs/doc5.jpg`,
      lowRes: `${base}/images/docs/doc5.jpg`,
      lightboxType: 'iframe',
      lightboxHref: 'https://example.com',
      lightboxContent: {
        description:
          'Приклад iframe (можна замінити на Google Maps або власну сторінку).',
      },
    },
    {
      src: `${base}/images/docs/doc4.jpg`,
      alt: 'Сертифікат 4',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc4.jpg`,
      tabletSrc: `${base}/images/docs/doc4.jpg`,
      lowRes: `${base}/images/docs/doc4.jpg`,
      lightboxType: 'inline',
      lightboxHref: '#inline-lightbox-content',
      lightboxContent: {
        description:
          'Inline content з елемента на поточній сторінці.',
      },
    },
    {
      src: `${base}/images/docs/doc5.jpg`,
      alt: 'Сертифікат 5',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc5.jpg`,
      tabletSrc: `${base}/images/docs/doc5.jpg`,
      lowRes: `${base}/images/docs/doc5.jpg`,
    },
    {
      src: `${base}/images/docs/doc4.jpg`,
      alt: 'Сертифікат 4',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc4.jpg`,
      tabletSrc: `${base}/images/docs/doc4.jpg`,
      lowRes: `${base}/images/docs/doc4.jpg`,
    },
    {
      src: `${base}/images/docs/doc5.jpg`,
      alt: 'Сертифікат 5',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc5.jpg`,
      tabletSrc: `${base}/images/docs/doc5.jpg`,
      lowRes: `${base}/images/docs/doc5.jpg`,
    },
    {
      src: `${base}/images/docs/doc4.jpg`,
      alt: 'Сертифікат 4',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc4.jpg`,
      tabletSrc: `${base}/images/docs/doc4.jpg`,
      lowRes: `${base}/images/docs/doc4.jpg`,
    },
    {
      src: `${base}/images/docs/doc5.jpg`,
      alt: 'Сертифікат 5',
      dimensions: docDimensions,
      mobileSrc: `${base}/images/docs/doc5.jpg`,
      tabletSrc: `${base}/images/docs/doc5.jpg`,
      lowRes: `${base}/images/docs/doc5.jpg`,
    },
  ];

  const emblaLightboxSettings = {
    breakpoint: {
      hideBelowPx: 320,
    },
    effects: {
      open: 'fade' as const,
      close: 'fade' as const,
      slide: 'fade' as const,
    },
    interaction: {
      touchNavigation: true,
      keyboardNavigation: true,
      draggable: true,
      zoomable: true,
    },
    ui: {
      showCounter: true,
      // Global default for description position.
      // Any item can override via lightboxContent.descriptionPosition.
      descriptionPosition: 'bottom' as const,
      // Custom CSS classes injected into GLightbox DOM elements.
      // classNames: {
      //   overlay: '',          // .goverlay
      //   container: '',        // .gcontainer
      //   title: '',            // .gslide-title
      //   description: '',      // .gslide-desc
      //   descriptionWrap: '',  // .gslide-description (wrapper)
      // },
    },
    media: {
      autoplayVideos: false,
    },
  };
</script>

<Main>
  <section class="flex flex-col items-center bg-page-bg">
    <div
      class="relative z-1
        flex justify-center
        mfull320 w-full h-[400px] p-12"
    >
      <div
        class="absolute
          flex flex-col items-center justify-center gap-2
          w-full max-w-[700px] p-4
          font-semibold text-center
          border rounded-xl
          bg-muted-accent text-content-primary"
      >
        <div
          class="w-[400px] h-auto
            bg-fixed bg-top bg-no-repeat bg-contain
            aspect-video rounded-xl"
          style={`background-image: url('${base}/images/bg/peace.png');`}
        ></div>
        <p>
          ВІДЧУВАЄТЕ, ЩОСЬ НЕ ТАК… ХОЧЕТЕ ПОЗИТИВНИХ ЗМІН У
          ЖИТТІ?!
        </p>
        <p>
          ВАШІ ДУМКИ, ЕМОЦІЇ, ВІДЧУТТЯ У ТІЛІ ТА ПОВЕДІНКА —
          УСЕ ЦЕ ВЗАЄМОПОВ’ЯЗАНО!
        </p>
        <p>
          ЗАПИШІТЬСЯ НА КОНСУЛЬТАЦІЮ ДО МЕНЕ, ПСИХОЛОГИНІ,
          ЯКА КОНСУЛЬТУЄ У МЕТОДІ КОГНІТИВНО-ПОВЕДІНКОВОЇ
          ТЕРАПІЇ НИЗЬКОЇ ІНТЕНСИВНОСТІ
        </p>
        <p>ПОЧНІТЬ ТВОРИТИ СВОЄ ЩАСЛИВЕ СЬОГОДНІ!</p>
      </div>
    </div>
  </section>

  <section class="flex flex-col items-center bg-accent-100">
    <div
      class="flex flex-wrap items-center justify-center gap-5
        w-full max-w-320 pt-20"
    >
      <Heading level={2}>Освіта</Heading>

      <div
        class="w-full max-w-[600px] max-h-[500px] mr-3 bg-accent-300"
      ></div>

      <div
        class="w-full max-w-[500px] max-h-[500px] mr-3 bg-accent-300"
      >
        <EmblaCarusel
          slides={docsSlides}
          transitionDurationMs={1000}
          title="Галерея сертифікатів"
          controls={{
            showPrevButton: true,
            showNextButton: true,
            showPlayButton: false,
            showDots: true,
            showStatus: false,
            spreadSideButtons: true,
          }}
          features={{
            autoplay: false,
            autoplayDelayMs: 3500,
            announceChanges: false,
          }}
          controlLayout={{
            placement: 'outside',
            position: 'middle',
          }}
          thumbnails={{
            enabled: true,
            position: 'bottom',
            visibleCount: 4,
            align: 'center',
            heightPx: 80,
            sizePx: 100,
            gapPx: 8,
            spacingPx: 1,
            hideBelowPx: 700,
          }}
          lightbox={emblaLightboxSettings}
          insideEdgeOffset={202}
          classNames={{
            root: 'custom-embla-root',
            controls: 'custom-embla-controls',
            prevButton: 'custom-embla-prev',
            nextButton: 'custom-embla-next',
            playButton: 'custom-embla-play',
            dots: 'custom-embla-dots',
            dot: 'custom-embla-dot',
            dotActive: 'custom-embla-dot-active',
            status: 'custom-embla-status',
          }}
        />
      </div>

      <!-- <div class="flex flex-wrap gap-3 max-w-[400px]">
        <ListItem>
          2017-2020 НПУ ім. М. Драгоманова; Вчитель
          початкових класів, практичний психолог.
        </ListItem>
        <ListItem>
          2024-2025 магістратура Український державний
          університет ім. М. Драгоманова; факультет
          спеціальної та інклюзивної освіти, кафедра
          спеціальної психології та медицини, освітня
          програма “Клінічний психолог”
        </ListItem>
      </div> -->

      <BaseButton variant="primary"
        >Детальніше про освіту
      </BaseButton>
      <div class="basis-full w-full min-w-0 max-w-[800px]">
        <PhotoSwipe
          items={educationGalleryItems}
          features={educationGalleryFeatures}
          // classNames={{
          //   root: 'rounded-xl',
          //   heroWrap: 'my-hero-wrap',
          //   heroImage: 'overflow-hidden',
          //   prevNav: 'bg-white/80',
          //   nextNav: 'bg-white/80',
          //   thumbStrip: 'mt-2',
          //   thumbTrack: 'shadow-sm',
          //   thumbCard: 'border-slate-300',
          //   thumbCardActive: 'ring-2 ring-blue-500',
          // }}
        />
      </div>
    </div>
  </section>
</Main>

<div id="inline-lightbox-content" style="display:none">
  <div
    class="p-6 bg-page-bg text-content-primary rounded-lg"
  >
    <h3 class="text-xl font-semibold mb-2">
      Inline Контент Для GLightbox
    </h3>
    <p>
      Цей блок відкривається як <code>type: 'inline'</code>.
      Можна розміщувати будь-який HTML.
    </p>
  </div>
</div>
