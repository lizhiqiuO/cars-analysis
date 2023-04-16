module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  htmlWhitespaceSensitivity: 'strict',
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
  ],
}
