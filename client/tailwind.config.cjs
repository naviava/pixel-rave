/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        inter: ["Inter var", "sans-serif"],
      },
      boxShadow: {
        card: "0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)",
        cardhover:
          "0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)",
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */ is a TypeScript-style type definition that specifies that the exported object is a configuration
// object for Tailwind CSS.

// module.exports = {: This line exports an object that contains all the configuration options.

// content: ["./src/**/*.{js,jsx}"],: This line specifies the location of the source files that the configuration should be applied to. In this
// case, it is set to all .js and .jsx files located in the src folder and its subfolders.

// theme: {: This section allows you to customize the theme of the framework.

// extend: { : This section allows you to extend the default configuration.

// screens: { xs: "480px" }, : This line adds a new breakpoint called xs with a value of 480px. Any styles with the xs: prefix will only be
// applied when the screen width is 480 pixels or more.

// fontFamily: { inter: ["Inter var", "sans-serif"] },: This line adds a new font family called inter that uses the "Inter var" font and
// falls back to "sans-serif" if "Inter var" is not available.

// boxShadow: {: This section allows you to customize the box shadow utility classes.

// `card: "0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)", : This line
// defines a new box shadow utility class called card with a specific set of values for the box-shadow property. This can be used in your
// application by adding the card class to an element.

// cardhover: "0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)", : This line defines another new box shadow utility
// class called cardhover with a different set of values for the box-shadow property. This class can be used to change the box shadow of an
// element when it is hovered.

// }, : Close the extend object

// }, : Close the theme object

// plugins: [], : This line specifies an array of plugins that should be used by the framework. In this case, it's an empty array, which means no additional plugins are being used.

// }; : Close the module.exports object
