/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive']
      },
      keyframes: {
        appear: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '40%, 60%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'dot1': 'appear 2s infinite',
        'dot2': 'appear 2s infinite 0.5s',
        'dot3': 'appear 2s infinite 1s',
      },
    } 
  },
  plugins: [],
}