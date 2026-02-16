import js from "@eslint/js";
import globals from "globals";
import mochaPlugin from "eslint-plugin-mocha";
import promisePlugin from "eslint-plugin-promise";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.node,
      },
    },
  },
  // Mocha test files: mocha globals + recommended rules
  {
    files: ["test/**/*.js"],
    plugins: {
      mocha: mochaPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        context: "readonly",
      },
    },
    ...mochaPlugin.configs.recommended,
    rules: {
      "mocha/no-mocha-arrows": "off",
    },
  },
  // Import and promise: use plugins without legacy config spreads (avoid parserOptions)
  {
    files: ["**/*.js"],
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...promisePlugin.configs["flat/recommended"].rules,
    },
  },
];
