/** @type {import('tailwindcss').Config} */
// import forms from '@tailwindcss/forms';
// import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{html,js,svelte,ts,css, scss}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // --- Фонові кольори ---

        secondary: '#144249',
        darkBg: '#1E5459',
        // tertiary: 'var(--bg-tertiary)',
        // elevated: 'var(--bg-elevated)',
        // overlay: 'var(--bg-overlay)',
        // card: 'var(--bg-tertiary)',

        // --- Текстові кольори ---
        // primary: 'var(--text-primary)',
        // secondary: 'var(--text-secondary)',
        // tertiary: 'var(--text-tertiary)',
        // quaternary: 'var(--text-quaternary)',
        // muted: 'var(--text-muted)',
        // accent: 'var(--text-accent)',
        // onAccent: 'var(--text-on-accent)',
        // error: 'var(--text-error)',
        // success: 'var(--text-success)',
        // warning: 'var(--text-warning)',

        // --- Акцентні кольори ---

        // --- Основні фонові кольори (Backgrounds) ---
        // Світлий м'ятний фон усього сайту та карток
        'page-bg': '#B2DFDB',

        // --- Текстові кольори (Content) ---
        // Дуже темний зелений для основного тексту та меню (близько до чорного)
        'content-primary': '#004D40',

        // --- Акцентні кольори (Accents & Primary Actions) ---
        // Насичений темно-зелений для головних заголовків (Освіта, Досвід) та кнопок
        'accent-primary': '#00695C',

        // --- Другорядні та заспокійливі відтінки (Muted & Secondary) ---
        // Світлий сіро-зелений для фону карток в блоці "Досвід"
        'muted-bg': '#CFD8DC',
        // Середній бірюзовий для елементів ілюстрації та каруселі
        'muted-accent': '#80CBC4',

        // --- Елементи декору та іконок (Decorative) ---
        // Шляхетний золотисто-бежевий для рамок, іконок та деталей ілюстрації
        'decorative-gold': '#DBC59C',

        // --- Стандартні кольори (Base) ---
        // Чистий білий для текстів на кнопках та чистих фонів
        'base-white': '#FFFFFF',
        // Світло-сірий для тонких роздільників та іконок
        'base-gray': '#E0E0E0',

        // 'accent-50': '#f4faf9',
        // 'accent-100': '#FAF8F5',
        // 'accent-200': '#EDF5F5',
        // 'accent-300': '#aad9c9', // тепер збігається з DEFAULT
        // "accent-400": "#92c9bf",
        // "accent-500": "#7abcb5",
        // "accent-600": "#61a9a1",
        // "accent-700": "#488580",
        // "accent-800": "#305f60",
        // "accent-900": "#1a3a3a",

        // --- Статусні кольори ---
        // success: 'var(--success)',
        // successMuted: 'var(--success-muted)',
        // warning: 'var(--warning)',
        // warningMuted: 'var(--warning-muted)',
        // danger: 'var(--danger)',
        // dangerMuted: 'var(--danger-muted)',
        // info: 'var(--info)',
        // infoMuted: 'var(--info-muted)',

        // --- Бордери та роздільники ---
        // strong: 'var(--border-strong)',
        // focus: 'var(--border-focus)',
        // divider: 'var(--divider)',
      },

      fontFamily: {
        // primary: ['var(--font-primary)'],
      },

      fontSize: {
        // caption: ['clamp(0.75rem, 2vw + 0.25rem, 0.875rem)', { lineHeight: '1rem' }],
        // 'base-sm': ['clamp(0.875rem, 2.5vw + 0.3rem, 1rem)', { lineHeight: '1.25rem' }],
        base: ['clamp(1rem, 3vw + 0.4rem, 1.125rem)', { lineHeight: '1.5rem' }],
        // h4: ['clamp(1.125rem, 4vw + 0.5rem, 1.5rem)', { lineHeight: '1.75rem' }],
        // h3: ['clamp(1.5rem, 5vw + 0.75rem, 2.25rem)', { lineHeight: '2rem' }],
        h2: [
          'clamp(2rem, 6vw + 1rem, 3rem)',
          { lineHeight: '2.5rem' },
        ],
        // h1: ['clamp(2.5rem, 7vw + 1.25rem, 4rem)', { lineHeight: '4.2rem' }],
      },

      lineHeight: {
        // xs: 'var(--line-height-xs)',
        // sm: 'var(--line-height-sm)',
        // base: 'var(--line-height-base)',
        // lg: 'var(--line-height-lg)',
        // xl: 'var(--line-height-xl)',
      },

      screens: {
        // xs: '100%',
        // sm: '40rem',
        // md: '48rem',
        // lg: '64rem',
        // xl: '80rem',
        // xll: '96rem',
      },
    },
  },
  // plugins: [forms, typography],
};
