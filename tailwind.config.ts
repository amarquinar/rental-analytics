import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium background with subtle blue tint (Vercel-inspired)
        background: '#0a0a0f',
        // Lime accent - used sparingly (60-30-10 rule)
        lime: {
          DEFAULT: '#C8F169',
          hover: '#B8E159',
          light: '#E8FBBC',
          muted: 'rgba(200, 241, 105, 0.15)',
        },
        // Refined surface colors
        surface: {
          DEFAULT: 'rgba(24, 24, 27, 0.3)',
          hover: 'rgba(24, 24, 27, 0.5)',
          elevated: 'rgba(39, 39, 42, 0.4)',
        },
        // Subtle borders
        border: {
          DEFAULT: 'rgba(39, 39, 42, 0.5)',
          subtle: 'rgba(39, 39, 42, 0.3)',
          hover: 'rgba(63, 63, 70, 0.5)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'premium': '0 4px 24px -4px rgba(0, 0, 0, 0.3)',
        'premium-lg': '0 8px 40px -8px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 20px rgba(200, 241, 105, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
