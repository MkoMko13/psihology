<script>
  import { base } from '$app/paths';
  import BaseButton from '$shared/ui/buttons/BaseButton.svelte';
  import Main from '$shared/ui/typography/Main.svelte';
  import Heading from '$shared/ui/typography/Heading.svelte';
  import ListItem from '$shared/ui/ListItem.svelte';
  import Carousel from '$shared/ui/Carousel.svelte';
  // import { H1, H2, Body1, Caption } from '@smui/typography';
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
      >
        <Carousel />
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
