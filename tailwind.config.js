/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        background: "#F5F8FE",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#0F172A",
          muted: "#64748B",
          subtle: "#334155",
        },
        primary: {
          DEFAULT: "#1066FF",
          hover: "#0A5AF0",
          pressed: "#0753E2",
          container: "#DBE8FC",
        },
        secondary: "#1E3A8A",
        accent: "#93C5FD",
        sky: {
          wash: "#E0EEFE",
          glow: "#BADDFC",
          silk: "#4F96F9",
        },
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          500: "#64748B",
          700: "#334155",
          900: "#0F172A",
        },
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.04), 0 2px 8px rgba(15, 23, 42, 0.04)",
        md: "0 8px 24px -8px rgba(16, 102, 255, 0.16)",
        lg: "0 20px 40px -15px rgba(16, 102, 255, 0.14)",
        glow: "0 0 30px rgba(16, 102, 255, 0.2)",
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
