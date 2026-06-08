import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'pnpm-lock.yaml'],
  },
  {
    files: ['**/*.{mjs,js,cjs}'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
];
