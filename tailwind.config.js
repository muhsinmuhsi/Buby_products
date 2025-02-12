import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "300px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // If using a Google Font
        custom: ["CustomFont", "sans-serif"], // Local custom font
      },
    },
  },
  plugins: [],
});
