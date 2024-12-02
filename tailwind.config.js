/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        matrix: {
          // Professional green palette
          DEFAULT: '#00CF91', // Vibrant but professional mint green
          dark: '#00946A',    // Deeper green for contrast
          light: '#7FFFD4',   // Soft aquamarine
          lighter: '#E0FFF7', // Very light mint for backgrounds
          darkest: '#006D4F', // Deep professional green
          text: {
            light: '#00805B',  // Professional green for light mode
            dark: '#00E6A0',   // Bright but refined green for dark mode
          },
          bg: {
            light: '#F0FAF7',  // Subtle mint white for light mode
            dark: '#001A13',   // Very dark green-black for dark mode
          },
          accent: {
            light: '#00B37F',  // Medium green for accents in light mode
            dark: '#00FFB3',   // Bright mint for accents in dark mode
          },
          glow: {
            light: 'rgba(0, 179, 127, 0.15)', // Professional green glow for light mode
            dark: 'rgba(0, 230, 160, 0.15)',   // Refined glow for dark mode
          }
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'matrix-glow': 'glow 2s ease-in-out infinite alternate',
        'matrix-glow-light': 'glowLight 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { 
            boxShadow: '0 0 5px rgba(0, 230, 160, 0.5), 0 0 10px rgba(0, 230, 160, 0.3)',
            textShadow: '0 0 5px rgba(0, 230, 160, 0.5)'
          },
          'to': { 
            boxShadow: '0 0 10px rgba(0, 230, 160, 0.8), 0 0 20px rgba(0, 230, 160, 0.5)',
            textShadow: '0 0 10px rgba(0, 230, 160, 0.8)'
          }
        },
        glowLight: {
          'from': { 
            boxShadow: '0 0 5px rgba(0, 179, 127, 0.3), 0 0 10px rgba(0, 179, 127, 0.2)',
            textShadow: '0 0 5px rgba(0, 179, 127, 0.3)'
          },
          'to': { 
            boxShadow: '0 0 10px rgba(0, 179, 127, 0.5), 0 0 20px rgba(0, 179, 127, 0.3)',
            textShadow: '0 0 10px rgba(0, 179, 127, 0.5)'
          }
        }
      },
      backgroundImage: {
        'matrix-gradient-dark': 'linear-gradient(180deg, rgba(0, 230, 160, 0.15) 0%, rgba(0, 26, 19, 0) 100%)',
        'matrix-gradient-light': 'linear-gradient(180deg, rgba(0, 179, 127, 0.1) 0%, rgba(240, 250, 247, 0) 100%)',
      }
    },
  },
  plugins: [],
}