import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        base: '2fr 6fr',
      },
      
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      dropShadow: {
        green: '0px 4px 50px rgba(74, 222, 128, 0.5)',
      },
    },
  },
  plugins: [],
} satisfies Config;
