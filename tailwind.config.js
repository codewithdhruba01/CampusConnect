/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cabinet: ['Cabinet Grotesk', 'sans-serif'],
        general: ['General Sans', 'sans-serif'],
        boska: ['Boska', 'serif'],
        switzer: ['Switzer', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        supreme: ['Supreme', 'sans-serif'],
        rowan: ['Rowan', 'serif'],
        quilon: ['Quilon', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        excon: ['Excon', 'sans-serif'],
        synonym: ['Synonym', 'sans-serif'],
        amulya: ['Amulya', 'sans-serif'],
        neco: ['Neco', 'serif'],
        pally: ['Pally', 'sans-serif'],
        hind: ['Hind', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        hanken: ['Hanken Grotesk', 'HK Grotesk', 'sans-serif'],
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
      },
    },
  },
  plugins: [],
}

