import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7a1f2b',
          dark: '#4a1018',
        },
        accent: {
          DEFAULT: '#c9a227',
          gold: '#c9a227',
        },
        neutral: {
          dark: '#2b2b2b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
