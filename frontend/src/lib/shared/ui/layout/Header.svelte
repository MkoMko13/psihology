<script lang="ts">
  import { base } from '$app/paths';
  import '$lib/app/styles/layout/header.css';

  let animationFrameId: number | null = null;

  const easeInOutCubic = (progress: number) => {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  };

  const animateScrollTo = (
    scrollContainer: Element,
    targetTop: number,
    durationMs = 1350
  ) => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }

    const startTop = scrollContainer.scrollTop;
    const delta = targetTop - startTop;

    if (Math.abs(delta) < 1) {
      scrollContainer.scrollTop = targetTop;
      return;
    }

    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeInOutCubic(progress);

      scrollContainer.scrollTop =
        startTop + delta * easedProgress;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      animationFrameId = null;
    };

    animationFrameId = requestAnimationFrame(step);
  };

  const smoothScrollTo = (
    event: MouseEvent,
    id: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const target = document.getElementById(id);
    if (!target) return;

    const headerEl = document.querySelector('header');
    const headerOffset =
      headerEl?.getBoundingClientRect().height ?? 0;
    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset -
      8;

    const scrollContainer =
      document.scrollingElement ?? document.documentElement;

    animateScrollTo(
      scrollContainer,
      Math.max(targetTop, 0)
    );
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      scrollContainer.scrollTop = targetTop;
      return;
    }
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
      <ul class="flex gap-6 font-bold text-base">
        <li>
          <button
            type="button"
            class="menu-link cursor-pointer"
            onclick={(e) => smoothScrollTo(e, 'main')}
          >
            Головна
          </button>
        </li>

        <li>
          <button
            type="button"
            class="menu-link cursor-pointer"
            onclick={(e) => smoothScrollTo(e, 'education')}
            >Про мене</button
          >
        </li>

        <li>
          <button
            type="button"
            class="menu-link cursor-pointer"
            onclick={(e) =>
              smoothScrollTo(e, 'consultation')}
            >Консультації</button
          >
        </li>

        <li>
          <a
            href={`${base}/`}
            class="menu-link cursor-pointer">Контакти</a
          >
        </li>
      </ul>
    </nav>
  </div>
</header>
