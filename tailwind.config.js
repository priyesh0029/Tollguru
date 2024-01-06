
import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "Roboto", "Arial", "sans-serif"],
        serif: ["Merriweather", "serif"],
        cursive: ["Snell Roundhand", "cursive"]
      },
      spacing: {
        '100': '28rem', // You can adjust the value as needed.
        '110' :'38rem'
      },
    },
  },
  plugins: [],
});