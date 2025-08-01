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
        blueBg: "#BFDBFF",
        purpleBg: "#e4d2fc",
        almostWhite: "#faf7fc",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        creamWhite: "#fdfcff"
      },
      screens: {
        'mobile': '380px',
        'tablet': '768px', 
        'laptop': '1024px', 
        'desktop': '1280px', 
      },
    },
  },
  plugins: [],
};
export default config;
