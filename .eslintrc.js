module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    commaDangle: false,
  },
  extends: ['airbnb-base'],
};
