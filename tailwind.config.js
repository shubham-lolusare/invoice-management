export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: { max: "1250px" },
      sm: { max: "912px" },
      mobile: { max: "550px" },
      xs: { max: "300px" },
      tall: { raw: "(max-height: 740px)" },
    },
    extend: {},
  },
  plugins: [],
};
