module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "indent": [0, 4],//缩进风格
    'semi': [0],
    'semi-spacing': [0, {
      'before': false,
      'after': false
    }],
    "no-var": 0,//禁用var，用let和const代替
  }
}
