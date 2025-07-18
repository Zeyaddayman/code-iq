/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "rgb(var(--primary) / <alpha-value>)",
        "secondary": "rgb(var(--secondary) / <alpha-value>)",
        "background": "var(--background)"
      }
    },
  },
  plugins: [],
}
