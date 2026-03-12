<script>
  import { base } from '$app/paths';
  import '$lib/app/styles/layout/header.css';
</script>

<header
  class="fixed z-5
    flex justify-center w-full pt-[35px] pb-[5px] px-5
    shadow-md shadow-black/25 bg-white
    before:absolute before:inset-0 before:top-0 before:h-[30px] 
    before:bg-darkBg"
>
  <div
    class="flex justify-between items-center
      py-2 w-full max-w-7xl"
  >
    <div class="flex items-center gap-4">
      <div
        class="relative
          before:content-['']
          before:absolute
          before:left-1/2 before:top-1/2
          before:-translate-x-1/2 before:-translate-y-1/2
          before:w-[85px] before:h-[85px]
          before:bg-white
          before:rounded-full
          before:shadow-[0_0_10px_rgba(0,0,0,0.55)]"
      >
        <img
          src={`${base}/images/shelihan_natalia.jpg`}
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

    <nav>
      <ul class="flex gap-6 font-bold uppercase text-base">
        <li>
          <a href={`${base}/`} class="menu-link">
            Головна
          </a>
        </li>

        <li>
          <a href={`${base}/`} class="menu-link">Про мене</a
          >
        </li>

        <li>
          <a href={`${base}/`} class="menu-link"
            >Консультації</a
          >
        </li>

        <li>
          <a href={`${base}/`} class="menu-link">Контакти</a
          >
        </li>
      </ul>
    </nav>
  </div>
</header>
