/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Black: "#1E2832",
        primaryBG: "#1e28320d",
      },
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
};
