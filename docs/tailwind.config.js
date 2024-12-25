/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./theme.config.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        ibmmono: ["IBM Plex Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
