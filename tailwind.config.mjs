/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        flame: {
          50: "#fcf5f0",
          100: "#f8e7dc",
          200: "#f0cdb8",
          300: "#e7aa8a",
          400: "#dc7f5b",
          500: "#d56440",
          600: "#c64a30",
          700: "#a4382a",
          800: "#843028",
          900: "#6b2923",
          950: "#391311",
        },
      },
      fontFamily: {
        heading: ["SebaldusGotisch"],
      },
      boxShadow: {
        bold: "5px 5px 0 0 rgba(0, 0, 0, 1.0)",
        bolder: "6px 6px 0 0 rgba(0, 0, 0, 1.0)",
      },
    },
  },
  plugins: [],
};
