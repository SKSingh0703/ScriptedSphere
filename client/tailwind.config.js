/** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite-react/tailwind");
import { content , plugin } from "flowbite-react/tailwind";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(),
  ],
}

