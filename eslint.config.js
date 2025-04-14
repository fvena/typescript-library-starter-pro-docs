import eslintNode from "personal-style-guide/eslint/node";

export default [
  ...eslintNode,
  {
    rules: {
      "n/no-unpublished-import": "off",
    },
  },
];
