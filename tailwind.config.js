/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"] },
      colors: {
        background: "#000",
        foreground: "#fff",
        primary: { DEFAULT: "hsl(5, 84%, 55%)", foreground: "#fff" },
      },
      borderRadius: { DEFAULT: "0", none: "0", sm: "0", md: "0", lg: "0", xl: "0" },
    },
  },
  plugins: [],
};
