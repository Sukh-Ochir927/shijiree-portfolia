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
        coral: "#F4845F",
        teal: "#2EC4B6",
        sage: "#3BB273",
        yellow: "#FFD166",
        charcoal: "#1A1A2E",
        card: "#f5f5f5",
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
    },
  },
  plugins: [],
};

export default config;
