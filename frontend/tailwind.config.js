/** @type {import('tailwindcss').Config} */
// import forms from '@tailwindcss/forms';
// import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // --- Фонові кольори ---
        bg: {
          DEFAULT: 'var(--bg)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          elevated: 'var(--bg-elevated)',
          overlay: 'var(--bg-overlay)',
          card: 'var(--bg-tertiary)',
        },

        // --- Текстові кольори ---
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          quaternary: 'var(--text-quaternary)',
          muted: 'var(--text-muted)',
          accent: 'var(--text-accent)',
          onAccent: 'var(--text-on-accent)',
          error: 'var(--text-error)',
          success: 'var(--text-success)',
          warning: 'var(--text-warning)',
        },

        // --- Акцентні кольори ---
        accent: {
          DEFAULT: '#9FC3C4',
          50: '#F4FAFA',
          100: '#E6F1F2',
          200: '#D7E9EA',
          300: '#C8DEDF',
          400: '#B5D2D3',
          500: '#9FC3C4',
          600: '#7FA8A9',
          700: '#5E7D7E',
          800: '#3F5556',
          900: '#202B2C',
          extra: 'var(--accent-40)',
        },

        // --- Статусні кольори ---
        status: {
          success: 'var(--success)',
          successMuted: 'var(--success-muted)',
          warning: 'var(--warning)',
          warningMuted: 'var(--warning-muted)',
          danger: 'var(--danger)',
          dangerMuted: 'var(--danger-muted)',
          info: 'var(--info)',
          infoMuted: 'var(--info-muted)',
        },

        // --- Бордери та роздільники ---
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
          focus: 'var(--border-focus)',
          divider: 'var(--divider)',
        },
      },

      fontFamily: {
        primary: ['var(--font-primary)'],
      },

      fontSize: {
        caption: ['clamp(0.75rem, 2vw + 0.25rem, 0.875rem)', { lineHeight: '1rem' }],
        'base-sm': ['clamp(0.875rem, 2.5vw + 0.3rem, 1rem)', { lineHeight: '1.25rem' }],
        base: ['clamp(1rem, 3vw + 0.4rem, 1.125rem)', { lineHeight: '1.5rem' }],
        h4: ['clamp(1.125rem, 4vw + 0.5rem, 1.5rem)', { lineHeight: '1.75rem' }],
        h3: ['clamp(1.5rem, 5vw + 0.75rem, 2.25rem)', { lineHeight: '2rem' }],
        h2: ['clamp(2rem, 6vw + 1rem, 3rem)', { lineHeight: '2.5rem' }],
        h1: ['clamp(2.5rem, 7vw + 1.25rem, 4rem)', { lineHeight: '4.2rem' }],
      },

      lineHeight: {
        xs: 'var(--line-height-xs)',
        sm: 'var(--line-height-sm)',
        base: 'var(--line-height-base)',
        lg: 'var(--line-height-lg)',
        xl: 'var(--line-height-xl)',
      },

      screens: {
        xs: '100%',
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        xll: '96rem',
      },
    },
  },
  // plugins: [forms, typography],
};
