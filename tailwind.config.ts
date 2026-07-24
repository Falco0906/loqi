import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--bg) / <alpha-value>)",
        foreground: "rgb(var(--text-primary) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          light: "rgb(var(--surface-hover) / <alpha-value>)",
          lighter: "rgb(var(--surface-elevated) / <alpha-value>)",
          higher: "rgb(var(--surface-elevated) / <alpha-value>)",
          low: "rgb(var(--surface) / <alpha-value>)",
          highest: "rgb(var(--surface-elevated) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          light: "rgb(var(--accent-hover) / <alpha-value>)",
          dark: "rgb(var(--accent) / <alpha-value>)",
          muted: "rgb(var(--accent) / 0.12)",
        },
        primary: "rgb(var(--accent) / <alpha-value>)",
        secondary: {
          DEFAULT: "rgb(var(--text-secondary) / <alpha-value>)",
        },
        tertiary: "rgb(var(--text-tertiary) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        border: "var(--border)",
        outline: "var(--border)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["4.5rem", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        display: ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-sm": ["2.5rem", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        heading: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "body-lg": ["1.25rem", { lineHeight: "1.65" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        "label-lg": ["0.9375rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        "label-md": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "label-sm": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
      },
      borderRadius: {
        "2xl": "0.75rem",
        "3xl": "1rem",
        "4xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-up-delay": "fadeInUp 0.6s ease-out 0.12s forwards",
        "fade-in-up-delay-2": "fadeInUp 0.6s ease-out 0.24s forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;