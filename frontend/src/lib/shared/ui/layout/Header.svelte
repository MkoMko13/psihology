<script lang="ts">
  import { base } from '$app/paths';
  import '$lib/app/styles/layout/header.css';

  const handleAnchorClick = (event: MouseEvent) => {
    const link =
      event.currentTarget instanceof HTMLAnchorElement
        ? event.currentTarget
        : event.target instanceof Element
          ? event.target.closest('a')
          : null;

    if (!(link instanceof HTMLAnchorElement)) return;

    const href = link.getAttribute('href') ?? '';
    if (!href.startsWith('#')) return;

    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();

    const header = document.querySelector('header');
    const headerOffset =
      header?.getBoundingClientRect().height ?? 0;
    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset -
      8;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    });

    history.replaceState(null, '', `#${id}`);
  };
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
          <a
            href="#main"
            class="menu-link"
            onclick={handleAnchorClick}
          >
            Головна
          </a>
        </li>

        <li>
          <a
            href="#education"
            class="menu-link"
            onclick={handleAnchorClick}>Про мене</a
          >
        </li>

        <li>
          <a
            href="#consultation"
            class="menu-link"
            onclick={handleAnchorClick}>Консультації</a
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
