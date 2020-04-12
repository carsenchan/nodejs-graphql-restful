module.exports = {
  env: {
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:security/recommended",
  ],
  plugins: ["prettier", "jest", "security"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-console": "error",
    "func-names": "off",
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "jest/expect-expect": "off",
    "security/detect-object-injection": "off",
  },
};
