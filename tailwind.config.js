/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        "noto-serif-tc": ["'Noto Serif TC'", "serif"],
      },
      colors: {
        primary: {
          10: "#F7F2EE",
          40: "#F1EAE4",
          60: "#E1D1C2",
          80: "#D0B79F",
          120: "#7B6651",
          DEFAULT: "#BF9D7D",
        },
        success: {
          10: "#E8FEE7",
          20: "#BCFBBD",
          120: "#299F65",
          DEFAULT: "#52DD7E",
        },
        info: {
          10: "#E6FBFE",
          20: "#B1EFFD",
          120: "#1D66AC",
          DEFAULT: "#3BADEF",
        },
        error: {
          10: "#FDECEF",
          20: "#F5CCD1",
          120: "#C22538",
          DEFAULT: "#DA3E51",
        },
        neutral: {
          0: "#FFFFFF",
          10: "#F9F9F9",
          40: "#ECECEC",
          60: "#909090",
          80: "#4B4B4B",
          100: "#000000",
          background: "#140F0A",
        },
      },
      minWidth: {
        container: "375px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
