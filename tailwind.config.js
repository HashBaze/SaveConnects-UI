/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#fbfbfb",
          "200": "#111",
        },
        darkslategray: "#333",
        white: "#fff",
        crimson: "#ee1d52",
        silver: "#c4c4c4",
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
