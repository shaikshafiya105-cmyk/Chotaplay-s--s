import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      brand: {
        blue: "#1E4FA3",
        orange: "#F5821F",
        yellow: "#FFE9A8",
        white: "#FFFFFF",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Fredoka", "Outfit", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "xl": "16px",
        "2xl": "24px",
        "3xl": "32px",
        "full": "9999px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(30, 79, 163, 0.08)",
        active: "0 10px 28px rgba(245, 130, 31, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
