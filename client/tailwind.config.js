/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontWeight: {
      //   "extra-bold": 800, // Use a valid font weight
      //   "semi-bold": 600,
      //   "extra-light": 200,
      // },
    },
  },
  plugins: [require("daisyui"), require("tw-elements/dist/plugin.cjs")],
};
