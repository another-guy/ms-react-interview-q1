/** @type {import('tailwindcss').Config} */
module.exports = {
  // Igor's comment:
  //
  // I am adding TailwindCSS here because the assignment mentions
  // the responsive UI requirements and the library is the best fit for it.
  // There are many alternatives we could use instead, like Bootstarap, Material-UI, etc.
  //
  // I am keeping things simple and am not adding SASS or styled-components at this point.

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
