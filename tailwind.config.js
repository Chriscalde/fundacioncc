/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**",
    "./assets/**"
  ],
  theme: {
    extend: {
      colors:{
        primary: '#DCDCDD',
        secondary: '#1985A1',
        terciary:'#46494C',
        grayText: '#C5C3C6',
        blueGray: "#4c5c68"
      },
      fontFamily:{
        'sans':['Inter','sans-serif']
      },
      backgroundImage: {
        'soon':'url(/assets/img/back2.jpeg)'
      },
    },
  },
  plugins: [],
};
