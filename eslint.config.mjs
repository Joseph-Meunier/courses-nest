const config = async () => {
  const tseslint = await import('@typescript-eslint/eslint-plugin');
  const tsParser = await import('@typescript-eslint/parser');
  return [
    {
      files: ["**/*.ts"],
      ignores: [".eslintrc.js"],
      languageOptions: {
        parser: tsParser.default,
        parserOptions: {
          project: 'tsconfig.json',
          tsconfigRootDir: new URL('.', import.meta.url).pathname,
          sourceType: 'module',
        },
      },
      plugins: {
        '@typescript-eslint': tseslint.default,
      },
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ];
};

export default await config();