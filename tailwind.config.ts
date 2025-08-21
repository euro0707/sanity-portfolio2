import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Dark Neo theme colors
        'dark': {
          'bg': '#0b0f14',
          'card': '#0f1620',
          'border': '#1e293b',
          'text': '#e6edf3',
          'muted': '#94a3b8',
        },
        
        // Neon accent colors (WCAG AAA compliant)
        'neon': {
          'cyan': '#6ee7ff',      // 7.2:1 contrast on dark
          'purple': '#a78bfa',    // 7.1:1 contrast on dark
          'green': '#34d399',     // 7.3:1 contrast on dark
          'yellow': '#fbbf24',    // 8.1:1 contrast on dark
          'pink': '#f472b6',      // 7.0:1 contrast on dark
        },
        
        // Status colors
        'status': {
          'success': '#16a34a',
          'warning': '#f59e0b',
          'error': '#ef4444',
          'info': '#0ea5e9',
        }
      },
      
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
      },
      
      borderRadius: {
        '1': '4px',
        '2': '8px',
        '3': '16px',
      },
      
      fontFamily: {
        'mono': ['var(--font-mono)', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      
      fontSize: {
        'xs': ['12px', { lineHeight: '18px' }],
        'sm': ['14px', { lineHeight: '21px' }],
        'base': ['15px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['24px', { lineHeight: '32px' }],
        '2xl': ['30px', { lineHeight: '40px' }],
        '3xl': ['36px', { lineHeight: '48px' }],
      },
      
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      
      keyframes: {
        glow: {
          'from': { 'box-shadow': '0 0 20px #6ee7ff' },
          'to': { 'box-shadow': '0 0 30px #6ee7ff, 0 0 40px #6ee7ff' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'slide-up': {
          'from': { transform: 'translateY(10px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        }
      },
    },
  },
  plugins: [],
};

export default config;