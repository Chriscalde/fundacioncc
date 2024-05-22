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
        terciary:'#46494C'
      },
      fontFamily:{
        'sans':['Inter','sans-serif']
      },
      backgroundImage: {
        'soon':"url('/public/images/joel-muniz-A4Ax1ApccfA-unsplash.jpg')"
      },
    },
  },
  plugins: [],
};
