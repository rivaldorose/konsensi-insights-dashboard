import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Theme-aware colors using CSS variables
        card: "var(--bg-card)",
        "card-hover": "var(--bg-card-hover)",
        input: "var(--bg-input)",
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "border-subtle": "var(--border-subtle)",
        "border-medium": "var(--border-medium)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        // Konsensi brand colors
        konsensi: {
          green: {
            DEFAULT: "#3D7B4C",
            light: "#4a9d5c",
            dark: "#2d5a38",
            muted: "var(--green-muted)",
          },
          mint: "#4ade80",
          coral: "#f87171",
        },
        // Chart colors
        chart: {
          green: "#3D7B4C",
          blue: "#3b82f6",
          orange: "#f59e0b",
          purple: "#8b5cf6",
          pink: "#ec4899",
        },
      },
    },
  },
  plugins: [],
};
export default config;
