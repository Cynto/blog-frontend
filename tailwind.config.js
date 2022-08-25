module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'button-primary': '#0087ca',
      },
      fontFamily: {
        header: ['Koulen', 'sans-serif'],
        normal: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
