<script>
  import { base } from '$app/paths';
</script>

<header
  class="fixed z-2
    flex justify-center w-full
    bg-page-bg shadow-md shadow-black/25"
>
  <div
    class="flex justify-between items-center
      py-2 w-full max-w-7xl"
  >
    <div class="flex items-center gap-4">
      <div
        class="relative
          before:absolute before:content-['']
          before:left-1/2 before:top-1/2
          before:-translate-x-1/2 before:-translate-y-1/2
          before:w-[85px] before:h-[85px]
          before:bg-white before:rounded-[50%]"
      >
        <img
          src="{base}/images/shelihan_natalia.jpg"
          alt=""
          class="relative z-20
            max-w-20 rounded-full"
        />
      </div>
      <div>
        <span class="font-bold text-xl uppercase">
          Сухачова Наталія
        </span>
        <img src="" alt="" />
        <span class="font-medium">
          Клінічний психолог
        </span>
      </div>
    </div>

    <div>
      <nav>
        <ul
          class="flex gap-4
            text-content-primary font-semibold uppercase"
        >
          <li>
            <a href="#">Головна</a>
          </li>
          <li>
            <a href="#">Про мене</a>
          </li>
          <li>
            <a href="#">Консультації</a>
          </li>
          <li>
            <a href="#">Контакти</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>
