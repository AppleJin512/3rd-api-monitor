module.exports = {
  purge: {
    // enabled: !process.env.ROLLUP_WATCH,
    content: ["./public/index.html", "./src/**/*.svelte"],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  //   content: ["./public/index.html", "./src/**/*.svelte"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          EE: "#EEEEEE",
          E1: "#E1E1E1",
          AA: "#AAAAAA",
          "1B": "#1B1B1B",
          88: "#888888",
          55: "#555555",
          F5: "#F5F5F5",
          FF: "#FFFFFF",
          F1: "#F1F1F1",
          F9: "#F9F9F9",
          33: "#333333",
          99: "#999999",
        },
      },
      screens: {
        se: { max: "320px" },
        nse: { min: "321px" },
        phone: { max: "873px" },
        pad: { min: "874px", max: "1064px" },
        md: [{ min: "873px" }],
        lg: { min: "1065px" },
      },
      height: {
        18: "4.5rem", //72px
        17: "4.126rem", //66px
        22: "5.5rem", //88px
        25: "6.25rem", //100px
        27: "6.75rem", //108px
        89: "89px",
        318: "318px",
        561: "561px",
        521: "521px",
        636: "636px",
      },
      minHeight: {
        10: "2.5rem",
        14: "3.5rem",
      },
      margin: {
        25: "6.25rem", //100px
        30: "7.5", //120px
      },
      spacing: {
        15: "3.75rem", //60px
        25: "6.25rem", //100px
        30: "7.5rem", //120px
      },
      width: {
        88: "88px",
        116: "116px",
        272: "272px",
        280: "280px",
        408: "408px",
        352: "352px",
        360: "360px",
        532: "532px",
        632: "632px",
        640: "640px",
        795: "795px",
        760: "760px",
        700: "700px",
        1000: "1000px",
      },
      minWidth: { 504: "504px" },
      maxWidth: {
        1120: "1120px",
      },
      fontFamily: {
        title: ["Montserrat", "sans-serif"],
        text: ["Source Code Pro", "monospace"],
        content: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        "22px": ["22px", "26px"],
        "32px": ["32px", "37.54px"],
        "40px": ["40px", "47px"],
      },
    },
  },
  variants: {
    extend: {},
  },
};
