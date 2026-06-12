/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "src/**/*.astro.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/schemas/**", "src/components/**"],
    },
  },
});
