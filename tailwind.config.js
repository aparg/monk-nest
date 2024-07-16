// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,html}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.js",
    // "!./components/reso/Filters.js",
  ],
  theme: {
    extend: {
      width: {
        "1/8": "12.5%",
      },
      colors: {
        "primary-green": "#217955",
        "light-lime": "#e1f6b2",
        "primary-red": "#eb7e6c",
        "medium-black": "#222222",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  important: true,
};

export default config;
