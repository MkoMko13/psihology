<script>
  import BaseButton from '$shared/ui/buttons/BaseButton.svelte';
  import Main from '$shared/ui/layout/Main.svelte';
</script>

<Main>
  <section class="flex flex-col items-center bg-accent-300">
    <div
      class="relative z-1
      flex justify-center
      mfull320 w-full h-[400px] p-12"
    >
      <div
        class="absolute
        flex flex-col items-center justify-center gap-2
        w-full max-w-[700px] p-4 rounded-xl font-semibold text-center border bg-accent-300"
      >
        <div
          class="w-[400px] h-auto bg-[url('images/bg/peace.png')] bg-center bg-no-repeat bg-cover
          aspect-[16/9] rounded-xl"
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

  <section class="flex flex-col items-center">
    <div
      class="flex flex-wrap items-center justify-center gap-5
      w-full max-w-320 pt-20 bg-accent-50"
    >
      <h2 class="w-full text-h2 text-center font-semibold">
        Освіта
      </h2>

      <div
        class="w-full max-w-[600px] h-[400px] mr-3 bg-accent-300"
      ></div>
      <div class="flex flex-wrap gap-3 max-w-[400px]">
        <div
          class="flex justify-center items-center
          max-w-full p-8 rounded-xl bg-accent-300"
        >
          <p>
            2017-2020 НПУ ім. М. Драгоманова; Вчитель
            початкових класів, практичний психолог.
          </p>
        </div>

        <div
          class="flex justify-center items-center
          max-w-full rounded-xl p-8 bg-accent-300"
        >
          <p>
            2024-2025 магістратура Український державний
            університет ім. М. Драгоманова; факультет
            спеціальної та інклюзивної освіти, кафедра
            спеціальної психології та медицини, освітня
            програма “Клінічний психолог”
          </p>
        </div>
      </div>

      <BaseButton variant="primary"
        >Детальніше про освіту
      </BaseButton>
    </div>
  </section>
</Main>
