/** @type {import('prettier').Config} */
export default {
  plugins: ["prettier-plugin-svelte"],
  singleQuote: true,
  semi: true,
  trailingComma: "es5",
  printWidth: 60,
  tabWidth: 2,
  useTabs: false,
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
      },
    },
  ],
};
