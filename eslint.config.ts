// import eslint from '@eslint/js';
// import eslintPluginAstro from 'eslint-plugin-astro';
// import tseslint from 'typescript-eslint';

// export default [
//   eslint.configs.recommended,
//   ...tseslint.configs.recommended,
//   ...eslintPluginAstro.configs.recommended,
//   {
//     ignores: ['dist/', '.astro/', 'node_modules/', 'pnpm-lock.yaml'],
//   },
//   {
//     files: ['**/*.{mjs,js,cjs}'],
//     languageOptions: {
//       globals: {
//         process: 'readonly',
//       },
//     },
//   },
// ];

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    ignores: ["dist/", ".astro/", "node_modules/", "pnpm-lock.yaml"],
  },
  {
    files: ["**/*.{mjs,js,cjs}"],
    languageOptions: {
      globals: {
        process: "readonly",
      },
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
    },
  },
]);
