/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "peoples": "#d14f58",
        "cmls": "#00467f",
        "intellifi": "#310872",
        "duca": "#ff4f00",
        "strive": "#415a69"
      },
    },
  },
  plugins: [],
}

