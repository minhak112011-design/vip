import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: "#f3fbf9",
          100: "#e2f7f1",
          200: "#c9f0e6",
          300: "#a6e5d6",
          400: "#7ad4c1",
        },
        blush: {
          50: "#fff1f5",
          100: "#ffe0ea",
          200: "#ffc2d4",
          300: "#ff9ebd",
          400: "#ff7aa8",
          500: "#f9548c",
        },
        cream: "#fffaf3",
      },
      fontFamily: {
        heading: ["Quicksand", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Nunito", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(8deg)" },
        },
        blob: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        blob: "blob 8s ease-in-out infinite",
      },
      boxShadow: {
        cute: "0 8px 24px -6px rgba(249, 84, 140, 0.35)",
        soft: "0 4px 14px -4px rgba(122, 212, 193, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
