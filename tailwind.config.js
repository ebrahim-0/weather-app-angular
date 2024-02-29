/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {
      animation: {
        "pulse-color": "pulse-color 2s infinite", // Define a new animation named 'pulseColor' with a duration of 2 seconds and infinite looping
      },
      keyframes: {
        "pulse-color": {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
