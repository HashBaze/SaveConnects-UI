/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkslategray: "#333",
        white: "#fff",
        naviblue: "#1A2B4C",
        silver: "#C0C0C0",
        background: "#F1F1F1",
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
      },
      borderRadius: {
        "21xl": "40px",
      },
    },
    fontSize: {
      base: "16px",
      mini: "15px",
      lg: "18px",
      sm: "14px",
      smi: "13px",
      "13xl": "32px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
