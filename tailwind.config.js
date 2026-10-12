/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Atelier Commerce + Restrained LuxStore Color System
        surface: "#FFFFFF",
        "surface-dim": "#F6F6F4",
        "surface-bright": "#FFFFFF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#FAFAFA",
        "surface-container": "#F6F6F4",
        "surface-container-high": "#EDEDF7",
        "surface-container-highest": "#E2E2EB",
        "surface-variant": "#E5E5E5",
        
        "on-surface": "#202020",
        "on-surface-variant": "#707070",
        outline: "#737685",
        "outline-variant": "#E5E5E5",
        
        // Brand Action Colors
        primary: "#2457C5",
        "primary-hover": "#1946A3",
        "primary-container": "#2457C5",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#CCD7FF",
        "primary-fixed": "#DBE1FF",
        "primary-fixed-dim": "#B3C5FF",
        "on-primary-fixed": "#001849",
        "on-primary-fixed-variant": "#003FA5",
        
        secondary: "#3259B6",
        "secondary-container": "#799DFF",
        "on-secondary": "#FFFFFF",
        
        tertiary: "#00522C",
        "tertiary-container": "#1C6B40",
        "tertiary-fixed": "#D4F4DD",
        "on-tertiary-fixed": "#00210F",
        
        error: "#B42318",
        "error-container": "#FFDAD6",
        "on-error": "#FFFFFF",
        "on-error-container": "#93000A",
        
        background: "#FFFFFF",
        "on-background": "#202020",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      spacing: {
        gutter: "1.5rem",
        margin: "2rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "3rem",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        headline: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
