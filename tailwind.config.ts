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
        // Dark mode colors
        dark: {
          bg: {
            primary: "#0a0a0a",
            secondary: "#111111",
            card: "#1a1a1a",
            "card-hover": "#222222",
            input: "#1e1e1e",
          },
          border: {
            subtle: "#2a2a2a",
            medium: "#333333",
          },
          text: {
            primary: "#ffffff",
            secondary: "#888888",
            tertiary: "#666666",
          },
        },
        // Konsensi brand colors
        konsensi: {
          green: {
            DEFAULT: "#3D7B4C",
            light: "#4a9d5c",
            dark: "#2d5a38",
            muted: "rgba(61, 123, 76, 0.2)",
          },
          mint: "#4ade80",
          coral: "#f87171",
          dark: "#0a0a0a",
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
