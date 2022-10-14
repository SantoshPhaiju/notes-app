/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "ubuntu": "ubuntu",
        "roboto": "roboto",
        "work-sans": "Work Sans",
      }
    },
  },
  plugins: [],
}
