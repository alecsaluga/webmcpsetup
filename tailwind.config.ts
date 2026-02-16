import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#f5f5f5',
        'near-black': '#0a0a0a',
        'dark-bg': '#0a0a0a',
        'accent-orange': '#ff5a00',
        'border-dark': '#1a1a1a',
        'border-light': '#e5e5e5',
      },
      fontFamily: {
        'sans': ['Inter', 'Helvetica Neue', 'Helvetica', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
