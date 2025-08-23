import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS variables from globals.css
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        border: "var(--border)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        "muted-foreground": "var(--muted-foreground)",
        
        // Neon theme colors
        "neon-cyan": "var(--neon-cyan)",
        "neon-purple": "var(--neon-purple)",
        "neon-green": "var(--neon-green)",
        "neon-yellow": "var(--neon-yellow)",
        "neon-pink": "var(--neon-pink)",
        
        // Dark theme colors
        "dark-bg": "var(--dark-bg)",
        "dark-card": "var(--dark-card)",
        "dark-text": "var(--dark-text)",
        "dark-muted": "var(--dark-muted)",
        "dark-border": "var(--dark-border)",
      },
    },
  },
  plugins: [],
};

export default config;