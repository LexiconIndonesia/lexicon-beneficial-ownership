import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        colorPrimary: '#0095A4',
        lightGray: '#F9F9F9',
        textGray: '#4F4F4F',
        textGray40: '#989898',
        gray20: '#EAECF0',
        textGrayBold: '#6D6D6D'
      }
    }
  },
  plugins: [nextui()],
  darkMode: 'class'
}
export default config
