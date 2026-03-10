<script lang="ts">
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
  import { EmblaCarusel } from '$shared/ui';

  type EmblaSlide = {
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

  // import { H1, H2, Body1, Caption } from '@smui/typography';

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
  ];

  // const educationGalleryFeatures: Partial<ProductGalleryFeatures> =
  //   {
  //     heroTransitionDurationMs: 1120,
  //     modalSlideTransitionDurationMs: 1100,
  //   };

  const educationSlides: EmblaSlide[] =
    educationGalleryItems.map((item) => ({
      src: item.src,
      alt: item.alt ?? 'Зображення',
      width: item.width,
      height: item.height,
    }));

  const docsSlides: EmblaSlide[] = [
    {
      src: `${base}/images/docs/doc2.jpg`,
      alt: 'Сертифікат 2',
      width: 1600,
      height: 1100,
      mobileSrc: `${base}/images/docs/doc2.jpg`,
      tabletSrc: `${base}/images/docs/doc2.jpg`,
      lowRes: `${base}/images/docs/doc2.jpg`,
      sizes:
        '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 600px',
    },
    {
      src: `${base}/images/docs/doc4.jpg`,
      alt: 'Сертифікат 4',
      width: 1600,
      height: 1100,
      mobileSrc: `${base}/images/docs/doc4.jpg`,
      tabletSrc: `${base}/images/docs/doc4.jpg`,
      lowRes: `${base}/images/docs/doc4.jpg`,
    },
    {
      src: `${base}/images/docs/doc5.jpg`,
      alt: 'Сертифікат 5',
      width: 1600,
      height: 1100,
      mobileSrc: `${base}/images/docs/doc5.jpg`,
      tabletSrc: `${base}/images/docs/doc5.jpg`,
      lowRes: `${base}/images/docs/doc5.jpg`,
    },
  ];
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
        class="w-full max-w-[600px] max-h-[500px] mr-3 bg-accent-300"
      >
        <EmblaCarusel
          slides={docsSlides}
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
          animationEffect="fade"
          controlLayout={{
            placement: 'outside',
            position: 'middle',
          }}
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

      <div class="flex flex-wrap gap-3 max-w-[400px]">
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
      </div>

      <BaseButton variant="primary"
        >Детальніше про освіту
      </BaseButton>
    </div>
  </section>
</Main>
