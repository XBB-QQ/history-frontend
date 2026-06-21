/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f5',
          100: '#eeede8',
          200: '#ddd9cf',
          300: '#c8c0ae',
          400: '#b0a48e',
          500: '#968872',
          600: '#7a6c57',
          700: '#635746',
          800: '#534a3d',
          900: '#484037',
          950: '#27231e',
        },
        rice: '#f5f0e8',
        gold: '#b8941d',
        accent: '#c23b22',
        indigo: '#2e5a88',
        darkGreen: '#3a5f5a',
        plum: '#8b4570',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'Source Han Serif SC', 'STSong', 'SimSun', 'serif'],
        sans: ['Noto Sans SC', 'Source Han Sans SC', 'Microsoft YaHei', 'sans-serif'],
      },
      backgroundImage: {
        'paper': "url('/assets/paper-texture.png')",
        'ink-gradient': 'linear-gradient(135deg, #f5f0e8 0%, #eeede8 50%, #ddd9cf 100%)',
        'mountain': "url('/assets/mountains.svg')",
      },
      animation: {
        'ink-reveal': 'inkReveal 1.2s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        inkReveal: {
          '0%': { opacity: '0', filter: 'blur(4px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
