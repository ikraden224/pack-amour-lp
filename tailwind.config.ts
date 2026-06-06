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
        rouge: "var(--rouge)",
        "rouge-deep": "var(--rouge-deep)",
        ivory: "var(--ivory)",
        gold: "var(--gold)",
        "gold-soft": "var(--gold-soft)",
        noir: "var(--noir)",
        "neutral-700": "var(--neutral-700)",
        "neutral-400": "var(--neutral-400)",
      },
      fontFamily: {
        tajawal: ["var(--font-tajawal)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
