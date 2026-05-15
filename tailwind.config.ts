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
        gold: {
          50:  "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#F5C842",
          500: "#D4AF37",
          600: "#B8960C",
          700: "#92740A",
          800: "#6B5307",
          900: "#4A3A05",
        },
        canvas: {
          DEFAULT: "#080706",
          panel:   "#0f0e0c",
          surface: "#191714",
          raised:  "#242118",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans:    ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono:    ["ui-monospace", "SF Mono", "Menlo", "monospace"],
      },
      letterSpacing: {
        "display-xl": "-0.04em",
        "display":    "-0.03em",
        "heading":    "-0.02em",
        "tight":      "-0.01em",
      },
    },
  },
  plugins: [],
};
export default config;
