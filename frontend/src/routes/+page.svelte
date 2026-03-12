<script lang="ts">
  import { base } from '$app/paths';

  // Other libraries
  import PhotoSwipe from '$shared/ui/PhotoSwipe.svelte';
  import { EmblaCarusel } from '$widgets/mediaCarousel';
  import BitAccordion from '$widgets/accordeon/BitAccordion.svelte';

  // My libraries
  import Main from '$shared/ui/typography/Main.svelte';
  import Heading from '$shared/ui/typography/Heading.svelte';
  import BaseButton from '$shared/ui/buttons/BaseButton.svelte';
  import ListItem from '$shared/ui/ListItem.svelte';
  import { docsSlides, docsGalleryItems } from '$lib/assets/docs';
  import Section from '$shared/ui/typography/Section.svelte';
  // Types
  import type {
    GalleryItem,
    ProductGalleryFeatures,
  } from '$shared/config';

  // ICONS
  import {
    GraduationCap,
    BookOpen,
    School,
  } from '@lucide/svelte';
  import Container from '$shared/ui/typography/Container.svelte';
  // Assets (imagetools)
  import { linesBg, peaceBg, nataliaPicture } from '$lib/assets/images';

  // DATA
  // PhotoSwipe
  const educationGalleryItems: GalleryItem[] = docsGalleryItems;

  const educationGalleryFeatures: Partial<ProductGalleryFeatures> =
    {
      heroTransitionDurationMs: 1120,
      modalSlideTransitionDurationMs: 1100,
    };
  // Embla
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

  // Accordeon
  const accordionItems = [
    {
      content: `✔ Курс “Турбота про психічне здоров’я дітей та молоді (з основами КПТ)” (Український інститут когнітивно-поведінкової терапії, річна програма вересень 2024-червень 2025).`,
    },
    {
      content: `✔ Курс “КПТ модель консультування та супроводу при пережитті втрати” (Український інститут когнітивно-поведінкової терапії, червень 2024).`,
    },
    {
      content: `✔ Курс “КПТ модель плекання психологічної стійкості” (Український інститут когнітивно-поведінкової терапії, березень 2024).`,
    },
    {
      content: `✔ Тренінг “Впровадження НМВ суб’єктів, які здійснюють заходи у сфері протидії торгівлі людьми в Житомирській області. Регіональний компонент в Житомирському районі” (ГО “ЖІКЦ”, USAID, ООН, MOM) (22-23 листопада 2023).`,
    },
    {
      content: `✔ СЕРТИФІКАТ attended the online training course Psychological First Aid for GBV Survivors and Effective Referrals (23 June 2023).`,
    },
    {
      content: `✔ Тренінг для тренерів “Гендерно зумовлене насильство: психосоціальна підтримка” (в проєкті “Впровадження для фахівців сфери охорони здоров’я та соціальних працівників в Житомирській області освітніх та тренінгових програм для подолання психосоціальних та медичних травм у жертв сексуального насильства/ПТСР”, який реалізується ГО “ЖІКЦ” за підтримки Посольства Фінляндії в Україні).`,
    },
    {
      content: `✔ Онлайн-тренінги «Методи та техніки самодопомоги в стресових ситуаціях» (у рамках проєкту «Твоє право знати. Твоє право обирати захист» згідно з Угодою ГО «Жіночий інформаційно-консультаційний центр» з Міжнародним Медичним Корпусом, лютий 2023).`,
    },
    {
      content: `✔ Онлайн-тренінги проєкту “Розбудова потенціалу організацій для запобігання та захисту жінок і дівчат від ґендерно зумовленого насильства» ВГО «Жіночий консорціум України» за підтримки Міжнародного медичного корпусу, USAID:`,
    },
    {
      content: `✔ «Попередження, запобігання гендерно зумовленого насильства», 8, 9 грудня 2022 р.`,
    },
    {
      content: `✔ «Надання першої психологічної допомоги жінкам в умовах надзвичайних ситуацій», 14, 21 грудня 2022 р.`,
    },
    {
      content: `✔ «Принцип не нашкодь», 11, 18 січня 2023 р.`,
    },
    {
      content: `✔ «Впровадження механізму отримання зворотного зв’язку від клієнток організацій», 30, 31 січня 2023 р.`,
    },
    {
      content: `✔ «Створення та впровадження механізму перенаправлення», 9, 10 лютого 2023 р.`,
    },
    {
      content: `✔ Тренінг для менторів_ок програми UPSHIFT (Дитячий фонд ООН (ЮНІСЕФ) (жовтень, 2022).`,
    },
    {
      content: `✔ Авторський курс з практичної психології «Особливості використання метафоричних асоціативних карт в психологічному консультуванні». Сертифікат (Житомир, 2018).`,
    },
  ];
  //NEW
  const icons = ['⭐', '🔥', '🌟'];
  const educationContent = {
    text: [
      '2017-2020 НПУ ім. М. Драгоманова; Вчитель початкових класів, практичний психолог.',
      '2024-2025 магістратура Український державнийуніверситет ім. М. Драгоманова; факультет спеціальної та інклюзивної освіти, кафедра спеціальної психології та медицини, освітня програма “Клінічний психолог”',
    ],
  };
  // Experiens DATA
  const experiensContent = {
    listItems: [
      'з вересня 2023 – операторка і психологиня чат-бота Unsee (онлайн-механізму подання повідомлень для боротьби з онлайн-насильством щодо/серед дітей) у проєкті “Розширення можливостей правоохоронних органів у подоланні насильства щодо дітей в Інтернеті”, який впроваджується ВБО “Український фонд “Благополуччя дітей” за фінансової підтримки Європейського Союзу;',

      'червень 2023-серпень 2023 – тренерка із психосоціальної підтримки при гендерно зумовленому насильстві в проєкті “Впровадження для фахівців сфери охорони здоров’я та соціальних працівників в Житомирській області освітніх та тренінгових програм для подолання психосоціальних та медичних травм у жертв сексуального насильства/ПТСР”, який реалізується ГО “ЖІКЦ” за підтримки Посольства Фінляндії в Україні.',
    ],
    icons: [GraduationCap, BookOpen, School],
  };
</script>

<Main id="main">
  <Section
    style={`--lines-bg: url('${linesBg}')`}
    className="relative overflow-hidden
      before:z-1
      before:content-['']
      before:absolute
      before:-top-20 before:bg-top
      before:-left-[20%]
      before:w-[50%] before:h-[110%]
      before:[background-image:var(--lines-bg)] before:bg-no-repeat before:rotate-[30deg]
      "
  >
    <div
      style={`--lines-bg: url('${linesBg}')`}
      class="overflow-hidden
      before:-z-1
      before:content-['']
      before:absolute
      before:-top-0 before:bg-top
      before:-right-[8%]
      before:w-[50%] before:h-[110%]
      before:[background-image:var(--lines-bg)] before:bg-no-repeat before:rotate-[-35deg]"
    >
      <div
        class="relative z-1
        flex flex-col items-center gap-3
        w-full max-w-[700px]"
      >
        <div
          style={`background-image: url('${peaceBg}')`}
          class="flex flex-col items-center justify-center gap-2
          w-full min-h-[300px]
          font-bold text-center
          border rounded-xl
          text-content-primary
          bg-cover bg-top"
        ></div>
        <div
          class="flex flex-col items-center gap-3 text-center"
        >
          <p
            class="odd:text-black even:text-secondaryLight font-bold text-base"
          >
            ВІДЧУВАЄТЕ, ЩОСЬ НЕ ТАК… ХОЧЕТЕ ПОЗИТИВНИХ ЗМІН
            У ЖИТТІ?!
          </p>
          <p
            class="odd:text-black even:text-secondaryLight font-bold text-sm"
          >
            ВАШІ ДУМКИ, ЕМОЦІЇ, ВІДЧУТТЯ У ТІЛІ ТА ПОВЕДІНКА
            — УСЕ ЦЕ ВЗАЄМОПОВ’ЯЗАНО!
          </p>
          <p
            class="odd:text-black even:text-secondaryLight font-bold text-sm"
          >
            ЗАПИШІТЬСЯ НА КОНСУЛЬТАЦІЮ ДО МЕНЕ, ПСИХОЛОГИНІ,
            ЯКА КОНСУЛЬТУЄ У МЕТОДІ КОГНІТИВНО-ПОВЕДІНКОВОЇ
            ТЕРАПІЇ НИЗЬКОЇ ІНТЕНСИВНОСТІ
          </p>
          <p
            class="odd:text-black even:text-secondaryLight font-bold text-base"
          >
            ПОЧНІТЬ ТВОРИТИ СВОЄ ЩАСЛИВЕ СЬОГОДНІ!
          </p>
          <BaseButton size="lg"
            >Записатися на консультацію</BaseButton
          >
        </div>
      </div>
    </div>
  </Section>

  <Section id="education" className="bg-lightBg">
    <Heading level={2} className="mb-8">Освіта</Heading>
    <div
      class="flex flex-wrap items-center justify-center gap-5
      max-w-screen-xl"
    >
      <!-- <div
        class="max-w-[600px] max-h-[500px] mr-3 bg-accent-300"
      > -->
      <EmblaCarusel
        slides={docsSlides}
        transitionDurationMs={1300}
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
          autoplay: true,
          autoplayDelayMs: 7000,
          announceChanges: false,
        }}
        controlLayout={{
          placement: 'outside',
          position: 'middle',
        }}
        thumbnails={{
          enabled: false,
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
          root: 'max-w-180',
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
      <!-- </div> -->

      <ul class="flex flex-col gap-3 max-w-[400px] pl-7">
        <ListItem
          children={educationContent.text}
          direction="left"
          // gap={20}
          // {icons}
        />
      </ul>

      <BitAccordion
        accordTitle="Детальніше про освіту"
        items={accordionItems}
        className="w-full"
      />

      <!-- <div class="basis-full w-full min-w-0 max-w-[800px]">
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
      </div> -->
    </div>
  </Section>

  <Section>
    <Container>
      <Heading level={2} className="mb-8">Досвід</Heading>
      <div
        class="flex flex-wrap justify-center gap-15 items-center max-w-screen-xl"
      >
        <ul class="flex flex-col gap-3 max-w-[600px]">
          <ListItem
            children={experiensContent.listItems}
            icons={experiensContent.icons}
            direction="left"
            className="bg-lightBg rounded-xl px-5 py-2"
            iconSize={75}
            gap={25}
          />
        </ul>
        <div
          class="relative  max-w-100
          before:-z-10
          before:content-['']
          before:absolute
          before:-right-4 before:-bottom-4
          before:w-[100%] before:h-full
          before:bg-gradient-to-b before:from-[#BCA66D] before:via-white before:to-[#BCA66D]
          before:rounded-full
          before:shadow-[0_0_10px_rgba(0,0,0,0.55)]
          before:rounded-tl-[50%] before:rounded-bl-[50%] before:rounded-tr-[50px] before:rounded-br-[50px]"
        >
          <picture>
  <source
    srcset={nataliaPicture.sources.avif}
    type="image/avif"
  />
  <source
    srcset={nataliaPicture.sources.webp}
    type="image/webp"
  />
  <img
    alt=""
    src={nataliaPicture.img.src}
    width={nataliaPicture.img.w}
    height={nataliaPicture.img.h}
    class="rounded-tl-[100%] rounded-bl-[110%] rounded-tr-[120px] rounded-br-[85px]"
  />
</picture>
        </div>
      </div>
    </Container>
  </Section>

  <Section id="consultation">
    <Container className="flex gap-4">
      <div
        class="flex flex-col gap-3 items-center
            max-w-80 py-8 px-5
            bg-secBg rounded-2xl"
      >
        <Heading level={3}>Домовленість</Heading>
        <p>
          Цей документ визначає основні правила співпраці
          між психологом та клієнтом, описує права та
          обов’язки сторін, а також етичні принципи надання
          психологічної допомоги. Він допомагає зрозуміти,
          як відбуватиметься процес консультацій і що
          очікувати від взаємодії.
        </p>
        <a href={`${base}/`} class="self-start mt-auto"
          >Читати далі</a
        >
      </div>
      <div
        class="flex flex-col gap-3 items-center
          max-w-80 py-8 px-5
          bg-secBg rounded-2xl"
      >
        <Heading level={3}
          >Як підготуватися до консультації</Heading
        >
        <p>
          Підготовка до консультації допомагає максимально
          ефективно використати час сеансу. Тут описані
          рекомендації, як сформулювати питання, підготувати
          власні думки та очікування, а також як створити
          комфортне середовище для роботи з психологом.
        </p>
        <a href={`${base}/`} class="self-start mt-auto"
          >Читати далі</a
        >
      </div>
      <div
        class="flex flex-col gap-3 items-center
          max-w-80 py-8 px-5
          bg-secBg rounded-2xl"
      >
        <Heading level={3}>Вартість і оплата</Heading>
        <p>
          У цьому розділі детально описані тарифи на
          психологічні послуги, можливі способи оплати,
          умови скасування та перенесення сеансів. Це
          допомагає клієнту планувати консультації та
          уникати непорозумінь щодо фінансових питань.
        </p>
        <a href={`${base}/`} class="self-start mt-auto"
          >Читати далі</a
        >
      </div>
    </Container>
  </Section>
</Main>























