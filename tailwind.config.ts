import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0f172a',
        card: '#111827',
        accent: '#7c3aed',
        accentSoft: '#8b5cf6',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.18)',
        glow: '0 0 0 1px rgba(124, 58, 237, 0.08), 0 20px 50px rgba(124, 58, 237, 0.18)',
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
