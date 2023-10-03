module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'no-trailing-spaces': 'off',
    'vue/no-unused-components': 'warn',
    'no-unused-vars': 'warn',
    'vue/valid-template-root': 'warn',
    'no-undef': 'warn',
    'no-multiple-empty-lines': 'off',
    'comma-dangle': 'off',
    'object-curly-spacing': 'off',
    'no-alert': 'error',
    'no-mixed-operators': 'off',
    'vue/no-unused-vars': 'warn',
    'padded-blocks': 'warn',
    'no-self-compare': 'off',
    'no-constant-condition': 'warn',
    'no-empty': 'warn',
    'quote-props': 'off',
    'indent': 'off',

  }
}
