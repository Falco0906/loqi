import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "#1a1d26",
          light: "#22252f",
          lighter: "#2a2d38",
        },
        accent: {
          DEFAULT: "#6366f1", // indigo-500
          light: "#818cf8",   // indigo-400
          dark: "#4f46e5",    // indigo-600
          muted: "rgba(99, 102, 241, 0.15)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["4.5rem", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-sm": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "heading": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "body-lg": ["1.25rem", { lineHeight: "1.7" }],
        "body": ["1.0625rem", { lineHeight: "1.7" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-up-delay": "fadeInUp 0.8s ease-out 0.15s forwards",
        "fade-in-up-delay-2": "fadeInUp 0.8s ease-out 0.3s forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
