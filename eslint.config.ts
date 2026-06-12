import js from "@eslint/js"
import astroParser from "astro-eslint-parser"
import prettierConfig from "eslint-config-prettier"
import astro from "eslint-plugin-astro"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,

  prettierConfig,
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
])
