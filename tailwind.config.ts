import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary:{
          300: '#000000',
          200: '#1a1a1bec',
          100: '#353839',
        },
        textColor:{
          300: '#FFFFFF',
          200: '#F8F8FF',
          100: '#FFFAFA',
        },
        customSilver: {
          light: '#FAFAFA',  // Example value, adjust as needed
          DEFAULT: '#F4F4F7',
          dark: '#A9A9A9',   // Example value, adjust as needed
        },
        Magenta: {
          400: '#4A3AFF',
          300: '#A59DFF',
          200: '#D2CEFF',
          100: '#E9E7FF',
        },
        Blue: {
          400: '#3A95FF',
          300: '#9DCAFF',
          200: '#CDE4FF',
          100: '#ECF5FF',
        },
        Green: {
          400: '#3EFF3A',
          300: '#9FFF9D',
          200: '#CEFFCD',
          100: '#ECFFEC',
        },
        Yellow: {
          400: '#FFEB3A',
          300: '#FFF69D',
          200: '#FFFACD',
          100: '#FFFDEC',
        },
        Red: {
          400: '#FF3A46',
          300: '#FF9DA3',
          200: '#FFCDDO',
          100: '#FFECED',
        }
        // Add more custom colors here
      },
      fontFamily: {
        rotunda: ['Rotunda', 'sans-serif'],
      },
      fontSize: {
        display1: ['78px', { lineHeight: '84px' }],
        display2: ['62px', { lineHeight: '76px' }],
        display3: ['44px', { lineHeight: '52px' }],
        display4: ['28px', { lineHeight: '40px' }],
        headingH1: ['42px', { lineHeight: '54px' }],
        headingH2: ['32px', { lineHeight: '48px' }],
        headingH3: ['24px', { lineHeight: '34px' }],
        headingH4: ['22px', { lineHeight: '28px' }],
        headingH5: ['18px', { lineHeight: '24px' }],
        headingH6: ['16px', { lineHeight: '22px' }],
        bodyLarge: ['18px', { lineHeight: '32px' }],
        bodyDefault: ['14px', { lineHeight: '26px' }],
        bodySmall: ['12px', { lineHeight: '22px' }],
        textSingle400: ['18px', { lineHeight: '20px' }],
        textSingle300: ['16px', { lineHeight: '18px' }],
        textSingle200: ['14px', { lineHeight: '16px' }],
        textSingle100: ['12px', { lineHeight: '14px' }],
        textBold: ['14px', { lineHeight: '26px', fontWeight: '700' }],
        textLink: ['14px', { lineHeight: '26px' }],
        bulletList: ['14px', { lineHeight: '26px' }],
        numberedList: ['14px', { lineHeight: '26px' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
      },
    },
  },
  plugins: [],
};
export default config;
